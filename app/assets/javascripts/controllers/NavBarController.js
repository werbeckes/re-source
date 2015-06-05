app.controller("NavBarController", [
  '$scope',
  '$location',
  function ($scope, $location) {
    var menuOpen = false;
    var rightMenuOpen = false;
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

    $scope.slideRight = function  (mainDiv) {
        $(".categories-rightpane-mobile").css("transform", "translateX(100%)");
        $(mainDiv).css("transform", "translateX(100%)");
      
      };
    
    $scope.showCategoriesPane = function() {
      if (rightMenuOpen === false) {
        $("ul.note-list.row").css("display", "block");
        $("h3.row.cell-header").css("display", "block");
        $(".notes-container-global").css("transform", "translateX(-76%)");
        $(".navbar").css("transform", "translateX(-70%)");
//        $(".notes-container-global").css("overflow-y", "hidden");
        rightMenuOpen = true;
      } else {
        $(".notes-container-global").css("transform", "translateX(0)");
        $(".navbar").css("transform", "translateX(0)").delay(1000, function(){
          $("ul.note-list.row").toggle();
          $("h3.row.cell-header").toggle();
        });
        rightMenuOpen = false;
      }
      
      };
    }
  ]);