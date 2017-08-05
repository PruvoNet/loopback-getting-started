angular
  .module('app', [
    'ui.router',
    'lbServices'
  ])
  .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider,
                                                             $urlRouterProvider) {
    $stateProvider
      .state('add-note', {
        url: '/add-note',
        templateUrl: 'views/note-form.html',
        controller: 'AddNoteController',
        authenticate: true
      })
      .state('edit-note', {
        url: '/edit-note/:id',
        templateUrl: 'views/note-form.html',
        controller: 'EditNoteController',
        authenticate: true
      })
      .state('archive-note', {
        url: '/archive-note/:id',
        controller: 'ArchiveNoteController',
        authenticate: true
      })
      .state('forbidden', {
        url: '/forbidden',
        templateUrl: 'views/forbidden.html'
      })
      .state('login', {
        url: '/login',
        templateUrl: 'views/login.html',
        controller: 'AuthLoginController'
      })
      .state('logout', {
        url: '/logout',
        controller: 'AuthLogoutController'
      })
      .state('my-notes', {
        url: '/my-notes',
        templateUrl: 'views/my-notes.html',
        controller: 'MyNotesController',
        authenticate: true
      })
      .state('archived-notes', {
        url: '/archived-notes',
        templateUrl: 'views/archived-notes.html',
        controller: 'MyArchivedNotesController',
        authenticate: true
      })
      .state('sign-up', {
        url: '/sign-up',
        templateUrl: 'views/sign-up-form.html',
        controller: 'SignUpController'
      })
      .state('sign-up-success', {
        url: '/sign-up/success',
        templateUrl: 'views/sign-up-success.html'
      });
    $urlRouterProvider.otherwise('login');
  }])
  .run(['$rootScope', '$state', 'LoopBackAuth', 'AuthService', function ($rootScope, $state, LoopBackAuth, AuthService) {
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
      if (toState.authenticate && (!LoopBackAuth.accessTokenId && !$rootScope.currentUser.email)) {
        event.preventDefault();
        $rootScope.returnTo = {
          state: toState,
          params: toParams
        };
        $state.go('forbidden');
      }
    });
    if (!$rootScope.currentUser) {
      AuthService.refresh(LoopBackAuth.accessTokenId);
    }
  }]);
