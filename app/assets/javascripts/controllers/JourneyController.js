app.controller("JourneyController", [
  '$scope',
  '$location',
  '$routeParams',
  'Category',
  'Journey',
  'Owner',
  function($scope, $location, $routeParams, Category, Journey, Owner) {
    var regex = /users\/(\d+)#/;
    var user_id = regex.exec($location.absUrl());

    var owner = Owner.check( {id: user_id[1]} );
    owner.$promise.then( function(response) {
      $scope.isOwner = response.isOwner;
    });

    $scope.journey = Journey.get( { id: $routeParams.id } );
    $scope.categories = Category.index( { journey_id: $routeParams.id } )

    $scope.showForm = false;
    $scope.displayForm = function() {
      hideForm();
      function hideForm(){
        $(".cell-list").css("animation", "menuSlideUp ease-out .3s");
        $(".cat-new-button").css("animation", "menuSlideUp ease-out .3s");
        $(".cell-list").css("animation-fill-mode", "forwards");
        $(".cat-new-button").css("animation-fill-mode", "forwards");
      };
      $(".cell-list").css("height", "0");
      $(".cat-new-button").css("display", "none");
      $scope.showForm = true;
      $scope.category = {};
    };
    $scope.slideLeft = function(className) {
      $(className).css("animation", ".3s slideOutRight ease");
      $(className).css("animation-fill-mode", "backwards");
      
    };


    $scope.createCategory = function() {
      Category.create( {journey_id: $scope.journey.id}, $scope.category )
        .$promise.then( function(response) {
          $location.url("/journeys/" +$scope.journey.id+ "/categories/" +response.id );
        })
    }

    $scope.deleteCategory = function(category) {
      var msg = "Are you sure you want to delete this Category and all the  notes in it?"
        if (confirm(msg)) {
          Category.destroy(category).$promise.then( function() {
            $(".categories-list").find("#id" +category.id).remove();
          })
        }
    }

    $scope.display = function(item) { return ($scope.isOwner || item.public_bool) };

  }
]);
