
dhx.ui.pagegrid=dhx.ui.map.pagegrid = dhx.proto({
_init:function(config){
	this.name = "DataGrid";
	this.version = "3.0";

	this._contentobj.innerHTML = "<div class='dhx_grid_header' style='width:100%;'></div><div class='dhx_grid_body'></div><div class='dhx_grid_footer'></div>";
	this._contentobj.className +=" dhx_grid";
	this._headerobj = this._contentobj.childNodes[0];
	this._bodyobj = this._contentobj.childNodes[1];
	this._footerobj = this._contentobj.childNodes[2];
	
	this._dataobj = this._bodyobj;
	if(!config.defaults.footerhidden)
	{
	this._pagetoolbarLayout=dhx.ui._view(get_page_toolbar(config.id));
	this._pagetoolbar=$$(config.id+'_pagebar');
	this._pagetoolbar.grid=this;
	this._pagetoolbar.attachEvent("onitemclick",this._pageBar_Hander);
	this._footerobj.appendChild(this._pagetoolbarLayout._contentobj);
	}
	dhx.extend(this,dhx.Scrollable);
	/*if (config.height!="auto")
		dhx.extend(this, dhx.VirtualRenderStack);	//extends RenderStack behavior*/
	this._after_init.push(this._after_init_call);
	this.data.provideApi(this,true);
	this._headerCells = {};
	var grid = this;
	this.data.attachEvent("onStoreUpdated",function(){
		dhx.delay(grid._renderData,grid,arguments,1);
	});
	
	this._sortedColumn = null;
	
	
	this.data._parse=function(data)
	{
		    this.datajson=data;
		    
			var array=[];
			array[0]=data.list?data.list:data;
		    dhx.DataStore.prototype._parse.apply(this,array);
		
			
	}
	//this.attachEvent("onAfterRender",this._render_toobar);
	
	

},
_pageBar_Hander:function(id,ev,trg)
{
	var griddata=this.grid.data.datajson;
	var gridconfig=this.grid.config.defaults;
	switch(id)
	{
	case "previousBtn":
	{
		
	    if(1==griddata.pageIndex)
	    {
	    	dhx.alert({title:"提示",message:"已经是第一页了。"});
	    }
	    else
	    {
	    	gridconfig.page--;
	    	this.grid.clearAll();
	    	this.grid.load(this.grid.config.url);
	    }
		break;
	}
	case "nextBtn":
	{
		if(griddata.lastPage==griddata.pageIndex)
	    {
			dhx.alert({title:"提示",message:"已经是最后一页了"});
	    }
		else{
			gridconfig.page++;
			this.grid.clearAll();
			this.grid.load(this.grid.config.url);
		}
		
		break;
	}
	case "refreshBtn":
	{
		this.grid.load(this.grid.config.url);
		break;
	}
	
	}
},
load:function(url,call)
{
	this._dataobj.innerHTML ="<div class='dhx_loading_cover' style='display:block'></div>";
	this._settings.url=url;
	if(this.param&&this.param!="") url=url+this.param;
	var appendstr="&limit="+this.config.defaults.limit;
	appendstr+="&page="+this.config.defaults.page;
	
	var arg=[];
	arg[0]=url+appendstr;
	arg[1]=call;
	dhx.DataLoader.load.apply(this, arg);
},
_render_toobar:function(){
	
},
_after_init_call:function(){
	
	//this._setHeaderVisibility();
},
header_setter:function(config){
	this._setHeaderVisibility(config);
	return config;
},
_setHeaderVisibility:function(mode){
	if(!arguments.length)
		mode = this._settings.header;
	this._headerobj.style.display = (mode?"":"none");
},
defaults:{
	 select:true,
	 type:"default",
	 sorting:true,
	 header:true,
	 scroll:true
	 
},
_id:"dhx_f_id",
on_click:{
	dhx_grid_row:function(e,id){
		if (this._settings.select){
			if (this._settings.select=="multiselect")
				this.select(id, e.ctrlKey, e.shiftKey); 	//multiselection
			else
				this.select(id);
		}
	},
	dhx_grid_header:function(e,id){
		if(!this._settings.sorting) return;
		id = dhx.html.locate(e,"column_id");
		if(id!==null){
			this._sortedColumn = id;
			this._renderHeader();
			var s = this._settings.fields[id].sort;
			this.sort(s.by,s.dir,s.as);
		}
	}
},
on_dblclick:{
},
on_mouse_move:{
},
_renderData:function(){
	if(this._settings.header){
		dhx.event(this._bodyobj,"scroll",dhx.bind(this._scrollHeader,this));
		this._bodyobj.style.height = this._contentobj.offsetHeight - this._headerobj.offsetHeight-this._footerobj.offsetHeight-2+"px";
		//this._dataobj.style.width = this._headerobj.firstChild.offsetWidth -(this._fakeField?20:0) +"px";
	}
	else{
		//var fields = this._settings.fields;
		//var width = 0;
		//for(var name in fields){
		//	width += fields[name].width;
		//}
		//this._bodyobj.style.height = this._contentobj.offsetHeight -2 + "px";
		//this._dataobj.style.width = width +"px";
	}
	this.render();
},
fields_setter:function(config){
	var fields ={};
	var total_width = 0;
	for(var i=0;i<config.length; i++){
		if(typeof(id)=="undefied")
			config[i].id = dhx.uid();
		var id = config[i].id;
		this._mergeSettings(config[i],{
			width:100,
			label:id,
			template:"#"+config[i].id+"#",
			css:this.type.css,
			sort:{
				by:"#"+id+"#",
				dir:"desc",
				as:"string"
			},
			align:"left"
		});
		config[i].template = dhx.Template(config[i].template);
		fields[id] = config[i];
		dhx.assert(typeof config[i].width == "number","Grid :: column width must be an integer number");
		total_width += config[i].width;
	}
	this.type.fields = fields;
	this.type.total_width = total_width;
	return fields;
},
_renderHeader:function(){

	var header, parentHeader, headerItem,row,w;
	var fields = this._settings.fields;
	parentHeader = this._headerobj;
	parentHeader.innerHTML = "";
	header = dhx.html.create("table",{
			"style":"width:0px;height:100%",
			"cellSpacing":0,
			"cellPadding":0,
			"layout":"fixed"
	},"");
	parentHeader.appendChild(header);
	header.appendChild(document.createElement("tbody"));
	if(header.firstChild){
		row = document.createElement("tr");
		header.firstChild.appendChild(row);
	}
	
	for(var name in fields){
		var t = fields[name];
		if(t.hidden) continue;
		this._renderHeaderItem(row,fields[name].label,fields[name].width,name);
	}
	if(this._settings.height!="auto"){
		this._fakeField = true;
		w = ((header.offsetWidth+20)<parentHeader.offsetWidth)?(parentHeader.offsetWidth-header.offsetWidth):20;
		this._renderHeaderItem(row,"&nbsp;",w);
	}
},
_renderHeaderItem:function(row,value,width,name){
	var headerItem = dhx.html.create("td",{
		"class":"dhx_grid_header_td",
		"style":"width:"+width+"px;padding:0px;spacing:0px;text-align:center;padding-top:10"
	},"");
	if(typeof name!="undefined")
		headerItem.setAttribute("column_id",name);
	var headerDiv = dhx.html.create("div",{
		"class":"dhx_div"
	},(value===""?"&nbsp;":value));
	headerItem.appendChild(headerDiv);
	this._headerobj.firstChild.style.width = this._headerobj.firstChild.offsetWidth + width+"px";
	row.appendChild(headerItem);
	if(this._settings.sorting&&name&& name==this._sortedColumn){
		var dir = this._settings.fields[this._sortedColumn].sort.dir;
		var headerSort = dhx.html.create("div",{
			"class":"sort_img "+dir,
			"style":"display:inline;text-align:center;vertical-align: middle;"
		},"");
		this._settings.fields[this._sortedColumn].sort.dir = (dir=="desc"?"asc":"desc");
		headerDiv.appendChild(headerSort);
	}
},
_scrollHeader:function(){
	this._headerobj.scrollLeft=this._bodyobj.scrollLeft;
},
_set_size:function(x,y){
	if (dhx.ui.map.view.prototype._set_size.apply(this, arguments)){
		x = this._content_width;
		y = this._content_height;
		this._bodyobj.style.height = y-(this._settings.header?this._headerobj.offsetHeight:0)-this._footerobj.offsetHeight+"px";
	}
	if(this._settings.header)
		this._renderHeader();
},
_getDimension:function(){
	var t = this.type;
	var d = t.border;
	return {x : this._dataobj.offsetWidth, y: t.height+d};
},
type:{ 
	correction:12,
	template:function(obj,type){
		var str = "";
		for(var name in type.fields){
			var t = type.fields[name];
			if(t.hidden) continue;
		 	str += "<td style='width:"+t.width+"px;padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px;' class='dhx_td' ><div align='"+t.align+"' style='word-break:break-all;line-height:"+type.height+"px' class='dhx_cell "+t.css+"'>"+t.template(obj)+"</div></td>";
		 }
		return str;
	},
	border:0,
	align:"center",
	height:31,
	css:"",
	sortImgWidth:10,
	type:"text",
	templateStart:function(obj,type){
		return "<table dhx_f_id='"+obj.id+"' class='"+type.templateCss(obj,type)+" dhx_grid_row"+(obj.$selected?"_selected":"")+"' cellpadding='0'   cellspacing='0'><tr>";
	},
	templateCss:dhx.Template(""),
	templateEnd:dhx.Template("</tr></table>")
}
}, dhx.SelectionModel, dhx.MouseEvents, dhx.KeyEvents, dhx.EditAbility, dhx.RenderStack, dhx.DataLoader, dhx.ui.map.view, dhx.EventSystem, dhx.Settings);

dhx.Type(dhx.ui.pagegrid,{
	name:"pagegrid"
});

var get_page_toolbar=function(id){
	
	return {
	rows:[
	      {
		view : "toolbar",
		id : id+"_pagebar",
		type : "SubBar",
		data : [

		{
			type : "prevbutton",
			label : "上一页",
			align : "left",
			id : 'previousBtn',
			click : ""
		},

		{
			type : "icon",
			icon:"refresh",
			align : "center",
			id : 'refreshBtn',
			click : ""
		},{
			type : "nextbutton",
			label : "下一页",
			align : "right",
			id : 'nextBtn',
			click : ""
		}
		]
	}
	      ]};
}

