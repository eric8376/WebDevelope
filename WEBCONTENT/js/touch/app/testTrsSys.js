var topoView = {
		id : "topoView",
		rows : [ {
			view : "toolbar",
			id : "mainbar",
			type : "MainBar",
			data : [

			{
				type : "label",
				label : "拓扑图",
				id : 'logo',
				align : 'center'
			},

			{
				type : "button",
				label : "返回",
				align : "left",
				id : 'back',
				click : "doBack"
			} ]
		}, {
			view : "iframe",
			id : "topoFrame",
			src : "http://www.163.com"
		} ]
	};
var trysysView_list={
		view:"pagegrid",
		id:"trysysView_list",
		fields:[
				{
					id:"SYS_NAME",
					label:"系统名",
					width:document.width,
					template:"#SYS_NAME#"
				}
				
		],
		datatype:"json",
		url:contextPath+"/trs.spr?action=queryTrsSys",
		header:false,
		defaults:{ 
			
			limit:15,
			page:1
			
		}
        
		
        
};
var trysysView_view = {
		id : "mainview",
		rows : [ {
			view : "toolbar",
			id : "mainbar",
			type : "MainBar",
			data : [
			{
				type : "label",
				id : 'trysysText',
				align : 'center',
				label:"传输系统列表"
			},
			{
				type : "roundbutton",
				label : "拓扑图",
				align : "right",
				id : 'topoViewBtn',
				click : "doTopoView"
			}
			]
		},

		{
			id : "searchbar",
			view : "toolbar",
			type : "SubBar",
			data : [
			{
				type : "text",
				id : 'searchText',
				align : 'left'
			},
			{
				type : "button",
				label : "GO",
				align : "left",
				id : 'searchBtn',
				click : "doSearch"
			}
			
			]
		},
		trysysView_list
		]
	};
var config=
{
	view : "multiview", /* this parameter can be amitted */
	cells : [
trysysView_view,
topoView
 ]
}