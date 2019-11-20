const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const session = require('express-session');
const Users = require('../models/users.js');

//GET USER ROUTE
router.get('/', (req, res)=>{
    Users.find({}, (err, foundUsers)=>{
        res.json(foundUsers);
    });
});

//CREATE USER ROUTE
router.post('/', (req, res)=>{
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    Users.create(req.body, (err, createdUser)=>{
        res.status(201).json({
            status:201,
            message: "user created"
        });
    });
});

//DELETE USER ROUTE
router.delete('/:id', (req, res)=>{
    Users.findByIdAndRemove(req.params.id, (err, deletedUser)=>{
        res.json(deletedUser);

    });
});

//EDIT USER ROUTE
router.put('/:id', (req, res)=>{
    Users.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedUser)=>{
        res.json(updatedUser);
    });
});

module.exports = router;
