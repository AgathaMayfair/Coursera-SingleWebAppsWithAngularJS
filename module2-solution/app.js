(function(){
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService){

  var toBuyItem = this;

  toBuyItem.showItemsToBuy = ShoppingListCheckOffService.getItemsToBuy();

  toBuyItem.addToBoughtList = function(index) {
    ShoppingListCheckOffService.addToBoughtList(index);
  };

}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService){

  var boughtItem = this;

  boughtItem.showItemsAlreadyBought = ShoppingListCheckOffService.getItemsBought();

}

function ShoppingListCheckOffService(){

  var service = this;

  var listOfItemsToBuy = [
    {
      name: "Tomatoes",
      quantity: "5"
    },
    {
      name: "Lettuce",
      quantity: "1"
    },
    {
      name: "Tuna cans",
      quantity: "2"
    },
    {
      name: "Celerys",
      quantity: "3"
    },
    {
      name: "Raisins box",
      quantity: "1"
    }
  ];

  var listOfItemsBought = [];

  service.getItemsToBuy = function() {
    return listOfItemsToBuy;
  };

  service.getItemsBought = function() {
    return listOfItemsBought;
  };

  service.addToBoughtList = function (index) {
    listOfItemsBought.push(listOfItemsToBuy[index]);
    listOfItemsToBuy.splice(index, 1);
  };


}

})();
