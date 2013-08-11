
function ServiceCall()
{  
    
    var pathName =document.location.pathname;
    var root = pathName.split("/")[1];
    
	this.war="/"+root+"/JSONServiceCall";
	this.servicePath="/"+root+"/";
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
    	var href = this.servicePath+"inc/remoteCall/exception.htm";
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