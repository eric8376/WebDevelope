<%@ page language="java" pageEncoding="UTF-8" contentType="text/html; charset=UTF-8" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta name="viewport" content="width=device-width, minimum-scale=1.0, maximum-scale=1.0">

<title>机房拓扑图</title>
<style type="text/css" media="screen">
	 .demos-loading {
          background: rgba(0,0,0,.3) url(<%=request.getContextPath()%>/images/loading.gif) center center no-repeat;
          display: none;
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
<link rel="stylesheet" href="../../style/touch/networkDemo.css" type="text/css">
<link rel="stylesheet" href="../../style/twaver/teaver.css" type="text/css">
<script type="text/javascript" src="../../js/twaver/twaver-all-min.js"></script>
<script type="text/javascript" src="../../js/touch/DemoUtil.js"></script>
<body onload="init();">
 <div id='toolbar'></div>
<div id='network'></div>
<div id="loading" class="demos-loading">Loading...</div>
</body>
<script  type="text/javascript">
TWaver.Const.BASE_PATH = '../../js/twaver/';
function showLoad()
{

document.getElementById("loading").style.display='block';
}
function hideLoad()
{

 document.getElementById("loading").style.display='none';
}
function init(){
    var custId="<%=request.getParameter("custId")%>";
    if(custId==""||custId==null||custId=='null')
    {
    custId='207620';
    }
    var TopDefId="700012";
    var SysLayerType="vip_room";
    //图片区域
    var canvas = document.getElementById('network');
    var box = new TWaver.DataBox('../../testTWaver?custId='+custId+'&TopDefId='+TopDefId+'&SysLayerType='+SysLayerType);
   
    var network = new TWaver.SVGNetwork(box, canvas);
    //network.setEditInteraction();
    showLoad();
    box.update(hideLoad);
    network.on('initialize', function(){
        network.zoomToOverview();
    });
    //工具栏区
    DemoUtil.createToolbar('toolbar', network, '../../', false);
    //network.canvas.style.overflow = 'scroll';
    network.setScale(0.6);
}
</script>