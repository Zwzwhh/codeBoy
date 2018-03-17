function ajax({type,url,data,dataType,callback}){
			return new Promise(callback=>{
			var xhr = new XMLHttpRequest()
			if(type.toLowerCase()=="get"&&data!==undefined)
				url+="?"+data
				xhr.open(type,url,true);
				xhr.onreadystatechange=function(){
					if(xhr.status==4){
						if(xhr.status==200){
							var resData=xhr.responseText;
							if(dataType!==undefined
								&&dataType.toLowerCase()=="json"){
							  resData=JSON.parse(resData);
								}
								callback(resData)
							}
						}
					}
			if(type.toLowerCase()==="post")
				xhr.setRequestHeader(
					"Content-Type","application/x-www-form-urlencoded"
				);
			xhr.send(type.toLowerCase()=="get"?null:data)
		});
}){
}
