/************************************************************************************************************
						上海联通 综合查询服务
	Copyright (C) October 2009  ztesoft

	ZTEsoft, 2009
	Owner of www.ztesoft.com.cn

* 
* 本文件中的函数为resultPage.htm专用
************************************************************************************************************/
/*
 * 查询结果Tab标签点击
 */
function setTabClick(){
	showTab("results_tabView",this.id.replace(/[^0-9]/gi,''));
	//clearCheckId();
	return;
}

function _dataItemDbClick(idstr){
	window.parent.frames[2].showDetail(idstr);
	window.parent.document.all.imgBottom.src="../../images/btn/arrow_up.gif";
	window.parent.document.all.detailTD.style.display="";
	// 查询文本路由与相关详情
	return 1;		 	
}

/*
 * 加载数据
 */
function loadGrid(map){//利用回调函数获得后台查询数据的状态
	 var currentGrid=tabId2Grid[parseInt(activeTabIndex["results_tabView"])];
	 if(map&&map.list){
	 	if(map.list.length){
		 	currentGrid.loadByData(map.list);
			//currentGrid.setSelectedRow(currentGrid.getRowId(0));
		}else{
			//清空列表;
			if(currentGrid.allItems&&currentGrid.allItems.length){
				for(var i=currentGrid.allItems.length-1;i>-1;i--)currentGrid.allItems[i].remove();
			}
		}
		dataList.maxPageNo=map.pageCount;
		dataList.total=map.recordCount;	 	
	 }else{
	 	dataList.maxPageNo=0;
	 	dataList.total=0;
	 }
	
	document.all.pageInfoSpan.innerHTML="每页<input type='text' style='height:12px;width:12px' id='pageCount' value='"+dataList.count+"'>条 总共"+dataList.total+"条 第"+dataList.pageNo+"/"+dataList.maxPageNo+"页";
	//clearCheckId();
	document.getElementById("coverdiv-loading").style.display="none";
	return 1;
}

/////////////////////////////////////////////////////////////////////////////////////
function clearContion(){
	window.parent.frames[0].clearCondition();
}

function doOnCheck(rowId,cellId,state){
	if(!state&&checkedId.hasOwnProperty(rowId.toString())){
		delete checkedId[rowId];
		checkedId.hasNum--;
	}else{
		checkedId[rowId]=1;
		checkedId.hasNum++;
	}
	//同时显示相互查询的按钮


	if(checkedId.hasNum)document.getElementById("interBtn").disabled=false;
	else document.getElementById("interBtn").disabled=true;
	return 0;
}

function clearCheckId(){
	var currentGrid=tabId2Grid[1-parseInt(activeTabIndex["results_tabView"])];//跳转之前的tab
	for(key in checkedId){
		if(key=="hasNum")continue;
		currentGrid.cells4(currentGrid.cells(parseInt(key),0).cell).setValue("0");
		delete checkedId[key];
	}
	checkedId.hasNum=0;
	document.getElementById("interBtn").disabled=true;
	return;
}

function setDisplay(){
	//document.cookie="showStr="+escape(form.username.value)+ "; path=" + "/" +"; _domain=" + "mydomain.com" + "; secure";
	document.cookie="showStr='block,block,block'";
}

// 定义一个函数，用来读取特定的cookie值。
function getCookie(cookie_name){
	var allcookies = document.cookie;
	var cookie_pos = allcookies.indexOf(cookie_name);
	// 如果找到了索引，就代表cookie存在，
	// 反之，就说明不存在。
	if (cookie_pos != -1)
	{
	// 把cookie_pos放在值的开始，只要给值加1即可。
	cookie_pos += cookie_name.length + 1;
	var cookie_end = allcookies.indexOf(";", cookie_pos);
	if (cookie_end ==-1)
	{
		cookie_end = allcookies.length;
	}
	var value = unescape(allcookies.substring(cookie_pos, cookie_end));
	}
	return value;
}