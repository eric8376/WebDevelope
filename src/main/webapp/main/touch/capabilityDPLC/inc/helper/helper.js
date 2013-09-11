/*************************************************************************
1��  Copyright by OSS R&D Dept. of ZTEsoft,2004-04-27
  File Name:helper.js
  Create Date:2004-04-27
  Author:Jin.XiangGuo
  create Version:0.0.0.1
  Version:0.0.0.1
  Create Version Date:2004-04-27
  Description:�ṩ��ǰ̨��javasctipt/htc��һЩ���ú����������ҹ�����Դ
  Function Lists:  ��������˺���֮���� Fun?tion Lists��ҲҪ��Ӧ����ӣ�
    Tree_Init      :  ���ݴ���Ķ�������������
    GetTreeNodeById    :  ���ݴ����Id��ȡNode
    TreeRemove      :  ���ݴ����TreeNameɾ������Ľڵ�
    CertType_Init    :  ���ݴ���������������������
    selDropDownList    :  ���ݴ���Ĳ���ֵ���Ƚ�������ÿһ��option�Ͳ���ֵ��ȷ��������ѡ�е���
    addOptionToSelect  :  ���ݴ���Ĳ�������select��ѡ�����ӵ������б���
    moveitemsbetween  :  ��ԭ�б�ѡ���б�ѡ��ѡ�Ŀ���б��У����ҿ��԰�Ŀ���б�ѡ��ȡ������ԭ�б�
    formatDateStr    :  �������ʱ�����ͱ���ת����ָ�����ַ�����ʽ,���صĸ�ʽΪ��YYYY-MM-DD HH:MI:SS
    trim        :  ��������ַ�����ǰ��ո�ȥ��

2��  Modified By Name Of Programmer:Jin.XiangGuo
  Modified Date:2004-04-27
  Current Version:0.0.0.2
  Function Added:trim
  Function Removed:
  Function Changed:
    Tree_Init:��û�г�ʼ��
    TreeRemoved:����ȡ�ӽӵ��ʱ�����е�����
  Other Changes:

3��  Modified By Name Of Programmer:yang.jingyun
  Modified Date:2004-08-06
  Current Version:0.0.0.2
  Function Added:

  Function Removed:
  Function Changed:

  Other Changes:

*************************************************************************/


//�����ȫ�ֱ���
var g_nMin = Number.MIN_VALUE;
var g_nMax = Number.MAX_VALUE;
var INT_NUM="0123456789";
var FLOAT_NUM="0123456789.";
var gWebAbsPath="/DispatchDesign";

/*************************************************************************
����˵�������ݴ���Ķ�������������

����Ҫ��Ҫ������ڵ��ID������Ψһ��

���������
  treeName������
  arrOjb  ������������(һά���飩
      �������԰�����id    ����Ҫ���ɵ����ڵ��IDֵ
              text    �����ڵ��text����ֵ
              level    �����ڵ�Ĳ��ֵ
              upNodeId  ���ϼ����ڵ��IDֵ
      �磺
        arr[0].level=0;
        arr[0].id="�л�ҵ��";
        arr[0].text="�л�ҵ��";
        arr[0].upNodeId="";

���������
    �ޣ�
************************************************************************/
function Tree_Init(treeName,arrObj)
{

  //2004-04-28:arrOjb��level���Կɲ���
  for(var i = 0; i < arrObj.length; i++)
  {
    if(arrObj[i].upNodeId == "")
    {
      var node=treeName.createTreeNode();
      node.setAttribute("ID",arrObj[i].id);
      node.setAttribute("TEXT",arrObj[i].text);
      //node.setAttribute("hasGetInfoFromServer",false);
      treeName.add(node);
    }
    else
    {
      var node1=GetTreeNodeById(arrObj[i].upNodeId,treeName);
      if (node1==null)
      {
        ErrorHandle("��ʾ", 2, 1,arrObj[i].text+"��Ѱ���ϼ����ڵ�ʱ����", null);
        break;
      }
      else
      {
        var node=treeName.createTreeNode();
        node.setAttribute("ID",arrObj[i].id);
        node.setAttribute("TEXT",arrObj[i].text);
        node1.add(node);
      }
    }
  }
}

/*************************************************************************
����˵�������ݴ���Ķ�������������

����Ҫ��Ҫ������ڵ��ID������Ψһ��

���������
  treeName������
  arrOjb  ������������(һά���飩
      �������԰�����id    ����Ҫ���ɵ����ڵ��IDֵ
              text    �����ڵ��text����ֵ
              child    : �ӽڵ�
      �磺
        arr[0].id="0";
        arr[0].text="�л�ҵ��";
        arr[0].child;

���������
    �ޣ�
************************************************************************/
function GetTreeNodeText(model)
{
  var arrHtml = new Array();
  arrHtml[arrHtml.length]="<TVNS:treenode";
  arrHtml[arrHtml.length]=" id="+model.id+" >";
  arrHtml[arrHtml.length]=model.text;
  if(model.child!=null)
  {
       for(var i=0;i<model.child.length;i++)
            arrHtml[arrHtml.length]= GetTreeNodeText(model.child[i]);
  }
  arrHtml[arrHtml.length]="</TVNS:treenode>";
  return arrHtml.join("");
}

/*************************************************************************
����˵�������ݴ����Id��ȡNode

����Ҫ��Ҫ������ڵ��ID������Ψһ��

���������
  treeName�����ڵ�
  id  ����Ҫ��ѯNode�Ľڵ��Idֵ

���������
    node����ѯ���Ľڵ㣻��Ϊnull��˵��δ��ѯ�����������Ľڵ�
************************************************************************/
function GetTreeNodeById(id,treeName)
{
  var arrNode=new Array();
  var  node=null;
  arrNode=treeName.getChildren();

  for (var i=0;i<arrNode.length;i++)
  {
    if(arrNode[i].getAttribute("ID")==id)
    {
      node=arrNode[i];
      break;
    }
    else
    {
      node= GetTreeNodeById(id,arrNode[i]);
      if (node==null)
        continue
      else
        return node;
    }
  }
  return node;
}

/*************************************************************************
����˵�������ݴ����TreeNameɾ������Ľڵ�

����Ҫ�󣺴���һ�����ڵ�����name

���������
  treeName�����ڵ�

���������
    ��
************************************************************************/
function TreeRemove(treeName)
{
  var arrNode=treeName.getChildren();
  for (var i=0;i<arrNode.length;i++)
  {
    arrNode[i].remove();
  }
}

/*************************************************************************
����˵�������ݴ���������������������

����Ҫ��Ҫ������ڵ��ID������Ψһ��

���������
  drpId  ������������
  arrObj  ��������������������

���������
    �ޣ�
************************************************************************/
function Select_Init(drpId,arrObj,colarr)
{
  if (drpId.tagName!="SELECT")
    return false;
  drpId.length=0;
  for (i = 0; i < arrObj.length; i++)
  {
    var option = document.createElement("OPTION");
    option.text = eval("arrObj[i]."+colarr[0]);
    option.value = eval("arrObj[i]."+colarr[1]);
    drpId.add(option);
  }
}

/*************************************************************************
����˵�������ݴ���Ĳ���ֵ���Ƚ�������ÿһ��option�Ͳ���ֵ��ȷ��������ѡ�е���

���������
  �������id
  �������ֵ
************************************************************************/
function selDropDownList(sellist,selvalue){
    var k;
    for( k=0;k<sellist.options.length;k++){
      if(sellist.options[k].value==selvalue){
        sellist.options[k].selected = true;
        break;
      }
    }
    if(k==sellist.options.length)
      sellist.options[0].selected=true;
  }

/*************************************************************************
����˵�������ݴ���Ĳ���ֵ���Ƚ�������ÿһ��option���ı��Ͳ���ֵ��ȷ��������ѡ�е���

���������
  �������id
  �������ֵ
************************************************************************/
function selDropDownListByText(sellist,selText){
    var k;
    for( k=0;k<sellist.options.length;k++){
      if(sellist.options[k].text==selText){
        sellist.options[k].selected = true;
        break;
      }
    }
    if(k==sellist.options.length)
      sellist.options[0].selected=true;
  }

/*************************************************************************
����˵�������ݴ���Ĳ�������select��ѡ�����ӵ������б���

���������
  option��value
  option��text

************************************************************************/

function addOptionToSelect(oSelect,optionValue,optionText){
  var oOption = document.createElement("OPTION");
  oOption.text=optionText;
  oOption.value=optionValue;
  oSelect.add(oOption);

}
/*************************************************************************
����˵������ԭ�б�ѡ���б�ѡ��ѡ�Ŀ���б��У����ҿ��԰�Ŀ���б�ѡ��ȡ������ԭ�б�

���������
  sourceobj��ԭ�б�
  destinationobj��Ŀ���б�
************************************************************************/

function moveitemsbetween(sourceobj,destinationobj)
{
  var counter
  for (counter=0;counter<sourceobj.length;counter++)
  {
    if (sourceobj.options[counter].selected)
    {
      destinationobj.options[destinationobj.length]= new Option(sourceobj.options[counter].text, sourceobj.options[counter].value);
    }
  }

  for (counter=sourceobj.length-1;counter>=0;counter--)
  {
    if ( sourceobj.options[counter].selected)
    {
      sourceobj.options[counter] = null
    }
  }
}
/////////////////////////////////////////////////////////////////////////
/* ���select �е�����option */
function removeAllOption(oSelect){
  var j = oSelect.options.length;
  for(var i=0;i<j;i++) oSelect.remove(0);
}

/* �����µ�option */
function getSelOption(value1,text1){
  return new Option(text1,value1);
/*
  var option = document.createElement("OPTION");
  option.value = value1;
  option.text  = text1;
  return option;
*/
}
/* ɾ��ѡ�е�option */
function selOptionDel(destSelObj){
  if(destSelObj.selectedIndex==-1)
    alert("��ѡ��Ҫ���������ݣ�");
  else
    destSelObj.remove(destSelObj.selectedIndex);
}

/* ���Ӳ��ظ���option */
function selOptionDistAdd(destSelObj, value1, text1){
  var destSelObjA = destSelObj.options;
  for(var i=0; i<destSelObjA.length; i++){
    if(destSelObjA[i].value==value1){
      alert("�Ѿ����ڸ�����,�����ظ�ѡ�룡"); return true;
    }
  }
  destSelObj.add(getSelOption(value1,text1));
}

/* �ƶ�select���ݵ�Ŀ��select */
function selOptionMove(souSelObj,destSelObj){
  var souSelIndex = souSelObj.selectedIndex;
  if(souSelIndex==-1){
    alert("û��ѡ������Դ,����ѡ�룡"); return false;
  }
  var souValue = souSelObj.value;
  var destOptionA = destSelObj.options;
  for(var i=0; i<destOptionA.length; i++){
    if(destOptionA[i].value==souValue){
      alert("�Ѿ����ڸ�����,�����ظ�ѡ�룡"); return true;
    }
  }
  destSelObj.add(getSelOption(souValue, souSelObj.options[souSelIndex].text));
}

//////////////////////////////////////////////////////////////////////////
/* ��ʼ���ȴ� */
function initProgressWait(){
  document.write("<div id='progressW' style=\"position:absolute;display:none;top:10;left:10;border: 1px black solid;padding:3px 3px 3px 3px;background-color:#FFFFFF;font-size: 80%;z-index:1\"><NOBR><img src='/EOMSPROJ/images/icon/waitProgress.gif' align='texttop'>���Ժ�������������...</NOBR></div>");
}

/* ��ʼ�����ڵȴ� */
function  prsTopWaitStart(){
/*with(document.all.progressW.style){pixelLeft = parseInt(main.event.screenX)-3;pixelTop  = parseInt(main.event.screenY)-25;display   = "block";}*/
}
/* ��ʼ�����ڵȴ� */
function  prsWaitStart(ObjP){
/*with(document.all.progressW.style){pixelLeft = event.clientX;pixelTop  = event.clientY + document.body.scrollTop;display   = "block";}*/
}
/* �����ȴ� */
function prsWaitEnd(ObjP){
/*document.all.progressW.style.display = "none";*/
}
/* ��ť���ȴ� */
function cursorWait(ObjP){
 ObjP.style.cursor = "wait";
 ObjP.onmouseup = function(){this.style.cursor='default'};
}
//////////////////////////////////////////////////////////////
/* ���������Ƿ�������� */
function contain_value(str){
  var len = this.length;
  for(var i=0; i<len; i++){
   if(this[i]==str) return true;
  }
  return false;
}
Array.prototype.contains = contain_value;

/////////////////////////////////////////////////////
/*************************************************************************
�������ƣ�formatDateStr
����˵�����������ʱ�����ͱ���ת����ָ�����ַ�����ʽ,���صĸ�ʽΪ��YYYY-MM-DD HH:MI:SS
���������
  date�������ʱ�����ͱ���
���������
  str���������ַ������ͱ���
************************************************************************/
function formatDateStr(date)
{
  try{
    var str="";
    str=date.getFullYear()+"-";
    str+=(((date.getMonth()+1)>=10)? (date.getMonth()+1):"0"+(date.getMonth()+1))+"-";
    str+=(date.getDate()>=10)? date.getDate():"0"+date.getDate();
    str+=" ";
    str+=((date.getHours()>=10)? date.getHours():"0"+date.getHours())+":";
    str+=((date.getMinutes()>=10)? date.getMinutes():"0"+date.getMinutes())+":";
    str+=(date.getSeconds()>=10)? date.getSeconds():"0"+date.getSeconds();
    return str;
  }catch(e){
    throw e;
  }
}

/* ����·����� */
function getRealDays(year,month){
  var daysInMonth = new Array(31, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
  if (2 == month)
    return ((0 == year % 4) && (0 != (year % 100))) || (0 == year % 400) ? 29 : 28;
  else
    return daysInMonth[month];
}

/* �·ݣ�����·ݵ�����
���������  weekNum �ܼ� ����Ϊ0
����ֵ�� һ�����ܼ�������

���Դ��룺
    var tmpArr = getDayofWeekArr(2004,9,2);
    for(var i=0;i<tmpArr.length;i++){
      document.write(tmpArr[i] +"<br>");
    }
*/
function getDayofWeekArr(year1,month1,weekNum){
  var dayofWeekArr = new Array();
  var numofMonth = parseInt(getRealDays(year1,month1))+1;
  var firstDayWeek = (new Date(year1,(month1-1),1)).getDay();
  var firstWeekNum =((firstDayWeek-weekNum)>0)?(8+weekNum-firstDayWeek):(1+weekNum-firstDayWeek);
  for(var i=firstWeekNum;i<numofMonth;i+=7)
    dayofWeekArr[dayofWeekArr.length]=i;

  return dayofWeekArr;
}

/* ������� */
function getYearStr(selectObj,num1){
  var MIN = 2004;
  var MAX = 2016;
  ////
  for(i=MIN; i<MAX; i++){
    selectObj.add(getSelOption(i,i));
  }
  selectObj.value = (new Date()).getUTCFullYear();
}

/* �·ݵ����� */
function getMonthStr(selectObj,num1){
  var MIN = 1;
  var MAX = 13;
  ////
  for(i=MIN; i<MAX; i++){
     selectObj.add(getSelOption(((i>9)?i:"0"+i),i));
  }
  selectObj.value = (new Date()).getMonth() + 1;
}

/*************************************************************************
�������ƣ�trim
����˵������������ַ�����ǰ��ո�ȥ��
���������
  str��������ַ���
����ֵ��
    ȥ����ǰ��ո���ַ���

************************************************************************/
function trim(str){
  return str.replace(/(^\s*)|(\s*$)/g, "");
}
/*************************************************************************
�������ƣ�show_props
����˵������ʾһ����������е��ֶ��Լ��ֶ�ֵ
���������
  obj������
����ֵ��
    �����ÿ���ֶ�ֵ
************************************************************************/
function show_props(obj, obj_name) {
  var result = ""
  for (var i in obj)
  result += obj_name + "." + i + " = " + obj[i] + "\n"
  return result
}


/*********************************************************************************
  �������ƣ�checkInt
  ����˵������������Ƿ�Ϊ���֣��Ѱ���ȥ���ַ���ǰ��Ŀո�Ĺ��ܣ�
  ���������numString����Ҫת�����ַ���

  �����������ʽ��ȷ����������ʽ����NaN�����ڳ������� if(isNaN(val)) return; �жϣ�
  �������ڣ�2004-06-17
  ��    �ߣ��� ��
*********************************************************************************/
function checkInt(numString)
{
  //ȥ��ǰ��ո�
  numString=trim(numString);
  if(numString == "")
  {
    ErrorHandle("�������", 2, 1, "������������", null);
    return NaN;
  }
  if(!isCharsInBag(numString, INT_NUM))
  {
    ErrorHandle("�������", 2, 1, "������������", null);
    return NaN;
  }
  var val = parseInt(numString);
  if(val>g_nMax || val<g_nMin)
  {
    ErrorHandle("�������", 2, 1, "����ֵ�������"+g_nMin+"��С��"+g_nMax, null);
    return NaN;
  }
  return val;
}

/*********************************************************************************
  �������ƣ�CheckFloat
  ����˵������������Ƿ�Ϊ���������Ѱ���ȥ���ַ���ǰ��Ŀո�Ĺ��ܣ�
  ���������numString����Ҫת�����ַ���

  �����������ʽ��ȷ������������ʽ����NaN�����ڳ������� if(isNaN(val)) return; �жϣ�
  �������ڣ�2004-06-17
  ��    �ߣ��� ��
*********************************************************************************/
function CheckFloat(numString)
{
  //ȥ��ǰ��ո�
  numString=trim(numString);
  if(numString == "")
  {
    ErrorHandle("�������", 3, 1, "����һ����������Ƿ�Ϊ��������", null);
    return NaN;
  }
  if(!isCharsInBag(numString, FLOAT_NUM))
  {
    ErrorHandle("�������", 3, 1, "����һ����������Ƿ�Ϊ��������", null);
    return NaN;
  }
  var val = parseFloat(numString);
  if(val>g_nMax || val<g_nMin)
  {
    ErrorHandle("�������", 3, 1, "����ֵ�������"+g_nMin+"��С��"+g_nMax, null);
    return NaN;

  }
  return val;
}

//������ݣ��Ƿ�ȫ��Ϊ �涨�ĸ�ʽ����
function isCharsInBag(s,bag)
{
  var i;

  for(i=0; i<s.length; i++)
  {
    var c = s.charAt(i);
    if(bag.indexOf(c)==-1)
    {
      return false;
    }
  }
  return true;
}



/*************************************************************************
����˵�������ݴ���������������������

����Ҫ��Ҫ������ڵ��ID������Ψһ��

���������
  drpId  ������������
  arrObj  ��������������������

���������
    �ޣ�
************************************************************************/
function CertType_Init(drpId,arrObj)
{
  if (drpId.tagName!="SELECT")
    return false;
  drpId.length=0;
  for (i = 0; i < arrObj.length; i++)
  {
    var option = document.createElement("OPTION");
    option.text = arrObj[i].text;
    option.value = arrObj[i].id;
    drpId.add(option);
  }
}

/*************************************************************************
����˵�������ݴ�������֤������֤�������Ч��

����Ҫ��Ŀǰֻ�����֤������֤

���������
  certNbr�����֤����

���������
    -1:���֤���Ȳ��ԣ�
    -2:��ȡ����������
    -3:������Ч������
    -4:����ִ���쳣
************************************************************************/
function AdjustCertnbr(certNbr)
{
  try
  {
    if (certNbr.length!=15 && certNbr.length!=18)
    {
      return -1;
    }
    var birYear,birMonth,birDay,certDate;
    if (certNbr.length==15)
    {
      certDate="19"+certNbr.substr(6,6);
    }
    else
    {
      certDate=certNbr.substr(6,8);
    }

    try
    {
      if (isNaN(certDate.substr(0,4)))
      {
        throw "";
      }
      if (isNaN(certNbr.substr(4,2)))
      {
        throw "";
      }
      if (isNaN(certNbr.substr(6,2)))
      {
        throw "";
      }
      var birYear=parseInt(certDate.substr(0,4),10);
      var birMonth=parseInt(certDate.substr(4,2),10);
      var birDay=parseInt(certDate.substr(6,2),10);
    }
    catch(e)
    {
      return -2;
    }

    try
    {
      var date1=new Date();
      var nowDate=formatDateStr(date1);
      //��֤����ʱ������
      var birDate=""+birYear;
      if (birMonth<10)
      {
        birDate+="-0"+birMonth;
      }
      else
      {
        birDate+="-"+birMonth;
      }

      if (birDay<10)
      {
        birDate+="-0"+birDay+" 00:00:00";
      }
      else
      {
        birDate+="-"+birDay+" 00:00:00";
      }

      if (birDate>nowDate)
      {
        throw "";
      }

      var nowYear=date1.getFullYear();
      //��֤��ʱ������
      if (birYear>nowYear || birYear<nowYear-100)
      {
        throw "";
      }

      //��֤��ʱ������
      if (birMonth>12 || birMonth<1)
      {
        throw "";
      }

      var maxDay=getMonthDay(birYear,birMonth);
      if (birDay>maxDay || birDay <1)
      {
        throw "";
      }
    }
    catch(e)
    {
      return -3;
    }
    return 0;//��������

  }
  catch(e1)
  {
    return -4;
  }
}

/*************************************************************************
����˵�������ݴ�����ꡢ�µõ��������������
���������year���������  mon  ���������
************************************************************************/
function getMonthDay(year,mon){
  var dayNum;
  switch(mon)
  {
    case 1:
    case 3:
    case 5:
    case 7:
    case 8:
    case 10:
    case 12:
      dayNum=31;
      break;
    case 4:
    case 6:
    case 9:
    case 11:
      dayNum=30;
      break;
    case 2:
      dayNum = ((year % 400==0) || ((year % 4==0) && (year % 100!=0)))?29:28;
      break;
    default:
      dayNum =31;
      break;
  }
  return dayNum;
}

/* ʱ��ƻ� ���� ��ʶ���Ƿ� ���������� */
function getWeekEndMark(year1,month1,day1){
  if(month1==-1){
    year1--; month1=11;
  }
  var weekNum = (new Date(year1, month1, day1)).getDay();
  return (weekNum==6||weekNum==0)?true:false;
}

/*************************************************************************
����˵�������ڴ��������Ƚ��������ڵ��������
���������
  startDay��date
        endDay:date
************************************************************************/
function elapsedTime(startDay,endDay){
   dStartDay = new Date(startDay);
   dEndDay = new Date(endDay);

   interval = dEndDay.getTime() - dStartDay.getTime(); // Difference in ms.

   // Establish larger units based on milliseconds.
   msecondsPerMinute = 1000 * 60;
   msecondsPerHour = msecondsPerMinute * 60;
   msecondsPerDay = msecondsPerHour * 24;

   // Calculate how many days the interval contains, then subtract that
   // many days from the interval to come up with a remainder.
   days = Math.floor( interval / msecondsPerDay );
   interval = interval - (days * msecondsPerDay );

   // Repeat the previous calculation on the remainder using hours,
   // then subtract the hours from the remainder.
   hours = Math.floor( interval / msecondsPerHour );
   interval = interval - (hours * msecondsPerHour );

   minutes = Math.floor( interval / msecondsPerMinute );
   interval = interval - (minutes * msecondsPerMinute );

   seconds = Math.floor( interval / 1000 );

   msg = "Total = " + days + " days, " + hours + " hours, " + minutes +
      " minutes, and " + seconds + " seconds.";
 // alert(days);
   return days;
}

/*************************************************************************
����˵�������ڴ�������������ڵ��ַ������ʽ
����Ҫ��
���������
  today��date
************************************************************************/
function getDateString(today){
  if(today==null || today==""){
    return "";
  }else{
    todayStr = "" + today.getFullYear()+"-";
    if (today.getMonth() < 9)
      todayStr += "0";
    todayStr +=  (today.getMonth() + 1)+"-";
    if (today.getDate() < 10)
      todayStr += "0";
    todayStr += today.getDate();

    return todayStr;
  }
}
/*************************************************************************
����˵�������ڴ�������parseDate
����Ҫ��
���������
  str��2004-02-01
************************************************************************/

function exParseDate(str){
  var yearStr =  str.substring(0,4);
  var monthStr  = str.substring(5,7);
  var dayStr  =  str.substring(8,10);
  var dDay = new Date(yearStr,monthStr-1,dayStr);
   return dDay;
}

/*************************************************************************
����˵�������ڴ�������exParseDateTime
����Ҫ��
���������
  str��2004-02-01 11:12:11
���������
  ���ں�ʱ��
************************************************************************/
function exParseDateTime(str)
{
  var yearStr =  str.substring(0,4);
  var monthStr  = str.substring(5,7);
  var dayStr  =  str.substring(8,10);
  var hourStr = str.substring(11,13);
  var minStr = str.substring(14,16);
  var secStr = str.substring(17,19);
  var dDay = new Date(yearStr,monthStr-1,dayStr,hourStr,minStr,secStr);
  return dDay;
}


/* �����ַ�������ʱ��
parameter��date
*/
function dateToString(d){
  if(d==null || d=="")
    return "";
  else
    return d.getFullYear() +"-"+ atrZeroAdd(d.getMonth()+1) +"-"+ atrZeroAdd(d.getDate()) +" "+ atrZeroAdd(d.getHours()) +":"+ atrZeroAdd(d.getMinutes()) +":"+ atrZeroAdd(d.getSeconds());
}
/* �����ַ���û��ʱ�� */
function getDateString(d){
  if(d==null || d=="")
    return "";
  else
    return d.getFullYear() +"-"+ atrZeroAdd(d.getMonth()+1) +"-"+ atrZeroAdd(d.getDate());
}
function  atrZeroAdd(s){
  s =("0"+s);
  return s.substr(s.length-2);
}
/*********************************************************************************
�������ƣ�setNode
����˵����treeview����λĳһ�ڵ㣨������ֻ�������������ڵ㶨λ��
���������
        treeViewDiv��treeView��Id����
        propertyName:treeViewĳһ�ڵ��ĳһ����ֵ
        sValue����λ�ڵ��propertyNameֵ
���������
  ��
*********************************************************************************/
  function setNode(treeViewDiv,propertyName,sValue)
  {
    var sNode = eval(treeViewDiv).getChildren();
    if(sNode.length>0)
    {
      for(var i=0;i<sNode.length;i++)
      {
        var sChildNode=sNode[i].getChildren();
        if(sChildNode.length>0)
        {
          for(var j=0;j<sChildNode.length;j++)
          {
            if(sChildNode[j].getAttribute(propertyName)==sValue)
            {
              sChildNode[j].refresh();
              sChildNode[j].setSelected();
              break;
            }
          }
        }
      }
    }
  }
/////////////////////////////////////////////////////////////////////////////
/*
������Ĳ������п��� �����¡����
parameter��(objFrom) ��Ҫ�������������
return   �����ƵĶ���
*/
function copyObject(objFrom){
  var objTo=null;
  if(objFrom==null) return objTo;

  switch(objFrom.typeName){
    case "number":
    case "boolean":
    case "string":
    case "date":
      objTo=objFrom;
      break;
    case "object":
      objTo=new Object();
      for(var key in objFrom){
        objTo[key] = copyObject(objFrom[key]);
      }
      break;
    case "array":
      objTo=new Array();
      for(var i=0;i<objFrom.length;i++){
        objTo[objTo.length]=copyObject(objFrom[i]);
      }
    break;
  }
  return objTo;
}

/*
�������� w h ������
������url(������ַ)   height(�߶�)    width(���)
*/
function openWin(url,height,width){
  window.open(url,'',"height="+ height +",width="+ width +",left=100,top=70,resizable=yes,scrollbars=yes,status=no,toolbar=no,menubar=no,location=no");
}
function openPosiWin(url,height,width,top,left){
  window.open(url,'',"height="+ height +",width="+ width +",left="+ left +",top="+ top +",resizable=yes,scrollbars=yes,status=no,toolbar=no,menubar=no,location=no");
}

/* �������ڴ��ڣ������� */
function openNameWin(url,height,width,winName){
  window.open(url,winName,"height="+ height +",width="+ width +",left=100,top=70,resizable=yes,scrollbars=yes,status=no,toolbar=no,menubar=no,location=no");
}
function openPosiNameWin(url,height,width,top,left,winName){
  window.open(url,winName,"height="+ height +",width="+ width +",left="+ left +",top="+ top +",resizable=yes,scrollbars=yes,status=no,toolbar=no,menubar=no,location=no");
}

/* �������ڴ��ڣ�������, ���ܸı��С */
function openNameNoSWin(url,height,width,winName){
  window.open(url,winName,"height="+ height +",width="+ width +",left=100,top=70,resizable=no,scrollbars=yes,status=no,toolbar=no,menubar=no,location=no");
}

/* ����ģ̬�Ի��򣬷��ض��� */
function openShowDlg(url, height, width, obj1){
  return window.showModalDialog(url, obj1, "dialogWidth:"+ width +"px;dialogHeight:"+ height +"px;");
}

/* �������ӡ���� */
function exportPrint(tlvNameP,modeP){
  openPosiNameWin(gWebAbsPath+"/inc/helper/ExportPrint.htm?tlnm="+ tlvNameP +"&mode="+ modeP, window.screen.availHeight-103, window.screen.availWidth-10, "77px", "0px", "pr1");
}
function exportExcel(tlvNameP,modeP){
  openPosiNameWin(gWebAbsPath+"/inc/helper/ExportExcel.htm?tlnm="+ tlvNameP +"&mode="+ modeP, window.screen.availHeight-103, window.screen.availWidth-10, "77px", "0px", "pr1");
}
/*��ȡ��ѯ�ַ�������ֵ
param ����
*/
function getUrlParameter(param){
  var url=window.location.search;
  var pos1=0,pos2=0;
  var strReturn="";
  pos1=url.indexOf("&"+param+"=");
  if(pos1==-1) pos1=url.indexOf("?"+param+"=");
  if(pos1==-1){
    return;
  }else{
    pos2=url.indexOf("&",pos1+1);
    if(pos2==-1)pos2=url.length;
    var strReturn=url.substring(pos1+param.length+2,pos2);
    strReturn=unescape(strReturn);
    return strReturn;
  }
}

/*����ַ�Ϊnull���滻 */
function nullRepl(inStr, repStr){
  return (inStr==null)?repStr:inStr;
}

/*����ַ����Ƿ�Ϊ��*/
function isNull(inStr){
  return (inStr==null||inStr=="") ? true : false;
}

/* �����ʲô�ַ����滻Ϊ�ַ�
����  inStr(�ַ���), orgStr�������ַ���, repStr���滻�ַ���
*/
function strRepl(inStr,orgStr, repStr){
  return (inStr==orgStr)?repStr:inStr;
}

/* ҳ���ʼ������ͼƬ */
function preloadInitImg(){
  imgsA = document.images;
  if(!imgsA) imgsA = new Array();
  var len = imgsA.length,argsA = preloadInitImg.arguments;
  for(var i=0;i<argsA.length;i++){
    imgsA[len] = new Image;imgsA[len++].src=argsA[i];
  }
}

/* ת���س��Ϳո�ǰ̨ */
function turnEncode(str){
  if(str==null) return "";
  while(str.indexOf(" ")!=-1){
    str=str.substring(0,str.indexOf(" "))+"&nbsp"+str.substring(str.indexOf(" ")+1);
  }
  return str;
}

/* �滻�س� */
function ch13Encode(str){
  return (str==null)? "" : str.replace(/ /g, "~").replace(/\n/g, "��");
}

/* ��ԭ�س� */
function ch13Decode(str){
  return (str==null)? "" : str.replace(/~/g, " ").replace(/��/g, "\n");
}

/* �滻html�ַ� */
function htmlEncoding(str){
  var dq = "\u0022";//˫����
  var sq = "\u0027";//������
  var tq = "\u005c";//��б��
  var eq = "\u003d";//����
  var lq = "\u003c";//С��
  var gq = "\u003e";//����

  str = str.replace("\"", dq);
  str = str.replace("'", sq);
  str = str.replace("\\", tq);
  str = str.replace("=", eq);
  str = str.replace("<", "&lt;");
  str = str.replace(">", "&gt;");
  return str;
}
////////////////////////////////////////////////////////////////////////////////////////////
/* ���table�б��������� */
function clearTableRows(tbl){
  while (tbl.rows.length > 1){
    tbl.deleteRow(tbl.rows.length-1);
  }
}

/* ���Ԫ�����ڵ��� */
function getRow(elm){
  return (elm==null)? null : ((elm.tagName=="TR")? elm : getRow(elm.parentElement));
}

/* ���Ԫ�����ڵ�Ԫ�� */
function getCell(elm){
  return (elm==null)? null : ((elm.tagName=="TD")? elm : getCell(elm.parentElement));
}

function ExecWait(func,mst){
	__func_=func;
	document.all.p_o_p_9.style.display="";
	gTimeout=window.setTimeout(_ExecWait_,mst||500);
};
function _ExecWait_(){
	try{eval(__func_);
	}catch(e){
		alert("__func_:" + __func_ + ";_ExecWait_" + e.message);
	}finally{
		window.clearTimeout(gTimeout);
		document.all.p_o_p_9.style.display="none";
	}
}
//�����ֽ�����������
function f_round(v,e){ 
	var t=1; 
	for(;e>0;t*=10,e--); 
	for(;e<0;t/=10,e++); 
	return Math.round(v*t)/t; 
} 

//-->
