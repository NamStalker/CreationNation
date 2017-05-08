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
				formatted += "<img src='resources/Art/"+obj[count].filename+".jpg' />";
				formatted += "</a>uploaded by: <a href='Account.html?user="+obj[count].username+"'>";
				formatted += obj[count].username+"</a> type: "+temptype+"<hr/></span>";
			}
			else{

				formatted += "<span class='preview'><h3>"+obj[count].title+"</h3>";
				formatted += "<a href='Play.html?media="+obj[count].filename+"'>";
				formatted += "<img src='resources/Art/"+obj[count].filename+".jpg' />";
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
			formatted += "<source src='resources/Videos/"+obj[count].filename+".mp4'>";
			formatted += "</video><br/>";
		} else {

			//MUSIC FORMAT FOR PLAYER : num=1
			formatted += "<h3>"+obj[count].title+"</h3><p><img src='resources/Art/"+obj[count].filename+".jpg' height='500' /></p>";
			formatted += "<audio controls='controls'>";
			formatted += "<source src='resources/Music/"+obj[count].filename+".mp3' type='audio/mpeg'></audio><br>";
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
			formatted += ".99<a href='getcart.php?mediaadd="+obj[count].filename+"'><button type='button'>Add To Cart</button></a></td></tr></tbody>";

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
		formatted += "<td><a href='clearcart.php'><button type='button'>Return Home</button></a></td></tr></tfoot></table>";
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