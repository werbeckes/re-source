app.controller("CategoryController", [
  '$scope',
  '$location',
  '$route',
  '$routeParams',
  'Journey',
  'Category',
  'Note',
  'Snippet',
  'UnassignedSnippet',
  'Owner',
  '$sce',
  function($scope, $location, $route, $routeParams, Journey, Category, Note, Snippet, UnassignedSnippet, Owner, $sce ) {
    var regex = /users\/(.)#/;
    var user_id = regex.exec($location.absUrl());
    $scope.fullPath = $location.absUrl();

    var owner = Owner.check( {id: user_id[1]} );
    owner.$promise.then( function(response) {
      $scope.isOwner = response.isOwner;
    });

    $scope.journey = Journey.get({id: $routeParams.journey_id});
    $scope.category = Category.get({journey_id: $routeParams.journey_id, id: $routeParams.id});
    $scope.notes = Note.index( { journey_id: $routeParams.journey_id, category_id: $routeParams.id } );

    UnassignedSnippet.index({user_id: user_id[1]}).$promise.then( function(response) {
      $scope.unassignedSnippets = response;
    })

    $scope.notes.$promise.then( function() {
      angular.forEach($scope.notes,function(note,index){
        $scope.notes[index].snippets = Snippet.index( { journey_id: $routeParams.journey_id, category_id: $routeParams.id, note_id: note.id } );
      });
    });

    $scope.showForm = false;
    $scope.visibleSnipForm = [];
    $scope.editNoteFlag = [];
    var menuOpen = false;

    $scope.displayForm = function() {
      hideForm();
      function hideForm(){
        $(".note-list").css("animation", "menuSlideUp ease-out .3s");
        $(".cat-new-button").css("animation", "menuSlideUp ease-out .3s");
        $(".note-list").css("animation-fill-mode", "forwards");
        $(".cat-new-button").css("animation-fill-mode", "forwards");
      };
      $(".note-list").css("height", "0");
      $(".cat-new-button").css("display", "none");
      $scope.showForm = true;
      $scope.note = {};
    };

    $scope.toggleMenu = function(noteId) {
      var noteAsString =  "#context" + noteId.toString();
      if (menuOpen === false) {
        $(noteAsString).css("animation", "toggle_context_menu_open ease-in-out .3s");
        $(noteAsString).css("animation-fill-mode", "forwards");
        $(noteAsString).css("box-shadow", "-5px 0px 16px 6px rgba(0, 0, 0, .1)");
        menuOpen = true;
      }else {

        $(noteAsString).css("animation", "toggle_context_menu_closed ease-in-out .3s");
        $(noteAsString).css("animation-fill-mode", "forwards");
        $(noteAsString).css("box-shadow", "none");
        menuOpen = false;
      }
    };

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
      var msg = "Are you sure you want to delete this Note and all included snippets?"
      // $scope.toggleMenu(note.id);
      if (confirm(msg)) {
        Note.destroy( {journey_id: $scope.journey.id}, note).$promise.then( function() {
          $(".note-list").find("#id" +note.id).remove();
          $(".notes").find("#note-" +note.id).remove();
        } );
      }
    }

    $scope.showNoteForm = function(note) {
      $scope.editNoteFlag[note.id] = true;
      $scope.editingNote = note;
    }

    $scope.hideNoteForm = function(note) {
      $scope.editNoteFlag[note.id] = false;
    }

    $scope.editNote = function(note) {
      Note.update( {journey_id: $scope.journey.id}, $scope.editingNote).$promise.then( function() {
          $scope.editNoteFlag[note.id] = false;
        } );
    }

    $scope.showSnipForm = function(note) {
      $scope.toggleMenu(note.id);
      $scope.visibleSnipForm[note.id] = true;
      $scope.snippet = {};
    }

    $scope.hideSnipForm = function(note) {
      $scope.visibleSnipForm[note.id] = false;
    }

    $scope.saveSnip = function(note) {
      Snippet.create( {journey_id: $scope.journey.id, category_id: $scope.category.id, note_id: note.id}, $scope.snippet )
        .$promise.then( function(response) {
          //add the snips in here with DOM manipulation

          $route.reload();
        });
    }

    $scope.saveSnipEdit = function(note, snippet) {
      Snippet.update( {journey_id: $scope.journey.id, category_id: $scope.category.id, note_id: note.id, snippet_id: snippet.id}, snippet )
    }

    $scope.deleteSnippet = function(snippet) {
      var msg = "Are you sure you want to delete this snippet?"
      if (confirm(msg)) {
        Snippet.destroy( {journey_id: $scope.journey.id, category_id: $scope.category.id}, snippet).$promise.then( function() {
          $(".show-snippets-container").find("#snip" + snippet.id).remove();
        })
      }
    }

    $scope.addToNote = function(note, snippet) {
      snippet.note_id = note.id;

      Snippet.update( {journey_id: $scope.journey.id, category_id: $scope.category.id, note_id: note.id, snippet_id: snippet.id}, snippet )
        .$promise.then( function(response){
          // console.log("We give a shit. Improve on this.");
          $route.reload();
        })
    }

    $scope.display = function(item) { return ($scope.isOwner || item.public_bool) };

    $scope.validUrl = function(snippet) {
      if (snippet.cached_url) {return true}
      else {return false}
    }

    $scope.to_trusted = function(html_code) {
      return $sce.trustAsHtml(html_code);
    }
  }
]);
