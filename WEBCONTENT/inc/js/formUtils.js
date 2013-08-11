function FormUtil(form_data){

	this.setValueToDto=function(list,dto){
		for(var i=0;i<list.length;i++) {
			if (list[i].id!=null&&list[i].id!=""){
				dto[list[i].id]=list[i].value;
			}
		}
	}
	this.getData=function(isCheck){	
		var dto = new Object();
		var t_o,t_oChilds,t_o2,spanName;
		if(!isCheck||isCheck==true||isCheck=="true"){
		var list = form_data.getElementsByTagName("span");
		for(var i=0;i<list.length;i++) {
			t_o=list[i];		
			
			if (t_o.innerText=="*" && t_o.parentNode.parentNode.style.display != "none"){
				spanName=t_o.parentNode.innerText;
				if(!isIE()){
				 t_oChilds=t_o.parentNode._nextSibling.childNodes;
				}else{
				 t_oChilds=t_o.parentNode.nextSibling.childNodes;	
				}
				if(t_oChilds && t_oChilds.length>0){
					t_o2=t_oChilds[0];
				}else{
					t_o2=null;
				}
				
				if (t_o2!=null && !t_o2.value||t_o2.value.trim()==""){
					var message = spanName.replace("*","")+"  不能为空";
					MessageBoxShow(message,null,null);

					if(t_o2.getAttribute("type") && t_o2.getAttribute("type")!="hidden")
					{
						try {
							t_o2.focus();
						} catch (e) {
						
						}
					}
					return null;					
				}
				
			}			
		}			
		}
		var list = form_data.getElementsByTagName("input");
		for(var i=0;i<list.length;i++) {
			
			if (list[i].id!=null&&list[i].id!=""&&(list[i].getAttribute("type")!=null)&&(list[i].getAttribute("type")=="text"||list[i].getAttribute("type")=="hidden")){
					dto[list[i].id]=list[i].value;
			}else if(list[i].getAttribute("type")!=null&&list[i].getAttribute("type").toLowerCase()=="radio" && list[i].getAttribute("name")!=null && list[i].getAttribute("name")!=""){
	             var arr=document.getElementsByName(list[i].getAttribute("name"));
	             for (var k=0; k<arr.length; k++) {
		             if(arr[k].checked==true){
		             	dto[list[i].name]= arr[k].value;
		             	break;
		             }
	              }
	              if(arr.length-1>=0) i+=arr.length-1;
				
			}else if(list[i].getAttribute("type")!=null&&list[i].getAttribute("type").toLowerCase()=="checkbox" && list[i].name!=null&&list[i].name!=""){
	             var arr=document.getElementsByName(list[i].name);
	             var cv= new Array();
	             for (var k=0; k<arr.length; k++) {
		             if(arr[k].checked==true){
		             	 cv.push(arr[k].value);
		             }
	              }
	              dto[list[i].name]=cv.join(';');
				 if(arr.length-1>=0) i+=arr.length-1;
			}
		}
		list = form_data.getElementsByTagName("textarea");
		{
			for(i=0;i<list.length;i++) {
				
			if (list[i].id!=null&&list[i].id!=""){
				dto[list[i].id]=list[i].value.replace(/\r\n/g,"<br>").replace(/——/g,"----").replace(/…/g,"...");
			}
		}
		}
		
		list = form_data.getElementsByTagName("select");
		this.setValueToDto(list,dto);	
		
		return dto;	
	}
	this.setData=function(dto){
		var valueT,nameT;
		var t_o;
		for(nameT in dto){

			var dId = document.getElementById(nameT);
			if(dId==null || !dId){
				var tName = document.getElementsByName(nameT);
				if(tName!=null && tName.length>0){
				  dId = tName[0];	
				}else{
					 continue;
				}
			}
			 
			t_o=dId;
			valueT = dto[nameT];
			if (t_o!=null){
				if (t_o.tagName=='TD'||t_o.tagName=='SPAN'||t_o.tagName=='DIV'){
					t_o.innerHTML=valueT.replace(/ /g,"&nbsp;");
				}else if (t_o.tagName=='TEXTAREA'){
				    t_o.value=valueT.replace(/<br>/ig,"\r\n");
				}else if(t_o.tagName.toLowerCase()=="input" && t_o.getAttribute("type").toLowerCase()=="checkbox"){
					var t_os = document.getElementsByName(t_o.name);
					for(var k=0;k<t_os.length;k++)t_os[k].checked=false;
					var vs=valueT.split(";");
					for(var i=0;i<t_os.length;i++){
						for(var j=0;j<vs.length;j++){
						if(t_os[i].value==vs[j]){
							t_os[i].checked=true;
							break;
						}
						}
					}
				}else if(t_o.tagName.toLowerCase()=="input" && t_o.getAttribute("type").toLowerCase()=="radio"){
					var t_os = document.getElementsByName(t_o.name);
					for(var i=0;i<t_os.length;i++){
						if(t_os[i].value==valueT){
							t_os[i].checked=true;
						}else{
						   	t_os[i].checked=false;
						}
					}
					
				}
				else {
				  t_o.value=valueT;
				}
			}
		}	
	}
}


String.prototype.lengthCH=function() {
		var cArr = this.match(/[^\x00-\xff]/ig);
		return this.length + (cArr == null ? 0 : cArr.length);
	}
	
String.prototype.trim=function(){return this.replace(/(^\s*)|(\s*$)/g, "");}	
String.prototype.Trim=function(){return this.replace(/(^\s*)|(\s*$)/g, "");}	
	




function MessageBoxShow(message_msg,box_type,button_type){
	var returnValue="";
	var errorMessage = new Object();
	
	errorMessage.title="提示";
	errorMessage.type = 1;
	if(box_type && box_type==2){
	errorMessage.title="告警";
	errorMessage.type = 2;	
	}
	
	errorMessage.button_type = 1;
	if(button_type && button_type == 2){
	errorMessage.button_type = 2;	
	}
	
    errorMessage.message_msg = message_msg;
    if(errorMessage.button_type == 2){
     returnValue=confirm(message_msg);
     
    }else{
    	alert(message_msg);
    }
	
		//returnValue=window.open("/OSS/inc/messagebox/AlarmHandle.htm?message="+message_msg+"&button_type="+button_type,"",'modal=yes,width=300,height=200,resizable=no,scrollbars=no');
	if(errorMessage.button_type==2 && returnValue != null){
		return returnValue;
	}
}
function isIE(){ //ie? 
    if (window.navigator.userAgent.toLowerCase().indexOf("msie")>=1) 
        return true; 
    else 
        return false; 
} 
  if(!isIE()){
   HTMLElement.prototype.__defineGetter__(    "_nextSibling", 
        function(){ 
            y=this.nextSibling;
			while (y.nodeType!=1)
			  {
			  y=y.nextSibling;
			  }
			  
			return y;
	    } 
    ); 
  }