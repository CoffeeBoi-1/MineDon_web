const TemporaryUser = require('../Objects/TemporaryUser');
const $ = require('coffeetils');

module.exports = {
  name: 'api/reg_acc',

  /**
   * @param {import('express').Response} res
  */
  async execute(MAIN_ROUTER, args, res) {
    if (!$.ValidateEmail(args.email)) return res.json({ 'error': "Isn't email" })
    if (MAIN_ROUTER.emailsInUse[args.email]) return res.json({ 'error': "wait." })

    let user = await MAIN_ROUTER.Users.find({ eMail: args.email })
    if (user.length > 0) return res.json({ 'error': 'This email registered already' })

    let temporaryUser = new TemporaryUser(args.email)
    temporaryUser.confirmTimeout = setTimeout(() => { delete MAIN_ROUTER.temporaryUsers[temporaryUser.token]; delete MAIN_ROUTER.emailsInUse[args.email] }, MAIN_ROUTER.config.confirmTimeout)
    MAIN_ROUTER.temporaryUsers[temporaryUser.token] = temporaryUser
    MAIN_ROUTER.emailsInUse[args.email] = "a"

    let link = '<p>Go by this link for eMail verification :</p>\n' + `<a href='${MAIN_ROUTER.config.mainAddress + 'api/auth_new_acc?token=' + temporaryUser.token}'>Verify</a>`
    let mailOptions = {
      from: process.env.EMAIL_LOGIN,
      to: args.email,
      subject: 'Verify your eMail',
      html: link
    }
    MAIN_ROUTER.transporter.sendMail(mailOptions, (e, data) => {
      if (e) return res.json({ 'error': 'Something wrong with your eMail' })
    })
    if (!res.headersSent) res.sendStatus(200)
  }
};