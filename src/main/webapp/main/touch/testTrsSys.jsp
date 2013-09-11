<%@ page language="java" pageEncoding="UTF-8" contentType="text/html; charset=UTF-8" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>传输网拓扑图</title>
<link rel="stylesheet" href="<%=request.getContextPath()%>/style/touch/ext-touch.css" type="text/css" media="screen">
<link rel="stylesheet" href="<%=request.getContextPath()%>/style/touch/touchGridPanel.css" type="text/css" media="screen">
<script type="text/javascript" src="<%=request.getContextPath()%>/js/touch/ext-touch.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/touch/touchGridPanel.js"></script>
<body>

</body>

<script  type="text/javascript">
var ResPage = {};
var list;
var store;
var pageIndex,pageSize,lastPage;

Ext.setup({
    glossOnIcon: false,
    onReady: function() {
		initResList();
		initMainPanel();
    }
    

});
var initMainPanel = function(){
	ResPage.MainPanel = new Ext.Panel({
		title: '传输系统列表',
		id:'mainPanel',
		fullscreen: true,
		items:ResPage.list,
        dockedItems: [{
                         xtype: 'toolbar',
                         dock : 'top',
                         title: '传输系统列表',
                         items: [
                             {xtype      : 'textfield',
                              id:'seachCod',
                              name:'seachCod',
                              placeHolder: '传输系统名称...',
                              listeners  : {
                                  scope: this,
                                  blur: search
                              }
                             },
                             {xtype: 'button',ui: 'confirm',text:'GO',handler:function(){
                                 var seachField = Ext.getCmp('seachCod');
                            	 search(seachField);
                                 }},
                             {xtype: 'spacer'},
                             {xtype:'button',ui: 'confirm',text:'拓扑图',handler:function(){
                                 newwindow();
                           }}
                             ]
                         },
                     {
                         xtype: 'toolbar',
                         dock : 'bottom',
                         scroll: 'horizontal',
                         layout: {
                             pack: 'center'
                         },
                         defaults: {
                             iconMask: true,
                             ui: 'plain'
                         },
                         items: [
                             {id:'preBtn',iconCls: 'arrow_left',disabled:true,handler:prePage},
                             {xtype: 'spacer'},
                             {id:'reloadBtn',iconCls: 'refresh',disabled:true,handler:pageReLoad},
                             {xtype: 'spacer'},
                             {id:'nextBtn',iconCls: 'arrow_right',disabled:true,handler:nextPage},
                         ]
                     }
                   ]
	})
	
};
 function newwindow (){
	var selRecords = ResPage.list.getSelectedRecords();
	 if(!selRecords||selRecords.length==0){
		 Ext.Msg.alert('提示', '请选择一条记录！', Ext.emptyFn);
		 return;
    }
    var record = selRecords[0];
	window.open("<%=request.getContextPath()%>/main/touch/testTwaverTrsSysTopo.jsp?maplayerId="+record.get("MAPLAYER_ID"));
    return ;
}
var initResList = function(){
	 Ext.regModel('TrsSys', {
         fields: ['SYS_NAME','MAPLAYER_ID']
     });
     store = new Ext.data.JsonStore({
         model  : 'TrsSys',
         autoLoad :true,
         proxy: {
	            type: 'ajax',
	            url: '<%=request.getContextPath()%>/trs.spr?action=queryTrsSys&limit=30',
	            reader: {
	                type: 'json',
	                root: 'list',
	                idProperty: 'SYS_NAME',
	                getData:getPageInfo
	            }
     		}
     });
     var listConfig = {
    	 itemTpl: '<div class="contact"><strong>{SYS_NAME}</strong></div>',
         singleSelect: true,
         selModel: {
             mode: 'SINGLE',
             allowDeselect: true
         },
         title:'传输系统列表',
         id:"card0",
         grouped: false,
         store: store
     };
     ResPage.list=new Ext.List(Ext.apply(listConfig, {
    	 fullscreen: false,
    	 width: "100%",
         height: "100%"
	            }))
	
}
function search(field){
	 var trsSysName = field.getValue();
   ResPage.trsSysName = trsSysName;
   Ext.getCmp("preBtn").onDisable();
   Ext.getCmp("nextBtn").onDisable();
   store.load({params:{'trsSysName':ResPage.trsSysName}});
}
function nextPage()
{
  if(lastPage==1||pageIndex==lastPage){
    return;
  }
  Ext.getCmp("preBtn").onEnable();
  store.load({params:{'pageIndex':pageIndex+1,'pageSize':pageSize,'trsSysName':ResPage.trsSysName}});
}
function pageReLoad()
{
    store.load({params:{'pageIndex':pageIndex,'pageSize':pageSize,'trsSysName':ResPage.trsSysName}});
}
function prePage()
{
  if(!pageIndex||pageIndex<=1)
  {
    return;
  }
  Ext.getCmp("nextBtn").onEnable();
  store.load({params:{'pageIndex':pageIndex-1,'pageSize':pageSize,'trsSysName':ResPage.trsSysName}});
}
function getPageInfo(data)
{
	Ext.getCmp("reloadBtn").onEnable();
   	pageIndex=data.pageIndex;
   	pageSize=data.pageSize;
   	lastPage=data.lastPage;
	if(lastPage==1 ||pageIndex == lastPage){
	 	Ext.getCmp("nextBtn").onDisable();
	}
	if(pageIndex==1){
	 	Ext.getCmp("preBtn").onDisable();
	}else{
		Ext.getCmp("preBtn").onEnable();
	}
	if(pageIndex<lastPage){
		Ext.getCmp("nextBtn").onEnable();
	}
   return data;
}

</script>
</html>