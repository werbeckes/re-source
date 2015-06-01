app.controller("NavBarController", [
  '$scope',
  '$location',
  function ($scope, $location) {
    var menuOpen = false;
    $scope.showJourneySidebar = function () {
      if (menuOpen === false) {
        $(".root-container").css("transform", "translateX(80%)");
          menuOpen = true;
        } else {
        $(".root-container").css("transform", "translateX(0)");
          menuOpen = false;
        }
      };

    $scope.showCategorySidebar = function () {
      // body...
      };

    $scope.addJourneyPopup = function () {
      // body...
      };

    $scope.addCategoryPopup = function  () {
      // body...
      };
    }
  ]);