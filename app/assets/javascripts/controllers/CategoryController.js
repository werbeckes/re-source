app.controller("CategoryController", [
  '$scope',
  '$location',
  '$route',
  '$routeParams',
  'Journey',
  'Category',
  'Note',
  '$sce',
  function($scope, $location, $route, $routeParams, Journey, Category, Note, $sce) {
    $scope.journey = Journey.get({id: $routeParams.journey_id});
    $scope.category = Category.get({journey_id: $routeParams.journey_id, id: $routeParams.id});
    $scope.notes = Note.index( { journey_id: $routeParams.journey_id, category_id: $routeParams.id } );

    $scope.showForm = false;
    $scope.visibleSnipForm = [];

    $scope.displayForm = function() {
      $scope.showForm = true;
      $scope.note = {};
    }

    $scope.createNote = function() {
      Note.create( {journey_id: $scope.journey.id, category_id: $scope.category.id}, $scope.note )
        .$promise.then( function(response) {
          //Add note title to sidebar
          // liTitle = "<li id=id" +response.id+ ">" +response.title+ "</li>";
          // $(".note-list").append(liTitle)
          // $scope.showForm = false;

          //Add note to bottom of notes div

          $route.reload();
        })
    }

    $scope.deleteNote = function(note) {
      var msg = "are you sure you want to delete this Note and all included snippets?"
      if (confirm(msg)) {
        Note.destroy( {journey_id: $scope.journey.id}, note).$promise.then( function() {
          $(".note-list").find("#id" +note.id).remove();
          $(".notes").find("#" +note.id).remove();
        } );
      }
    }

    $scope.showSnipForm = function(note) {
      $scope.visibleSnipForm[note.id] = true;
      $scope.snip = {};
    }

    $scope.saveSnip = function() {
      Note.create( {journey_id: $scope.journey.id, category_id: $scope.category.id}, $scope.note )
        .$promise.then( function(response) {
          //add the snips in here with DOM manipulation


          $route.reload();
        });
    }

    $scope.to_trusted = function(html_code) {
      return $sce.trustAsHtml(html_code);
    }
  }
]);
