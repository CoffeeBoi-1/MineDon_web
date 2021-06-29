module.exports = {
    name: 'api/odd_option',

    /**
     * @param {import('express').Response} res
    */
    async execute(MAIN_ROUTER, args, res) {
        if (!args.id) return res.json({ 'error': 'Not enough variables!' })
        let user = await MAIN_ROUTER.Users.find({ token: args.token })
        if (user.length == 0) return res.json({ 'error': 'Token is not valid!' })
        user = user[0]
        if (!user.options[args.id]) return res.json({ 'error': 'There is no a such id!' })

        delete user.options[args.id]
        let newValue = { options: user.options }
        await MAIN_ROUTER.Users.updateOne({ token: args.token }, { $set: newValue })
        res.sendStatus(200)
    }
};