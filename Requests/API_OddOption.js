module.exports = {
    name: 'api/odd_option',
    rateTime: 0,

    /**
     * @param {import('express').Response} res
    */
    async execute(MAIN_ROUTER, args, res) {
        if (!args.cookie.token) return res.json({ 'error': 'Неверный Токен!' })
        if (!args.id) return res.json({ 'error': 'Недостаточно переменных!' })
        let user = await MAIN_ROUTER.Users.find({ token: args.cookie.token })
        if (user.length == 0) return res.json({ 'error': 'Неверный Токен!' })
        user = user[0]
        if (Date.now() > user.tokenValidUntil) return res.json({ 'error': 'Срок годности токена истёк!' })
        if (!user.options[args.id]) return res.json({ 'error': 'Нет такого id!' })

        delete user.options[args.id]
        let newValue = { options: user.options }
        await MAIN_ROUTER.Users.updateOne({ token: args.cookie.token }, { $set: newValue })
        res.sendStatus(200)
    }
};