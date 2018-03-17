//在当前页面加载header.html
(()=>{
	ajax({type:"get",url:"header.html"})
		.then(html=>{
		document.getElementById("header").innerHTML=html;
		var txtSearch=document.getElementById("txtSearch");
		var aSearch=
			document.querySelector("[data-trigger=search]");
		aSearch.onclick=function(){
			if(txtSearch.value.trim()!=="")
				location="products.html?kw="+txtSearch.value.trim();
			else
				location="products.html";
		}
		txtSearch.onkeyup=e=>{
			if(e.keyCode==13){
				aSearch.onclick();//模拟触发!
			}
		}
		var search=location.search;//?kw=mac i7 256g
		if(search.indexOf("kw")!=-1)
			txtSearch.value=decodeURI(search.split("=")[1]);
	})
})()