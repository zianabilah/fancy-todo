const User = require('../models/user')
const ObjectID = require('mongoose').Types.ObjectId


module.exports = {

    findByID: function (req, res) {

        User.findById(req.params.id)
        .then((user) => {
            if (user) {
                res.status(200).json({
                    msg: 'success get data one user',
                    data: user
                })
            } else {
                res.status(404).json({
                    msg: 'user not found',
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
        let id = ObjectID(req.params.id)
        let insert = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            project:req.body.projects
        }
        for (let i in insert) {
            if (insert[i] ==  undefined) {
                delete insert[i]
            }
        }
        User.findOne({ _id: id})
        .then((data) => {
            if (data) {
                data.set(insert)
                data.save()
                .then((data) => {
                    res.status(201).json({
                        msg: 'success updated',
                        data
        
                    })
                })
                .catch((err) => {
                    res.status(500).json({
                        msg: 'internal server error',
                        error: err.message
                    })
                })
            } else {
                res.status(404).json({
                    msg:'user not found',
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

    create: function (req, res) {
        let insert = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }
        User.create(insert)
        .then((user) => {
            res.status(201).json({
                msg: 'successs create user',
                data: user
            })
        })
        .catch((err) => {
            res.status(500).json({
                msg: 'internal server error',
                error: err.message
            })
        })
    },

    destroy: function (req, res) {
        let id = ObjectID(req.params.id)
        User.deleteOne({_id: id})
        .then((user) => {
            if (user.n == 0) {
                res.status(404).json({
                    msg: 'user not found'
                })
            } else {
                res.status(200).json({
                    msg: 'successs delete',
                    data: user
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

    findAll: function (req, res) {
        User.find({})
        .then((users) => {
            res.status(200).json({
                msg: 'successs get all data',
                data: users
            })
        })
        .catch((err) => {
            res.status(500).json({
                msg: 'inernal server error',
                error: err.message
            })
        })
    }
}