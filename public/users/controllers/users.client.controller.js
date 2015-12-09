angular.module('users').controller('UsersController',
['$scope', '$routeParams', '$location', 'Authentication', 'Users',
function($scope, $routeParams, $location, Authentication, Users) {
  $scope.authentication = Authentication;

  // Create a new user
  $scope.create = function() {
    var user = new Users({
      firstName = this.firstName,
      lastName = this.lastName,
      email = this.email,
      username = this.username,
      password = this.password,
      role = this.role
    });

    $user.save(function(res) {
      $location.path('users/' + res._id);
    }, function(errorResponse) {
      $scope.error = errorResponse.data.message;
    });
  };

  // Find all users
  $scope.find = function() {
    $scope.users = Users.query();
  };

  // Find a single user
  $scope.findOne = function() {
    $scope.user = Users.get({
      userId: $routeParams.userId
    });
  };

  // Update a user
  $scope.update = function() {
    $scope.user.$update(function() {
      $location.path('users/' + $scope.user._id);
    }, function(errorResponse) {
      $scope.error = errorResponse.data.message;
    });
  };

  // Remove a user
  $scope.delete = function(user) {
    // Remove from the users list
    if(user) {
      user.$remove(function() {
        for(var i in $scope.users) {
          if($scope.users[i] === user) {
            $scope.users.splice(i, 1);
          }
        }
      });
    // Remove when editing a users profile
    } else {
      $scope.user.$remove(function() {
        $location.path('users');
      });
    }
  };
}
]);
