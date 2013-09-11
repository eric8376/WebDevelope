var trysysView_list={
		view:"pagegrid",
		id:"trysysView_list",
		fields:[
				{
					id:"STATION_NO",
					label:"站点编码",
					width:200,
					align:"center",
					template:"#STATION_NO#"
				},
				{
					id:"CHINA_NAME",
					label:"站点名称",
					width:250,
					align:"center",
					template:"#CHINA_NAME#"
				},
				{
					id:"TYPE",
					label:"站点类型",
					width:150,
					align:"center",
					template:"#TYPE#"
				},
				{
					id:"OPEN_TIME",
					label:"开通时间",
					width:150,
					align:"center",
					template:"#OPEN_TIME#"
				},
				{
					id:"BUILDING_GRADE",
					label:"网络层级",
					align:"center",
					template:"#BUILDING_GRADE#",
					hidden:true
				},
				{
					id:"INCLUDING_RANGE",
					label:"覆盖范围",
					align:"center",
					template:"#INCLUDING_RANGE#",
					hidden:true
				},
				{
					id:"REGION_NAME",
					label:"行政区域",
					align:"center",
					template:"#REGION_NAME#",
					hidden:true
				},{
					id:"LOCATION",
					label:"地址",
					align:"center",
					template:"#LOCATION#",
					hidden:true
				}
				
		],
		datatype:"json",
		url:contextPath+"/trs.spr?action=querySite",
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
				label:"站点查询"
			},
			{
				type : "roundbutton",
				label : "详细信息",
				align : "right",
				id : 'showDetail',
				click : "showDetail"
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
var detail_view_list={
		view:"pagegrid",
		id:"detail_view_list",
		fields:[
			{
				id:"key",
				label:"属性",
				width:300,
				align:"center",
				template:"#key#",
				css:"gridTitleCol"
				
				
			},
			{
				id:"value",
				label:"属性值",
				width:550,
				align:"center",
				template:"#value#",
				css:"gridValueCol"
				
			}
		],
		datatype:"json",
		url:"www.163.com",
		header:false,
		defaults:{ 
			
			limit:15,
			page:1,
			footerhidden:true
			
		}
};
function getGridView(id,label,gridConfig,appendToolBarItem)
{
	var baseToolBarItem=[

	 				{
	 					type : "label",
	 					label : label,
	 					id : id+'_logo',
	 					align : 'center'
	 				},

	 				{
	 					type : "button",
	 					label : "返回",
	 					align : "left",
	 					id : id+'_back',
	 					click : "doBack"
	 				}];
	if(appendToolBarItem)
		baseToolBarItem=baseToolBarItem.concat(appendToolBarItem);
	var view={
			id : id,	
			rows : [ {
				view : "toolbar",
				id : id+"_mainbar",
				type : "MainBar",
				data : baseToolBarItem
			}, gridConfig ]
		}
	return view;
}
var config=
{
	view : "multiview", /* this parameter can be amitted */
	cells : [
trysysView_view,
getGridView('detail_view',"详细信息",detail_view_list)
 ]
}