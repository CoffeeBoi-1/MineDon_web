module.exports = {
    name: 'api/token_valid',

    /**
     * @param {import('express').Response} res
    */
    async execute(MAIN_ROUTER, args, res) {
        let user = await MAIN_ROUTER.Users.find({ token: args.token })
        if (user.length == 0) return res.json({ 'error': 'Token is not valid!' })
        user = user[0]
        if (Date.now() > user.tokenValidUntil) return res.json({ 'error': 'Token expired!' })
        
        res.sendStatus(200)
    }
};