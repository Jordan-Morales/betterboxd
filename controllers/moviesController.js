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
    if (foundMovie[0] === undefined) {
      Movie.create(req.body, (error, createdMovie) => {
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

//Add Comment / Create Create Movie in Database, if not already there
movies.put('/:id/newcomment', (req, res) => {
  Movie.find({omdbID:req.params.id}, (error, foundMovie) => {
    if (foundMovie[0] === undefined) {
      Movie.create(req.body, (error, createdMovie) => {
        res.json(createdMovie);
      })
    } else {
      Movie.findOneAndUpdate({omdbID:req.params.id}, {$push:{comment:req.body.comment}}, {new:true}, (error, updatedMovie) => {
        res.json(updatedMovie);
      })
    }
  })
})

// Increasing Likes / Create Create Movie in Database, if not already there
movies.put('/:id/addlikes', (req, res) => {
      Movie.findOneAndUpdate({omdbID:req.params.id}, {$inc:{likes: 1 }}, {new:true}, (error, updatedMovie) => {
        res.json(updatedMovie);
      })
  })


// Decreasing Likes
movies.put('/:id/declikes', (req, res) => {
  Movie.findOneAndUpdate({omdbID:req.params.id}, {$inc:{likes: -1 }}, {new:true}, (error, updatedMovie) => {
    res.json(updatedMovie);
  }
)
})

// to delete comment
movies.put('/:id/deletecomment', (req, res) => {
  Movie.findOneAndUpdate({omdbID:req.params.id}, {comment:req.body.comment}, {new:true, upsert:true},(error, updatedComment) => {
    res.json(updatedComment)
  })
})

// to edit comment
movies.put('/:id/editcomment', (req, res) => {
  Movie.findOneAndUpdate({omdbID:req.params.id}, {comment:req.body.comment}, {new:true, upsert:true},(error, updatedComment) => {
    res.json(updatedComment)
  })
})

module.exports = movies
