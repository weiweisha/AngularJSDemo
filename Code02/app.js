(function(){
'use strict';
angular.module('ShoppingListApp', [])
.controller('ShoppingListAddController',ShoppingListAddController)   
.controller('ShoppingListShowController',ShoppingListShowController) 
.service('ShoppingListService',ShoppingListService);

ShoppingListAddController.$inject = ['ShoppingListService'];
function ShoppingListAddController(ShoppingListService){
    var itemAdder = this;
    itemAdder.itemName = "";
    itemAdder.itemQuantity = "";

    itemAdder.addItem = function(){
        ShoppingListService.addItem(itemAdder.itemName,itemAdder.itemQuantity);
    }
}

ShoppingListShowController.$inject =['ShoppingListService'];
function ShoppingListShowController(ShoppingListService){
    var showList = this;
    showList.items = ShoppingListService.getItem();
    showList.removeItem = function(itemIndex){
        ShoppingListService.removeItem(itemIndex);
    };
}

//**Service */
function ShoppingListService(){
    var service = this;

    //list of shopping items
    var items = [];

    service.addItem = function(itemName, quantity){
        var item ={
            name:itemName,
            quantity:quantity
        };
        items.push(item);
    };

    service.getItem = function(){
        return items;
    };

    service.removeItem = function(itemIndex){
        return items.splice(itemIndex, 1);
    };
}

})();