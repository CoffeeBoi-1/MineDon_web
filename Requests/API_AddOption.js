const TokenGenerator = require('uuid-token-generator');

module.exports = {
    name: 'api/add_option',

    /**
     * @param {import('express').Response} res
    */
    async execute(MAIN_ROUTER, args, res) {
        if (!args.cookie.token) return res.json({ 'error': 'Token is not valid!' })
        if (!args.cost) return res.json({ 'error': 'Not enough variables!' })
        if (isNaN(args.cost)) return res.json({ 'error': 'Cost in not a number' })
        if (!args.command || args.command == "") return res.json({ 'error': 'Not enough variables!' })
        if (!args.name || args.name == "") return res.json({ 'error': 'Not enough variables!' })
        let user = await MAIN_ROUTER.Users.find({ token: args.cookie.token })
        if (user.length == 0) return res.json({ 'error': 'Token is not valid!' })
        user = user[0]
        if (Date.now() > user.tokenValidUntil) return res.json({ 'error': 'Token expired!' })

        let id = await this.generateId(user.options)
        user.options[id] = { name: args.name, cost: args.cost, command: args.command }
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