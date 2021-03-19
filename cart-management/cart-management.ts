//item object
class Item{
    name:string;
    price:number;
    constructor(name:string,price:number){
        this.name = name;
        this.price = price;
    }
}

//cart object
class Cart{
    items:Array<Item>;
    totalCost:number;
    amntOfItem:Array<number>;
    constructor(items:Array<Item>){
        this.items = items;
        this.totalCost = 0;
        this.amntOfItem = new Array<number>(); 
        for(let _i in items){
            this.amntOfItem.push(0);
        }       
    }
    //get total cost of all items
    getTotalCost():number{
        return this.totalCost;
    }
    //add item index i
    addItem(index:number):void{
        this.amntOfItem[index]++;
        this.totalCost += this.items[index].price;
    }
    //remove item index i
    removeItem(index:number):void{
        if(this.amntOfItem[index]>0){
            this.amntOfItem[index]--;
            this.totalCost -= this.items[index].price;
        }else{
            window.alert("You dont have any of those in your cart!")
        }
        
    }
    //get name of item index i
    getItemNameByIndex(index:number):string{
        return this.items[index].name;
    }
    //get price of item index i
    getItemPriceByIndex(index:number):number{
        return this.items[index].price;
    }
    //get item amount of item index i
    getItemAmountByIndex(index:number):number{
        return this.amntOfItem[index];
    }
    //get total price of item index i
    getTotalPriceByIndex(index:number):number{
        return this.amntOfItem[index] * this.items[index].price;
    }
    //get total amount of items bought
    getTotalItemsBought():number{
        let retVal:number = 0;
        this.amntOfItem.forEach(amnt => {
            retVal += amnt
        });
        return retVal;
    }
    //return amount of items
    length():number{
        return this.items.length;
    }
}

//global var for cart
let cart:Cart;


//if there is already a cart, get it
//if not create a new one
if(sessionStorage.getItem("cart")===null){
    createNewCart();
}else{
    getCart();
}

//create a new cart
function createNewCart() {
    let itemNames: Array<string> = ["Laptop", "Cellphone", "Printer", "Monitor", "Mouse", "A Really Cool Pencil"];
    let itemCosts: Array<number> = [1000, 750, 300, 100, 50, 8000];
    let itemArr: Array<Item> = new Array<Item>();
    for (let i = 0; i < itemNames.length; i++) {
        itemArr[i] = new Item(itemNames[i], itemCosts[i]);
    }
    cart = new Cart(itemArr);
}

//fetch items for home-page.html
function fetchItems():void{
    //update the total price b/c it may not be 0 on load
    document.getElementById("cartPrice").innerHTML = "<b>Total Price: </b>$"+cart.getTotalCost().toString();
    let row:HTMLElement;
    for(let i =0;i<cart.length();i++){
        if(i%2 ==0){//on all even indexes, create new row
            if(i!=0){document.getElementById("ItemsContainer").appendChild(row);}//if not first item push the old row object first
            row = document.createElement("div");
            row.className="row justify-content-evenly";
        }
        //create new col
        let col:HTMLElement = document.createElement("div");
        col.className="col-sm-4 item";
        col.id = "item"+i.toString();
        //create name display
        let name:HTMLElement = document.createElement("h2");
        name.innerHTML = cart.getItemNameByIndex(i) + "(" + cart.getItemAmountByIndex(i) +")";
        //create price display
        let price:HTMLElement = document.createElement("p");
        price.innerHTML = "$" +  cart.getItemPriceByIndex(i).toString();
        //create add button
        let addButton:HTMLElement = document.createElement("input");
        addButton.setAttribute("type","button");
        addButton.setAttribute("value","Add Item");
        addButton.setAttribute("onClick","addItemToCart("+i.toString()+")");
        //create sub button
        let subButton:HTMLElement = document.createElement("input");
        subButton.setAttribute("type","button");
        subButton.setAttribute("value","Remove Item");
        subButton.setAttribute("onClick","removeItemFromCart("+i.toString()+")");
        //append all to col
        col.appendChild(name);
        col.appendChild(price);
        col.appendChild(addButton);
        col.appendChild(subButton);
        //finally append to the row
        row.appendChild(col);
    }
    //append the final row
    document.getElementById("ItemsContainer").appendChild(row);
}


//removes 1 item index i from cart
function removeItemFromCart(i: number): void {
    cart.removeItem(i);
    updateTotalPrice();
    updateItemCount(i);
}

//adds 1 item index i to cart 
function addItemToCart(i: number):void{
    cart.addItem(i);
    updateTotalPrice();
    updateItemCount(i);
}

//update item count on home-page.html
function updateItemCount(i:number):void{
    let elem:HTMLElement = document.getElementById("item"+i.toString());
    elem.firstChild.textContent = cart.getItemNameByIndex(i) + "(" + cart.getItemAmountByIndex(i) +")";
}

//update total price on home-page.html
function updateTotalPrice():void{
    document.getElementById("cartPrice").innerHTML = "<b>Total Price: </b>$"+cart.getTotalCost().toString();
}

//store cart in session memory
function storeCart():void{
    sessionStorage.setItem("cart",JSON.stringify(cart));
}

//get cart from session memory
function getCart():void{
    let temp = JSON.parse(sessionStorage.getItem("cart"));

    //you cant save the fact that it is a CART so we have to move the variables over
    cart = new Cart(temp.items);
    cart.totalCost = temp.totalCost;
    cart.amntOfItem = temp.amntOfItem;
}

//populate checkout.html
function populateCheckout():void{
    getCart();
    let tab = document.getElementById("TableContainer");
    let tabBody = tab.getElementsByTagName("tbody")[0];
    let newRow;

    for (let i = 0; i < cart.length(); i++) {
        newRow = tabBody.insertRow(tabBody.children.length);

        newRow.insertCell(0).innerHTML="<td>"+(i+1).toString()+"</td>";
        newRow.insertCell(1).innerHTML="<td>"+cart.getItemNameByIndex(i)+"</td>";
        newRow.insertCell(2).innerHTML="<td>$"+cart.getItemPriceByIndex(i)+"</td>";
        newRow.insertCell(3).innerHTML="<td>"+cart.getItemAmountByIndex(i)+"</td>";
        newRow.insertCell(4).innerHTML="<td>$"+cart.getTotalPriceByIndex(i)+"</td>";
    }

    newRow = tabBody.insertRow(tabBody.children.length);

    newRow.insertCell(0).innerHTML="<td> <b>TOTAL</b> </td>";
    newRow.insertCell(1).innerHTML="<td></td>";
    newRow.insertCell(2).innerHTML="<td></td>";
    newRow.insertCell(3).innerHTML="<td><b>"+cart.getTotalItemsBought()+"</b></td>";
    newRow.insertCell(4).innerHTML="<td><b>$"+cart.getTotalCost()+"</b></td>";
}