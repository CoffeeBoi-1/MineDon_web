const TemporaryUser = require('../Objects/TemporaryUser');
const $ = require('coffeetils')

module.exports = {
    name: 'api/get_login_token',

    /**
     * @param {import('express').Response} res
    */
    async execute(MAIN_ROUTER, args, res) {
        if (!$.ValidateEmail(args.email)) return res.json({ 'error': 'Is not email' })
        if (MAIN_ROUTER.loginEmailsInUse[args.email]) return res.json({ 'error': 'wait.' })
        let user = await MAIN_ROUTER.Users.find({ eMail: args.email })
        if (user.length == 0) return res.json({ 'error': 'This email is not registered' })
        if (!args.password || user[0].password != args.password) return res.json({ 'error': 'Wrong password!' })

        let User = new TemporaryUser(args.email, args.password)
        User.confirmTimeout = setTimeout(() => { delete MAIN_ROUTER.temporaryLoginUsers[User.token]; delete MAIN_ROUTER.loginEmailsInUse[args.email] }, MAIN_ROUTER.config.confirmTimeout)
        MAIN_ROUTER.temporaryLoginUsers[User.token] = User
        MAIN_ROUTER.loginEmailsInUse[args.email] = 'a'

        let link = '<p>Go by this link for login :</p>\n' + `<a href='${MAIN_ROUTER.config.mainAddress + 'ConfirmLogin?token=' + User.token}'>Login</a>`
        let mailOptions = {
            from: process.env.EMAIL_LOGIN,
            to: args.email,
            subject: 'Login Link',
            html: link
        }
        MAIN_ROUTER.transporter.sendMail(mailOptions, (e, data) => {
            if (e) return res.json({ 'error': 'Something wrong with your eMail' })
        })
        if (!res.headersSent) res.sendStatus(200)
    }
};