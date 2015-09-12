/**
 * 需要引入
 *  <script type="text/javascript" src="http://cdn.hcharts.cn/highcharts/highcharts.js"></script>
  <script type="text/javascript" src="http://cdn.hcharts.cn/highcharts/exporting.js"></script>
  <script type="text/javascript" src="http://cdn.hcharts.cn/highcharts/highcharts-3d.js"></script>
 */
dhtmlxEvent(window,"load", doOnLoad);

var chart,myForm,data,keyIndex,chartType,valueIndex;

function doOnLoad() {
	
	
	chartType=getParam("chartType");
	var condition=window.location.search;
	
	if(chartType!=null&&condition!=null){//参数不为空才自动加载
		var loader = dhtmlxAjax.postSync("authorize.spr?action=queryAnalysis",condition);
		var res=eval("("+loader.xmlDoc.responseText+")");
		data=filter(res.list,getParam("keyIndex"));
		doCreateChart(chartType,data);
	}
	//参数为空则等待调用 外部须留#chart_container
	

  
	
}
function doCreateChart(chartType,data){
	if(chartType=="pie"){
		createPieChart();
	}else if(chartType=="bar"){
			var category=convertObjectAttrToArray(data,"keyindex");//timeline
			var number=getLineSeriesContainsPlanValue(data);//series data
			createBarChart(category,number);
	}else if(chartType=="barH"){
			var category=convertObjectAttrToArray(data,"keyindex");//timeline
			var number=getLineSeriesContainsPlanValue(data);//series data
			createBarHChart(category,number);
	}else if(chartType=="line"){
			var category=convertObjectAttrToArray(data,"keyindex");//timeline
			var number=getLineSeriesContainsPlanValue(data);//series data
			createLineChart(category,number);
	}
}
function newCanvas(){
	$("#chart_container").remove();
	$("body").append("<div id='chart_container' style='width:800px;height:600px'>");
	//默认大小
	$("#chart_container").css("height","600px");
	$("#chart_container").css("width","1000px");
	if(data.length>=10&&("[bar],[line]").indexOf("["+chartType+"]")>=0){
		$("#chart_container").css("width",data.length*25+"px");
	}
	if(data.length>=10&&("[barH]").indexOf("["+chartType+"]")>=0){
		$("#chart_container").css("height",data.length*25+"px");
	}
	
}
function createBarHChart(category,number){
	createBaseBarChart("bar",category,number);
}
function createBarChart(category,number){
	createBaseBarChart("column",category,number);
}
function createPieChart(){
	newCanvas();
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
            pointFormat: '{series.name}: <b>{point.percentage:.2f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                depth: 35,
                dataLabels: {
                    enabled: true,
                    format: '{point.name}:<b>{point.percentage:.2f}%'
                }
            }
        },
        series: [{
            type: 'pie',
            name: '占比',
            data:hightchartdata
        }]
        , credits: {  
            enabled: false // remove high chart logo hyper-link  
        }
    });
}
function createLineChart(category,number){

	newCanvas();

	    $("#chart_container").highcharts({
	        chart: {
	            type: 'line'
	        },
	        title: {
	            text: '折线图'
	        },
	        subtitle: {
	            text: '折线图'
	        },
	        xAxis: {
	            categories: category
	        },
	        yAxis: {
	            title: {
	                text: ''
	            },
	            plotLines: [{
	                value: 0,
	                width: 1,
	                color: '#808080'
	            }]
	        },
	        tooltip: {
	            valueSuffix: ''
	        },
	        plotOptions: {
	            line: {
	                dataLabels: {
	                    enabled: true
	                },
	                enableMouseTracking: true
	            }
	        },
	        series: [{
	            name: '数值',
	            data: number
	        }]
	        , credits: {  
                enabled: false // remove high chart logo hyper-link  
            }
	    });

}
function createBaseBarChart(type,category,number){
	newCanvas();
	    $('#chart_container').highcharts({
	        chart: {
	            type: type
	        },
	        title: {
	            text: '柱状图'
	        },
	        subtitle: {
	            text: '柱状图'
	        },
	        xAxis: {
	            categories: category,
	            title: {
	                text: null
	            }
	        },
	        yAxis: {
	            min: 0,
	            title: {
	                text: '数值',
	                align: 'high'
	            },
	            labels: {
	                overflow: 'justify'
	            }
	        },
	        tooltip: {
	            valueSuffix: ''
	        },
	        plotOptions: {
	            bar: {
	                dataLabels: {
	                    enabled: true,
	                    allowOverlap:true,
		                style: {"color": "contrast", "fontSize": "5px", "fontWeight": "bold", "textShadow": "0 0 6px contrast, 0 0 3px contrast" }
	                }
	                
	            },
	            column: {
	                dataLabels: {
	                    enabled: true,
	                    allowOverlap:true,
		                rotation:310,
		                style: {"color": "contrast", "fontSize": "5px", "fontWeight": "bold", "textShadow": "0 0 6px contrast, 0 0 3px contrast" }
	                }
	                
	            },
	        },
//	        legend: {
//	            layout: 'vertical',
//	            align: 'right',
//	            verticalAlign: 'top',
//	            x: -40,
//	            y: 100,
//	            floating: true,
//	            borderWidth: 1,
//	            backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
//	            shadow: true
//	        },
	        credits: {
	            enabled: false
	        },
	        series: [{
	            name:'数值',
	            data:number
	        }]
	        , credits: {  
                enabled: false // remove high chart logo hyper-link  
            }
	    });
	
	
}


