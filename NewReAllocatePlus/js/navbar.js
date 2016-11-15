/**
 * Created by Ramzi on 15/10/2016.
 * Modified by Callistus on 15/11/2016
 */

// for now, get the first student
var student;
var getUnitClassesHttpRequest = null;

httpGetAsync("https://reallocateplus.herokuapp.com/students", function(data){
	student = JSON.parse(data)[0];
	console.log(student)});

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

function clearRightSection() {
	var dashboard = document.getElementById("rightSection");
	while (dashboard.firstChild) {
		dashboard.removeChild(dashboard.firstChild);
	}
}

function populateMenu(array) {
	for (var i = 0; i < array.length; i++) {
		console.log(array[i].required);
		console.log()
		// create a div to store unit 
		var aDiv = document.createElement('div');
		aDiv.className = "unit";

		console.log(aDiv.className);

		// the unit div consists of h4, h5, and a tags for lecture, tutorial, labs
		var aH4 = document.createElement('h4');
		aH4.textContent = array[i].code;
		aDiv.appendChild(aH4);
		var aH5 = document.createElement('h5');
		aH5.textContent = array[i].title;
		aDiv.appendChild(aH5);

		/*// create an a element for lecture
		 for (var j=0;j<array[i].required.length;j++){
		 if (array[i].required[j].includes("Lecture")){
		 var aA = document.createElement('a');

		 aA.href = "#";
		 aA.className = "list-group-item";
		 aA.textContent = "\u00bb Lecture";
		 console.log(aA.childNodes);

		 // create the function when clicked

		 aA.addEventListener("click", constructUnitView);
		 aDiv.appendChild(aA);
		 break;
		 }
		 }

		 // create an a element for tute
		 for (var j=0;j<array[i].required.length;j++){
		 if (array[i].required[j].includes("Tutorial")){
		 var aA = document.createElement('a');

		 aA.href = "#";
		 aA.className = "list-group-item";
		 aA.textContent = "\u00bb Tutorial";
		 console.log(aA.childNodes);

		 // create the function when clicked

		 aA.addEventListener("click", constructUnitView);
		 aDiv.appendChild(aA);
		 break;
		 }
		 }

		 // create an a element for lab
		 for (var j=0;j<array[i].required.length;j++){
		 if (array[i].required[j].includes("Lab")){
		 var aA = document.createElement('a');

		 aA.href = "#";
		 aA.className = "list-group-item";
		 aA.textContent = "\u00bb Laboratory";
		 console.log(aA.childNodes);

		 // create the function when clicked

		 aA.addEventListener("click", constructUnitView);
		 aDiv.appendChild(aA);
		 break;
		 }
		 }*/
		//create the elements for the unit classes
		for (var j=0;j<array[i].required.length;j++) {

			var aA = document.createElement('a');

			aA.href = "#";
			aA.className = "list-group-item";
			aA.textContent = "\u00bb " + array[i].required[j].toString();

			// create the function when clicked

			aA.addEventListener("click", constructUnitView);
			aDiv.appendChild(aA);

		}

		document.getElementById('units').appendChild(aDiv);
	}
}

function constructUnitView(mouse) {
	clearRightSection();

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
	aH4.textContent = mouse.target.textContent.substring(2);
	unitHeader.appendChild(aH4);

	console.log(unitHeader);

	document.getElementById("rightSection").appendChild(unitHeader);

	// div container-fluid with div table-responsive with table table-bordered with tr th
	var container = document.createElement("div");
	container.className = "container-fluid";

	var tableR = document.createElement("div");
	tableR.className = "table-responsive";
	tableR.id = "tableResponsive";
	var tableB = document.createElement("table");
	tableB.className = "table table-bordered";
	tableB.id = "unitTable";

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

	// populate table
	if(getUnitClassesHttpRequest == null) {
		getUnitClassesHttpRequest = httpGetAsync("https://reallocateplus.herokuapp.com/classes?unit=" + mouse.target.parentNode.getElementsByTagName("h4")[0].textContent, function (data) {
			console.log(data);
			populateUnitTable(JSON.parse(data), student, mouse.target.textContent.substring(2));
			getUnitClassesHttpRequest = null;
		});
	}

}

function populateUnitTable(array, student, type) {
	//loop through the units
	console.log("item type: " + type);
	var d = 0;
	for (var i = 0; i < array.length; i++) {
		console.log("array type: " + array[i].type);
		console.log (array[i].type.toString() == type.toString());
		if (array[i].type.substring(0, type.length) === type) {
			d = d + 1;
			var aTr = document.createElement('tr');
			//checkbox status
			//status
			aTr.appendChild(getAvailability(array[i], student));
			//activity number
			var item = document.createElement('td');
			item.appendChild(document.createTextNode((d)));
			aTr.appendChild(item);
			//Day
			var item = document.createElement('td');
			item.appendChild(document.createTextNode(array[i].day));
			aTr.appendChild(item);
			//Time
			var item = document.createElement('td');
			item.appendChild(document.createTextNode(array[i].time));
			aTr.appendChild(item);
			//Campus
			var item = document.createElement('td');
			item.appendChild(document.createTextNode(array[i].campus));
			aTr.appendChild(item);
			//Location
			var item = document.createElement('td');
			item.appendChild(document.createTextNode(array[i].location));
			aTr.appendChild(item);
			//Staff
			var item = document.createElement('td');
			item.appendChild(document.createTextNode(array[i].staff));
			aTr.appendChild(item);
			//Duration
			var item = document.createElement('td');
			item.appendChild(document.createTextNode(array[i].duration));
			aTr.appendChild(item);
			aTr.appendChild(getCheckbox(array[i], student));

			document.getElementById("unitTable").appendChild(aTr);
		}
	}
	var aButton = document.createElement("button");
	var aA = document.createElement("a");
	aA.href = "#";
	aA.setAttribute("style", "text-decoration: none;color:white");
	aA.textContent = "Remove All Requests";

	aButton.appendChild(aA);
	aButton.addEventListener("click", removeAllRequests);

	document.getElementById("tableResponsive").appendChild(aButton);

	var aButton = document.createElement("button");
	var aA = document.createElement("a");
	aA.href = "#";
	aA.setAttribute("style", "text-decoration: none;color:white");
	aA.textContent = "Submit Requests";

	aButton.appendChild(aA);
	aButton.addEventListener("click", submitRequests);

	document.getElementById("tableResponsive").appendChild(aButton);

}

function getAvailability(unit, student) {
	var status = document.createElement('td');

	var aP = document.createElement("p");

	for (var i =0; i < student.classes.length; i++) {
		if (unit.uuid == student.classes[i]) {
			aP.textContent = "Allocated";
			aP.setAttribute("style", "color:green;text-align:center;");
			status.appendChild(aP);
			return status;
		}
	}

	if (unit.noStudents >= unit.capacity){
		aP.textContent = "Full";
		aP.setAttribute("style", "color:red;text-align:center;");
		status.appendChild(aP);
		return status;

	}
	else{
		var link = document.createElement('a');
		link.setAttribute("style", "text-align:center;");
		link.appendChild(document.createTextNode('Available'));
		link.href = "#";
		status.appendChild(link);
	}
	return status;
}

function getCheckbox(unit, student) {
	var status = document.createElement('td');
	status.className = "center";
	var checkbox = document.createElement('input');
	checkbox.type = "checkbox";
	checkbox.className = "checkbox";


	if (unit.noStudents < unit.capacity){
		checkbox.disabled = true;
	}
	for (var i =0; i < student.classes.length; i++) {
		if (unit.uuid == student.classes[i]) {
			checkbox.disabled = true;
		}
	}
	status.appendChild(checkbox);
	return status;
}
function removeAllRequests()
{

	var checkboxes =document.getElementsByClassName("checkbox");

	for(var i = 0; i < checkboxes.length; i++)
	{
		if(checkboxes[i].checked)
		{
			checkboxes[i].checked = false;
		}
	}

}

function submitRequests()
{
	alert("this button does nothing");
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
