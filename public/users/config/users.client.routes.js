// Invoke 'strict' JavaScript mode
'use strict';

// Configure the 'users' module routes
angular.module('users').config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider
            .when('/',
                {
                    templateUrl: 'users/views/view-users.client.view.html'
                })
            .when('/:userId',
                {
                    templateUrl: 'users/views/view-users.client.view.html'
                })
            .when('/:userId/edit',
                {
                    templateUrl: 'users/views/edit-article.client.view.html'
                })
            .otherwise(
                {
                    redirectTo: 'users/views/view-users.client.view.html'
                });
    }
]);
