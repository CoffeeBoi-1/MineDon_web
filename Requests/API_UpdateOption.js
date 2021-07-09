module.exports = {
    name: 'api/update_option',
    rateTime: 0,

    /**
     * @param {import('express').Response} res
    */
    async execute(MAIN_ROUTER, args, res) {
        if (!args.cookie.token) return res.json({ 'error': 'Token is not valid!' })
        if (!args.cost) return res.json({ 'error': 'Not enough variables!' })
        if (!args.id) return res.json({ 'error': 'Not enough variables!' })
        if (isNaN(args.cost) || args.cost < 1) return res.json({ 'error': 'Cost in not a number' })
        if (!args.command || args.command == "" || args.command == "null") return res.json({ 'error': 'Not enough variables!' })
        if (!args.name || args.name == "" || args.name == "null")  return res.json({ 'error': 'Not enough variables!' })
        let user = await MAIN_ROUTER.Users.find({ token: args.cookie.token })
        if (user.length == 0) return res.json({ 'error': 'Token is not valid!' })
        user = user[0]
        if (!user.options[args.id]) return res.json({ 'error': 'There is no a such id!' })
        if (Date.now() > user.tokenValidUntil) return res.json({ 'error': 'Token expired!' })

        user.options[args.id] = { name: args.name, cost: args.cost, command: args.command }
        let newValue = { options: user.options }
        await MAIN_ROUTER.Users.updateOne({ token: args.cookie.token }, { $set: newValue })
        res.sendStatus(200)
    }
};