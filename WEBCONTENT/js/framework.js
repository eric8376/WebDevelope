/*
 * Copyright (c) 2012. All rights reserved.

 *
 *    Licensed under the Apache License, Version 2.0 (the "License");
 *    you may not use this file except in compliance with the License.
 *    You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 *    Unless required by applicable law or agreed to in writing, software
 *    distributed under the License is distributed on an "AS IS" BASIS,
 *    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *    See the License for the specific language governing permissions and
 *    limitations under the License.
 */

/**根据指定的参数返回完整可用的 URL 路径。
 *@param urlPath 指定的 URL 路径，可以是不完整的路径。
 *p_pathPart 参数中，支持“~”符号表示当前站点的根路径。其他规则类似于文件系统，同样支持“../”、“/”等特殊含义的符号。
 *     // 假设当前页面路径:              /test/subpages/default.htm
 *     //     当前站点路径:              /test/
 *
 *     $url("index.htm")                // 返回“/test/subpages/index.htm”。
 *     $url("scripts/common.js")        // 返回“/test/subpages/scripts/common.js”。
 *
 *     $url("/test/images/home.gif")    // 返回“/test/images/home.gif”。
 *     $url("../images/home.gif")       // 返回“/test/images/home.gif”。
 *     $url("~/images/home.gif")        // 返回“/test/images/home.gif”。
 *
 *     $url("http://www.sina.com")      // 返回“http://www.sina.com”。
 *     $url("www.sina.com")             // 由于没有“http://”标记，则将参数作为 URL 的
 *                                       // 一部分，返回“/test/subpages/www.sina.com”。
 * </example>
 * </special-member> */
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
//function include() {
//	var head = document.getElementsByTagName('head');
//	for ( var i = 0; i < arguments.length; i++) {
//		var includeScript = document.createElement('script');
//		includeScript.src = getContextPath()+arguments[i];
//		includeScript.type = 'text/javascript';
//		
//		head[0].appendChild(includeScript);
//		
//		
//	}
//
//}
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

function $url(urlPath)
{
    var tempUrlPath = urlPath.trim();
    //var libRoot = (BaskApp.jsLibRoot).substring((BaskApp.jsLibRoot).lastIndexOf('/'));
    if (tempUrlPath.toLowerCase().match("^[a-z][a-z0-9]*://") || tempUrlPath.startWith("/"))
    {
        return urlPath;
    }
    var currentPath = location.pathname;
    var i = currentPath.lastIndexOf("/", currentPath.length - 1);
    if (i >= 0)
    {
        currentPath = currentPath.substring(0, i);
    }
    try
    {
        if (tempUrlPath.startWith("~"))
        {
            var urlPath = getContextPath() + tempUrlPath.substring(1);
            //alert(urlPath);
            //var replaceUrlPath = urlPath.replace('/js',libRoot);
            //alert(replaceUrlPath)
            return urlPath;
        }
        else if (tempUrlPath.startWith("../"))
        {
            var path = currentPath;
            while (tempUrlPath.startWith("../"))
            {
                i = path.lastIndexOf('/', path.length - 1);
                if (i != -1)
                {
                    path = path.substring(0, i);
                }
                else
                {
                    throw new Error("“" + urlPath + "”路径不存在。");
                }
                tempUrlPath = tempUrlPath.substring(3);
            }
            if (!path.endWith("/"))
            {
                path += "/";
            }
            return path + tempUrlPath;
        }
        else
        {
            return currentPath + "/" + tempUrlPath;
        }
    }
    catch (e)
    {
        throw new Error("“" + urlPath + "”路径不存在或不合法。");
    }
}

/**
 * 用来加载指定的框架外的脚本文件或 CSS 样式表单。文件路径参数的规则同 $url 方法。
 * <pre>
 * 说明：
 *     1. 此语句并不负责校验指定的项是否存在。
 *     2. 重复的项不会被再次加载。
 *     3. 此语句为同步操作，只有当此脚本文件被加载后才会继续执行后面的程序。
 * </pre>
 * @param fileName 指定的脚本文件路径。
 */
function $include(fileName)
{
    fileName = $url(fileName);                      
    var fileId = "f_" + hex_sha1(fileName);
    if (fileName.endWith(".js")) {
        if (document.getElementById(fileId) == null) {
            document.write("<script id='" + fileId + "' type='text/javascript'  src='" + fileName + "'></" + "script>");
        }
    }
    else if (fileName.endWith(".css")) {
        if (!document.getElementById(fileId))
        {
            document.write("<link id='" + fileId +"' rel='stylesheet' type='text/css' href='"+ fileName +"'>");
//            var styleSheet = document.createStyleSheet(fileName);
//            styleSheet.owningElement.id = fileId;
        }
    }
}

/**
* 用来加载指定的框架内的类所在的脚本文件。
* <pre>
*   说明：
*     1. 此语句并不负责校验指定的项是否存在。
*     2. 重复的项不会被再次加载。
*     3. 此语句为同步操作，只有当此脚本文件被加载后才会继续执行后面的程序。
*     4.每个JS包目录下必须提供一个default.js文件，负责加载该目录下所有的JS。
* </pre>
*  @param jsPackage  指定的类或命名空间的全称。
* <pre>
*   实例：
*    // 加载 com.epgis 命名空间中的所有成员。
*    $import("com.epgis.*");
*
*    // 加载 com.epgis.XmlRpcClient 类。
*    $import("com.epgis.XmlRpcClient");
*
*    // 加载第三方 JavaScript 库中的 XLoadTree 类。
*    $import("lib.xloadtree2.XLoadTree");
* </pre>
*/
function $import(jsPackage)
{
    var rootNamespace = "com";
//    if (!BaskApp.debugMode)
//    {
//        return;
//    }
    if (jsPackage.endWith(".*"))
    {
        jsPackage = jsPackage.substring(0, jsPackage.length - 1) + "default";
    }
    if (jsPackage.startWith(rootNamespace + "."))
    {
        jsPackage = jsPackage.substring(rootNamespace.length + 1);
        var path = BaskApp.jsLibRoot + "/" + jsPackage.replace(/\./g, '/') + ".js";;
        $include(path);
    }
    else if (jsPackage.startWith("comp."))
    {
        jsPackage = jsPackage.substring(rootNamespace.length + 1);
        var path = BaskApp.compJsLibRoot + "/" + jsPackage.replace(/\./g, '/') + ".js";
        $include(path);
    }
    else
    {
        throw new Error("只能引用 " + rootNamespace + " 命名空间或第三方 JavaScript 库中的类或命名空间。若要引用非框架内的脚本文件，请使用 $include 语句。");
    }
}

/**
* 声明指定的命名空间，并返回表示此命名空间的 <a cref="#NameSpace">NameSpace</a> 对象。如果此命名空间是已存在，则不会被声明，并返回已存在的命名空间实例。通常此语句与 with 语句同时配合，表示声明并使用指定的命名空间。</summary>
*@param p_namespace 要声明的命名空间全称。
* <pre>
*   示例：
*     // 声明并使用 my.space 命名空间。
*     with ($namespace("my.space"))
*     {
*         my.space.Blog = function()
*         {
*             // 创建 Blogger 类的实例，由于 Blogger 类和当前 Blog 类同属于一个命名空
*             // 间，因此可以直接使用 Blogger 类，而无需写做“new my.space.Blogger()”。
*             var blogger = new Blogger();
*
*             // 在这里添加 my.space.Blog 类的其他代码。
*         }
*
*         my.space.Blogger = function()
*         {
*             // 在这里添加 my.space.Blogger 类的其他代码。
*         }
*     }
* </pre>
*/
function $namespace(p_namespace)
{
    var parts = p_namespace.split(".");
    if (parts.length == 0)
    {
        return null;
    }
    try
    {
        eval(parts[0]);
    }
    catch (e)
    {
        eval(parts[0] + " = new NameSpace('" + parts[0] + "');");
    }
    var root = eval(parts[0]);
    var space = parts[0];
    for (var i = 1; i < parts.length; i++)
    {
        space += "." + parts[i];
        if (!eval(space))
        {
            eval(space + " = new NameSpace('" + space + "');");
        }
    }
    return eval(p_namespace);
}

/**
* 表示命名空间的类。
* <pre>
*     不建议直接使用构造函数创建实例，请使用 $namespace(p_fullName) 语句声明命名空间，这样可以避免创建重复的同名命名空间对象。
* </pre>
*@param p_fullName 要声明的命名空间全称。
*/
function NameSpace(p_fullName)
{
    var me = this;
    var _parts = p_fullName.split('.');

    //返回此命名空间的全名。
    me.fullName = p_fullName;

    //返回此命名空间的名称(将不包含它的父级命名空间)。
    me.name = _parts[_parts.length - 1];

    //返回此命名空间中的所有类或静态实例成员。
    me.getMembers = function()
    {
        var members = new Array();
        for (var memberIndex in me)
        {
            if (memberIndex != "getMembers" && memberIndex != "fullName" && memberIndex != "name")
            {
                members.add(memberIndex);
            }
        }
        return members;
    }
}

/**
 * 返回此字符串去除末尾所有空格后的字符串。
 */
String.prototype.trim = function()
{
    return this.trimRight().trimLeft();
}
String.prototype.trimLeft = function()
{
    return this.replace(/^\s*/, "");
}

/**
 * 返回此字符串去除开始位置所有空格后的字符串。
 */
String.prototype.trimRight = function()
{
    return this.replace(/\s*$/, "");
}

 /**
 * 返回此字符串是否以指定的字符串开头。
 * @param str  指定的字符串
 */
String.prototype.startWith = function(str)
{
    if(str == null){
       return false;
    }else{
        return this.substring(0, str.length) == str;
    }
}

/**
 * 返回此字符串是否以指定的字符串结尾。
 * @param str 指定的字符串
 */
String.prototype.endWith = function(str)
{
    if(str == null){
        return false;
    }else{
        return this.substring(this.length - str.length) == str;
    }
}
 //SHA1
/////////////////////////////////////////////////////////////////////////////////////////////
/*
 * A JavaScript implementation of the Secure Hash Algorithm, SHA-1, as defined
 * in FIPS PUB 180-1
 * Version 2.1a Copyright Paul Johnston 2000 - 2002.
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for details.
 */

/*
 * Configurable variables. You may need to tweak these to be compatible with
 * the server-side, but the defaults work in most cases.
 */
var hexcase = 0;
/* hex output format. 0 - lowercase; 1 - uppercase        */
var b64pad = "";
/* base-64 pad character. "=" for strict RFC compliance   */
var chrsz = 8;
/* bits per input character. 8 - ASCII; 16 - Unicode      */

/*
 * These are the functions you'll usually want to call
 * They take string arguments and return either hex or base-64 encoded strings
 */
function hex_sha1(s) {
    return binb2hex(core_sha1(str2binb(s), s.length * chrsz));
}
function b64_sha1(s) {
    return binb2b64(core_sha1(str2binb(s), s.length * chrsz));
}
function str_sha1(s) {
    return binb2str(core_sha1(str2binb(s), s.length * chrsz));
}
function hex_hmac_sha1(key, data) {
    return binb2hex(core_hmac_sha1(key, data));
}
function b64_hmac_sha1(key, data) {
    return binb2b64(core_hmac_sha1(key, data));
}
function str_hmac_sha1(key, data) {
    return binb2str(core_hmac_sha1(key, data));
}

/*
 * Perform a simple self-test to see if the VM is working
 */
function sha1_vm_test()
{
    return hex_sha1("abc") == "a9993e364706816aba3e25717850c26c9cd0d89d";
}

/*
 * Calculate the SHA-1 of an array of big-endian words, and a bit length
 */
function core_sha1(x, len)
{
    /* append padding */
    x[len >> 5] |= 0x80 << (24 - len % 32);
    x[((len + 64 >> 9) << 4) + 15] = len;

    var w = Array(80);
    var a = 1732584193;
    var b = -271733879;
    var c = -1732584194;
    var d = 271733878;
    var e = -1009589776;

    for (var i = 0; i < x.length; i += 16)
    {
        var olda = a;
        var oldb = b;
        var oldc = c;
        var oldd = d;
        var olde = e;

        for (var j = 0; j < 80; j++)
        {
            if (j < 16) w[j] = x[i + j];
            else w[j] = rol(w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16], 1);
            var t = safe_add(safe_add(rol(a, 5), sha1_ft(j, b, c, d)),
                    safe_add(safe_add(e, w[j]), sha1_kt(j)));
            e = d;
            d = c;
            c = rol(b, 30);
            b = a;
            a = t;
        }

        a = safe_add(a, olda);
        b = safe_add(b, oldb);
        c = safe_add(c, oldc);
        d = safe_add(d, oldd);
        e = safe_add(e, olde);
    }
    return Array(a, b, c, d, e);

}

/*
 * Perform the appropriate triplet combination function for the current
 * iteration
 */
function sha1_ft(t, b, c, d)
{
    if (t < 20) return (b & c) | ((~b) & d);
    if (t < 40) return b ^ c ^ d;
    if (t < 60) return (b & c) | (b & d) | (c & d);
    return b ^ c ^ d;
}

/*
 * Determine the appropriate additive constant for the current iteration
 */
function sha1_kt(t)
{
    return (t < 20) ? 1518500249 : (t < 40) ? 1859775393 :
                                   (t < 60) ? -1894007588 : -899497514;
}

/*
 * Calculate the HMAC-SHA1 of a key and some data
 */
function core_hmac_sha1(key, data)
{
    var bkey = str2binb(key);
    if (bkey.length > 16) bkey = core_sha1(bkey, key.length * chrsz);

    var ipad = Array(16), opad = Array(16);
    for (var i = 0; i < 16; i++)
    {
        ipad[i] = bkey[i] ^ 0x36363636;
        opad[i] = bkey[i] ^ 0x5C5C5C5C;
    }

    var hash = core_sha1(ipad.concat(str2binb(data)), 512 + data.length * chrsz);
    return core_sha1(opad.concat(hash), 512 + 160);
}

/*
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
 * to work around bugs in some JS interpreters.
 */
function safe_add(x, y)
{
    var lsw = (x & 0xFFFF) + (y & 0xFFFF);
    var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
    return (msw << 16) | (lsw & 0xFFFF);
}

/*
 * Bitwise rotate a 32-bit number to the left.
 */
function rol(num, cnt)
{
    return (num << cnt) | (num >>> (32 - cnt));
}

/*
 * Convert an 8-bit or 16-bit string to an array of big-endian words
 * In 8-bit function, characters >255 have their hi-byte silently ignored.
 */
function str2binb(str)
{
    var bin = Array();
    var mask = (1 << chrsz) - 1;
    for (var i = 0; i < str.length * chrsz; i += chrsz)
        bin[i >> 5] |= (str.charCodeAt(i / chrsz) & mask) << (32 - chrsz - i % 32);
    return bin;
}

/*
 * Convert an array of big-endian words to a string
 */
function binb2str(bin)
{
    var str = "";
    var mask = (1 << chrsz) - 1;
    for (var i = 0; i < bin.length * 32; i += chrsz)
        str += String.fromCharCode((bin[i >> 5] >>> (32 - chrsz - i % 32)) & mask);
    return str;
}

/*
 * Convert an array of big-endian words to a hex string.
 */
function binb2hex(binarray)
{
    var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
    var str = "";
    for (var i = 0; i < binarray.length * 4; i++)
    {
        str += hex_tab.charAt((binarray[i >> 2] >> ((3 - i % 4) * 8 + 4)) & 0xF) +
               hex_tab.charAt((binarray[i >> 2] >> ((3 - i % 4) * 8  )) & 0xF);
    }
    return str;
}

/*
 * Convert an array of big-endian words to a base-64 string
 */
function binb2b64(binarray)
{
    var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    var str = "";
    for (var i = 0; i < binarray.length * 4; i += 3)
    {
        var triplet = (((binarray[i >> 2] >> 8 * (3 - i % 4)) & 0xFF) << 16)
                | (((binarray[i + 1 >> 2] >> 8 * (3 - (i + 1) % 4)) & 0xFF) << 8 )
                | ((binarray[i + 2 >> 2] >> 8 * (3 - (i + 2) % 4)) & 0xFF);
        for (var j = 0; j < 4; j++)
        {
            if (i * 8 + j * 6 > binarray.length * 32) str += b64pad;
            else str += tab.charAt((triplet >> 6 * (3 - j)) & 0x3F);
        }
    }
    return str;
}
