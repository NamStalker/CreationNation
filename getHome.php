<?php
	require('dbConnect.php');
	session_start();

	$sql="SELECT * FROM media";
	$temp = mysqli_query($conn, $sql);
	$result = array();

	while($row = mysqli_fetch_assoc($temp)){
		$result[] = $row;
	}

	echo (json_encode($result, JSON_PRETTY_PRINT));
?>