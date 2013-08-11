
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


function objectDetail(obj,preBlank1){
	var preBlank=(preBlank1==null)?"":preBlank1;
	var str="";
	switch(typeof(obj)){
		case "number":
		case "string":
		case "boolean": return obj+"\n";break;
		case "object":
		              for(var na in obj){
		              	var naStr=na.toString();
		              	if(parseInt(naStr.substr(0,1))>=0) naStr="["+na+"]";
		              	var len=naStr.length;
		              	var pre="";
		              	for(var i=0;i<len;i++)
		              	   pre+=" ";
		                str+=preBlank+naStr+":"+objectDetail(obj[na],preBlank+pre+" ");	   
		              	
		              }
		              return "\n"+str;
		              break;
		               
	default: return "undefinded\n";break;	
	}
	
}

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
    //if (window.ActiveXObject){
	  //returnValue = window.showModalDialog("/OSS/inc/messagebox/AlarmHandle.htm?message="+message_msg+"&button_type="+button_type,errorMessage,
	//	"dialogHeight: 210px; dialogWidth: 300px; center: Yes; help: no; resizable: yes; status: no;scroll:no;");
    //}else{
	//	returnValue=window.open("/OSS/inc/messagebox/AlarmHandle.htm?message="+message_msg+"&button_type="+button_type,"",'modal=yes,width=300,height=200,resizable=no,scrollbars=no');
	
    //}
    
    if(errorMessage.button_type==2 && returnValue != null){
		return returnValue;
	}
}


function getRadioValue(objName){
	var arr=document.getElementsByName(objName);
	for (var i=0; i<arr.length; i++) {
		if(arr[i].checked==true)return arr[i].value;
	}
}

function setRadio(objName,val){
	var arr=document.getElementsByName(objName);
	for (var i=0; i<arr.length; i++) {
		if(arr[i].value==val){
			arr[i].checked=true;
			return;
		}
	}
}
function isIE(){ //ie? 
    if (window.navigator.userAgent.toLowerCase().indexOf("msie")>=1) 
        return true; 
    else 
        return false; 
} 

if(!isIE()){ //firefox innerText define
    HTMLElement.prototype.__defineGetter__(    "innerText", 
        function(){ 
            return this.textContent.replace(/(^\s*)|(\s*$)/g, "");
        } 
    ); 
    HTMLElement.prototype.__defineSetter__(    "innerText", 
        function(sText){ 
            this.textContent=sText; 
        } 
    ); 
 
    
   
}
function initButtonCss(btnName,hrefLink,targetP){
var btnStr='<span><div class="btnBox">'
          +'<div class="left"></div>'
          +'<div class="btnWrap" align="center">'
          +'<a href="'+hrefLink+'" ';
    if(targetP && targetP!=null ){
       btnStr+=' target="'+targetP+'"';   	
       }
     btnStr+=' >'+btnName+'</a>'
          +'</div>'
          +'</div>'
          +'</div><span>';
   document.write(btnStr);       
}

