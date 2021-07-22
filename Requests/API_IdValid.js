module.exports = {
    name: 'api/id_valid',
    rateTime: 0,

    /**
     * @param {import('express').Response} res
    */
    async execute(MAIN_ROUTER, args, res) {
        if (!args.id) return res.json({ 'error': 'ID is not valid!' })
        let user = await MAIN_ROUTER.Users.find({ id: args.id })
        if (user.length == 0) return res.json({ 'error': 'ID is not valid!' })
        user = user[0]
        
        res.sendStatus(200)
    }
};