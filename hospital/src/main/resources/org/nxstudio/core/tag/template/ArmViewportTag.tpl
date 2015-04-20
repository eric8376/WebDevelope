<!-- 由<eRedG4:arm.Viewport/>标签生成的代码开始 -->
#foreach($card in $cardList)
<div id="div.card.${card.menuid}" style="overflow-y: auto;overflow-x:hidden; height: 100%; width: 100%;"></div>
#end
${scriptStart}
var default_theme = '${theme}';
var mainTabs;
Ext.require('Ext.ux.TabCloseMenu');
Ext.onReady(function(){
            mainTabs =
            Ext.create('Ext.tab.Panel', {
                region:'center',
                activeTab:0,
                   height:550,
               id:'mainTabs',
                 border:false,
               autoScroll :true,
               frame:true,
                 plugins : new Ext.ux.TabCloseMenu( {
               closeTabText  : '关闭当前页',
               closeOthersTabsText : '关闭其他页',
               closeAllTabsText  : '关闭所有页'
               }),
               items:[{
                                   title:"<img align='top' class='IEPNG' src='./resource/image/ext/user.png'/>${welcomePageTitle}",
                                   listeners: {activate: function(){Ext.getCmp('centerPanel').setTitle('${centerTitle} -> ${welcomePageTitle}');}},
                                   html:"<iframe name='mainFrame'  src='index.ered?reqCode=preferencesInit' scrolling='auto' frameborder='0' width='100%' height='100%' ></iframe>"
                                 }]
            });


             var viewport = Ext.create('Ext.container.Viewport',{
                 layout:'border',
                 items:[
                Ext.create('Ext.panel.Panel',{
                     region:'north',
                     contentEl:'north',
                     height:85,
                     collapsible:true,
					 border:false,
                     layout: 'fit',
                     title:'${northTitle}'}),
                 Ext.create('Ext.Component',{
                     region:'south',
                     contentEl: 'south',
                     height:17,
                     layout: 'fit',
                     collapsible: true}),
                 {region:'center',
                     id: 'centerPanel',
                     iconCls:'',
                     title:'${centerTitle}',
                     autoScroll:false,
                     border:false,
                     layout: 'fit',
                     items:[mainTabs]},
                   {region:'west',
                    width: 220,
                    collapsible: true,
                    minSize: 200,
                    maxSize: 350,
                    split: true,
					iconCls:'book_previousIcon',
                    title: '${westTitle}',
                     layout:
                   {type:'accordion',
                   animate:true,
                   activeOnTop : ${activeOnTop}
                    },
                   items: [
#foreach($card in $cardList)
{
border:false,
#if(${card.iconcls}&&${card.iconcls}!="")
iconCls:'${card.iconcls}',
#end
contentEl: 'div.card.${card.menuid}',
title:'${card.menuname}'
}
#if(${card.isNotLast})
					  ,
#end
#end
				   ]
                   }
                ]});




 /**
 * 快捷栏
 */
 //调用函数(开启窗口显示)
 var defaultIcon=webContext+'/resource/image/ext/control_play_blue.png';
 function openQucikWin(btn,e){
     addTab("url","name","menuid","pathCh",webContext+"/resource/image/ext/control_play_blue.png");
 }
 //工具栏
/**var quick_toolbar=Ext.create('Ext.toolbar.Toolbar',{
    renderTo:"quick_toolbar",
    width:document.body.clientWidth-765,
    style:"background:transparent;border:0 lightblue;",
    items:[]
 });**/
   });


/**
 * 响应树节点单击事件
 */
function addTab(url,name,menuid,pathCh,icon){
  var id = "tab_id_" + menuid;
  if(url == '#' || url == ''){
    //Ext.Msg.alert('提示', '此菜单还没有指定请求地址,无法为您打开页面.');
    return;
  }else{
  var index = url.indexOf('.ered');
  if(index != -1)
    url = url + '&menuid4Log=' + menuid;
  var n = mainTabs.getComponent(id);
  if (!n) {
     // 如果对centerPanel进行遮罩,则可以出现阴影mainTabs
     //Ext.getCmp('centerPanel').getEl().mask('<span style=font-size:12>正在加载页面,请稍等...</span>', 'x-mask-loading');
     // document.getElementById('endIeStatus').click();//解决Iframe IE加载不完全的问题
     // 兼容IE和FF触发.click()函数
     var endIeStatus = document.getElementById("endIeStatus");
     if(document.createEvent){
         var ev = document.createEvent('HTMLEvents');
         ev.initEvent('click', false, true);
         endIeStatus.dispatchEvent(ev);
     }
     else endIeStatus.click();

     //增加Extjs4(单Action) url(纯js类路径)简化后分析
     var havaActionMatch= new RegExp("[.]ered[?]");
     if(havaActionMatch.exec(url)==null){
         url="Home.ered?jsClassPath="+url;
     }

     n = mainTabs.add({
       id:id,
       title:"<img align='top' class='IEPNG' src='./resource/image/ext/" + icon + "'/>" + name,
       closable:true,
       border:false,
       layout:'fit',
       listeners: {activate: function(){Ext.getCmp('centerPanel').setTitle(pathCh)}},
       html:'<iframe scrolling="auto"  frameborder="no" border="0"  width="100%" height="100%" src='+url+'></iframe>'
	   //如果功能页面使用中心区域阴影加载模式则使用下面的代码unmaskCenterPanel();页面加载完毕后取消阴影
	   //html:'<iframe scrolling="auto" frameborder="0" onload="unmaskCenterPanel()" width="100%" height="100%" src='+url+'></iframe>'
         });
       }
  mainTabs.setActiveTab(n);
 }
  }

// 解决Iframe IE加载不完全的问题
function endIeStatus(){}

Ext.EventManager.on(window, 'load', function(){
	 setTimeout(
		 function() {
			Ext.get('loading').remove();
			Ext.get('loading-mask').fadeOut({remove:true});
			}, 200);
});

/**
 * 取消阴影(当子页面加载完成后通过parent.XXXX来调用)
 */
function unmaskCenterPanel(){
 // 如果对centerPanel进行遮罩,则可以出现阴影
 Ext.getCmp('centerPanel').getEl().unmask();
}
${scriptEnd}
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
	LEFT: 45%;
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

.banner {
	font-family: "宋体";
	font-size: 12px;
	color:$themeColor;
}
</style>
<!--显示loding区域-->
<DIV id=loading-mask></DIV>
<DIV id=loading>
<DIV class=loading-indicator><IMG style="MARGIN-RIGHT: 8px"
	height=32
	src="./resource/image/ajax1.gif"
	width=36 align=absMiddle>正在初始化,请稍等...</DIV>
</DIV>
<div id="north">
<table border="0" cellpadding="0" cellspacing="0" width="100%"
	height="60" background="./resource/image/banner_background/${theme}.png">
	<tr >
		<td style="padding-left:15px"><img class="IEPNG"
			src="${banner}" />
			<div id='quick_toolbar' style="background:transparent;opacity:0.85;height:25px;top:34;left:400;position:absolute;"></div>
		</td>
		<td style="padding-right:5px">
		  <table width="100%"   border="0" cellpadding="0" cellspacing="3" class="banner">
		  	<tr align="right">
		      <td>${welcome},${username}! 今天是:${date} ${week} <span id="rTime"></span></td>
		    </tr>
		    <tr align="right">
		    <td>
		      <table border="0" cellpadding="0" cellspacing="1">
		        <tr>
		          <td><div id = "themeDiv"></div></td>
		          <td>&nbsp;</td>
		          <td><div id = "configDiv"></div></td>
		          <td>&nbsp;</td>
		          <td><div id = "closeDiv"></div></td>
		        </tr>
		      </table>
		    </td>
		    </tr>
		  </table>
		</td>
	</tr>
</table>
</div>
<div id="south" align="left">
<table class="banner" width="100%">
<tr>
<td width="65%"><nobr>&nbsp;<img class="IEPNG" src="./resource/image/ext/comments2.png" />&nbsp;欢迎您,${username}!&nbsp;帐户:${account}&nbsp;所属部门:${deptname}</nobr></td>
<td width="35%"><div align="right"><nobr>${copyright}</nobr></div></td>
</tr>
</table>
</div>
<a href="#" onclick="javascript:endIeStatus();" id="endIeStatus"
	style="display: none;" ></a>
<!-- 由<eRedG4:arm.Viewport/>标签生成的代码结束 -->
