/*
string.js - Copyright (C) 2012-2013, JP Richardson <jprichardson@gmail.com>
*/!function(){"use strict";function n(e,t){t!==null&&t!==undefined?typeof t=="string"?e.s=t:e.s=t.toString():e.s=t,e.orig=t,t!==null&&t!==undefined?e.__defineGetter__?e.__defineGetter__("length",function(){return e.s.length}):e.length=t.length:e.length=-1}function r(e){n(this,e)}function u(){for(var e in s)(function(e){var t=s[e];i.hasOwnProperty(e)||(o.push(e),i[e]=function(){return String.prototype.s=this,t.apply(this,arguments)})})(e)}function a(){for(var e=0;e<o.length;++e)delete String.prototype[o[e]];o.length=0}function c(){var e=h(),t={};for(var n=0;n<e.length;++n){var r=e[n],s=i[r];try{var o=typeof s.apply("teststring",[]);t[r]=o}catch(u){}}return t}function h(){var e=[];if(Object.getOwnPropertyNames)return e=Object.getOwnPropertyNames(i),e.splice(e.indexOf("valueOf"),1),e.splice(e.indexOf("toString"),1),e;var t={},n=[];for(var r in String.prototype)t[r]=r;for(var r in Object.prototype)delete t[r];for(var r in t)e.push(r);return e}function p(e){return new r(e)}function d(e,t){var n=[],r;for(r=0;r<e.length;r++)n.push(e[r]),t&&t.call(e,e[r],r);return n}var e="1.7.0",t={},i=String.prototype,s=r.prototype={between:function(e,t){var n=this.s,r=n.indexOf(e),i=n.indexOf(t),s=r+e.length;return new this.constructor(i>r?n.slice(s,i):"")},camelize:function(){var e=this.trim().s.replace(/(\-|_|\s)+(.)?/g,function(e,t,n){return n?n.toUpperCase():""});return new this.constructor(e)},capitalize:function(){return new this.constructor(this.s.substr(0,1).toUpperCase()+this.s.substring(1).toLowerCase())},charAt:function(e){return this.s.charAt(e)},chompLeft:function(e){var t=this.s;return t.indexOf(e)===0?(t=t.slice(e.length),new this.constructor(t)):this},chompRight:function(e){if(this.endsWith(e)){var t=this.s;return t=t.slice(0,t.length-e.length),new this.constructor(t)}return this},collapseWhitespace:function(){var e=this.s.replace(/[\s\xa0]+/g," ").replace(/^\s+|\s+$/g,"");return new this.constructor(e)},contains:function(e){return this.s.indexOf(e)>=0},count:function(e){var t=0,n=this.s.indexOf(e);while(n>=0)t+=1,n=this.s.indexOf(e,n+1);return t},dasherize:function(){var e=this.trim().s.replace(/[_\s]+/g,"-").replace(/([A-Z])/g,"-$1").replace(/-+/g,"-").toLowerCase();return new this.constructor(e)},decodeHtmlEntities:function(){var e=this.s;return e=e.replace(/&#(\d+);?/g,function(e,t){return String.fromCharCode(t)}).replace(/&#[xX]([A-Fa-f0-9]+);?/g,function(e,t){return String.fromCharCode(parseInt(t,16))}).replace(/&([^;\W]+;?)/g,function(e,n){var r=n.replace(/;$/,""),i=t[n]||n.match(/;$/)&&t[r];return typeof i=="number"?String.fromCharCode(i):typeof i=="string"?i:e}),new this.constructor(e)},endsWith:function(e){var t=this.s.length-e.length;return t>=0&&this.s.indexOf(e,t)===t},escapeHTML:function(){return new this.constructor(this.s.replace(/[&<>"']/g,function(e){return"&"+m[e]+";"}))},ensureLeft:function(e){var t=this.s;return t.indexOf(e)===0?this:new this.constructor(e+t)},ensureRight:function(e){var t=this.s;return this.endsWith(e)?this:new this.constructor(t+e)},humanize:function(){if(this.s===null||this.s===undefined)return new this.constructor("");var e=this.underscore().replace(/_id$/,"").replace(/_/g," ").trim().capitalize();return new this.constructor(e)},isAlpha:function(){return!/[^a-z\xC0-\xFF]/.test(this.s.toLowerCase())},isAlphaNumeric:function(){return!/[^0-9a-z\xC0-\xFF]/.test(this.s.toLowerCase())},isEmpty:function(){return this.s===null||this.s===undefined?!0:/^[\s\xa0]*$/.test(this.s)},isLower:function(){return this.isAlpha()&&this.s.toLowerCase()===this.s},isNumeric:function(){return!/[^0-9]/.test(this.s)},isUpper:function(){return this.isAlpha()&&this.s.toUpperCase()===this.s},left:function(e){if(e>=0){var t=this.s.substr(0,e);return new this.constructor(t)}return this.right(-e)},lines:function(){return this.replaceAll("\r\n","\n").s.split("\n")},pad:function(e,t){t==null&&(t=" ");if(this.s.length>=e)return new this.constructor(this.s);e-=this.s.length;var n=Array(Math.ceil(e/2)+1).join(t),r=Array(Math.floor(e/2)+1).join(t);return new this.constructor(n+this.s+r)},padLeft:function(e,t){return t==null&&(t=" "),this.s.length>=e?new this.constructor(this.s):new this.constructor(Array(e-this.s.length+1).join(t)+this.s)},padRight:function(e,t){return t==null&&(t=" "),this.s.length>=e?new this.constructor(this.s):new this.constructor(this.s+Array(e-this.s.length+1).join(t))},parseCSV:function(e,t,n,r){e=e||",",n=n||"\\",typeof t=="undefined"&&(t='"');var i=0,s=[],o=[],u=this.s.length,a=!1,f=this,l=function(e){return f.s.charAt(e)};if(typeof r!="undefined")var c=[];t||(a=!0);while(i<u){var h=l(i);switch(h){case n:if(a&&(n!==t||l(i+1)===t)){i+=1,s.push(l(i));break}if(n!==t)break;case t:a=!a;break;case e:a&&t?s.push(h):(o.push(s.join("")),s.length=0);break;case r:a?s.push(h):c&&(o.push(s.join("")),c.push(o),o=[],s.length=0);break;default:a&&s.push(h)}i+=1}return o.push(s.join("")),c?(c.push(o),c):o},replaceAll:function(e,t){var n=this.s.split(e).join(t);return new this.constructor(n)},right:function(e){if(e>=0){var t=this.s.substr(this.s.length-e,e);return new this.constructor(t)}return this.left(-e)},setValue:function(e){return n(this,e),this},slugify:function(){var e=(new r(this.s.replace(/[^\w\s-]/g,"").toLowerCase())).dasherize().s;return e.charAt(0)==="-"&&(e=e.substr(1)),new this.constructor(e)},startsWith:function(e){return this.s.lastIndexOf(e,0)===0},stripPunctuation:function(){return new this.constructor(this.s.replace(/[^\w\s]|_/g,"").replace(/\s+/g," "))},stripTags:function(){var e=this.s,t=arguments.length>0?arguments:[""];return d(t,function(t){e=e.replace(RegExp("</?"+t+"[^<>]*>","gi"),"")}),new this.constructor(e)},template:function(e,t,n){var r=this.s,t=t||p.TMPL_OPEN,n=n||p.TMPL_CLOSE,i=t.replace(/[-[\]()*\s]/g,"\\$&").replace(/\$/g,"\\$"),s=n.replace(/[-[\]()*\s]/g,"\\$&").replace(/\$/g,"\\$"),o=new RegExp(i+"(.+?)"+s,"g"),u=r.match(o)||[];return u.forEach(function(i){var s=i.substring(t.length,i.length-n.length);typeof e[s]!="undefined"&&(r=r.replace(i,e[s]))}),new this.constructor(r)},times:function(e){return new this.constructor((new Array(e+1)).join(this.s))},toBoolean:function(){if(typeof this.orig=="string"){var e=this.s.toLowerCase();return e==="true"||e==="yes"||e==="on"}return this.orig===!0||this.orig===1},toFloat:function(e){var t=parseFloat(this.s);return e?parseFloat(t.toFixed(e)):t},toInt:function(){return/^\s*-?0x/i.test(this.s)?parseInt(this.s,16):parseInt(this.s,10)},trim:function(){var e;return typeof i.trim=="undefined"?e=this.s.replace(/(^\s*|\s*$)/g,""):e=this.s.trim(),new this.constructor(e)},trimLeft:function(){var e;return i.trimLeft?e=this.s.trimLeft():e=this.s.replace(/(^\s*)/g,""),new this.constructor(e)},trimRight:function(){var e;return i.trimRight?e=this.s.trimRight():e=this.s.replace(/\s+$/,""),new this.constructor(e)},truncate:function(e,t){var n=this.s;e=~~e,t=t||"...";if(n.length<=e)return new this.constructor(n);var i=function(e){return e.toUpperCase()!==e.toLowerCase()?"A":" "},s=n.slice(0,e+1).replace(/.(?=\W*\w*$)/g,i);return s.slice(s.length-2).match(/\w\w/)?s=s.replace(/\s*\S+$/,""):s=(new r(s.slice(0,s.length-1))).trimRight().s,(s+t).length>n.length?new r(n):new r(n.slice(0,s.length)+t)},toCSV:function(){function u(e){return e!==null&&e!==""}var e=",",t='"',n="\\",i=!0,s=!1,o=[];typeof arguments[0]=="object"?(e=arguments[0].delimiter||e,e=arguments[0].separator||e,t=arguments[0].qualifier||t,i=!!arguments[0].encloseNumbers,n=arguments[0].escape||n,s=!!arguments[0].keys):typeof arguments[0]=="string"&&(e=arguments[0]),typeof arguments[1]=="string"&&(t=arguments[1]),arguments[1]===null&&(t=null);if(this.orig instanceof Array)o=this.orig;else for(var a in this.orig)this.orig.hasOwnProperty(a)&&(s?o.push(a):o.push(this.orig[a]));var f=n+t,l=[];for(var c=0;c<o.length;++c){var h=u(t);typeof o[c]=="number"&&(h&=i),h&&l.push(t);if(o[c]!==null&&o[c]!==undefined){var p=(new r(o[c])).replaceAll(t,f).s;l.push(p)}else l.push("");h&&l.push(t),e&&l.push(e)}return l.length=l.length-1,new this.constructor(l.join(""))},toString:function(){return this.s},underscore:function(){var e=this.trim().s.replace(/([a-z\d])([A-Z]+)/g,"$1_$2").replace(/[-\s]+/g,"_").toLowerCase();return(new r(this.s.charAt(0))).isUpper()&&(e="_"+e),new this.constructor(e)},unescapeHTML:function(){return new this.constructor(this.s.replace(/\&([^;]+);/g,function(e,t){var n;return t in v?v[t]:(n=t.match(/^#x([\da-fA-F]+)$/))?String.fromCharCode(parseInt(n[1],16)):(n=t.match(/^#(\d+)$/))?String.fromCharCode(~~n[1]):e}))},valueOf:function(){return this.s.valueOf()}},o=[],f=c();for(var l in f)(function(e){var t=i[e];typeof t=="function"&&(s[e]||(f[e]==="string"?s[e]=function(){return new this.constructor(t.apply(this,arguments))}:s[e]=t))})(l);s.repeat=s.times,s.include=s.contains,s.toInteger=s.toInt,s.toBool=s.toBoolean,s.decodeHTMLEntities=s.decodeHtmlEntities,s.constructor=r,p.extendPrototype=u,p.restorePrototype=a,p.VERSION=e,p.TMPL_OPEN="{{",p.TMPL_CLOSE="}}",p.ENTITIES=t,typeof module!="undefined"&&typeof module.exports!="undefined"?module.exports=p:typeof define=="function"&&define.amd?define([],function(){return p}):window.S=p;var v={lt:"<",gt:">",quot:'"',apos:"'",amp:"&"},m={};for(var g in v)m[v[g]]=g;t={amp:"&",gt:">",lt:"<",quot:'"',apos:"'",AElig:198,Aacute:193,Acirc:194,Agrave:192,Aring:197,Atilde:195,Auml:196,Ccedil:199,ETH:208,Eacute:201,Ecirc:202,Egrave:200,Euml:203,Iacute:205,Icirc:206,Igrave:204,Iuml:207,Ntilde:209,Oacute:211,Ocirc:212,Ograve:210,Oslash:216,Otilde:213,Ouml:214,THORN:222,Uacute:218,Ucirc:219,Ugrave:217,Uuml:220,Yacute:221,aacute:225,acirc:226,aelig:230,agrave:224,aring:229,atilde:227,auml:228,ccedil:231,eacute:233,ecirc:234,egrave:232,eth:240,euml:235,iacute:237,icirc:238,igrave:236,iuml:239,ntilde:241,oacute:243,ocirc:244,ograve:242,oslash:248,otilde:245,ouml:246,szlig:223,thorn:254,uacute:250,ucirc:251,ugrave:249,uuml:252,yacute:253,yuml:255,copy:169,reg:174,nbsp:160,iexcl:161,cent:162,pound:163,curren:164,yen:165,brvbar:166,sect:167,uml:168,ordf:170,laquo:171,not:172,shy:173,macr:175,deg:176,plusmn:177,sup1:185,sup2:178,sup3:179,acute:180,micro:181,para:182,middot:183,cedil:184,ordm:186,raquo:187,frac14:188,frac12:189,frac34:190,iquest:191,times:215,divide:247,"OElig;":338,"oelig;":339,"Scaron;":352,"scaron;":353,"Yuml;":376,"fnof;":402,"circ;":710,"tilde;":732,"Alpha;":913,"Beta;":914,"Gamma;":915,"Delta;":916,"Epsilon;":917,"Zeta;":918,"Eta;":919,"Theta;":920,"Iota;":921,"Kappa;":922,"Lambda;":923,"Mu;":924,"Nu;":925,"Xi;":926,"Omicron;":927,"Pi;":928,"Rho;":929,"Sigma;":931,"Tau;":932,"Upsilon;":933,"Phi;":934,"Chi;":935,"Psi;":936,"Omega;":937,"alpha;":945,"beta;":946,"gamma;":947,"delta;":948,"epsilon;":949,"zeta;":950,"eta;":951,"theta;":952,"iota;":953,"kappa;":954,"lambda;":955,"mu;":956,"nu;":957,"xi;":958,"omicron;":959,"pi;":960,"rho;":961,"sigmaf;":962,"sigma;":963,"tau;":964,"upsilon;":965,"phi;":966,"chi;":967,"psi;":968,"omega;":969,"thetasym;":977,"upsih;":978,"piv;":982,"ensp;":8194,"emsp;":8195,"thinsp;":8201,"zwnj;":8204,"zwj;":8205,"lrm;":8206,"rlm;":8207,"ndash;":8211,"mdash;":8212,"lsquo;":8216,"rsquo;":8217,"sbquo;":8218,"ldquo;":8220,"rdquo;":8221,"bdquo;":8222,"dagger;":8224,"Dagger;":8225,"bull;":8226,"hellip;":8230,"permil;":8240,"prime;":8242,"Prime;":8243,"lsaquo;":8249,"rsaquo;":8250,"oline;":8254,"frasl;":8260,"euro;":8364,"image;":8465,"weierp;":8472,"real;":8476,"trade;":8482,"alefsym;":8501,"larr;":8592,"uarr;":8593,"rarr;":8594,"darr;":8595,"harr;":8596,"crarr;":8629,"lArr;":8656,"uArr;":8657,"rArr;":8658,"dArr;":8659,"hArr;":8660,"forall;":8704,"part;":8706,"exist;":8707,"empty;":8709,"nabla;":8711,"isin;":8712,"notin;":8713,"ni;":8715,"prod;":8719,"sum;":8721,"minus;":8722,"lowast;":8727,"radic;":8730,"prop;":8733,"infin;":8734,"ang;":8736,"and;":8743,"or;":8744,"cap;":8745,"cup;":8746,"int;":8747,"there4;":8756,"sim;":8764,"cong;":8773,"asymp;":8776,"ne;":8800,"equiv;":8801,"le;":8804,"ge;":8805,"sub;":8834,"sup;":8835,"nsub;":8836,"sube;":8838,"supe;":8839,"oplus;":8853,"otimes;":8855,"perp;":8869,"sdot;":8901,"lceil;":8968,"rceil;":8969,"lfloor;":8970,"rfloor;":8971,"lang;":9001,"rang;":9002,"loz;":9674,"spades;":9824,"clubs;":9827,"hearts;":9829,"diams;":9830}}.call(this);
//
window.alert=dhtmlx.alert;
function isIE(){ //ie? 
    if (window.navigator.userAgent.toLowerCase().indexOf("msie")>=1) 
        return true; 
    else 
        return false; 
} 
/*
 * serviceCall.js
 */
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
	  	var rt = JSON.parse(rtStr);
	  	if(rt.success==true){
	  		return rt.content;
	  	}else{
	  		alert("内部异常："+rt.msg);
	  	}
	  	
	  }else{
	  	alert("通讯异常：xmlhttp.status ："+xmlhttp.status);	 
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
/*
 * db.js
 */
var db=new Object();
db.queryForList=function(sql){
	var serviceCall = new ServiceCall();
	var obj=new Object();
	obj.sql=sql;
	serviceCall.init("queryDataSvc");
	var rt= serviceCall.execute(obj);
	return rt.list;
};
db.queryForPageList=function(sql){
	var serviceCall = new ServiceCall();
	var obj=new Object();
	obj.sql=sql;
	obj.paging="true";
	serviceCall.init("queryDataSvc");
	var rt= serviceCall.execute(obj);
	return rt;
};
/*
 * common.js
 */
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
/*
 * dhtmlxUtils.js
 */
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


/*grid*/
/**
 * define.sql 列表的sql语句
 * define.columns[]{title,width,type,dataSql,data}
 * define.pageSize
 * 
 * @param id
 * @param define
 */
function createGridObject(id,define){
	var grid = new dhtmlXGridObject(id);
	grid.setSkin("dhx_skyblue");
	grid.setImagePath(parent.contextPath+"/js/dhtmlx/imgs/");
	//初始化工具栏和分页栏
	$("#"+id).before("<div id='toolbarObj'></div>");
	$("#"+id).after("<div id='pageToolbarObj'></div>");
	grid.pageToolBar=new dhtmlXToolbarObject("pageToolbarObj");
	grid.toolBar=new dhtmlXToolbarObject("toolbarObj");
	grid.pageToolBar=new dhtmlXToolbarObject("pageToolbarObj");
	//列表的默认查询语句和列表主键
	grid.sql=define.sql;
	grid.key=define.key;
	grid.loadcallback=define.callback;
	//默认的查询方法
	grid.doQuery=function(sql){
		if(sql){
		grid.sql=sql;
		}
		if(grid.page==null){
			grid.page=new Page(15);
		}
		var data
		if(grid.loadcallback){
			data=grid.loadcallback(grid);
		}else{
		data=db.queryForPageList(grid.sql+grid.page.getPageSql());
		}
		grid.data=data;
		grid.clearAll();
		grid.parse(toGridData(data.list,grid.key),"json");
		grid.page.setTotalCount(data.totalCount);
		pagetoolbar.setItemText("pageinfo","第"+(grid.page.currentPage+1)+"页,共"+(grid.page.page+1)+"页,合计"+grid.page.totalCount+"条记录");
	}
	initGrid(grid,define);
	initPageToolBar(grid);
	grid.doQuery();
	return grid;
}
function initPageToolBar(grid){
	pagetoolbar =grid.pageToolBar; 
	pagetoolbar.grid=grid;
	pagetoolbar.setIconsPath(parent.contextPath+"/images/performance/icon/");
	pagetoolbar.addButton('firstPage',0,"第一页","first(1).ico",null);
	pagetoolbar.addButton('previousPage',1,"上一页","previous(1).ico",null);
	
	pagetoolbar.addButton('nextPage',3,"下一页","next(1).ico",null);
	pagetoolbar.addButton('lastPage',4,"最后页","last(1).ico",null);
	pagetoolbar.addSeparator("pageinfo", 5, "");
	pagetoolbar.addText("pageinfo", 6, "");

	pagetoolbar.setAlign('right');
	pagetoolbar.attachEvent("onClick", function(id) {
		var page=pagetoolbar.grid.page;
        if(id=="firstPage"){
        	page.setCurrentPage(0);
        	this.grid.doQuery();
        }else if(id=="previousPage"){
        	if(page.currentPage<=0){
        		return;
        	}
        	page.setCurrentPage(page.currentPage-1);
        	this.grid.doQuery();
        
        }else if(id=="nextPage"){
        	if(page.currentPage>=page.page){
        		return;
        	}
        	page.setCurrentPage(page.currentPage+1);
        	this.grid.doQuery();
        }else if(id=="lastPage"){
        	page.setCurrentPage(page.page);
        	this.grid.doQuery();
        }

    });
}
function initGrid(grid,define){
	var headerlist=new Array();
	var headeralignlist=new Array();
	var initWidthlist=new Array();
	var colTypelist=new Array();
	var colAlignlist=new Array();
	var colVAlignlist=new Array();
	var colSorting=new Array();
	for(var i=0;i<define.columns.length;i++){
		headerlist.push(define.columns[i].title);
		headeralignlist.push("text-align:center");
		initWidthlist.push(define.columns[i].width);
		colTypelist.push(define.columns[i].type);
		if(define.columns[i].align){
		colAlignlist.push(define.columns[i].align);
		}else{
			colAlignlist.push("center");
		}

		colVAlignlist.push("middle");
		colSorting.push("str");
		if("co"==define.columns[i].type){
			if(define.columns[i].data){
				addGridComboOptions(grid.getCombo(i),define.columns[i].data);
			}
			else if(define.columns[i].dataSql){
				var list=db.queryForList(define.columns[i].dataSql);
				addGridComboOptions(grid.getCombo(i),list);
			}else if(define.columns[i].dict){
				for(var j=0;j<define.columns[i].dict.length;j++){
				var sql="select dict_id as 'key',dict_text as 'value' from "+define.columns[i].dict[j];
				var list=db.queryForList(sql);
				addGridComboOptions(grid.getCombo(i),list);
				}
			}
			
			
		}
	}
	grid.setColAlign(colAlignlist.join(","));
	grid.setColVAlign(colVAlignlist.join(","));
	grid.setHeader(headerlist.join(","),null,headeralignlist);
	grid.setInitWidths(initWidthlist.join(","));
	grid.setColTypes(colTypelist.join(","));
	grid.setColSorting(colSorting.join(","));
	grid.enableDragAndDrop(true);
	grid.enableDragOrder(true);
	grid.dontSetSizes=true;
	//grid.setEditable(false);
	//grid.enableAutoWidth(true,920,920);

	grid.init();
	return grid;
}
function addGridComboOptions(combo,datas){
	for(var i=0;i<datas.length;i++){
		combo.put(datas[i].key,datas[i].value);
	}
}
function Page(pageSize){
	var obj=new Object();
	obj.currentPage=0;
	obj.pageSize=pageSize;
	obj.page=0;
	//obj.totalCount=totalCount;
	obj.recount=function(){
		this.page=Math.floor(this.totalCount/this.pageSize);
		this.totalCount%this.pageSize>0?this.page+1:this.page+0;

	}
	obj.getPageSql=function(){
		return " limit "+this.currentPage*this.pageSize+","+this.pageSize;
	}
	obj.setTotalCount=function(totalCount){
		this.totalCount=totalCount;
		this.recount();
	}
	obj.setCurrentPage=function(currentPage){
		this.currentPage=currentPage;
	}
	
	return obj;
	
}
/*
 * 
 * form.js
 */
function copyObjectToForm(object,updateFormData,updateDhxForm){
	for(var i=1;i<updateFormData.length;i++){
		if("input,password,calendar,hidden".indexOf(updateFormData[i].type)!=-1)
		{
			var name=updateFormData[i].name;
			var dbName=S(name).underscore().s;
			updateDhxForm.setItemValue(name,object[dbName]);
		}
		if("combo".indexOf(updateFormData[i].type)!=-1)
		{
			var name=updateFormData[i].name;
			var dbName=S(name).underscore().s;
			updateDhxForm.getCombo(name).setComboValue(object[dbName]);
		}
	}
}
function copyFormToCondition(form){
	var list=form.getFormData();
	var returnSql="";
	for(var key in list)
	{
		if(list[key]!=""){
			var dbName=S(key).underscore().s;
			returnSql+=" and "+dbName+"='"+list[key]+"'";
		}
	}
	console.log(returnSql);
	return returnSql;
}
/*
 * import.js
 */
function createFileImport(url){
	var dhxWins= new dhtmlXWindows();
	var win =dhxWins.createWindow("importExcelForRecord",400,400,400,400);
	dhxWins.window("importExcelForRecord").setText("导入记录文件Excel");
	   formData = [{
	        type: "fieldset",
	        label: "Uploader",
	        list: [{
	            type: "upload",
	            name: "excel",
	            inputWidth: 330,
	            url: url,
	            mode :'html4'
	        }]
	        }, {
	        type: "button",
	        name: "send",
	        value: "Send"
	    }
	];

	var importExcelForRecordForm=dhxWins.window("importExcelForRecord").attachForm(formData);
	importExcelForRecordForm.attachEvent("onButtonClick", function(name) {
		 if(name=="send"){
//			 var myUploader = importExcelForRecordForm.getUploader("excel");
//			 myUploader.upload();
			 importExcelForRecordForm.send(url, function(loader, response) {
	                alert("<pre>" + response + "</pre>");
	            });

		 }
	 });

	
	
	
}
function createFileImport2(url){
	var dhxWins= new dhtmlXWindows();
	var win =dhxWins.createWindow("importExcelForRecord",400,400,400,400);
	dhxWins.window("importExcelForRecord").center();
	dhxWins.window("importExcelForRecord").setText("导入记录文件Excel");
	dhxWins.window("importExcelForRecord").attachURL("import.spr?action=showUploadFrom", false);
}	

