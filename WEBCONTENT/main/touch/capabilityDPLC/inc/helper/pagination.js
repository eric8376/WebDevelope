var page_message001=callRemoteFunctionNoTrans("com.ztesoft.resmaster.message.MessageImpl","getRimWebMessage","page_message001");
var page_message002=callRemoteFunctionNoTrans("com.ztesoft.resmaster.message.MessageImpl","getRimWebMessage","page_message002");
var page_message003=callRemoteFunctionNoTrans("com.ztesoft.resmaster.message.MessageImpl","getRimWebMessage","page_message003");
var page_message004=callRemoteFunctionNoTrans("com.ztesoft.resmaster.message.MessageImpl","getRimWebMessage","page_message004");
var page_message005=callRemoteFunctionNoTrans("com.ztesoft.resmaster.message.MessageImpl","getRimWebMessage","page_message005");
var page_message006=callRemoteFunctionNoTrans("com.ztesoft.resmaster.message.MessageImpl","getRimWebMessage","page_message006");
var page_message007=callRemoteFunctionNoTrans("com.ztesoft.resmaster.message.MessageImpl","getRimWebMessage","page_message007");
var page_message008=callRemoteFunctionNoTrans("com.ztesoft.resmaster.message.MessageImpl","getRimWebMessage","page_message008");
var page_message009=callRemoteFunctionNoTrans("com.ztesoft.resmaster.message.MessageImpl","getRimWebMessage","page_message009");
var page_message010=callRemoteFunctionNoTrans("com.ztesoft.resmaster.message.MessageImpl","getRimWebMessage","page_message010");

/* ��ҳ���� ʹ��ͳһ goPage ����,���ط�ҳ�ַ���
@param pagiId        ������ʾpagi�ط���id
@param recordCount   ����������¼
@param pageNo        ��ǰҳ
@param pageSize      ÿҳ������
@param functionName  ��ҳ����
*/
function drawPageControl(pagiId,recordCount,pageNo,pageSize,functionName){
  //alert(functionName);
  var errmsg=page_message010;
  if(pageSize==null) pageSize=10;
  if(pageSize<1) pageSize = (recordCount==0)?1:recordCount;

  var totalPage = Math.ceil(recordCount/pageSize);  //��ҳ��
  if(pageNo==-1||pageNo > totalPage) pageNo = 1;

  var pageStr ="<div align='right'>";
  if(pageNo==1)
    pageStr += "<font color='#666666'>"+page_message001+"&nbsp;"+page_message002+"</font>&nbsp;";
  else
    pageStr += "<span onclick='"+functionName+"(1)' STYLE='cursor: hand'><font color='blue'>"+page_message001+"</font></span>&nbsp;<span onclick='"+functionName+"("+ (pageNo-1) +")'  STYLE='cursor: hand'><font color='blue'>"+page_message002+"</font></span>&nbsp;";

  if(pageNo>=totalPage)
    pageStr += "<font color='#666666'>"+page_message003+"&nbsp;"+page_message004+"</font>&nbsp;";
  else
    pageStr += "<span onclick='"+functionName+"("+ (pageNo+1) +")'  STYLE='cursor: hand'><font color='blue'>"+page_message003+"</font></span>&nbsp;<span onclick='"+functionName+"("+ totalPage +")'  STYLE='cursor: hand'><font color='blue'>"+page_message004+"</font></span>&nbsp;";

  pageStr += "&nbsp;"+page_message005+"<strong><font color=red>"+ pageNo +"</font>/"+ totalPage +"</strong>"+page_message006+
             "&nbsp;"+page_message007+"<b>"+ recordCount +"</b>"+page_message008+
             "&nbsp;"+page_message009+"<input type='text' size=2 maxlength=10 class='smallInput' value="+ pageNo +">"+page_message006+
             "<img style='cursor:hand' border='0' src='/DispatchDesign/images/button/go.gif' onmousedown='cursorWait(this)' onclick='var p1=document.all(this.sourceIndex-1).value;if(!isNaN(p1)) "+functionName+"((p1>"+ totalPage +")?"+ totalPage +":p1);' align='absmiddle'></div>";
  //alert(pageStr);
  pagiId.innerHTML = pageStr;
  pageStr = null;
}

/* ��ת��ָ��ҳ������ҳ������ú���qryPagination */
/*
function goPage(functionName,pageP){
  if(isNaN(pageP))
    alert("��¼��һ��ҳ���֣�");
  else
    qryPagination(pageP);
}
*/
