<%@ page language="java" pageEncoding="UTF-8" contentType="text/html; charset=UTF-8" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta name = "viewport" content = "width = device-width, initial-scale = 1.0"> 
<meta name="apple-mobile-web-app-capable" content="yes" /> 
<meta names="apple-mobile-web-app-status-bar-style" content="black-translucent" /> 
<title><%=request.getParameter("title")%></title>
        
<link rel="stylesheet" href="<%=request.getContextPath()%>/style/touch/touchui_unicom.css" type="text/css" media="screen">
<script type="text/javascript" src="<%=request.getContextPath()%>/js/touch/touchui04.js">    </script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/FusionCharts/FusionCharts.js">    </script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/jquery.js">    </script>
</head>
<body>
	<div id="ipad" style="width:100%; height:100%; overflow:hidden;">
    </div>
</body>
<script type="text/javascript" charset="utf-8">
dhx.Date.Locale ={
	month_full:["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
	month_short:["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
	day_full:["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
	day_short:["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
};
dhx.ready(function(){
	initUi();
	initZyyjChart();
});

var initUi = function(){
	dhx.ui({
		container:"ipad",
		type:"head", rows:[
			{ 	view:"toolbar", type:"MainBar", data:[
					{type:"label", label: "资源预警", align:'center'}
				]
			},
			{	
				type:"clean", rows:[
					{
						view:"toolbar", type:"SubBar", id:'searchBar',name:'searchBar', data:[
							{type:"calendar",id:'yjdate',name:'yjdate' ,label: "预警时间",calendar_month_header: "%Y %F",value:new Date()},
							{type:"counter", id:'intervDays',name:'intervDays', label: "间隔天数",step: 1, width: "auto", value: 2, min: 2, max: 20, position: "label-left", labelAlign: "left"},
							{type:'button', label: '查询',click:"butClick"}
						]
					},
					{ type:"wide", rows:[
						{ template:'<div id="chartContainer" name="chartContainer" align="center" style="height: 100%;width:100%">FusionCharts will load here!</div>' },
						{type:"wide",cols:[
							{ template:'<div id="chartContainer0" name="chartContainer0" align="center" style="height: 100%;width:100%">FusionCharts will load here!</div>' },
							{ template:'<div id="chartContainer1" name="chartContainer1" align="center" style="height: 100%;width:100%">FusionCharts will load here!</div>' }
						]}
					]}
					
				]
			}
		]
	});
}
var myChart;
var subChart0;//趋势图
var subChart;//饼图
var _selDate ;		
var _xpoints='5';//x轴有几个点
var _intervDays ;//间隔天数
var _showType=2;//2维 3维
var _times='100';//在现有时间段上往后扩10倍天数查询
var _isPre='0';
var alarmId="<%=request.getParameter("alarmId")%>";
//initChart(3,_selDate,_intervDays,_xpoints,alarmId);

function butClick(){
	var yjdate = $$("searchBar").get('yjdate').value ;
	var intervDays = $$("searchBar").getValues().intervDays ;
	//alert(intervDays);
	if(yjdate){
		yjdate = yjdate.replace('-','.');
		yjdate = yjdate.replace('-','.');
	}
	_selDate=yjdate;	
	_intervDays	=intervDays;
	_isPre='1';
	initChart(_showType,yjdate,intervDays,_xpoints,alarmId,_isPre);
}
var initZyyjChart = function(){
	
	FusionCharts._fallbackJSChartWhenNoFlash() ;
	//FusionCharts.setCurrentRenderer('javascript');
	var yjdate = $$("searchBar").get('yjdate').value ;
	if(yjdate){
		yjdate = yjdate.replace('-','.');
		yjdate = yjdate.replace('-','.');
	}
	_selDate=yjdate;//'2010.01.01';	
	_intervDays	=intervDays = $$("searchBar").getValues().intervDays ;//'2';
	var alarmId="<%=request.getParameter("alarmId")%>";
    initChart(_showType,_selDate,_intervDays,_xpoints,alarmId,_isPre);
	
}
//初始化图表 showTye,selDate:日期选择,intervDays间隔天数,xpoints默认5个x轴点,isPre=0:初始化为0向后查找时间
function initChart(showTye,selDate,intervDays,xpoints,alarmId,isPre){
	 var tt;
	 if(showTye==3)  tt='MSColumn3D.swf';// MSColumn3D.swf,MSCombi2D.swf
	 else tt='MSColumn2D.swf';
	 var url="<%=request.getContextPath()%>/alarm.spr?action=getAlarmXml&selDate="+selDate+"&intervDays="+intervDays+"&xpoints="+xpoints+"&times="+_times+"&alarmId="+alarmId+"&isPre="+isPre;
	  //url="test.xml";
	 myChart = new FusionCharts( "<%=request.getContextPath()%>/js/FusionCharts/"+tt,
	       						 "myChartId", "100%", "100%", "0", "1" );//300
     myChart.setXMLUrl(url);		         
     myChart.render("chartContainer");
     showSubChart(showTye,selDate,alarmId,intervDays,xpoints,isPre);
}	
//初始化子图表
function showSubChart(showTye,selDate,alarmId,intervDays,xpoints,isPre){
	initSubChart(showTye);
	initSubChart0(showTye);
	 var url0="<%=request.getContextPath()%>/alarm.spr?action=getInitLimit&alarmId="+alarmId+"&initSeq=1&selDate="+selDate+"&intervDays="+intervDays+"&xpoints="+xpoints+"&times="+_times+"&isPre="+isPre;     
	       var limit=1;
	        $.ajax({
		    url: url0,
		    type: 'GET',
		    dataType: 'json',
		    timeout: 5000,
		    error: function(){
		    	//alert("err");
		        subChart0.setXMLData("<chart />");
		        subChart.setXMLData("<chart />");
		    },
		    success: function(json){
		       json = eval(json.list);
		       limit=json[0].LIMIT;
		       var selDT=json[0].DT;
		        getSubXml0(selDT,alarmId,limit,intervDays,xpoints,isPre);	
		        getSubXml1(selDT,alarmId,limit);//默认打开预警阀值为1的；			      
		       //initSubChart(showTye,selDT,alarmId,limit);  
		       //initSubChart0(showTye,selDT,alarmId,limit,intervDays,xpoints);  
		       
		    }
		});  
}
//趋势图
function initSubChart0(showTye,selDate,alarmId,limit,intervDays,xpoints){
	 var subtt;
	 if(showTye==3)  subtt='ZoomLine.swf';
	 else subtt='ZoomLine.swf';		
  	 subChart0 = new FusionCharts( "<%=request.getContextPath()%>/js/FusionCharts/"+subtt,
       "myChartId", "100%", "100%", "0", "1" );
       var url="test.xml";
      // subChart0.setXMLUrl(url);
     //getSubXml0(selDate,alarmId,limit,intervDays,xpoints);	              
     subChart0.render("chartContainer0");
}
//饼图 selDate:日期选择
function initSubChart(showTye,selDate,alarmId,limit){
	 var subtt;
	 if(showTye==3)  subtt='Pie3D.swf';
	 else subtt='Pie2D.swf';		
  	 subChart = new FusionCharts( "<%=request.getContextPath()%>/js/FusionCharts/"+subtt,
       "myChartId", "100%", "100%", "0", "1" );
     //getSubXml1(selDate,alarmId,limit);//默认打开预警阀值为1的；	              
     subChart.render("chartContainer1");
} 
//xml文件中的js函数
function getSubXml(datetime,limValue,alarmId){
	//alert(limValue);
	getSubXml1(datetime,alarmId,limValue);
	getSubXml0(datetime,alarmId,limValue,_intervDays,_xpoints,_isPre);
	
}
//趋势图
function getSubXml0(selDate,alarmId,limit,intervDays,xpoints,isPre){
	limit=encodeURIComponent(limit);
	//alert("limit");
	subChart0.setXMLUrl("<%=request.getContextPath()%>/alarm.spr?action=getSubAlarmXml0&selDate="+_selDate+"&intervDays="+intervDays+"&xpoints="+xpoints+"&times="+_times+"&alarmId="+alarmId+"&limit="+limit+"&isPre="+isPre);
}
function getSubXml1(datetime,alarmId,limValue){
	limValue=encodeURIComponent(limValue);
	subChart.setXMLUrl("<%=request.getContextPath()%>/alarm.spr?action=getSubAlarmXml&datetime="+datetime+"&limValue="+limValue+"&alarmId="+alarmId);
}
	
			
			 
			
			
</script>
</html>