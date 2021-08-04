const TemporaryUser = require('../Objects/TemporaryUser');
const $ = require('coffeetils')

module.exports = {
    name: 'api/get_login_token',
    rateTime: 0,

    /**
     * @param {import('express').Response} res
    */
    async execute(MAIN_ROUTER, args, res) {
        if (!$.ValidateEmail(args.email)) return res.json({ 'error': 'Это не почта' })
        if (MAIN_ROUTER.loginEmailsInUse[args.email]) return res.sendStatus(200)
        let user = await MAIN_ROUTER.Users.find({ eMail: args.email })
        if (user.length == 0) return res.json({ 'error': 'Такая почта не зарегистрирована' })
        if (!args.password || user[0].password != args.password) return res.json({ 'error': 'Неверный пароль' })

        let User = new TemporaryUser(args.email, args.password)
        User.confirmTimeout = setTimeout(() => { delete MAIN_ROUTER.temporaryLoginUsers[User.token]; delete MAIN_ROUTER.loginEmailsInUse[args.email] }, MAIN_ROUTER.config.confirmTimeout)
        MAIN_ROUTER.temporaryLoginUsers[User.token] = User
        MAIN_ROUTER.loginEmailsInUse[args.email] = 'a'

        let link = '<p>Твой код для верификации :</p>\n' + User.token
        let mailOptions = {
            from: process.env.EMAIL_LOGIN,
            to: args.email,
            subject: 'Верифицируй себя',
            html: link
        }

        try {
            await MAIN_ROUTER.transporter.sendMail(mailOptions)
            res.sendStatus(200)
        } catch (e) {
            res.json({ 'error': 'Something wrong with your eMail' })
        }
    }
};