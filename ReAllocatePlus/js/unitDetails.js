/**
 * Created by Ramzi on 15/10/2016.
 */

var Units = [
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

    ]

function populateUnitTable(unitArray) {
    //make the table
    var table = document.createElement('table');
    var row = document.createElement('tr');

    // fill the first row with all the headers
    var header = document.createElement('th');
    header.appendChild((document.createTextNode("Status")));
    row.appendChild(header);

    var header = document.createElement('th');
    header.appendChild((document.createTextNode("Availability")));
    row.appendChild(header);

    var header = document.createElement('th');
    header.appendChild((document.createTextNode("Activity")));
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

    //add header row to table
    table.appendChild(row);

    //loop through the units
    for (var i = 0; i < unitArray.length; i++) {
        var row = document.createElement('tr');
        //checkbox
        var item = document.createElement('td');
        var checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        item.class = "center";
        item.appendChild(checkbox);
        row.appendChild(item);
        //status
        row.appendChild(determineStatus(unitArray[i]));
        //activity number
        var item = document.createElement('td');
        item.appendChild(document.createTextNode((i+1)));
        row.appendChild(item);
        //loop through properties of each unit
        for (var property in unitArray[i]) {
            if (unitArray[i].hasOwnProperty(property)) {
                if(property == 'Allocated')
                {break;}
                var item = document.createElement('td');
                item.appendChild(document.createTextNode((unitArray[i])[property]));
                row.appendChild(item);
            }
        }
        table.appendChild(row);
    }

    return table;
}

function determineStatus(unit)
{
    var status = document.createElement('td');

    if (unit.Allocated == true)
    {
        status.appendChild(document.createTextNode('Allocated'));

    }
    else {
        if (unit.EmptySpots == 0)
        {
            status.appendChild(document.createTextNode('Full'));

        }
        else{
            var link = document.createElement('a');
            link.appendChild(document.createTextNode('Select'));
            link.href = "#";
            status.appendChild(link);
        }
    }
    return status;
}
document.getElementById('tableDiv').appendChild(populateUnitTable(Units));