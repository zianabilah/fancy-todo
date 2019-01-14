const Todo = require('../models/todo')
const Objectid = require('mongoose').Types.ObjectId

module.exports = {

    findAll: function (req, res) {
        let q = {}
        if (req.query.search) {
            var search = new RegExp(req.query.search)
            q = {
                name: search
            }
        }
        Todo.find(q)
        .then((todos) => {
            res.status(200).json({
                msg: 'success get all data',
                data: todos
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
        Todo.findById(req.params.id)
        .then((todo) => {
            if (todo) {
                res.status(200).json({
                    msg: `success get todo with id ${req.params.id}`,
                    data: todo
                })
            } else {
                res.status(404).json({
                    msg: `id : ${req.params.id} is not found`
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
        let id = Objectid(req.params.id)
        let dataUpdate = {
            name: req.body.name,
            description: req.body.descrition,
            status: req.body.status,
            due_date: req.body.due_date

        }
        for (let i in dataUpdate) {
            if (dataUpdate[i] === undefined) {
                delete dataUpdate[i]
            }
        }
        Todo.findOneAndUpdate({_id: id }, {$set: dataUpdate}, {new: true})
        .then((data) => {
            if (data.n === 0) {
                res.status(404).json({
                    msg: "id not found",
                })
            } else {
                res.status(201).json({
                    msg: 'sucess update data',
                    data
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

    destroy: function (req, res) {
        let id = Objectid(req.params.id)
        Todo.deleteOne({_id: id })
        .then((data) => {
            if (data.n == 0) {
                res.status(404).json({
                    msg: 'todo not found'
                })
            } else {
                res.status(200).json({
                    msg: 'sucesss delete todo',
                    data
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
            description: req.body.descrition,
            status: req.body.status,
            due_date: req.body.due_date,
            UserId: req.body.UserId
        }
        Todo.create(insert)
        .then((todo) => {
            res.status(201).json({
                msg: 'success create todo',
                data: todo
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