(function () {
  'use strict';

  angular.module('NarrowItDownApp', [])
  .controller('NarrowItDownController', NarrowItDownController)
  .service('MenuSearchService', MenuSearchService)
  .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
  .directive('foundItems', FoundItemsDirective);

function FoundItemsDirective() {
  var ddo = {
      templateUrl: 'foundItems.html',
      scope: {
          items: '<',     
          onRemove: '&',  
          isValid: '<'   
      }
  }; 
  return ddo;
}


NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController (MenuSearchService) {
  var menu = this;

  menu.valid = true;
  menu.searchTerm = "";
  menu.found = [];

  menu.foundInMenu = function() {

      if (IsEmpty(menu.searchTerm)){
        menu.found = [];
        menu.valid = false;
        return;
      };

      var searchForItems = MenuSearchService.getMatchedMenuItems(menu.searchTerm);

      searchForItems.then( function (response) {
        menu.found = response;
        menu.valid = (response.length > 0);
      });
  };

  menu.removeItem = function (index) {
    menu.found.splice(index, 1);
  };

  function IsEmpty (findMenuItems){
      return findMenuItems.replace(/\s/g,"").length === 0;
  };
}

MenuSearchService.$inject = ['$http', 'ApiBasePath']
function MenuSearchService ($http, ApiBasePath) {
  var service = this;

  service.getMatchedMenuItems = function (searchTerm) {

    return $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json")
    }).then(function (response) {

      var allMenuItems = response.data.menu_items;

      return allMenuItems.filter( function (item) {
        return item.name.toLowerCase().includes(searchTerm.toLowerCase());
      });
    });

  };

}

})();