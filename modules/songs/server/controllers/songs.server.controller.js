'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Song = mongoose.model('Song'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Song
 */
exports.create = function(req, res) {
  var song = new Song(req.body);
  song.user = req.user;

  song.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(song);
    }
  });
};

/**
 * Show the current Song
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var song = req.song ? req.song.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  song.isCurrentUserOwner = req.user && song.user && song.user._id.toString() === req.user._id.toString() ? true : false;

  res.jsonp(song);
};

/**
 * Update a Song
 */
exports.update = function(req, res) {
  var song = req.song ;

  song = _.extend(song , req.body);

  song.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(song);
    }
  });
};

/**
 * Delete an Song
 */
exports.delete = function(req, res) {
  var song = req.song ;

  song.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(song);
    }
  });
};

/**
 * List of Songs
 */
exports.list = function(req, res) { 
  Song.find().sort('-created').populate('user', 'displayName').exec(function(err, songs) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(songs);
    }
  });
};

/**
 * Song middleware
 */
exports.songByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Song is invalid'
    });
  }

  Song.findById(id).populate('user', 'displayName').exec(function (err, song) {
    if (err) {
      return next(err);
    } else if (!song) {
      return res.status(404).send({
        message: 'No Song with that identifier has been found'
      });
    }
    req.song = song;
    next();
  });
};
