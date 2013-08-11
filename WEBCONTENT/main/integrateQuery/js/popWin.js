/*
 * 
 * 	本文件主要存放选择选择条件时所弹出的查询页面所使用的公共方法
 * 
 * 
 */

function _dataItemDbClick(idstr){
	window.returnValue=idstr;
	window.close();		 
}

function isEnter(evt){
	if(13==evt){
		document.getElementById("queryBtn").click();
	}
}


function okBtnClick(grid){
	var id=grid.getSelectedId();
	if(!id||id==""){
		alert("请选择一条数据，然后点击\"确定\"。");
		return;
	}
	var itemRow=grid.getRowById(parseInt(id));
	window.returnValue=itemRow.grid.gridDataArray[itemRow.idd-1];
	window.close();	
}
/*
 * 2010-1-28 added by qian.shengyue
 * id:页面控件Ｉd
 * list:数值列表
 * txtName:option的文本对应list[x]的字段名
 * valName:option的值对应list[x]的字段名
 */
function setSelecttion(id,list,txtName,valName){
	var selObj=document.getElementById(id);
	if(!selObj||!list||!list.length)return;
	for(var i=0;i<list.length;i++)
		var opt=selObj.options.add(new Option(list[i][valName],list[i][txtName]));

}

/*
 * 设置默认选择的option	added by qian.shengyue
 */
function setDefaultSel(id,optTxt){
	var selObj=document.getElementById(id);
	if(!selObj)return;
	for(var i=0;i<selObj.options.length;i++){
        if(selObj.options[i].text==optTxt){
            selObj.options[i].selected=true;
            return i;
        }		
	}
}