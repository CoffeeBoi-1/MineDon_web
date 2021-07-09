module.exports = {
    name: 'donater',
    rateTime: 0,

    /**
     * @param {import('express').Response} res
    */

    async execute(MAIN_ROUTER, args, res) {
        res.sendFile('Webpages/html/donater_page.html', { root: './' })
    }
};