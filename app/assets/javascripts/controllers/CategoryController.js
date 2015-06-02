app.controller("CategoryController", [
  '$scope',
  '$location',
  '$route',
  '$routeParams',
  'Journey',
  'Category',
  'Note',
  'Snippet',
  '$sce',
  function($scope, $location, $route, $routeParams, Journey, Category, Note, Snippet, $sce) {
    $scope.journey = Journey.get({id: $routeParams.journey_id});
    $scope.category = Category.get({journey_id: $routeParams.journey_id, id: $routeParams.id});
    $scope.notes = Note.index( { journey_id: $routeParams.journey_id, category_id: $routeParams.id } );

    $scope.notes.$promise.then( function() {
      angular.forEach($scope.notes,function(note,index){
        $scope.notes[index].snippets = Snippet.index( { journey_id: $routeParams.journey_id, category_id: $routeParams.id, note_id: note.id } );
      });
    })

    $scope.showForm = false;
    $scope.visibleSnipForm = [];
    $scope.editNoteFlag = [];

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

    $scope.showNoteForm = function(note) {
      $scope.editNoteFlag[note.id] = true;
      $scope.editingNote = note;
    }

    $scope.editNote = function(note) {
      Note.update( {journey_id: $scope.journey.id}, $scope.editingNote).$promise.then( function() {
          $scope.editNoteFlag[note.id] = false;
          // $(".note-list").find("#id" +note.id).remove();
          // $(".notes").find("#" +note.id).remove();
        } );
    }

    $scope.showSnipForm = function(note) {
      $scope.visibleSnipForm[note.id] = true;
      $scope.snippet = {};
    }

    $scope.saveSnip = function(note) {
      console.log($scope.snippet);
      Snippet.create( {journey_id: $scope.journey.id, category_id: $scope.category.id, note_id: note.id}, $scope.snippet )
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
