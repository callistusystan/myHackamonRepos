/**
 * Created by Ramzi on 15/10/2016.
 */

httpGetAsync("https://reallocateplus.herokuapp.com/units", function(data){
    console.log(data);
    document.getElementById('unitsNav').appendChild(populateMenu(JSON.parse(data)))});
function httpGetAsync(theUrl, callback)
{
    var test = new XMLHttpRequest();
    test.onreadystatechange = function() {
        if (test.readyState == 4 && test.status == 200)
            callback(test.responseText);
    };
    test.open("GET", theUrl, true); // true for asynchronous
    test.send(null);
    return test;
}
var getUnitClassesHttpRequest = null;

function populateMenu(array) {
    // Create the list element:
    var list = document.createElement('ul');

    for (var i = 0; i < array.length; i++) {
        var item = document.createElement('li');
        item.id = array[i].code;
        item.className = "navItem";

        console.log(item.className);

        var constructDashboard;
        constructDashboard = function(item){
            console.log("clicked");
                if (item.target == this) {
                    var section = document.getElementById("dashboard");
                    var title = document.createElement("h1");
                    title.textContent = item.target.textContent.substring(0, 7);
                    section.appendChild(title);

                    deleteOldDashboard();

                    if(getUnitClassesHttpRequest == null) {
                        getUnitClassesHttpRequest = httpGetAsync("https://reallocateplus.herokuapp.com/classes?unit=" + item.target.textContent.substring(0, 7), function (data) {
                            console.log(data);
                            deleteOldDashboard();
                            document.getElementById('tableDiv').appendChild(populateUnitTable(JSON.parse(data), student));
                            getUnitClassesHttpRequest = null;
                        });
                    }

                }

        };
        item.addEventListener("click", constructDashboard);
        item.appendChild(document.createTextNode(array[i].code));
        item.appendChild(document.createElement('br'));
        var span = document.createElement('span');
        span.className = "buffer";
        var subItem = document.createTextNode(array[i].title);
        span.style.fontSize = "12px";
        span.appendChild(subItem);
        item.appendChild(span);
        list.appendChild(item);

    }

    return list;
}

function deleteOldDashboard()
{
    var element = document.getElementById("dashboard");
    element.parentNode.removeChild(element);

    var div = document.getElementById("dashboardHolder");

    var section = document.createElement("section");
    section.id = 'dashboard';
    div.appendChild(section);

    var tableDiv = document.createElement("div");
    tableDiv.id = "tableDiv";
    section.appendChild(tableDiv);

    var buttonsSection = document.getElementById("buttons");

    var numberOfButtons =buttonsSection.childNodes.length;
    while(numberOfButtons > 0) {
        var child = buttonsSection.childNodes[numberOfButtons - 1];
        buttonsSection.removeChild(child);
        numberOfButtons--;
    }
    makeButtons();
}

function makeButtons()
{
    var section = document.getElementById("buttons");

    var button1 = document.createElement("button");
    button1.textContent = "Remove all Requests";
    section.appendChild(button1);

    var button2 = document.createElement("button");
    button2.textContent = "Update Requests";

    button2.addEventListener("click", function () {

        var element = document.getElementById("dashboard");
        element.parentNode.removeChild(element);

        var div = document.getElementById("dashboardHolder");

        var section = document.createElement("section");
        section.id = 'dashboard';
        div.appendChild(section);
        var title = document.createElement("p");
        title.textContent = "You have been placed in the queue. You will be reallocated when one of your requested classes becomes available.";
        section.appendChild(title);
        httpGetAsync("https://reallocateplus.herokuapp.com/swap", function () {
        });
    })
    section.appendChild(button2);



}
function timer()
{

    return true;
}

function handleClick()
{
    alert("hi");
    //   document.getElementById()
}
