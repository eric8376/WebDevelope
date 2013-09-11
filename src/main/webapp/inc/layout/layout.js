window.$ = function(obj){return (document.getElementById)?document.getElementById(obj):(document.all)?document.all[obj]:obj} 
window.isIE = window.Event?false:true; 
window.getMouseCoords=function(e){return {x:isIE?e.clientX+Math.max(document.body.scrollLeft, document.documentElement.scrollLeft):e.pageX, y:isIE?e.clientY+Math.max(document.body.scrollTop, document.documentElement.scrollTop):e.pageY};} 
var LP_G_DATA = new Object();
function LayoutPannel(div1,pSliderDiv,div2,pDrect,initData,pSliderDiv2,div3,initData2){
   var LP_sliderDiv = $(pSliderDiv);
   var LP_div1 = $(div1);
   var LP_div2 = $(div2);
   var LP_div3 = $(div3);
   var LP_direct = pDrect;
   var LP_sliderDiv_middle;
   
   var LP_sliderDiv2 = $(pSliderDiv2);
   var LP_sliderDiv_middle2; 
   var LP_oldData=0;
   var LP_sliderState=0;
   
   if(initData!=null) LP_G_DATA[LP_sliderDiv.id]=initData;
   if(initData2!=null) LP_G_DATA[LP_sliderDiv2.id]=initData2;
   
   this.createSliderDiv_UD = function(div_handle){
		              var dd=document.createElement("div");
		              dd.className="layout-ud-div-lr";
		              dd.id=div_handle.id+"_left_LP_$_Slider"
		              div_handle.appendChild(dd);
		              
		              var table =document.createElement("table");
		              table.className="layout-ud-div-table";
		              dd.appendChild(table);
		              
		              var LP_sliderDiv_middle_temp=document.createElement("div");
		              LP_sliderDiv_middle_temp.className="layout-ud-div-middle";
		              div_handle.appendChild(LP_sliderDiv_middle_temp);
		              
		              var table2 =document.createElement("table");
		              table2.className="layout-ud-div-table";
		              LP_sliderDiv_middle_temp.appendChild(table2);
		              
		              var dd2=document.createElement("div");
		              dd2.className="layout-ud-div-lr";
		              dd2.id=div_handle.id+"_right_LP_$_Slider"
		              div_handle.appendChild(dd2);

		              var table3 =document.createElement("table");
		              table3.className="layout-ud-div-table";
		              dd2.appendChild(table3);
		              var w= (div_handle.clientWidth-LP_sliderDiv_middle_temp.clientWidth)/2;
		              dd.style.width=w;
		              dd2.style.width=w; 
		              return LP_sliderDiv_middle_temp; 	
  };   
  this.createCssLR = function(){
		              LP_div1.className = "layout-w-div";
		              LP_div2.className = "layout-w-div";
		              LP_sliderDiv.className = "layout-lr-div";
		              LP_sliderDiv_middle=document.createElement("DIV");
		              LP_sliderDiv.appendChild(LP_sliderDiv_middle);
		              LP_sliderDiv_middle.className = "layout-lr-div-middle";
		              LP_sliderDiv_middle.style.marginTop=LP_sliderDiv.clientHeight/2+LP_sliderDiv.style.top-20;
  }
	  switch(LP_direct.toLowerCase()){
	  	
		case "west": 
		             this.createCssLR();
		              LP_div2.style.width=LP_div2.parentNode.clientWidth-LP_div1.clientWidth-LP_sliderDiv.clientWidth;
		              
		              if(window.isIE) 
		              LP_div2.parentNode.onresize = function(){
		              	LP_div2.style.width=LP_div2.parentNode.clientWidth-LP_div1.clientWidth-LP_sliderDiv.clientWidth;
		              }
		              else{
		              window.onresize = function(){
		              	LP_div2.style.width=LP_div2.parentNode.clientWidth-LP_div1.clientWidth-LP_sliderDiv.clientWidth;
		              }
		              	
		              }
		              
		              LP_sliderDiv_middle.onclick=function(e){
		              	
		              	 if(LP_div1.style.display=="none"||LP_div1.clientWidth<=0){
		              	 	if(LP_div2.clientWidth<=LP_G_DATA[LP_sliderDiv.id]){
		              	 		LP_G_DATA[LP_sliderDiv.id]=LP_div2.clientWidth;
		              	 	}
		              	 	var w =LP_div2.clientWidth-LP_G_DATA[LP_sliderDiv.id];
		              	 	LP_div1.style.width = LP_G_DATA[LP_sliderDiv.id];
		              	 	LP_div1.style.display="";
		              	 	LP_div2.style.width = w;
		              	}else{
		              		var w = parseInt(LP_div1.clientWidth,10)+parseInt(LP_div2.clientWidth,10);
		              		LP_G_DATA[LP_sliderDiv.id]=LP_div1.clientWidth;
		              		LP_div1.style.display="none";
		              		LP_div2.style.width =0;
		              		LP_div2.style.width = w;
		              	}
		              
		              };
		               LP_sliderDiv.onmousedown = function(e){
		               LP_sliderState=1;
		               LP_sliderDiv.style.zIndex = 10;                                     
                   var doc=document;if(!e)e=window.event; 
                   var MCD=window.getMouseCoords(e);
                   var x0=MCD.x;
                   var y0=MCD.y;
                   var _oldWidth  = LP_div1.clientWidth;
                   var _oldWidth2  = LP_div2.clientWidth;

                
                   if(LP_sliderDiv.setCapture){ 
										LP_sliderDiv.setCapture(); 
									 }else if(window.captureEvents){ 
										window.captureEvents(Event.MOUSEMOVE|Event.MOUSEUP); 
                   }
                   
                   doc.onmousemove =function(e){ 
                   	if(LP_div1.style.display == "none"){return;}
                   	if(LP_sliderState==1 ){
                   		if(!e)e=window.event; 
                   		var mus=getMouseCoords(e);
                   		var newWidth = _oldWidth+mus.x-x0;
                   		if(newWidth<=0)
                   		   newWidth=0;
                   		if(newWidth>=(_oldWidth+_oldWidth2))   
                   			 newWidth=_oldWidth+_oldWidth2;
                   		
                   		LP_div1.style.width=newWidth+"px";
                   		LP_div2.style.width=(_oldWidth+_oldWidth2-newWidth)+"px";
                   	  
                   	}
                   }
                   doc.onmouseup=function(){ 
                   	 LP_sliderState=0;
										if(LP_sliderDiv.releaseCapture){ 
										 LP_sliderDiv.releaseCapture(); 
										 }else if(window.captureEvents){ 
										 window.captureEvents(Event.MOUSEMOVE|Event.MOUSEUP); 
									  }
									  LP_G_DATA[LP_sliderDiv.id] = LP_div1.clientWidth;
									 
										doc.onmousemove=null; 
										doc.onmouseup=null; 
									 } 
		              };
		              break;
		case "east":
		            /*
		              LP_div1.className = "layout-w-div";
		              LP_div2.className = "layout-w-div";
		              LP_sliderDiv.className = "layout-lr-div";
		              LP_sliderDiv_middle=document.createElement("DIV");
		              LP_sliderDiv.appendChild(LP_sliderDiv_middle);
		              LP_sliderDiv_middle.className = "layout-lr-div-middle";
		              LP_sliderDiv_middle.style.marginTop=LP_sliderDiv.clientHeight/2+LP_sliderDiv.style.top-20;
		              */
		              this.createCssLR();
	                LP_div1.style.width=LP_div1.parentNode.clientWidth-LP_div2.clientWidth-LP_sliderDiv.clientWidth;
                  
		              if(window.isIE) 
		                LP_div1.parentNode.onresize = function(){
		              	if(LP_div2.style.display=="none")
		              	  LP_div1.style.width = LP_div1.parentNode.clientWidth-LP_sliderDiv.clientWidth;
		              	else 
		              		LP_div1.style.width = LP_div1.parentNode.clientWidth-LP_sliderDiv.clientWidth-LP_div2.clientWidth;
		              }
		              else{
		              window.onresize = function(){
		              	if(LP_div2.style.display=="none"){
		              	  LP_div1.style.width = LP_div1.parentNode.clientWidth-LP_sliderDiv.clientWidth;
		              	}
		              	else {
		              		LP_div1.style.width = LP_div1.parentNode.clientWidth-LP_sliderDiv.clientWidth-LP_div2.clientWidth;
		                }
		              }
		              	
		              }
	                

		              LP_sliderDiv_middle.onclick=function(e){
		              	 if(LP_div2.style.display=="none" ||LP_div2.clientWidth<=0){
		              	  if(LP_div1.clientWidth<=LP_G_DATA[LP_sliderDiv.id]){
		              	 		LP_G_DATA[LP_sliderDiv.id]=LP_div1.clientWidth;
		              	 	}
		              	 	
		              	 	LP_div1.style.width = LP_div1.clientWidth-LP_G_DATA[LP_sliderDiv.id];
		              	 	LP_div2.style.display="";
		              	 	LP_div2.style.width = LP_G_DATA[LP_sliderDiv.id];
		              	}else{
		              		LP_G_DATA[LP_sliderDiv.id]=LP_div2.clientWidth;
		              		LP_div2.style.width=0;
		              		LP_div2.style.display="none";
		              		//LP_div1.style.width = LP_div1.clientWidth+LP_G_DATA[LP_sliderDiv.id];
		              		LP_div1.style.width = LP_div1.parentNode.clientWidth-LP_sliderDiv.clientWidth;
		              	}
		              };
		               LP_sliderDiv.onmousedown = function(e){
		               LP_sliderState=1;
		               LP_sliderDiv.style.zIndex = 10;                                     
                   var doc=document;if(!e)e=window.event; 
                   var MCD=window.getMouseCoords(e);
                   var x0=MCD.x;
                   var y0=MCD.y;
                   var _oldWidth  = LP_div1.clientWidth;
                   var _oldWidth2  = LP_div2.clientWidth;
                  if(LP_sliderDiv.setCapture){ 
										LP_sliderDiv.setCapture(); 
									 }else if(window.captureEvents){ 
										window.captureEvents(Event.MOUSEMOVE|Event.MOUSEUP); 
                   }
                   
                   doc.onmousemove =function(e){ 
                   	if(LP_div2.style.display == "none"){return;}
                   	if(LP_sliderState==1 ){
                   		if(!e)e=window.event; 
                   		var mus=getMouseCoords(e);
                   		var newWidth = _oldWidth+mus.x-x0;
                   		if(newWidth<=0)
                   		   newWidth=0;
                   		if(newWidth>=(_oldWidth+_oldWidth2))   
                   			 newWidth=_oldWidth+_oldWidth2;
                   		LP_div1.style.width=newWidth+"px";
                   		LP_div2.style.width=(_oldWidth+_oldWidth2-newWidth)+"px";
                   	}
                   }
                   doc.onmouseup=function(){ 
                   	 LP_sliderState=0;
										if(LP_sliderDiv.releaseCapture){ 
										 LP_sliderDiv.releaseCapture(); 
										 }else if(window.captureEvents){ 
										 window.captureEvents(Event.MOUSEMOVE|Event.MOUSEUP); 
									  }
									  LP_G_DATA[LP_sliderDiv.id] = LP_div2.clientWidth;
										doc.onmousemove=null; 
										doc.onmouseup=null; 
									 } 
		              };
		              break;
		case "west-east": 
		case "east-west":
		             /*
		              LP_div1.className = "layout-w-div";
		              LP_div2.className = "layout-w-div";
		              
		              LP_sliderDiv.className = "layout-lr-div";
		              
		              
		              LP_sliderDiv_middle=document.createElement("DIV");
		              LP_sliderDiv.appendChild(LP_sliderDiv_middle);
		              LP_sliderDiv_middle.className = "layout-lr-div-middle";
		              LP_sliderDiv_middle.style.marginTop=LP_sliderDiv.clientHeight/2+LP_sliderDiv.style.top-20;
		              */
		              this.createCssLR();
		              LP_div3.className = "layout-w-div";
		              LP_sliderDiv2.className = "layout-lr-div";
		              LP_sliderDiv_middle2=document.createElement("DIV");
		              LP_sliderDiv2.appendChild(LP_sliderDiv_middle2);
		              LP_sliderDiv_middle2.className = "layout-lr-div-middle";
		              //LP_sliderDiv_middle2.style.marginTop=LP_sliderDiv2.clientHeight/2+LP_sliderDiv2.style.top-20;
		              LP_sliderDiv_middle2.style.marginTop=LP_sliderDiv_middle.style.marginTop;
		              LP_div2.style.width=LP_div2.parentNode.clientWidth-LP_div1.clientWidth-LP_sliderDiv.clientWidth*2-LP_div3.clientWidth;


		              
		              if(window.isIE){
		              LP_div2.parentNode.onresize = function(){
		              	
		              	var w0=parseInt(LP_div2.parentNode.clientWidth,10)-LP_sliderDiv.clientWidth*2;
		              	if(w0<=0)return;
		              	if(w0<=parseInt(LP_div2.clientWidth,10)){
		              		LP_div2.style.display="block";
		              		LP_div1.style.display="none";
		              		LP_div2.style.width=w0;
		              		LP_div3.style.display="none";
		              	}else{
		              	var w=w0;
		              	if(LP_div1.style.display!="none")w =w-parseInt(LP_div1.clientWidth,10);
		              	if(LP_div3.style.display!="none")w =w-parseInt(LP_div3.clientWidth,10);
		                if(w<=0){ 
		                	w=0;
		                	LP_div2.style.display="none";
		              	  LP_div2.style.width=0;
		              	
		                }else{
		                	LP_div2.style.display="block";
		                	LP_div2.style.width=w;
		                }
		              	
		              	var w1=0;
		              	if(LP_div1.style.display!="none" && LP_div1.clientWidth>=(w0-w)){
		              		LP_div1.style.width = w0-w;
		              		w1=w0-w;
		              	}
		              	var w2=w0-w-w1;
		              	if(LP_div3.style.display!="none" && LP_div3.clientWidth>=w2){
		              		LP_div1.style.width = w2;
		              	}
		              }
		              }
		              }else{
		              window.onresize = function(){
		              	var w0=parseInt(LP_div2.parentNode.clientWidth,10)-LP_sliderDiv.clientWidth*2;
		              	if(w0<=0)return;
		              	if(w0<=parseInt(LP_div2.clientWidth,10)){
		              		LP_div2.style.display="block";
		              		LP_div1.style.display="none";
		              		LP_div2.style.width=w0;
		              		LP_div3.style.display="none";
		              	}else{
		              	var w=w0;
		              	if(LP_div1.style.display!="none")w =w-parseInt(LP_div1.clientWidth,10);
		              	if(LP_div3.style.display!="none")w =w-parseInt(LP_div3.clientWidth,10);
		                if(w<=0){ 
		                	w=0;
		                	LP_div2.style.display="none";
		              	  LP_div2.style.width=0;
		              	
		                }else{
		                	LP_div2.style.display="block";
		                	LP_div2.style.width=w;
		                }
		              	
		              	var w1=0;
		              	if(LP_div1.style.display!="none" && LP_div1.clientWidth>=(w0-w)){
		              		LP_div1.style.width = w0-w;
		              		w1=w0-w;
		              	}
		              	var w2=w0-w-w1;
		              	if(LP_div3.style.display!="none" && LP_div3.clientWidth>=w2){
		              		LP_div1.style.width = w2;
		              	}
		              }		              }
		              	
		              }
		              
		              LP_sliderDiv_middle.onclick=function(e){
		              	 LP_div2.style.display="block";
		              	 if(LP_div1.style.display=="none"||LP_div1.clientWidth<=0){
		              	 	if(LP_div2.clientWidth<=LP_G_DATA[LP_sliderDiv.id]){
		              	 		LP_G_DATA[LP_sliderDiv.id]=parseInt(LP_div2.clientWidth,10);
		              	 	}
		              	 	
		              	 	LP_div1.style.width = LP_G_DATA[LP_sliderDiv.id];
		              	 	LP_div1.style.display="";
		              	 	LP_div2.style.width = LP_div2.clientWidth-LP_div1.clientWidth;
		              	 
		              	}else{
		              		
		              		var w = parseInt(LP_div2.clientWidth,10)+LP_div1.clientWidth;
		              		LP_G_DATA[LP_sliderDiv.id]=LP_div1.clientWidth;
		              		LP_div1.style.display="none";
		              		LP_div1.style.width=0;
		              		LP_div2.style.width = w;
		              	}
		              
		              };
		              LP_sliderDiv_middle2.onclick=function(e){
		              	 LP_div2.style.display="block";
		              	 if(LP_div3.style.display=="none"||LP_div3.clientWidth<=0){
		              	 	if(LP_div2.clientWidth<=LP_G_DATA[LP_sliderDiv2.id]){
		              	 		LP_G_DATA[LP_sliderDiv2.id]=LP_div2.clientWidth;
		              	 	}
		              	 	var w=parseInt(LP_div2.clientWidth,10)-LP_G_DATA[LP_sliderDiv2.id];
		              	 	LP_div3.style.width = LP_G_DATA[LP_sliderDiv2.id];
		              	 	LP_div3.style.display="";
		              	 	LP_div2.style.width = w;
		              	 	
		              	}else{
		              		var w = parseInt(LP_div2.clientWidth,10)+LP_div3.clientWidth;
		              		LP_G_DATA[LP_sliderDiv2.id]=LP_div3.clientWidth;
		              		LP_div3.style.display="none";
		              		LP_div3.style.width=0;
		              		LP_div2.style.width = w;

		              	}
	              
		              };

		              LP_sliderDiv.onmousedown = function(e){
		               LP_sliderState=1;
		               LP_sliderDiv.style.zIndex = 10;                                     
                   var doc=document;if(!e)e=window.event; 
                   var MCD=window.getMouseCoords(e);
                   var x0=MCD.x;
                   var y0=MCD.y;
                   var _oldWidth  = LP_div1.clientWidth;
                   var _oldWidth2  = LP_div2.clientWidth;

                
                   if(LP_sliderDiv.setCapture){ 
										LP_sliderDiv.setCapture(); 
									 }else if(window.captureEvents){ 
										window.captureEvents(Event.MOUSEMOVE|Event.MOUSEUP); 
                   }
                   
                   doc.onmousemove =function(e){ 
                   	if(LP_div1.style.display == "none"){return;}
                   	if(LP_sliderState==1 ){
                   		if(!e)e=window.event; 
                   		var mus=getMouseCoords(e);
                   		var newWidth = _oldWidth+mus.x-x0;
                   		if(newWidth<=0)
                   		   newWidth=0;
                   		if(newWidth>=(_oldWidth+_oldWidth2))   
                   			 newWidth=_oldWidth+_oldWidth2;
                   		
                   		LP_div1.style.width=newWidth+"px";
                   		LP_div2.style.width=(_oldWidth+_oldWidth2-newWidth)+"px";
                   	  
                   	}
                   }
                   doc.onmouseup=function(){ 
                   	 LP_sliderState=0;
										if(LP_sliderDiv.releaseCapture){ 
										 LP_sliderDiv.releaseCapture(); 
										 }else if(window.captureEvents){ 
										 window.captureEvents(Event.MOUSEMOVE|Event.MOUSEUP); 
									  }
									  //LP_G_DATA[LP_sliderDiv.id] = LP_div1.clientWidth;
									 
										doc.onmousemove=null; 
										doc.onmouseup=null; 
									 } 
		              };

		              LP_sliderDiv2.onmousedown = function(e){
		               LP_sliderState=1;
		               LP_sliderDiv2.style.zIndex = 10;                                     
                   var doc=document;if(!e)e=window.event; 
                   var MCD=window.getMouseCoords(e);
                   var x0=MCD.x;
                   var y0=MCD.y;
                   var _oldWidth2  = LP_div2.clientWidth;
                   var _oldWidth3  = LP_div3.clientWidth;
                   

                
                   if(LP_sliderDiv2.setCapture){ 
										LP_sliderDiv2.setCapture(); 
									 }else if(window.captureEvents){ 
										window.captureEvents(Event.MOUSEMOVE|Event.MOUSEUP); 
                   }
                   
                   doc.onmousemove =function(e){ 
                   	if(LP_div3.style.display == "none"){return;}
                   	if(LP_sliderState==1 ){
                   		if(!e)e=window.event; 
                   		var mus=getMouseCoords(e);
                   		var newWidth = _oldWidth2+mus.x-x0;
                   		if(newWidth<=0)
                   		   newWidth=0;
                   		if(newWidth>=(_oldWidth3+_oldWidth2))   
                   			 newWidth=_oldWidth3+_oldWidth2;
                   		
                   		LP_div2.style.width=newWidth+"px";
                   		LP_div3.style.width=(_oldWidth2+_oldWidth3-newWidth)+"px";
                   	  
                   	}
                   }
                   doc.onmouseup=function(){ 
                   	 LP_sliderState=0;
										if(LP_sliderDiv2.releaseCapture){ 
										 LP_sliderDiv2.releaseCapture(); 
										 }else if(window.captureEvents){ 
										 window.captureEvents(Event.MOUSEMOVE|Event.MOUSEUP); 
									  }
									  //LP_G_DATA[LP_sliderDiv2.id]=LP_div3.clientWidth;
									  //_oldWidth2 = LP_div2.clientWidth;
									 
										doc.onmousemove=null; 
										doc.onmouseup=null; 
									 } 
		              };		              
		              break;		 
		case "north": 
		              LP_div1.className = "layout-h-div";
		              LP_div2.className = "layout-h-div";
		              LP_sliderDiv.className = "layout-ud-div";
		              LP_sliderDiv_middle = this.createSliderDiv_UD(LP_sliderDiv);
		              //LP_sliderDiv_middle.style.marginLeft=LP_sliderDiv.clientWidth/2+LP_sliderDiv.style.left-20;
                  
                  LP_div2.style.height = LP_div2.parentNode.clientHeight-LP_div1.clientHeight-LP_sliderDiv.clientHeight;
	                
		              if(window.isIE){ 
		                LP_div1.parentNode.onresize = function(){
		              	if(LP_div1.style.display=="none")
		              	  LP_div2.style.height = LP_div1.parentNode.clientHeight-LP_sliderDiv.clientHeight;
		              	else 
		              		LP_div2.style.height = LP_div1.parentNode.clientHeight-LP_sliderDiv.clientHeight-LP_div1.clientHeight;
		              }
		              }else{
		              window.onresize = function(){
		              	if(LP_div1.style.display=="none"){
		              	  LP_div2.style.height = LP_div1.parentNode.clientHeight-LP_sliderDiv.clientHeight;
		              	}
		              	else {
		              		LP_div2.style.height = LP_div1.parentNode.clientHeight-LP_sliderDiv.clientHeight-LP_div1.clientHeight;
		                }
		              }
		              	
		              }
                  
		              LP_sliderDiv_middle.onclick=function(e){
		              	
		              	 if(LP_div1.style.display=="none"||LP_div1.clientHeight<=0){
		              	 	if(LP_div2.clientHeight<=LP_G_DATA[LP_sliderDiv.id]){
		              	 		LP_G_DATA[LP_sliderDiv.id]=LP_div2.clientHeight;
		              	 	}
		              	 	LP_div1.style.height = LP_G_DATA[LP_sliderDiv.id];
		              	 	LP_div1.style.display="";
		              	 	LP_div2.style.height = LP_div2.clientHeight-LP_G_DATA[LP_sliderDiv.id];
		              	}else{
		              		LP_G_DATA[LP_sliderDiv.id]=LP_div1.clientHeight;
		              		LP_div1.style.display="none";
		              		LP_div2.style.height = LP_G_DATA[LP_sliderDiv.id]+LP_div2.clientHeight;
		              	}
		              
		              };
		              LP_sliderDiv.onmousedown = function(e){
		               LP_sliderState=1;
		               LP_sliderDiv.style.zIndex = 10;                                     
                   var doc=document;if(!e)e=window.event; 
                   var MCD=window.getMouseCoords(e);
                   var x0=MCD.x;
                   var y0=MCD.y;
                   var _oldHeight  = LP_div1.clientHeight;
                   var _oldHeight2  = LP_div2.clientHeight;

                
                   if(LP_sliderDiv.setCapture){ 
										LP_sliderDiv.setCapture(); 
									 }else if(window.captureEvents){ 
										window.captureEvents(Event.MOUSEMOVE|Event.MOUSEUP); 
                   }
                   
                   doc.onmousemove =function(e){ 
                   	if(LP_div1.style.display == "none"){return;}
                   	if(LP_sliderState==1 ){
                   		if(!e)e=window.event; 
                   		var mus=getMouseCoords(e);
                   		var newHeight = _oldHeight+mus.y-y0;
                   		if(newHeight<=0)
                   		   newHeight=0;
                   		if(newHeight>=(_oldHeight+_oldHeight2))   
                   			 newHeight=_oldHeight+_oldHeight2;
                   		LP_div1.style.height=newHeight+"px";
                   		LP_div2.style.height=(_oldHeight+_oldHeight2-newHeight)+"px";
                   	}
                   }
                   doc.onmouseup=function(){ 
                   	 LP_sliderState=0;
										if(LP_sliderDiv.releaseCapture){ 
										 LP_sliderDiv.releaseCapture(); 
										 }else if(window.captureEvents){ 
										 window.captureEvents(Event.MOUSEMOVE|Event.MOUSEUP); 
									  }
									  _oldHeight = LP_div1.clientHeight;
										doc.onmousemove=null; 
										doc.onmouseup=null; 
									 } 
		              };
		              break;
		case "south":        
		              LP_div1.className = "layout-h-div";
		              LP_div2.className = "layout-h-div";
		              LP_sliderDiv.className = "layout-ud-div";
		              
                  LP_sliderDiv_middle = this.createSliderDiv_UD(LP_sliderDiv);                  
                  LP_div1.style.height = LP_div1.parentNode.clientHeight-LP_div2.clientHeight-LP_sliderDiv.clientHeight;
	                
		              if(window.isIE){ 
		                LP_div1.parentNode.onresize = function(){
		              	if(LP_div2.style.display=="none")
		              	  LP_div1.style.height = LP_div1.parentNode.clientHeight-LP_sliderDiv.clientHeight;
		              	else 
		              		LP_div1.style.height = LP_div1.parentNode.clientHeight-LP_sliderDiv.clientHeight-LP_div2.clientHeight;
		              }
		              }else{
		              window.onresize = function(){
		              	if(LP_div2.style.display=="none"){
		              	  LP_div1.style.height = LP_div1.parentNode.clientHeight-LP_sliderDiv.clientHeight;
		              	}
		              	else {
		              		LP_div1.style.height = LP_div1.parentNode.clientHeight-LP_sliderDiv.clientHeight-LP_div2.clientHeight;
		                }
		              }
		              	
		              }
                  
		              LP_sliderDiv_middle.onclick=function(e){
		              	
		              	 if(LP_div2.style.display=="none"||LP_div2.clientHeight<=0){
		              	 	if(LP_div1.clientHeight<=LP_G_DATA[LP_sliderDiv.id]){
		              	 		LP_G_DATA[LP_sliderDiv.id]=LP_div1.clientHeight;
		              	 	}
		              	 	LP_div2.style.height = LP_G_DATA[LP_sliderDiv.id];
		              	 	LP_div2.style.display="";
		              	 	LP_div1.style.height = LP_div1.clientHeight-LP_G_DATA[LP_sliderDiv.id];
		              	}else{
		              		LP_G_DATA[LP_sliderDiv.id]=LP_div2.clientHeight;
		              		LP_div2.style.display="none";
		              		LP_div1.style.height = LP_G_DATA[LP_sliderDiv.id]+LP_div1.clientHeight;
		              	}
		              
		              };
		              LP_sliderDiv.onmousedown = function(e){
		               LP_sliderState=1;
		               LP_sliderDiv.style.zIndex = 10;                                     
                   var doc=document;if(!e)e=window.event; 
                   var MCD=window.getMouseCoords(e);
                   var x0=MCD.x;
                   var y0=MCD.y;
                   var _oldHeight  = LP_div1.clientHeight;
                   var _oldHeight2  = LP_div2.clientHeight;

                
                   if(LP_sliderDiv.setCapture){ 
										LP_sliderDiv.setCapture(); 
									 }else if(window.captureEvents){ 
										window.captureEvents(Event.MOUSEMOVE|Event.MOUSEUP); 
                   }
                   
                   doc.onmousemove =function(e){ 
                   	if(LP_div2.style.display == "none"){return;}
                   	if(LP_sliderState==1 ){
                   		if(!e)e=window.event; 
                   		var mus=getMouseCoords(e);
                   		var newHeight = _oldHeight+mus.y-y0;
                   		if(newHeight<=0)
                   		   newHeight=0;
                   		if(newHeight>=(_oldHeight+_oldHeight2))   
                   			 newHeight=_oldHeight+_oldHeight2;
                   		LP_div1.style.height=newHeight+"px";
                   		LP_div2.style.height=(_oldHeight+_oldHeight2-newHeight)+"px";
                   	}
                   }
                   doc.onmouseup=function(){ 
                   	 LP_sliderState=0;
										if(LP_sliderDiv.releaseCapture){ 
										 LP_sliderDiv.releaseCapture(); 
										 }else if(window.captureEvents){ 
										 window.captureEvents(Event.MOUSEMOVE|Event.MOUSEUP); 
									  }
									  _oldHeight = LP_div1.clientHeight;
										doc.onmousemove=null; 
										doc.onmouseup=null; 
									 } 
		              };
		              break;
case "north-south":
case "south-north":
                 
		              LP_div1.className = "layout-h-div";
		              LP_div2.className = "layout-h-div";
		              LP_div3.className = "layout-h-div";
		              LP_sliderDiv.className = "layout-ud-div";
		              LP_sliderDiv2.className = "layout-ud-div";
		              
		             
		              LP_sliderDiv_middle2 = this.createSliderDiv_UD(LP_sliderDiv2);
		              LP_sliderDiv_middle = this.createSliderDiv_UD(LP_sliderDiv);
		              LP_div2.style.height=LP_div2.parentNode.clientHeight-LP_div1.clientHeight-LP_sliderDiv.clientHeight*2-LP_div3.clientHeight;
 
		              
		              if(window.isIE){
		              LP_div2.parentNode.onresize = function(){
		              LP_sliderDiv.style.width=LP_div2.parentNode.clientWidth;
		              LP_sliderDiv2.style.width=LP_div2.parentNode.clientWidth;
		              LP_sliderDiv_middle.style.left=LP_div2.parentNode.clientWidth/2+LP_sliderDiv_middle.clientWidth/2;
		              LP_sliderDiv_middle2.style.left=LP_div2.parentNode.clientWidth/2+LP_sliderDiv_middle.clientWidth/2;
		              	
		              	var w0=parseInt(LP_div2.parentNode.clientHeight,10)-LP_sliderDiv.clientHeight*2;
		              	if(w0<=0)return;
		              	if(w0<=parseInt(LP_div2.clientHeight,10)){
		              		LP_div2.style.display="block";
		              		LP_div1.style.display="none";
		              		LP_div2.style.height=w0;
		              		LP_div3.style.display="none";
		              	}else{
		              	var w=w0;
		              	if(LP_div1.style.display!="none")w =w-parseInt(LP_div1.clientHeight,10);
		              	if(LP_div3.style.display!="none")w =w-parseInt(LP_div3.clientHeight,10);
		                if(w<=0){ 
		                	w=0;
		                	LP_div2.style.display="none";
		              	  LP_div2.style.height=0;
		              	
		                }else{
		                	LP_div2.style.display="block";
		                	LP_div2.style.height=w;
		                }
		              	
		              	var w1=0;
		              	if(LP_div1.style.display!="none" && LP_div1.clientHeight>=(w0-w)){
		              		LP_div1.style.height = w0-w;
		              		w1=w0-w;
		              	}
		              	var w2=w0-w-w1;
		              	if(LP_div3.style.display!="none" && LP_div3.clientHeight>=w2){
		              		LP_div1.style.height = w2;
		              	}
		              }
		              }
		              }else{
		              window.onresize = function(){
		              	var w0=parseInt(LP_div2.parentNode.clientHeight,10)-LP_sliderDiv.clientHeight*2;
		              	if(w0<=0)return;
		              	if(w0<=parseInt(LP_div2.clientHeight,10)){
		              		LP_div2.style.display="block";
		              		LP_div1.style.display="none";
		              		LP_div2.style.height=w0;
		              		LP_div3.style.display="none";
		              	}else{
		              	var w=w0;
		              	if(LP_div1.style.display!="none")w =w-parseInt(LP_div1.clientHeight,10);
		              	if(LP_div3.style.display!="none")w =w-parseInt(LP_div3.clientHeight,10);
		                if(w<=0){ 
		                	w=0;
		                	LP_div2.style.display="none";
		              	  LP_div2.style.height=0;
		              	
		                }else{
		                	LP_div2.style.display="block";
		                	LP_div2.style.height=w;
		                }
		              	
		              	var w1=0;
		              	if(LP_div1.style.display!="none" && LP_div1.clientHeight>=(w0-w)){
		              		LP_div1.style.height = w0-w;
		              		w1=w0-w;
		              	}
		              	var w2=w0-w-w1;
		              	if(LP_div3.style.display!="none" && LP_div3.clientHeight>=w2){
		              		LP_div1.style.height = w2;
		              	}
		              }	
		              }
		              	
		              };
		              
		              LP_sliderDiv_middle.onclick=function(e){
		              	
		              	 LP_div2.style.display="block";
		              	 if(LP_div1.style.display=="none"||LP_div1.clientHeight<=0){
		              	 	if(LP_div2.clientHeight<=LP_G_DATA[LP_sliderDiv.id]){
		              	 		LP_G_DATA[LP_sliderDiv.id]=parseInt(LP_div2.clientHeight,10);
		              	 	}
		              	 	LP_div2.style.height = LP_div2.clientHeight-LP_div1.clientHeight;
		              	 	LP_div1.style.height = LP_G_DATA[LP_sliderDiv.id];
		              	 	LP_div1.style.display="";
		              	 	
		              	 
		              	}else{
		              		LP_G_DATA[LP_sliderDiv.id]=LP_div1.clientHeight;
  	              		LP_div2.style.height = parseInt(LP_div2.clientHeight,10)+LP_G_DATA[LP_sliderDiv.id];
		              		LP_div1.style.display="none";
		              		LP_div1.style.height=0;
		              		
		              	}
		              
		              };
		              LP_sliderDiv_middle2.onclick=function(e){
		              	
		              	 LP_div2.style.display="block";
		              	 if(LP_div3.style.display=="none"||LP_div3.clientHeight<=0){
		              	 
		              	 	if(parseInt(LP_div2.clientHeight,10)<=LP_G_DATA[LP_sliderDiv2.id]){
		              	 		LP_G_DATA[LP_sliderDiv2.id]=parseInt(LP_div2.clientHeight,10);
		              	 		
		              	 	}
		              	 		
		              	 	var w=parseInt(LP_div2.clientHeight,10)-LP_G_DATA[LP_sliderDiv2.id];
		              	 	LP_div2.style.height = w;
		              	 	LP_div3.style.height = LP_G_DATA[LP_sliderDiv2.id];
		              	 	LP_div3.style.display="";
		              	 	
		              	 	
		              	}else{
		              		var w = parseInt(LP_div2.clientHeight,10)+LP_div3.clientHeight;
		              		LP_G_DATA[LP_sliderDiv2.id]=parseInt(LP_div3.clientHeight,10);
		              		LP_div3.style.display="none";
		              		LP_div3.style.height=0;
		              		LP_div2.style.height = w;
		              		

		              	}
	              
		              };
		              //$(LP_sliderDiv.id+"_right_LP_$_Slider")

		              LP_sliderDiv.onmousedown = function(e){
		              	var doc=document;if(!e)e=window.event; 
		              	 eleSrc = e.srcElement || e.target;
		               LP_sliderState=1;
		               LP_sliderDiv.style.zIndex = 10;                                     
                   
                   var MCD=window.getMouseCoords(e);
                   var x0=MCD.x;
                   var y0=MCD.y;
                   var _oldHeight  = LP_div1.clientHeight;
                   var _oldHeight2  = LP_div2.clientHeight;

                
                   if(LP_sliderDiv.setCapture){ 
										LP_sliderDiv.setCapture(); 
									 }else if(window.captureEvents){ 
										window.captureEvents(Event.MOUSEMOVE|Event.MOUSEUP); 
                   }
                   
                   doc.onmousemove =function(e){ 
                   	if(LP_div1.style.display == "none"){return;}
                   	if(LP_sliderState==1 ){
                   		if(!e)e=window.event; 
                   		var mus=getMouseCoords(e);
                   		var newHeight = _oldHeight+mus.y-y0;
                   		if(newHeight<=0)
                   		   newHeight=0;
                   		if(newHeight>=(_oldHeight+_oldHeight2))   
                   			 newHeight=_oldHeight+_oldHeight2;
                   		
                   		LP_div1.style.height=newHeight+"px";
                   		LP_div2.style.height=(_oldHeight+_oldHeight2-newHeight)+"px";
                   	  
                   	}
                   }
                   doc.onmouseup=function(){ 
                   	 LP_sliderState=0;
										if(LP_sliderDiv.releaseCapture){ 
										 LP_sliderDiv.releaseCapture(); 
										 }else if(window.captureEvents){ 
										 window.captureEvents(Event.MOUSEMOVE|Event.MOUSEUP); 
									  }
									  LP_G_DATA[LP_sliderDiv.id] = LP_div1.clientHeight;
									 
										doc.onmousemove=null; 
										doc.onmouseup=null; 
									 } 
		              };
                  

		              LP_sliderDiv2.onmousedown = function(e){
		               LP_sliderState=1;
		               LP_sliderDiv2.style.zIndex = 10;                                     
                   var doc=document;if(!e)e=window.event; 
                   var MCD=window.getMouseCoords(e);
                   var x0=MCD.x;
                   var y0=MCD.y;
                   var _oldHeight2  = LP_div2.clientHeight;
                   var _oldHeight3  = LP_div3.clientHeight;
                   

                
                   if(LP_sliderDiv2.setCapture){ 
										LP_sliderDiv2.setCapture(); 
									 }else if(window.captureEvents){ 
										window.captureEvents(Event.MOUSEMOVE|Event.MOUSEUP); 
                   }
                   
                   doc.onmousemove =function(e){ 
                   	if(LP_div3.style.display == "none"){return;}
                   	if(LP_sliderState==1 ){
                   		if(!e)e=window.event; 
                   		var mus=getMouseCoords(e);
                   		var newHeight = _oldHeight2+mus.y-y0;
                   		if(newHeight<=0)
                   		   newHeight=0;
                   		if(newHeight>=(_oldHeight2+_oldHeight3))   
                   			 newHeight=_oldHeight2+_oldHeight3;
                   		
                   		LP_div2.style.height=newHeight+"px";
                   		LP_div3.style.height=(_oldHeight2+_oldHeight3-newHeight)+"px";
                   	  
                   	}
                   }
                   doc.onmouseup=function(){ 
                   	 LP_sliderState=0;
										if(LP_sliderDiv2.releaseCapture){ 
										 LP_sliderDiv2.releaseCapture(); 
										 }else if(window.captureEvents){ 
										 window.captureEvents(Event.MOUSEMOVE|Event.MOUSEUP); 
									  }
									  LP_G_DATA[LP_sliderDiv2.id]=LP_div3.clientHeight;
									  //_oldWidth2 = LP_div2.clientWidth;
									 
										doc.onmousemove=null; 
										doc.onmouseup=null; 
									 } 
		              };		              
		              break;		 
		                 
	};

};
