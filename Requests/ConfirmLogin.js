const TokenGenerator = require('uuid-token-generator');

module.exports = {
  name: 'ConfirmLogin',

  /**
   * @param {import('express').Response} res
  */
  async execute(MAIN_ROUTER, args, res) {
    if (!MAIN_ROUTER.temporaryLoginUsers[args.token]) return res.send('<p>Incorrect token!</p>')
    
    let email = MAIN_ROUTER.temporaryLoginUsers[args.token].eMail
    let user = await MAIN_ROUTER.Users.find({ eMail: email })
    user = user[0]
    let token = user.token && Date.now() < user.tokenValidUntil? user.token : new TokenGenerator(256, TokenGenerator.BASE62).generate()
    let newValue = { token: token, tokenValidUntil: Date.now() + (MAIN_ROUTER.config.tokenValidDays*24*60*60*1000) }
    await MAIN_ROUTER.Users.updateOne({ eMail: email }, { $set: newValue })
    delete MAIN_ROUTER.loginEmailsInUse[MAIN_ROUTER.temporaryLoginUsers[args.token].eMail]
    delete MAIN_ROUTER.temporaryLoginUsers[args.token]

    res.send('<p>You logged now!\nNow you can go on Main Page by this link :</p><a href='+`${MAIN_ROUTER.config.mainAddress}`+'>Go</a><script>document.cookie = "'+`token=${token}`+'"</script><script>document.cookie = "'+`id=${user.id}`+'"</script>')
  }
};