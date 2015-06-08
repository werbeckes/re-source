app.controller("HomeController", [
  '$scope',
  '$location',
  '$route',
  'Journey',
  'Owner',
  function($scope, $location, $route, Journey, Owner) {
    var regex = /users\/(.)#/;
    var user_id = regex.exec($location.absUrl());

    var owner = Owner.check( {id: user_id[1]} );
    owner.$promise.then( function(response) {
      $scope.isOwner = response.isOwner;
    });

    $scope.journeys = Journey.index({user_id: user_id[1]});

    $scope.showForm = false;

    $scope.displayForm = function() {
      $scope.showForm = true;
      hideForm();
      function hideForm(){
        $(".cell-list").css("animation", "menuSlideUp ease-out .3s");
        $(".cat-new-button").css("animation", "menuSlideUp ease-out .3s");
        $(".cell-list").css("animation-fill-mode", "forwards");
        $(".cat-new-button").css("animation-fill-mode", "forwards");
      }
      $(".cell-list").css("height", "0");
      $(".cat-new-button").css("display", "none");
      $scope.journey = {};
    };

    $scope.slideLeft = function(className) {
//      $(className).css("animation", ".3s slideOutRight ease");
//      $(className).css("animation-fill-mode", "backwards");

    };

    $scope.createJourney = function() {
      Journey.create( $scope.journey ).$promise
        .then( function(response) {
          $location.url("/journeys/" + response.id );
        });
    };

    $scope.deleteJourney = function(journey) {
      var msg = "Are you sure you want to delete this Journey and all the categories and notes in it?";
      if (confirm(msg)) {
        Journey.destroy(journey).$promise.then(function() {
          $(".sidebar").find("#" +journey.id).remove();
        });
      }
    };

    $scope.display = function(item) {
      return ($scope.isOwner || item.public_bool);
    };


  }
]);
