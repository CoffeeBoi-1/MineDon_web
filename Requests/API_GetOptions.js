module.exports = {
    name: 'api/get_options',

    /**
     * @param {import('express').Response} res
    */
    async execute(MAIN_ROUTER, args, res) {
        let user = await MAIN_ROUTER.Users.find({ token: args.token })
        if (user.length == 0) return res.json({ 'error': 'Token is not valid!' })
        user = user[0]

        res.json(user.options)
    }
};