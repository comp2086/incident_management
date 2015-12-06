angular.module('users').controller('UsersController',
['$scope', '$routeParams', '$location', 'Authentication', 'Users',
function($scope, $routeParams, $location, Authentication, Users) {
  $scope.authentication = Authentication;

  // Create a new user
  $scope.create = function() {
    var user = new Users({
      
    })
  }

}
]);
