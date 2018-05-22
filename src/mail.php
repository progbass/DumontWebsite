<?php

if($_POST['email_txt']){
	//Class import
	require_once('utils/mail.inc.php');
	
	//
	$to		= array('0'=> array('name' => 'Israel Diaz', 'email' => 'progbass@gmail.com'));
	$cc		= array();
	$bcc	= array();
	$read	= array();
	$reply	= $_POST['email_txt']; 
	
	
	//
	$sender = $_POST['email_txt'];
	$senderName = $_POST['name_txt'];
	$subject = "Dumont Website Email Notification";
	$message = "<html>
				<head>
				  <title>Dumont - Website Contact Form</title>
				</head>
				<body>
					<h4>Dumont - Message</h4><br/><br/>
					<strong>Name:</strong> ".$_POST['name_txt']."<br/><br/>
					<strong>E-mail:</strong> ".$sender."<br/><br/>
					<strong>Message:</strong><br/>
					".$_POST['message_txt']."
				</body>
				</html>";
				
				
				
	//enviamos el mail
	$status_err = 0;
	$status_txt = '';
	
	$obj = new sendMail($to, $sender, $subject, $message, $cc, $bcc, $senderName, $read, true, $reply, true);
	if( $obj->sendEmail() ){
		$status_err = 0;
	 	$status_txt = "Thanks! Your message has been sent.";
	 } else {
	 	$status = 1;
	 	$status_txt = "There´s been an error. Please try submitting again.";
	}
	
	//output
	$status = array (
		'err' => $status_err,
		'msg' => $status_txt
	);
	
	header('Cache-Control: no-cache, must-revalidate');
	header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
	header('Content-type: application/json');
	echo json_encode($status);

}
?>