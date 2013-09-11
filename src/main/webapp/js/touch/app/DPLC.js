	var srVar = [{id: '0',  value:"...请选择"},{id: '28040032',  value:"2M"},{id: '28040040',  value:"3M"},{id: '28040047',  value:"4M"},{id: '28040052',  value:"5M"},
	             {id: '28040060',  value:"6M"},{id: '28040063',  value:"7M"},{id: '28040065',  value:"8M"},{id: '28040003',  value:"10M"},
	             {id: '28040007',  value:"12M"},{id: '28040010',  value:"14M"},{id: '28040013',  value:"15M"},{id: '28040014',  value:"16M"},
	             {id: '28040015',  value:"17M"},{id: '28040017',  value:"18M"},{id: '28040024',  value:"20M"},{id: '28040026',  value:"22M"},
	             {id: '28040027',  value:"24M"},{id: '28040029',  value:"25M"},{id: '28040030',  value:"26M"},{id: '28040031',  value:"28M"},
	             {id: '28040034',  value:"30M"},{id: '28040036',  value:"32M"},{id: '28040037',  value:"34M"},{id: '28040038',  value:"36M"},
	             {id: '28040042',  value:"42M"},{id: '28040042',  value:"43M"},{id: '28040044',  value:"44M"},{id: '28040045',  value:"45M"},
	             {id: '28040046',  value:"46M"},{id: '28040048',  value:"50M"},{id: '28040051',  value:"54M"},{id: '28040053',  value:"60M"},
	             {id: '28040059',  value:"68M"},{id: '28040061',  value:"70M"},{id: '28040064',  value:"80M"},{id: '28040066',  value:"90M"},
	             {id: '28040067',  value:"96M"},{id: '28040001',  value:"100M"},{id: '28040004',  value:"120M"},{id: '28040008',  value:"135M"},
	             {id: '28040009',  value:"140M"},{id: '28040012',  value:"155M"},{id: '28040016',  value:"180M"},{id: '28040023',  value:"200M"},
	             {id: '28040025',  value:"225M"},{id: '28040033',  value:"300M"},{id: '28040035',  value:"310M"},{id: '28040041',  value:"405M"},
	             {id: '28040050',  value:"540M"},{id: '28040054',  value:"620M"},{id: '28040055',  value:"622M"},{id: '28040058',  value:"675M"},
	             {id: '28040020',  value:"1G"},{id: '28040000',  value:"1.25G"},{id: '28040022',  value:"2.5G"},{id: '28040002',  value:"10G"},
	             {id: '28040068',  value:"FE"}];
    var typeOpt=[{id: '0',  value:"...请选择"},{id: '3101016',  value:"2M电口"},{id: '3101012',  value:"34M电口"},{id: '3101014',  value:"45M电口"},{id: '31010123',  value:"140M电口"},
                 {id: '3101007',  value:"155M电口"},{id: '3101011',  value:"Fast Ethernet电口"},{id: '24150004',  value:"GigabitEthernet"},{id: '3101017',  value:"155M光口"},
                 {id: '3101004',  value:"622M光口"},{id: '3101001',  value:"2.5G光口"},{id: '3101016',  value:"2M电口"},{id: '3101000',  value:"10G光口"}];

var mainbar={
		view : "toolbar",
		id : "mainbar",
		type : "MainBar",
		data : [
    
		{
			type : "label",
			label : "资源能力计算",
			id : 'logo',
			align : 'center'
		}]

	};
var footbar={
  		view : "toolbar",
  		id : "footbar",
  		type : "MainBar",
  		data : [
      
  	   {
  			type : "button",
  			label : "重置",
  			id : 'reset',
  			align : 'right'
  		},	{
  			type : "button",
  			label : "计算",
  			id : 'caculate',
  			align : 'right'
  		}
  		]

  	};
var conditionform= {
        view:"form", id:"conditionfrom", data:[
                      { type:"label",name:"title1", id: "title1",  align:"left", label:"计算条件" },
                      { type:"text",name:"aResTypeName", id: "aResTypeName", label: 'A端机房 ',labelWidth:300,width:600},
                      { type:"text",name:"zResTypeName", id: "zResTypeName", label: 'Z端机房 ' ,labelWidth:300,width:600},
                      { type:"list",name:"strategySel", id: "strategySel", label: '接入方式 ' ,labelWidth:300,width:600},
                      { type:"list",name:"atomSel", id: "atomSel", label: '原子服务列表 ' ,labelWidth:300,width:600},
                      { type:"counter",name:"cirCount", id: "cirCount", label: '电路数量 ' ,labelWidth:300,width:600,position: "label-left",labelAlign: "left",min :1,value:1},
                      { type:"combo",name:"rateSel", id: "rateSel", label: '速率 ' ,labelWidth:300,width:600,data:srVar,y_count:65,value:0,template:"#value#"},
                      { type:"combo",name:"portTypeSel", id: "portTypeSel", label: '端口类型 ' ,labelWidth:300,width:600,data:typeOpt,y_count:12,value:0,template:"#value#"},



                      ],height:400
                    };
var resultform= {
        view:"form", id:"resultform", data:[
                      { type:"label", id: "title2",  align:"left", label:"计算结果" },
                      { type:"text",name:"srvName", id: "srvName", label: '原子服务名称 ',labelWidth:300,width:600},
                      { type:"textarea",name:"condition", id: "condition", label: '计算输入条件 ' ,labelWidth:300,width:600},
                      { type:"text",name:"result", id: "result", label: '资源是否具备 ' ,labelWidth:300,width:600}
                 
                     ]
                    };