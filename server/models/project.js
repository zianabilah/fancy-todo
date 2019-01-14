var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var projectSchema = new Schema({
        name: String,
        Tasks: [
            { type: Schema.Types.ObjectId, ref: 'Todo' }
        ],
        members: [
                { type: Schema.Types.ObjectId, ref: 'User' }
        ]
    });
    
var Project = mongoose.model('Project', projectSchema);


module.exports = Project