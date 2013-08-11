
function ServiceCall()
{
	this.war="/shResWeb/JSONServiceCall";
	this.servicePath="/shResWeb/";
	this.serviceName = ""; 
	this.methodName  = "";
	this.showAlertType ="0";//0:输入及输出均不显示;
							//1:输入显示,输出不显示;
							//2:输入不显示,输出显示;
							//3:输入及输出均显示;	
	this.xmlHttpVersion="-1";						
	this.init = function(serviceName,methodName)
	{
		this.serviceName = serviceName;
		if(methodName!=null && methodName!="")
		{
			this.methodName  = methodName;
		}	
	}
	this.createXMLHttp = function()
	{
		if(typeof XMLHttpRequest!='undefined')
		{
			this.xmlHttpVersion = "XMLHttpRequest";
			return new XMLHttpRequest();
		}else if(window.ActiveXObject)
		{
			var aVersions =["MSXML2.XMLHttp.5.0","MSXML2.XMLHttp.4.0",
			"MSXML2.XMLHttp.3.0","MSXML2.XMLHttp","Microsoft.XMLHTTP"];
			for(var i=0;i<aVersions.length;i++)
			{
				try{
					var xmlhttp = new ActiveXObject(aVersions[i]);
					this.xmlHttpVersion=aVersions[i];
					return xmlhttp;
				}catch(e) 
				{
					//
				} 
			}
		}
		return null;
	}
	this.execute = function ()
	{ 
	  var xmlhttp = this.createXMLHttp();
	  if(xmlhttp==null)
	  {
	  	 alert("XMLHttp could not be created");
	  	 return null;
	  }
	  xmlhttp.open("POST",this.war,false);
	  if(this.serviceName=="" || this.serviceName ==null)
	  {
	  	alert("缺少服务名!");
	  	return;
	  }
	  var obj = new Object();
	  obj.serviceName=this.serviceName;
	  if(this.methodName!=null && this.methodName!="")
	  {
	  	obj.methodName=this.methodName;
	  }
	  if(arguments.length>0)
	  {
	  	obj.para=new Array();
	  }
	  for(var i=0;i<arguments.length;i++)
	  {
    	obj.para.push(arguments[i]);
	  }
  	  var jsonStr =  JSON.stringify(obj);
  	  if(this.showAlertType==1||this.showAlertType==3)
      {
      	alert(jsonStr); 
      }	
      xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	  xmlhttp.send(jsonStr);
	  if (xmlhttp.status==200)
	  {
		var rtStr = xmlhttp.responseText;
    	if(this.showAlertType==2||this.showAlertType==3)
    	{
      		alert(rtStr);  
      	}
      	if(rtStr!=null && rtStr!="")
      	{
	  		var rt = JSON.parse(rtStr);
	  		if(rt.value)
	  		{
	  			return rt.value;
	  		}else if(rt.exception)
	  		{
	  			var eO = new Object();
				eO.code="";
				eO.level="";
				eO.e=rt.exception;
				this.showWarnWindow(eO.level+"\n"+eO.code+"\n"+eO.e);
				throw eO;
	  		}else 
	  		{
	  			return null;
	  		}
      	}else
      	{
      		return null;
      	}	
	  }else{
	  /*
	  	 if(showAlertType>=1){
			 alert("report...\n\nxmlhttp.status:"+xmlhttp.status +"\n\n\nxmlhttp.responseText:"+xmlhttp.responseText);
			}else{
	  	 alert("此单据可能已被处理过,请刷新页面");
				
			}
			*/
		;	 
	  } 
	  } 
	  this.showWarnWindow = function (exceptionStr)
	  {
    	var param = "dialogHeight:700px; dialogWidth:900px; dialogTop: 50px; dialogLeft: 50px; edge: Raised; scroll:Yes;center: Yes; resizable: no; status: No;";
    	var href = this.servicePath+"inc/exception.htm";
     	if(this.showAlertType>=1)
     	{
        	window.showModalDialog(href,exceptionStr,param);
     	}else
     	{
     		alert("处理异常,请联系管理员");	
    	}
	  }
	  this.showAlert =  function (invalue)
	  {
 		if(!invalue||!parseInt(invalue))return;
 		this.showAlertType=parseInt(invalue);
	  }
	  



}