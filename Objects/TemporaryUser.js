const TokenGenerator = require('uuid-token-generator');

class TemporaryUser {
    /**
    * @param {string} eMail User's eMail
    */
    constructor(eMail) {
        this.eMail = eMail
        this.token = new TokenGenerator(256, TokenGenerator.BASE62).generate()
        this.confirmTimeout
    }
}

module.exports = TemporaryUser