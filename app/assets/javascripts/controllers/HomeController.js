app.controller("HomeController", [
  '$scope',
  '$location',
  '$route',
  'Journey',
  function($scope, $location, $route, Journey) {
    $scope.journeys = Journey.index();

    $scope.showForm = false;

    $scope.displayForm = function() {
      $scope.showForm = true;
      $scope.journey = {};
    }

    $scope.createJourney = function() {
      Journey.create( $scope.journey ).$promise
        .then( function(response) {
          $location.url("/journeys/" + response.id );
        })
    }

    $scope.deleteJourney = function(journey) {
      // alert("are you sure you want to delete this Journey and all the categories and notes in it?");
      Journey.destroy(journey).$promise
        .then( $route.reload() );
    }
  }
]);
