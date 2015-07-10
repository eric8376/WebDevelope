dhtmlxEvent(window,"load", doOnLoad);

var chart,myForm,data,keyIndex,chartType,valueIndex;

function doOnLoad() {
	
	 //加载数据
	var chartType=getParam("chartType");
	var condition=window.location.search;
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
	$("body").append("<div id='chart_container' style='width:800px;height:600px'>");
	//默认大小
	$("#chart_container").css("height","600px");
	$("#chart_container").css("width","1000px");
	if(data.length>=10&&chartType=="bar"){
		$("#chart_container").css("width",data.length*80+"px");
	}
	if(data.length>=10&&chartType=="barH"){
		$("#chart_container").css("height",data.length*60+"px");
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
	chart = echarts.init(document.getElementById('chart_container'));
	var category=convertObjectAttrToArray(data,"keyindex");
	var number=convertObjectAttrToArray(data,"number");

	//创建柱状图表
	option = {
		    title : {
		        text: '柱状图表',
		        subtext: '柱状图表',
		        x:'center'
		    },
		    tooltip : {
		        trigger: 'axis'
		    },
//		    legend: {
//		    	 orient : 'vertical',
//		         x : 'right',
//		        data:category
//		    },
		    toolbox: {
		        show : true,
		        feature : {
		            mark : {show: false},
		            dataView : {show: false, readOnly: false},
		            magicType : {show: false, type: ['line', 'bar']},
		            restore : {show: false},
		            saveAsImage : {show: true}
		        }
		    },
		    calculable : true,
		    xAxis : [
		        {
		            type : 'category',
		            data : category
		        }
		    ],
		    yAxis : [
		        {
		            type : 'value'
		        }
		    ],
		    series : [
		        {
		            name:'扣分',
		            type:'bar',
		            itemStyle: {
		                normal: {
		                    color: getColor,
		                    label: {
		                        show: true,
		                        position: 'top',
		                        formatter: '{b}\n{c}'
		                    }
		                }
		            },
		            data:number,

		        }
		    ]
		};
    chart.setOption(option);
}
function createPieChart(){
	var hightchartdata=convertObjectsToArrays(data);
	$("#chart_container").highcharts({
        chart: {
            type: 'pie',
            options3d: {
                enabled: true,
                alpha: 45,
                beta: 0
            }
        },
        title: {
            text: '饼状图'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                depth: 35,
                dataLabels: {
                    enabled: true,
                    format: '{point.name}'
                }
            }
        },
        series: [{
            type: 'pie',
            name: '占比',
            data:hightchartdata
        }]
    });
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
function getColor(params) {
    // build a color map as your need.
    var colorList = [
      '#C1232B','#B5C334','#FCCE10','#E87C25','#27727B',
       '#FE8463','#9BCA63','#FAD860','#F3A43B','#60C0DD',
       '#D7504B','#C6E579','#F4E001','#F0805A','#26C0C0'
    ];
    //var index = 
    return colorList[params.dataIndex%15]
}