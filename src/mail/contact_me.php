<?php
// check if fields passed are empty
if(empty($_POST['name'])  		||
   
   empty($_POST['phone']) 		||
   empty($_POST['enquiry'])
   
   )
   {
	echo "No arguments Provided!";
	return false;
   }
	
$name = $_POST['name'];
$email_address = $_POST['email'];
$phone = $_POST['phone'];
$enquiry = $_POST['enquiry'];
$message = $_POST['message'];
	
// create email body and send it	
$to = 'info@movementmartialarts.com.au'; // hi mate thanks for purchase guna theme, just replace your email with emailme@myprogrammingblog.com
$email_subject = "Contact form - $enquiry - submitted by:  $name";
$email_body = "You have received a new message. \n\n".
				  "Here are the details:\n \nName: $name\n ".
				  "Email: $email_address\n Phone: $phone\n".
				  "Message: \n$message";
$headers = "From: $email_address\n";
$headers .= "Reply-To: $email_address";	
mail($to,$email_subject,$email_body,$headers);
return true;			
?>