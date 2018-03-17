<?php
//data/index/getFloor2.php
header("Content-Type:application/json");
$sql ="select*from xz_index_product where seq_top_sale!=0 order by seq_top_sale";
$result=mysqli_query($conn,$sql);
echo json_encode(mysqli_fetch_all($result,1));