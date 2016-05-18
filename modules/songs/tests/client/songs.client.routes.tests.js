(function () {
  'use strict';

  describe('Songs Route Tests', function () {
    // Initialize global variables
    var $scope,
      SongsService;

    //We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _SongsService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      SongsService = _SongsService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('songs');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/songs');
        });

        it('Should be abstract', function () {
          expect(mainstate.abstract).toBe(true);
        });

        it('Should have template', function () {
          expect(mainstate.template).toBe('<ui-view/>');
        });
      });

      describe('View Route', function () {
        var viewstate,
          SongsController,
          mockSong;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('songs.view');
          $templateCache.put('modules/songs/client/views/view-song.client.view.html', '');

          // create mock Song
          mockSong = new SongsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Song Name'
          });

          //Initialize Controller
          SongsController = $controller('SongsController as vm', {
            $scope: $scope,
            songResolve: mockSong
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:songId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.songResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            songId: 1
          })).toEqual('/songs/1');
        }));

        it('should attach an Song to the controller scope', function () {
          expect($scope.vm.song._id).toBe(mockSong._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/songs/client/views/view-song.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          SongsController,
          mockSong;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('songs.create');
          $templateCache.put('modules/songs/client/views/form-song.client.view.html', '');

          // create mock Song
          mockSong = new SongsService();

          //Initialize Controller
          SongsController = $controller('SongsController as vm', {
            $scope: $scope,
            songResolve: mockSong
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.songResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/songs/create');
        }));

        it('should attach an Song to the controller scope', function () {
          expect($scope.vm.song._id).toBe(mockSong._id);
          expect($scope.vm.song._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/songs/client/views/form-song.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          SongsController,
          mockSong;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('songs.edit');
          $templateCache.put('modules/songs/client/views/form-song.client.view.html', '');

          // create mock Song
          mockSong = new SongsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Song Name'
          });

          //Initialize Controller
          SongsController = $controller('SongsController as vm', {
            $scope: $scope,
            songResolve: mockSong
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:songId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.songResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            songId: 1
          })).toEqual('/songs/1/edit');
        }));

        it('should attach an Song to the controller scope', function () {
          expect($scope.vm.song._id).toBe(mockSong._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/songs/client/views/form-song.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
})();
