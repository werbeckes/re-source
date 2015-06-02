var app = angular.module('resourceApp', ['templates', 'ngRoute', 'ngResource']);

app.config([
  '$routeProvider', function($routeProvider,$locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: "../assets/templates/index.html",
        controller: 'HomeController'})
      .when('/journeys/:id', {
        templateUrl: "../assets/templates/journey.html",
        controller: 'JourneyController'})
      .when('/journeys/:journey_id/categories/:id', {
        templateUrl: "../assets/templates/category.html",
        controller: 'CategoryController'})
      .otherwise( { redirectTo: '/' } );
  }
]);

app.config(function($httpProvider) {
  $httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');
});

