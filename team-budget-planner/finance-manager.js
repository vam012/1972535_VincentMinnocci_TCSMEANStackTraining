var lastProjID = getLastProjectID();
function getLastProjectID(){
    var i=0;
    while(sessionStorage.key(i)!=null){
        i++;
    }
    return i;
}

function getProjects(){
    for (let i = 0; i < lastProjID; i++) {
        addElementToTable(JSON.parse(sessionStorage.getItem('project'+i.toString())));
    }
    addTotalRowToTable();
}

function addElementToTable(obj){
    var tab = document.getElementById("projectList");
    var tabBody = tab.getElementsByTagName("tbody")[0];
    var newRow = tabBody.insertRow(tabBody.length);

    newRow.insertCell(0).innerHTML="<td>"+obj.cName+"</td>";
    newRow.insertCell(1).innerHTML="<td>"+obj.pName+"</td>";
    newRow.insertCell(2).innerHTML="<td>"+obj.price+"</td>";

    addToTotal(eval(obj.price));
}

var totalRev=0;
function addToTotal(num){
    totalRev+=num;
}

function addTotalRowToTable(){
    var tab = document.getElementById("projectList");
    var tabBody = tab.getElementsByTagName("tfoot")[0];
    var newRow = tabBody.insertRow(tabBody.length);

    newRow.insertCell(0).innerHTML="<td><b>TOTAL<b/></td>";
    newRow.insertCell(1).innerHTML="<td></td>";
    newRow.insertCell(2).innerHTML="<td><b>"+totalRev+"<b/></td>";
}

getProjects();
