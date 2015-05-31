app.controller("JourneyController", [
  '$scope',
  '$location',
  '$routeParams',
  'Category', // references the factory that we made
  'Journey',
  function($scope, $location, $routeParams, Category, Journey) {
    $scope.journey = Journey.get({id: $routeParams.id});
    $scope.categories = Category.index( { journey_id: $routeParams.id } )
    // $scope.categories = Category.index();

    // $scope.new = function() {
    //   $location.path("/categories/new")
    // };
  }
]);


// lh:3000/sdf#/journeys/:id <- current view
// lh:3000/sdf#/journeys/:journey_id/categories/:id <- view from categries perspective
