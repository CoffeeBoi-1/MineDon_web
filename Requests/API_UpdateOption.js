module.exports = {
    name: 'api/update_option',
    rateTime: 0,

    /**
     * @param {import('express').Response} res
    */
    async execute(MAIN_ROUTER, args, res) {
        if (!args.cookie.token) return res.json({ 'error': 'Неверный Токен!' })
        if (!args.cost) return res.json({ 'error': 'Недостаточно переменных!' })
        if (!args.id) return res.json({ 'error': 'Недостаточно переменных!' })
        if (isNaN(args.cost) || args.cost < 1) return res.json({ 'error': 'Cost in not a number' })
        if (!args.command || args.command == "" || args.command == "null") return res.json({ 'error': 'Недостаточно переменных!' })
        if (!args.name || args.name == "" || args.name == "null") return res.json({ 'error': 'Недостаточно переменных!' })
        let user = await MAIN_ROUTER.Users.find({ token: args.cookie.token })
        if (user.length == 0) return res.json({ 'error': 'Неверный Токен!' })
        user = user[0]
        if (parseInt(args.cost) != 0 && !this.costIsAvailable(user, args.id, parseInt(args.cost))) return res.json({ 'error': 'Такая цена уже есть' })
        if (!user.options[args.id]) return res.json({ 'error': 'Такого id нет!' })
        if (Date.now() > user.tokenValidUntil) return res.json({ 'error': 'Срок годности токена истёк!' })

        user.options[args.id] = { name: args.name, cost: parseInt(args.cost), command: args.command }
        let newValue = { options: user.options }
        await MAIN_ROUTER.Users.updateOne({ token: args.cookie.token }, { $set: newValue })
        res.sendStatus(200)
    },

    costIsAvailable(user, id, cost) {
        for (var i in user.options) {
            if (user.options[i].cost == cost && i != id) return false
        }
        return true
    }
};