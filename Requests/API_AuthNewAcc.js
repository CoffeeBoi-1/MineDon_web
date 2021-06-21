module.exports = {
  name: 'api/auth_new_acc',

  /**
   * @param {import('express').Response} res
  */
  async execute(MAIN_ROUTER, args, res) {
    if (!MAIN_ROUTER.temporaryUsers[args.token]) return res.json({ 'error': 'Incorrect token!' })
    await MAIN_ROUTER.Users.create({ eMail: MAIN_ROUTER.temporaryUsers[args.token].eMail })
    delete MAIN_ROUTER.emailsInUse[MAIN_ROUTER.temporaryUsers[args.token].eMail]
    delete MAIN_ROUTER.temporaryUsers[args.token]

    res.sendStatus(200)
  }
};