var Item = /** @class */ (function () {
    function Item(name, price) {
        this.name = name;
        this.price = price;
    }
    return Item;
}());
var Cart = /** @class */ (function () {
    function Cart(items) {
        this.items = items;
        this.totalCost = 0;
        this.amntOfItem = new Array();
        for (var _i in items) {
            this.amntOfItem.push(0);
        }
    }
    Cart.prototype.getTotalCost = function () {
        return this.totalCost;
    };
    Cart.prototype.addItem = function (index) {
        this.amntOfItem[index]++;
        this.totalCost += this.items[index].price;
    };
    Cart.prototype.removeItem = function (index) {
        if (this.amntOfItem[index] > 0) {
            this.amntOfItem[index]--;
            this.totalCost -= this.items[index].price;
        }
        else {
            window.alert("You dont have any of those in your cart!");
        }
    };
    Cart.prototype.getItemNameByIndex = function (index) {
        return this.items[index].name;
    };
    Cart.prototype.getItemPriceByIndex = function (index) {
        return this.items[index].price;
    };
    Cart.prototype.getItemAmountByIndex = function (index) {
        return this.amntOfItem[index];
    };
    Cart.prototype.getTotalPriceByIndex = function (index) {
        return this.amntOfItem[index] * this.items[index].price;
    };
    Cart.prototype.getTotalItemsBought = function () {
        var retVal = 0;
        this.amntOfItem.forEach(function (amnt) {
            retVal += amnt;
        });
        return retVal;
    };
    Cart.prototype.length = function () {
        return this.items.length;
    };
    return Cart;
}());
var cart;
if (sessionStorage.getItem("cart") === null) {
    createNewCart();
}
else {
    getCart();
}
function createNewCart() {
    var itemNames = ["Laptop", "Cellphone", "Printer", "Monitor", "Mouse", "A Really Cool Pencil"];
    var itemCosts = [1000, 750, 300, 100, 50, 8000];
    var itemArr = new Array();
    for (var i = 0; i < itemNames.length; i++) {
        itemArr[i] = new Item(itemNames[i], itemCosts[i]);
    }
    cart = new Cart(itemArr);
}
function fetchItems() {
    document.getElementById("cartPrice").innerHTML = "<b>Total Price: </b>$" + cart.getTotalCost().toString();
    var row;
    for (var i = 0; i < cart.length(); i++) {
        if (i % 2 == 0) { //on all even indexes, create new row
            if (i != 0) {
                document.getElementById("ItemsContainer").appendChild(row);
            } //if not first item push the old row object first
            row = document.createElement("div");
            row.className = "row justify-content-evenly";
        }
        //create new col
        var col = document.createElement("div");
        col.className = "col-sm-4 item";
        col.id = "item" + i.toString();
        //create name display
        var name_1 = document.createElement("h2");
        name_1.innerHTML = cart.getItemNameByIndex(i) + "(" + cart.getItemAmountByIndex(i) + ")";
        //create price display
        var price = document.createElement("p");
        price.innerHTML = "$" + cart.getItemPriceByIndex(i).toString();
        //create add button
        var addButton = document.createElement("input");
        addButton.setAttribute("type", "button");
        addButton.setAttribute("value", "Add Item");
        addButton.setAttribute("onClick", "addItemToCart(" + i.toString() + ")");
        //create sub button
        var subButton = document.createElement("input");
        subButton.setAttribute("type", "button");
        subButton.setAttribute("value", "Remove Item");
        subButton.setAttribute("onClick", "removeItemFromCart(" + i.toString() + ")");
        //append all to col
        col.appendChild(name_1);
        col.appendChild(price);
        col.appendChild(addButton);
        col.appendChild(subButton);
        //finally append to the row
        row.appendChild(col);
    }
    //append the final row
    document.getElementById("ItemsContainer").appendChild(row);
}
function removeItemFromCart(i) {
    cart.removeItem(i);
    updateTotalPrice();
    updateItemCount(i);
}
function addItemToCart(i) {
    cart.addItem(i);
    updateTotalPrice();
    updateItemCount(i);
}
function updateItemCount(i) {
    var elem = document.getElementById("item" + i.toString());
    elem.firstChild.textContent = cart.getItemNameByIndex(i) + "(" + cart.getItemAmountByIndex(i) + ")";
}
function updateTotalPrice() {
    document.getElementById("cartPrice").innerHTML = "<b>Total Price: </b>$" + cart.getTotalCost().toString();
}
function storeCart() {
    sessionStorage.setItem("cart", JSON.stringify(cart));
}
function getCart() {
    var temp = JSON.parse(sessionStorage.getItem("cart"));
    cart = new Cart(temp.items);
    cart.totalCost = temp.totalCost;
    cart.amntOfItem = temp.amntOfItem;
}
function populateCheckout() {
    getCart();
    var tab = document.getElementById("TableContainer");
    var tabBody = tab.getElementsByTagName("tbody")[0];
    var newRow;
    for (var i = 0; i < cart.length(); i++) {
        newRow = tabBody.insertRow(tabBody.children.length);
        newRow.insertCell(0).innerHTML = "<td>" + (i + 1).toString() + "</td>";
        newRow.insertCell(1).innerHTML = "<td>" + cart.getItemNameByIndex(i) + "</td>";
        newRow.insertCell(2).innerHTML = "<td>$" + cart.getItemPriceByIndex(i) + "</td>";
        newRow.insertCell(3).innerHTML = "<td>" + cart.getItemAmountByIndex(i) + "</td>";
        newRow.insertCell(4).innerHTML = "<td>$" + cart.getTotalPriceByIndex(i) + "</td>";
    }
    newRow = tabBody.insertRow(tabBody.children.length);
    newRow.insertCell(0).innerHTML = "<td> <b>TOTAL</b> </td>";
    newRow.insertCell(1).innerHTML = "<td></td>";
    newRow.insertCell(2).innerHTML = "<td></td>";
    newRow.insertCell(3).innerHTML = "<td><b>" + cart.getTotalItemsBought() + "</b></td>";
    newRow.insertCell(4).innerHTML = "<td><b>$" + cart.getTotalCost() + "</b></td>";
}
