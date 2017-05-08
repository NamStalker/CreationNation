<?php

	require('dbConnect.php');
	session_start();

	if(!isset($_SESSION['cart'])){
		$_SESSION['cart'] = array();
	}
	//SWITCH BETWEEN ADDING TO THE CART AND DISPLAYING CART
	if(isset($_GET['mediaadd'])){

		$_SESSION['cart'][] = $_GET['mediaadd'];

		header('Location: Cart.html');
	}else{

		//RETRIEVE ALL SELECTIONS
		$count = 0;
		$result = array();

		while($_SESSION['cart'][$count] !=  null){
			$sql = "SELECT * FROM media WHERE filename='".$_SESSION['cart'][$count]."'";

			$temp = mysqli_query($conn, $sql);

			$row = mysqli_fetch_assoc($temp);

			$result[] = $row;

			$count++;
		}

		mysqli_close($conn);
		echo(json_encode($result, JSON_PRETTY_PRINT));
	}
?>