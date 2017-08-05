angular
  .module('app')
  .controller('AuthLoginController', ['$scope', 'AuthService', '$state',
      function($scope, AuthService, $state) {

    $scope.login = function() {
      AuthService.login($scope.user.email, $scope.user.password)
        .then(function() {
          if ($scope.returnTo && $scope.returnTo.state) {
            $state.go(
              $scope.returnTo.state.name,
              $scope.returnTo.params
            );
            $scope.returnTo.state  = null;
            $scope.returnTo.params = null;
            return;
          }
          $state.go('my-notes');
        });
    };
  }])
  .controller('AuthLogoutController', ['$scope', 'AuthService', '$state',
      function($scope, AuthService, $state) {
    AuthService.logout()
      .then(function() {
        $state.go('login');
      });
  }])
  .controller('SignUpController', ['$scope', 'AuthService', '$state',
      function($scope, AuthService, $state) {
    $scope.register = function() {
      AuthService.register($scope.user.email, $scope.user.password)
        .then(function() {
          $state.transitionTo('sign-up-success');
        });
    };
  }]);
