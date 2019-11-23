// Dependencies
const express = require('express')
const movies = express.Router()
const Movie = require('../models/movies.js')


// INDEX

movies.get('/', (req, res) => {
  Movie.find({}, (error, foundMovie) => {
    res.json(foundMovie);
  });
});

// SHOW / GET BY ID
// used to access each movie and the contained comments
movies.get('/:id', (req, res) => {
  Movie.find({omdbID:req.params.id}, (error, foundMovie) => {
    res.json(foundMovie);
  });
});

// CREATE
movies.post('/', (req, res) => {
  Movie.find({omdbID:req.body.omdbID}, (error, foundMovie) => {
    // console.log(req.body.omdbID);
    // console.log(foundMovie[0]);
    if (foundMovie[0] === undefined) {
      Movie.create(req.body, (error, createdMovie) => {
        // console.log(createdMovie);
        res.json(createdMovie);
      })
    } else {
      res.json(foundMovie)

    }
  })
});

// DELETES ENTIRE MOVIE
// movies.put('/:id/deleteComment', (req, res) => {
//   Movie.findByIdAndRemove(req.params.id, (error, deletedMovie) => {
//     res.json(deletedMovie);
//   });
// });

// UPDATE
movies.put('/:id', (req, res) => {
  Movie.findOneAndUpdate({omdbID:req.params.id}, req.body, {new:true}, (error, updatedMovie) => {
    res.json(updatedMovie);
  });
});

movies.put('/:id/newcomment', (req, res) => {
  Movie.find({omdbID:req.params.id}, (error, foundMovie) => {
    // console.log(req.params.id);
    // console.log(foundMovie[0]);
    if (foundMovie[0] === undefined) {
      Movie.create(req.body, (error, createdMovie) => {
        // console.log(createdMovie);
        res.json(createdMovie);
      })
    } else {
      Movie.findOneAndUpdate({omdbID:req.params.id}, {$push:{comment:req.body.comment}}, {new:true}, (error, updatedMovie) => {
        res.json(updatedMovie);
      })
    }
  })
})


movies.put('/:id/addlikes', (req, res) => {
  Movie.find({omdbID:req.params.id}, (error, foundMovie) => {
    // console.log(req.params.id);
    // console.log(foundMovie[0]);
    if (foundMovie[0] === undefined) {
      Movie.create(req.body, (error, createdMovie) => {
        // inc +1
        // console.log(createdMovie);
      })
    } else {
      Movie.findOneAndUpdate({omdbID:req.params.id}, {$inc:{likes: 1 }}, {new:true}, (error, updatedMovie) => {
        res.json(updatedMovie);
        // inc +1
      })
    }
  })
})

movies.put('/:id/declikes', (req, res) => {
  Movie.findOneAndUpdate({omdbID:req.params.id}, {$inc:{likes: -1 }}, {new:true}, (error, updatedMovie) => {
    res.json(updatedMovie);
    // inc -1
  }
)
})
// 
// movies.get('/:id/:omdbID', (req, res) => {
//   Movie.find({omdbID:req.params.id}, (error, foundMovie) => {
//     // console.log(req.params.id);
//     // console.log(foundMovie[0]);
//     if (foundMovie[0] === undefined) {
//       console.log('do nothing?');
//     }
//     else {
//       Movie.findOne({omdbID:req.params.id}, (error, likedStatus) => {
//         console.log('did i get here?');
//         console.log(likedStatus);
//       })
//     }
//   })
// })
//
// movies.get('/:id/comment', (req, res) => {  // to edit comment
//   Movie.find({omdbID:req.params.id}, (error, foundMovie) => {
//     console.log(req.params.id);
//     console.log(foundMovie[0]);
//   })
// })
//
// to delete comment
movies.put('/:id/deletecomment', (req, res) => {
  // console.log(req.body.comment);
  Movie.findOneAndUpdate({omdbID:req.params.id}, {comment:req.body.comment}, {new:true, upsert:true},(error, updatedComment) => {
    // console.log(updatedComment);
    res.json(updatedComment)
  })
})

movies.put('/:id/editcomment', (req, res) => {
  // console.log(req.body.comment);
  Movie.findOneAndUpdate({omdbID:req.params.id}, {comment:req.body.comment}, {new:true, upsert:true},(error, updatedComment) => {
    // console.log(updatedComment);
    res.json(updatedComment)
  })
})
//// General thought, couldn't these to be merged into one if else statement?
// LIKE MOVIE
//find by movie by id . likes $inc +1
// find user by id . movie array, add object to array

// DISLIKE MOVIE
// find movie by id, find and search user movie array if contains movies
// if present like $inc -1, remove from user movie array by ID
// else do


// ADD COMMENT TO MOVIE
// find by movie by id.commentsArray, take form data from html push to array

// EDIT COMMENT
// find movie by id, find and search movie comment array if contains comments from user, take and update comment by id

// DELETE COMMENT FROM MOVIE
// find movie by id, find and search movie comment array if contains comments from user, take and remove comment by id (probably a splice(one) and .join()?)



module.exports = movies
