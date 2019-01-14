var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var todoSchema = new Schema({
        name: String,
        description: String,
        status: Boolean,
        due_date: Date,
        UserId: { type: Schema.Types.ObjectId, ref: 'User' }
    });

var Todo = mongoose.model('Todo', todoSchema);


module.exports = Todo