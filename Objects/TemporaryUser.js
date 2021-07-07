const TokenGenerator = require('uuid-token-generator');

class TemporaryUser {
    /**
    * @param {string} eMail User's eMail
    */
    constructor(eMail, password) {
        this.id = new TokenGenerator().generate()
        this.eMail = eMail
        this.password = password
        this.token = new TokenGenerator(256, TokenGenerator.BASE62).generate()
        this.confirmTimeout
    }
}

module.exports = TemporaryUser