module.exports = {
    name: 'donater',

    /**
     * @param {import('express').Response} res
    */

    async execute(MAIN_ROUTER, args, res) {
        res.sendFile('Webpages/html/donater_page.html', { root: './' })
    }
};