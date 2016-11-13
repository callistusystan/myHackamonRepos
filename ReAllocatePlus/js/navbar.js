/**
 * Created by Ramzi on 15/10/2016.
 */
/**
 * Created by Ramzi on 15/10/2016.
 */

/*var testUnits = [{
 uuid: "abcd",
 title: "Software Engineering",
 code: "FIT1357",
 classes: ["class1", "class2"],
 required: ["nothing"]
 }, {
 uuid: "bcde",
 title: "Studio 2",
 code: "FIT3040",
 classes: ["class1", "class2"],
 required: ["nothing"]
 }];*/
httpGetAsync("https://reallocateplus.herokuapp.com/units", function(data){
    console.log(data);
    document.getElementById('unitsNav').appendChild(populateMenu(JSON.parse(data)))});

function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous
    xmlHttp.send(null);
}



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

            if ( item.target == this ) {
                var element = document.getElementById("dashboard");
                element.parentNode.removeChild(element);

                var div = document.getElementById("dashboardHolder");

                var section = document.createElement("section");
                section.id = 'dashboard';
                div.appendChild(section);
                var title = document.createElement("h1");
                title.textContent = item.target.textContent.substring(0, 7);
                section.appendChild(title);

                var tableDiv = document.createElement("div");
                tableDiv.id = "tableDiv";
                section.appendChild(tableDiv);

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

                httpGetAsync("https://reallocateplus.herokuapp.com/classes?unit=" + item.target.textContent.substring(0, 7), function (data) {
                    console.log(data);
                    document.getElementById('tableDiv').appendChild(populateUnitTable(JSON.parse(data), student))
                });
            }
            else {
                constructDashboard(item.target.parentNode);
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



function handleClick()
{
    alert("hi");
    //   document.getElementById()
}
