/**
 * Created by Ramzi on 15/10/2016.
 * Modified by Callistus on 15/11/2016
 */



function httpGetAsync(theUrl, callback) {
	var test = new XMLHttpRequest();
	test.onreadystatechange = function() {
		if (test.readyState ==  4 && test.status == 200)
			callback(test.responseText);
	};
	test.open("GET", theUrl, true); // true for asynchronous
	test.send(null);
	return test;
}

document.getElementById("LoginButton").addEventListener("click", login);

function login(){
	var user = document.getElementById("inputUser").value;
	var password = document.getElementById("inputPassword").value;
	console.log(user);
	console.log(password);

	var params = "?username="+user+"&password="+password;
	var url = "https://reallocateplus.herokuapp.com/login"+params;
httpGetAsync(url, function(data) {
	var jsonData = JSON.parse(data);
	open("homePage.html?student_id=" + jsonData.uuid, '_self', false);
});
}