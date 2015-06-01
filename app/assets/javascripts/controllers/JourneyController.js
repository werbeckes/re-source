app.controller("JourneyController", [
  '$scope',
  '$location',
  '$routeParams',
  'Category',
  'Journey',
  function($scope, $location, $routeParams, Category, Journey) {
    $scope.journey = Journey.get({id: $routeParams.id});
    $scope.categories = Category.index( { journey_id: $routeParams.id } )

    $scope.showForm = false;
    $scope.displayForm = function() {
      $scope.showForm = true;
      $scope.category = {};
    }

    $scope.createCategory = function() {
      Category.create( {journey_id: $scope.journey.id}, $scope.category )
        .$promise.then( function(response) {
          $location.url("/journeys/" +$scope.journey.id+ "/categories/" +response.id );
        })
    }

    $scope.deleteCategory = function(category) {
      var msg = "are you sure you want to delete this Category and all the  notes in it?"
        if (confirm(msg)) {
          Category.destroy(category).$promise.then( function() {
            $(".categories").find("#id" +category.id).remove();
          })
        }
    }

  }
]);
