function loadPage(pageNo=1){//下面分页要用到整个页面的重新加载,所以不能用匿名函数自调,应用function封装,传入下面要用的分页参数,默认第一页
	var pageSize=9;//写死
	//拼查询字符串
	var query=`pageNo=${pageNo}&pageSize=${pageSize}`;//拼上分页
	var search=location.search;//?kw=mac i7
	if(search!==""){
		search=decodeURI(search.split("=")[1]);
		query+=`&kw=${search}`//在分页之后再拼上关键字
	}
	ajax({
		type:"get",
		url:"data/products/getProductsByKw.php",
		data:query,
		dataType:"json"
	}).then(result=>{
		var {pageNo, pageCount, data}=result
		var html="";
		for(var p of data){
			html+=`<li>
            <a href="product_details.html?lid=${p.lid}">
              <img src="${p.md}" alt="">
            </a>
            <p>
              ¥<span class="price">${p.price}</span>
              <a href="product_details.html?lid=${p.lid}">${p.title}</a>
            </p>
            <div>
              <span class="reduce">-</span>
              <input type="text" value="1">
              <span class="add">+</span>
              <a href="javascript:;" class="addCart">加入购物车</a>
            </div>
          </li>`
		}
		document.getElementById("show-list")
			.innerHTML=html;
		html=`<a href="javascript:;" class='${pageNo==1?"previous disabled":"previous"}'>上一页</a>`;//html= 不用+=之后点下一页前面的页数就会被覆盖,class外面加''号,不然disabled出去了无法在第一页的时候,禁用上一页,加了引号disabled 和 previous为一个整体
		for(var i=1;i<=pageCount;i++){
			html+=`<a href="javascript:;" class=${pageNo==i?"current":""}>${i}</a>`
		}
		html+=`<a href="javascript:;" class='${pageNo==pageCount?"next disabled":"next"}'>下一页</a> `;
		document.getElementById("pages").innerHTML=html;
	})
}//练习10分钟，下课休息10分钟
loadPage();//页面加载的时候,先调用这个函数一次,要不然拿不到第一页
(()=>{
	var divPages=document.getElementById("pages");
	divPages.onclick=e=>{
		var tar=e.target;
		if(tar.nodeName=="A"
			&&!/disabled|current/.test(tar.className)){//节点名字是a标签,且className(属性名)中没有disabled和current这两个;这里写的是正则表达式test方法检查字符串部分匹配,所有正则中不用加^$,(test找不到tar的className是disabled和current的)
			//alert("疼")
			var i=1;
			if(/previous/.test(tar.className)){
				//获得divPages下class为current的a的内容转为整数保存在i中
				var a=divPages.querySelector(".current");
				i=parseInt(a.innerHTML)-1;//i-1
			}else if(/next/.test(tar.className)){
				//获得divPages下class为current的a的内容转为整数保存在i中
				var a=divPages.querySelector(".current");
				i=parseInt(a.innerHTML)+1;//i+1
			}else{//获得tar的内容转为整数保存在i中
				i=parseInt(tar.innerHTML);
			}//用i为pageNo重新加载当前页面
			loadPage(i);//点击第几页,重新加载当前页i的页面
		}
	};
})();
(()=>{
	document.getElementById("show-list").onclick=e=>{
		var tar=e.target;
		if(tar.className=="reduce"||tar.className=="add"){
			//查找tar的父元素下的第二个子元素input
			var input=tar.parentNode.children[1];
			//获得input的内容，转为整数保存在n
			var n=parseInt(input.value);
			//如果tar的className为add
			if(tar.className==="add")
				n++;//n++
			else if(n>1)//否则 如果n>1
				n--;//n--
			//将n保存回input的内容中
			input.value=n;
		}
	}
})()