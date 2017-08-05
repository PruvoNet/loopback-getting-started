angular
  .module('app')
  .factory('AuthService', ['User', '$q', '$rootScope', '$state', function (User, $q, $rootScope, $state) {
    function login(email, password) {
      return User
        .login({email: email, password: password})
        .$promise
        .then(function (response) {
          $rootScope.currentUser = {
            id: email,
            tokenId: response.id,
            email: email
          };
        });
    }

    function logout() {
      return User
        .logout()
        .$promise
        .then(function () {
          $rootScope.currentUser = null;
        });
    }

    function register(email, password) {
      return User
        .create({
          email: email,
          password: password
        })
        .$promise;
    }

    function refresh() {
      return User.findById({id: 'me'}, function (v) {
        $rootScope.currentUser = {
          id: v.email,
          tokenId: v.email,
          email: v.email
        }
      })
    };

    return {
      login: login,
      logout: logout,
      register: register,
      refresh: refresh
    };
  }]);
