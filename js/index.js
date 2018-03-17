//加载楼层1
(()=>{
	ajax({
		type:"get",
		url:"data/index/getFloor1.php",
		dataType:"json"
	}).then(resData=>{
		var html="";
		for(var i=0;i<resData.length;i++){
			var p=resData[i];
			html+=
			i<2?`<div>
				<div class="desc">
					<p class="name">${p.title}</p>
					<p class="details">${p.details}</p>
					<p class="price">¥${p.price}</p>
					<a href="${p.href}" class="view">查看详情</a>
				</div>
				<img src="${p.pic}">
      </div>`:
			i==2?`<div>
				<div class="desc">
					<p class="name">${p.title}</p>
					<p class="price">¥${p.price}</p>
					<a href="${p.href}" class="view">查看详情</a>
				</div>
				<img src="${p.pic}">
      </div>`:
			`<div class="product">
				<img src="${p.pic}">
				<p class="name">${p.title}</p>
				<p class="price">¥${p.price}</p>
				<a href="${p.href}">查看详情</a>
			</div>`;
		}
		document.querySelector("#f1 .floor-content")
						.innerHTML=html;
	})
})();
//加载楼层2
(()=>{
	ajax({
		type:"get",
		url:"data/index/getFloor2.php",
		dataType:"json"
	}).then(resData=>{
		var html="";
		for(var i=0;i<resData.length;i++){
			var p=resData[i];
			html+=
			i<2?`<div>
				<div class="desc">
					<p class="name">${p.title}</p>
					<p class="details">${p.details}</p>
					<p class="price">¥${p.price}</p>
					<a href="${p.href}" class="view">查看详情</a>
				</div>
				<img src="${p.pic}">
      </div>`:
			i==2?`<div>
				<div class="desc">
					<p class="name">${p.title}</p>
					<p class="price">¥${p.price}</p>
					<a href="${p.href}" class="view">查看详情</a>
				</div>
				<img src="${p.pic}">
      </div>`:
			`<div class="product">
				<img src="${p.pic}">
				<p class="name">${p.title}</p>
				<p class="price">¥${p.price}</p>
				<a href="${p.href}">查看详情</a>
			</div>`;
		}
		document.querySelector("#f2 .floor-content")
						.innerHTML=html;
	})
})();
//加载楼层3
(()=>{
	ajax({
		type:"get",
		url:"data/index/getFloor3.php",
		dataType:"json"
	}).then(resData=>{
		var html="";
		for(var i=0;i<resData.length;i++){
			var p=resData[i];
			html+=
			i<2?`<div>
				<div class="desc">
					<p class="name">${p.title}</p>
					<p class="details">${p.details}</p>
					<p class="price">¥${p.price}</p>
					<a href="${p.href}" class="view">查看详情</a>
				</div>
				<img src="${p.pic}">
      </div>`:
			i==2?`<div>
				<div class="desc">
					<p class="name">${p.title}</p>
					<p class="price">¥${p.price}</p>
					<a href="${p.href}" class="view">查看详情</a>
				</div>
				<img src="${p.pic}">
      </div>`:
			`<div class="product">
				<img src="${p.pic}">
				<p class="name">${p.title}</p>
				<p class="price">¥${p.price}</p>
				<a href="${p.href}">查看详情</a>
			</div>`;
		}
		document.querySelector("#f3 .floor-content")
						.innerHTML=html;
	})
})()
		//加载轮播图片
$(()=>{
const LIWIDTH=960;
$.get("data/index/getCarousel.php")
.then(data=>{
  var html="";
  for(var img of data){
    html+=`<li>
      <a href="${img.href}" title="${img.title}">
        <img src="${img.img}">
      </a>
    </li>`;
  }
  html+=`<li>
    <a href="${data[0].href}" title="${data[0].title}">
      <img src="${data[0].img}">
    </a>
  </li>`;
  var $ul=$(".banner-img");
  $ul.html(html)
    .css("width",LIWIDTH*(data.length+1));
  var $ids=$(".indicators");
  $ids.html("<li></li>".repeat(data.length))
    .children().first().addClass("hover");
  
  const WAIT=3000,DURA=500;
  var moved=0,timer=null;
  function move(dir=1){
    moved+=dir;
    $ul.animate({
      left:-LIWIDTH*moved
    },DURA,()=>{
      if(moved==data.length){
        $ul.css("left",0);
        moved=0;
      }
      $ids.children(":eq("+moved+")")
        .addClass("hover")
        .siblings().removeClass("hover")
    })
  }
  var timer=setInterval(move,WAIT);

  $("#banner").hover(
    ()=>{ clearInterval(timer); timer=null; },
    ()=>{ timer=setInterval(move,WAIT); }
  );
  $("[data-move=right]").click(()=>{
    if(!$ul.is(":animated")) 
      move();
  });
  $("[data-move=left]").click(()=>{
    if(!$ul.is(":animated")){
      if(moved==0){
        $ul.css("left",-LIWIDTH*data.length);
        moved=data.length;
      }
      move(-1);
    }
  })
  $ids.on("mouseover","li",function(){
    var $li=$(this);
    var i=$li.index();
    moved=i;
    $ul.stop(true).animate({
      left:-LIWIDTH*moved
    },DURA,()=>{
      $ids.children(":eq("+i+")")
        .addClass("hover")
        .siblings().removeClass("hover");
    })
  });
})
})