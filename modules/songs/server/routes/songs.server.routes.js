'use strict';

/**
 * Module dependencies
 */
var songsPolicy = require('../policies/songs.server.policy'),
  songs = require('../controllers/songs.server.controller');

module.exports = function(app) {
  // Songs Routes
  app.route('/api/songs').all(songsPolicy.isAllowed)
    .get(songs.list)
    .post(songs.create);

  app.route('/api/songs/:songId').all(songsPolicy.isAllowed)
    .get(songs.read)
    .put(songs.update)
    .delete(songs.delete);

  // Finish by binding the Song middleware
  app.param('songId', songs.songByID);
};
