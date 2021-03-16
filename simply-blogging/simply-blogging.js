//pull data, verify title and desc exist
function submitArticle(){
    var obj={};
    obj.title = document.getElementById("title").value;
    obj.desc = document.getElementById("desc").value;
    obj.image = document.getElementById("image").value;
    clearFields();
    if(obj.title == ""){
        window.alert("Title must be defined");
        return;
    }else if (obj.desc == "") {
        window.alert("Description must be defined");
        return;
    }
    addArticleRow(obj,sessionKey);
    addObjectToStorage(obj);
}

//clear out storage and reset session key  MUST RELOAD
function clearStorage(){
    sessionStorage.clear()
    sessionKey=0;
    window.alert("Sucessfully deleted all articles from session storage, refreshing page");
    location.reload()
}

//given the article data, create a new article 
function addArticleRow(obj,index){
    //Create new header
    var newHeader = document.createElement("h1");
    newHeader.innerHTML = obj.title;

    //create new paragraph
    var newPar = document.createElement("p");
    newPar.innerHTML = obj.desc;
    
    //create new column, append header and paragraph
    var newCol = document.createElement("div");
    newCol.className = "col-7 articleContent";
    newCol.id = "article"+index.toString();
    newCol.appendChild(newHeader);
    newCol.appendChild(newPar)

    //create new row, append the column
    var newRow = document.createElement("div");
    newRow.className = "row justify-content-center rowMargin"
    newRow.appendChild(newCol);
    
    //append new row to the article container
    var articleContainer = document.getElementById("articleContainer");
    articleContainer.insertBefore(newRow,articleContainer.firstChild);

    //add background image or random color
    addBackgroundToArticle(obj.image,index);
}

//if we have an image use that, if not get a random color
function addBackgroundToArticle(image,index){
    var sheet = document.styleSheets[0];
    var articleID = "#article"+index.toString();
    if (image == ""){
        var r = Math.floor((Math.random() * 255) + 1);
        var g = Math.floor((Math.random() * 255) + 1);
        var b = Math.floor((Math.random() * 255) + 1);
        var rgbStr = 'rgb('+r+','+g+','+b+');'
        sheet.insertRule(articleID+'{background-color: '+rgbStr+';}',sheet.cssRules.length);
    }else{
        sheet.insertRule(articleID+'{background: url('+image+');}',sheet.cssRules.length);
    }
}

//creates a random article, mainly used for testing
function addRandomArticle(){
    document.getElementById("title").value = "Article #" +sessionKey.toString();
    document.getElementById("desc").value = "One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into a horrible vermin. He lay on his armour-like back, and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into stiff sections. The bedding was hardly able to cover it and seemed ready to slide off any moment. His many legs, pitifully thin compared with the size of the rest of him, waved about helplessly as he looked. ''What's happened to me?'' he thought. It wasn't a dream. His room, a proper human room although a little too small, lay peacefully between its four familiar walls. A collection of textile samples lay spread out on the table - Samsa was a travelling salesman - and above it there hung a picture that he had recently cut out of an illustrated magazine and housed...";
    submitArticle();
}

//clear all input fields
function clearFields(){
    document.getElementById("title").value = "";
    document.getElementById("desc").value = "";
    document.getElementById("image").value = "";
}

//on page load gather all articles saved in sessionstorage
var sessionKey = findNextSessionNum();
function findNextSessionNum(){
    var i=0;
    while(sessionStorage.key(i)!=null){
        addArticleRow(JSON.parse(sessionStorage.getItem('article'+i.toString())),i);
        i++;
    }
    return i;
}

//adds an object to storage with a unique id
function addObjectToStorage(obj){
    sessionStorage.setItem('article'+sessionKey.toString(),JSON.stringify(obj));
    sessionKey++;
}
