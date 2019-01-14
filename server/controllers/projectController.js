const Project = require('../models/project')
const ObjectID = require('mongoose').Types.ObjectId


module.exports = {

    create: function (req, res) {
        let insert = {
            name: req.body.name,
            tasks: req.body.tasks,
            members: req.body.members
        }
        Project.create(insert)
        .then((project) => {
            res.status(201).json({
                msg: 'success create project',
                data: project
            })
        })
        .catch((err) => {
            res.status(500).json({
                msg: 'internal server error',
                error: err.message
            })
        })
    },

    findById: function (req, res) {

        Project.findById(req.params.id).populate('User')
        .then(project => {
            if (project) {
                res.status(404).json({
                    msg: 'project not found',
                })
            } else {
                res.status(200).json({
                    msg:"success find project",
                    data: project
                })
            }
        })
        .catch((err) => {
            res.status(500).json({
                msg: 'internal server error',
                error: err.message
            })
        })
    },

    update: function (req, res) {
        let insert = {
            tasks : req.body.tasks,
            members: req.body.members
        }
        let _id = ObjectID(req.params.id)
        Project.findOneAndUpdate({_id}, insert , {new: true})
        .then((project) => {
            res.status(201).json({
                msg: 'success updated data',
                data: project
            })
        })
        .catch((err) => {
            res.status(500).json({
                msg: 'internal server error',
                error: err.message
            })
        })
    },

    delete: function (req, res) {
        let _id = req.params.id
        Project.deleteOne({_id})
        .then((project) => {
            res.status(200).json({
                msg: 'successs delete data',
                data: project
            })
        })
        .catch((err) => {
            res.status(500).json({
                msg: 'internal server error',
                error: err.message
            })
        })
    }
}