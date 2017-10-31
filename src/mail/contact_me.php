<?php
// check if fields passed are empty
if(
	empty($_POST['name']) ||
	empty($_POST['phone'])
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
$to = 'info@movementmartialarts.com.au';
// $to = 'reynold.ismail@gmail.com';
// $to = "andrew@tellnolies.com.au";
$email_subject = "Contact form - submitted by:  $name";
$email_body = "You have received a new message. \n\n".
				  "Here are the details:\n \nName: $name\n ".
				  "Email: $email_address\n Phone: $phone\n".
				  "Enquiry: $enquiry\n".
				  "Message: \n$message";
$headers = "From: $email_address\n";
$headers .= "Reply-To: $email_address";	
mail($to,$email_subject,$email_body,$headers);
return true;			
?>