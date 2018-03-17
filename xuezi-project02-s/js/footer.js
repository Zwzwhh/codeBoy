(()=>{
	ajax({type:"get",url:"footer.html"})
		.then(html=>{
		document.getElementById("header").innerHTML=html;
	})
})()