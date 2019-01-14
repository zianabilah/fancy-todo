const User =  require('../models/user')
const helper = require('../helpers')


module.exports = {

    signin: function (req, res) {
        console.log('masukkk ==========>')
        if (req.body.token) {
            // console.log(req.body.token)
            const {OAuth2Client} = require('google-auth-library');
            const CLIENT_ID = "873178918368-05u41p71r9k93kb043eu8cndsu5jp2j7.apps.googleusercontent.com"
            const client = new OAuth2Client(CLIENT_ID);
            async function verify() {
            const ticket = await client.verifyIdToken({
                idToken: req.body.token,
                audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
                // Or, if multiple clients access the backend:
                //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
            });
            const payload = ticket.getPayload();
            const userid = payload['sub'];
            // If request specified a G Suite domain:
            //const domain = payload['hd'];
                User.findOne({email: payload.email})
                .then((data) => {
                    console.log(data)
                    if (data) {
                        res.status(200).json({
                            msg:'success login',
                            token: helper.genToken({ name: data.name, email: data.email })
                        })
                    } else {
                        return User.create({
                            name: payload.name,
                            email: payload.email
                        })
                    }
                })
                .then((data) => {
                    res.status(201).json({
                        msg: 'success register and signin',
                        token: helper.genToken({ name: data.name, email: data.email })
                    })
                })
                .catch((err) => {
                    console.log(err)
                    res.status(500).json({
                        msg: 'internal server error',
                        error: err.message
                    })    static login(req, res, next) {
                        User.findOne({email: req.body.email})
                            .then(user => {
                                if (user) {
                                    if (comparePass(req.body.password, user.password)) {
                                        let token = jwt.sign({
                                            username: user.username,
                                            email: user.email
                                        }, process.env.JWT_SECRET);
                                        res.status(200).json({
                                            token: token
                                        })
                                    } else {
                                        res.status(400).json({
                                            msg: 'Wrong email / password'
                                        })
                                    }
                                } else {
                                    res.status(400).json({
                                        msg: 'Wrong email / password'
                                    })
                                }
                            })
                            .catch(error => {
                                res.status(500).json({
                                    msg: 'internal server error',
                                    error: error
                                })
                            })
                    }
                })
            }
            verify().catch(console.error);
        }
    },

    signup: function (req, res) {

            User.create({
                username: req.body.username,
                email: req.body.email,
                password: req.body.password
            })
            .then(user => {

                res.status(201).json({
                    username: user.username,
                    email: user.email   
                });
            })
            .catch(error => {
                res.status(500).json({
                    msg: 'internal server error',
                    error: error
                })
            })
        }
            
}

