const $ = require('coffeetils')

module.exports = {
  name: '',

/**
 * @param {import('express').Response} res
*/

  async execute(MAIN_ROUTER, args, res) {
    if (!args.cookie.token) return res.sendFile('Webpages/html/unlogged_main_page.html', {root: './' })
    let user = await MAIN_ROUTER.Users.find({ token: args.cookie.token })
    if (user.length == 0) return res.sendFile('Webpages/html/unlogged_main_page.html', {root: './' })
    user = user[0]
    if (Date.now() > user.tokenValidUntil) return res.sendFile('Webpages/html/unlogged_main_page.html', {root: './' })
    
    res.sendFile('Webpages/html/logged_main_page.html', {root: './' })
  }
};