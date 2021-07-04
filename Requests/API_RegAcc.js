const TemporaryUser = require('../Objects/TemporaryUser');
const $ = require('coffeetils');

module.exports = {
  name: 'api/reg_acc',

  /**
   * @param {import('express').Response} res
  */
  async execute(MAIN_ROUTER, args, res) {
    if (!$.ValidateEmail(args.email)) return res.json({ 'error': 'Is not email' })
    if (!args.password || args.password.length > 16 || args.password < 3) return res.json({ 'error': 'wrong password syntax' })
    if (MAIN_ROUTER.regEmailsInUse[args.email]) return res.json({ 'error': 'wait.' })

    let user = await MAIN_ROUTER.Users.find({ eMail: args.email })
    if (user.length > 0) return res.json({ 'error': 'This email registered already' })

    let User = new TemporaryUser(args.email, args.password)
    User.confirmTimeout = setTimeout(() => { delete MAIN_ROUTER.temporaryRegUsers[User.token]; delete MAIN_ROUTER.regEmailsInUse[args.email] }, MAIN_ROUTER.config.confirmTimeout)
    MAIN_ROUTER.temporaryRegUsers[User.token] = User
    MAIN_ROUTER.regEmailsInUse[args.email] = 'a'

    let link = '<p>Go by this link for eMail verification :</p>\n' + `<a href='${MAIN_ROUTER.config.mainAddress + 'AuthNewAcc?token=' + User.token}'>Verify</a>`
    let mailOptions = {
      from: process.env.EMAIL_LOGIN,
      to: args.email,
      subject: 'Verify your eMail',
      html: link
    }
    
    try {
      await MAIN_ROUTER.transporter.sendMail(mailOptions)
      res.sendStatus(200)
    } catch (e) {
      res.json({ 'error': 'Something wrong with your eMail' })
    }
  }
};