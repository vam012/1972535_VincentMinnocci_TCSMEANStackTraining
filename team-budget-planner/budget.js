function validate(input){
    if (isNaN(input)){
        window.alert("Must input a number for price estimates");
        return -1;
    }else{
        var temp = eval(input);
        if (input < 0){
            window.alert("Must input a positive number for price estimates");
            return -1;
        }
        return temp;
    }
}

function clearInputs(){
    document.getElementById("cName").value="";
    document.getElementById("pName").value="";
    document.getElementById("price").value="";
}

function randomListChoice(list){
    return list[Math.floor(Math.random() * list.length)];
}

var clientList = ['Company A','Company B','Company C','Company D'];
var projectList = ['Project A','Project B','Project C','Project D','Project E','Project F','Project G','Project H','Project I','Project J']
function fillWithData(){
    for (let i = 0; i < 5; i++) {
        document.getElementById("cName").value=randomListChoice(clientList);
        document.getElementById("pName").value=randomListChoice(projectList);
        document.getElementById("price").value=Math.floor((Math.random() * 50000) + 1);
        pullData();
    }
    window.alert("Sucessfully added 5 random projects!");
}


function pullData(){
    var obj={};
    obj.cName = document.getElementById("cName").value;
    obj.pName = document.getElementById("pName").value;
    obj.price = validate(document.getElementById("price").value);
    if (obj.price == -1){
        clearInputs();
        return;
    }
    clearInputs();
    addObjectToStorage(obj);
}

var i = 0;
function addObjectToStorage(obj){
    console.log(obj)
    sessionStorage.setItem(toString(i),JSON.stringify(obj));
    i++;
}