function isIE(){ //ie? 
    if (window.navigator.userAgent.toLowerCase().indexOf("msie")>=1) 
        return true; 
    else 
        return false; 
} 
window.isIE = isIE(); 
//window.isIE = window.Event?false:true; 
function ServiceCall(async,callBackFunction)
{
	  
    var pathName =document.location.pathname;
    var root = pathName.split("/")[1];
	this.war="/"+root+"/JSONServiceCall";
	if(typeof(async)=="undefined"||async==null||async==false){
	this.async=false;
	}else if(async!=null && async==true){
	 this.async=true;
	}else{
	this.async=false;
	}
	var xmlhttp;
	this.callBackFunction=callBackFunction;
	this.serviceName = ""; 
	this.methodName  = "";
	this.showAlertType ="0";//0:输入及输出均不显示;
							//1:输入显示,输出不显示;
							//2:输入不显示,输出显示;
							//3:输入及输出均显示;	
	this.xmlHttpVersion="-1";	
	this.setCallServlet = function(callServletName)
	{
	   this.war=callServletName;
	} 					
	this.init = function(serviceName,methodName)
	{
		this.serviceName = serviceName;
		if(methodName!=null && methodName!="")
		{
			this.methodName  = methodName;
		}	
	}

    this.isIE=true;
	this.createXMLHttp = function()
	{
		if(window.XMLHttpRequest)
		{
			this.xmlHttpVersion = "XMLHttpRequest";
			this.isIE=false;
			return new XMLHttpRequest();
		}else if(typeof ActiveXObject != "undefined")
		{   
			var aVersions =["MSXML2.XMLHttp.5.0","MSXML2.XMLHttp.4.0",
			"MSXML2.XMLHttp.3.0","MSXML2.XMLHttp","Microsoft.XMLHTTP"];
			for(var i=0;i<aVersions.length;i++)
			{
				try{
					var _xmlhttp = new ActiveXObject(aVersions[i]);
					this.xmlHttpVersion=aVersions[i];
					return _xmlhttp;
				}catch(e) 
				{
					//
				} 
			}
		}
		return null;
	}
	
	this._callBackFunction=function(){
    if(xmlhttp.readyState==4)
    {   
    	  var rtStr = xmlhttp.responseText;
    	  //alert("rst="+rtStr);
	  		var rt = JSON.parse(rtStr);
	  		 //alert("rt.value="+rt.value);
	  		var rtV = null;
	  		if(rt.value)
	  		{
	  			rtV = rt.value;
	  		}else if(rt.exception)
	  		{
	  			var eO = new Object();
				eO.code="";
				eO.level="";
				eO.e=rt.exception;
				this.showWarnWindow(eO.level+"\n"+eO.code+"\n"+eO.e);
				throw eO;
	  		}
      eval(callBackFunction(rtV));	  		
      }    	
	}
	this.execute = function ()
	{ 
		
	  xmlhttp = this.createXMLHttp();
	  if(xmlhttp==null)
	  {
	  	 alert("XMLHttp could not be created");
	  	 return null;
	  }
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
      try{
      if(window.isIE){
          xmlhttp.open("post",this.war,this.async);
      }else{
      	 xmlhttp.open("get",this.war+"?getParam="+jsonStr,this.async);
     }
      
      xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
      xmlhttp.setRequestHeader("Content-length", jsonStr.length);
	  xmlhttp.setRequestHeader("Connection", "close");
      if(this.async==true){
        xmlhttp.onreadystatechange=this._callBackFunction;
       }
      if(window.isIE){
	   xmlhttp.send(jsonStr);
      }else{
      	xmlhttp.send("");
      }
      }catch(exception){
      	alert(exception);
      }
      if(this.async==true)return;
	  if (xmlhttp.status==200)
	  {
		var rtStr = xmlhttp.responseText;
		//alert("xmlhttp.responseText="+xmlhttp.responseText);
    	if(this.showAlertType==2||this.showAlertType==3)
    	{
      		alert(rtStr);  
      	}
      	if(rtStr!=null && rtStr!="")
      	{
	  		var rt = JSON.parse(rtStr);
	  		//alert("rt.value="+rt.value);
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
      		//alert("rtStr is null" );
      		return null;
      	}	
	  }else{
	  	//alert("error");
		;	 
	  } 
	  } 
	  this.showWarnWindow = function (exceptionStr)
	  {
     	if(this.showAlertType>=1)
     	{
        	alert(exceptionStr);
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

var JSON = {
    org: 'http://www.JSON.org',
    copyright: '(c)2005 JSON.org',
    license: 'http://www.crockford.com/JSON/license.html',
    stringify: function (arg) {
        var c, i, l, s = '', v;

        switch (typeof arg) {
        case 'object':
            if (arg) {
                if (arg.constructor == Array) {
                    for (i = 0; i < arg.length; ++i) {
                        v = this.stringify(arg[i]);
                        if (s) {
                            s += ',';
                        }
                        s += v;
                    }
                    return '[' + s + ']';
                } else if (typeof arg.toString != 'undefined') {
                    for (i in arg) {
                        v = arg[i];
                        if (typeof v != 'undefined' && typeof v != 'function') {
                            v = this.stringify(v);
                            if (s) {
                                s += ',';
                            }
                            s += this.stringify(i) + ':' + v;
                        }
                    }
                    return '{' + s + '}';
                }
            }
            return 'null';
        case 'number':
            return isFinite(arg) ? String(arg) : 'null';
        case 'string':
            l = arg.length;
            s = '"';
            for (i = 0; i < l; i += 1) {
                c = arg.charAt(i);
                if (c >= ' ') {
                    if (c == '\\' || c == '"') {
                        s += '\\';
                    }
                    s += c;
                } else {
                    switch (c) {
                        case '\b':
                            s += '\\b';
                            break;
                        case '\f':
                            s += '\\f';
                            break;
                        case '\n':
                            s += '\\n';
                            break;
                        case '\r':
                            s += '\\r';
                            break;
                        case '\t':
                            s += '\\t';
                            break;
                        default:
                            c = c.charCodeAt();
                            s += '\\u00' + Math.floor(c / 16).toString(16) +
                                (c % 16).toString(16);
                    }
                }
            }
            return s + '"';
        case 'boolean':
            return String(arg);
        default:
            return 'null';
        }
    },
    parse: function (text) {
        var at = 0;
        var ch = ' ';

        function error(m) {
            throw {
                name: 'JSONError',
                message: m,
                at: at - 1,
                text: text
            };
        }

        function next() {
            ch = text.charAt(at);
            at += 1;
            return ch;
        }

        function white() {
            while (ch) {
                if (ch <= ' ') {
                    next();
                } else if (ch == '/') {
                    switch (next()) {
                        case '/':
                            while (next() && ch != '\n' && ch != '\r') {}
                            break;
                        case '*':
                            next();
                            for (;;) {
                                if (ch) {
                                    if (ch == '*') {
                                        if (next() == '/') {
                                            next();
                                            break;
                                        }
                                    } else {
                                        next();
                                    }
                                } else {
                                    error("Unterminated comment");
                                }
                            }
                            break;
                        default:
                            error("Syntax error");
                    }
                } else {
                    break;
                }
            }
        }

        function string() {
            var i, s = '', t, u;

            if (ch == '"') {
outer:          while (next()) {
                    if (ch == '"') {
                        next();
                        return s;
                    } else if (ch == '\\') {
                        switch (next()) {
                        case 'b':
                            s += '\b';
                            break;
                        case 'f':
                            s += '\f';
                            break;
                        case 'n':
                            s += '\n';
                            break;
                        case 'r':
                            s += '\r';
                            break;
                        case 't':
                            s += '\t';
                            break;
                        case 'u':
                            u = 0;
                            for (i = 0; i < 4; i += 1) {
                                t = parseInt(next(), 16);
                                if (!isFinite(t)) {
                                    break outer;
                                }
                                u = u * 16 + t;
                            }
                            s += String.fromCharCode(u);
                            break;
                        default:
                            s += ch;
                        }
                    } else {
                        s += ch;
                    }
                }
            }
            error("Bad string");
        }

        function array() {
            var a = [];

            if (ch == '[') {
                next();
                white();
                if (ch == ']') {
                    next();
                    return a;
                }
                while (ch) {
                    a.push(value());
                    white();
                    if (ch == ']') {
                        next();
                        return a;
                    } else if (ch != ',') {
                        break;
                    }
                    next();
                    white();
                }
            }
            error("Bad array");
        }

        function object() {
            var k, o = {};

            if (ch == '{') {
                next();
                white();
                if (ch == '}') {
                    next();
                    return o;
                }
                while (ch) {
                    k = string();
                    white();
                    if (ch != ':') {
                        break;
                    }
                    next();
                    o[k] = value();
                    white();
                    if (ch == '}') {
                        next();
                        return o;
                    } else if (ch != ',') {
                        break;
                    }
                    next();
                    white();
                }
            }
            error("Bad object");
        }

        function number() {
            var n = '', v;
            if (ch == '-') {
                n = '-';
                next();
            }
            while (ch >= '0' && ch <= '9') {
                n += ch;
                next();
            }
            if (ch == '.') {
                n += '.';
                while (next() && ch >= '0' && ch <= '9') {
                    n += ch;
                }
            }
            if (ch == 'e' || ch == 'E') {
                n += 'e';
                next();
                if (ch == '-' || ch == '+') {
                    n += ch;
                    next();
                }
                while (ch >= '0' && ch <= '9') {
                    n += ch;
                    next();
                }
            }
            v = +n;
            if (!isFinite(v)) {
                ////error("Bad number");
            } else {
                return v;
            }
        }

        function word() {
            switch (ch) {
                case 't':
                    if (next() == 'r' && next() == 'u' && next() == 'e') {
                        next();
                        return true;
                    }
                    break;
                case 'f':
                    if (next() == 'a' && next() == 'l' && next() == 's' &&
                            next() == 'e') {
                        next();
                        return false;
                    }
                    break;
                case 'n':
                    if (next() == 'u' && next() == 'l' && next() == 'l') {
                        next();
                        return null;
                    }
                    break;
            }
            error("Syntax error");
        }

        function value() {
            white();
            switch (ch) {
                case '{':
                    return object();
                case '[':
                    return array();
                case '"':
                    return string();
                case '-':
                    return number();
                default:
                    return ch >= '0' && ch <= '9' ? number() : word();
            }
        }

        return value();
    }
}; 
var db=new Object();
db.queryForList=function(sql){
	var serviceCall = new ServiceCall();
	var obj=new Object();
	obj.sql=sql;
	serviceCall.init("queryDataSvc");
	var rt= serviceCall.execute(obj);
	return rt.list;
};
function Page(pageSize,totalCount){
	var obj=new Object();
	obj.currentPage=0;
	obj.pageSize=pageSize;
	obj.page=0;
	obj.totalCount=totalCount;
	obj.recount=function(){
		this.page=Math.floor(this.totalCount/this.pageSize);
		this.totalCount%this.pageSize>0?this.page+1:this.page+0;

	}
	obj.getPageSql=function(){
		return "limit "+this.currentPage*this.pageSize+","+this.pageSize;
	}
	obj.setCurrentPage=function(currentPage){
		this.currentPage=currentPage;
	}
	obj.recount();
	return obj;
	
}
var getParam = function(name){
        var search = document.location.search;
        var pattern = new RegExp("[?&]"+name+"\=([^&]+)", "g");
        var matcher = pattern.exec(search);
        var items = null;
        if(null != matcher){
                try{
                        items = decodeURIComponent(decodeURIComponent(matcher[1]));
                }catch(e){
                        try{
                                items = decodeURIComponent(matcher[1]);
                        }catch(e){
                                items = matcher[1];
                        }
                }
        }
        return items;
};

var toGridData=function(list,key)
{
	var jsonlist=new Array();
	for(var i=0;i<list.length;i++)
	{
		var item=new Array();
		for(var obj in list[i])
		{
			item.push(list[i][obj]);
		}
		jsonlist.push({"id":list[i][key],data:item});
	}
	var data={"rows":jsonlist};
	return data;
}
var toComboData=function(list,valueStr,textStr){
	var jsonlist=new Array();
	for(var i=0;i<list.length;i++)
	{
		var item=new Array();
		
		jsonlist.push({"value":list[i][valueStr],"text":list[i][textStr]});
	}
	return jsonlist;
}
function include() {
	var head = document.getElementsByTagName('head');
	for ( var i = 0; i < arguments.length; i++) {
		var includeScript = document.createElement('script');
		includeScript.src = getContextPath()+arguments[i];
		includeScript.type = 'text/javascript';
		
		head[0].appendChild(includeScript);
		alert("ok");
		
	}

}
function getContextPath(){
	if(window.contextPath==undefined){
		var href=window.location.href;
		var beginIndex=0;
		var endIndex=0;
		for(var i=0;i<3;i++){
			beginIndex=href.indexOf("/",beginIndex)+1;
		}
		endIndex=href.indexOf("/",beginIndex);
		window.contextPath=href.substring(beginIndex-1, endIndex);
	}
	return window.contextPath; 
	
}
function isEmpty(str){
	return str==""||str==undefined||str==null;
}