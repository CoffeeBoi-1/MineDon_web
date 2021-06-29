module.exports = {
    name: 'api/add_option',

    /**
     * @param {import('express').Response} res
    */
    async execute(MAIN_ROUTER, args, res) {
        if (!args.cost) return res.json({ 'error': 'Not enough variables!' })
        if (!args.command || args.command == "") return res.json({ 'error': 'Not enough variables!' })
        let user = await MAIN_ROUTER.Users.find({ token: args.token })
        if (user.length == 0) return res.json({ 'error': 'Token is not valid!' })
        user = user[0]
        if (Date.now() > user.tokenValidUntil) return res.json({ 'error': 'Token expired!' })

        user.options[Object.keys(user.options).length] = { cost: args.cost, command: args.command }
        let newValue = { options: user.options }
        await MAIN_ROUTER.Users.updateOne({ token: args.token }, { $set: newValue })
        res.sendStatus(200)
    }
};