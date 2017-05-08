<?php
	session_start();

	if(isset($_POST['upload'])){
		/*CONNECT TO DATABASE*/
		require('dbConnect.php');


		/*CREATE AND ASSIGN FILE NAME FOR ALL RELATED ITEMS*/
		$filename = substr(md5(microtime()),rand(0,23),8);
		$art = $filename;
		$info = $filename;

		/*MOVE FILE TO SELECTED FOLDER*/
		if($_FILES['media']['type'] == 'audio/mpeg'){
			$filepath = "resources/Music/";
			$filename .= '.mp3';
		}
		else{
			$filepath = "resources/Videos/";
			$filename .= '.mp4';
		}
		$fileTempPath = $_FILES['media']['tmp_name'];
		
		if(move_uploaded_file($fileTempPath, $filepath.$filename)){
			echo('yep');
		}else{
			if(is_writable($_SERVER['DOCUMENT_ROOT']))
				echo 'def nope';
		}

		/*Do the same with art*/
		$artfolder = "resources/Art/";
		$art .= '.jpg';
		$artTempPath = $_FILES['art']['tmp_name'];
		move_uploaded_file($artTempPath, $artfolder.$art);

		/*CREATE AND MOVE THE INFO FILE TO APPROPRIATE FOLDER*/



		/*COLLECT INFORMATION FOR DATBASE INSERT*/
		$userId = $_SESSION['username'];
		$type = $_FILES['media']['type'];
		$title = $_POST['title'];
		$currDate = date('Y-m-d');

		/*SQL INSERT STATMENT INTO CORRECT TABLE*/
		$sql="INSERT INTO media VALUES('$info', '$filepath', '$type', '$title', '$currDate', '$userId')";
		$result = mysqli_query($conn, $sql);

		mysqli_close($conn);

		header('Location: Home.html');

	}
?>