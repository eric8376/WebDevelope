/**需要引入
 * <script src="<%=request.getContextPath()%>/js/echart/echarts-all.js"></script>
 */
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
	$("body").append("<div id='chart_container' style='border:1px solid #A4BED4;'>");
	//默认大小
	$("#chart_container").css("height","600px");
	$("#chart_container").css("width","1000px");
	if(data.length>=10&&chartType=="bar"){
		$("#chart_container").css("width",data.length*80+"px");
	}
	if(data.length>=10&&chartType=="barH"){
		$("#chart_container").css("height",data.length*60+"px");
	}
	//初始化图表
	chart = echarts.init(document.getElementById('chart_container'));
	
}
function createBarHChart(){
	
	//TODO

	
}
function createBarChart(){
	var category=convertObjectAttrToArray(data,"keyindex");
	var number=convertObjectAttrToArray(data,"number");
	newCanvas();
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
	var category=convertObjectAttrToArray(data,"keyindex");
	var pieData=replaceObjectListAttr(data,['number','keyindex'],['value','name']);
	newCanvas();
	option = {
		    title : {
		        text: '饼状图表',
		        subtext: '饼状图表',
		        x:'center'
		    },
		    tooltip : {
		        trigger: 'item',
		        formatter: "{a} <br/>{b} : {c} ({d}%)"
		    },
		    legend: {
		        orient : 'vertical',
		        x : 'left',
		        data:category
		    },
		    toolbox: {
		        show : true,
		        feature : {
		            mark : {show: false},
		            dataView : {show: false, readOnly: false},
		            magicType : {
		                show: true, 
		                type: ['pie', 'funnel'],
		                option: {
		                    funnel: {
		                        x: '25%',
		                        width: '50%',
		                        funnelAlign: 'left',
		                        max: 1548
		                    }
		                }
		            },
		            restore : {show: false},
		            saveAsImage : {show: true}
		        }
		    },
		    calculable : true,
		    series : [
		        {
		            name:'扣分',
		            type:'pie',
		            radius : '55%',
		            center: ['50%', '60%'],
		            data:pieData,
		            itemStyle: {
		                normal: {
		                    label: {
		                        show: true,
		                        position: 'top',
		                        formatter: '{b}\n{d}%'
		                       
		                    },
		                    labelLine:{
		                    	length:60
		                    	}
		                }
		            },
		        }
		    ]
		};
	chart.setOption(option);
}
function createLineChart(){
//TODO
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