<?php
@$uname=$_REQUEST["uname"];
@$upwd=$_REQUEST["upwd"];
echo json_encode(["uname"=>$uname,"upwd"=>$upwd]);

