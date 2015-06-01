app.controller("NavBarController", [
  '$scope',
  '$location',
  function ($scope, $location) {
    var menuOpen = false;
    $scope.showMenu = function () {
      if (menuOpen === false) {
        $(".root-container").css("transform", "translateX(80%)");
        menuOpen = true;
      } else {
        $(".root-container").css("transform", "translateX(0)");
        menuOpen = false;
      }
    };
  }
  ]);