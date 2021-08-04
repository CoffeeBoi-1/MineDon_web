const ChangePasswordRequest = require('../Objects/ChangePasswordRequest');

module.exports = {
    name: 'api/request_change_password',
    rateTime: 30 * 60 * 1000,

    /**
     * @param {import('express').Response} res
    */
    async execute(MAIN_ROUTER, args, res) {
        if (!args.newPassword || args.newPassword == 'null' || args.newPassword.length < 3 || args.newPassword.length > 16) return res.json({ 'error': 'Неверно введён пароль. Он должен быть не меньше 3-х и не превышать 16-и символов' })
        if (!args.cookie.token) return res.json({ 'error': 'Неверный Токен!' })
        let user = await MAIN_ROUTER.Users.find({ token: args.cookie.token })
        if (user.length == 0) return res.json({ 'error': 'Неверный Токен!' })
        user = user[0]
        if (Date.now() > user.tokenValidUntil) return res.json({ 'error': 'Срок годности токена истёк!' })
        if (MAIN_ROUTER.changePasswordRequests[args.cookie.token]) return res.json({ 'error': 'Подожди.' })

        let changePasswordRequest = new ChangePasswordRequest(args.newPassword)
        changePasswordRequest.confirmTimeout = setTimeout(() => { delete MAIN_ROUTER.changePasswordRequests[args.cookie.token]; }, MAIN_ROUTER.config.confirmTimeout)
        MAIN_ROUTER.changePasswordRequests[args.cookie.token] = changePasswordRequest

        let link = '<p>Перейди по этой ссылке, чтобы сменить пароль :</p>\n' + `<a href='${MAIN_ROUTER.config.mainAddress + 'api/change_password'}'>Подтвердить</a>`
        let mailOptions = {
            from: process.env.EMAIL_LOGIN,
            to: user.eMail,
            subject: 'Смена Пароля',
            html: link
        }

        try {
            await MAIN_ROUTER.transporter.sendMail(mailOptions)
            res.sendStatus(200)
        } catch (e) {
            res.json({ 'error': 'Something wrong with your eMail' })
        }
        MAIN_ROUTER.RateLimiter.AddIpLimit(args.ip, this.name, this.rateTime)
    }
};