module.exports = {
    name: 'api/set_donatty_link',
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
        if (!args.link) return res.json({ 'error': 'Недостаточно переменных!' })
        if (!args.link.startsWith('https://donatty.com'))  return res.json({ 'error': 'Ссылка неправильная!' })

        let newValue = { donattyLink: args.link }
        await MAIN_ROUTER.Users.updateOne({ token: args.cookie.token }, { $set: newValue })
        res.sendStatus(200)
    }
};