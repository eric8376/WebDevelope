/**
 * @author swg
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

Grid.prototype = {
	//prototype...
	pageIndex: 1,
	pageSize: 20,
	actColor: "#316AC5",
	oSplit: null,
	lastSortCell: null,
	bt: "IE",
	menu: null,
	leftWidth: null,
	doClick: undefined, //event click interface
	doDblClick: undefined, //event dblClick interface
	doContextMenu: undefined, //event contextMenu interface

    //function...
	
	/*
	 * get the type of Browser
	 */
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
	
	/*
	 * initialize function
	 */
    initialize: function(){
        this.options = Object.extend({
			id: "grid_" + new Date().getTime(),
			width: "100%",
			height: "100%",
			showCheckbox: false,
			showSequence: false,
			showPage: false,
			adaptOutline: true,
			whiteSpace: "normal",
			cellWidth: null,
			titleData: null,
			page: null,
			minCellWidth: 15,
			isRender: true,
			imgPath: "",
			attachSvc: null,
			actRow:{}
        }, arguments[0] || {});	
		if(!$(this.options.id)){
			alert(this.options.id + " is not already registered in the DOM!");
			return;
		}
		
		if(typeof(this.options.width) == "string" && this.options.width.indexOf("%") >= 0){
			this.options.width = $(this.options.id).getWidth()*parseInt(this.options.width.substring(0,this.options.width.length-1))/100;
		}
		if(typeof(this.options.height) == "string" && this.options.height.indexOf("%") >= 0){
			this.options.height = $(this.options.id).getHeight()*parseInt(this.options.height.substring(0,this.options.height.length-1))/100;
		}
		
		this.bt = this.getBrowserType();
		this.createOutline();
		this.buildTitle();
		this.showNav();
		if(this.options.adaptOutline){
            this.updateWidth();
            this.rebuildTitle();
	    }
        if(this.options.showPage){
			this.buildPage();
		}
	},
	
	createOutline: function(){
        var divCtn = $(this.options.id);
        divCtn.className = "ctnDiv";
		divCtn.style.cssText += "width:" + this.options.width + "; height:" + this.options.height;
		
		divCtn.innerHTML = '<div id="headDiv'+this.options.id+'" class="headDiv" style="background-image:url('+this.options.imgPath+'grid-hrow.gif);"></div>'
							+'<div id="bodyDiv'+this.options.id+'" class="bodyDiv" onselectstart = event.returnValue=false;><div id="contDiv'+this.options.id+'" class="contDiv"></div></div>'
			   				+'<div id="footDiv'+this.options.id+'" class="footDiv" style="background-image:url('+this.options.imgPath+'foot-bg.gif);"></div>'
							+'<div id="navDiv'+this.options.id+'" class="navDiv" style="background-image:url(' + this.options.imgPath + 'special-col-bg.gif);"></div>'
							+'<div id="tipDiv'+this.options.id+'" class="tipDiv" style="background-image:url('+this.options.imgPath+'grid-hrow.gif);"><input type="checkbox"></div>';
		
		//adjust the height of navigation div
		this.adjustOutline();
		
		//add scroll event for body div
		this.bodyScroll = this.doBodyScroll.bindAsEventListener(this);
		Event.observe($("bodyDiv"+this.options.id), "scroll", this.bodyScroll);
		
		//
		this.tipDblclick = this.doTipDblclick.bindAsEventListener(this);
		Event.observe($("tipDiv"+this.options.id), "dblclick", this.tipDblclick);
		//		
		this.bodyContextMenu = this.doBodyContextMenu.bindAsEventListener(this);
		Event.observe($("bodyDiv"+this.options.id), "contextmenu", this.bodyContextMenu);
		
		divCtn.oncontextmenu = function (){return false;};
	},
	
	/*
	 * adjust the height of navigation div
	 */
	adjustOutline: function(){
		var head = $("headDiv"+this.options.id);
		var nav = $("navDiv"+this.options.id);
		var obody = $("bodyDiv"+this.options.id);
		var h = parseInt(this.options.height) - head.getHeight();
		if(this.options.showPage)h -= $("footDiv"+this.options.id).getHeight();
		obody.style.height = h;
		if(this.options.showCheckbox || this.options.showSequence)head.style.width = parseInt(this.options.width) - nav.getWidth();
		else head.style.width = parseInt(this.options.width);
//		head.style.width = "auto";
		nav.style.height = obody.clientHeight + "px";
	},
	
	buildTitle: function(){
		var s;
		var tWidth;
		if(this.options.adaptOutline)tWidth = "100%";
		else tWidth = (!this.options.showCheckbox && !this.options.showSequence)?parseInt(this.options.width) - $("tipDiv"+this.options.id).getWidth():this.options.width;
		s = "<table id='tHead"+this.options.id+"' cellpadding='0' cellspacing='0' border='0' style='width:"+tWidth+";' onSelectstart=event.returnValue=false;>";
		for(var i=0,col; col=this.options.titleData[i]; i++){
			if(!col.visible)continue;
			s += "<colgroup><col/></colgroup>";
		}	
		s += "<tr>";
		for(var i=0,col; col=this.options.titleData[i]; i++){
			s += "<td name='"+col.name+"' sortable='"+col.sortable+"' dataType='"+col.dataType+"' index='"+i+"'";
    	    if(col.visible == null)col.visible = true;
			if(col.visible && this.options.adaptOutline)
				s += " style='width:"+col.width+"'>"+col.text+"<img align='absmiddle' id='sortImg"+i+this.options.id+"' src='' style='display:none;'/></td>"; 
    	    else if(col.visible && !this.options.adaptOutline)
				s += " style='width:"+col.width+"'>"+col.text+"<img align='absmiddle' id='sortImg"+i+this.options.id+"' src='' style='display:none;'/></td>";
			else
    		    s += " style='width:0px; display:none'>"+col.text+"</td>";
        }
        s += "</tr></table>";
		$("headDiv" + this.options.id).innerHTML = s;

		this.eventManageForTitle();
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
	
	eventManageForTitle: function(){
		var tt = $("tHead" + this.options.id);
		var tc = tt.rows[0].cells;
		this.theadMove = this.doHeadTdMove.bindAsEventListener(this);
		this.theadDown = this.doHeadTdDown.bindAsEventListener(this);
		this.theadDblClick = this.doHeadTdDblClick.bindAsEventListener(this);
		this.theadContextMenu = this.doHeadContextMenu.bindAsEventListener(this);
        for (var i = 0; i < tc.length; i++) {
            Event.observe(tc[i], "mousemove", this.theadMove);
			Event.observe(tc[i], "mousedown", this.theadDown);
			Event.observe(tc[i], "dblclick", this.theadDblClick);
			Event.observe(tc[i], "contextmenu", this.theadContextMenu);
        }
		
		this.ctnMove = this.doCtnMove.bindAsEventListener(this);
		Event.observe($(this.options.id), "mousemove", this.ctnMove);
		this.bodyMouseUp = this.doBodyMouseUp.bindAsEventListener(this);
		Event.observe(document.body, "mouseup", this.bodyMouseUp);
	},
	
	/*
	 * load data function
	 */
	load: function(pData){
		 this.clearData();
		var oData = this.parseData(pData);		
		if(oData && oData.length>0)this.loadData(oData);
	},
	
	loadByPage: function(pData, pPage){
		this.clearData();
		var oData = this.parseData(pData);
		if(oData && oData.length>0)this.loadData(oData);
		this.options.page = pPage;
		this.updatePage();
	},
	
	parseData: function(pData){
		var oData;
		if(!pData)return null;
		if(typeof(pData) == "string"){
			if(pData.substring(pData.length-4,pData.length) == ".xml"){
                var xmlDoc = this.parseXml(pData, "file");
//                xmlDoc.load(pData);
			}else{
                var xmlDoc = this.parseXml(pData, "text");
//                xmlDoc.loadXML(pData);
			}
			oData = xmlDoc.getElementsByTagName("item");
		}else{
			oData = pData;
		}
		return oData;
	},
	
	/*
	 * load the data
	 */
	loadData: function(pData){
		var w;
		var text;
		var oPage = this.options.page;
		var num = this.options.showPage?(oPage.pageIndex - 1) * oPage.pageSize:0;        
		var tWidth = (!this.options.showCheckbox && !this.options.showSequence)?parseInt(this.options.width) - $("tipDiv"+this.options.id).getWidth():this.options.width;
		$("contDiv"+this.options.id).style.width = tWidth;     
		var sn = '<table width="100%" border="0" cellpadding="0" cellspacing="0" onselectstart = event.returnValue=false;>'
			+'<colgroup><col/></colgroup><colgroup><col/></colgroup><tbody>';
		var sb = '<table id="tBody"'+this.options.id+' border="0" cellpadding="0" cellspacing="0" width="'+tWidth+'" onselectstart = event.returnValue=false; >';
		
		for(var k=0, o; o=this.options.titleData[k]; k++){
			var className = (this.bt=="IE")?"col-hidden-IE":"col-hidden-Firefox";
			if(!o.visible)continue;
//			if(o.hidden)sb += "<colgroup class='"+className+"'><col/></colgroup>";
//			else sb += "<colgroup><col/></colgroup>";
			sb += "<colgroup><col/></colgroup>";
		}
		sb += "<tbody>";
		for (var i = 0, obj; obj = pData[i]; i++) {
		    sn += "<tr><td algin='center'><input name='checkbox" + this.options.id + "' type='checkbox' class='checkbox" + this.bt + "'/></td>"
			+"<td align='center'>" + (num + i + 1) + "</td></tr>";
			if (this.options.isRender && i % 2 == 1) {
				sb += "<tr style='background-image:url(" + this.options.imgPath + "row-def.gif)' ";
			}
			else {
			    sb += "<tr ";
			}
			sb += "id='tr-" + i + "-" + this.options.id + "'>";
			for (var j = 0, objCol; objCol = this.options.titleData[j]; j++) {
				w = objCol.width; /*1px by the td border-right width*/
				if(obj[objCol.name] == null)text = "";
				else text = obj[objCol.name];
                if (objCol.visible) 
					sb += "<td style='width:"+w+";'>" + text + "</td>";
                else 
					sb += "<td style='width:0px; display:none'>" + text + "</td>";
            }
			sb += "</tr>";
		}
		sn += "</tbody></table>";
        sb += "</tbody></table>";		
		
        $("navDiv" + this.options.id).innerHTML = sn;
        $("contDiv" + this.options.id).innerHTML = sb;
		this.adjustOutline();
        this.adjustNavTr();
//		this.render($("contDiv" + this.options.id).childNodes[0].rows[0]);
		this.showNav();
		
		this.eventManageForBody();
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
	
	eventManageForBody: function(){
		var rows = $("contDiv" + this.options.id).firstChild.rows;
		this.tbodyOver = this.doBodyTrOver.bindAsEventListener(this);
		this.tbodyOut = this.doBodyTrOut.bindAsEventListener(this);
		this.tbodyClick = this.doBodyTrClick.bindAsEventListener(this);
		this.tbodyDblClick = this.doBodyTrDblClick.bindAsEventListener(this);
		//this.tbodyContextMenu = this.doBodyTrContextMenu.bindAsEventListener(this);		
        for (var i = 0; i < rows.length; i++) {
            Event.observe(rows[i], "mouseover", this.tbodyOver);
			Event.observe(rows[i], "mouseout", this.tbodyOut);
			Event.observe(rows[i], "click", this.tbodyClick);
			Event.observe(rows[i], "dblclick", this.tbodyDblClick);
			//Event.observe(rows[i], "contextmenu", this.tbodyContextMenu);
        }
	},
	
	clearData: function(){
		$("navDiv" + this.options.id).innerHTML = "";
	    $("contDiv" + this.options.id).innerHTML = "";
		this.options.actRow = {};
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
	
	render: function(oTR){
        if (!oTR) return;
        if (this.options.actRow.id) {
            var obj = $(this.options.actRow.id);
            obj.style.backgroundImage = (!this.options.isRender || obj.rowIndex % 2 == 0) ? "" : "url("+this.options.imgPath + "row-def.gif)";
//            obj.style.color = "#000000";
        }
        oTR.style.backgroundImage = "url("+this.options.imgPath + "row-sel.gif)";
//        oTR.style.color = "#FFFFFF";
        this.options.actRow.id = oTR.id;
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
            alert("page is not exist");
            return;
        }
        if (pageSize > 500) {
            alert("setting max size 500");
            return;
        }
        if (pageSize == null) 
            pageSize = this.options.page.pageSize;
        this.options.page.pageIndex = parseInt(pageIndex);
        this.options.page.pageSize = parseInt(pageSize);
        try {
            if (!this.reLoad) {
				alert("function reLoad is not implement.");
                return;
			}
			eval(this.reLoad(this.options.page));
        } 
        catch (e) {
			alert("function reLoad exception.");
            return;
        }
        this.updatePage();
	},	
	
	updatePage: function(){
		$("footDiv" + this.options.id).innerHTML = "";
		this.buildPage();
	},
	
	buildPage: function(){
		var owner = this;
		var objPage = this.options.page;
		if(!objPage.pageCount)objPage.pageCount = 1;
		if(!objPage.recordCount)objPage.recordCount = 0;
		var imgPath = this.options.imgPath;
		var spg = "<table align='left' class='tPage' cellpadding='0' cellspacing='0'><tr>";
	    if(objPage.pageIndex>1)
	        spg += "<td width='3px'></td><td onmouseover='doOver(this)' onmouseout='doOut(this)'><img align='absmiddle' id='fst_"+this.options.id+"' src='"+imgPath+"page-first.gif'/></td><td width='3px'></td>"
	             + "<td width='3px'></td><td onmouseover='doOver(this)' onmouseout='doOut(this)'><img align='absmiddle' id='pre_"+this.options.id+"' src='"+imgPath+"page-prev.gif'/></td><td width='3px'></td>";
	    else
	  	    spg += "<td width='3px'></td><td><img align='absmiddle' src='"+imgPath+"page-first-disabled.gif'/></td><td width='3px'></td>"
	             + "<td width='3px'></td><td><img align='absmiddle' src='"+imgPath+"page-prev-disabled.gif'/></td><td width='3px'></td>";
	    if(objPage.pageIndex < objPage.pageCount)                                                     
	        spg += "<td width='3px'></td><td onmouseover='doOver(this)' onmouseout='doOut(this)'><img align='absmiddle' id='nxt_"+this.options.id+"' src='"+imgPath+"page-next.gif'/></td><td width='3px'></td>"
	             + "<td width='3px'></td><td onmouseover='doOver(this)' onmouseout='doOut(this)'><img align='absmiddle' id='lst_"+this.options.id+"' src='"+imgPath+"page-last.gif'/></td><td width='3px'></td>";
	    else 
	        spg += "<td width='3px'></td><td><img align='absmiddle' src='"+imgPath+"page-next-disabled.gif'/></td><td width='3px'></td>"
	             + "<td width='3px'></td><td><img align='absmiddle' src='"+imgPath+"page-last-disabled.gif'/></td><td width='3px'></td>";                      
	    spg += "<td>&nbsp;<img align='absmiddle' src='"+imgPath+"grid-split.gif' />&nbsp;</td>"
	                          + "<td>Page</td><td><input id='pageIndex"+this.options.id+"' type='text' value='"+objPage.pageIndex+"' onkeypress='doKeyPress(event)' onChange='doChange(this)' /></td><td>of "+objPage.pageCount+"</td>"
	                          + "<td>&nbsp;<img align='absmiddle' src='"+imgPath+"grid-split.gif' />&nbsp;</td>"
	                          + "<td>Size </td><td><input id='pageSize"+this.options.id+"' type='text' value='"+objPage.pageSize+"' onkeypress='doKeyPress(event)' onChange='doChange(this)' />&nbsp;</td>"
	                          + "<td><img align='absmiddle' src='"+imgPath+"grid-split.gif' />&nbsp;</td>"
	                          + "<td width='3px'></td><td onmouseover='doOver(this)' onmouseout='doOut(this)'><img id='ref_"+this.options.id+"' align='absmiddle' src='"+imgPath+"done-disable.gif'/></td><td width='3px'></td>"
	                          + "<td>&nbsp;<img align='absmiddle' src='"+imgPath+"grid-split.gif'/></td></tr></table>"
							  + "<table style='float:right; padding-right:4px;'><tr><td align='right' style='padding-right:4px;'>Total Number "+objPage.recordCount+"</td><tr></table>";
		$("footDiv" + this.options.id).innerHTML = spg;
		
		doKeyPress = function(myEvent){
		    var keys=myEvent.keyCode || myEvent.which;
			if(!(document.all)&&keys==8)return;
            if (keys<48 || keys>57){
                if(document.all)myEvent.returnValue=false;//ie
                else myEvent.preventDefault();//ff
            } 
		} 
		
		doChange = function(src){
			$("ref_"+owner.options.id).src = imgPath+"done.gif";
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
		
		this.eventManageForPage();
	},
	
	/*
	 * event function
	 */
	doBodyScroll: function(event){
		var src = event.srcElement || event.target;
		var tip = $("tipDiv"+this.options.id);
		var nav = $("navDiv"+this.options.id);
		var head = $("headDiv"+this.options.id);
		var obody = $("bodyDiv"+this.options.id);
		head.style.left = (tip.style.display == "none") ? (-src.scrollLeft+"px"):($(tip).getWidth()-src.scrollLeft+"px");
		nav.style.top = head.getHeight() - src.scrollTop + "px";
		nav.style.height = src.scrollTop + obody.clientHeight + "px"; 
	},
	
	doTipDblclick: function(event){
		var src = event.srcElement || event.target;
		var nav = $("navDiv"+this.options.id);
		nav.firstChild.checked = !nav.firstChild.checked;
		if(this.options.showCheckbox){
			var col = nav.getElementsByTagName("INPUT");
	        for (var i = 0, o; o = col[i]; i++) {
				if(col[i].type == "checkbox")col[i].checked = nav.firstChild.checked;
	        }
		}
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
			if(evt.offsetX < 2 || evt.offsetX > $(eleSrc).getWidth()-4)
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
            var localTop = parseInt(evt.clientY) - evt.offsetY + parseInt(document.body.scrollTop);
            var localHeight = $("bodyDiv" + this.options.id).clientHeight + $("headDiv" + this.options.id).getHeight();
            var localLeft = -1;
            if (parseInt(evt.offsetX) > ($(eleSrc).getWidth() - 8)) {
                localLeft = parseInt(evt.clientX) + $(eleSrc).getWidth() - parseInt(evt.offsetX) + document.body.scrollLeft;
            }
            else if (parseInt(evt.offsetX) < 2) {
                eleSrc = eleSrc.previousSibling;
                localLeft = parseInt(evt.clientX) - parseInt(evt.offsetX) + document.body.scrollLeft;
            }
            else return;
            this.oSplit = this.createSplit(localLeft, localTop, localHeight);
            this.oSplit.originX = localLeft;
            if (eleSrc.style.display == "none") this.oSplit.targetCell = eleSrc.previousSibling;
            else this.oSplit.targetCell = eleSrc;
        }
	},
	
	doHeadTdDblClick: function(event, src){
	   //sort...
       src = src || this.getSrcElement(event,"TD");
	   var index = src.getAttribute("index");
	   if(src.style.cursor == "col-resize"){
	       //adjust the cell width to max
		   var evt = this.getEvent(event);
		   if (parseInt(evt.offsetX) < 2) {
		       src = src.previousSibling;
		   }
		   this.adjustCellMax(src);
		   return;	
	   }
       if (!this.options.titleData[index].sortable) return;
       if ($("contDiv" + this.options.id).innerHTML == "") return;
       this.sortDeal(src);
       this.showArrow(src);
       this.lastSortCell = index;
	},
	   
	doHeadContextMenu: function(event){
		var owner = this;
		var eleSrc = this.getSrcElement(event,"TD");
	    var evt = this.getEvent(event);
		var top = parseInt(evt.clientY) + document.body.scrollTop + $(eleSrc).getHeight() - evt.offsetY;
		var left = parseInt(evt.clientX) + document.body.scrollLeft - evt.offsetX;
		var columns = [];
		if(eleSrc.style.cursor == "col-resize")return;
		
		if (this.bt == "Firefox") {
		    top -= 2;
			left += 4;
		}
		
		for(var i=0, obj; obj=this.options.titleData[i]; i++){
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
			disabled: !this.options.titleData[eleSrc.getAttribute("index")].sortable || false,
			response: "sort",
			type: 1
		},{
			text: "Sort Desc",
			imgUrl: "img/hmenu-desc.gif",
			disabled: !this.options.titleData[eleSrc.getAttribute("index")].sortable || false,
			response: "sort",
			type: 2
		},{
			hr:true
		},{
			text: "Show Line Numbers",
			imgUrl: (this.options.showSequence)?"img/tick.gif":"",
			response: "nav",
			type: 1
		},{
			text: "Show Check Boxes",
			imgUrl: (this.options.showCheckbox)?"img/tick.gif":"",
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
	    
		if(this.menu){
			this.menu.createMenu({top:top, left:left, data:pData});
		}else{
			this.menu = new Menu({id:"menu", data:pData, top:top, left:left});
		}
		this.menu.doClick = function(src){
			var response = src.getAttribute("response");
			var type = src.getAttribute("type");
			if(response == null)return;
			if(response == "sort"){
		        owner.options.titleData[eleSrc.cellIndex].asc = (type==1)?true:false;
				owner.doHeadTdDblClick(event,eleSrc);
			}
			if(response == "nav"){
				if(type == 1)owner.options.showSequence = !owner.options.showSequence;
				if(type == 2)owner.options.showCheckbox = !owner.options.showCheckbox;
				owner.showNav();
			}
            if(response == "columns"){
				var hidden = owner.options.titleData[type].hidden;
				if(!hidden)hidden = true;
				else hidden = false;
				owner.columnsControl(type, hidden);
			}
			if(response == "export"){
				switch(type){
					case "1": owner.exportExcel(false);break;
					case "2": owner.exportWord(false);break;
				}
			}
		};
	},
	
	doCtnMove: function(event){
        var eleSrc = this.getSrcElement(event);
        var evt = this.getEvent(event);
        if (this.oSplit != null) {
            if (parseInt(evt.clientX) + document.body.scrollLeft > (this.oSplit.originX - $(this.oSplit.targetCell).getWidth() + this.options.minCellWidth)) 
                this.oSplit.style.left = evt.clientX + document.body.scrollLeft;
			$("headDiv"+this.options.id).style.cursor = "col-resize";
			$("bodyDiv"+this.options.id).style.cursor = "col-resize";
			$("footDiv"+this.options.id).style.cursor = "col-resize";
        }
	},
	
	doBodyMouseUp: function(){
		$("headDiv"+this.options.id).style.cursor = "default";
		$("footDiv"+this.options.id).style.cursor = "default";
		$("bodyDiv"+this.options.id).style.cursor = "default";
		if (!this.oSplit) return;
        document.body.removeChild(this.oSplit);
        
        //resize cell width...
        this.resetCellWidth();
        this.oSplit = null;
		
        document.ondragstart = function(){return true};
        document.body.onselectstart = function(){return true};
	},
	
	doBodyTrOver: function(event){
		var src = this.getSrcElement(event,"TR");
		if(src.id == this.options.actRow.id)return;
		src.style.backgroundImage = "url("+this.options.imgPath+"row-over.gif)";
	},
	
	doBodyTrOut: function(event){
		var src = this.getSrcElement(event,"TR");
		if(src.id == this.options.actRow.id)return;
	    src.style.backgroundImage = (this.options.isRender && src.rowIndex%2 == 1)?"url("+this.options.imgPath+"row-def.gif)":"";
	},
	
	doBodyTrClick: function(event){
		var src = this.getSrcElement(event,"TR");
		this.render(src);
		//click event interface
		if(this.doClick)this.doClick(this.getRow(src));
	},
	
	doBodyTrDblClick: function(event){
		var src = this.getSrcElement(event,"TR");
		if(this.doDblClick)this.doDblClick(this.getRow(src));
	},
	
	doBodyTrContextMenu: function(event){
		return;
		var src = this.getSrcElement(event,"TR");
		var evt = this.getEvent(event);
		var o = this.getRow(src);
		this.render(src);
		if(this.doContextMenu)this.doContextMenu(o, evt);
	},
	
	doBodyContextMenu: function(event){
		var src = this.getSrcElement(event);
		var evt = this.getEvent(event);
		if(src.tagName == "TD" || src.tagName == "TR"){
		    var src = this.getSrcElement(event,"TR");			
			var o = this.getRow(src);
			this.render(src);
			if(this.doContextMenu)this.doContextMenu(o, evt);
		}
		else if(src.tagName == "DIV"){
			if(this.doContextMenu)this.doContextMenu(null, evt);
		}
		else return;
	},
	
	
	/*
	 * public function
	 */
	createSplit: function (pLeft, pTop, pHeight){
	    var objDiv = this.createTag("DIV");
	    objDiv.id = "splitDiv";
	    objDiv.className = "split"; 
	    objDiv.style.top = pTop;
	    objDiv.style.left = pLeft;
	    objDiv.style.height = pHeight;
	    document.body.appendChild(objDiv);
	    return objDiv;
	},
	
	resetCellWidth: function(){
	    var objTh = $("tHead"+this.options.id);
//		var index = this.oSplit.targetCell.cellIndex;
		var index = this.oSplit.targetCell.getAttribute("index");
		var cont = $("contDiv"+this.options.id);
		var cols = cont.getElementsByTagName("col");
		var add = parseInt(this.oSplit.style.left) - this.oSplit.originX;
	    var inc = $(this.oSplit.targetCell).getWidth() + add;
		
		objTh.style.width = $(objTh).getWidth() + add;
		objTh.rows[0].cells[index].style.width = inc;
		if(!cont || cont.innerHTML == "")return;
		cont.firstChild.style.width = $(cont.firstChild).getWidth() + add;
		//cols[index].style.width = inc;
		var bodyTblRows = cont.firstChild.rows;
		for(var i=0; i<bodyTblRows.length; i++){
			bodyTblRows[i].cells[index].style.width = inc;
	   	}
		
		//this.resetLeftHeight();
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
        
        var str = "";
        for(var k=0, o; o=this.options.titleData[k]; k++){
			if(!o.visible)continue;
			if(o.hidden){
				str += "<colgroup class='"+className+"'><col/></colgroup>";
			}
			else {
				str += "<colgroup><col/></colgroup>"
			};
		}
		str += "<tbody>";
		for (i = 0; i < sortedRows.length; i++) {
			if (!this.options.isRender || i % 2 == 0){
				str += "<tr id='" + sortedRows[i][1].id + "'>" + sortedRows[i][1].innerHTML + "</tr>";
			}else{
				str += "<tr id='" + sortedRows[i][1].id + "' style='background-image:url("+this.options.imgPath+"row-def.gif);'>" + sortedRows[i][1].innerHTML + "</tr>";
			} 
        }
		str += "</tbody>";
        $("contDiv" + this.options.id).innerHTML = "<table id='tBody" + this.options.id + "' cellpadding='0' cellspacing='0' border='0' onselectstart = event.returnValue=false;>" + str + "</table>";
				
		this.render($(this.options.actRow.id));
		this.eventManageForBody();
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
	
	createTag: function(tagName){
		return document.createElement(tagName);
	},
	
	/*
	 * base function
	 */
	parseXml: function(data, type){
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
//            clientX: eventCoord.x,
//            clientY: eventCoord.y
			clientX: evt.clientX,
            clientY: evt.clientY
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
	
	getEleOffset: function(ele, sup, dir){
        var nl = 0;
        var nt = 0;
        var o = ele;
        while (o != null && (o.offsetParent) && o.offsetParent != sup) {
            if (!dir) {
                nl += o.offsetLeft;
                nt += o.offsetTop;
            }
            else if (dir == "l" || "L" || "left") nl += o.offsetLeft;
            else if (dir == "t" || "T" || "top") nl += o.offsetTop;
            o = o.offsetParent;
        }
        if (dir) return nl;
        else {
            var op = {
                left: nl,
                top: nt
            }
            return op;
        }
    },
	
	getRow: function(obj){
		var o = {};
		for(var i=0,cell; cell=obj.cells[i]; i++){
			o[this.options.titleData[i].name] = cell.innerHTML;
		}
		return o;
    },
	
	getPicked: function(){
		if($(this.options.actRow.id))return this.getRow($(this.options.actRow.id));
	},
	
	getChecked: function(b){
		if(b==null)b = false;
		var arrChecked = new Array();
		var tBody = $("contDiv"+this.options.id).firstChild;
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
