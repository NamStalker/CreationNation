<?php
		/*CONNECT TO DATABASE*/
		$db_hostname = "localhost";
		$db_database = "localmans";
		$db_username = "localman";
		$db_password = "localman4";

		$conn = mysqli_connect("$db_hostname", "$db_username", "$db_password", "$db_database");

		if (!$conn){
  			die("Connection error: " . mysqli_connect_error());
  		}
?>