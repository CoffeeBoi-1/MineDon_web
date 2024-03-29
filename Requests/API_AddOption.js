const TokenGenerator = require('uuid-token-generator');

module.exports = {
    name: 'api/add_option',
    rateTime: 0,

    /**
     * @param {import('express').Response} res
    */
    async execute(MAIN_ROUTER, args, res) {
        if (!args.cookie.token) return res.json({ 'error': 'Неверный Токен!' })
        if (!args.command || args.command == "") return res.json({ 'error': 'Недостаточно переменных!' })
        if (!args.name || args.name == "") return res.json({ 'error': 'Недостаточно переменных!' })
        let user = await MAIN_ROUTER.Users.find({ token: args.cookie.token })
        if (user.length == 0) return res.json({ 'error': 'Неверный Токен!' })
        user = user[0]
        if (Object.keys(user.options).length >= MAIN_ROUTER.config.maxOptionsAmount) return res.json({ 'error': 'Достигнут лимит опций!' })
        if (Date.now() > user.tokenValidUntil) return res.json({ 'error': 'Срок годности токена истёк!' })

        let id = await this.generateId(user.options)
        user.options[id] = { name: args.name, cost: 0, command: args.command }
        let newValue = { options: user.options }
        await MAIN_ROUTER.Users.updateOne({ token: args.cookie.token }, { $set: newValue })
        res.json({ 'id': id })
    },

    async generateId(ids) {
        while (true) {
            let id = new TokenGenerator().generate()
            if (!ids[id]) return id
        }
    }
};