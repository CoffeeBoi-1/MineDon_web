const TemporaryUser = require('../Objects/TemporaryUser');
const $ = require('coffeetils');

module.exports = {
  name: 'api/reg_acc',
  rateTime: 5 * 60 * 1000,

  /**
   * @param {import('express').Response} res
  */
  async execute(MAIN_ROUTER, args, res) {
    if (!$.ValidateEmail(args.email)) return res.json({ 'error': 'Is not email' })
    if (!args.password || args.password.length > 16 || args.password < 3) return res.json({ 'error': 'Неверно введён пароль. Он должен быть не меньше 3-х и не превышать 16-и символов' })
    if (MAIN_ROUTER.regEmailsInUse[args.email]) return res.redirect('/Register?code=true')

    let user = await MAIN_ROUTER.Users.find({ eMail: args.email })
    if (user.length > 0) return res.json({ 'error': 'Эта почта уже зарегистрирована' })

    let User = new TemporaryUser(args.email, args.password)
    User.confirmTimeout = setTimeout(() => { delete MAIN_ROUTER.temporaryRegUsers[User.token]; delete MAIN_ROUTER.regEmailsInUse[args.email] }, MAIN_ROUTER.config.confirmTimeout)
    MAIN_ROUTER.temporaryRegUsers[User.token] = User
    MAIN_ROUTER.regEmailsInUse[args.email] = 'a'

    let link = '<p>Твой код для верификации :</p>\n' + User.token
    let mailOptions = {
      from: process.env.EMAIL_LOGIN,
      to: args.email,
      subject: 'Верифицируй свою почту',
      html: link
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