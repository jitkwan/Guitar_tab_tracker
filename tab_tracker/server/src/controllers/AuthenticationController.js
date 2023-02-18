const { User } = require('../models')
const jwt = require('jsonwebtoken')
const config = require('../config/config')

function jwtSignUser (user) {
    const ONE_WEEK = 60 * 60 * 24 * 7 // unit in seconds
    return jwt.sign(user, config.authentication.jwtSecret, {expiresIn: ONE_WEEK})
}

module.exports = {
   async register (req, res) {
        try {
            const user = await User.create(req.body)
            res.send(user.toJSON()) // if success user obj to client who has request
        } catch (err) {
            res.status(400).send({
                error: 'This email account is already in use.'
            })
        }
    },
    async login (req, res) {
        try {
            const {email, password} = req.body //grab data from req.body to check
            const user = await User.findOne({ // return user obj
                where: {
                    email:email // where email in db === email in pass in
                }
            })
            if (!user) {
                return res.status(403).send({
                    error: 'The login infomation was incorrect'
                })
            }

            const isPasswordValid = password === user.password
            // console.log(password, user.password)
            // console.log(isPasswordValid)
            if (!isPasswordValid){
                return res.status(403).send({
                    error: 'The login infomation was incorrect'
                })
            }
            const userJson = user.toJSON()
            res.send({
                user: userJson,
                token: jwtSignUser(userJson)
            })
        } catch (err) {
            res.status(500).send({
                error: 'An error has occured trying to log in'
            })
        }
    }
}