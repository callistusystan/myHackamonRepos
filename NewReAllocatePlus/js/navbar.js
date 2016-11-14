/**
 * Created by Ramzi on 15/10/2016.
 * Modified by Callistus on 15/11/2016
 */

httpGetAsync("https://reallocateplus.herokuapp.com/units", function(data){
    console.log(data);
    populateMenu(JSON.parse(data))});
	
function httpGetAsync(theUrl, callback) {
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
    for (var i = 0; i < array.length; i++) {
		// create a div to store unit 
		var aDiv = document.createElement('div');
			aDiv.className = "unit";
			
			console.log(aDiv.className);
			
			// the unit div consists of h4, h5, and 2 default a tags for lab and lecture
			var aH4 = document.createElement('h4');
			aH4.textContent = array[i].code;
			aDiv.appendChild(aH4);
			var aH5 = document.createElement('h5');
			aH5.textContent = array[i].title;
			aDiv.appendChild(aH5);
		
				// create an a element for lab
				var aA = document.createElement('a');
				
					aA.href = "#";
					aA.className = "list-group-item";
					aA.textContent = "\u00bb Laboratory";
					console.log(aA.childNodes);
				
				// create the function when clicked			
				
				aA.addEventListener("click", constructUnitView);
				aDiv.appendChild(aA);
				
				// create an a element for lecture
				var aA = document.createElement('a');
				
					aA.href = "#";
					aA.className = "list-group-item";
					aA.textContent = "\u00bb Lecture";
				aDiv.appendChild(aA);
				
				aA.addEventListener("click", constructUnitView);
				aDiv.appendChild(aA);
				
			document.getElementById('units').appendChild(aDiv);
    }
}

function constructUnitView(mouse) {
	var dashboard = document.getElementById("rightSection");
	while (dashboard.firstChild) {
		dashboard.removeChild(dashboard.firstChild);
	}

	// div unitHeader with 3 h4 tags
	var unitHeader = document.createElement("div");
		unitHeader.className = "unitHeader";
		
		var aH4 = document.createElement("h4");
			aH4.textContent = mouse.target.parentNode.getElementsByTagName("h4")[0].textContent;
		unitHeader.appendChild(aH4);
		
		var aH4 = document.createElement("h4");
			aH4.textContent = mouse.target.parentNode.getElementsByTagName("h5")[0].textContent;
		unitHeader.appendChild(aH4);
		
		var aH4 = document.createElement("h4");
			aH4.textContent = mouse.target.textContent;
		unitHeader.appendChild(aH4);
		
		console.log(unitHeader);
	
	document.getElementById("rightSection").appendChild(unitHeader);
	
	// div container-fluid with div table-responsive with table table-bordered with tr th
	var container = document.createElement("div");
		container.className = "container-fluid";
		
		var tableR = document.createElement("div");
			tableR.className = "table-responsive";
			var tableB = document.createElement("table");
				tableB.className = "table table-bordered";
			
				var aTr = document.createElement("tr");
					var aTh = document.createElement("th");
						aTh.className = "col-md-1";
						aTh.textContent = "Availability";
					aTr.appendChild(aTh);
					var aTh = document.createElement("th");
						aTh.className = "col-md-1";
						aTh.textContent = "Activity";
					aTr.appendChild(aTh);
					var aTh = document.createElement("th");
						aTh.className = "col-md-1";
						aTh.textContent = "Type";
					aTr.appendChild(aTh);
					var aTh = document.createElement("th");
						aTh.className = "col-md-1";
						aTh.textContent = "Day";
					aTr.appendChild(aTh);
					var aTh = document.createElement("th");
						aTh.className = "col-md-1";
						aTh.textContent = "Time";
					aTr.appendChild(aTh);
					var aTh = document.createElement("th");
						aTh.className = "col-md-1";
						aTh.textContent = "Campus";
					aTr.appendChild(aTh);
					var aTh = document.createElement("th");
						aTh.className = "col-md-1";
						aTh.textContent = "Location";
					aTr.appendChild(aTh);
					var aTh = document.createElement("th");
						aTh.className = "col-md-1";
						aTh.textContent = "Staff";
					aTr.appendChild(aTh);
					var aTh = document.createElement("th");
						aTh.className = "col-md-1";
						aTh.textContent = "Duration";
					aTr.appendChild(aTh);
					var aTh = document.createElement("th");
						aTh.className = "col-md-1";
						aTh.textContent = "Requests";
					aTr.appendChild(aTh);
			tableB.appendChild(aTr);
		tableR.appendChild(tableB);

	container.appendChild(tableR);
			
	document.getElementById("rightSection").appendChild(container);
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
