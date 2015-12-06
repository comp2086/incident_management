// Main app module
// References all of our modules(only users, for now)

var mainAppModuleName = 'main';

var mainAppModule = angular.module(mainAppModuleName, ['ngRoute', 'ngResource', 'users']);

mainAppModule.config(['$locationProvider', function($locationProvider) {
  $locationProvider.hashPrefix('!');
}]);

// Tell search engine that this is a single page app
if(window.location.hash === '#_=_') window.location.hash = '#!';

// Bootstrap angular app
angular.element(document).ready(function() {
  angular.bootstrap(document, [mainAppModuleName]);
});
