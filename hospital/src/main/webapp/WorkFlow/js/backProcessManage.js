var endprocesslistOutlayFormrownum = new Ext.grid.RowNumberer({
    header: '序号',
    width: 32
});
/*	var endprocesslistOutlayFormsm = new Ext.grid.CheckboxSelectionModel({
 singleSelect : true
 });*/
/**
 * 待办工作的列模式
 */
var endprocesslistOutlayFormCm = new Ext.grid.ColumnModel([endprocesslistOutlayFormrownum/*, endprocesslistOutlayFormsm*/, {
    header: '执行IDssss',
    dataIndex: 'id_'
}, {
    header: '流程实例ID',
    dataIndex: 'proc_inst_id_'
}, {
    header: '流程定义ID',
    dataIndex: 'proc_def_id_'
}, {
    header: '主题',
    dataIndex: 'wf_title'
}, {
    header: '发起人',
    dataIndex: 'applyuserid'
}, {
    header: '当前节点',
    dataIndex: 'name_',
    renderer: function (value, cellmeta, record, rowIndex) {
        var proc_inst_id_ = record.get("proc_inst_id_");
        return "<a href='#' onclick='showTraceView(" + proc_inst_id_ + ")'>" + value + "</a>";
    }
}, {
    header: '当前操作人',
    dataIndex: 'curassignee'
}, {
    header: '是否挂起',
    dataIndex: 'suspension_state_',
    renderer: function (value, cellmeta, record, rowIndex) {
        if (value == "1")
            return "否";
        else
            return "<span style=\"color:red;\">是</span>";
    }
}, {
    header: '操作',
    dataIndex: 'proc_def_id_',
    renderer: function (value, cellmeta, record, rowIndex) {
        var state = record.get("suspension_state_");
        var taskId = record.get("taskid");
        var proc_inst_id_ = record.get("proc_inst_id_");
        var taskName = record.get("name_");
        var rtnStr = "";
        rtnStr += "<a href='#' onclick='backProcess(\"" + proc_inst_id_ + "\",\"" + taskId + "\",\"" + taskName + "\")'>回退至修改平面图</a>";
        return rtnStr;
    }
}]);

var endprocesslistOutlayFormStore = new Ext.data.Store({
    // 获取数据的方式
    proxy: new Ext.data.HttpProxy({
        url: 'WorkFlowAction.ered?reqCode=findRunningProcess'
    }),
    // 数据读取器
    reader: new Ext.data.JsonReader({
        totalProperty: 'TOTALCOUNT', // 记录总数
        root: 'ROOT'
    }, [
        {
            name: 'id_'
        },
        {
            name: 'taskid'
        },
        {
            name: 'proc_inst_id_'
        },
        {
            name: 'wf_title'
        },
        {
            name: 'proc_def_id_'
        },
        {
            name: 'name_'
        },
        {
            name: 'suspension_state_'
        },
        {
            name: 'applyuserid'
        },
        {
            name: 'curassignee'
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
    endprocesslistOutlayFormStore.reload({
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
    store: endprocesslistOutlayFormStore,
    displayInfo: true,
    displayMsg: '显示{0}条到{1}条,共{2}条',
    plugins: new Ext.ux.ProgressBarPager(), // 分页进度条
    emptyMsg: "没有符合条件的记录",
    items: ['-', '&nbsp;&nbsp;', pagesize_combo]
});
/**
 存放订单号的panel
 */
var endprocesslistOutlayFormgrid = new Ext.grid.EditorGridPanel({
    collapsed: false,
    title: '<span class="commoncss">已结束流程</span>',
    clicksToEdit: 1,
    listeners: {
        validateedit: function (e) {
            e.cancel = true;
        }
    },
    border: true,
    hideCollapseTool: true,
    // 表格面板标题,默认为粗体，我不喜欢粗体，这里设置样式将其格式为正常字体
    autoScroll: true,
    frame: true,
    store: endprocesslistOutlayFormStore, // 数据存储
    stripeRows: true, // 斑马线
    cm: endprocesslistOutlayFormCm, // 列模型
    bbar: bbar,
//			sm:endprocesslistOutlayFormsm,
    viewConfig: {
        // 不产横向生滚动条, 各列自动扩展自动压缩, 适用于列数比较少的情况
        forceFit: true
    },
    loadMask: {
        msg: '正在加载表格数据,请稍等...'
    }
});
endprocesslistOutlayFormStore.reload({
    params: {
        start: 0,
        limit: bbar.pageSize
    }
});
// 布局模型
var viewport = new Ext.Viewport({
    layout: 'fit',
    items: [endprocesslistOutlayFormgrid]
});
//修改流程状态
function updateProcessState(proc_inst_id_, state) {
    Ext.Ajax.request({
        url: "WorkFlowAction.ered?reqCode=updateProcessState",
        method: 'post',
        params: {"proc_inst_id_": proc_inst_id_, "state": state},
        success: function (response, options) {
            var o = Ext.JSON.decode(response.responseText);
            Ext.MessageBox.alert('提示', o.data.msg);
            endprocesslistOutlayFormStore.reload({
                params: {
                    start: 0,
                    limit: bbar.pageSize
                }
            });
        },
        failure: function (response, options) {
            Ext.MessageBox.alert('提示', Ext.decode(response.responseText).msg);
        }
    });
}
//结束流程
function endProcess(taskId) {
    Ext.Msg.confirm('提示', '确认要结束流程吗？', function (btn, text) {
        if (btn == 'yes') {
            Ext.Ajax.request({
                url: "WorkFlowAction.ered?reqCode=doEndProcess",
                method: 'post',
                params: {"taskId": taskId},
                success: function (response, options) {
                    var o = Ext.JSON.decode(response.responseText);
                    Ext.MessageBox.alert('提示', o.data.msg);
                    endprocesslistOutlayFormStore.reload({
                        params: {
                            start: 0,
                            limit: bbar.pageSize
                        }
                    });
                },
                failure: function (response, options) {
                    Ext.MessageBox.alert('提示', Ext.decode(response.responseText).msg);
                }
            });
        }
    });
}
//回退
function backProcess(proc_inst_id_, taskId, taskName) {
    var store = new Ext.data.JsonStore({
        url: "WorkFlowAction.ered?reqCode=findBackAvtivity", fields: [
            {name: 'name_', type: 'string'},
            {name: 'task_def_key_', type: 'string'}
        ]
    });

    store.reload({
        callback: function () {
            var bl = false;
            store.each(function (record) {
                if (record.get("task_def_key_") == "usertask31") {
                    bl = true;
                }
            });
            if (!bl)
                Ext.MessageBox.alert('提示', "无法回退到修改平面图环节");
            else {
                var toActivityId = "usertask5";
                var toTaskName = "修改平面图";
                var urlPath = "WorkFlowAction.ered?reqCode=backProcess";
                writeSuggestion(function (suggestionInfo) {
                    var vis = "";
                    for (var key in suggestionInfo) {
                        if (vis.length != 0)
                            vis += ",";
                        vis += key + ":" + suggestionInfo[key];
                    }
                    Ext.Ajax.request({
                        url: urlPath,
                        method: 'post',
                        params: {
                            "taskId": taskId,
                            "toActivityId": toActivityId,
                            "toTaskName": toTaskName,
                            "variables": vis
                        },
                        success: function (response, options) {
                            var o = Ext.JSON.decode(response.responseText);
                            Ext.MessageBox.alert('提示', o.data.msg);
                            endprocesslistOutlayFormStore.reload({
                                params: {
                                    start: 0,
                                    limit: bbar.pageSize
                                }
                            });
                        },
                        failure: function (response, options) {
                            Ext.MessageBox.alert('提示', Ext.decode(response.responseText).msg);
                        }
                    });
                });
            }
        },
        params: {
            "proc_inst_id_": proc_inst_id_
        }
    });
}
var suggestionWin = null;
//填写意见
function writeSuggestion(postBackFun) {
    var txtArea = new Ext.form.TextArea({
        fieldLabel: "意见内容",
        anchor: "100%"
    });
    var list = new Array();
    list.push(txtArea);

    //意见面板
    var sgnPanel = new Ext.Panel({
        layout: "form",
        labelWidth: 55,
        bodyStyle: "padding:10px;",
        labelAlign: 'right',
        items: list,
        border: false
    });

    //意见窗口
    suggestionWin = new Ext.Window({
        title: '填写流程意见',
        width: 300,
        height: 170,
        layout: 'fit',
        closeAction: "close",
        plain: true,
        modal: true,
        buttonAlign: 'right',
        items: [sgnPanel],
        buttons: [
            {
                text: '确认', handler: function () {
                var stheme = 4;//回退
                var desc = txtArea.getValue();
                postBackFun({"suggestion_theme": stheme, "suggestion_desc": desc});
            }
            },
            {
                text: '取消', handler: function () {
                if (suggestionWin)
                    suggestionWin.close();
            }
            }
        ]
    });
    suggestionWin.show();
}
