// Invoke 'strict' JavaScript mode
'use strict';

// Configure the 'articles' module routes
angular.module('users').config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
		when('/', {
			templateUrl: 'users/views/view-users.client.view.html'
		});
	}
]);
