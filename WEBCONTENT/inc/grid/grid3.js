/**
 * @author song.wenguang
 * @classDescription 重新安排代码结构，主要是载入数据部分
 */

/*
 * Class constructor 
 */
var Class = {   
    create: function() {   
        return function() {   
            this.initialize.apply(this, arguments);   
        }   
    }   
}

//instantiation Grid Class
var Grid = Class.create();

/************************************************************/

/*
 * get the type of Browser
 */
var getBrowserType = function (){
    var cb = "Unknown";
	var nav = navigator.userAgent.toLowerCase();
    if(window.ActiveXObject){
        cb = "IE";
    }else if(nav.indexOf("firefox") != -1){
        cb = "Firefox";
    }else if((typeof document.implementation != "undefined") && (typeof document.implementation.createDocument != "undefined") && (typeof HTMLDocument != "undefined")){
        cb = "Mozilla";
    }else if(nav.indexOf("opera") != -1){
        cb = "Opera";
    }
    return cb;
}

var insertHTMLBeforeEnd = function (oElement, sHTML) {
	if (oElement.insertAdjacentHTML != null) {
		oElement.insertAdjacentHTML("BeforeEnd", sHTML);
		return;
	}
	var df;	// DocumentFragment
	var r = oElement.ownerDocument.createRange();
	r.selectNodeContents(oElement);
	r.collapse(false);
	df = r.createContextualFragment(sHTML);
	oElement.appendChild(df);
}

var getSrcElement = function(event,tagName){
	var eleSrc = event.srcElement || event.target;
	if(!tagName)return eleSrc;
	while(eleSrc.tagName != tagName)eleSrc = eleSrc.parentNode;
	return eleSrc;
}

var getEvent = function(evt){
	var objEvt = new Object();
    if (evt.offsetX == undefined) {
        var evtOffsets = getOffset(evt);
        objEvt.offsetX = evtOffsets.offsetX;
        objEvt.offsetY = evtOffsets.offsetY;
        objEvt.clientX = evtOffsets.clientX;
        objEvt.clientY = evtOffsets.clientY;
        return objEvt;
    }
    else return evt;
}

var getOffset = function(evt){
	 var target = evt.target;
    if (target.offsetLeft == undefined) {
        target = target.parentNode;
    }
    var pageCoord = getPageCoord(target);
    var eventCoord = {
        x: window.pageXOffset + evt.clientX,
        y: window.pageYOffset + evt.clientY
    };
    var offset = {
        offsetX: eventCoord.x - pageCoord.x,
        offsetY: eventCoord.y - pageCoord.y,
//            clientX: eventCoord.x,
//            clientY: eventCoord.y
		clientX: evt.clientX,
        clientY: evt.clientY
    };
    return offset;
}

var getPageCoord = function(element){
	var coord = {
        x: 0,
        y: 0
    };
    while (element) {
        coord.x += element.offsetLeft;
        coord.y += element.offsetTop;
        element = element.offsetParent;
    }
    return coord;
}

var createTag = function(tagName){return document.createElement(tagName);}
	
	
var	parseXml = function(data, type){
    var o,suffixs=[".4.0",".3.0",".2.0",""];
    if (window.ActiveXObject){ 
	    for(var i=0;i<suffixs.length;i++){
	        try{
		        o=new ActiveXObject("msxml2.DOMDocument"+suffixs[i]);
		        break;
	        }catch(ex){};
        }
	    o.async="false";
	    o.validateOnParse="false";
	    o.resolveExternals="false";
		if (type == "text") {
			o.loadXML(data);
		}
		if (type == "file") {
		    o.load(data);
		}
	}else{
		if(type == "text"){
			var oParser = new DOMParser();
            o = oParser.parseFromString(data,"text/xml");   
		}
		if (type == "file") {
		    o = document.implementation.createDocument("", "", null);
	        o.async = false; 
			o.preserveWhiteSpace=true; 
	        o.load(data);
		}
	}
    return o;
}

var parseData = function(pData){
	var oData;
	if(!pData)return null;
	if(typeof(pData) == "string"){
		if(pData.substring(pData.length-4,pData.length) == ".xml"){
            var xmlDoc = parseXml(pData, "file");
//                xmlDoc.load(pData);
		}else{
            var xmlDoc = parseXml(pData, "text");
//                xmlDoc.loadXML(pData);
		}
		oData = xmlDoc.getElementsByTagName("item");
	}else{
		oData = pData;
	}
	return oData;
}

/************************************************************/

//Splitpane class
var Splitpane = function(grid){
	this.owner = grid;
	this.target;
	this.cell;
	this.left;
}

Splitpane.prototype.make = function(pLeft, pTop, pHeight, cell){
	var oSplitpane = createTag("DIV");
    oSplitpane.id = "splitpane";
    oSplitpane.className = "split"; 
    oSplitpane.style.top = pTop;
    oSplitpane.style.left = pLeft;
    oSplitpane.style.height = pHeight;
    document.body.appendChild(oSplitpane);
	this.owner.splitpane = this;
	this.target = oSplitpane;
	this.left = pLeft;
    if (cell.style.display == "none") this.cell = cell.previousSibling;
    else this.cell = cell;
}

//GridOutline class
var GridOutline = function(grid){
	this.owner = grid;
}

GridOutline.prototype.onScroll = function(){
	var grid = this.owner;
	var src = getSrcElement(event);
	var tip = $("tipDiv"+grid.id);
	var nav = $("navDiv"+grid.id);
	var head = $("headDiv"+grid.id);
	var obody = $("bodyDiv"+grid.id);
	head.style.left = (tip.style.display == "none") ? (-src.scrollLeft+"px"):($(tip).getWidth()-src.scrollLeft+"px");
	nav.style.top = head.getHeight() - src.scrollTop + "px";
	nav.style.height = src.scrollTop + obody.clientHeight + "px"; 
}

GridOutline.prototype.onContextmenu = function(){
	var grid = this.owner;
	var src = getSrcElement(event);
	var evt = getEvent(event);
	if(src.tagName == "TD" || src.tagName == "TR"){
	    var src = getSrcElement(event,"TR");			
		grid.render(src);
		if(grid.onContextmenu)grid.onContextmenu(this.getData(), evt);
	}
	else if(src.tagName == "DIV"){
		if(grid.onContextmenu)grid.onContextmenu(null, evt);
	}
	else return;
}

GridOutline.prototype.onTipDblclick = function(){
	var grid = this.owner;
	var nav = $("navDiv"+grid.options.id);
	nav.firstChild.checked = !nav.firstChild.checked;
	if(grid.options.showCheckbox){
		var col = nav.getElementsByTagName("INPUT");
        for (var i = 0, o; o = col[i]; i++) {
			if(col[i].type == "checkbox")col[i].checked = nav.firstChild.checked;
        }
	}
}

GridOutline.prototype.toString = function(){
	var grid = this.owner;
	var suffixId = grid.id;
	var imgPath = grid.options.imgPath;
	var str = '<div id="headDiv'+suffixId+'" class="headDiv" style="background-image:url('+imgPath+'grid-hrow.gif);"></div>'
							+'<div id="bodyDiv'+suffixId+'" class="bodyDiv" onselectstart=event.returnValue=false;><div id="contDiv'+suffixId+'" class="contDiv"></div></div>'
			   				+'<div id="footDiv'+suffixId+'" class="footDiv" style="background-image:url('+imgPath+'foot-bg.gif);"></div>'
							+'<div id="navDiv'+suffixId+'" class="navDiv" style="background-image:url('+imgPath + 'special-col-bg.gif);"></div>'
							+'<div id="tipDiv'+suffixId+'" class="tipDiv" style="background-image:url('+imgPath+'grid-hrow.gif);"><input type="checkbox"></div>';
	return str;
}

//GridTitle class
var GridTitle = function(grid){
	this.owner = grid;
}

GridTitle.prototype.onMousemove = function(){
	var grid = this.owner;
	var eleSrc = getSrcElement(event,"TD");
	var evt = getEvent(event);
	if(grid.splitpane != null)
	{
	    $(grid.options.id).style.cursor = "col-resize";
	  	return;
	  	}
	if(evt.offsetX < 2 && eleSrc.cellIndex == 0)return;		
	if(evt.offsetX < 2 || evt.offsetX > $(eleSrc).getWidth()-4)
        eleSrc.style.cursor = "col-resize"; 
    else 
  	    eleSrc.style.cursor = "default";
}

GridTitle.prototype.onBodyMouseup = function(){
	var grid = this.owner;
	$("headDiv"+grid.options.id).style.cursor = "default";
	$("footDiv"+grid.options.id).style.cursor = "default";
	$("bodyDiv"+grid.options.id).style.cursor = "default";
	$("navDiv"+grid.options.id).style.cursor = "default";
	if (!grid.splitpane) return;
    document.body.removeChild(grid.splitpane.target);
    
    //resize cell width...
    grid.resetCellWidth();
    grid.splitpane = null;
	
    document.ondragstart = function(){return true};
    document.body.onselectstart = function(){return true};
}

GridTitle.prototype.onMousedown = function(){
	document.ondragstart = function(){return false};
    document.body.onselectstart = function(){return false};
    
	var grid = this.owner;
    var eleSrc = getSrcElement(event,"TD");
	var evt = getEvent(event);
    if (eleSrc.style.cursor == "col-resize") {
        var localTop = parseInt(evt.clientY) - evt.offsetY + parseInt(document.body.scrollTop);
        var localHeight = $("bodyDiv" + grid.options.id).clientHeight + $("headDiv" + grid.options.id).getHeight();
        var localLeft = -1;
        if (parseInt(evt.offsetX) > ($(eleSrc).getWidth() - 8)) {
            localLeft = parseInt(evt.clientX) + $(eleSrc).getWidth() - parseInt(evt.offsetX) + document.body.scrollLeft;
        }
        else if (parseInt(evt.offsetX) < 2) {
            eleSrc = eleSrc.previousSibling;
            localLeft = parseInt(evt.clientX) - parseInt(evt.offsetX) + document.body.scrollLeft;
        }
        else return;
		
		var splitpane = new Splitpane(grid);
		splitpane.make(localLeft, localTop, localHeight, eleSrc);
		
		var self = this;
		document.body.onmouseup = function(){self.onBodyMouseup();}
    }
}

GridTitle.prototype.onDblclick = function(){
	//sort...
	var grid = this.owner;
    var src = getSrcElement(event,"TD");
    var index = src.getAttribute("index");
    if(src.style.cursor == "col-resize"){
        //adjust the cell width to max
	    var evt = getEvent(event);
	    if (parseInt(evt.offsetX) < 2) {
	        src = src.previousSibling;
	    }
	    grid.adjustCellMax(src);
	    return;	
    }
    if (!grid.options.titleData[index].sortable) return;
    if ($("contDiv" + grid.id).innerHTML == "") return;
    grid.sortDeal(src);
    grid.showArrow(src);
    grid.lastSortCell = index;
}

GridTitle.prototype.onContextmenu = function(){
	var grid = this.owner;
	var eleSrc = getSrcElement(event,"TD");
    var evt = getEvent(event);
	var top = parseInt(evt.clientY) + document.body.scrollTop + $(eleSrc).getHeight() - evt.offsetY;
	var left = parseInt(evt.clientX) + document.body.scrollLeft - evt.offsetX;
	var columns = [];
	if(eleSrc.style.cursor == "col-resize")return;
	
	if (grid.bt == "Firefox") {
	    top -= 2;
		left += 4;
	}
	
	for(var i=0, obj; obj=grid.options.titleData[i]; i++){
		if(!obj.visible)continue;
		var o = {
			text: obj.text,
			imgUrl: (obj.hidden)?"img/unchecked.gif":"img/checked.gif",
			response: "columns",
			type: i
		};
		columns.push(o);
	}
	
    var pData = [{
		text: "Sort Asc",
		imgUrl: "img/hmenu-asc.gif",
		disabled: !grid.options.titleData[eleSrc.getAttribute("index")].sortable || false,
		response: "sort",
		type: 1
	},{
		text: "Sort Desc",
		imgUrl: "img/hmenu-desc.gif",
		disabled: !grid.options.titleData[eleSrc.getAttribute("index")].sortable || false,
		response: "sort",
		type: 2
	},{
		hr:true
	},{
		text: "Show Line Numbers",
		imgUrl: (grid.options.showSequence)?"img/tick.gif":"",
		response: "nav",
		type: 1
	},{
		text: "Show Check Boxes",
		imgUrl: (grid.options.showCheckbox)?"img/tick.gif":"",
		response: "nav",
		type: 2
	},{
		hr:true
	},{
		text: "Columns",
		imgUrl: "img/columns.gif",
		hasChild: 1,
		child: columns
	},{
		hr:true
	},{
		text: "Export Excel",
		imgUrl: "img/tick.gif",
		response: "export",
		type: 1
	},{
		text: "Export Word",
		imgUrl: "img/tick.gif",
		response: "export",
		type: 2
	}]
    
	if(grid.menu){
		grid.menu.createMenu({top:top, left:left, data:pData});
	}else{
		grid.menu = new Menu({id:"menu", data:pData, top:top, left:left});
	}
	grid.menu.doClick = function(src){
		var response = src.getAttribute("response");
		var type = src.getAttribute("type");
		if(response == null)return;
		if(response == "sort"){
	        grid.options.titleData[eleSrc.cellIndex].asc = (type==1)?true:false;
			grid.doHeadTdDblClick(event,eleSrc);
		}
		if(response == "nav"){
			if(type == 1)grid.options.showSequence = !grid.options.showSequence;
			if(type == 2)grid.options.showCheckbox = !grid.options.showCheckbox;
			grid.showNav();
		}
        if(response == "columns"){
			var hidden = grid.options.titleData[type].hidden;
			if(!hidden)hidden = true;
			else hidden = false;
			grid.columnsControl(type, hidden);
		}
		if(response == "export"){
			switch(type){
				case "1": grid.exportExcel(false);break;
				case "2": grid.exportWord(false);break;
			}
		}
	};
}

GridTitle.prototype.onCtnMousemove = function(){
	var grid = this.owner;
	var eleSrc = getSrcElement(event);
    var evt = getEvent(event);
    if (grid.splitpane != null) {
        if (parseInt(evt.clientX) + document.body.scrollLeft > (grid.splitpane.left - $(grid.splitpane.cell).getWidth() + grid.options.minCellWidth)) 
            grid.splitpane.target.style.left = evt.clientX + document.body.scrollLeft;
		$("headDiv"+grid.options.id).style.cursor = "col-resize";
		$("bodyDiv"+grid.options.id).style.cursor = "col-resize";
		$("footDiv"+grid.options.id).style.cursor = "col-resize";
    }
}

GridTitle.prototype.toString = function(){
	var at = [];
	var ag = [];
	var st = "";
	var grid = this.owner;
	var suffixId = grid.id;
	var className = (grid.bt=="IE")?"col-hidden-IE":"col-hidden-Firefox";
	var tWidth = (!grid.options.showCheckbox && !grid.options.showSequence)?$(suffixId).getWidth():$(suffixId).getWidth() - $("tipDiv"+suffixId).getWidth();
	tWidth -= 2;//除去边框宽度
	st = "<table id='tHead"+suffixId+"' cellpadding='0' cellspacing='0' border='0' style='width:"+tWidth+";' onSelectstart=event.returnValue=false;>";	
	at[at.length] = "<tbody><tr>";
	for(var i=0,col; col=grid.options.titleData[i]; i++){
		at[at.length] = "<td name='"+col.name+"' sortable='"+col.sortable+"' dataType='"+col.dataType+"' index='"+i+"'";
		if(col.visible == null)col.visible = true;
		if(col.visible){
			ag[ag.length] = "<colgroup><col/></colgroup>";
			if(grid.options.adaptOutline){
				at[at.length] = " style='width:"+col.width+"'>"+col.text+"<img align='absmiddle' id='sortImg"+i+suffixId+"' src='' style='display:none;'/></td>"; 
			}else{
				at[at.length] = " style='width:"+col.width+"'>"+col.text+"<img align='absmiddle' id='sortImg"+i+suffixId+"' src='' style='display:none;'/></td>";
			}
		}else{
			ag[ag.length] = "<colgroup class='"+className+"'><col/></colgroup>";
			at[at.length] = " style='width:0px; display:none'>"+col.text+"</td>";
		}
	}
    at[at.length] = "</tr></tbody></table>";
	
	return st + ag.join("") + at.join("");
}

//GridPage class
var GridPage = function(grid){
	this.owner = grid;
	this.page = grid.options.page;
}

GridPage.prototype.toString = function(){
	var grid = this.owner;
	var op = this.page;
	var suffixId = grid.id;
	if(op.pageSize)op.pageCount = Math.ceil(parseInt(op.recordCount)/parseInt(op.pageSize));
	if(!op.recordCount)op.recordCount = "";
	var imgPath = grid.options.imgPath;
	var ap = [];
	ap[0] = "<table align='left' class='tPage' cellpadding='0' cellspacing='0'><tr>";
    if(op.pageIndex>1)
        ap[ap.length] = "<td width='3px'></td><td onmouseover='doOver(this)' onmouseout='doOut(this)'><img align='absmiddle' id='fst_"+suffixId+"' src='"+imgPath+"page-first.gif'/></td><td width='3px'></td>"
             + "<td width='3px'></td><td onmouseover='doOver(this)' onmouseout='doOut(this)'><img align='absmiddle' id='pre_"+suffixId+"' src='"+imgPath+"page-prev.gif'/></td><td width='3px'></td>";
    else
  	    ap[ap.length] = "<td width='3px'></td><td><img align='absmiddle' src='"+imgPath+"page-first-disabled.gif'/></td><td width='3px'></td>"
             + "<td width='3px'></td><td><img align='absmiddle' src='"+imgPath+"page-prev-disabled.gif'/></td><td width='3px'></td>";
    if(op.pageIndex < op.pageCount)                                                     
        ap[ap.length] = "<td width='3px'></td><td onmouseover='doOver(this)' onmouseout='doOut(this)'><img align='absmiddle' id='nxt_"+suffixId+"' src='"+imgPath+"page-next.gif'/></td><td width='3px'></td>"
             + "<td width='3px'></td><td onmouseover='doOver(this)' onmouseout='doOut(this)'><img align='absmiddle' id='lst_"+suffixId+"' src='"+imgPath+"page-last.gif'/></td><td width='3px'></td>";
    else 
        ap[ap.length] = "<td width='3px'></td><td><img align='absmiddle' src='"+imgPath+"page-next-disabled.gif'/></td><td width='3px'></td>"
             + "<td width='3px'></td><td><img align='absmiddle' src='"+imgPath+"page-last-disabled.gif'/></td><td width='3px'></td>";                      
    ap[ap.length] = "<td>&nbsp;<img align='absmiddle' src='"+imgPath+"grid-split.gif' />&nbsp;</td>"
    ap[ap.length] = "<td>Page</td><td><input id='pageIndex"+suffixId+"' type='text' value='"+op.pageIndex+"' onkeypress='doKeyPress(event)' onChange='doChange(this)' /></td><td>of "+op.pageCount+"</td>"
    ap[ap.length] = "<td>&nbsp;<img align='absmiddle' src='"+imgPath+"grid-split.gif' />&nbsp;</td>"
    ap[ap.length] = "<td>Size </td><td><input id='pageSize"+suffixId+"' type='text' value='"+op.pageSize+"' onkeypress='doKeyPress(event)' onChange='doChange(this)' />&nbsp;</td>"
    ap[ap.length] = "<td><img align='absmiddle' src='"+imgPath+"grid-split.gif' />&nbsp;</td>"
    ap[ap.length] = "<td width='3px'></td><td onmouseover='doOver(this)' onmouseout='doOut(this)'><img id='ref_"+suffixId+"' align='absmiddle' src='"+imgPath+"done-disable.gif'/></td><td width='3px'></td>"
    ap[ap.length] = "<td>&nbsp;<img align='absmiddle' src='"+imgPath+"grid-split.gif'/></td></tr></table>"
	ap[ap.length] = "<table style='float:right; padding-right:4px;'><tr><td align='right' style='padding-right:4px;'>Total Number "+op.recordCount+"</td><tr></table>";
	return ap.join("");
}

GridPage.prototype.go = function(){
	var stat = new Date();
	var pageIndex, pageSize;
	var grid = this.owner;
	var suffixId = grid.id;
	var imgPath = grid.options.imgPath;
	var op = this.page;
	var eleSrc = getSrcElement(event);
	switch(eleSrc.id){
		case "fst_" + suffixId: pageIndex = 1;break;
		case "pre_" + suffixId: pageIndex = op.pageIndex-1;break;
		case "nxt_" + suffixId: pageIndex = op.pageIndex+1;break;
		case "lst_" + suffixId: pageIndex = op.pageCount;break;
		case "ref_" + suffixId: pageIndex = -1;break;
	}
    if (pageIndex == "-1") {
        pageIndex = $("pageIndex" + suffixId).value;//refrubish
    }
    pageSize = $("pageSize" + suffixId).value;
    if (pageIndex > op.pageCount) {
        alert("page is not exist.");
        return;
    }
    if (pageSize > 1000) {
        alert("setting max size 1000");
        return;
    }
    if (pageSize == null) 
        pageSize = op.pageSize;
    op.pageIndex = parseInt(pageIndex);
    op.pageSize = parseInt(pageSize);
    try {
        if (!grid.reLoad) {
			alert("function reLoad is not implement.");
            return;
		}
		eval(grid.reLoad(op));
    } 
    catch (e) {
		alert("function reLoad exception.");
        return;
    }
    grid.updatePage();
	var end = new Date();
	var time = (end.getTime()-stat.getTime())/1000;
	alert("载入耗时："+time+'秒');
}

//GridItem class
var GridItem = function(grid){
	this.owner = grid;
	this.id = grid.getId();
	this.cells = [];
	this.attrs = {};
	grid.all.items[this.id] = this; 
}

GridItem.prototype.getData = function(){
	var obj = this.attrs;
	for(var i=0; i < this.cells.length; i++){
		obj[i] = this.cells[i];
	}
	return obj;
}

GridItem.prototype.toString = function(oData){
	var grid = this.owner;
	var ar= [];
	ar[ar.length] = "<tr";
	if (grid.options.isRender && i % 2 == 1) {
		ar[ar.length] = " style='background-image:url(" + grid.options.imgPath + "row-def.gif)'";
	}
	ar[ar.length] = " id='"+this.id+"'>";
	for (var j = 0, objCol; objCol = grid.options.titleData[j]; j++) {
		//w = objCol.width; /*1px by the td border-right width*/
        if (objCol.visible) {
			ar[ar.length] = "<td style='width:" + objCol.width + ";'>" + oData[objCol.name] || "" + "</td>";
		}
		else {
			ar[ar.length] = "<td style='width:0px; display:none'>" + oData[objCol.name] || "" + "</td>";
		}
		this.cells[j] = oData[objCol.name];	
    }
	ar[ar.length] = "</tr>";
	this.attrs = oData;
	return ar.join("");
}

GridItem.prototype.onClick = function(){
	var grid = this.owner;
	var src = getSrcElement(event,"TR");
	grid.select(src.rowIndex);
	//click event interface
	if(grid.onClick)grid.onClick(this.getData());
}

GridItem.prototype.onDblClick = function(){
	var grid = this.owner;
	var src = getSrcElement(event,"TR");
	if(grid.onDblClick)grid.onDblClick(this.getData()());
}

GridItem.prototype.onMouseover = function(){
	var grid = this.owner;
	var src = getSrcElement(event,"TR");
	if(grid.selected && src.id == grid.selected.id)return;
	src.style.backgroundImage = "url("+grid.options.imgPath+"row-over.gif)";
}

GridItem.prototype.onMouseout = function(){
	var grid = this.owner;
	var src = getSrcElement(event,"TR");
	if(grid.selected && src.id == grid.selected.id)return;
    src.style.backgroundImage = (grid.options.isRender && src.rowIndex%2 == 1)?"url("+grid.options.imgPath+"row-def.gif)":"";
}

GridItem.prototype.onContextmenu = function(){
	var grid = this.owner;
	var src = getSrcElement(event,"TR");
	grid.select(src.rowIndex);
	if(grid.onContextMenu)grid.onContextMenu(this.getData(), getEvent(event));
}

//GridSn class
var GridSn = function(grid){
	this.owner = grid;
}

GridSn.prototype.toString = function(num){
	 var sn = "<tr><td algin='center'><input name='checkbox" + this.owner.id + "' type='checkbox' class='checkbox'/></td>"
			+"<td align='center'>" + num + "</td></tr>";
	return sn;
}

var createTable = function(grid, tWidth){
	var w;
	var text;
	var oPage = grid.options.page;
	var className = (grid.bt=="IE")?"col-hidden-IE":"col-hidden-Firefox";
	if(!tWidth){
		tWidth = (!grid.options.showCheckbox && !grid.options.showSequence)?parseInt(grid.options.width) - $("tipDiv"+grid.options.id).getWidth():grid.options.width;
	}
	$("contDiv"+grid.options.id).style.width = tWidth;  
	var snt = '<table id="sBody'+grid.options.id+'" width="100%" border="0" cellpadding="0" cellspacing="0" onselectstart = event.returnValue=false;>'
		+'<colgroup><col/></colgroup><colgroup><col/></colgroup>';
	var ab = [];
	ab[0] = '<table id="tBody'+grid.options.id+'" border="0" cellpadding="0" cellspacing="0" width="'+tWidth+'" onselectstart = event.returnValue=false; >';
	for(var k=0, o; o=grid.options.titleData[k]; k++){
		if(o.visible){
			ab[ab.length] = "<colgroup><col/></colgroup>";
		}else{
			ab[ab.length] = "<colgroup class='"+className+"'><col/></colgroup>";
		}
	}
	var sbt = ab.join("");
	insertHTMLBeforeEnd($("navDiv" + grid.options.id),snt+"<tbody></tbody></table>");
	insertHTMLBeforeEnd($("contDiv" + grid.options.id),sbt+"<tbody></tbody></table>");
	
	return [sbt,snt];
}

/************************************************************/

Grid.prototype = {
	//prototype...
	all:{items:{}},
	data:[],
	id:null,
	seq:0,
	getId: function(){return this.options.id+"-"+"row-"+this.seq++},
	page:{pageIndex:1,pageSize:20},
	bt: "IE",
	splitpane: null,
	selected:null,
	
	select:null,
	onSelect:null,
	onFocus:null,
	onBlur:null,
	onKeydown:null,
	onClick: undefined, //event click interface
	onDblClick: undefined, //event dblClick interface
	onContextmenu: undefined, //event contextMenu interface
	
	lastSortCell: null,
	menu: null,

    //function...
	
	/*
	 * initialize function
	 */
    initialize: function(){
	    this.options = Object.extend({
			id: null,
			width: "100%",
			height: "100%",
			showCheckbox: false,
			showSequence: false,
			showPage: false,
			adaptOutline: true,
			whiteSpace: "normal",
			cellWidth: null,
			titleData: null,
			minCellWidth: 15,
			isRender: true,
			imgPath: "",
			attachSvc: null,
			page: this.page,
			select:null
        }, arguments[0] || {});
		this.id = this.options.id;
		
		if(!this.id || !$(this.id)){
			alert(this.id + " is not already registered in the DOM!");
			return;
		}	
		
		if(typeof(this.options.width) == "string" && this.options.width.indexOf("%") >= 0){
			this.options.width = $(this.options.id).getWidth()*parseInt(this.options.width.substring(0,this.options.width.length-1))/100;
		}
		if(typeof(this.options.height) == "string" && this.options.height.indexOf("%") >= 0){
			this.options.height = $(this.options.id).getHeight()*parseInt(this.options.height.substring(0,this.options.height.length-1))/100;
		}
		
		this.bt = getBrowserType();
		this.createOutline();
		this.buildTitle();
		this.showNav();
		
		if(this.options.adaptOutline){
            this.updateWidth();
            this.rebuildTitle();
	    }
	},
	
	/*
	 * create outline
	 */
	createOutline: function(){
        var divCtn = $(this.options.id);
        divCtn.className = "ctnDiv";
		divCtn.style.cssText += "width:" + this.options.width + "; height:" + this.options.height;
		
		var gridOutline = new  GridOutline(this);
		divCtn.innerHTML = gridOutline.toString();
		
		//adjust the height of navigation div
		this.adjustOutline();
		
		$("bodyDiv"+this.options.id).onscroll = function(){gridOutline.onScroll();}
		$("bodyDiv"+this.options.id).oncontextmenu = function(){gridOutline.onContextmenu();}
		$("tipDiv"+this.options.id).ondblclick = function(){gridOutline.onTipDblclick();}
		divCtn.oncontextmenu = function (){return false;};
	},
	
	/*
	 * adjust the height of navigation div
	 */
	adjustOutline: function(){
		var head = $("headDiv"+this.options.id);
		var nav = $("navDiv"+this.options.id);
		var obody = $("bodyDiv"+this.options.id);
		var cont = $("contDiv"+this.options.id);
		var h = parseInt(this.options.height) - head.getHeight();
		if(this.options.showPage)h -= $("footDiv"+this.options.id).getHeight();
		obody.style.height = h;
		if(this.options.showCheckbox || this.options.showSequence)head.style.width = parseInt(this.options.width) - nav.getWidth();
		else head.style.width = parseInt(this.options.width);
//		cont.style.left = 0;
//		head.style.width = "auto";
		nav.style.height = obody.clientHeight + "px";
	},
	
	buildTitle: function(){
		var gridTitle = new  GridTitle(this);
		$("headDiv" + this.options.id).innerHTML = gridTitle.toString();

		//event for title
		$("tHead"+this.options.id).onmousemove = function(){gridTitle.onMousemove();}
		$("tHead"+this.options.id).onmousedown = function(){gridTitle.onMousedown();}
		$("tHead"+this.options.id).ondblclick = function(){gridTitle.onDblclick();}
		$("tHead"+this.options.id).oncontextmenu = function(){gridTitle.onContextmenu();}
		
		$(this.options.id).onmousemove = function(){gridTitle.onCtnMousemove();}
	},

    updateWidth: function (){
		var tHead = $("tHead"+this.options.id);
		for(var i=0, cell; cell=tHead.rows[0].cells[i]; i++){
			this.options.titleData[i].width = $(cell).getWidth();
		}
	},
	
	rebuildTitle: function (){
        this.options.adaptOutline = false;
		$("headDiv" + this.options.id).innerHTML = "";
		this.buildTitle();
	},
	
	/*
	 * load data function
	 */
	preLoad: function(pData){
		this.clearData();
		var oData = parseData(pData);
		this.data = oData; //缓存数据	
	},
	
	sufLoad: function(){
		if(this.options.showPage){
			this.updatePage();
		}	
	},
	
	load: function(pData){
		this.preLoad(pData);
		if(this.data && this.data.length>0){
			this.loadData();
		}
		this.sufLoad();
	},
	
	loadByPage: function(pData, pPage){
		this.options.page = pPage;
		this.load(pData);
		this.buildPage();
	},
	
	/*
	 * load the data
	 */	
	loadData: function(){  
		var a1 = [];
		var a2 = [];
		var num = this.options.showPage?(this.options.page.pageIndex - 1) * this.options.page.pageSize:0;  
		var tWidth = $("tHead"+this.options.id).getWidth();
		$("contDiv"+this.options.id).style.width = tWidth;    
		var sTitle = createTable(this, tWidth);
		for (var i = 0, obj; obj = this.data[i]; i++) {
		    var gridItem = new GridItem(this);
			var gridSn = new GridSn(this);
			a1[i] = gridItem.toString(obj);
			a2[i] = gridSn.toString(num+i+1);
			obj._rowId = gridItem.id;
		}
		
		if(document.all){
			$("contDiv" + this.options.id).innerHTML = sTitle[0]+"<tbody>"+a1.join("")+"</tbody></table>";
			$("navDiv" + this.options.id).innerHTML = sTitle[1]+"<tbody>"+a2.join("")+"</tbody></table>";
		}
		else{
			insertHTMLBeforeEnd($("tBody" + this.options.id),a1.join(""));
			insertHTMLBeforeEnd($("sBody" + this.options.id),a2.join(""));
		}
		
		if(this.options.select || this.options.select==0)this.select(this.options.select);
		this.adjustOutline();
        this.adjustNavTr();
		this.showNav();
		
		//event		
		var tBody = $("tBody"+this.options.id);
		var contDiv = $("contDiv" + this.options.id);
		contDiv.onclick = function(){gridItem.onClick();}
		contDiv.ondblclick = function(){gridItem.onDblClick();}
		contDiv.oncontextmenu = function(){gridItem.onContextmenu();}
		tBody.onmouseover = function(){gridItem.onMouseover();}
		tBody.onmouseout = function(){gridItem.onMouseout();}
	},
	
	clearData: function(){
		$("navDiv" + this.options.id).innerHTML = "";
	    $("contDiv" + this.options.id).innerHTML = "";
		this.all = {items:{}};
		this.selected = null;
		this.seq = 0;

	},
	
	refurbish: function(){
		if(this.data && this.data.length > 0){
			this.clearData();
			this.loadData();
		}
		this.sufLoad();
	},
	
	addRow: function(oRow, iIndex){
		oRow._rowId = this.getId(); 
		this.data.push(oRow);
		this.refurbish();
		if(!iIndex)iIndex = this.data.length -1;
		this.select(iIndex);
	},
	
	removeRow: function(oRow){
		if(!oRow)return;
		for(var i=0; i< this.data.length; i++){
			if(this.data[i]._rowId == oRow.id){
				this.data.splice(i, 1);
				this.refurbish();
				this.select(0);
				return;
			}
		}
	},
	
	showNav: function(){
		var tip = $("tipDiv"+this.options.id);
		var head = $("headDiv"+this.options.id);
		var cont = $("contDiv"+this.options.id);
		var nav = $("navDiv"+this.options.id);
		var cols = nav.getElementsByTagName("colgroup");
		if(!this.options.showCheckbox && !this.options.showSequence){
			nav.style.display = "none";
			tip.style.display = "none";
			head.style.left = "0px";
			cont.style.left = "0px";
			return;
		}
		if(this.options.showCheckbox || this.options.showSequence){
			nav.style.display = "";
			tip.style.display = "";
			if (this.options.showCheckbox && this.options.showSequence) {
			    nav.style.width = "50px";
				tip.style.width = "50px";
				head.style.left = "50px";
				cont.style.left = "50px";
			}else{
				nav.style.width = "25px";
				tip.style.width = "25px";
				head.style.left = "25px";
				cont.style.left = "25px";
			}
		}
		try{
			if(!this.options.showCheckbox){
				cols[0].className = (this.bt=="IE")?"col-hidden-IE":"col-hidden-Firefox";
			}else{
				cols[0].className = "";
			}
			if(!this.options.showSequence){
				cols[1].className = (this.bt=="IE")?"col-hidden-IE":"col-hidden-Firefox";
			}else{
				cols[1].className = "";
			}
		}catch(e){}
		//
		this.adjustNav();
		this.adjustNavTr();
	},
	
	columnsControl: function(index, hidden){
		var head = $("headDiv"+this.options.id);
		var cont = $("contDiv"+this.options.id);
		var cols = cont.getElementsByTagName("colgroup");
		var headCols = head.getElementsByTagName("colgroup");
		if(this.bt == "IE"){
			head.firstChild.style.width = "auto";
		}
		cont.firstChild.style.width = "auto";
		if (hidden) {
			cols[index].className = (this.bt == "IE") ? "col-hidden-IE" : "col-hidden-Firefox";
			head.getElementsByTagName("TD")[index].style.display = "none";
			this.options.titleData[index].hidden = true;
		}
		else {
			cols[index].className = "";
			head.getElementsByTagName("TD")[index].style.display = "";
			this.options.titleData[index].hidden = false;
		}
		//
		this.adjustNav();
	},
	
	adjustNavTr: function(){
		var tblNav = $("navDiv"+this.options.id).firstChild;
		var tblCont = $("contDiv"+this.options.id).firstChild;
		if(!tblCont)return;
		var navRows = tblNav.rows;
		var contRows = tblCont.rows;
		for(var i=0; i<navRows.length; i++){
			navRows[i].style.height = $(contRows[i]).getHeight(); 
	   	}
	},
	
	adjustCellMax: function(src){
		var inc = 0;
		var length = 0;
		var index = src.cellIndex;
		
		var rows = $("contDiv"+this.options.id).getElementsByTagName("TR");
        for (var i = 0, o; o=this.options.titleData[i]; i++) {
            if(o.name == src.getAttribute("name")){
				index = i;
				break;
			}
        };
		
		for(var j=0, row; row = rows[j]; j++){
			var text = row.cells[index].firstChild.innerHTML;
			length = (leg>length)?leg:length;
		};
		
		var re = new RegExp("[^\x00-\xff]");
	    var width = 0;
	    for(var k=0; k < length; k++){
	   	    if(re.test(strText.charAt(k)))width += 12;
	   	    else width += 6;
	   	    }	
	    obj.width = width;
		
		src.style.width = inc;
		src.firstChild.style.width = inc;
		var m = src.cellIndex;
		for(var k=0; k<rows.length; k++){
			rows[k].cells[m].firstChild.style.width = inc;
	   	}
		//
		this.adjustNav();
		//update the width...
        this.options.titleData[index].width = inc;
	},
	
	select: function(i){
		var row = $("tBody"+this.id).rows[i];
		if(row){
			this.render(row);
			this.selected = this.all.items[row.id];
			if(this.onSelect)this.onSelect(this.all.items[row.id]);
		}
	},
	
	disSelect: function(){
		if(!this.selected)return;
		this.disRender();
		this.selected = null;
	},
	
	disRender: function(){
		if(this.selected){
			//$(this.selected.id).className = "disSelect";
			$(this.selected.id).style.backgroundImage = (!this.options.isRender || oRow.rowIndex % 2 == 0) ? "" : "url("+this.options.imgPath + "row-def.gif)";			
		}
	},
	
	render: function(oRow){
        if (!oRow) return;
        this.disRender();
		//oRow.className = "selected";
		oRow.style.backgroundImage = "url("+this.options.imgPath + "row-sel.gif)";
	},
	
	updatePage: function(){
		$("footDiv" + this.options.id).innerHTML = "";
		this.buildPage();
	},
	
	buildPage: function(){
		var owner = this;
		var gridPage = new GridPage(this);
		$("footDiv" + this.options.id).innerHTML = gridPage.toString();
		
		doKeyPress = function(myEvent){
		    var keys=myEvent.keyCode || myEvent.which;
			if(!(document.all)&&keys==8)return;
            if (keys<48 || keys>57){
                if(document.all)myEvent.returnValue=false;//ie
                else myEvent.preventDefault();//ff
            } 
		} 
		
		doChange = function(src){
			//$("ref_"+owner.options.id).src = owner.options.imgPath+"done.gif";
		}
		
		doOver = function(src){
			src.className = "page-btn-over";
			src.previousSibling.className = "page-btn-over-pre";
			src.nextSibling.className = "page-btn-over-nxt";
		}
		doOut = function(src){
			src.className = "";
			src.previousSibling.className = "";
			src.nextSibling.className = "";
		}
		
		//add page event
		var fstBtn = $("fst_" + this.options.id);
		var preBtn = $("pre_" + this.options.id);
		var nxtBtn = $("nxt_" + this.options.id);
		var lstBtn = $("lst_" + this.options.id);
		var refBtn = $("ref_" + this.options.id);
		if(fstBtn){
			fstBtn.onclick = function(){gridPage.go();}
		}
		if(preBtn){
			preBtn.onclick = function(){gridPage.go();}
		}
		if(nxtBtn){
			nxtBtn.onclick = function(){gridPage.go();}
		}
		if(lstBtn){
			lstBtn.onclick = function(){gridPage.go();}
		}
		refBtn.onclick = function(){gridPage.go();}
		
	},
	
	
	/*
	 * public function
	 */
	
	resetCellWidth: function(){
	    var objTh = $("tHead"+this.options.id);
//		var index = this.oSplit.targetCell.cellIndex;
		var index = this.splitpane.cell.getAttribute("index");
		var cont = $("contDiv"+this.options.id);
		var cols = cont.getElementsByTagName("col");
		var add = parseInt(this.splitpane.target.style.left) - this.splitpane.left;
	    var inc = $(this.splitpane.cell).getWidth() + add;
		
		objTh.style.width = $(objTh).getWidth() + add;
		objTh.rows[0].cells[index].style.width = inc;
		if(!cont || cont.innerHTML == "")return;
		cont.firstChild.style.width = $(cont.firstChild).getWidth() + add;
		//cols[index].style.width = inc;
		var bodyTblRows = cont.firstChild.rows;
		for(var i=0; i<bodyTblRows.length; i++){
			bodyTblRows[i].cells[index].style.width = inc;
	   	}
		
		this.adjustNav();
//		if(this.options.whiteSpace=="normal")this.adjustNav();
		//update the width...
        this.options.titleData[index].width = inc;
	},
	
	adjustNav: function(){
		var nav = $("navDiv"+this.options.id);
		var body = $("bodyDiv"+this.options.id);
		nav.style.top = $("headDiv"+this.options.id).getHeight() - body.scrollTop;
		nav.style.height = body.clientHeight + body.scrollTop + "px";
	},
	
	/*
	 * sort deal function
	 */
	sortDeal: function(objSrc){
        var strTemp;
		var tblBody = $("contDiv" + this.options.id).firstChild;
        var tblHead = $("tHead" + this.options.id);
        var sortedRows = new Array();
		var className = (this.bt == "IE") ? "col-hidden-IE" : "col-hidden-Firefox";

        var gbCol = objSrc.getAttribute("index");
		var oTitle = this.options.titleData[gbCol];
		if (oTitle.asc) oTitle.asc = false;
        else oTitle.asc = true;
        for (var i = 0, row; row = tblBody.rows[i]; i++) {
			var o = row.cells[gbCol].firstChild;
			var text  = o?o.data:"";
			sortedRows[i] = new Array(text, row, oTitle);
        }
		
		sortedRows.sort(this.sortRule);
        
		var sTitle = createTable(this, $("tHead" + this.options.id).getWidth());
		var str = sTitle[0] + "<tbody>";
		for (i = 0; i < sortedRows.length; i++) {
			if (!this.options.isRender || i % 2 == 0){
				str += "<tr id='" + sortedRows[i][1].id + "'>" + sortedRows[i][1].innerHTML + "</tr>";
			}else{
				str += "<tr id='" + sortedRows[i][1].id + "' style='background-image:url("+this.options.imgPath+"row-def.gif);'>" + sortedRows[i][1].innerHTML + "</tr>";
			} 
        }
		$("contDiv" + this.options.id).innerHTML = str + "</tbody></table>";
				
		if(this.selected)this.select($(this.selected.id).rowIndex);
	},

    sortRule: function(a, b){
		if(a[0] == null || a[0] == "")return -1;
        if (a[2] == "number") {
            if (parseInt(a[0]) > parseInt(b[0])) return (a[2].asc) ? 1 : -1;
            else if (parseInt(a[0]) < parseInt(b[0])) return (a[2].asc) ? -1 : 1;
            else return 0;
        }
        else {
            if (a[0].toLowerCase() > b[0].toLowerCase()) return (a[2].asc) ? 1 : -1;
            else if (a[0].toLowerCase() < b[0].toLowerCase()) return (a[2].asc) ? -1 : 1;
            else return 0;
        }
	}, 
   
	showArrow: function(src){
		var index = src.getAttribute("index");
        var img = $("sortImg" + index + this.options.id);
        var tblBody = $("contDiv" + this.options.id).firstChild;
        if (this.options.titleData[index].asc) img.src = this.options.imgPath + "sort_asc.gif";
        else img.src = this.options.imgPath + "sort_desc.gif"
		img.style.display = "";
		//img.parentNode.style.cssText += " background-image:url("+img.src+"); background-repeat:no-repeat; background-position:right;";
        if (this.lastSortCell != null && this.lastSortCell != index) 
            $("sortImg" + this.lastSortCell + this.options.id).style.display = "none";
	},
	
	getPicked: function(){
		if(this.selected)return this.selected.getData();
	},
	
	getChecked: function(b){
		if(b==null)b = false;
		var arrChecked = new Array();
		var tBody = $("contDiv"+this.options.id).firstChild;
	    var colCheck = document.getElementsByName("checkbox"+this.options.id);
	    for(var i=0; i<colCheck.length; i++){
	    	if(b || (!b && colCheck[i].checked == true)){
	    		var obj = new Object();
	    		obj = this.all.items[tBody.rows[colCheck[i].parentNode.parentNode.rowIndex].id].getData();
	    		arrChecked.push(obj);
	    	}  
	    }
	    return arrChecked;
	},
	
	exportExcel: function(b) {
		if(b==null)b = false;
		try{
			 var oXL = new ActiveXObject("Excel.Application"); 
		}catch(e){
			alert("Ecxel setting wrong");
			return;
		}
	    var oWB = oXL.Workbooks.Add(); 
	    var oSheet = oWB.ActiveSheet; 
	    for(var i=0,objCol; objCol=this.options.titleData[i]; i++){
			if(!b && !objCol.visible)continue;
			oSheet.Cells(1,i+1).value = objCol.text;
			}
		var arrData = this.getChecked(true);	
		for(var i=0; i<arrData.length; i++) {
	        for(var j=0,objCol; objCol=this.options.titleData[j]; j++){
				if(!b && !objCol.visible)continue;
	  		    oSheet.Cells(i+2,j+1).value = arrData[i][objCol.name];
	  		    }       
	        }  
	    oXL.Visible = true; 
	},
	    
	exportWord: function() {
		var oTable = $("contDiv"+this.options.id);
		try{
			 var oWD = new ActiveXObject("Word.Application");
		}catch(e){
			alert("Word setting wrong");
			return;
		}
	    var oDC = oWD.Documents.Add("",0,1);
	    var oRange =oDC.Range(0,1);
	    var sel = document.body.createTextRange();
	    sel.moveToElementText(oTable);
	    sel.select();
	    sel.execCommand("Copy");
	    oRange.Paste();
	    oWD.Application.Visible = true;
	}

}
