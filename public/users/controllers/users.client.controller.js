angular.module('users').controller('UsersController',
['$scope', '$routeParams', '$location', 'Authentication', 'Users',
function($scope, $routeParams, $location, Authentication, Users) {
  $scope.authentication = Authentication;
  $scope.users = Users.query();

  // Create a new user
  $scope.create = function() {
    console.log("create-client-function");
    var user = new Users({
      firstName : this.firstName,
      lastName : this.lastName,
      email : this.email,
      username : this.username,
      password : this.password,
      role : this.role
    });

    $user.save(function(res) {
      $location.path('users/' + res._id);
    }, function(errorResponse) {
      $scope.error = errorResponse.data.message;
    });
  };

  // Find all users
  $scope.find = function() {
    console.log("find-client-function");
    $scope.users = Users.query();
  };

  // Find a single user
  $scope.findOne = function() {
    console.log("findOne-client-function");
    $scope.user = Users.get({
      userId: $routeParams.userId
    });
  };

  // Update a user
  $scope.update = function() {
    console.log("update-client-function");
    $scope.user.$update(function() {
      $location.path('users/' + $scope.user._id);
    }, function(errorResponse) {
      $scope.error = errorResponse.data.message;
    });
  };

  // Remove a user
  $scope.delete = function(index) {
    console.log("delete-client-function");
    var user = $scope.users[index];

    Users.remove({ id: user._id }, function() {
      $scope.users.splice(index, 1);
    });
  };

}
]);
