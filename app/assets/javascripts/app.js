var controllers;

var app = angular.module('app', ['templates', 'ngRoute', 'controllers']);

app.config([
  '$routeProvider', function($routeProvider) {
    return $routeProvider.when('/', {
      templateUrl: "assets/templates/index.html",
      controller: 'HomeController'
    });
  }
]);

controllers = angular.module('controllers', []);
controllers.controller("HomeController", ['$scope', function($scope) {}]);
