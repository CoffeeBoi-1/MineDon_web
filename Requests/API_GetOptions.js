module.exports = {
    name: 'api/get_options',

    /**
     * @param {import('express').Response} res
    */
    async execute(MAIN_ROUTER, args, res) {
        let user = await MAIN_ROUTER.Users.find({ id: args.id? args.id : args.cookie.id })
        if (user.length == 0) return res.json({ 'error': 'No such user!' })
        user = user[0]

        res.json(user.options)
    }
};