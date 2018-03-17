(()=>{
	var search=location.search;
	if(search!==""){
		search=decodeURI(search.split("=")[1]);
	}
	ajax({
		type:"get",
		url:"data/products/getProductsByKw.php",
		data:search!==""?"kw="+search:undefined,
		dataType:"json"
	}).then(result=>{
		console.log(result);
	})
})();
(()=>{
	document.getElementById("show-list").onclick=e=>{
		var tar=e.target
		if(tar.className=="reduce" || tar.className=="add"){
			var input=tar.parentNode.children(1)
			var n =

		}
	}
})()