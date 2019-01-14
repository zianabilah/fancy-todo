var mongoose = require('mongoose');
const helper = require('../helpers')
  var Schema = mongoose.Schema;

  function isUnique () {
    return new Promise ( (res, rej) => {
        User.findOne({email : this.email, _id: {$ne: this._id}})
        .then((data) => {
            if (data) {
                res(false)
            } else {
                res(true)
            }
        })
        .catch((err) => {
            res(false)
        })
    })
}

  var userSchema = new Schema({
    name: String,
    email:  {
      type: String,
      required: [true, 'email must be filled'],
      match: [/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ , 'please input invalid email'],
      validate: [isUnique, 'email has been used']
  },
    password: String
  });

  userSchema.pre('save', function(next) {
    this.password = helper.genPass(this.password)
    next();
  });

  userSchema.pre('findOneAndUpdate', function (next) {
    this._update.password = helper.genPass(this._update.password)
    next()
  })


  var User = mongoose.model('User', userSchema);


  module.exports = User