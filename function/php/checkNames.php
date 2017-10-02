<?php
	require('dbConnect.php');

	$sql = "SELECT * FROM users WHERE username='".$_GET['field']."' OR email='".$_GET['field']."'";

	$temp = mysqli_query($conn, $sql);
	$row = array();

	if($row = mysqli_fetch_assoc($temp)){

		//IF USER DOES EXIST SEND BACK TRUE
		mysqli_close($conn);
		echo(true);
	}else{
		mysqli_close($conn);
		echo(false);
	}
?>