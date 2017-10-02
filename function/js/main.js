function formatMedia(data, num){

	//DECODES JSON FROM PHP
	var obj = JSON.parse(data);
	var count = 0;

	//BASE STRING TO BE SENT TO HTML
	var formatted = '';

	//SELECTOR FOR FORMATTING MAIN OR PLAYER PAGE
	if(num == 0){

		//MAIN
		while(obj[count] != null){
			var temptype = obj[count].type;
			if(obj[count].type == "video/mp4"){

				//VIDEO SET UP FOR MAIN PAGE : num=0
				formatted += "<span class='preview'><h3>"+obj[count].title+"</h3>";
				formatted += "<a href='Play.html?media="+obj[count].filename+"'>";
				formatted += "<img src='rsc/Art/"+obj[count].filename+".jpg' />";
				formatted += "</a>uploaded by: <a href='Account.html?user="+obj[count].username+"'>";
				formatted += obj[count].username+"</a> type: "+temptype+"<hr/></span>";
			}
			else{

				formatted += "<span class='preview'><h3>"+obj[count].title+"</h3>";
				formatted += "<a href='Play.html?media="+obj[count].filename+"'>";
				formatted += "<img src='rsc/Art/"+obj[count].filename+".jpg' />";
				formatted += "</a>uploaded by: <a href='Account.html?user="+obj[count].username+"'>";
				formatted += obj[count].username+"</a> type: "+temptype+"<hr/></span>";

				//MUSIC FORMAT FOR MAIN PAGE : num=0
			}

			count++;
		}

	} else if(num == 1){

		//PLAYER
		if(obj[count].type == "video/mp4"){

			//VIDEO FORMAT FOR PLAYER : num=1
			formatted += "<h3>"+obj[count].title+"</h3><video height='600' controls>";
			formatted += "<source src='rsc/Videos/"+obj[count].filename+".mp4'>";
			formatted += "</video><br/>";
		} else {

			//MUSIC FORMAT FOR PLAYER : num=1
			formatted += "<h3>"+obj[count].title+"</h3><p><img src='rsc/Art/"+obj[count].filename+".jpg' height='500' /></p>";
			formatted += "<audio controls='controls'>";
			formatted += "<source src='rsc/Music/"+obj[count].filename+".mp3' type='audio/mpeg'></audio><br>";
		}

	}else if(num==2){

		//SHOPPING
		formatted += "<table id='shopping'><thead><tr><th>Name</th>";
		formatted += "<th>Type</th><th>Uploader</th><th>Price</th></tr></thead>";


		//WHILE LOOP FOR THE TABLE
		while(obj[count] != null){
			formatted += "<tbody><tr><td>"+obj[count].title+"</td>";
			formatted += "<td>"+obj[count].type+"</td><td>"+obj[count].username+"</td>";
			formatted += "<td>";
			if(obj[count].type == "video/mp4"){
				formatted += "1";
			}else{
				formatted += "0";
			}
			formatted += ".99<a href='function/php/getcart.php?mediaadd="+obj[count].filename+"'><button type='button'>Add To Cart</button></a></td></tr></tbody>";

			count++;
		}

		formatted += "<tfoot><tr><td></td><td></td><td></td><td><a href='Cart.html'><button type='button'>Go To Cart</button></a></td></tr></tfoot></table>";
	}else if(num==3){


		//CART VERY SIMILAR TO SHOP
		formatted += "<table id='shopping'><thead><tr><th>Name</th>";
		formatted += "<th>Type</th><th>Uploader</th><th>Price</th></tr></thead>";
		var price = 0.00;


		//WHILE LOOP FOR THE TABLE
		while(obj[count] != null){
			formatted += "<tbody><tr><td>"+obj[count].title+"</td>";
			formatted += "<td>"+obj[count].type+"</td><td>"+obj[count].username+"</td>";
			formatted += "<td>";
			if(obj[count].type == "video/mp4"){
				formatted += "1";
				price += 1.99;
			}else{
				formatted += "0";
				price += 0.99;
			}
			formatted += ".99</td></tr></tbody>";

			count++;
		}

		formatted += "<tfoot><tr><td></td><td></td><td></td>";
		formatted += "<td> Total: "+truncateDecimals(price, 2)+"</td></tr><tr><td></td>";
		formatted += "<td></td><td><a href='Shop.html'><button type='button'>Continue Shopping</button></a></td>";
		formatted += "<td><a href='Checkout.html'><button type='button'>Checkout</button></a></td></tr></tfoot></table>";
	}else if(num==4){



		//CART VERY SIMILAR TO SHOP
		formatted += "<table id='shopping'><thead><tr><th>Name</th>";
		formatted += "<th>Type</th><th>Uploader</th><th>Price</th></tr></thead>";
		var price = 0.00;


		//WHILE LOOP FOR THE TABLE
		while(obj[count] != null){
			formatted += "<tbody><tr><td>"+obj[count].title+"</td>";
			formatted += "<td>"+obj[count].type+"</td><td>"+obj[count].username+"</td>";
			formatted += "<td>";
			if(obj[count].type == "video/mp4"){
				formatted += "1";
				price += 1.99;
			}else{
				formatted += "0";
				price += 0.99;
			}
			formatted += ".99</td></tr></tbody>";

			count++;
		}

		formatted += "<tfoot><tr><td></td><td></td><td></td>";
		formatted += "<td>Sub-Total: "+truncateDecimals(price, 2)+"</td></tr><tr><td></td><td></td><td></td>";
		formatted += "<td>Tax: "+truncateDecimals((price*0.0825), 2)+"</td></tr><tr><td></td><td></td><td></td>";
		formatted += "<td>Total: "+truncateDecimals((price+(price*0.0825)), 2)+"</td></tr><tr><td></td><td></td><td></td>";
		formatted += "<td><a href='function/php/clearcart.php'><button type='button'>Return Home</button></a></td></tr></tfoot></table>";
	}

	//RETURNS HTML STRING
	return formatted;
}

function parseUrl(url){

	var mainUrl = '';
	var mediaQuery = '';

	//GETS URL A+PARAMETER AND SEPERATES THE ARGUEMENT
	var parts = url.split('=');
	mainUrl += parts[0];  // INITIAL URL
	mediaQuery += parts[1];  // QUERY VALUE
	return mediaQuery;
}

function truncateDecimals(number, digits){
    var multiplier = Math.pow(10, digits);
    var adjustedNum = number * multiplier;
    if(adjustedNum < 0){
    	var truncatedNum = Math.ceil(adjustedNum);
    }else{
    	var truncatedNum = Math.floor(adjustedNum);
    }

    return (truncatedNum / multiplier);
}

$(document).ready(function(){
	
	//Updates the body of the home page to the search results when searching.
	$("#search").change(function(){
		$.get("function/php/mediaSearch.php", {find : $('#search').val()}, function(data){
			if (window.location.href.split("CreationNation/")[1].split(".html")[0] != "Home"){
				window.location.href = 'Home.html?query='+$("#search").val();
			}
			else{
			$("#content").html(formatMedia(data, 0));
			}
		});
	});
	
	if (window.location.href.split("CreationNation/")[1].split(".html")[0] == "Home")
		$(function(){
			if(parseUrl(window.location.href) === 'undefined'){
			}else{
				$.get("function/php/mediaSearch.php", {find : parseUrl(window.location.href)}, function(data){
					$("#content").html(formatMedia(data, 0));
				});
			}
		});
	
	$(function(){

		//Populates the login link with login/sign up or account.
		/*$.ajax({
			url: "function/php/checkLogin.php", 
			type: 'GET',
			success: function(data){
			var loginBtn = document.getElementById('login');
			loginBtn.innerHTML = data;
			}
		});*/
		
		$.get("function/php/checkLogin.php", {page: ""+window.location.href.split("CreationNation/")[1].split(".html")[0]+""},
		function(data){

			//RETURNS THE FORMATTED HTML TO USE IN THE MAIN BODY PAGE
			$("#login").html(data);
		});
		
	});
				
	if (window.location.href.split("CreationNation/")[1].split(".html")[0] == "Home")			
		$(function(){
			$.get("function/php/getHome.php", function(data){

				//RETURNS THE FORMATTED HTML TO USE IN THE MAIN BODY PAGE
				$("#content").html(formatMedia(data, 0));
			});
		});
	
	if(window.location.href.split("CreationNation/")[1].split(".html")[0] == "About")
		$(function(){
			$.get("function/php/validateLogin.php", function(data){
				if(data != false){
					$('#loginLink').attr('href', 'Account.html?user='+data);
				}
			})
		});
	
	if(window.location.href.split("CreationNation/")[1].split(".html")[0] == "Account")
		//VALIDATE THEY ARE LOGGED IN BEFORE CONTINUING
		$(function(){
			$.get("function/php/validateLogin.php", function(data){
				if(data == false){
					if(parseUrl(window.location.href) === 'undefined'){
						window.location.href = 'Login.html';
					}else{
						$('title').append(parseUrl(window.location.href));
					}
				}
			})
		});
	
	if(window.location.href.split("CreationNation/")[1].split(".html")[0] == "Checkout")
		$(function(){
			$.get("function/php/getcart.php", function(data){

				//RETURNS THE FORMATTED HTML TO USE IN THE MAIN BODY PAGE
				$("#content").html(formatMedia(data, 4));
			})
		});
	
	if(window.location.href.split("CreationNation/")[1].split(".html")[0] == "Login"){
		$("#email").change(function(){
			$.get("function/php/checkNames.php", {field : $('#email').val()}, function(data){
				if(data == true){
					document.getElementById("signupbtn").disabled = true;
					$('#signUpError').html("That Email is taken.");
				}else{
					document.getElementById("signupbtn").disabled = false;
					$('#signUpError').html("");
				}
			})
		});

		//SAME FOR USERNAME
		$("#user").change(function(){
			$.get("function/php/checkNames.php", {field : $('#user').val()}, function(data){
				if(data == true){
					document.getElementById("signupbtn").disabled = true;
					$('#signUpError').html("That Username is taken.");
				}else{
					document.getElementById("signupbtn").disabled = false;
					$('#signUpError').html("");
				}
			})
		});
		
		if(parseUrl(window.location.href)=="fail"){
			$('#loginError').html("Wrong Username or Password.");
		}
		
		if(parseUrl(window.location.href)=="failedexists"){

			$('#signUpError').html("Either the Email or <br /> Username was taken.");
		}else if(parseUrl(window.location.href)=="unknownerror"){

			$('#signUpError').html("Unable to create account,<br /> try again later.");
		}
		
		$('form').submit(function(){
			if(document.forms[0].username.value != ""){
				return true;
			}else if(document.forms[0].email.value == ""){
				alert("Please fill out all fields.");
				return false;
			}else if(document.forms[0].user.value == ""){
				alert("Please fill out all fields.");
				return false;
			}else if(document.forms[0].pass1.value == ""){
				alert("Please fill out all fields.");
				return false;
			}else if(document.forms[0].pass1.value != document.forms[0].pass2.value){
				alert("Passwords do not match, try again.");
				return false;
			}else if(document.forms[0].username == "" && document.forms[0].password == "" && document.forms[0].email.value != ""){
				return true;
			}
			return true;
		});
	}
	
	if(window.location.href.split("CreationNation/")[1].split(".html")[0] == "Play")	
		$(function(){
			var medianame = parseUrl(window.location.href);
			$.get("function/php/mediaSearch.php", {filename : medianame}, function(data){
				$("#content").html(formatMedia(data, 1));
			})
		});
	
	if((window.location.href.split("CreationNation/")[1].split(".html")[0] == "Account") ||
		(window.location.href.split("CreationNation/")[1].split(".html")[0] == "Settings") ||
		(window.location.href.split("CreationNation/")[1].split(".html")[0] == "Upload"))
		$(function(){
			$.get("validateLogin.php", function(data){
				if(data == false){
					window.location.href = 'Login.html';
				}
			})
		});
	
	if(window.location.href.split("CreationNation/")[1].split(".html")[0] == "Shop")
	$(function(){
		$.get("getHome.php", function(data){

			//RETURNS THE FORMATTED HTML TO USE IN THE MAIN BODY PAGE
			$("#content").html(formatMedia(data, 2));
		})
	});	
	
	if(window.location.href.split("CreationNation/")[1].split(".html")[0] == "Play")
		$(function(){
				var medianame = parseUrl(window.location.href);
				$.get("mediaSearch.php", {filename : medianame}, function(data){
					$("#content").html(formatMedia(data, 1));
				})
			});
			
	if(window.location.href.split("CreationNation/")[1].split(".html")[0] == "Cart")		
		//Writes the initial body of the home page
		$(function(){
			$.get("getcart.php", function(data){

				//RETURNS THE FORMATTED HTML TO USE IN THE MAIN BODY PAGE
				$("#content").html(formatMedia(data, 3));
			})
		});
});