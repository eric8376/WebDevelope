function GetUrlParameter(param){
  var url = window.location.search;
  var pos1 = 0, pos2 = 0;
  pos1 = url.indexOf("&"+ param +"=");
  if(pos1<0) pos1 = url.indexOf("?"+ param +"=");
  if(pos1>-1){
    pos2 = url.indexOf("&",pos1+1);
    if(pos2==-1) pos2 = url.length;
    return unescape(url.substring(pos1+param.length+2, pos2));
  }else return null;
}

$(document).ready( function() {
	var mapLayerId = GetUrlParameter("mapLayerId");
	if(mapLayerId +"" != "null"){
		self.frames['topo'].document.applets[0].loadGraph("1024",mapLayerId);
	}else{
		alert("没有传入图层id: "+ mapLayerId);
	}
}
);

function onNodeDbClick(obj){
alert("onNodeDbClick");
}
function onNodeClick(obj){
alert("onNodeClick");
}
function onLinkDbClick(list){
alert("onLinkDbClick");
	//chooseChannel(listToArray(list));
}
//显示详细通道,如果数目过多可以分页显示
function onLinkClick(obj){
}
function javaToJs(obj){
	var iterator = obj.keySet().iterator();
	var jsObj = {};
	while(iterator.hasNext()){
		var key = iterator.next();
		jsObj[key] = obj.get(key);
	}
	return jsObj;
}

function listToArray(list){
	var arr = [];
	for(var i=0;i<list.size();i++){
		arr.push(javaToJs(list.get(i)));
	}
	return arr;
}


function chooseChannel(arr){
}


function function_dispatch(fun_id,xml,list){
	switch(fun_id){
		case "000117160010005001053001":
			chooseChannel(listToArray(list));
			break;
		default :
			alert("无此定义: " + fun_id);
			return;
	}
}