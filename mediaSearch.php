<?php
	require('dbConnect.php');
	session_start();

	if(isset($_GET['find'])){

		//USED FOR SEARCH BAR
		$sql="SELECT * FROM media where title like '%".$_GET['find']."' OR title like '".$_GET['find']."%' OR title like '%".$_GET['find']."%' OR username like '%".$_GET['find']."%'";


		$temp = mysqli_query($conn, $sql);
		$result = array();

		while($row = mysqli_fetch_assoc($temp)){
			$result[] = $row;
		}

		echo (json_encode($result, JSON_PRETTY_PRINT));

	}else if(isset($_GET['filename'])){

		//USED TO PLAY THE SPECIFIC MEDIA ON PLAY.HTML

		$sql="SELECT * FROM media where filename='".$_GET['filename']."'";
		$temp = mysqli_query($conn, $sql);
		$result = array();

		while($row = mysqli_fetch_assoc($temp)){
			$result[] = $row;
		}

		mysqli_close($conn);

		echo (json_encode($result, JSON_PRETTY_PRINT));

	}else if(isset($_GET['useraccount'])){


		//USED FOR POPULATING ACCOUNT PAGE
		$sql="SELECT * FROM media where username='".$_GET['useraccount']."'";
		$temp = mysqli_query($conn, $sql);
		$result = array();

		while($row = mysqli_fetch_assoc($temp)){
			$result[] = $row;
		}

		mysqli_close($conn);

		echo (json_encode($result, JSON_PRETTY_PRINT));
	}else{
		mysqli_close($conn);
		echo("error");
	}
?>