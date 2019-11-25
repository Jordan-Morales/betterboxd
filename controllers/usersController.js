const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const session = require('express-session');
const Users = require('../models/users.js');

//GET USER ROUTE
router.get('/:id', (req, res)=>{
  Users.findById(req.params.id, (err, foundUser)=>{
    console.log(foundUser);
    res.json(foundUser);
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

//Like/Unlike Route
router.put('/:userID/:movieID', (req, res)=>{
  Users.findById(req.params.userID, (err, updatedUser)=>{
    console.log(updatedUser);
    console.log(req.body);
    likeArray = updatedUser.moviesLiked.filter((movie) => {return movie.imdbID == req.params.movieID});
    console.log(likeArray);
    if (likeArray.length > 0){
      // updatedUser.moviesLiked.push(req.body.movie)
      // console.log(updatedUser.moviesLiked);
      Users.findOneAndUpdate({_id:req.params.userID}, {$pull:{moviesLiked:req.body.movie}}, {new:true}, (error, updatedUser) => {
        console.log(updatedUser)
        res.redirect('/moviesapi/'+ req.params.movieID + '/declikes/');
      })

    }else{
      Users.findOneAndUpdate({_id:req.params.userID}, {$push:{moviesLiked:req.body.movie}}, {new:true}, (error, updatedUser) => {
        console.log(updatedUser.moviesLiked)
        res.redirect('/moviesapi/'+ req.params.movieID + '/addlikes/');
      })

    }
  });
});

module.exports = router;
