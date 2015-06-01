app.controller("CategoryController", [
  '$scope',
  '$location',
  '$route',
  '$routeParams',
  'Journey',
  'Category',
  'Note',
  function($scope, $location, $route, $routeParams, Journey, Category, Note) {
    $scope.journey = Journey.get({id: $routeParams.journey_id});
    $scope.category = Category.get({journey_id: $routeParams.journey_id, id: $routeParams.id});
    $scope.notes = Note.index( { journey_id: $routeParams.journey_id, category_id: $routeParams.id } );

    $scope.showForm = false;

    $scope.displayForm = function() {
      $scope.showForm = true;
      $scope.note = {};
    }

    $scope.createNote = function() {
      Note.create( {journey_id: $scope.journey.id, category_id: $scope.category.id}, $scope.note )
        .$promise.then( function(response) {
          liTitle = "<li id=id" +response.id+ ">" +response.title+ "</li>";
          $(".note-list").append(liTitle)
          $scope.showForm = false;

          //Add note title to sidebar
          //Add note to bottom of notes div

        })
    }

    // $scope.deleteJourney = function(journey) {
    //   var msg = "are you sure you want to delete this Journey and all the categories and notes in it?"
    //   if (confirm(msg)) {
    //     Journey.destroy(journey).$promise.then( $route.reload() );
    //   }
    // }
  }
]);
