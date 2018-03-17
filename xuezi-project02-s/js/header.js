(()=>{
	ajax({type:"get",url:"header.html"})
		.then(html=>{
		document.getElementById("header").innerHTML=html;
		var txtSearch = document.getElementById("txtSearch");
		var aSearch=
			document.querySelector(["data-trigger=search"]);
		aSearch.onclick(){
		if(txtSearch.value.trim()!=="")
		  location="products.html?kw="+txtSearch.value.trim()
	  }
		txtSearch.onkeyup=e=>{
			if(e.keyCode==13){
				aSearch.onclick();
			}
		}
		var search=location.search;
		if(search!="")
			txtSearch.value=decodeURI(search.split("=")[1]);
	})
})()

