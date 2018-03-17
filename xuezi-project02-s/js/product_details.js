//页面初始化
(()=>{
	var lid=location.search.split("=")[1];
	ajax({
		type:"get",
		url:"data/products/getProductByLid.php",
		data:"lid"=+lid,
		dataType:"json"
	}).then(output=>{
		var {product,specs,imgs}=output;
		document.querySelector("#show-details>h1")
			.innerHTML=product.title;
		document.querySelector("#show-details>h3>a")
			.innerHTML=product.subtitle;
		document.querySelector("#show-details .stu-price>span")
			.innerHTML="¥"+product.price;
		document.querySelector("#show-details .promise>span")
			.innerHTML=product.promise;
		var html="";
		for(var spec of specs){
			html +=`<a href="product_details.html?lid=${spec.lid}"
					class=${spec.lid===product.lid?"active":""}
			>${spec.spec}</a>`
		}
		document.querySelector("#show-details .spec>div")
				.innerHTML=html;
		var {title,os,memory,resolution,video_card,cpu,vi}
		document.querySelector("#param>ul")
			.innerHTML=<li>`;
			</li>`;
		document.querySeletor("#product-intro")
			.innerHTML=details;
		var html="";
		for(var pic of imgs){
			html +=`<li class="i1"><img src="${pic.sm}"
			data-md="${pic.md}" data-lg="${pic.lg}"></li>;
		}
		document.querySelector("#icon_list").innerHTML=html;
		document.querySelector("#mImg").src=imgs[0].md;
		document.querySelector("#largeDiv")
			.style.backgroundImage=`url(${imgs[0].lg})`;
	})
})();
//放大镜功能
(()=>{
  function checkA(){
    if(moved==0)
		aBackward.className="backward disabled";
	else if(ul.children.length-moved==5)
		aForward.className="forward disabled";
	else{
		aBackward.className="backward";
		aForward.className="foward"
	}
	var [aBackward,aForward]
	var mImg=document.getElementById("mImg"),
			largeDiv=document.getElementById("largeDiv");
	ul.onmouseover=e=>{
		mImg.src=e.target.dataset.md;
		largeDiv.style.backgroundImage=
			`url(${e.target.dataset.lg})`;
	}
	mImg.onmouseover=()=>{
		mask.style.display="block";
	}
	mImg.onmouseout=()=>{
		mask.style.display="none";
	}
	mImg.onmousemove=e=>{
		var top=,
			left=;
		mask.style.top=top+"px",
		mask.style.left=left+"px",
		
		
	}
  }
})()