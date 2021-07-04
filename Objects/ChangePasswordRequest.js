const TokenGenerator = require('uuid-token-generator');

class ChangePasswordRequest {
    constructor(newPassword) {
        this.id = new TokenGenerator(256, TokenGenerator.BASE62).generate()
        this.newPassword = newPassword
        this.confirmTimeout
    }
}

module.exports = ChangePasswordRequest