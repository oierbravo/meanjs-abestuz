'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Song = mongoose.model('Song'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app, agent, credentials, user, song;

/**
 * Song routes tests
 */
describe('Song CRUD tests', function () {

  before(function (done) {
    // Get application
    app = express.init(mongoose);
    agent = request.agent(app);

    done();
  });

  beforeEach(function (done) {
    // Create user credentials
    credentials = {
      username: 'username',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create a new user
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: credentials.username,
      password: credentials.password,
      provider: 'local'
    });

    // Save a user to the test db and create new Song
    user.save(function () {
      song = {
        name: 'Song name'
      };

      done();
    });
  });

  it('should be able to save a Song if logged in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Song
        agent.post('/api/songs')
          .send(song)
          .expect(200)
          .end(function (songSaveErr, songSaveRes) {
            // Handle Song save error
            if (songSaveErr) {
              return done(songSaveErr);
            }

            // Get a list of Songs
            agent.get('/api/songs')
              .end(function (songsGetErr, songsGetRes) {
                // Handle Song save error
                if (songsGetErr) {
                  return done(songsGetErr);
                }

                // Get Songs list
                var songs = songsGetRes.body;

                // Set assertions
                (songs[0].user._id).should.equal(userId);
                (songs[0].name).should.match('Song name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Song if not logged in', function (done) {
    agent.post('/api/songs')
      .send(song)
      .expect(403)
      .end(function (songSaveErr, songSaveRes) {
        // Call the assertion callback
        done(songSaveErr);
      });
  });

  it('should not be able to save an Song if no name is provided', function (done) {
    // Invalidate name field
    song.name = '';

    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Song
        agent.post('/api/songs')
          .send(song)
          .expect(400)
          .end(function (songSaveErr, songSaveRes) {
            // Set message assertion
            (songSaveRes.body.message).should.match('Please fill Song name');

            // Handle Song save error
            done(songSaveErr);
          });
      });
  });

  it('should be able to update an Song if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Song
        agent.post('/api/songs')
          .send(song)
          .expect(200)
          .end(function (songSaveErr, songSaveRes) {
            // Handle Song save error
            if (songSaveErr) {
              return done(songSaveErr);
            }

            // Update Song name
            song.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Song
            agent.put('/api/songs/' + songSaveRes.body._id)
              .send(song)
              .expect(200)
              .end(function (songUpdateErr, songUpdateRes) {
                // Handle Song update error
                if (songUpdateErr) {
                  return done(songUpdateErr);
                }

                // Set assertions
                (songUpdateRes.body._id).should.equal(songSaveRes.body._id);
                (songUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Songs if not signed in', function (done) {
    // Create new Song model instance
    var songObj = new Song(song);

    // Save the song
    songObj.save(function () {
      // Request Songs
      request(app).get('/api/songs')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Song if not signed in', function (done) {
    // Create new Song model instance
    var songObj = new Song(song);

    // Save the Song
    songObj.save(function () {
      request(app).get('/api/songs/' + songObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', song.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Song with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/songs/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Song is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Song which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Song
    request(app).get('/api/songs/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Song with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Song if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Song
        agent.post('/api/songs')
          .send(song)
          .expect(200)
          .end(function (songSaveErr, songSaveRes) {
            // Handle Song save error
            if (songSaveErr) {
              return done(songSaveErr);
            }

            // Delete an existing Song
            agent.delete('/api/songs/' + songSaveRes.body._id)
              .send(song)
              .expect(200)
              .end(function (songDeleteErr, songDeleteRes) {
                // Handle song error error
                if (songDeleteErr) {
                  return done(songDeleteErr);
                }

                // Set assertions
                (songDeleteRes.body._id).should.equal(songSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Song if not signed in', function (done) {
    // Set Song user
    song.user = user;

    // Create new Song model instance
    var songObj = new Song(song);

    // Save the Song
    songObj.save(function () {
      // Try deleting Song
      request(app).delete('/api/songs/' + songObj._id)
        .expect(403)
        .end(function (songDeleteErr, songDeleteRes) {
          // Set message assertion
          (songDeleteRes.body.message).should.match('User is not authorized');

          // Handle Song error error
          done(songDeleteErr);
        });

    });
  });

  it('should be able to get a single Song that has an orphaned user reference', function (done) {
    // Create orphan user creds
    var _creds = {
      username: 'orphan',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create orphan user
    var _orphan = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'orphan@test.com',
      username: _creds.username,
      password: _creds.password,
      provider: 'local'
    });

    _orphan.save(function (err, orphan) {
      // Handle save error
      if (err) {
        return done(err);
      }

      agent.post('/api/auth/signin')
        .send(_creds)
        .expect(200)
        .end(function (signinErr, signinRes) {
          // Handle signin error
          if (signinErr) {
            return done(signinErr);
          }

          // Get the userId
          var orphanId = orphan._id;

          // Save a new Song
          agent.post('/api/songs')
            .send(song)
            .expect(200)
            .end(function (songSaveErr, songSaveRes) {
              // Handle Song save error
              if (songSaveErr) {
                return done(songSaveErr);
              }

              // Set assertions on new Song
              (songSaveRes.body.name).should.equal(song.name);
              should.exist(songSaveRes.body.user);
              should.equal(songSaveRes.body.user._id, orphanId);

              // force the Song to have an orphaned user reference
              orphan.remove(function () {
                // now signin with valid user
                agent.post('/api/auth/signin')
                  .send(credentials)
                  .expect(200)
                  .end(function (err, res) {
                    // Handle signin error
                    if (err) {
                      return done(err);
                    }

                    // Get the Song
                    agent.get('/api/songs/' + songSaveRes.body._id)
                      .expect(200)
                      .end(function (songInfoErr, songInfoRes) {
                        // Handle Song error
                        if (songInfoErr) {
                          return done(songInfoErr);
                        }

                        // Set assertions
                        (songInfoRes.body._id).should.equal(songSaveRes.body._id);
                        (songInfoRes.body.name).should.equal(song.name);
                        should.equal(songInfoRes.body.user, undefined);

                        // Call the assertion callback
                        done();
                      });
                  });
              });
            });
        });
    });
  });

  afterEach(function (done) {
    User.remove().exec(function () {
      Song.remove().exec(done);
    });
  });
});
