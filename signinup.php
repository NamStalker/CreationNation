<?php
	require('dbConnect.php');
	session_start();

	if(isset($_POST['login']) && $_POST['username'] != ''){


		//CHECKS FOR USER AND RETURNS THEM TO LOGIN IF NO USER ELSE TO HOME
		$sql = "SELECT * FROM users WHERE username='".$_POST['username']."' AND password='".$_POST['password']."'";

		$temp = mysqli_query($conn, $sql);
		$row = array();


		//Return to home on successful, login if not
		if($row = mysqli_fetch_assoc($temp)){
			$_SESSION['username'] = $row['username'];
			header('Location: Home.html');
		} else {
			header('Location: Login.html?attempt=fail');
		}

	}else if(isset($_POST['signup']) || (isset($_POST['login']) && $_POST['user'] != '')){


		//Checks if user exists

		$sql = "SELECT * FROM users WHERE username='".$_POST['user']."' OR email='".$_POST['email']."'";

		$temp = mysqli_query($conn, $sql);
		$row = array();

		if($row = mysqli_fetch_assoc($temp)){

			//IF USER DOES EXIST SEND BACK
			mysqli_close($conn);
			header('Location: Login.html?attempt=failedexists');

		} else {
			
			//IF NO CURRENT USER, CREATES NEW USER

			$currDate = date('Y-m-d');
			$sql = "INSERT INTO users(username, password, email, reg_date) values('".$_POST['user']."','".$_POST['pass1']."','".$_POST['email']."', '".$currDate."')";

			$temp = mysqli_query($conn, $sql);

			//'LOG' Them IN
			if($temp){
				$_SESSION['username'] = $_POST['user'];

				mysqli_close($conn);
				header('Location: Home.html');
			} else{

				//ERROR HANDLING FOR IN THE CASE THAT THE QUERY IS BAD.
				mysqli_close($conn);
				header('Location: Login.html?attempt=unknownerror');
			}			
		}
	}else{
		header('Location: Login.html?attempt=unknown');
	}
?>