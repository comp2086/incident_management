// AngularJS service with $resource factory method to communicate
// with the API endpoints
angular.module('users').factory('Users', ['$resource', function($resource) {
  return $resource('/users/:userId', {
    userId: '@_id'
  }, {
    update: {
      method: 'PUT'
    },
    remove: {
      method: 'DELETE',
      url: 'users/:id',
      params: {id: '@_id'}
    }
  });
}]);
