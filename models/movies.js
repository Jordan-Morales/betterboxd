// ========================
// DEPENDENCIES
// ========================
const express = require('express')
const mongoose = require("mongoose")

// ========================
// SCHEMA
// ========================
const movieSchema = new mongoose.Schema({
  omdbID: String,
  likes: {type: Number, default: 0},
  comment:[{
    username: String,
    date: {type: Date, default: Date.now},
    message: String
  }]
})

// ========================
// MODELS
// ========================
const Movie = mongoose.model('Movie', movieSchema)

module.exports = Movie;
