var controllers;

var app = angular.module('app', ['templates', 'ngRoute', 'controllers', 'ngResource']);

app.config([
  '$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: "assets/templates/index.html",
        controller: 'HomeController'
      })
  }
]);

app.config(function($httpProvider) {
  $httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');
});

app.factory("Journey", function($resource) {
  return $resource("/api/journeys/:id", {id: "@id"},
    {
      'create':  { method: 'POST' },
      'index':   { method: 'GET', isArray: true },
      'show':    { method: 'GET', isArray: false },
      'update':  { method: 'PUT' },
      'destroy': { method: 'DELETE' }
    }
  );
})


controllers = angular.module('controllers', []);
app.controller("HomeController", [
  '$scope',
  '$location',
  'Journey',
  function($scope, $location, Journey) {
    $scope.journeys = Journey.index();

    $scope.new = function() {
      $location.path("/journeys/new")
    };
  }
]);

