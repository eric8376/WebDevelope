var inhandworkrownum = new Ext.grid.RowNumberer({
    header: '序号',
    width: 32
});
var inhandworksm = new Ext.grid.CheckboxSelectionModel({
    singleSelect: true
});
/**
 * 待办工作的列模式
 */
var inhandworkCm = new Ext.grid.ColumnModel([inhandworkrownum, inhandworksm, {
    header: '流程名称', // 列标题resizable:false,
    resizable: true,
    sortable: true,
    menuDisabled: true,
    dataIndex: 'name_' // 数据索引:和Store模型对应
}, {
    header: '主题', // 列标题resizable:false,
    resizable: true,
    sortable: true,
    menuDisabled: true,
    dataIndex: 'wf_title' // 数据索引:和Store模型对应
}, {
    header: '创建人', // 列标题resizable:false,
    resizable: true,
    sortable: true,
    menuDisabled: true,
    dataIndex: 'applyuserid' // 数据索引:和Store模型对应
}, {
    header: '流程发起时间', // 列标题resizable:false,
    resizable: true,
    sortable: true,
    menuDisabled: true,
    dataIndex: 'start_time_' // 数据索引:和Store模型对应
}, {
    header: '当前环节', // 列标题resizable:false,
    resizable: true,
    sortable: true,
    menuDisabled: true,
    dataIndex: 'taskname' // 数据索引:和Store模型对应
}, {
    header: '工作到达时间', // 列标题resizable:false,
    resizable: true,
    sortable: true,
    menuDisabled: true,
    dataIndex: 'create_time_' // 数据索引:和Store模型对应
}]);

var inhandworkStore = new Ext.data.Store({
    // 获取数据的方式
    proxy: new Ext.data.HttpProxy({
        url: 'WorkFlowAction.ered?reqCode=flowLinkProjectTodoByUserId'
    }),
    // 数据读取器
    reader: new Ext.data.JsonReader({
        totalProperty: 'TOTALCOUNT', // 记录总数
        root: 'ROOT' // Json中的列表数据根节点
    }, [
        {
            name: 'name_' // 数据索引:和Store模型对应
        },
        {
            name: 'wf_title' // 数据索引:和Store模型对应
        },
        {
            name: 'applyuserid'
        },
        {
            name: 'taskname' // 数据索引:和Store模型对应
        },
        {
            name: 'proc_inst_id_'
        },
        {
            name: 'assignee_'
        },
        {
            name: 'create_time_'
        },
        {
            name: 'start_time_'
        },
        {
            name: 'business_key_'
        },
        {
            name: 'id_'
        },
        {
            name: 'taskid'
        },
        {
            name: 'task_def_key_'
        },
        {
            name: 'key_'
        }
    ])
});
// 每页显示条数下拉选择框
var pagesize_combo = new Ext.form.field.ComboBox({
    name: 'pagesize',
    triggerAction: 'all',
    mode: 'local',
    store: new Ext.data.ArrayStore({
        fields: ['value', 'text'],
        data: [
            [10, '10条/页'],
            [20, '20条/页'],
            [50, '50条/页'],
            [100, '100条/页'],
            [250, '250条/页'],
            [500, '500条/页']
        ]
    }),
    valueField: 'value',
    displayField: 'text',
    value: '20',
    editable: false,
    width: 85
});
// 改变每页显示条数reload数据
pagesize_combo.on("select", function (comboBox) {
    bbar.pageSize = parseInt(comboBox.getValue());
    number = parseInt(comboBox.getValue());
    inhandworkStore.reload({
        params: {
            start: 0,
            limit: bbar.pageSize
        }
    });
});
var number = parseInt(pagesize_combo.getValue());
// 分页工具栏
var bbar = new Ext.PagingToolbar({
    pageSize: number,
    store: inhandworkStore,
    displayInfo: true,
    displayMsg: '显示{0}条到{1}条,共{2}条',
    plugins: new Ext.ux.ProgressBarPager(), // 分页进度条
    emptyMsg: "没有符合条件的记录",
    items: ['-', '&nbsp;&nbsp;', pagesize_combo]
});
/**
 存放订单号的panel
 */
var inhandworkgrid = new Ext.grid.GridPanel({
    collapsed: false,
    title: '<span class="commoncss">待办工作</span>',
    border: true,
    hideCollapseTool: true,
    // 表格面板标题,默认为粗体，我不喜欢粗体，这里设置样式将其格式为正常字体
    autoScroll: true,
    frame: true,
    store: inhandworkStore, // 数据存储
    stripeRows: true, // 斑马线
    cm: inhandworkCm, // 列模型
    bbar: bbar,
    sm: inhandworksm,
    tbar: [
        {
            text: '办理',
            iconCls: 'acceptIcon',
            handler: function () {
                var record = inhandworkgrid.getSelectionModel().getSelected();
                if (Ext.isEmpty(record)) {
                    Ext.Msg.alert('提示', '请选择要<b style="color:red;">办理</b>的工作');
                    return;
                }
                handle(record);
            }
        }, '->', new Ext.form.TextField({
            id: 'queryParam',
            name: 'queryParam',
            emptyText: '请输入主题',
            enableKeyEvents: true,
            listeners: {
                specialkey: function (field, e) {
                    if (e.getKey() == Ext.EventObject.ENTER) {
                        inhandworkStore.reload({
                            params: {
                                start: 0,
                                limit: bbar.pageSize,
                                title: Ext.getCmp('queryParam').getValue().toUpperCase()
                            }
                        });
                    }
                }
            },
            width: 130
        }), {
            text: '查询',
            iconCls: 'previewIcon',
            handler: function () {
                inhandworkStore.reload({
                    params: {
                        start: 0,
                        limit: bbar.pageSize,
                        title: Ext.getCmp('queryParam').getValue().toUpperCase()
                    }
                });
            }
        }, '-', {
            text: '刷新',
            iconCls: 'arrow_refreshIcon',
            handler: function () {
                inhandworkStore.reload({
                    params: {
                        start: 0,
                        limit: bbar.pageSize,
                        title: Ext.getCmp('queryParam').getValue().toUpperCase()
                    }
                });
            }
        }



        /*,
         {
         text: '退回',
         iconCls: 'exclamationIcon',
         handler: function () {
         //                var record = inhandworkgrid.getSelectionModel().getSelected();
         //                if (Ext.isEmpty(record)) {
         //                    Ext.Msg.alert('提示', '请选择要退回的工作');
         //                    return;
         //                }

         show_gcxd_window('');
         }
         }*/
    ],
    viewConfig: {
        // 不产横向生滚动条, 各列自动扩展自动压缩, 适用于列数比较少的情况
        forceFit: true
    },
    listeners: {
        cellclick: function (pGrid, rowIndex, columnIndex, event) {
            var fieldName = pGrid.getColumnModel().getDataIndex(columnIndex);
            if (fieldName == 'wf_title') {
                var rec = pGrid.getStore().getAt(rowIndex);
                var theStoreId = rec.get('wf_title');
                var projectid = rec.get('business_key_');
                theStoreId = theStoreId.replace('工程单：', '');

                if (theStoreId.indexOf("增补单") != -1) {
                    theStoreId = theStoreId.replace('增补单', '');
                    getVarToProjectInfo(theStoreId, projectid);
//                theStoreId = o[0].ordernumber;
//                projectid  = o[0].projectid;
                } else {
                    var comprehensivePanel = new Ext.comprehensivePanel({StoreId: theStoreId, projectid: projectid});
                    var omprehensivewindow = new Ext.Window({
                        title: '<span class="commoncss">工程单综合信息</span>',
                        layout: 'form', // 设置窗口布局模式
                        width: 850, // 窗口宽度
                        closable: true, // 是否可关闭
                        resizable: false,
                        bodyStyle: 'padding:5 5 5',
                        labelAlign: 'right',
                        autoScroll: true,
                        labelWidth: 110,
                        draggable: true,// 是否可拖动
                        closeAction: 'close',
                        animCollapse: true,
                        modal: true,
                        animateTarget: Ext.getBody(),
                        border: true, // 边框线设置
                        // pageY : 20, // 页面定位X坐标
                        pageX: document.body.clientWidth / 2 - 500 / 2, // 页面定位Y坐标
                        items: [
                            comprehensivePanel]
                    })
                    omprehensivewindow.show();
                }
            }
        }
    },
    loadMask: {
        msg: '正在加载表格数据,请稍等...'
    }
});
/**
 * 流程办理
 * @param record
 */
function handle(record) {
    var window = new Ext.Window({
        title: '<span style="float:right;margin-right:350;">' + record.get("taskname") + '</span><span style="float:left;">' + record.get("wf_title") + '</span>',
        width: 850,
        layout: 'fit',
        closeAction: "close",
        height: parseInt(document.body.clientHeight * 0.9),
        resizable: false,
        modal: true,
        plain: true
    });
    var t = eval("new " + getMapping(record.get("task_def_key_"), record.get("key_")) + "()");
    var inParam = {
        proc_inst_id_: record.get("proc_inst_id_"), assignee: record.get("assignee_"),
        activityId: record.get("task_def_key_"), processKey: "myProcess", processId: record.get("id_"),
        taskId: record.get("taskid"), nodeId: record.get("taskname"), businessKey: record.get("business_key_")
    };
    var variables = {userStatus: "1"};
    var panl = new flowPanel(inParam, variables, function () {
        window.close();
        inhandworkStore.reload({
            params: {
                start: 0,
                limit: bbar.pageSize
            }
        });
    }, t);
    setTaskListener(inParam, variables, panl, t);
    window.add(panl.getMakedPanel());
    window.show();
}

//inhandworkStore.addSorted(new Ext.data.Record());
Ext.onReady(function () {
    inhandworkStore.reload({
        params: {
            start: 0,
            limit: bbar.pageSize
        }
    });
});


function getVarToProjectInfo(ordernumber, projectid) {
    Ext.Ajax.request({
        url: 'addSupplyAction.ered?reqCode=getVarToProjectInfo',
        success: function (response) {
            var o = Ext.JSON.decode(response.responseText);
//            alert(response.responseText);
//            showProjectInfo(o[0].ordernumber, o[0].projectid)
//            Ext.MessageBox.alert('提示', o.data.msg);
//            return o;

            var comprehensivePanel = new Ext.comprehensivePanel({StoreId: o[0].ordernumber, projectid: o[0].projectid});
            var omprehensivewindow = new Ext.Window({
                title: '<span class="commoncss">工程单综合信息</span>',
                layout: 'form', // 设置窗口布局模式
                width: 850, // 窗口宽度
                closable: true, // 是否可关闭
                resizable: false,
                bodyStyle: 'padding:5 5 5',
                labelAlign: 'right',
                autoScroll: true,
                labelWidth: 110,
                draggable: true,// 是否可拖动
                closeAction: 'close',
                animCollapse: true,
                modal: true,
                animateTarget: Ext.getBody(),
                border: true, // 边框线设置
                // pageY : 20, // 页面定位X坐标
                pageX: document.body.clientWidth / 2 - 500 / 2, // 页面定位Y坐标
                items: [
                    comprehensivePanel]
            })
            omprehensivewindow.show();
        },
        failure: function () {
            Ext.Msg.alert('提示', '数据保存失败');
        },
        params: {
            ordernumber: ordernumber,
            add_supply_id: projectid
        }
    });
}
