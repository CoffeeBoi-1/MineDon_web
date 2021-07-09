const express = require('express')
const app = require('express')()
const http = require('http').Server(app)
const nodemailer = require('nodemailer')
const { readdirSync } = require('fs')
const { join } = require('path')
const readline = require('readline')
const $ = require('coffeetils')
const mongoose = require('mongoose')
const config = require('./config.json')
const RateLimiter = require('./Objects/RateLimiter')

const MAIN_ROUTER = {}

async function Start() {
    try {
        MAIN_ROUTER.requests = {}
        MAIN_ROUTER.config = config
        MAIN_ROUTER.temporaryRegUsers = {}
        MAIN_ROUTER.temporaryLoginUsers = {}
        MAIN_ROUTER.regEmailsInUse = {}
        MAIN_ROUTER.loginEmailsInUse = {}
        MAIN_ROUTER.changePasswordRequests = {}
        MAIN_ROUTER.RateLimiter = new RateLimiter()
        MAIN_ROUTER.transporter = nodemailer.createTransport({ service: 'gmail', auth: { user: process.env.EMAIL_LOGIN, pass: process.env.EMAIL_PASS } })
        MAIN_ROUTER.transporter.verify((error) => { if (error) { console.log('Error with email connection'); process.exit() } })
        await mongoose.connect(process.env.DB_LINK, { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true })
        MAIN_ROUTER.Users = mongoose.model('Users', new mongoose.Schema(config.userSchema))

        const requestFiles = readdirSync(join(__dirname, 'Requests')).filter((file) => file.endsWith('.js'))
        for (const file of requestFiles) {
            const request = require(join(__dirname, 'Requests', `${file}`))
            let requestName = request.name
            MAIN_ROUTER.requests[requestName] = request
        }

        app.use(express.static(join(__dirname, '/Webpages')));

        app.all('*', async (req, res, next) => {
            try {
                const path = req.path.substr(1, req.path.length)
                const command = MAIN_ROUTER.requests[path]

                if (!command) return res.sendStatus(400)

                req.query.cookie = $.GetAppCookies(req.headers.cookie)
                let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
                req.query.ip = ip

                if (MAIN_ROUTER.RateLimiter.RequestIsLimited(ip, command.name, command.rateTime)) return res.json({ 'error': 'Rate Limited' })

                await command.execute(MAIN_ROUTER, req.query, res)
                if (path.includes('api')) next()
            } catch (error) {
                console.log(error)
            }
        })

        http.listen(process.env.PORT || 3000, () => {
            console.log('Main router is running!')
        })
    } catch (e) {
        console.log(e)
    }
}

Start()