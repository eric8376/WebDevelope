function callRemoteFunctionNoTrans(serviceName,funcName){
  var URL=G_RES_URL+"/DispatchDesign/busifacadeservlet";
  var doc = makeDOM();

  var node = doc.createProcessingInstruction("xml","version='1.0'");
  doc.appendChild(node);
  node = doc.appendChild(doc.createElement("Function"));
  node.setAttribute("name",funcName);
  node.setAttribute("serviceName",serviceName);

  for(var i=2;i<arguments.length;i++){
    var elm = doc.createElement("Param");
    var type = getObjectType(arguments[i]);
    elm.setAttribute("type", type);
    packageObject(elm, type, arguments[i]);
    node.appendChild(elm);
  }
  //window.prompt("xml", doc.xml);
  //发送到后台
  var retVal;
  var xmlHttp = new ActiveXObject("Microsoft.XmlHttp");
  xmlHttp.open("POST", URL, false);
  xmlHttp.send(doc.xml);
  if(xmlHttp.status!=200){
    throw new Error(0,"Network issue or remote server issue");
    return;
  }else retVal = xmlHttp.responseText;
  //window.prompt("xml", retVal);
  //xml转为object
  doc = makeDOM();
  try{
    if(!doc.loadXML(retVal)){
      throw new Error(0,"发生错误：\n"+retVal);
      return;
    }
    node = doc.documentElement;
    switch(node.tagName){
      case "Output":
        return getObjectFromXml(node,node.getAttribute("type"));
      case "Error":
        throw packageError(node);
      default:
        throw new Error(0,"发生系统异常，请联系系统管理员！");
    }
  }
  finally{
    retVal = xmlHttp = node = doc = null;
  }
}

function callRemoteFunction(serviceName,funcName){
  var URL=G_RES_URL+"/DispatchDesign/busifacadeservlet";
  var doc = makeDOM();

  var node = doc.createProcessingInstruction("xml","version='1.0'");
  doc.appendChild(node);
  node = doc.appendChild(doc.createElement("Function"));
  node.setAttribute("name",funcName);
  node.setAttribute("serviceName",serviceName);
  //为事务处理新加的属性
  node.setAttribute("userTransaction","true");

  for(var i=2;i<arguments.length;i++){
    var elm = doc.createElement("Param");
    var type = getObjectType(arguments[i]);
    elm.setAttribute("type", type);
    packageObject(elm, type, arguments[i]);
    node.appendChild(elm);
  }
  //window.prompt("xml", doc.xml);
  //发送到后台
  var retVal;
  var xmlHttp = new ActiveXObject("Microsoft.XmlHttp");
  xmlHttp.open("POST", URL, false);
  xmlHttp.send(doc.xml);
  if(xmlHttp.status!=200){
    throw new Error(0,"Network issue or remote server issue");
    return;
  }else retVal = xmlHttp.responseText;
  //window.prompt("xml", retVal);
  //xml转为object
  doc = makeDOM();
  try{
    if(!doc.loadXML(retVal)){
      throw new Error(0,"The format of remote server return is not an Xml");
      return;
    }
    node = doc.documentElement;
    switch(node.tagName){
      case "Output":
        return getObjectFromXml(node,node.getAttribute("type"));
      case "Error":
        throw packageError(node);
      default:
        throw new Error(0,"Remote server returns invalid xml");
    }
  }
  finally{
    retVal = xmlHttp = node = doc = null;
  }
}


//private

function IsNumberInt(num){
  var myMod = num % 1;
  return (myMod == 0);
}
function makeDOM(){
  var o,suffixs=[".4.0", ".3.0", ".2.0", ""];
  for(var i=0;i<suffixs.length;i++){
    try{
      o = new ActiveXObject("msxml2.DOMDocument"+ suffixs[i]);
      break;
    }catch(ex){};
  }
  o.async = false;
  o.validateOnParse = false;
  o.resolveExternals = false;
  return o;
}

function packageError(oN){
  var e1 =new Error(0, oN.childNodes[1].text);
  e1.code = oN.childNodes[0].text;
  e1.resolve = oN.childNodes[2].text;
  e1.toString = function(){return (((e1.code&&""!=e1.code)?e1.code+"：":"")+ e1.description +((e1.resolve&&""!=e1.resolve)?"\n"+e1.resolve:""));};
  return e1;
}

function getObjectType(obj){
  //n=null,b,i,f,s,d,o,a
  if(obj == null) return 'n';
  if(obj.constructor.toString().indexOf("Date")>0) return 'd';
  if(obj.constructor.toString().indexOf("Array")>0) return 'a';
  switch(obj.constructor){
    case Number:
      if(IsNumberInt(obj))
        return 'i';
      else
        return 'f';
      break;
    case Boolean:
      return 'b';
      break;
    case String:
      return 's';
      break;
    case Date:
      return 'd';
      break;
    case Array:
      return 'a';
      break;
    default:
      return 'o';
      break;
  }
}

function packageObject(elm,type,arg){
  switch(type){
    case 'n':
      break;
    case 'b':
    case 'i':
    case 'l':
    case 'f':
    case 's':
      elm.text = strEncoded(arg.toString());
      break;
    case 'd':
      elm.text = dateToString(arg);
      break;
    case 'o':
      for(var key in arg){
        var child =arg[key];
        var subtype = getObjectType(child);
        //it's empty deal to its minValue in b/i/f
        var childElm = elm.ownerDocument.createElement(subtype+key);
        elm.appendChild(childElm);
        packageObject(childElm,subtype,child);
      }
      break;
    case 'a':
      for(var i=0;i<arg.length;i++){
        var child =arg[i];
        var subtype = getObjectType(child);
        var childElm = elm.ownerDocument.createElement(subtype+"Item");
        elm.appendChild(childElm);
        packageObject(childElm,subtype,child);
      }
      break;
   }
}

function getObjectFromXml(elm,type){
  if(type==null) return null;
  switch(type){
    case 'n':
    case 'v':
      return null;
    case 'b':
    case 'B':
      return (elm.text=="true");
    case 'i':
    case 'I':
    case 'l':
    case 'L':
      var val = parseInt(elm.text);
      if(isNaN(val)) throw elm.tagName+" must be an integer";
      return val;
    case 'f':
    case 'F':
      var val = parseFloat(elm.text);
      if(isNaN(val)) throw elm.tagName+" must be an float";
      return val;
    case 's':
    case 'S':
      return elm.text;
    case 'd':
    case 'D':
      try{
        return parseDate(elm.text);
      }catch(ex){
        throw elm.tagName+"must be in a DateTime format(yyyy-MM-dd HH:mm:ss)";
      }
  case 'o':
    {
      var obj = new Object();
      var nodes = elm.childNodes;
      for(var i=0;i<nodes.length;i++){
        var child = nodes[i];
        if(child.nodeType==1){//NODE_ELEMENT
          var childtype = child.tagName.charAt(0);
          var key = child.tagName.substring(1);
          obj[key] = getObjectFromXml(child,childtype);
        }
      }
      return  obj;
    }
  case 'a':
    {
      var arr = new Array();
      var nodes = elm.childNodes;
      for(var i=0;i<nodes.length;i++){
        var child = nodes[i];
        if(child.nodeType==1){//NODE_ELEMENT
          var childtype = child.tagName.charAt(0);
          var key = child.tagName.substring(1);
          if(key=="Item"){
            arr[arr.length] = getObjectFromXml(child,childtype);
          }
        }
      }
      return arr;
    }
  default:
    throw "type '"+ type +"' can't be recognized";
  }
}

function parseDate(str){
  var arrDate = str.split(/[\/\-: ]/);
  if(arrDate.length<6) throw "Invalid DateTime format";
  var d = new Date(arrDate[0],parseInt(arrDate[1]-1),arrDate[2],arrDate[3],arrDate[4],arrDate[5]);
  if(isNaN(d))
    throw "Invalid DateTime format";
  return d;
}

function parseDateStr(str){
  var yearStr =  str.substring(0,4);
  var monthStr  = str.substring(5,7);
  var dayStr  =  str.substring(8,10);
  var dDay = new Date(yearStr,monthStr-1,dayStr);
   return dDay;
}

function dateToString(d){
  return d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate()+" "+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds();
}

/*  特殊字符编码 */
function strEncoded(str){
  if(str!=null){
    //str = str.replace("\"", dq);
    //str = str.replace(/'/g, "’");
    //str = str.replace(/"/g, "”");
    //str = str.replace("\\", tq);
    //str = str.replace("=", eq);
    //str = str.replace(/</g, "＜");
    //str = str.replace(/>/g, "＞");
    //str = str.replace(/&/g, "＆");
  }else{
    str="";
  }
  return str;
}

