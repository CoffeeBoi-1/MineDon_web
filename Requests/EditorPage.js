const $ = require('coffeetils')

module.exports = {
  name: 'editor',
  rateTime: 0,

  /**
   * @param {import('express').Response} res
  */

  async execute(MAIN_ROUTER, args, res) {
    if (!args.cookie.token) return res.redirect('/')
    let user = await MAIN_ROUTER.Users.find({ token: args.cookie.token })
    if (user.length == 0) return res.redirect('/')
    user = user[0]
    if (Date.now() > user.tokenValidUntil) return res.redirect('/')

    res.sendFile('Webpages/html/editor_page.html', { root: './' })
  }
};