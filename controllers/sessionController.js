// ========================
// DEPENDENCIES
// ========================
const express = require("express")
const router = express.Router()
const bcrypt = require('bcryptjs')
const User = require('../models/users.js')

// ========================
// ROUTES
// ========================
// route to check if user exists in the database, if does exist, checks for password match
router.post('/', (req, res) => {
  User.findOne( {username: req.body.username}, (error, foundUser) => {
    if(foundUser === null){
      res.json({
        message: 'user not found'
      })
    } else {
        const passwordMatch = bcrypt.compareSync(req.body.password, foundUser.password)
        if (passwordMatch) {
          req.session.user = foundUser
          res.json(foundUser)
        } else {
          res.json({
            message: 'password not match'
          })
        }
      }
  })
})

//route to check if a session exists aka if the user is logged in
router.get('/', (req, res) => {
  res.json(req.session.user)
})

//logout route
router.delete('/', (req, res) => {
  req.session.destroy(() => {
    res.json({
      destroyed:true
    })
  })
})

module.exports = router
