(function () {
'use strict';

angular.module('LunchCheck', [])

.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {
    $scope.items = "";

    $scope.clickButton = function(){
      var eraseWhitespace = $scope.items.replace(/\s/g, "");
      var eraseComa = eraseWhitespace.replace(",,", ",");

      var listItems = eraseComa.split(',');

      $scope.message = function() {
        if(listItems.length === 1){
          document.getElementById("textbox").style.border = "2px solid red";
          document.getElementById("optionalMessage").style.color = "red";
          return "Please enter data first";
        } else {
          document.getElementById("textbox").style.border = "2px solid green";
          document.getElementById("optionalMessage").style.color = "green";
          if(listItems.length <= 3){
            return "Enjoy!";
          }else {
            return "Too Much!";
          }
        }
      }

    };

}

})();
