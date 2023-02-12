(function(){
'use strict';
angular.module('myApp',[])
.controller('ShoppingListController1',ShoppingListController1)
.controller('ShoppingListController2',ShoppingListController2)
.factory('ShoppingListFactory',ShoppingListFactory);

ShoppingListController1.$inject = ['ShoppingListFactory'];
function ShoppingListController1(ShoppingListFactory){
    var list1 = this;
    
    //use factory to create new shopping list service
    var service = ShoppingListFactory();

    list1.items = service.getItems();
    list1.itemName = "";
    list1.itemQuantity = "";
    list1.addItem = function(){
        service.addItem(list1.itemName, list1.itemQuantity);
    };
    list1.removeItem = function(index){
        service.removeItem(index);
    };
    list1.items = service.getItems();
    
}

ShoppingListController2.$inject = ['ShoppingListFactory'];
function ShoppingListController2(ShoppingListFactory){
    var list2 = this;
    var service = ShoppingListFactory(3);
    list2.itemName ="";
    list2.itemQuantity = "";
    list2.addItem = function(){
        try {
            service.addItem(list2.itemName,list2.itemQuantity);
        } catch (error) {
            list2.errorMessage = error.message;     
        }
       
    };
    list2.removeItem = function(index){
        service.removeItem(index);
    };
    list2.items = service.getItems();
    
}

function ShoppingListService(maxItems){
    var service = this;
    var itemList = [];
    service.addItem = function(name, quantity){
        if((maxItems === undefined) ||
           (maxItems!== undefined) && (itemList.length < maxItems)){
            var item = {
                name:name,
                quantity:quantity
            };
            itemList.push(item);
        }
        else{
            throw new Error("Max items (" + maxItems + ") reached.");
        }      
    };

    service.removeItem = function(index){
        itemList.splice(index,1);
    };

    service.getItems = function(){
        return itemList;
    };
}

function ShoppingListFactory(){
    var factory = function(maxItems){
        return new ShoppingListService(maxItems);
    };

    return factory;
}

})();