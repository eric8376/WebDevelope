//
var custList2={
		
			view : "dataview",
			id : "custList2",
			url : contextPath + '/cust.spr?action=queryCust',
			datatype : "json",
			template : '#ROWNUM#  <span class="contact" ><img height="20"  src="../../images/LOGO/#CUST_ID#.png"/><strong>#CUST_NO#</strong></span>',
			select : true,
			type : {
				
				height : 35,
				width: document.width/4-22
			}

		
};
var custList1={
		view : "list",
		id : "custList1",
		url : contextPath + '/cust.spr?action=queryCust',
		datatype : "json",
		template : '#ROWNUM#   <span class="contact" ><img height="20"  src="../../images/LOGO/#CUST_ID#.png"/><strong>#CUST_NO#</strong></span>',
		select : true,
		type : {
			
			
			width: document.width-20
		}
};
var custView = {
	id : "custView",
	rows : [
			{
				view : "toolbar",
				id : "mainbar",
				type : "MainBar",
				data : [
                {
	              type:"toggle", id:'listMode', options: ["列表模式","图标模式"], values: ["list", "icon"], width: 240, align: "left" ,click:"listModeHandler"
                },
				{
					type : "label",
					label : "客户列表",
					id : 'logo',
					align : 'center'
				},

				{
					type : "button",
					label : "功能",
					align : "right",
					id : 'map',
					popup : "saveMenu"
				} ]
			},
			{
				view : "toolbar",
				id : "searchbar",
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
				} ]
			},
			custList1

	]
};

//
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
//网络描述
var netdesc_view_list={
		view:"pagegrid",
		id:"netdesc_view_list",
		fields:[
            {
	        id:"STATION_NAME",
	        label:"局站名称",
	        width:250,
	        align:"center",
	        template:"#STATION_NAME#"
            },    
		    {
			id:"STATION_ADDRESS",
			label:"局站地址",
			width:250,
			align:"center",
			template:"#STATION_ADDRESS#"
		    },   
			{
				id:"EQP_NAME",
				label:"主要节点",
				width:250,
				align:"center",
				template:"#EQP_NAME#"
			},
			{
				id:"CIR_INFO",
				label:"节点电路信息",
				width:300,
				align:"center",
				template:"#CIR_INFO#"
				
			},
			{
				id:"UPPER_NODE",
				label:"上联网元",
				width:300,
				align:"center",
				template:"#UPPER_NODE#",
				hidden:true
				
			},
			{
				id:"PROTECT_TYPE",
				label:"保护方式",
				width:200,
				align:"center",
				template:"#PROTECT_TYPE#",
				hidden:true
				
			},
			{
				id:"OPT_INFO",
				label:"光路情况",
				width:150,
				align:"center",
				template:"#OPT_INFO#",
				hidden:true
				
			},
			{
				id:"NODE_DESC",
				label:"节点描述",
				width:150,
				align:"center",
				template:"#NODE_DESC#",
				hidden:true
				
			}
		],
		datatype:"json",
		url:"www.163.com",
		defaults:{ 
			
			limit:15,
			page:1
			
		}
		
};
//客户信息
var custinfo_view_list={
		view:"pagegrid",
		id:"custinfo_view_list",
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
//客户信息
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
//两端设备列表
var bothDevice_view_list={
		view:"pagegrid",
		id:"bothDevice_view_list",
		fields:[
			{
				id:"CIRCUIT_NO",
				label:"电路/光路编号",
				width:150,
				align:"center",
				template:"#CIRCUIT_NO#"
				
				
				
			},
			{
				id:"BUZ_TYPE",
				label:"业务类型",
				width:150,
				align:"center",
				template:"#BUZ_TYPE#"
				
			},
			{
				id:"SPECIALITY",
				label:"专业",
				width:150,
				align:"center",
				template:"#SPECIALITY#"
				
			},
			{
				id:"ROOM_NAME",
				label:"机房名称",
				width:250,
				align:"center",
				template:"#ROOM_NAME#"
				
			},
			{
				id:"EQP_NAME",
				label:"设备名称",
				width:300,
				align:"center",
				template:"#EQP_NAME#",
				hidden:true
				
			},
			{
				id:"EQP_NO",
				label:"设备编号",
				width:300,
				align:"center",
				template:"#EQP_NO#",
				hidden:true
				
			}
		],
		datatype:"json",
		url:"www.163.com",
		defaults:{ 
			
			limit:15,
			page:1
			
		}
};
//电路光路列表
var circuit_view_list={
		view:"pagegrid",
		id:"circuit_view_list",
		fields:[
			{
				id:"CIRCUIT_NO",
				label:"电路/光路编号",
				width:250,
				align:"center",
				template:"#CIRCUIT_NO#"
				
				
				
			},
			{
				id:"BUZ_TYPE",
				label:"业务类型",
				width:200,
				align:"center",
				template:"#BUZ_TYPE#"
				
			},
			{
				id:"OPR_STATE",
				label:"电路/光路状态",
				width:200,
				align:"center",
				template:"#OPR_STATE#"
				
			},
			{
				id:"RATE",
				label:"电路/光路速率",
				width:150,
				align:"center",
				template:"#RATE#"
				
			},
			{
				id:"FORMAL_CIRCUIT_NO",
				label:"国内国际编码",
				width:200,
				align:"center",
				template:"#FORMAL_CIRCUIT_NO#",
				hidden:true
				
				
			},
			{
				id:"ROUTE",
				label:"电路/光路路由",
				width:300,
				align:"center",
				template:"#ROUTE#",
				hidden:true
				
			}
			,
			{
				id:"ISACLASS",
				label:"是否A类电路",
				width:300,
				align:"center",
				template:"#ISACLASS#",
				hidden:true
				
			}
			,
			{
				id:"CUST_ACCESS_ADDRESS",
				label:"A端接入地址",
				width:300,
				align:"center",
				template:"#CUST_ACCESS_ADDRESS#",
				hidden:true
				
			}
			,
			{
				id:"Z_CUST_ACCESS_ADDRESS",
				label:"Z端接入地址",
				width:300,
				align:"center",
				template:"#Z_CUST_ACCESS_ADDRESS#",
				hidden:true
				
			}
			,
			{
				id:"CIRCUIT_DESC",
				label:"电路描述",
				width:300,
				align:"center",
				template:"#CIRCUIT_DESC#",
				hidden:true
				
			}
		],
		datatype:"json",
		url:"www.163.com",
		defaults:{ 
			
			limit:15,
			page:1
			
		}
};
//
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
function getGridDetailView(id,label,gridConfig)
{
	var showDetailItem=[{
		type : "button",
		label : "详细信息",
		align : "right",
		id : id+'_showDetail',
		click : "showDetail"
	}];
	return getGridView(id,label,gridConfig,showDetailItem);
}
function doSearch() {
	var value = $$('searchbar').getValues()['searchText'];
	if (!value) {
		$$(currentId).filter( function() {
			return true;
		});
	} else {
		var searches = value.split(' '), regexps = [], i;
		for (i = 0; i < searches.length; i++) {
			if (!searches[i])
				return;
			regexps.push(new RegExp(searches[i], i));
		}
		;
		$$(currentId).filter( function(obj) {
			var matched = [];
			for (i = 0; i < regexps.length; i++) {
				var search = regexps[i];
				if (obj.CUST_NO.match(search))
					matched.push(true);
				else
					matched.push(false);
			}
			;
			if (regexps.length > 1 && matched.indexOf(false) != -1) {
				return false;
			} else {
				return matched[0];
			}
		});
	}
}