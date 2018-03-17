(()=>{
	ajax({type:"get",
	url:"data/index/getFloor1.php",
	dataType:"json"
	}).then((resData)=>{
		var html="";
		for(var i=0;i<resData.length;i++){
			var p=resData[i];
			html+=
				i<2?`<div>
					<div class="desc">
					</div>
					<img src="${p.pic}">
				</div>`:
				i==2?`<div>
					<div class="desc">
					</div>
					<img src="${p.pic}">
					</div>`:
					`<div class="product">
					</div>`;
		}
		document.querySeletor("#f1 .floor-content")
		.innerHTML=html;

	})
})()
	