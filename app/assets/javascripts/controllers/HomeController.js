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
