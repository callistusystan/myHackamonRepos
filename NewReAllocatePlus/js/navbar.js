/**
 * Created by Ramzi on 15/10/2016.
 * Modified by Callistus on 15/11/2016
 */

// for now, get the first student
var student;
var units;
var allClasses;
var getUnitClassesHttpRequest = null;
function getParameterByName(name, url) {
	if (!url) {
		url = window.location.href;
	}
	name = name.replace(/[\[\]]/g, "\\$&");
	var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
		results = regex.exec(url);
	if (!results) return null;
	if (!results[2]) return '';
	return decodeURIComponent(results[2].replace(/\+/g, " "));
}
const student_id = getParameterByName("student_id");
httpGetAsync("https://reallocateplus.herokuapp.com/students", function(data){
	var jsonData = JSON.parse(data);
	jsonData.forEach(function(a_student) {
		if (a_student.uuid == student_id) {
			student = a_student;
		}
	});
	populateProfile(student);
	console.log(student)});

httpGetAsync("https://reallocateplus.herokuapp.com/units", function(data){
	units = JSON.parse(data);
	
	// change to number of actual requests
	document.getElementById("myRequestsButton").innerHTML = 'My Requests <span class="badge">' + getNoOfStudentRequests(student) + "</span>";
	populateMenu(JSON.parse(data))});

httpGetAsync("https://reallocateplus.herokuapp.com/classes", function(data){
	allClasses = JSON.parse(data)});

createHomeView();

document.getElementById("homeButton").addEventListener("click", createHomeView);
document.getElementById("myRequestsButton").addEventListener("click", createRequestView);

function createHomeView() {
	clearRightSection();
	var aH2 = document.createElement("h2");
		aH2.textContent = "Welcome to the new and improved Allocate+";
	document.getElementById("rightSection").appendChild(aH2);
	document.getElementById("rightSection").appendChild(document.createElement("hr"));

    var aH3 = document.createElement("h3");
        aH3.textContent = "Modes and dates";
    document.getElementById("rightSection").appendChild(aH3);

    var aP = document.createElement("p");
        var aTable = document.createElement("table");
            var aTr = document.createElement("tr");
                var aTd = document.createElement("td");
                    var aS = document.createElement("strong");
                        aS.textContent = "Preference mode:";
                aTd.appendChild(aS);
            aTr.appendChild(aTd);
                var aTd = document.createElement("td");
                    aS.textContent = "Enter your preferred times for each activity";
            aTr.appendChild(aTd);

        aTable.appendChild(aTr);
		
            var aTr = document.createElement("tr");
                var aTd = document.createElement("td");
                    var aS = document.createElement("strong");
                        aS.textContent = "Sort:";
                aTd.appendChild(aS);
            aTr.appendChild(aTd);
                var aTd = document.createElement("td");
                    aS.textContent = "The system closes to sort all entries";
            aTr.appendChild(aTd);

        aTable.appendChild(aTr);
		
            var aTr = document.createElement("tr");
                var aTd = document.createElement("td");
                    var aS = document.createElement("strong");
                        aS.textContent = "Adjustment mode:";
                aTd.appendChild(aS);
            aTr.appendChild(aTd);
                var aTd = document.createElement("td");
                    aS.textContent = "Make changes and fix any clashing classes";
            aTr.appendChild(aTd);

        aTable.appendChild(aTr);
		
	aP.appendChild(aTable);
	
	document.getElementById("rightSection").appendChild(aP);
	document.getElementById("rightSection").appendChild(document.createElement("hr"));
	
	var aP = document.createElement("p");
		aP.innerHTML = "If you haven't used Allocate+ before, you may want to take the <strong>Quick Tour : Allocate+</strong>. You can find it in the <strong>Allocate+ Help</strong> menu to the right of your screen (not available on mobile devices).";
	document.getElementById("rightSection").appendChild(aP);
}
	
function createRequestView() {
	clearRightSection();
	
	var aH2 = document.createElement("h2");
		aH2.textContent = "My Requests";
		
	document.getElementById("rightSection").appendChild(aH2);
		
	for (var i = 0;i < units.length;i++){
		document.getElementById("rightSection").appendChild(document.createElement("hr"));
		var aH3 = document.createElement("h3");
			aH3.textContent = units[i].code;
		document.getElementById("rightSection").appendChild(aH3);
		
		var aH3 = document.createElement("h3");
			aH3.textContent = units[i].title;
		document.getElementById("rightSection").appendChild(aH3);
		
		// create table for request
		
		/*if (){
		} 
		else*/ {
			var container = document.createElement("div");
			container.className = "container-fluid col";

			var tableR = document.createElement("div");
			tableR.className = "table-responsive";
			tableR.id = "tableResponsive";
			var tableB = document.createElement("table");
			tableB.className = "table table-bordered requestTable";

			var aTr = document.createElement("tr");
			var aTh = document.createElement("th");
			aTh.className = "col-md-4";
			aTh.textContent = "Class Type";
			aTr.appendChild(aTh);
			var aTh = document.createElement("th");
			aTh.className = "col-md-4";
			aTh.textContent = "Current Allocation";
			aTr.appendChild(aTh);
			var aTh = document.createElement("th");
			aTh.className = "col-md-4";
			aTh.textContent = "Request";
			aTr.appendChild(aTh);
			tableB.appendChild(aTr);

			populateRequestTable(tableB, student, units[i]);
			tableR.appendChild(tableB);
			container.appendChild(tableR);

			document.getElementById("rightSection").appendChild(container);
		}
	}
}

function populateRequestTable(table, student, unit) {
	for (var i=0;i < unit.required.length; i++){
		var aTr = document.createElement("tr");
			var aTd = document.createElement("td");
			aTd.textContent = unit.required[i];
		aTr.appendChild(aTd);
		var aTd = document.createElement("td");
			aTd.textContent = getStudentAllocation(student, unit, unit.required[i]);
		aTr.appendChild(aTd);
		var aTd = document.createElement("td");
			aTd.textContent = getStudentRequest(student, unit, unit.required[i]);
		aTr.appendChild(aTd);
		table.appendChild(aTr);
	}
}

function getStudentAllocation(student, unit, classType){
	var d = 0;
	console.log(student);
	console.log(unit);
	console.log(classType);
	for (var i =0; i < allClasses.length; i++) {
		// console.log("hello");
		// console.log(student.classes.indexOf(allClasses[i].uuid));
		// console.log(allClasses[i].type);

		// check each class's unit code, type and if student is enrolled in it
		if (allClasses[i].unitUuid == unit.uuid && allClasses[i].type.includes(classType)){
			d += 1;
			if (student.classes.indexOf(allClasses[i].uuid) > -1) {
				return "Activity " + d + " (" + allClasses[i].day + " " + allClasses[i].time + ")";
			}
		}
	}
}

function getStudentAllocation2(student, unitCode, classType){
	var d = 0;
	console.log(student);
	console.log(unitCode);
	console.log(classType);
	for (var i =0; i < allClasses.length; i++) {
		// check each class's unit code, type and if student is enrolled in it
		if (allClasses[i].unitUuid == unitCode && allClasses[i].type == classType){
			d += 1;
			console.log("every student classes:" + student.classes);
			if (student.classes.indexOf(allClasses[i].uuid) > -1) {
				console.log("asdf" + allClasses[i].type + "against" + classType);
				return d;
			}
		}
	}
}

function getStudentRequest(student, unit, classType){
	var d = 0;
	/*
	for (var i =0; i < allClasses.length; i++) {
		console.log("hello");
		console.log(student.classes.indexOf(allClasses[i].uuid));
		console.log(allClasses[i].type);
		
		// check each class's unit code, type and if student is enrolled in it
		if (allClasses[i].unitUuid == unit.uuid && allClasses[i].type.includes(classType)){
			d += 1;
			if (student.classes.indexOf(allClasses[i].uuid) > -1) {
				return "Activity " + d + " (" + allClasses[i].day + " " + allClasses[i].time + ")";
			}
		}
	}*/
	return "None";
}

function getNoOfStudentRequests(student){
	var d = 0;
	return d;
}


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

function httpPostAsync(theUrl, callback) {
	var test = new XMLHttpRequest();
	test.onreadystatechange = function() {
		if (test.readyState == 4 && test.status == 200)
			callback(test.responseText);
	};
	test.open("POST", theUrl, true); // true for asynchronous
	test.send(null);
	return test;

}

function clearRightSection() {
	var dashboard = document.getElementById("rightSection");
	while (dashboard.firstChild) {
		dashboard.removeChild(dashboard.firstChild);
	}
}

function populateProfile(student){
	var aH4 = document.createElement("h4");
		var aS = document.createElement("strong");
			aS.textContent = student.firstname.concat(" ".concat(student.lastname));
		aH4.appendChild(aS);
	document.getElementById("profileDetails").appendChild(aH4);
	
	var aP = document.createElement("p");
		aP.textContent = student.username;
	document.getElementById("profileDetails").appendChild(aP);
}

function populateMenu(array) {
	for (var i = 0; i < array.length; i++) {
		console.log(student);
		if (student.units.indexOf(array[i].uuid) > -1) {
			console.log(array[i].required);
			console.log();
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
			for (var j = 0; j < array[i].required.length; j++) {

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
}

function constructUnitView(mouse) {
	clearRightSection();

	// div unitHeader with 3 h4 tags
	var unitHeader = document.createElement("div");
	unitHeader.className = "unitHeader";
	unitHeader.id = "unitHeader";

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
	aTh.textContent = "Availability";
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
			//status
			aTr.appendChild(getAvailability(array[i], student));
			aTr.appendChild(getCheckbox(array[i], student));

			document.getElementById("unitTable").appendChild(aTr);
		}
	}
	/*
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
	*/

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
		link.addEventListener("click", changeToAvailableClass);
		status.appendChild(link);
	}
	return status;
}

function getCheckbox(unit, student) {
	/*
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
	*/	
			
	var status = document.createElement('td');
		var aP = document.createElement("p");
			for (var i =0; i < student.classes.length; i++) {
				if (unit.uuid == student.classes[i]) {
					aP.textContent = "Already allocated";
					aP.setAttribute("style", "color:gray;text-align:center;");
					status.appendChild(aP);
					return status;
				}
			}
			if (unit.noStudents < unit.capacity){
					aP.textContent = "Available now";
					aP.setAttribute("style", "color:gray;text-align:center;");
					status.appendChild(aP);
					return status;
			}
			else {
				var link = document.createElement('a');
				link.setAttribute("style", "text-align:center;");
				/* this changes the allocation that has been requested to allow to cancel
				if (requested){
					link.appendChild(document.createTextNode('Cancel Request'));
					link.href = "#";
					status.appendChild(link);
				}
				else */{
					var link = document.createElement('a');
					link.appendChild(document.createTextNode('Request'));
					link.href = "#";
					link.addEventListener("click", requestFullClass);
					status.appendChild(link);
				}	
			}
	return status;
}

function getUnitClassUuidByActivity(unitCode, activityNo, classType) {
	var d=0;
	for (var i=0;i<allClasses.length;i++){
		if (allClasses[i].type == classType && allClasses[i].unitUuid == unitCode ){
			d+=1;
			if (d == String(activityNo)){
				return allClasses[i].uuid;
			}
		}
	}
}

function changeToAvailableClass(mouse){
	// unit code
	var unitCode = document.getElementById("unitHeader").getElementsByTagName("h4")[0].textContent;
	
	// classType
	var classType = document.getElementById("unitHeader").getElementsByTagName("h4")[2].textContent;
	
	// activity no
	var activityNo = mouse.target.parentNode.parentNode.getElementsByTagName("td")[0].textContent;	
	console.log("abs" + activityNo);
	
	// unit uuid for the activity
	var unitUuid = getUnitClassUuidByActivity(unitCode, activityNo, classType);
	
	console.log("a" + getUnitClassUuidByActivity(unitCode, activityNo, classType));
	
	// change class
	// remove request if exist
	
	createAllocatedMessage(student, unitCode, classType, activityNo);
}

function createAllocatedMessage(student, unitCode, classType, activityNo) {
	clearUnitTable();
	console.log(activityNo);
	var aH5 = document.createElement("h5");
	aH5.textContent = "You have been successfully changed to Activity " + String(activityNo) + " of " + unitCode + " " + String(classType) + ".";
	document.getElementById("rightSection").appendChild(aH5);
}

function requestFullClass(mouse){
	// unit code
	var unitCode = document.getElementById("unitHeader").getElementsByTagName("h4")[0].textContent;

	console.log(unitCode);

	// classType
	var classType = document.getElementById("unitHeader").getElementsByTagName("h4")[2].textContent;

	console.log(classType);
	// activity no
	var activityNo = mouse.target.parentNode.parentNode.getElementsByTagName("td")[0].textContent;	
	console.log("abs" + activityNo);
	console.log("params" + unitCode);

	//currentClassUuid
	var currentClassUuid = getUnitClassUuidByActivity(unitCode, getStudentAllocation2(student, unitCode, classType), classType);

	//requestedClasses
	var requestedClassUuid = getUnitClassUuidByActivity(unitCode, activityNo, classType);

	// make request for class

	var http = new XMLHttpRequest();
	var url = "https://reallocateplus.herokuapp.com/swaprequest/new";
	var params = "?studentUuid="+student.uuid+"&unitUuid="+unitCode+"&currentClassUuid="+currentClassUuid+"&requestedClasses=["+requestedClassUuid+"]";
	console.log(params);
	httpPostAsync(url + params, function(data) {
		var jsonBody = JSON.parse(data);
		createRequestedMessage(student, unitCode, classType, activityNo);
	});

//Send the proper header information along with the request
	//http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
}

function createRequestedMessage(student, unitCode, classType, activityNo) {
	clearUnitTable();
	console.log(activityNo);
	var aH5 = document.createElement("h5");
	aH5.textContent = "You have been placed on the queue for Activity " + String(activityNo) + " of " + unitCode + " " + String(classType) + ".";
	document.getElementById("rightSection").appendChild(aH5);
}

function unrequestFullClass(mouse){
	// unit code
	var unitCode = document.getElementById("unitHeader").getElementsByTagName("h4")[0].textContent;
	
	// classType
	var classType = document.getElementById("unitHeader").getElementsByTagName("h4")[2].textContent;
	
	// activity no
	var activityNo = mouse.target.parentNode.parentNode.getElementsByTagName("td")[0].textContent;	
	console.log("abs" + activityNo);
	
	// unit uuid for the activity
	var unitUuid = getUnitClassUuidByActivity(unitCode, activityNo);
	
	console.log("a" + getUnitClassUuidByActivity(unitCode, activityNo));
	
	// cancel request for class
	
	createRequestedMessage(student, unitCode, classType, activityNo);
}

function createCancelledRequestedMessage(student, unitCode, classType, activityNo) {
	clearUnitTable();
	console.log(activityNo);
	var aH5 = document.createElement("h5");
	aH5.textContent = "Your request for Activity " + String(activityNo) + " of " + unitCode + " " + String(classType) + "has been removed.";
	document.getElementById("rightSection").appendChild(aH5);
}

function clearUnitTable(){
	var rightSection = document.getElementById("rightSection");
	rightSection.removeChild(rightSection.getElementsByClassName("container-fluid")[0]);
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
