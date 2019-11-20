// Dependencies
const express = require('express')
const movies = express.Router()
const Movie = require('../models/movies.js')

// INDEX

movies.get('/', (req, res) => {
    Movie.find({}, (err, foundMovie) => {
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
    Movie.findByIdAndUpdate(req.params.id, req.body, {new:true}, (error, updatedMovie) => {
      res.json(updatedMovie);
    });
});


module.exports = movies
