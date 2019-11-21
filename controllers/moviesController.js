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
  Movie.create(req.body, (error, createdMovie) => {
    res.json(createdMovie);
  });
});

// DELETE
movies.delete('/:id', (req, res) => {
  Movie.findByIdAndRemove(req.params.id, (error, deletedMovie) => {
    res.json(deletedMovie);
  });
});

// UPDATE
movies.put('/:id', (req, res) => {
  Movie.findOneAndUpdate({omdbID:req.params.id}, req.body, {new:true}, (error, updatedMovie) => {
    res.json(updatedMovie);
  });
});


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
