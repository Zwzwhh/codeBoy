<?php
header("Content-Type:application/json");
require_once("../init.php");
@$lid=$_REQUEST["lid"];
$output=[
];
if($lid){
	$sql="SELECT * FROM xz_laptop where lid=$lid";
	$result=mysqli_query($conn,$sql);
	$product=mysqli_fetch_all($result,1)[0];
	$output["product"]=$product;
	$f_id=$product["f_id"];
	$sql="SELECT lid,spec FROM xz_laptop where
	f_id=$f_id";
	$result=mysqli_query($conn,$sql);
	$output["specs"]=mysqli_fetch_all($result,1);
	$sql="SELECT*FROM xz_loptop_pic where laptop_id=$lid";
	$result=mysqli_query($conn,$sql);
	$output["imgs"]=mysqli_fetch_all($result,1);
}
echo json_encode($output);
