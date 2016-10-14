/**
 * Created by Ramzi on 15/10/2016.
 */
/**
 * Created by Ramzi on 15/10/2016.
 */

var testUnits = [{
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
}];

function populateMenu(array) {
    // Create the list element:
    var list = document.createElement('ul');

    for (var i = 0; i < array.length; i++) {
        var item = document.createElement('li');
        item.id = "item" + i + 1;
        item.appendChild(document.createTextNode(array[i].code));
        item.appendChild(document.createElement('br'));
        var subItem = document.createElement('p');
        subItem.id = 'subItem';
        subItem.appendChild(document.createTextNode(array[i].title));
        item.appendChild(subItem);
        list.appendChild(item);
    }

    return list;
}

document.getElementById('unitsNav').appendChild(populateMenu(testUnits));