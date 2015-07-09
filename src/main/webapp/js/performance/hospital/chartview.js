dhtmlxEvent(window,"load", doOnLoad);

var chart,myForm,data,keyIndex,chartType,valueIndex;

function doOnLoad() {
	chart =  new dhtmlXChart({
	     container: "chart_container"
	    	 });
	var condition=window.location.search;
	var chartType=getParam("chartType");
	var loader = dhtmlxAjax.postSync("authorize.spr?action=queryAnalysis",condition);
	var res=eval("("+loader.xmlDoc.responseText+")");
	data=filter(res.list,getParam("keyIndex"));
	if(chartType=="pie"){
	createPieChart();
	}else if(chartType=="bar"){
		createBarChart();
	}else if(chartType=="barH"){
		createBarHChart();
	}else if(chartType=="line"){
		createLineChart();
	}
	
}

function newCanvas(){
	$("#chart_container").remove();
	$("body").append("<div id='chart_container' style='border:1px solid #A4BED4;'>");
	//默认大小
	$("#chart_container").css("height","600px");
	$("#chart_container").css("width","800px");
	if(data.length>=10&&chartType=="bar"){
		$("#chart_container").css("width",data.length*60+"px");
	}
	if(data.length>=10&&chartType=="barH"){
		$("#chart_container").css("height",data.length*40+"px");
	}
	
}
function createBarHChart(){
	
	newCanvas();
	 chart =  new dhtmlXChart({
	     container: "chart_container"
	    	 });
	 chart.define("view","barH");
	 chart.define("value","#number#");
	 //chart.define("color","#66cc33"); 
	 chart.define("label","#number#");
	 chart.define("width","80"); 
	 chart.define("padding",{left: 150}); 
	 chart.define("tooltip","#keyindex#");   
	 chart.define("yAxis",{
			title:"医院",
			template:"#keyindex#"
		});   	
	 chart.define("xAxis",{
       // template:"{obj}",
        title:"扣分"
	 	});     
	 chart.parse(data,"json");
//	 var dhxWins= new dhtmlXWindows();
//	
//	 var popupWindow = parent.dhxLayout.dhxWins.createWindow("popupWindow",300,300,800,500);
//	 
//	 popupWindow.attachObject(chart);
//	 popupWindow.show();
	
}
function createBarChart(){
	
	newCanvas();
	chart =  new dhtmlXChart({
	     container: "chart_container"
	    	 });
	 chart.define("view","bar");
	 chart.define("value","#number#");
	 chart.define("label","#number#");
	 chart.define("width","40");
	 chart.define("padding",{bottom: 150}); 
	 chart.define("tooltip","#keyindex#");   
	 chart.define("xAxis",{
			title:"医院",
			template:"#keyindex#"
		});   	
	 chart.define("yAxis",{
         
        // template:"{obj}",
         title:"扣分"
	 	});     
	// chart.clearAll();
	 chart.parse(data,"json");	
}
function createPieChart(){
	newCanvas();
	chart =  new dhtmlXChart({
	     container: "chart_container"
	    	 });
	 chart.define("view","pie3D");
	 chart.define("value","#number#");
	 chart.define("label","#keyindex#");
	 chart.define("pieInnerText",function(obj){
 		var sum = chart.sum("#number#");
		return Math.round(obj.number/sum*100) +"%"
	}); 
	chart.parse(data,"json");
}
function createLineChart(){
	newCanvas();
	chart =  new dhtmlXChart({
	     container: "chart_container"
	    	 });
	 chart.define("view","line");
	 chart.define("value","#number#");
	 chart.define("label","#keyindex#");
	 chart.define("xAxis",{
			title:"医院",
			template:"#keyindex#"
		});   	
	 chart.define("yAxis",{
      
     // template:"{obj}",
      title:"扣分"
	 	});     
	
	chart.parse(data,"json");
}