//index.html 结尾: script src="js/index.js"
//js/index.js
//加载楼层
(()=>{
$.get("data/index/getFloors.php")
  .then(output=>{
  var {recommended,new_arrival,top_sale}=output;
  //加载第一层楼
  var html="";
  for(var i=0;i<recommended.length;i++){
    var p=recommended[i];
    if(i<2){
      html+=`<div>
        <div class="desc">
          <p class="name">${p.title}</p>
          <p class="details">${p.details}</p>
          <p class="price">¥${p.price}</p>
          <a href="${p.href}" class="view">查看详情</a>
        </div>
        <img src="${p.pic}">
      </div>`;
    }else if(i==2){
      html+=`<div>
        <div class="desc">
          <p class="name">${p.title}</p>
          <p class="price">¥${p.price}</p>
          <a href="${p.href}" class="view">查看详情</a>
        </div>
        <img src="${p.pic}">
      </div>`;
    }else{
      html+=`<div class="product">
        <img src="${p.pic}">
        <p class="name">${p.title}</p>
        <p class="price">¥${p.price}</p>
        <a href="${p.href}">查看详情</a>
      </div>`;
    }
  }
  document.querySelector("#f1>.floor-content")
    .innerHTML=html;
  //加载第2层楼
  var html="";
  for(var i=0;i<new_arrival.length;i++){
    var p=new_arrival[i];
    if(i<2){
      html+=`<div>
        <div class="desc">
          <p class="name">${p.title}</p>
          <p class="details">${p.details}</p>
          <p class="price">¥${p.price}</p>
          <a href="${p.href}" class="view">查看详情</a>
        </div>
        <img src="${p.pic}">
      </div>`;
    }else if(i==2){
      html+=`<div>
        <div class="desc">
          <p class="name">${p.title}</p>
          <p class="price">¥${p.price}</p>
          <a href="${p.href}" class="view">查看详情</a>
        </div>
        <img src="${p.pic}">
      </div>`;
    }else{
      html+=`<div class="product">
        <img src="${p.pic}">
        <p class="name">${p.title}</p>
        <p class="price">¥${p.price}</p>
        <a href="${p.href}">查看详情</a>
      </div>`;
    }
  }
  document.querySelector("#f2>.floor-content")
    .innerHTML=html;
  //加载第3层楼
  var html="";
  for(var i=0;i<top_sale.length;i++){
    var p=top_sale[i];
    if(i<2){
      html+=`<div>
        <div class="desc">
          <p class="name">${p.title}</p>
          <p class="details">${p.details}</p>
          <p class="price">¥${p.price}</p>
          <a href="${p.href}" class="view">查看详情</a>
        </div>
        <img src="${p.pic}">
      </div>`;
    }else if(i==2){
      html+=`<div>
        <div class="desc">
          <p class="name">${p.title}</p>
          <p class="price">¥${p.price}</p>
          <a href="${p.href}" class="view">查看详情</a>
        </div>
        <img src="${p.pic}">
      </div>`;
    }else{
      html+=`<div class="product">
        <img src="${p.pic}">
        <p class="name">${p.title}</p>
        <p class="price">¥${p.price}</p>
        <a href="${p.href}">查看详情</a>
      </div>`;
    }
  }
  document.querySelector("#f3>.floor-content")
    .innerHTML=html;

  var $lift=$("#lift");
  //为window绑定滚动事件
  $(window).scroll(()=>{  
    var scrollTop=$("html,body").scrollTop();
    var $f1=$("#f1");
    var offsetTop=$f1.offset().top;
    if(offsetTop<scrollTop+innerHeight/2)
      $lift.fadeIn(500);
    else
      $lift.fadeOut(500);
    var $floors=$(".floor");
    $floors.each((i,elem)=>{
      var $f=$(elem);
      if($f.offset().top<scrollTop+innerHeight/2)
        $lift.find(".lift_item:eq("+i+")")
          .addClass("hover")
          .siblings().removeClass("hover");
    })
  })
  //为$lift下的ul绑定单击事件，只允许li访问
  $lift.children("ul").on("click","li",function(){
    var $li=$(this);
    var i=$li.index();
    var $fi=$(".floor:eq("+i+")");
    var offsetTop=$fi.offset().top;
    $("html").animate({
      scrollTop:offsetTop-60
    },500)
  })
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
