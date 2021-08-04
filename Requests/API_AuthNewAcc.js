module.exports = {
  name: 'api/auth_new_acc',
  rateTime: 60 * 60 * 1000,

  /**
   * @param {import('express').Response} res
  */
  async execute(MAIN_ROUTER, args, res) {
    if (!MAIN_ROUTER.temporaryRegUsers[args.token]) return res.json({ 'error': 'Неверный Код!' })
    await MAIN_ROUTER.Users.create({ id:MAIN_ROUTER.temporaryRegUsers[args.token].id, eMail: MAIN_ROUTER.temporaryRegUsers[args.token].eMail, password: MAIN_ROUTER.temporaryRegUsers[args.token].password })
    delete MAIN_ROUTER.regEmailsInUse[MAIN_ROUTER.temporaryRegUsers[args.token].eMail]
    delete MAIN_ROUTER.temporaryRegUsers[args.token]

    res.sendStatus(200)
    MAIN_ROUTER.RateLimiter.AddIpLimit(args.ip, this.name, this.rateTime)
  }
};