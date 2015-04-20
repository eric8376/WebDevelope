function taskConsumeTime(procInstId) {
    var store = Ext.create('Ext.data.JsonStore', {
        fields: ['name', 'data'],
        data: [
            {'name': 'metric one', 'data': 10},
            {'name': 'metric two', 'data': 7},
            {'name': 'metric three', 'data': 5},
            {'name': 'metric four', 'data': 2},
            {'name': 'metric five', 'data': 27}
        ]
    });

    Ext.create('Ext.chart.Chart', {
        renderTo: Ext.getBody(),
        width: 500,
        height: 350,
        animate: true,
        store: store,
        theme: 'Base:gradients',
        series: [{
            type: 'pie',
            angleField: 'data',
            showInLegend: true,
            tips: {
                trackMouse: true,
                width: 140,
                height: 28,
                renderer: function (storeItem, item) {
                    // calculate and display percentage on hover
                    var total = 0;
                    store.each(function (rec) {
                        total += rec.get('data');
                    });
                    this.setTitle(storeItem.get('name') + ': ' + Math.round(storeItem.get('data') / total * 100) + '%');
                }
            },
            highlight: {
                segment: {
                    margin: 20
                }
            },
            label: {
                field: 'name',
                display: 'rotate',
                contrast: true,
                font: '18px Arial'
            }
        }]
    });

    Ext.Ajax.request({
        url: "WorkFlowAction.ered?reqCode=TaskTimeStatisticsToXML",
        method: 'post',
        params: {"procInstId": procInstId},
        success: function (response, options) {

            var my2DpChart_chart_object = new FusionCharts("/sjyg_zhpt/resource/fcf/Pie2D.swf", "my2DpChart", "550", "350");
            //my2DpChart_chart_object.setDataXML("<?xml version='1.0' encoding='GB2312'?><graph baseFontSize='12' baseFont='宋体' caption='Google软件2010年月度销售业绩图表' showNames='1' numberPrefix='$' canvasBorderThickness='1'><set isSliced='0' color='AFD8F8' name='一月' value='1098'/><set isSliced='0' color='F6BD0F' name='二月' value='40000'/><set isSliced='0' color='8BBA00' name='三月' value='99999'/><set isSliced='0' color='008E8E' name='四月' value='109000'/><set isSliced='1' color='D64646' name='五月' value='35000'/><set isSliced='0' color='8E468E' name='六月' value='90000'/><set isSliced='0' color='588526' name='七月' value='50000'/><set isSliced='1' color='B3AA00' name='八月' value='63000'/><set isSliced='0' color='008ED6' name='九月' value='152000'/><set isSliced='0' color='9D080D' name='十月' value='122000'/><set isSliced='0' color='A186BE' name='十一月' value='30000'/><set isSliced='0' color='1EBE38' name='十二月' value='50000'/></graph>");
            my2DpChart_chart_object.setDataXML(response.responseText);
            my2DpChart_chart_object.addParam("wmode", "Opaque");
            my2DpChart_chart_object.render("my2DpChart_div");
            var panel = new Ext.Panel({
                contentEl: 'my2DpChart_div'
            });
//            TaskTimeSumTime(panel,procInstId);
            var panel2 = gridPanel(procInstId);
            var window = new Ext.Window({
                layout: 'fit',
                width: 570,
                height: 645,
                closeAction: 'hide',
                title: '<span class="commoncss">流程环节耗时图表</span>',
                titleCollapse: false,
                border: false,
                animateTarget: Ext.getBody(),
                items: [{
                    collapsible: false,
                    labelAlign: 'left',
                    bodyStyle: 'padding:5 5 0', // 表单元素和表单面板的边距
                    border: false,
                    items: [panel, panel2]
                }
                ]
            });
            window.show();
        }
    });
}

function gridPanel(procInstId) {
    var store = new Ext.data.Store({
        autoLoad: true,
        baseParams: {
            procInstId: procInstId
        },
        // 获取数据的方式
        proxy: new Ext.data.HttpProxy({
            url: "WorkFlowAction.ered?reqCode=TaskTimeStatisticsEveryOne"
        }),
        // 数据读取器
        reader: new Ext.data.JsonReader({
//            totalProperty : 'TOTALCOUNT', // 记录总数
//            root : 'ROOT' // Json中的列表数据根节点
        }, [{
            name: 'name' // Json中的属性Key值
        }, {
            name: 'point'
        }, {
            name: 'time'
        }])
    });
    // 定义自动当前页行号
    var rownum = new Ext.grid.RowNumberer({
        header: 'NO',
        width: 28
    });
    var cm = new Ext.grid.ColumnModel([rownum, {
        header: '环节操作人', // 列标题
        dataIndex: 'name'
    }, {
        header: '所在环节', // 列标题
        dataIndex: 'point' // 数据索引:和Store模型对应
        // 是否可排序
    }, {
        header: '超过时间',
        dataIndex: 'time'
        // 列宽
    }])

    // 表格实例
    var grid = new Ext.grid.GridPanel({
        // 表格面板标题,默认为粗体，我不喜欢粗体，这里设置样式将其格式为正常字体
        title: '<span class="commoncss">环节超时列表</span>',
        frame: true,
        autoScroll: true,
        height: 250,
//        autoHeight : true,
//        region : 'center', // 和VIEWPORT布局模型对应，充当center区域布局
        store: store, // 数据存储
        stripeRows: true, // 斑马线
        cm: cm, // 列模型
        viewConfig: {
            // 不产横向生滚动条, 各列自动扩展自动压缩, 适用于列数比较少的情况
            forceFit: true
        },
        loadMask: {
            msg: '正在加载表格数据,请稍等...'
        }
    });
    return grid;
}