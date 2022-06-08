<<<<<<< HEAD
(function () {
  'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.constant('BasePath', "https://davids-restaurant.herokuapp.com")
.directive('foundItems', FoundItemsDirective);

  function FoundItemsDirective(){
    var ddo = {
      templateUrl: 'foundItems.html',
      scope: {
        items: '<',
        removeItem: '&'
      }
    };
    return ddo;
  }

  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService){
    var menu= this;

    menu.found = [];
    menu.searchTerm = "";
    menu.isOnMenu = true;

    menu.getItems = function() {

      if(isEmpty(menu.searchTerm)){
        menu.found = [];
        menu.isOnMenu = false;
        return;
      };

      function isEmpty(findOnMenu){
        return findOnMenu.replace(/\s/g,"").length === 0;
      };

      var promise = MenuSearchService.getMatchedMenuItems(menu.searchTerm);
      promise.then(function(response){
        menu.found = response;
        menu.isOnMenu = (response.length > 0);
      })
      .catch(function(error){
        console.log("Something went wrong");
      });

    };

    menu.removeItem = function(index) {
      menu.found.splice(index, 1);
    };

  }

  MenuSearchService.$inject = ['$http', 'BasePath'];
  function MenuSearchService($http, BasePath){
    var service = this;

    service.getMatchedMenuItems = function(searchTerm){
      return $http({
        method: 'GET',
        url: (BasePath + "/menu_items.json")
      }).then(function(response){

          var menuItems = response.data.menu_items;

          return menuItems.filter(function (foundItems) {
            return foundItems.name.toLowerCase().includes(searchTerm.toLowerCase());
          });

          // for(var i=0; i < menuItems.length; i++){
          //   var description = menuItems[i].description;
          //   if(description.toLowerCase().indexOf(searchTerm.toLowerCase()) != -1){
          //     foundItems.push(list[i]);
          //   }
          // }
          // return foundItems;
      })
      .catch(function(error){
        console.console.log("Something went wrong again");
      });
    };
  }

})();
=======
(function () {
  'use strict';

  angular.module('NarrowItDownApp', [])
  .controller('NarrowItDownController', NarrowItDownController)
  .service('MenuSearchService', MenuSearchService)
  .directive('foundItems', FoundItems)
  .constant('BasePath', "https://davids-restaurant.herokuapp.com/");

  function FoundItems(){
    var ddo = {
      templateUrl: 'foundItems.html',
      scope: {
        items: '<',
        removeItem: '&'
      },
    };
    return ddo;
  }

  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService){
    var menu= this;

    menu.found = [];
    var searchTerm = "";

    menu.getItems = function() {

      menu.found = [];

      var promise = MenuSearchService.getMatchedMenuItems(menu.searchTerm);
      promise.then(function(response){
        menu.found = response;
      })
      .catch(function(error){
        console.log("Something went wrong");
      });

    };

    menu.removeItem = function(index) {
      menu.found.splice(index, 1);
    };

  }

  MenuSearchService.$inject = ['$http', 'BasePath'];
  function MenuSearchService($http, BasePath){
    var service = this;

    service.getMatchedMenuItems = function(searchTerm){
      return $http({
        method: 'GET',
        url: (BasePath + "/menu_items.json"),
      }).then(function(response){
          var foundItems = [];
          var menuItems = response.data.menu_items;

          for(var i=0; i < menuItems.length; i++){
            var description = menuItems[i].description;
            if(description.toLowerCase().indexOf(searchTerm.toLowerCase()) != -1){
              foundItems.push(list[i]);
            }
          }
          return foundItems;
      });
    };
  }

})();
>>>>>>> 15a036bfbbe13620ddf0d906c316c69ce110c3ab
