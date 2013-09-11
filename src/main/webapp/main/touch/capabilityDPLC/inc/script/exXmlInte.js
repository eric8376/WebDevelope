function callRemoteFunctionNoTrans(serviceName, funcName){
  var url = "/DispatchDesign/exBuizLogic.do";
  var doc = makeDOM();
  var node = doc.createProcessingInstruction("xml","version='1.0'");
  doc.appendChild(node);
  node = doc.appendChild(doc.createElement("Function"));
  node.setAttribute("name",funcName);
  node.setAttribute("serviceName",serviceName);
alert("exxmlinte.js")
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
  xmlHttp.open("POST", url, false);
  xmlHttp.send(doc.xml);
  if(xmlHttp.status!=200){
    throw "Network issue or remote server issue";
    return;
  }else retVal = xmlHttp.responseText;
  //window.prompt("xml", retVal);
  //xml转为object
  doc = makeDOM();
  if(!doc.loadXML(retVal)){
    throw "The format of remote server return is not an Xml"; return;
  }
  node = doc.documentElement;
  switch(node.tagName){
    case "Output":
      return getObjectFromXml(node,node.getAttribute("type"));
    case "Error":
      throw new Error(node.childNodes(3).text, node.childNodes(4).text);
    default:
      throw "Remote server returns invalid xml";
  }
  node = doc = null;
}

function callRemoteFunction(serviceName, funcName){
  var url = "/DispatchDesign/exBuizLogic.do";
  var doc = makeDOM();
  var node = doc.createProcessingInstruction("xml","version='1.0'");
  doc.appendChild(node);
  //node = null;
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
  xmlHttp.open("POST", url, false);
  xmlHttp.send(doc.xml);
  if(xmlHttp.status!=200){
    throw "Network issue or remote server issue";
    return;
  }else retVal = xmlHttp.responseText;
  //window.prompt("xml", retVal);
  //xml转为object
  doc = makeDOM();
  if(!doc.loadXML(retVal)){
    throw "The format of remote server return is not an Xml";return;
  }
  node = doc.documentElement;
  switch(node.tagName){
    case "Output":
      return getObjectFromXml(node,node.getAttribute("type"));
    case "Error":
      throw new Error(node.childNodes(3).text, node.childNodes(4).text);
    default:
      throw "Remote server returns invalid xml";
  }
  node = doc = null;
}

<!--private -->
function IsInt(num){
  return ((num%1)==0)
}
function parseDate(s){
  var aD = s.split(/[\/\-: ]/);
  if(aD.length<6)return new Date();
  var d = new Date(aD[0],parseInt(aD[1]-1),aD[2],aD[3],aD[4],aD[5]);
  if(isNaN(d))return new Date();
  return d;
}
function parseDateStr(d){
  return d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate()+" "+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds();
}

function makeDOM(){
  var o,suffixs=[".4.0", ".3.0", ".2.0", ""];
  for(var i=0;i<suffixs.length;i++){
    try{
      o = new ActiveXObject("msxml2.DOMDocument"+ suffixs[i]);
      break;
    }catch(ex){};
  }
  try{
    o.async = false;
    o.validateOnParse = false;
    o.resolveExternals = false;
  }catch(e){alert(e.description);}
  return o;
}

function getObjectType(o){
  //n=null,b,i,f,s,d,o,a
  if(o==null) return 'n';
  switch(o.constructor){
    case Number:
      if(IsInt(o)) return 'i';
      else return 'f';
    case Boolean:
      return 'b';
    case String:
      return 's';
    case Date:
      return 'd';
    case Array:
      return 'a';
    default:
      return 'o';
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
      elm.text = arg.toString();break;
    case 'd':
      elm.text = parseDateStr(arg);break;
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
      return null;
    case 'b':
    case 'B':
      return (elm.text=="true");
    case 'i':
    case 'I':
    case 'l':
    case 'L':
      var val = parseInt(elm.text,10);
      if(isNaN(val)) throw elm.tagName+" must be an integer";
      return val;
    case 'f':
    case 'F':
      var val = parseFloat(elm.text);
      if(isNaN(val)) throw elm.tagName +" must be an float";
      return val;
    case 's':
    case 'S':
      return elm.text;
    case 'd':
    case 'D':
      try{return parseDate(elm.text);
      }catch(ex){throw elm.tagName +" must be in a DateTime format(yyyy-MM-dd HH:mm:ss)";}
    case 'o':
      {
        var obj = new Object();
        var nodes = elm.childNodes;
        for(var i=0;i<nodes.length;i++){
          var child = nodes[i];
          if(child.nodeType==1){  //NODE_ELEMENT
            var childtype = child.tagName.charAt(0);
            var key = child.tagName.substring(1);
            obj[key] = getObjectFromXml(child,childtype);
          }
        }
        return obj;
      }
    case 'a':
      {
        var arr = new Array();
        var nodes = elm.childNodes;
        for(var i=0;i<nodes.length;i++){
          var child = nodes[i];
          if(child.nodeType==1){   //NODE_ELEMENT
            var childtype = child.tagName.charAt(0);
            var key = child.tagName.substring(1);
            if(key=="Item"){
              arr[arr.length] = getObjectFromXml(child,childtype);
            }
          }
        }
        return arr;
      }
    case 'v':
      return null;
    default:
      throw "type '"+ type +"' can't be recognized";
  }
}
