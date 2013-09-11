<%@ page language="java" pageEncoding="UTF-8" contentType="text/html; charset=UTF-8" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>系统公告</title>
<link rel="stylesheet" href="<%=request.getContextPath()%>/style/touch/ext-touch.css" type="text/css" media="screen">
<script type="text/javascript" src="<%=request.getContextPath()%>/js/touch/ext-touch-debug.js"></script>
<style type="text/css" media="screen">
	 .demos-loading {
          background: rgba(0,0,0,.3) url(<%=request.getContextPath()%>/images/loading.gif) center center no-repeat;
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
</head>
<body>

</body>
<script  type="text/javascript">

var ResCustPage = {};
Ext.setup({
    onReady: function() {
		initNoticeList();
		initMainPanel();
   }
});
var initMainPanel = function(){
	ResCustPage.navigationBar = new Ext.Toolbar({
       ui: 'dark',
       dock: 'top',
       title: '系统公告',
       items: [{xtype: 'spacer'}]
   });
	ResCustPage.MainPanel = new Ext.Panel({
		title: '系统公告',
		id:'mainPanel',
		fullscreen: true,
		dockedItems:[ResCustPage.navigationBar],
		items:[
			ResCustPage.NoticeList
		]
	}).show();
	
};
var initNoticeDetail = function(detail){
    ResCustPage.NoticeDetailPanel = new Ext.Panel({
        floating         : true,
        stopMaskTapEvent : true,
        width: 300,
        height: 600,
        hideOnMaskTap    : true,
        cls              : 'x-select-overlay',
        scroll           : 'vertical',
        html: '<span><lable>'+detail+'</lable></span>',
    });
}
//公告列表
var initNoticeList = function(){
	 Ext.regModel('NoticeModel', {
         fields: ['NOTICEID','NOTICENAME','NOTICECONTENT']
     });
	  var listConfig = {
	            itemTpl: '<div class="contact"><strong>{NOTICEID}</strong></div>',
	            grouped: false,
	            indexBar: true,
	            onItemDisclosure: {
	                scope: 'test',
	                handler: function(record, btn, index) {

	            	var detail=record.get("NOTICECONTENT");
		            	initNoticeDetail(detail);
		            	ResCustPage.NoticeDetailPanel.showBy(btn, 'fade', false);
	                }
	            },
	            store: new Ext.data.Store({
	                model: 'NoticeModel',
	                sorters: 'noticeId',
	                autoLoad:true,
	                proxy: {
	    	            type: 'ajax',
	    	            url: '<%=request.getContextPath()%>/notice.spr?action=queryNotice',
	    	            reader: {
	    	                type: 'json',
	    	                root: '',
	    	                idProperty: 'noticeId'
	    	            },
	    	            callback: function(response) {
	    	            	alert(1);
	    	            }
	    	            
	          		}
	            })
	        };
	ResCustPage.NoticeList = new Ext.List(Ext.apply(listConfig, {
        fullscreen: true
    }));
};

</script>


</html>