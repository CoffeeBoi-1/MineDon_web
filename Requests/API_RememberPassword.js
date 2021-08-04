const $ = require('coffeetils');

module.exports = {
  name: 'api/remember_password',
  rateTime: 30 * 60 * 1000,

  /**
   * @param {import('express').Response} res
  */
  async execute(MAIN_ROUTER, args, res) {
    if (!$.ValidateEmail(args.email)) return res.json({ 'error': 'Это не почта' })
    let user = await MAIN_ROUTER.Users.find({ eMail: args.email })
    if (user.length == 0) return res.json({ 'error': 'Такая почта не зарегистрирована' })

    let msg = 'Твой пароль :\n' + `${user[0].password}`
    let mailOptions = {
      from: process.env.EMAIL_LOGIN,
      to: args.email,
      subject: '',
      html: msg
    }

    try {
      await MAIN_ROUTER.transporter.sendMail(mailOptions)
      res.sendStatus(200)
    } catch (e) {
      res.json({ 'error': 'Something wrong with your eMail' })
    }
    MAIN_ROUTER.RateLimiter.AddIpLimit(args.ip, this.name, this.rateTime)
  }
};