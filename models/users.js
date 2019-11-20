// ========================
// DEPENDENCIES
// ========================
const express = require('express')
const mongoose = require("mongoose")

// ========================
// SCHEMA
// ========================
const userSchema = new mongoose.Schema({
  name: String,
  username: {type: String, unique: true},
  password: String,
  moviesLiked: [],
})

// ========================
// MODELS
// ========================
const User = mongoose.model('User', userSchema)

module.exports = User;
