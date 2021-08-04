module.exports = {
  name: 'Register',
  rateTime: 0,

  /**
   * @param {import('express').Response} res
  */

  async execute(MAIN_ROUTER, args, res) {
    if (args.code != "true") return res.sendFile('Webpages/html/register_nocode_page.html', { root: './' })

    res.sendFile('Webpages/html/register_code_page.html', { root: './' })
  }
};