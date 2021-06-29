module.exports = {
  name: 'AuthNewAcc',

  /**
   * @param {import('express').Response} res
  */
  async execute(MAIN_ROUTER, args, res) {
    if (!MAIN_ROUTER.temporaryRegUsers[args.token]) return res.json({ 'error': 'Incorrect token!' })
    await MAIN_ROUTER.Users.create({ eMail: MAIN_ROUTER.temporaryRegUsers[args.token].eMail, password: MAIN_ROUTER.temporaryRegUsers[args.token].password })
    delete MAIN_ROUTER.regEmailsInUse[MAIN_ROUTER.temporaryRegUsers[args.token].eMail]
    delete MAIN_ROUTER.temporaryRegUsers[args.token]

    res.send('<p>You registered now!\nNow you can Login on Main Page :</p><a href='+`${MAIN_ROUTER.config.mainAddress}`+'>Go</a>')
  }
};