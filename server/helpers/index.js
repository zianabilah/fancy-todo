const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

module.exports = {

    genPass: function (pass) {
     const salt = bcrypt.genSaltSync(10);
     const hash = bcrypt.hashSync(pass, salt);
     return hash
    },

    chechPass: function (real, input) {
        return bcrypt.compareSync(input, real);
    },

    genToken: function (object) {
        return jwt.sign(object, process.env.JWT_SECRET);
    },

    decodToken: function (token) {
     var decoded = jwt.verify(token, process.env.JWT_SECRET);
     return decoded
    }


}