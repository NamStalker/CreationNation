<?php
	session_start();
	
	if(isset($_GET['page']) && $_GET['page'] == "Login"){

		//Checks is it is the Login page
		unset($_GET['page']);
		echo("<li><a class='active' href='Login.html'>Login</a></li>");
	}else if(!isset($_SESSION['username']) || $_SESSION['username'] == ''){

		//Checks if they are not logged in
		echo("<li><a href='Login.html'>Login</a></li>");
	}else if(isset($_SESSION['username']) && ($_GET['page'] == "Account" || $_GET['page'] == "Settings" || $_GET['page'] == "Upload")){

		//Checks if they are logged in
		echo("<li class='dropdown'><a class='active' href='Account.html?user=".$_SESSION['username']."' class='dropbtn'>Account</a>
			<div class='dropdown-content'><a href='Upload.html'>Upload</a><a href='Settings.html'>Settings</a><a href='function/php/Logout.php'>Logout</a></div></li>");
	}else if(isset($_SESSION['username'])){

		//Checks if they are logged in
		echo("<li class='dropdown'><a href='Account.html?user=".$_SESSION['username']."' class='dropbtn'>Account</a>
			<div class='dropdown-content'><a href='Upload.html'>Upload</a><a href='Settings.html'>Settings</a><a href='function/php/Logout.php'>Logout</a></div></li>");
	}else{

		//Error Case
		echo("<li><a href='#'>Error</a></li>");
	}
?>