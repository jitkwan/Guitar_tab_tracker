const { User } = require('../models')

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
    }
}