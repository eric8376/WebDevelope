<!--
此页面代码由平台模板引擎组件强力驱动生成
-->
<!-- 您请求的URL为:$requestURL -->
<!-- 导入DOCTYPE会引起登陆页面表单元素错位的Bug -->
#if(${doctypeEnable} == "true")
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
#end
<html>
<head>
<title>${title}</title>
<meta http-equiv="keywords" content=" 在线演系统集成与应用开发平台">
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta http-equiv="description" content="It's Based G4Studio！copyRight(c) G4Lab">
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache, must-revalidate">
<meta http-equiv="expires" content="0">
<link rel="shortcut icon" href="${contextPath}/resource/image/${titleIcon}" />
#if(${extDisabled} == "false")
<link rel="stylesheet" type="text/css" href="${contextPath}/resource/css/ext_icon.css"/>
<!--<link rel="stylesheet" type="text/css" href="${contextPath}/resource/theme/${theme}/resources/css/ext-all.css"/>
<script type="text/javascript" src="${contextPath}/resource/extjs3.1/adapter/ext/ext-base.js"></script>  -->
<script type="text/javascript" src="http://cdn.bootcss.com/extjs/4.2.1/ext-all.js"></script>
<link rel="stylesheet" type="text/css" href="http://cdn.bootcss.com/extjs/4.2.1/resources/css/ext-all.css"/>
<script type="text/javascript" src="http://cdn.bootcss.com/extjs/4.2.1/locale/ext-lang-zh_CN.js"></script>

 <link rel="stylesheet" type="text/css" href="${contextPath}/resource/css/ext_css_patch.css" />
<script type="text/javascript">
    Ext.Loader.setConfig({enabled:true});
    //设置js根路径
    Ext.Loader.setPath({
        'Ext': 'resource/ext-4.2.1.883/src',
        'sunShine': 'sunShine/jsRoot',
        'Ext.ux': 'resource/ext-4.2.1.883/examples/ux',
        'Ext4': 'Extjs4Classes'
    });
    Ext.window.Window.prototype.constrain=true;

//Calendar的中文
Ext.define("Ext.locale.zh_CN.calendar.view.Day", {
    override: "Ext.calendar.CalendarPanel",
    dayText: "天",
    weekText: "周",
    monthText: "月"
});

Ext.define("Ext.locale.zh_CN.calendar.view.Day", {
    override: "Ext4.Com.Other.calendar.src.CalendarPanel",
    dayText: "天",
    weekText: "周",
    monthText: "月"
});
    Ext.form.field.Text.prototype.allowOnlyWhitespace=false;
    Ext.form.field.Text.override({
     initComponent: function () {
                                                 var me = this;
                                                 var oldAllowblank=me.allowBlank;
                                                 me.callOverridden()
                                                 me.allowBlank=oldAllowblank;
                                             }
    })
    Ext.data.Store.prototype.setParams = function (params) {
        Ext.apply(this.getProxy().extraParams, params);
    };
    function getDataStore(StoreDefine, config, params) {
        var result;
        if (config) {
            result = Ext.create(StoreDefine, config)
        } else {
            result = Ext.create(StoreDefine)

        }
        result.setParams(params);
        return result;
    }
Ext.define('memuModel', {
    extend: 'Ext.data.Model',
    fields: [
        {
            name: 'text' // 数据索引:和Store模型对应
        },
        {
            name: 'iconCls' // 数据索引:和Store模型对应
        },
        {
            name: 'id' // 数据索引:和Store模型对应
        }
    ]
});
Ext.define('MemuTreeStore',{
    extend:'Ext.data.TreeStore',
    model: 'memuModel'
});
Ext.define('SimpleStoreModel', {
    extend: 'Ext.data.Model',
    fields: [
        {
            name: 'value' // 数据索引:和Store模型对应
        },
        {
            name: 'text' // 数据索引:和Store模型对应
        }
    ]
});
/** ***************** 级联选中支持开始 ******************** */
function cascadeParent(node) {
	var pn = node.parentNode;
	var ch = node.data.checked;
	if (!pn || !Ext.isBoolean(ch))
		return;
	if (ch) {// 级联选中
	   pn.set('checked', ch);
	} else {// 级联未选中
		var b = true;
		Ext.each(pn.childNodes, function(n) {
					if ( n.data.checked) {
						return b = false;
					}
					return true;
				});
		if (b)
		 pn.set('checked', false);
	}
	cascadeParent(pn);
}
function cascadeChildren(node) {
	var ch = node.data.checked;
	if (!Ext.isBoolean(ch))
		return;
		node.cascadeBy(function(record){
            record.set('checked', ch);
        	})  ;

}


</script>
#end
#if(${jqueryEnabled} == "true")
<script type="text/javascript" src="${contextPath}/resource/jquery/jquery-1.3.2.min.js"></script>
#end
<script type="text/javascript" src="${contextPath}/resource/commonjs/eredg4.js"></script>
<link rel="stylesheet" type="text/css" href="${contextPath}/resource/css/eredg4.css"/>
#if(${uxEnabled} == "true")
#end
#if(${fcfEnabled} == "true")
<script type="text/javascript" src="${contextPath}/resource/commonjs/FusionCharts.js"></script>
#end
<script type="text/javascript">
  var webContext = '${contextPath}';
  var runMode = '${runMode}';
  var ajaxErrCode = '${ajaxErrCode}';
  var micolor = 'color:${micolor};';
  Ext.QuickTips.init();
  Ext.form.field.Field.prototype.msgTarget = 'qtip';
  Ext.BLANK_IMAGE_URL = '${contextPath}/resource/image/ext/s.gif';

  Ext.Ajax.on('requestexception', function(conn, response, options) {
		if (response.status == ajaxErrCode) {
			setTimeout(function(){
				//延时避免被failure回调函数中的aler覆盖
				top.Ext.MessageBox.alert('提示', '由于长时间未操作,空闲会话已超时;您将被强制重定向到登录页面!', function() {
					parent.location.href = webContext + '/login.ered?reqCode=init';
				});
			},200);
		}else if (response.status == '998') {
			setTimeout(function(){
				//延时避免被failure回调函数中的aler覆盖
				top.Ext.MessageBox.alert('提示', '您的会话连接由于在其它窗口上被注销而失效,系统将把您强制重定向到登录界面.', function() {
					parent.location.href = webContext + '/login.ered?reqCode=init';
				});
			},200);
		}else if (response.status == -1) {
			setTimeout(function(){
				//延时避免被failure回调函数中的aler覆盖
				top.Ext.MessageBox.alert('提示', '请求失败,超时或服务器无响应.', function() {
				});
			},200);
		}else{
		  	if(parent.showException)
          		{
          		     parent.showException(response.responseText);
          		}else
          		{
          		      showException(response.responseText);
          		}
		}
  });

#if(${exportParams} == "true")
//全局参数表   zhangwei
#foreach($param in $paramList)var ${param.paramkey}='${param.paramvalue}';#end
#end

#if(${exportUserinfo} == "true")
//当前登录用户信息
var userid = '${userInfo.getUserid()}';var username = '${userInfo.getUsername()}';var account = '${userInfo.getAccount()}';
var deptid = '${userInfo.getDeptid()}';var customId = '${userInfo.getCustomId().trim()}';var theme = '${userInfo.getTheme()}';
var explorer = '${userInfo.getExplorer()}';
#end

#if(${isSubPage} == "true")
#if(${urlSecurity}=="1" && ${urlSecurity2}=="true")
window.onload=function(){
  if(parent.userid != '${userInfo.getUserid()}'){
     top.Ext.MessageBox.alert('提示', '这是一个非法请求或者您的会话连接由于在其它窗口上被注销而失效,系统将把您强制重定向到登录界面.', function() {
		parent.window.location.href = webContext + '/login.ered?reqCode=init';
	 });
  }
};
#end
Ext.Ajax.on('beforerequest', function(conn, opts) {
  Ext.Ajax.extraParams={'loginuserid':parent.userid};
  });
#else
Ext.Ajax.on('beforerequest', function(conn, opts) {
  if(window.userid) Ext.Ajax.extraParams={'loginuserid':userid};
  });
#end

#if(${exportExceptionWindow} == "true")
//异常截获窗口
function showException(strMsg) {
	var arr = EXCEPTION_CLIENT_WIN_SIZE.split(',');
	var shortWindow = new Ext.Window({
		title : '<span class="commoncss">系统发生错误</span>',
		layout : 'fit',
		iconCls : 'exclamationIcon',
		width : arr[0],
		height : arr[1],
		animateTarget : Ext.getBody(),
		closable : true,
		closeAction : 'close',
		collapsible : false,
		modal : true,
		maximizable : false,
		border : false,
		constrain : true,
		items : [new Ext.Panel({
					html : EXCEPTION_CLIENT_MSG,
					style : "font-size: 13px;",
					autoScroll : true
				})],
		buttons : [{
					text : '更多信息',
					iconCls : 'previewIcon',
					handler : function() {
						var detailWindow = new Ext.Window({
									title : '<span class="commoncss">系统运行时异常堆栈详细信息</span>',
									layout : 'fit',
									iconCls : 'previewIcon',
									width : document.body.clientWidth - 300,
									height : document.body.clientHeight - 80,
									animateTarget : Ext.getBody(),
									closable : true,
									closeAction : 'close',
									collapsible : false,
									modal : true,
									maximizable : false,
									border : false,
									constrain : true,
									buttons:[{
										text : '关闭',
										iconCls : 'deleteIcon',
										handler : function() {
										    detailWindow.hide();
										}
									}],
									items : [new Ext.Panel({
												html : strMsg,
												style : "font-size: 13px;",
												autoScroll : true
											})]
								}).show();
					}
				},{
					text : '关闭',
					iconCls : 'deleteIcon',
					handler : function() {
					    shortWindow.close();
					}
				}]
	}).show();
}
#end

</script>
#if(${showLoading} == "true")
<style type="text/css">
 #loading-mask {
	Z-INDEX: 20000;
	LEFT: 0px;
	WIDTH: 100%;
	POSITION: absolute;
	TOP: 0px;
	HEIGHT: 100%;
	BACKGROUND-COLOR: white
}
#loading {
	PADDING-RIGHT: 2px;
	PADDING-LEFT: 2px;
	Z-INDEX: 20001;
	LEFT: 32%;
	PADDING-BOTTOM: 2px;
	PADDING-TOP: 2px;
	POSITION: absolute;
	TOP: 40%;
	HEIGHT: auto
}
#loading IMG {
	MARGIN-BOTTOM: 5px
}
#loading .loading-indicator {
	PADDING-RIGHT: 10px;
	PADDING-LEFT: 10px;
	BACKGROUND: white;
	PADDING-BOTTOM: 10px;
	MARGIN: 0px;
	FONT: 12px 宋体, arial, helvetica;
	COLOR: #555;
	PADDING-TOP: 10px;
	HEIGHT: auto;
	TEXT-ALIGN: center
}
</style>
<script type="text/javascript">
Ext.EventManager.on(window, 'load', function(){
	 setTimeout(
		 function() {
			Ext.get('loading').remove();
			Ext.get('loading-mask').fadeOut({remove:true});
			}, 1);
});
</script>
<DIV id=loading-mask></DIV>
<DIV id=loading>
<DIV class=loading-indicator><IMG style="MARGIN-RIGHT: 5px"
	height=16
	src="${contextPath}/resource/image/ajax.gif"
	width=16 align=absMiddle>${pageLoadMsg}</DIV>
</DIV>
#end 