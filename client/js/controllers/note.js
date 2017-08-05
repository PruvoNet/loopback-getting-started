angular
  .module('app')
  .controller('AddNoteController', ['$scope', 'Note', 'User',
    '$state', '$rootScope', function ($scope, Note, User, $state, $rootScope) {
      $scope.action = 'Add';
      $scope.note = {};
      $scope.isDisabled = false;

      $scope.submitForm = function () {
        User.notes
          .create({id: 'me'}, {
            title: $scope.note.title,
            content: $scope.note.content
          })
          .$promise
          .then(function () {
            $state.go('my-notes');
          });
      };
    }])
  .controller('ArchiveNoteController', ['$scope', 'Note', '$state',
    '$stateParams', function ($scope, Note, $state, $stateParams) {
      Note
        .prototype$archive({id: $stateParams.id})
        .$promise
        .then(function () {
          $state.go('my-notes');
        });
    }])
  .controller('EditNoteController', ['$scope', '$q', 'Note', 'User',
    '$stateParams', '$state', '$rootScope', function ($scope, $q, Note, User,
                                                      $stateParams, $state, $rootScope) {
      $scope.action = 'Edit';
      $scope.note = {};
      $scope.isDisabled = true;

      $q
        .all([
          User.notes.findById({id: $rootScope.currentUser.email, fk: $stateParams.id}).$promise
        ])
        .then(function (data) {
          $scope.note = data[0];
        });

      $scope.submitForm = function () {
        Note.prototype$patchAttributes({
          id: $scope.note.id
        }, {
          title: $scope.note.title,
          content: $scope.note.content
        })
          .$promise
          .then(function () {
            $state.go('my-notes');
          });
      };
    }])
  .controller('MyNotesController', ['$scope', 'User', '$rootScope',
    function ($scope, User, $rootScope) {
      if (!$rootScope.currentUser || !$rootScope.currentUser.email) {
        $scope.$watch('currentUser.email', function (value) {
          if (!value) {
            return;
          }
          $scope.notes = User.notes(
            {
              id: 'me',
              filter: {
                where: {
                  archived: false
                }
              }
            }
          );
        });
      } else {
        $scope.notes = User.notes(
          {
            id: 'me',
            filter: {
              where: {
                archived: false
              }
            }
          }
        );
      }
    }
  ])
  .controller('MyArchivedNotesController', ['$scope', 'User', '$rootScope',
    function ($scope, User, $rootScope) {
      if (!$rootScope.currentUser || !$rootScope.currentUser.email) {
        $scope.$watch('currentUser.email', function (value) {
          if (!value) {
            return;
          }
          $scope.notes = User.notes(
            {
              id: 'me',
              filter: {
                where: {
                  archived: true
                }
              }
            }
          );
        });
      } else {
        $scope.notes = User.notes(
          {
            id: 'me',
            filter: {
              where: {
                archived: true
              }
            }
          }
        );
      }
    }
  ])

;
