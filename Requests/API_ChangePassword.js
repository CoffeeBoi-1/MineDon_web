const TokenGenerator = require('uuid-token-generator');

module.exports = {
    name: 'api/change_password',
    rateTime: 0,

    /**
     * @param {import('express').Response} res
    */
    async execute(MAIN_ROUTER, args, res) {
        if (!args.cookie.token) return res.json({ 'error': 'Неверный Токен!' })
        let user = await MAIN_ROUTER.Users.find({ token: args.cookie.token })
        if (user.length == 0) return res.json({ 'error': 'Неверный Токен!' })
        user = user[0]
        if (Date.now() > user.tokenValidUntil) return res.json({ 'error': 'Срок годности токена истёк!' })
        if (!MAIN_ROUTER.changePasswordRequests[args.cookie.token]) return res.json({ 'error': 'error' })

        let request = MAIN_ROUTER.changePasswordRequests[args.cookie.token]
        let newValue = { password: request.newPassword, token: new TokenGenerator(256, TokenGenerator.BASE62).generate()}
        await MAIN_ROUTER.Users.updateOne({ token: args.cookie.token }, { $set: newValue })
        res.sendStatus(200)
    }
};