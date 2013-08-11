<%@ page language="java" pageEncoding="UTF-8" contentType="text/html; charset=UTF-8" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>接入点拓扑图</title>
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
PageObj = {};
var list,epqType,hierarchy;
var houseStore,connectBoxStore;
var currentGrid,selectRecord,selectEl,selectMAPLAYER_ID,lastSelectMAPLAYER_ID;
var pageIndex,pageSize,lastPage;
Ext.setup({
    glossOnIcon: false,
    onReady: function() {
		PageObj.IsPad = Ext.is.Phone;
		initHouseGrid();
		initConnectBoxGrid();
		initTabPanel();
    }
});
initTabPanel = function(){
    var tabPanel = new Ext.TabPanel({
        fullscreen: true,
        type: 'dark',
        sortable: true,
        items: [
        	PageObj.HouseGrid	,
        	PageObj.ConnectBoxGrid
         ]
    });
}
//创建机房表格
initHouseGrid = function(){
	Ext.regModel('House', {
        fields: ['ID','CHINA_NAME','ROOM_NO','ONDUTY_TELE','AREA','HEIGHT','REGION_NAME','BELOG_STATION','SPECIALITY','DESC_CHINA','LOCATION']
	});
	houseStore = new Ext.ux.ZteStore({
        model  : 'House',
        autoLoad :true,
        sorters: 'CNT_BOX_NO',
        proxy: {
	            type: 'ajax',
	            url: '<%=request.getContextPath()%>/opt.spr?action=queryHouse',
	            reader: {
	                type: 'json',
	                root: 'list',
	                idProperty: 'CNT_BOX_NO'
	            }
    		}
    });
	PageObj.HouseGrid = new Ext.ux.ZteGridPanel({
			fullscreen  : true,
			id:"card0",
			selModel    : {
				singleSelect : true,
				locked:false
			},
			store       : houseStore,
			title : "查询机房",
			colModel    : [{
				header  : "机房编码",
				hidden:PageObj.IsPad,
				mapping : "CHINA_NAME"
			},{
				header   : "机房名称",
				mapping  : "ROOM_NO"
			},{
				header   : "区域名称",
				mapping  : "REGION_NAME"
			},{
				header   : "高度",
				hidden:PageObj.IsPad,
				mapping  : "HEIGHT"
			},{
				header   : "专业",
				mapping  : "SPECIALITY"
			},{
				header   : "位置",
				hidden:PageObj.IsPad,
				mapping  : "LOCATION"
				
			}],
			dockedItems: [
              {
                xtype: 'toolbar',
                dock : 'top',
                     items: [
                         {xtype      : 'textfield',
                          placeHolder: '输入机房名称 ',
                          id:'seachCod',
                          name:'seachCod',
                          listeners  : {
                              scope: this,
                              blur: function(field){
                        	 	var value = field.getValue();
                        	 		houseStore.load({params:{'siteName':value}});
                             }
                          }
                         },
                         {xtype: 'button',ui: 'confirm',text:'GO',handler:function(){
                             var seachField = Ext.getCmp('seachCod');
                             var value = seachField.getValue();
	                     	 		houseStore.load({params:{'siteName':value}});
                             }},
                         {xtype: 'spacer'},
                         {xtype:'button',ui: 'confirm',text:'拓扑图',handler:function(){
								var  record = PageObj.HouseGrid.getSelect();
								if(!record){
									Ext.Msg.alert('提示', '请选择一个机房！', Ext.emptyFn);
					        		 return;
								}
								var rootId=record.get("ID");
								showTopo(rootId,'205');
								
                          }}
                     ]
                 }
           ]
		});
};
initConnectBoxGrid = function(){
	Ext.regModel('ConnectBox', {
        fields: ['ID','CNT_BOX_NO','CNT_BOX_NAME','ALIAS','REGION_ID','REGION_NAME','STREET_ID','CAPACITY','LINE_TYPE','LINE_ID','ADAPTER_ID',
        'MNT_TYPE','DUTY_MAN','OPR_STATE_ID','MNT_STATE_ID','MELT_LOCATION','INTEGRATIVE_ID','MODEL','STAYPOINT_ID','FIX_TYPE_ID','LOCATION','DOOR_NO',
        'x','y','z','HEIGHT','NOTES']
    });
   connectBoxStore = new Ext.ux.ZteStore({
        model  : 'ConnectBox',
        autoLoad :true,
        sorters: 'CNT_BOX_NO',
        proxy: {
	            type: 'ajax',
	            url: '<%=request.getContextPath()%>/opt.spr?action=queryConnectBox',
	            reader: {
	                type: 'json',
	                root: 'list',
	                idProperty: 'CNT_BOX_NO'
	            }
    		}
    });
   PageObj.ConnectBoxGrid = new Ext.ux.ZteGridPanel({
			fullscreen  : true,
			id:"card1",
			store       : connectBoxStore,
			selModel    : {
				singleSelect : true,
				locked:false
			},
			title : "查询交接箱",
			colModel    : [{
				header  : "交接箱编号",
				hidden:PageObj.IsPad,
				mapping : "CNT_BOX_NO"
			},{
				header   : "交接箱名称",
				mapping  : "CNT_BOX_NAME"
			},{
				header   : "区域名称",
				mapping  : "REGION_NAME"
			},{
				header   : "容量",
				mapping  : "CAPACITY"
			},{
				header   : "位置",
				hidden:PageObj.IsPad,
				mapping  : "LOCATION"
			}],
			dockedItems: [
              {
                xtype: 'toolbar',
                dock : 'top',
                     items: [
                         {xtype      : 'textfield',
                          placeHolder: '交接箱名称 ',
                          id:'seachCod2',
                          name:'seachCod2',
                          listeners  : {
                              scope: this,
                              blur: function(field){
	                        	var value = field.getValue();
	                     	 		connectBoxStore.load({params:{'siteName':value}});
                             }
                          }
                         },
                         {xtype: 'button',ui: 'confirm',text:'GO',handler:function(){
                             var seachField = Ext.getCmp('seachCod2');
                             var value = seachField.getValue();
	                     	 		connectBoxStore.load({params:{'siteName':value}});
                             }},
                         {xtype: 'spacer'},
                         {xtype:'button',ui: 'confirm',text:'拓扑图',handler:function(){
								var  record = PageObj.ConnectBoxGrid.getSelect();
								if(!record){
									Ext.Msg.alert('提示', '请选择一个交接箱！', Ext.emptyFn);
					        		 return;
								}
								var rootId=record.get("ID");
								showTopo(rootId,'703');
								
                          }}
                     ]
                 }
           ]
		});	
};
function showTopo(rootId,epqType){
	  topoDefId='430016';
	  Ext.Ajax.request({
		  url: '<%=request.getContextPath()%>/ajaxParam.spr?action=queryOpticalMaplayer',
	      timeout:30000000,
	      params:{'rootId':rootId,'hierarchy':'1','typeId':epqType,'topoDefId':topoDefId},
	      success: function(response, opts) {
	    	  selectMAPLAYER_ID = response.responseText;
	    	  if(selectMAPLAYER_ID==null|selectMAPLAYER_ID==""){
	    		  Ext.Msg.alert('提示', '没有找到相应拓扑图！', Ext.emptyFn);
	              return;
					//selectMAPLAYER_ID='000100130000000003233369';
				}
				window.open("<%=request.getContextPath()%>/main/touch/testTwaverOptAccessTopo.jsp?maplayerId="+selectMAPLAYER_ID);
		  }
		});
}

</script>
</html>