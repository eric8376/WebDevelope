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

var connectBoxView_list={
		epqTpye:"703",
		view:"pagegrid",
		id:"connectBoxView_list",
		fields:[
				{
					id:"CNT_BOX_NO",
					label:"交接箱编号",
					width:130,
					align:"center",
					template:"#CNT_BOX_NO#"
				},
				{
					id:"CNT_BOX_NAME",
					label:"交接箱名称",
					width:200,
					align:"center",
					template:"#CNT_BOX_NAME#"
					
				},
				{
					id:"REGION_NAME",
					label:"区域名称",
					width:100,
					align:"center",
					template:"#REGION_NAME#"
					
				},
				{
					id:"CAPACITY",
					label:"容量",
					width:100,
					align:"center",
					template:"#CAPACITY#"
					
				},
				{
					id:"LOCATION",
					label:"位置",
					width:300,
					align:"center",
					template:"#LOCATION#"
					
				}
		],
		datatype:"json",
		url:contextPath+"/opt.spr?action=queryConnectBox",
		defaults:{ 
			
			limit:15,
			page:1
			
		}
};
var houseView_list={
		epqTpye:"205",
		view:"pagegrid",
		id:"houseView_list",
		fields:[
				{
					id:"ROOM_NO",
					label:"机房编码",
					width:100,
					align:"center",
					template:"#ROOM_NO#"
				},
				{
					id:"CHINA_NAME",
					label:"机房名称",
					width:250,
					align:"center",
					template:"#CHINA_NAME#"
					
				},
				{
					id:"REGION_NAME",
					label:"区域名称",
					width:90,
					align:"center",
					template:"#REGION_NAME#"
					
				},
				{
					id:"HEIGHT",
					label:"高度",
					width:80,
					align:"center",
					template:"#HEIGHT#"
					
				},
				{
					id:"SPECIALITY",
					label:"专业",
					width:100,
					align:"center",
					template:"#SPECIALITY#"
					
				},{
					id:"LOCATION",
					label:"位置",
					width:300,
					align:"center",
					template:"#LOCATION#"
					
				}
		
		],
		datatype:"json",
		url:contextPath+"/opt.spr?action=queryHouse",
		defaults:{ 
			
			limit:15,
			page:1
			
		}
};
var searchView = {
		id : "mainview",
		rows : [ {
			view : "toolbar",
			id : "queryTabber",
			type : "BigTabBar",
			data : [
			{
				type : "tabbar",
				id : 'tabbar',
				tabWidth : 102,
				tabs : [
				{
					label : '查询机房',
					src: '../../style/touch/images/unicom/jifang.png',
					key:'houseView_list',
					height:60	
					
				},
				{
					label : '查询交接箱',
					src: '../../style/touch/images/unicom/jiaojiexiang.png',
					key:'connectBoxView_list',
					height:60
					
				}
				]
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
		{
			view : "multiview", /* this parameter can be amitted */
			cells : [
houseView_list,
	connectBoxView_list
	
		 ]
		}
		]
	};