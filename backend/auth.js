
var User = require('./models/User.js')
var bcrypt = require('bcrypt-nodejs')
var jwt = require('jwt-simple')
var express = require('express')
var router = express.Router()

router.post('/register', (req, res) => {
    var userData =  req.body;
    var user = new User(userData)
    user.save((err, result) => {
        if(err)
            console.log('saving user error')

        res.sendStatus(200)
    })
})

router.post('/login', async (req, res) => {
    var loginData =  req.body;

    var user = await User.findOne({email: loginData.email})

    if (!user)
        return res.sendStatus(401).send({message: 'Email or password invalid'})
        
    bcrypt.compare(loginData.pwd, user.pwd, (err, isMatch) => {
        if(!isMatch)
            return res.sendStatus(401).send({message: 'Email or password invalid'})
    
        var payload = { sub: user._id }
        var token = jwt.encode(payload, '123')
        
        res.status(200).send({token})
    })
})

var auth = {
    router, 
    checkAuthenthicated : (req, res, next) => {
        if(!req.header('authorization'))
            return res.status(401).send({ message: 'Unauthorized. Missing Auth Header'})
    
        // takes the token that comes 'Token tokenValue'
        var token = req.header('authorization').split(' ')[1]
        var payload = jwt.decode(token, '123')
    
        if (!payload)
            return res.status(401).send({ message: 'Unauthorized. Auth Header Invalid'})
        req.userId = payload.sub
    
        next()
    }

}

module.exports = auth