<%@ page language="java" pageEncoding="UTF-8" contentType="text/html; charset=UTF-8" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>站点查询</title>
<link rel="stylesheet" href="<%=request.getContextPath()%>/style/touch/ext-touch.css" type="text/css" media="screen">
<link rel="stylesheet" href="<%=request.getContextPath()%>/style/touch/touchGridPanel.css" type="text/css" media="screen">
<script type="text/javascript" src="<%=request.getContextPath()%>/js/touch/ext-touch.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/touch/touchGridPanel.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/touch/zteTouch.js"></script>
<style type="text/css" media="screen">
	 .demos-loading {
          background: rgba(0,0,0,.3) url(<%=request.getContextPath()%>/images/shared/loading.gif) center center no-repeat;
          display: block;
          width: 10em;
          height: 10em;
          position: absolute;
          top: 50%;
          left: 50%;
          margin-left: -5em;
          margin-top: -5em;  
          -webkit-border-radius: .5em;
          color: #fff;
          text-shadow: #000 0 1px 1px;
          text-align: center;
          padding-top: 8em;
          font-weight: bold;
        }
</style>
<body>

</body>
<script  type="text/javascript">
ResPage = {};
Ext.setup({
    glossOnIcon: false,
    onReady: function() {
		ResPage.IsPad =  Ext.is.Phone;
		initQryList();
		initDetailForm();
		initMainPanel();
    }
});



var initMainPanel = function(){
	ResPage.searchField =  new  Ext.form.Text({
		 placeHolder: '关键字',
         id:'seachCod',
         name:'seachCod',
         listeners  : {
             scope: this,
             blur: search
         }
	});
	ResPage.searButton = new Ext.Button({
		ui: 'confirm',
		text:'GO',
		handler:function(){
            var seachField = Ext.getCmp('seachCod');
       		search(seachField);
           }
		});
	ResPage.backButton = new Ext.Button({
        text: "返回",
        ui: 'back',
        handler:function(){
			var mainPanel = Ext.getCmp("mainPanel");
			mainPanel.setActiveItem(ResPage.TestGrid,{type: 'slide',reverse: true});
			ResPage.navigationBar.setTitle(mainPanel.title);
			ResPage.backButton.hide();
			ResPage.searchField.show();
			ResPage.searButton.show();
			ResPage.funButton.show();
	    },
        hidden: true,
        scope: this
    });
	ResPage.funButton = new Ext.Button({
	        text: "详细信息",
	        ui: 'confirm',
	        handler:function(){
				var  record = ResPage.TestGrid.getSelect();
				if(!record){
					Ext.Msg.alert('提示', '请选择一个站点！', Ext.emptyFn);
		    		 return;
				}
				var mainPanel = Ext.getCmp("mainPanel");
				mainPanel.setActiveItem(ResPage.resFrom,{type: 'slide',reverse: false});
				ResPage.navigationBar.setTitle(ResPage.resFrom.title);
				ResPage.backButton.show();
				ResPage.funButton.hide();
				ResPage.searchField.hide();
				ResPage.searButton.hide();
				//alert(record);
				
				ResPage.resFrom.loadRecord(record);//setValues(record);
			    },
	        scope: this
	    });
	
	ResPage.navigationBar = new Ext.Toolbar({
        ui: 'dark',
        dock: 'top',
        title: '站点查询 ',
        items: [ResPage.searchField,ResPage.searButton,ResPage.backButton, {xtype: 'spacer'},ResPage.funButton]
    });
	ResPage.MainPanel = new Ext.Panel({
		title: '站点查询',
		id:'mainPanel',
		fullscreen: true,
		dockedItems:[ResPage.navigationBar],
		layout: 'card',
		items:[
			ResPage.TestGrid,
			ResPage.resFrom
		]
	}).show();
	
};
 initQryList = function(){
	 Ext.regModel('Site', {
         fields: ['STATION_NO','TYPE','CHINA_NAME','CHINA_NAME_AB','OPEN_TIME','CHINA_NAME_FULL','BUILDING_KIND','INCLUDING_RANGE','REGION_NAME','MNT_SPEC','ISSTATION',
'SUBMIT_MAN','LOCATION','SUPER_CHINA_NAME','BUILDING_RME','BUILDING_UP_METHOD','BUILDING_UP_RME','BUILDING_UP_POINT','BUILDING_PM',
'BUILDING_WIRING','BUILDING_WIRING_NOTES','BUILDING_DIA','BUSI_PERMIT_RANGE','NOTES','UNION_CHINA_NAME','UNION_STATION_NO','BUILDING_GRADE'
         ]
     });
	var store = ResPage.store =new Ext.ux.ZteStore({
         model  : 'Site',
         autoLoad :true,
         proxy: {
	            type: 'ajax',
	            url: '<%=request.getContextPath()%>/trs.spr?action=querySite&pageSize=25',
	            reader: {
	                type: 'json',
	                root: 'list',
	                idProperty: 'STATION_NO'
	            }
     		}
     });
	var texstGrid = ResPage.TestGrid = new Ext.ux.ZteGridPanel({
		fullscreen  : true,
		store: store,
		selModel    : {
			singleSelect : true,
			locked:false
		},
		title : "站点信息",
		colModel    : [{
			header  : "站点编码",
			mapping : "STATION_NO"
		},{
			header   : "站点名称",
			mapping  : "CHINA_NAME"
		},{
			header   : "站点类型",
			mapping  : "TYPE"
		},{
			header   : "开通时间",
			mapping  : "OPEN_TIME"
		},{
			header   : "网络层级",
			hidden:ResPage.IsPad,
			mapping  : "BUILDING_GRADE"
		},{
			header   : "覆盖范围",
			hidden:true,
			mapping  : "OPT_INFO"
		},{
			header   : "覆盖户数",
			hidden:true,
			mapping  : "OPT_INFO"
		},{
			header   : "行政区域",
			hidden:true,
			mapping  : "REGION_NAME"
		},{
			header   : "维护负责专业",
			hidden:true,
			mapping  : "OPT_INFO"
		},{
			header   : "地址",
			hidden:true,
			mapping  : "LOCATION"
		}

		]
	});
}
var initDetailForm = function(){
	var resFrom = ResPage.resFrom = new Ext.form.FormPanel({
        id:"resFrom",
        name:"resFrom",
        scroll: 'vertical',
        disabled:true,
        title:'详细信息',
        fullscreen : true,
        items: [
		    {xtype: 'textfield',id : 'STATION_NO',name : 'STATION_NO',label: '站点编码',showClear: true,autoCapitalize : false},
		    {xtype: 'textfield',id : 'TYPE',name : 'TYPE',label: '站点类型 ',showClear: true,autoCapitalize : false},
		    {xtype: 'textfield',id: 'CHINA_NAME',name: 'CHINA_NAME',label:'站点名称'},
		    {xtype: 'textfield',id: 'OPEN_TIME',name: 'OPEN_TIME',label:'开通时间'},
		    {xtype: 'textfield',id : 'BUILDING_GRADE',name : 'BUILDING_GRADE',label: '网络层级'},
		    {xtype: 'textareafield',id: 'INCLUDING_RANGE',name: 'INCLUDING_RANGE',label:'覆盖范围'},
		    {xtype: 'textfield',id: 'OPT_INFO',name: 'OPT_INFO',label:'覆盖户数'},
		    {xtype: 'textfield',id: 'REGION_NAME',name: 'REGION_NAME',label:'行政区域'},
		    {xtype: 'textfield',id: 'MNT_SPEC',name: 'MNT_SPEC',label:'维护负责专业'},
           	{xtype: 'textfield',id: 'LOCATION',name: 'LOCATION',label:'地址'},
			{xtype: 'textfield',id: 'SUPER_CHINA_NAME',name: 'SUPER_CHINA_NAME',label:'上联局站'},
			{xtype: 'textfield',id: 'BUILDING_RME',name: 'BUILDING_RME',label:'主设备名称数量'},
			{xtype: 'textfield',id: 'BUILDING_WIRING',name: 'BUILDING_WIRING',label:'楼内布线'},
			{xtype: 'textfield',id: 'BUSI_PERMIT_RANGE',name: 'BUSI_PERMIT_RANGE',label:'可提供业务范围'},
			{xtype: 'textfield',id: 'UNION_CHINA_NAME',name: 'UNION_CHINA_NAME',label:'原数固站点名称'},
			{xtype: 'textfield',id: 'UNION_STATION_NO',name: 'UNION_STATION_NO',label:'原数固站点编码'},
			{xtype: 'textfield',id: 'BUILDING_GRADE',name: 'BUILDING_GRADE',label:'楼宇评估'}
       ]
	});
}
function search(field){
	ResPage.TestGrid.setLoading(true);
   var siteName = field.getValue();
   ResPage.siteName = siteName;
   ResPage.store.load({params:{'siteName':ResPage.siteName}});
}

</script>

</html>