/**
 * Created by Ramzi on 15/10/2016.
 */

/*var Units = [
    {
        Day:"Monday",
        Time:"3:00pm",
        Campus:"Clayton",
        Location:"CL_23Col/G45",
        Staff:"Ian Albon",
        Duration:"2hrs",
        Allocated: false,
        EmptySpots: 2},
    {
        Day:"Tuesday",
        Time:"3:00pm",
        Campus:"Clayton",
        Location:"CL_23Col/G45",
        Staff:"Ian Albon",
        Duration:"2hrs",
        Allocated: true,
        EmptySpots:5}

    ]*/

var student;
httpGetAsync("https://reallocateplus.herokuapp.com/students", function(data){
    student = JSON.parse(data)[0];
    console.log(student)});

httpGetAsync("https://reallocateplus.herokuapp.com/classes", function(data){
    console.log(data);
    document.getElementById('tableDiv').appendChild(populateUnitTable(JSON.parse(data), student))});



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

function populateUnitTable(array, student) {
    //make the table
    var table = document.createElement('table');
    var row = document.createElement('tr');

    // fill the first row with all the headers

    var header = document.createElement('th');
    header.appendChild((document.createTextNode("Availability")));
    row.appendChild(header);

    var header = document.createElement('th');
    header.appendChild((document.createTextNode("Activity")));
    row.appendChild(header);

    var header = document.createElement('th');
    header.appendChild((document.createTextNode("Type")));
    row.appendChild(header);

    var header = document.createElement('th');
    header.appendChild((document.createTextNode("Day")));
    row.appendChild(header);

    var header = document.createElement('th');
    header.appendChild((document.createTextNode("Time")));
    row.appendChild(header);

    var header = document.createElement('th');
    header.appendChild((document.createTextNode("Campus")));
    row.appendChild(header);

    var header = document.createElement('th');
    header.appendChild((document.createTextNode("Location")));
    row.appendChild(header);

    var header = document.createElement('th');
    header.appendChild((document.createTextNode("Staff")));
    row.appendChild(header);

    var header = document.createElement('th');
    header.appendChild((document.createTextNode("Duration")));
    row.appendChild(header);

    var header = document.createElement('th');
    header.appendChild((document.createTextNode("Requests")));
    row.appendChild(header);

    //add header row to table
    table.appendChild(row);

        console.log(array);
    //loop through the units
    for (var i = 0; i < array.length; i++) {
        var row = document.createElement('tr');
        //checkbox status
        //status
        row.appendChild(getAvailability(array[i], student));
        //activity number
        var item = document.createElement('td');
        item.appendChild(document.createTextNode((i+1)));
        row.appendChild(item);
        //Type
        var item = document.createElement('td');
        item.appendChild(document.createTextNode(array[i].type));
        row.appendChild(item);
        //Day
        var item = document.createElement('td');
        item.appendChild(document.createTextNode(array[i].day));
        row.appendChild(item);
        //Time
        var item = document.createElement('td');
        item.appendChild(document.createTextNode(array[i].time));
        row.appendChild(item);
        //Campus
        var item = document.createElement('td');
        item.appendChild(document.createTextNode(array[i].campus));
        row.appendChild(item);
        //Location
        var item = document.createElement('td');
        item.appendChild(document.createTextNode(array[i].location));
        row.appendChild(item);
        //Staff
        var item = document.createElement('td');
        item.appendChild(document.createTextNode(array[i].staff));
        row.appendChild(item);
        //Duration
        var item = document.createElement('td');
        item.appendChild(document.createTextNode(array[i].duration));
        row.appendChild(item);
        row.appendChild(getCheckbox(array[i], student));
        table.appendChild(row);
    }

    return table;
}

function getAvailability(unit, student)
{
    var status = document.createElement('td');

    for (var i =0; i < student.classes.length; i++) {
        if (unit.uuid == student.classes[i]) {
            status.appendChild(document.createTextNode('Allocated'));
            return status;
        }
    }

    if (unit.noStudents >= unit.capacity){

            status.appendChild(document.createTextNode('Full'));

        }
        else{
            var link = document.createElement('a');
            link.appendChild(document.createTextNode('Available'));
            link.href = "#";
            status.appendChild(link);
        }
    return status;
}

function getCheckbox(unit, student)
{
    var status = document.createElement('td');
    status.className = "center";
    var checkbox = document.createElement('input');
    checkbox.type = "checkbox";


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
