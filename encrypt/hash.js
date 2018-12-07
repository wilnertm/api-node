const sha512 = require('js-sha512').sha512;
var hash = {
    createSalt() {
        let milisegundos = new Date().getTime()+"s";
        let salt = sha512(milisegundos)
        return salt;
    },
    createPassword(salt, pass) {
        return sha512(salt + pass);
    },
    createPass( pass) {
        return sha512(pass);
    }
}
module.exports = hash