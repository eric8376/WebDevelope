/**
 * @author Song.wenguang
 */

//Class是一个全局对象，有一个方法create，用于返回一个类   
var Class = {   
    create: function() {   
        return function() {   
            this.initialize.apply(this, arguments);   
        }   
    }   
}

//创建Grid对象
var Grid = Class.create();

Grid.prototype = {
	pageIndex: 1,
	pageSize: 20,
	actRow: {},
	actColor: "#316AC5",
	oSplit: null,
	lastSortCell: null,
	bt: "IE",
    leftWidth: null,
	doClick: undefined,  //event click interface
	doDblClick: undefined,  //event dblClick interface
	doContextMenu: undefined, //event contextMenu interface
	
	initialize: function(){
        this.options = Object.extend({
			id: "grid_" + new Date().getTime(),
			width: "100%",
			height: "100%",
			showCheckbox: false,
			showSequence: false,
			showPage: false,
			adaptOutline: false,
			whiteSpace: "normal",
			cellWidth: null,
			titleData: null,
			page: null,
			minCellWidth: 15,
			isRender: false,
			imgPath: "",
			attachSvc: null
        }, arguments[0] || {});	
		if(!$(this.options.id)){
			alert(this.options.id + " is not already registered in the DOM!");
			return;
		}
		$(this.options.id).innerHTML="";
		if(typeof(this.options.width) == "string" && this.options.width.indexOf("%") >= 0){
			this.options.width = $(this.options.id).getWidth()*parseInt(this.options.width.substring(0,this.options.width.length-1))/100;
		}
		if(typeof(this.options.height) == "string" && this.options.height.indexOf("%") >= 0){
			this.options.height = $(this.options.id).getHeight()*parseInt(this.options.height.substring(0,this.options.height.length-1))/100;
			
		}

		this.bt = this.getBrowserType();
		this.createOutline();
		this.browserCompatible();
		this.buildTitle();
		if(this.options.adaptOutline){
            this.updateWidth();
            this.rebuildTitle();
	    }
		
		//绑定服务
		if (this.options.attachSvc) {
			if (this.options.showPage) this.loadByPage(eval(this.options.attachSvc+"("+this.options.page.pageIndex+","+this.options.page.pageSize+")"));
			else this.load(eval(this.options.attachSvc+"()"));
		}
		
		//事件管理
		this.eventManage();
	},
	
	createOutline: function(){
		var oHead, oHeadLeft, oHeadRight, oBody, oBodyLeft, oBodyRight;
        var divCtn = $(this.options.id);
        divCtn.className = "dContainer";
		divCtn.style.cssText += "width:" + this.options.width + ";";
		
		oHead = this.createTag("DIV");
        oHeadLeft = this.createTag("DIV");
        oHeadRight = this.createTag("DIV");
        oBody = this.createTag("DIV");
        oBodyLeft = this.createTag("DIV");
        oBodyRight = this.createTag("DIV");
		
        divCtn.appendChild(oHead);
        oHead.id = "dHead" + this.options.id;
        oHead.className = "dHead";
        oHead.style.cssText += "width:" + this.options.width + ";";
        if (this.options.showCheckbox || this.options.showSequence) {
            oHead.appendChild(oHeadLeft);
            oHeadLeft.id = "dHeadLeft" + this.options.id;
            oHeadLeft.className = "dHeadLeft";
            var display = this.options.showCheckbox ? "" : "none";
            oHeadLeft.innerHTML = "<table id='tHeadLeft" + this.options.id + "' class='tHeadLeft' border='0' cellspacing='0' cellpadding='0'><tr><td><input id='checkAll" + this.options.id + "' type='checkbox' class='checkbox" + this.bt + "' style='display:" + display + "'}'/></td></tr></table>";
            this.leftWidth = this.options.cellWidth || $(oHeadLeft).getWidth();
        }
        else this.leftWidth = 0;
        oHead.appendChild(oHeadRight);
        oHeadRight.id = "dHeadRight" + this.options.id;
        oHeadRight.align = "left";
        oHeadRight.className = "dHeadRight";
        oHeadRight.style.cssText += "width:" + (parseInt(this.options.width) - this.leftWidth) + ";";
        
		divCtn.appendChild(oBodyLeft);
		
		divCtn.appendChild(oBody);
        oBody.id = "dBody" + this.options.id;
        oBody.className = "dBody";
        oBody.style.cssText = "width:" + this.options.width + "px; height:" + (parseInt(this.options.height) - $("dHead"+this.options.id).clientHeight) + "px;";
        oBodyLeft.id = "dBodyLeft" + this.options.id;
        oBodyLeft.className = "dBodyLeft";
		oBodyLeft.style.cssText += "width:" + this.leftWidth + ";";
        
		oBody.appendChild(oBodyRight);
        oBodyRight.id = "dBodyRight" + this.options.id;
        oBodyRight.className = "dBodyRight";
		oBodyRight.style.cssText += "width:auto; left:" + this.leftWidth;
		
		this.bodyScroll = this.doBodyScroll.bindAsEventListener(this);
		Event.observe(oBody, "scroll", this.bodyScroll);
	},
	
	doBodyScroll: function(event){
		var eleSrc = event.srcElement || event.target;
		$("tHead" + this.options.id).style.left = -eleSrc.scrollLeft+"px"; 	 
		if($("dBodyLeft" + this.options.id)){
			if(this.bt == "IE")$("dBodyLeft" + this.options.id).style.top = $("dHead" + this.options.id).getHeight() - eleSrc.scrollTop;
			if(this.bt == "Firefox")$("dBodyLeft" + this.options.id).style.top = this.getAbsPosition($(this.options.id), "top") + $("dHead" + this.options.id).getHeight() - eleSrc.scrollTop;
			$("dBodyLeft" + this.options.id).style.height = $("dBody" + this.options.id).clientHeight + eleSrc.scrollTop;
		}
	},
	
	buildTitle: function(){
		var s;
		if(this.options.adaptOutline)
		    s = "<table id='tHead"+this.options.id+"' class='tHead' cellspacing='0' border='0' width='100%' onSelectstart=event.returnValue=false;><tr class='thTR' onContextMenu='doHeadContextMenu(this)'>"
	    else s = "<table id='tHead"+this.options.id+"' class='tHead' cellspacing='0' border='0' onSelectstart=event.returnValue=false;><tr class='thTR'>"
		for(var i=0,objCol; objCol=this.options.titleData[i]; i++){
    	    if(objCol.visible && this.options.adaptOutline)
    	        s += "<td id='th_"+i+"_"+this.options.id+"' class='thTD' sortable='"+objCol.sortable+"' dataType='"+objCol.dataType+"'><div style='overflow:hidden; white-space:nowrap; text-overflow:ellipsis; width:100%;'>"+objCol.text+"<img id='sortImg"+i+this.options.id+"' src='' style='display:none; margin-left:5px;'/></div></td>" 
    	    else if(objCol.visible && !this.options.adaptOutline)
			    s += "<td id='th_"+i+"_"+this.options.id+"' class='thTD' width='"+objCol.width+"' sortable='"+objCol.sortable+"' dataType='"+objCol.dataType+"'><div style='overflow:hidden; white-space:nowrap; text-overflow:ellipsis; width:"+objCol.width+";'>"+objCol.text+"<img id='sortImg"+i+this.options.id+"' src='' style='display:none; margin-left:5px;'/></div></td>" 
			else
    		    s += "<td id='th_"+i+"_"+this.options.id+"' class='thTD' style='width:0px; display:none'><div>"+objCol.text+"</div></td>"
        }
        s += "</tr></table>";
		$("dHeadRight" + this.options.id).innerHTML = s;
		this.eventManageForTHead();
	},
	
	buildPage: function (){
		var objPage = this.options.page;
		var imgPath = this.options.imgPath;
		var strPageTbl = "<table align='left' class='tPage'><tr><td>&nbsp;</td>";
	    if(objPage.pageIndex>1)
	        strPageTbl += "<td><img id='fst_"+this.options.id+"' src='"+imgPath+"page-first.gif'/>&nbsp;</td>"
	                            + "<td><img  id='pre_"+this.options.id+"' src='"+imgPath+"page-prev.gif'/>&nbsp;</td>";
	    else
	  	    strPageTbl += "<td><img src='"+imgPath+"page-first-disabled.gif'/>&nbsp;</td>"
	                            + "<td><img src='"+imgPath+"page-prev-disabled.gif'/>&nbsp;</td>";
	    if(objPage.pageIndex < objPage.pageCount)                                                     
	        strPageTbl += "<td><img id='nxt_"+this.options.id+"' src='"+imgPath+"page-next.gif'/>&nbsp;</td>"
	                            + "<td><img id='lst_"+this.options.id+"' src='"+imgPath+"page-last.gif'/>&nbsp;</td>";
	    else 
	        strPageTbl += "<td><img src='"+imgPath+"page-next-disabled.gif'/>&nbsp;</td>"
	                            + "<td><img src='"+imgPath+"page-last-disabled.gif'/>&nbsp;</td>";                      
	    strPageTbl += "<td><img src='"+imgPath+"grid-split.gif' />&nbsp;</td>"
	                          + "<td>第<input id='pageIndex"+this.options.id+"' type='text' value='"+objPage.pageIndex+"' class='pageTextStyle' size='1' onkeypress=doKeyPress(event) />页/共"+objPage.pageCount+"页&nbsp;</td>"
	                          + "<td><img src='"+imgPath+"grid-split.gif' />&nbsp;</td>"
	                          + "<td>每页显示<input id='pageSize"+this.options.id+"' type='text' value='"+objPage.pageSize+"' class='pageTextStyle' size='1' onkeypress=doKeyPress(event) />条记录&nbsp;</td>"
	                          + "<td><img src='"+imgPath+"grid-split.gif' />&nbsp;</td>"
	                          + "<td><img id='ref_"+this.options.id+"' class='refrubishStyle' src='"+imgPath+"done.gif'/>&nbsp;</td>"
	                          + "<td><img src='"+imgPath+"grid-split.gif' />&nbsp;</td>"
	                          + "<td>总记录："+objPage.recordCount+"条&nbsp;</td></tr></table>";
		$("dPage" + this.options.id).innerHTML = strPageTbl;
		
		doKeyPress = function(myEvent){
		    var keys=myEvent.keyCode || myEvent.which;
			if(!(document.all)&&keys==8)return;
            if (keys<48 || keys>57){
                if(document.all)myEvent.returnValue=false;//ie
                else myEvent.preventDefault();//ff
            } 
		} 
		
		this.eventManageForPage();
	},
	
	eventManage: function(){
		this.ctnMove = this.doCtnMove.bindAsEventListener(this);
		Event.observe($(this.options.id), "mousemove", this.ctnMove);
		this.bodyMouseUp = this.doBodyMouseUp.bindAsEventListener(this);
		Event.observe(document.body, "mouseup", this.bodyMouseUp);
	
		if($("checkAll" + this.options.id)){
			this.checkAll = this.doCheckAll.bindAsEventListener(this);
		    Event.observe($("checkAll" + this.options.id), "click", this.checkAll);
		}
		
		$(this.options.id).oncontextmenu=function(){return false;};
	},
	
	eventManageForTHead: function(){
		var tblTHead = $("tHead" + this.options.id);
		var theadCells = tblTHead.rows[0].cells;
		this.theadMove = this.doHeadTdMove.bindAsEventListener(this);
		this.theadDown = this.doHeadTdDown.bindAsEventListener(this);
		this.theadDblClick = this.doHeadTdDblClick.bindAsEventListener(this);
		this.theadContextMenu = this.doHeadContextMenu.bindAsEventListener(this);
        for (var i = 0; i < theadCells.length; i++) {
            Event.observe(theadCells[i], "mousemove", this.theadMove);
			Event.observe(theadCells[i], "mousedown", this.theadDown);
			Event.observe(theadCells[i], "dblclick", this.theadDblClick);
			Event.observe(theadCells[i], "contextmenu", this.theadContextMenu);
        }
	},
	
	eventManageForTBody: function(){
		var tblTBody = $("tBody" + this.options.id);
		var tbodyRows = tblTBody.rows;
		this.tbodyOver = this.doBodyTrOver.bindAsEventListener(this);
		this.tbodyOut = this.doBodyTrOut.bindAsEventListener(this);
		this.tbodyClick = this.doBodyTrClick.bindAsEventListener(this);
		this.tbodyDblClick = this.doBodyTrDblClick.bindAsEventListener(this);
		this.tbodyContextMenu = this.doBodyTrContextMenu.bindAsEventListener(this);
        for (var i = 0; i < tbodyRows.length; i++) {
            Event.observe(tbodyRows[i], "mouseover", this.tbodyOver);
			Event.observe(tbodyRows[i], "mouseout", this.tbodyOut);
			Event.observe(tbodyRows[i], "click", this.tbodyClick);
			Event.observe(tbodyRows[i], "dblclick", this.tbodyDblClick);
			Event.observe(tbodyRows[i], "contextmenu", this.tbodyContextMenu);
        }
	},
	
	eventManageForPage: function(){
		var imgFst = $("fst_" + this.options.id);
		var imgPre = $("pre_" + this.options.id);
		var imgNxt = $("nxt_" + this.options.id);
		var imgLst = $("lst_" + this.options.id);
		var imgRef = $("ref_" + this.options.id);
		if(imgFst){
			this.refbhFst = this.refurbish.bindAsEventListener(this);
		    Event.observe(imgFst, "click", this.refbhFst);
		}
		if(imgPre){
			this.refbhPre = this.refurbish.bindAsEventListener(this);
		    Event.observe(imgPre, "click", this.refbhPre);
		}
		if(imgNxt){
			this.refbhNxt = this.refurbish.bindAsEventListener(this);
		    Event.observe(imgNxt, "click", this.refbhNxt);
		}
		if(imgLst){
			this.refbhLst = this.refurbish.bindAsEventListener(this);
		    Event.observe(imgLst, "click", this.refbhLst);
		}
		this.refbhRef = this.refurbish.bindAsEventListener(this);
		Event.observe(imgRef, "click", this.refbhRef);
	},
	
	doHeadTdMove: function(event){
		var eleSrc = this.getSrcElement(event,"TD");
		var evt = this.getEvent(event);
		if(this.oSplit != null)
		{
		    $(this.options.id).style.cursor = "col-resize";
		  	return;
		  	}
		if(evt.offsetX < 2 && eleSrc.cellIndex == 0)return;		
			if(evt.offsetX < 2 || evt.offsetX > $(eleSrc.firstChild).getWidth()-4)
		        eleSrc.style.cursor = "col-resize"; 
		    else 
		  	    eleSrc.style.cursor = "default";
	},
	
	doHeadTdDown: function(event){
        document.ondragstart = function(){
            return false
        };
        document.body.onselectstart = function(){
            return false
        };
        
        var eleSrc = this.getSrcElement(event,"TD");
		var evt = this.getEvent(event);
        if (eleSrc.style.cursor == "col-resize") {
            var localTop;
            if (this.bt == "IE") 
                localTop = parseInt(evt.clientY) - parseInt(evt.offsetY) + parseInt(document.body.scrollTop);
            if (this.bt == "Firefox") 
                localTop = parseInt(evt.clientY) - parseInt(evt.offsetY);
            var localHeight = $("dBody" + this.options.id).clientHeight + $("dHead" + this.options.id).clientHeight;
            var localLeft = -1;
            if (parseInt(evt.offsetX) > ($(eleSrc.firstChild).getWidth() - 8)) {
                localLeft = (this.bt == "IE") ? parseInt(evt.clientX) + $(eleSrc.firstChild).getWidth() - parseInt(evt.offsetX) + document.body.scrollLeft : parseInt(evt.clientX) + $(eleSrc.firstChild).getWidth() - parseInt(evt.offsetX);
            }
            else if (parseInt(evt.offsetX) < 2) {
                eleSrc = eleSrc.previousSibling;
                localLeft = (this.bt == "IE") ? parseInt(evt.clientX) - parseInt(evt.offsetX) + document.body.scrollLeft : parseInt(evt.clientX) - parseInt(evt.offsetX);
            }
            else return;
            this.oSplit = this.createSplit(localLeft, localTop, localHeight);
            this.oSplit.originX = localLeft;
            if (eleSrc.style.display == "none") this.oSplit.targetCell = eleSrc.previousSibling;
            else this.oSplit.targetCell = eleSrc;
        }
	},
	
	doHeadTdDblClick: function(event){
	   //sort...
       var eleSrc = this.getSrcElement(event,"TD");
       if (!this.options.titleData[eleSrc.cellIndex].sortable) return;
       if (!$("tBody" + this.options.id)) return;
//       if (eleSrc.style.cursor == "col-resize") {
//           this.expendCell(eleSrc);
//           return;
//       }
       this.sortDemo(eleSrc);
       this.showArrow(eleSrc);
       this.lastSortCell = eleSrc;
	},
	   
	doHeadContextMenu: function(event){
		var eleSrc = this.getSrcElement(event,"TD");
	    var evt = this.getEvent(event);
		var top, left;
		if(this.bt=="IE"){
			top = parseInt(evt.clientY) + document.body.scrollTop + $(eleSrc).getHeight() - evt.offsetY - 4;
			left = parseInt(evt.clientX) + document.body.scrollLeft - evt.offsetX - 4;
		}
		else if(this.bt=="Firefox"){
			top = evt.clientY + $(eleSrc).getHeight() - evt.offsetY - 4;
			left = evt.clientX - evt.offsetX;
		}
		if($("headContextMenu"))document.body.removeChild($("headContextMenu"));
		var menuDiv = this.createTag("DIV");
		document.body.appendChild(menuDiv);
		    menuDiv.id = "headContextMenu";
		    menuDiv.className = "contextmenu";
		    menuDiv.style.position = "absolute";
		    menuDiv.style.top = top;
		    menuDiv.style.left = left;
		    menuDiv.style.zIndex = 50;	
		var s = "<table id='tTitleMenu"+this.options.id+"' cellspacing='1' cellpadding='2' onblur='doBlur(this)'>" 
				  + "<tr onmouseover='doOver(this)' onmouseout='doOut(this)' onmousedown='doDown(this, 0)'><td width='20px'><img src='"+this.options.imgPath+"hmenu-asc.gif'/></td><td style='padding-left:5px; padding-right:20px;'>升序排列</td></tr>" 
				  + "<tr onmouseover='doOver(this)' onmouseout='doOut(this)'onmousedown='doDown(this, 1)'><td width='20px'><img src='"+this.options.imgPath+"hmenu-desc.gif'/></td><td style='padding-left:5px; padding-right:20px;'>降序排列</td></tr></table>";
		menuDiv.innerHTML = s;
		
		doOver = function(obj){
			obj.className = "over";
		}
		doOut = function(obj){
			obj.className = "out";
		}
		doBlur = function(obj){
			document.body.removeChild(menuDiv);
		}
		doDown = function(oSrc, n){return;
			if(n==0)this.options.asc = true;
			else this.options.asc = false;
			this.doHeadTdDblClick(eleSrc);
		}
		
		var ot = $("tTitleMenu"+this.options.id);
		if(this.bt=="IE"){ot.focus();}
		if(this.bt=="Firefox"){
			menuDiv.style.overflow = "auto";
			window.setTimeout(function(){menuDiv.focus();}, 0);
			menuDiv.onblur = function(){
				document.body.removeChild(menuDiv);
			}
		}
	},
	
	doCtnMove: function(event){
        var eleSrc = this.getSrcElement(event);
        var evt = this.getEvent(event);
        if (this.oSplit != null) {
            if (parseInt(evt.clientX) + document.body.scrollLeft > (this.oSplit.originX - $(this.oSplit.targetCell.firstChild).getWidth() + this.options.minCellWidth)) 
                this.oSplit.style.left = (this.bt == "IE") ? evt.clientX + document.body.scrollLeft : evt.clientX;
            eleSrc.style.cursor = "col-resize";
        }
	},
	
	doBodyMouseUp: function(){
        $(this.options.id).style.cursor = "default";
		$("dBody"+this.options.id).style.cursor = "default";
		if (!this.oSplit) return;
        document.body.removeChild(this.oSplit);
        
        //resize cell width...
        this.resetCellWidth();
        this.oSplit = null;
		
        document.ondragstart = function(){return true};
        document.body.onselectstart = function(){return true};
	},
	
	doBodyTrOver: function(event){
		var eleSrc = this.getSrcElement(event,"TR");
		if(eleSrc.id == this.actRow.id)return;
		this.actRow.bg = eleSrc.style.background;
		eleSrc.style.background = "#D9E8FB";
	},
	
	doBodyTrOut: function(event){
		var eleSrc = this.getSrcElement(event,"TR");
		if(eleSrc.id == this.actRow.id)return;
	    eleSrc.style.background = this.actRow.bg;
	},
	
	doBodyTrClick: function(event){
		var eleSrc = this.getSrcElement(event,"TR");
		if(eleSrc.style.background == this.actColor)return;
		if(eleSrc.id == this.actRow.id)return;
		this.render(eleSrc);
		//click event interface
		if(this.doClick)this.doClick(this.getRow(eleSrc));
	},
	
	doBodyTrDblClick: function(event){
		var eleSrc = this.getSrcElement(event,"TR");
		if(this.doDblClick)this.doDblClick(this.getRow(eleSrc));
	},
	
	doBodyTrContextMenu: function(event){
		var eleSrc = this.getSrcElement(event,"TR");
		var evt = this.getEvent(event);
		var o = this.getRow(eleSrc);
		if(this.doContextMenu)this.doContextMenu(o, evt);
	},
	
	doCheckAll: function(event){
		var eleSrc = this.getSrcElement(event);
        var colCheck = document.getElementsByName("checkbox" + this.options.id);
        for (var i = 0, o; o = colCheck[i]; i++) {
            colCheck[i].checked = eleSrc.checked;
        }
	},
	
	refurbish: function(event){
		var pageIndex, pageSize;
		var eleSrc = this.getSrcElement(event);
		switch(eleSrc.id){
			case "fst_" + this.options.id: pageIndex = 1;break;
			case "pre_" + this.options.id: pageIndex = this.options.page.pageIndex-1;break;
			case "nxt_" + this.options.id: pageIndex = this.options.page.pageIndex+1;break;
			case "lst_" + this.options.id: pageIndex = this.options.page.pageCount;break;
			case "ref_" + this.options.id: pageIndex = -1;break;
		}
        if (pageIndex == "-1") {
            pageIndex = $("pageIndex" + this.options.id).value;//refrubish
        }
        pageSize = $("pageSize" + this.options.id).value;
        if (pageIndex > this.options.page.pageCount) {
            alert("指定页面不存在");
            return;
        }
        if (pageSize > 500) {
            alert("每页显示限定最大500条");
            return;
        }
        if (pageSize == null) 
            pageSize = this.options.page.pageSize;
        this.options.page.pageIndex = parseInt(pageIndex);
        this.options.page.pageSize = parseInt(pageSize);
        
      
        try {
            if (!this.reLoad) {
				alert("reLoad接口没有实现");
                return;
			}
//            eval("this.reLoad")(pageIndex, pageSize);
			eval(this.reLoad(pageIndex, pageSize));
        } 
        catch (e) {
			alert("处理异常");
            return;
        }
        this.updatePage();
        
	},	
	
	updatePage: function(){
		$("dPage" + this.options.id).innerHTML = "";
		this.buildPage();
	},
	
	load: function (pData){
		var oData;
		if(typeof(pData) == "string"){
			if(oData.substring(oData.length-5,oData.length-1) == ".xml"){
                var xmlDoc = this.parseXml();
                xmlDoc.load(pData);
			}else{
                var xmlDoc = this.parseXml(pData);
                xmlDoc.loadXML(pData);
			}
			oData = xmlDoc.getElementsByTagName("item");
		}else{
			oData = pData;
		}
		this.loadData(oData);
		this.resetLeftHeight();
		this.actRow = {};
		this.render($("tBody" + this.options.id).rows[0]);
	},
	
	loadByPage: function(pData){
		var oPage = this.createTag("DIV");
        $(this.options.id).appendChild(oPage);
        oPage.id = "dPage" + this.options.id;
        oPage.className = "dPage";
        oPage.style.width = this.options.width;
		this.buildPage();
		
		this.load(pData);
	},
	
	reLoad: function(pageIndex, pageSize){
		if(this.options.attachSvc)this.load(eval(this.options.attachSvc+"("+pageIndex+","+pageSize+")"));
	},
	
	loadData: function(pData){
        this.clearData();
        if(pData==null || pData.length<=0)return;
        var num = 0;
        var text;
        var oPage = this.options.page;
        if (oPage) 
            num = (this.options.page.pageIndex - 1) * this.options.page.pageSize;
        var sLeft = "<table id='tBodyLeft" + this.options.id + "' class='tBodyLeft' cellspacing='0' border='0' onselectstart = event.returnValue=false;>";
        var sBody = "<table id='tBody" + this.options.id + "' class='tBody' cellspacing='0' border='0' onselectstart = event.returnValue=false;>";
        for (var i = 0, obj; obj = pData[i]; i++) {
            sLeft += "<tr>";
            if (this.options.showCheckbox) 
                sLeft += "<td align='center'><input name='checkbox" + this.options.id + "' type='checkbox' class='checkbox" + this.bt + "'/></td>";
            if (this.options.showSequence) 
                sLeft += "<td align='center'>" + (num + i + 1) + "</td>";
            sLeft += "</tr>";
            
            if (!this.options.isRender || i % 2 == 0) 
                sBody += "<tr class='oddTR' style='background:#FFFFFF;' ";
            else 
                sBody += "<tr class='evenTR' style='background:#F1F1F1;' ";
            sBody += "id='tr-" + i + "-" + this.options.id + "' >";
            for (var j = 0, objCol; objCol = this.options.titleData[j]; j++) {
                if(obj[objCol.name]==null || !obj[objCol.name])
                 text="";
                else
                 text = obj[objCol.name] || obj.getAttribute(objCol.name) || "";
                if (objCol.visible) 
                    sBody += "<td><div title='" + text + "' style='overflow:hidden; white-space:" + this.options.whiteSpace + "; text-overflow:ellipsis; text-align:; width:" + objCol.width + "'>" + text + "</div></td>"
                else 
                    sBody += "<td><div style='width:0px; display:none'>" + text + "</div></td>"
            }
            sBody += "</tr>";
        }
        sLeft += "</table>";
        sBody += "</table>";
        if (this.options.showSequence || this.options.showCheckbox) $("dBodyLeft" + this.options.id).innerHTML = sLeft;
        $("dBodyRight" + this.options.id).innerHTML = sBody;
        if (this.options.whiteSpace == "normal") this.adjustLeftHeight();
		
		this.eventManageForTBody();
	},
	
	updateWidth: function (){
		var tHead = $("tHead"+this.options.id);
		for(var i=0, cell; cell=tHead.rows[0].cells[i]; i++){
			this.options.titleData[i].width = $(cell.childNodes[0]).getWidth();
		}
	},
	
	rebuildTitle: function (){
        this.options.adaptOutline = false;
		$("dHeadRight" + this.options.id).innerHTML = "";
		this.buildTitle();
	},
	
	getRow: function(obj){
		var o = {};
		for(var i=0,cell; cell=obj.cells[i]; i++){
			o[this.options.titleData[i].name] = cell.childNodes[0].innerHTML;
		}
		return o;
    },
	
	render: function(oTR){
        if (!oTR) return;
        if (this.actRow.id) {
            var obj = $(this.actRow.id);
            obj.style.background = (!this.options.isRender || obj.rowIndex % 2 == 0) ? "#FFFFFF" : "#F1F1F1";
            obj.style.color = "#000000";
        }
        oTR.style.background = this.actColor;
        oTR.style.color = "#FFFFFF";
        this.actRow.id = oTR.id;
	},
	
	clearData: function(){
		$("dBodyLeft" + this.options.id).innerHTML = "";
	    $("dBodyRight" + this.options.id).innerHTML = "";
	},
	
	resetCellWidth: function(){
	    var objTh = $("tHead"+this.options.id);
		var index = this.oSplit.targetCell.cellIndex;
	    var tBody = $("tBody"+this.options.id);
	    var intIncrement = $(this.oSplit.targetCell.firstChild).getWidth() + parseInt(this.oSplit.style.left) - this.oSplit.originX;
		
		objTh.getElementsByTagName("TD")[index].firstChild.style.width = intIncrement;
		objTh.getElementsByTagName("TD")[index].width = intIncrement;
	    if(!tBody || tBody.innerHTML == "")return;
	    var bodyTblRows = tBody.firstChild.rows;
		for(var i=0; i<bodyTblRows.length; i++){
	    	bodyTblRows[i].cells[index].firstChild.style.width = intIncrement;
	   	}

		this.resetLeftHeight();
		if(this.options.whiteSpace=="normal")this.adjustLeftHeight();
		//updata the width...
        this.options.titleData[index].width = intIncrement;
	},
	
	resetLeftHeight: function(){
		var eleSrc = $("dBody"+this.options.id); 	 
		if($("dBodyLeft" + this.options.id)){
			if(this.bt == "IE")$("dBodyLeft" + this.options.id).style.top = $("dHead" + this.options.id).getHeight() - eleSrc.scrollTop;
			if(this.bt == "Firefox")$("dBodyLeft" + this.options.id).style.top = this.getAbsPosition($(this.options.id), "top") + $("dHead" + this.options.id).getHeight() - eleSrc.scrollTop;
			$("dBodyLeft" + this.options.id).style.height = $("dBody" + this.options.id).clientHeight + eleSrc.scrollTop;
		}
		return;
        if (!$("tBodyLeft" + this.options.id)) return;
        var eleSrc = $("dBody" + this.options.id);
		$("dBodyLeft" + this.options.id).style.height = eleSrc.clientHeight + eleSrc.scrollTop;
	},
	
	adjustLeftHeight: function(){
		var tBodyLeft = $("tBodyLeft"+this.options.id);
		if(!tBodyLeft)return;
		var tBodyLeftTR = tBodyLeft.rows;
		var tBodyTR = $("tBody"+this.options.id).rows;
		for(var i=0,row; row=tBodyTR[i]; i++){
			tBodyLeftTR[i].childNodes[0].style.height = $(row).getHeight();
		}
	},
	
	createSplit: function (localLeft, localTop, localHeight){
	    var objDiv = this.createTag("DIV");
	    objDiv.id = "splitDiv";
	    objDiv.className = "split"; 
	    objDiv.style.top = localTop;
	    objDiv.style.left = localLeft;
	    objDiv.style.height = localHeight;
	    document.body.appendChild(objDiv);
	    return objDiv;
	},
	
	sortDemo: function(objSrc){
        var objBodyTbl = $("tBody" + this.options.id);
        var objHeadTbl = $("tHead" + this.options.id);
        var collRows = objBodyTbl.rows;
        var theSortedRows = new Array();
        
        var gbCol = objSrc.cellIndex;
		var oTitle = this.options.titleData[gbCol];
		if (oTitle.asc) oTitle.asc = false;
        else oTitle.asc = true;
        for (var i = 0, row; row = objBodyTbl.rows[i]; i++) {
            theSortedRows[i] = new Array(row.cells[gbCol].firstChild.firstChild.data, row.outerHTML, objHeadTbl.rows[0].cells[gbCol].dataType, row.id, oTitle);
        }
		
		theSortedRows.sort(this.sortRule);
        
        var str = "";
        var c1, c2, c3;
        if (this.bt == "IE") {
            c1 = "#316AC5";
            c2 = "#FFFFFF";
            c3 = "#F1F1F1";
        }
        if (this.bt == "Firefox") {
            c1 = "rgb(49, 106, 197)";
            c2 = "rgb(255, 255, 255)";
            c3 = "rgb(241, 241, 241)";
        }
        for (i = 0; i < theSortedRows.length; i++) {
            strTR = theSortedRows[i][1];
            
            if (theSortedRows[i][3] == this.actRow.id) {
                strTR = this.strReplace(strTR, "background", c1);
                strTR = this.strReplace(strTR, "color", c2);
            }
            else if (!this.options.isRender || i % 2 == 0) 
                 strTR = this.strReplace(strTR, "background", c2);
            else strTR = this.strReplace(strTR, "background", c3);
            str += strTR;
        }
        str = "<table id='tBody" + this.options.id + "' class='tBody' cellspacing='0' border='0' onselectstart = event.returnValue=false;>" + str + "</table>";
        $("dBodyRight" + this.options.id).innerHTML = str;
		
		this.eventManageForTBody();
	},

    sortRule: function(a, b){
        if (a[2] == "number") {
            if (parseInt(a[0]) > parseInt(b[0])) return (a[4].asc) ? -1 : 1;
            else if (parseInt(a[0]) < parseInt(b[0])) return (a[4].asc) ? 1 : -1;
            else return 0;
        }
        else {
            if (a[0].toLowerCase() > b[0].toLowerCase()) return (a[4].asc) ? -1 : 1;
            else if (a[0].toLowerCase() < b[0].toLowerCase()) return (a[4].asc) ? 1 : -1;
            else return 0;
        }
	}, 
   
	strReplace: function(str, tag, color){
        var index = str.indexOf(tag);
        if (index == -1) {
            index = str.indexOf(tag.toUpperCase());
            return str.substring(0, index + tag.length + 2) + color + str.substring(index + tag.length + 9);
        }
        return str.substring(0, index + tag.length + 2) + color + str.substring(index + tag.length + 20);
	},	
	
	showArrow: function(objSrc){
        var objImg = $("sortImg" + objSrc.cellIndex + this.options.id);
        var objBodyTbl = $("tBody" + this.options.id);
        if (this.options.titleData[objSrc.cellIndex].asc) objImg.src = this.options.imgPath + "sort_desc.gif";
        else objImg.src = this.options.imgPath + "sort_asc.gif"
        objImg.style.display = "";
        if (this.lastSortCell != null && this.lastSortCell.id != objSrc.id) 
            $("sortImg" + this.lastSortCell.cellIndex + this.options.id).style.display = "none";
	},
	
	createTag: function(tagName){
		return document.createElement(tagName);
	},
	
	getSrcElement: function(event, tagName){
		var eleSrc = event.srcElement || event.target;
		if(!tagName)return eleSrc;
		while(eleSrc.tagName != tagName)eleSrc = eleSrc.parentNode;
		return eleSrc;
	},
	
	getEvent: function(evt){
        var objEvt = new Object();
        if (evt.offsetX == undefined) {
            var evtOffsets = this.getOffset(evt);
            objEvt.offsetX = evtOffsets.offsetX;
            objEvt.offsetY = evtOffsets.offsetY;
            objEvt.clientX = evtOffsets.clientX;
            objEvt.clientY = evtOffsets.clientY;
            return objEvt;
        }
        else return evt;
	},
	
    getOffset: function(evt){
        var target = evt.target;
        if (target.offsetLeft == undefined) {
            target = target.parentNode;
        }
        var pageCoord = this.getPageCoord(target);
        var eventCoord = {
            x: window.pageXOffset + evt.clientX,
            y: window.pageYOffset + evt.clientY
        };
        var offset = {
            offsetX: eventCoord.x - pageCoord.x,
            offsetY: eventCoord.y - pageCoord.y,
            clientX: eventCoord.x,
            clientY: eventCoord.y
        };
        return offset;
	},
	
	getPageCoord: function (element){
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
	},
	
	getBrowserType: function (){
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
    },
	
	browserCompatible: function (){
		if(this.bt == "Firefox"){
			$("dBodyLeft"+this.options.id).style.top = this.getAbsPosition($(this.options.id), "top") + $("dHead" + this.options.id).getHeight();
		}
	},
	
	/**
	 * 获取元素的绝对坐标
	 * @param {Object} dir 坐标方位，传递（l、L、left）返回left坐标，传递（t、T、top）返回top坐标，不传则返回objet{left,top}
	 */
	getAbsPosition: function(container, dir){
        var nL = 0;
        var nT = 0;
        var o = container;
        while (o != null && (o.offsetParent)) {
            if (!dir) {
                nL += o.offsetLeft;
                nT += o.offsetTop;
            }
            else if (dir == "l" || "L" || "left") nL += o.offsetLeft;
            else if (dir == "t" || "T" || "top") nL += o.offsetTop;
            o = o.offsetParent;
        }
        if (dir) return nL;
        else {
            var oP = {
                left: nL,
                top: nT
            }
            return oP;
        }
    },
	
	parseXml: function(data){
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
			o.loadXML(data);	
		}else{
		    o = document.implementation.createDocument("","",null);
			o.async = false;
			o.preserveWhiteSpace=true;
		}
	    return o;
	},
	
	getPicked: function(){
		if($(this.actRow.id))return this.getRow($(this.actRow.id));
	},
	
	getChecked: function(b){
		if(b==null)b = false;
		var arrChecked = new Array();
		var tBody = $("tBody"+this.options.id);
	    var colCheck = document.getElementsByName("checkbox"+this.options.id);
	    for(var i=0; i<colCheck.length; i++){
	    	if(b || (!b && colCheck[i].checked == true)){
	    		var obj = new Object();
	    		obj = this.getRow(tBody.rows[colCheck[i].parentNode.parentNode.rowIndex]);
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
			alert("浏览没有正确设置");
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
		var oTable = $("tBody"+this.options.id);
		try{
			 var oWD = new ActiveXObject("Word.Application");
		}catch(e){
			alert("浏览没有正确设置");
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
	},
	
	showContextMenu: function(evt){
		var top, left;
		if(this.bt=="IE"){
			top = parseInt(evt.clientY) + document.body.scrollTop;
			left = parseInt(evt.clientX) + document.body.scrollLeft;
		}
		else if(this.bt=="Firefox"){
			top = evt.clientY;
			left = evt.clientX;
		}
		var menuDiv = this.createTag("DIV");
		document.body.appendChild(menuDiv);
	    menuDiv.className = "contextmenu";
	    menuDiv.style.position = "absolute";
	    menuDiv.style.top = top;
		menuDiv.style.left = left;
	    menuDiv.style.zIndex = 50;
		var menuTable = this.createTag("TABLE");
		menuDiv.appendChild(menuTable);
		if(this.bt=="IE"){
			menuTable.focus();
			menuTable.onblur = function(){
				document.body.removeChild(menuDiv);
			}
		}
		if(this.bt=="Firefox"){
			menuDiv.style.overflow = "auto";
			window.setTimeout(function(){menuDiv.focus();}, 0);
			menuDiv.onblur = function(){
				document.body.removeChild(menuDiv);
			}
		}
		
		var menu = new ContextMenu(menuTable, this.options.imgPath);
		return menu;
	}	
	
}

function ContextMenu(menu, imgPath){
	var self = this;
	this.addItem = function(text, picture, cssText){
		var row;
		if(!picture)picture = imgPath + "accept.png";
		if(document.all){
			row = menu.insertRow();
			var cell = row.insertCell();
			cell.width = "20px";
			var img = document.createElement("IMG");
			cell.appendChild(img);
			img.src = picture;
			cell = row.insertCell();
			cell.innerText = text;
			cell.style.paddingLeft = "5px";
			cell.style.paddingRight = "20px";
		}else{
			row = document.createElement("TR");
		    menu.appendChild(row);
			row.innerHTML = "<td width='20px'><img src='"+picture+"'/></td><td style='padding-left:5px; padding-right:20px;'>"+text+"</td>";
		} 
		row.onmouseover = function(){
			this.className = "over";
//			this.childNodes[1].style.border = "1px solid red";
		}
		row.onmouseout = function(){
			this.className = "out";
		}
		row.onmousedown = function(){
//			self.doClick(this);
            if(!this.doClick)return;//����
			try{
				this.doClick(this);
			} catch(e){
				alert("���?���쳣������ȡ��");
				return;
			}
		}
		return row;
	}
	
	this.doClick = function(obj){}
}