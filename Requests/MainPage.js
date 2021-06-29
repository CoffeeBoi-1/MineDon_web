const $ = require('coffeetils')

module.exports = {
  name: '',

/**
 * @param {import('express').Response} res
*/

  async execute(MAIN_ROUTER, args, res) {
    let cookies = $.GetAppCookies(args.cookie)
    if (!cookies.token) return res.sendFile('Webpages/html/unlogged_main_page.html', {root: './' })
    let user = await MAIN_ROUTER.Users.find({ token: cookies.token })
    if (user.length == 0) return res.sendFile('Webpages/html/unlogged_main_page.html', {root: './' })
    
    res.sendFile('Webpages/html/logged_main_page.html', {root: './' })
  }
};