<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>资源管理</title>
</head>
<link rel="stylesheet" type="text/css" href="style/base.css" />
<link rel="stylesheet" type="text/css" href="style/dragDiv.css" />
<body>
<div class="divTop">
 	<div id="left-div"  class="left-div" style="width:50px"><iframe name="lfefFrame" id="lfefFrame" src="" frameborder=0 width="100%" height="100%" scrolling="yes"></iframe></div> 
 	<div class="middld-div" onmousedown="moveStartLR(this,document.getElementById('left-div'),document.getElementById('right-div'));" onmousemove="movingLR(this,document.getElementById('left-div'),document.getElementById('right-div'));"onmouseup="moveEnd(this);" >
 	</div> 
 	<div style="float:left;"><img id="divBar" onclick="changeDivWidth();" src="images/btn/left.png" style="cursor:pointer"/></div>
 	<div id="right-div" class="right-div"><iframe name="lfefFrame" id="lfefFrame" src="" frameborder=0 width="100%" height="100%" scrolling="yes"></iframe></div> 
</div> 
</body>
</html>
<script>
function changeDivWidth(){
  if((document.getElementById("divBar").src).indexOf("right.png")!=-1){
    document.getElementById("divBar").src="images/btn/left.png";
    document.getElementById("left-div").style.width=_lastWidth;
  }else {
   document.getElementById("divBar").src="images/btn/right.png";
   _lastWidth=document.getElementById("left-div").clientWidth;
   document.getElementById("left-div").style.width=0;
  }
}

var _down = 0;  
var _lastWidth=0;    
function moveEnd(obj){      
    _down = 0;      
    obj.releaseCapture();      
}  
function moveStartLR(obj,lDiv,rDiv){      
    obj.setCapture();      
    obj.style.zIndex = 10;      
    _down = 1;
    _styleWidth =  lDiv.clientWidth;   
     
    _sideLeft = event.clientX - _styleWidth;      
              
    event.cancelBubble = true;      
    event.returnValue = false;      
}      
     
function movingLR(obj,lDiv,rDiv){      
    if(_down==1){
                  
              _styleWidth = Math.max(xx = event.clientX - _sideLeft,0); 
              if(rDiv.clientWidth>10 || _styleWidth<lDiv.clientWidth){ 
              lDiv.style.width = _styleWidth; 
              document.getElementById("divBar").src="images/btn/left.png";
              }    
    }      
}
</script>