'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Song Schema
 */
var SongSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Song name',
    trim: true
  },
  artist: {
    type: String,
    default: '',
     trim: true
  },
  lyrics: {
    type: String,
    default: ''
   
  },
  chords: {
    type: String,
    default: ''
   
  },
  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Song', SongSchema);
