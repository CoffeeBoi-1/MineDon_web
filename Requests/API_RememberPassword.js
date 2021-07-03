const $ = require('coffeetils');

module.exports = {
  name: 'api/remember_password',

  /**
   * @param {import('express').Response} res
  */
  async execute(MAIN_ROUTER, args, res) {
    if (!$.ValidateEmail(args.email)) return res.json({ 'error': 'Is not email' })
    let user = await MAIN_ROUTER.Users.find({ eMail: args.email })
    if (user.length == 0) return res.json({ 'error': 'This email is not registered' })

    let msg = 'Your password is :\n' + `${user[0].password}`
    let mailOptions = {
      from: process.env.EMAIL_LOGIN,
      to: args.email,
      subject: '',
      html: msg
    }
    MAIN_ROUTER.transporter.sendMail(mailOptions, (e, data) => {
      if (e) return res.json({ 'error': 'Something wrong with your eMail' })
    })
    if (!res.headersSent) res.sendStatus(200)
  }
};