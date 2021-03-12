function validate(input){
    if (isNaN(input)){
        window.alert("Must input a number for price and time estimates");
        return -1;
    }else{
        var temp = eval(input);
        if (input < 0){
            window.alert("Must input a positive number for price and time estimates");
            return -1;
        }
        return temp;
    }
}

function clearInputs(){
    document.getElementById("cName").value="";
    document.getElementById("price").value="";
    document.getElementById("timeEst").value="";
}

function getClientName(list){
    return list[Math.floor(Math.random() * list.length)];
}

var clientList = ['Company A','Company B','Company C','Company D'];
function fillWithData(){
    for (let i = 0; i < 10; i++) {
        document.getElementById("cName").value=getClientName(clientList);
        document.getElementById("price").value=Math.floor((Math.random() * 10000) + 1);
        document.getElementById("timeEst").value=Math.floor((Math.random() * 40) + 1);
        pullData();
    }
}

function addInputToList(obj){
    var tab = document.getElementById("projectList");
    var tabBody = tab.getElementsByTagName("tbody")[0];
    var newRow = tabBody.insertRow(tabBody.length);

    newRow.insertCell(0).innerHTML="<tr>"+obj.cName+"</tr>";
    newRow.insertCell(1).innerHTML="<tr>"+obj.price+"</tr>";
    newRow.insertCell(2).innerHTML="<tr>"+obj.timeEst+"</tr>";
}

function pullData(){
    var obj={};
    obj.cName = document.getElementById("cName").value;
    obj.price = validate(document.getElementById("price").value);
    if (obj.price == -1){
        clearInputs();
        return;
    }
    obj.timeEst = validate(document.getElementById("timeEst").value);
    if (obj.timeEst == -1){
        clearInputs();
        return;
    }
    clearInputs();
    document.getElementById("reportDiv").className="hidden";
    addInputToList(obj);
    addObjectToStorage(obj);
}

var holdObj = [];

function addObjectToStorage(obj){
    var temp = [];
    temp.push(obj.cName);
    temp.push(obj.price);
    temp.push(obj.timeEst);

    holdObj.push(temp);
    sessionStorage.setItem("projects",holdObj);
}

function pullObjectFromStorage(){
    return sessionStorage.getItem("projects");
}

function generateReport(){
    document.getElementById("reportDiv").className="";
    var projectObj = pullObjectFromStorage();
    console.log(projectObj);
    var holdArr = projectObj.split(',');
    console.log(holdArr);
}