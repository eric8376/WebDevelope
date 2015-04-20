Ext.require('Ext4.Com.Model.RunningProcess_Model');//修改流程状态function updateProcessState(proc_inst_id_, state, backfun) {    Ext.Ajax.request({        url: "WorkFlowAction.ered?reqCode=updateProcessState",        method: 'post',        params: {"proc_inst_id_": proc_inst_id_, "state": state},        success: function (response, options) {            var o = Ext.JSON.decode(response.responseText);            Ext.MessageBox.alert('提示', o.data.msg);            var endprocesslistOutlayFormStore = Ext.StoreMgr.lookup('endprocesslistOutlayFormStore');            endprocesslistOutlayFormStore.loadPage(1);            if (backfun) {                backfun();            }        },        failure: function (response, options) {            Ext.MessageBox.alert('提示', Ext.decode(response.responseText).msg);        }    });}//流程转办function transferAssignee(procId, taskId, curAssignee) {    var rwin = new Ext.window.Window({        title: "获取转办人员",        width: 350,        height: 140,        closeAction: "destroy",        resizable: false,        modal: true,        layout: 'form',        bodyStyle: "padding:10",        border: true,        labelAlign: 'right',        defaultType: 'textfield',        items: [            {                fieldLabel: '目标人员',                id: 'transferusername',                name: 'transferusername',                readOnly: true,                allowBlank: false,                anchor: '100%',                listeners: {                    focus: function () {                        var us = new UserSelect();                        us.makePanelForWindow({                            title: "转办目标人员选择",                            foraccountCmpId: "transferaccount",                            forusernameCmpId: "transferusername"                        });                    }                }            },            {                fieldLabel: '工　　号',                id: 'transferaccount',                name: 'transferaccount',                readOnly: true,                allowBlank: false,                anchor: '100%',                listeners: {                    focus: function () {                        var us = new UserSelect();                        us.makePanelForWindow({                            title: "转办目标人员选择",                            foraccountCmpId: "transferaccount",                            forusernameCmpId: "transferusername"                        });                    }                }            }        ],        buttons: [            {                text: '确定',                handler: function () {                    var urlPath = "WorkFlowAction.ered?reqCode=transferAssignee";                    var userCode = Ext.getCmp("transferaccount").getValue();                    var userName = Ext.getCmp("transferusername").getValue();                    if (!userCode || !userName) {                        Ext.MessageBox.alert('提示', "请选择转办人员");                        return;                    }                    Ext.Ajax.request({                        url: urlPath,                        method: 'post',                        params: {"taskId": taskId, "userCode": userCode, "userName": userName},                        success: function (response, options) {                            var o = Ext.JSON.decode(response.responseText);                            Ext.MessageBox.alert('提示', o.data.msg);                            rwin.close();                        },                        failure: function (response, options) {                            Ext.MessageBox.alert('提示', Ext.decode(response.responseText).msg);                            rwin.close();                        }                    });                }            },            {                text: '取消',                handler: function () {                    rwin.close();                }            }        ]    });    rwin.show();}//结束流程function endProcess(taskId, suspension_state_, proc_inst_id_) {    if (suspension_state_ != 1) {        Ext.Msg.confirm('提示', '流程已挂起，确认是否结束？', function (btn, text) {            if (btn == 'yes') {                updateProcessState(proc_inst_id_, "active", function () {                    Ext.Ajax.request({                        url: "WorkFlowAction.ered?reqCode=doEndProcess",                        method: 'post',                        params: {"taskId": taskId},                        success: function (response, options) {                            var o = Ext.JSON.decode(response.responseText);                            Ext.MessageBox.alert('提示', o.data.msg);                            var endprocesslistOutlayFormStore = Ext.StoreMgr.lookup('endprocesslistOutlayFormStore');                            endprocesslistOutlayFormStore.loadPage(1)                        },                        failure: function (response, options) {                            Ext.MessageBox.alert('提示', Ext.decode(response.responseText).msg);                        }                    });                });            }        });    } else {        Ext.Msg.confirm('提示', '确认要结束流程吗？', function (btn, text) {            if (btn == 'yes') {                Ext.Ajax.request({                    url: "WorkFlowAction.ered?reqCode=doEndProcess",                    method: 'post',                    params: {"taskId": taskId},                    success: function (response, options) {                        var o = Ext.JSON.decode(response.responseText);                        Ext.MessageBox.alert('提示', o.data.msg);                        var endprocesslistOutlayFormStore = Ext.StoreMgr.lookup('endprocesslistOutlayFormStore');                        endprocesslistOutlayFormStore.loadPage(1)                    },                    failure: function (response, options) {                        Ext.MessageBox.alert('提示', Ext.decode(response.responseText).msg);                    }                });            }        });    }}//回退function backProcess(proc_inst_id_, taskId, taskName) {    var store = new Ext.data.JsonStore({        proxy: {            type: 'ajax',            url: 'WorkFlowAction.ered?reqCode=findBackAvtivity',            reader: {                type: 'json'            }        },        fields: [            {name: 'name_', type: 'string'},            {name: 'task_def_key_', type: 'string'}        ]    });    //store.loadData(nextFlow);    var cm = [        {text: '环节名', dataIndex: 'name_', menuDisabled: true, width: 315}    ];    var grid = new Ext.grid.Panel({        store: store,        columns: cm    });    var selWin = new Ext.window.Window({        title: "获取回退环节",        width: 350,        height: 270,        closeAction: "close",        resizable: false,        modal: true,        layout: 'fit',        items: [grid],        buttons: [            {                text: '确定',                handler: function () {                    var record = grid.getSelectionModel().getSelection()[0];                    if (!record) {                        Ext.MessageBox.alert('提示', "请选择下一环节节点");                        return;                    }                    var toActivityId = record.get("task_def_key_");                    var toTaskName = record.get("name_");                    var urlPath = "WorkFlowAction.ered?reqCode=backProcess";                    writeSuggestion(function (suggestionInfo) {                        /*var vis = "";                         for (var key in suggestionInfo) {                         if (vis.length != 0)                         vis += ",";                         vis += key + ":" + suggestionInfo[key];                         }*/                        Ext.Ajax.request({                            url: urlPath,                            params: {                                taskId: taskId,                                toActivityId: toActivityId,                                toTaskName: toTaskName,                                variables: Ext.encode(suggestionInfo)                            },                            success: function (response, options) {                                var o = Ext.JSON.decode(response.responseText);                                Ext.MessageBox.alert('提示', o.data.msg);                                var endprocesslistOutlayFormStore = Ext.StoreMgr.lookup('endprocesslistOutlayFormStore');                                endprocesslistOutlayFormStore.loadPage(1)                                if (suggestionWin)                                    suggestionWin.close();                                if (suggestionWin)                                    suggestionWin.close();                                selWin.close();                            },                            failure: function (response, options) {                                Ext.MessageBox.alert('提示', Ext.decode(response.responseText).msg);                            }                        });                        //postBackFun(record.get("id"), record.get("name"));                        selWin.close();                    });                }            },            {                text: '取消',                handler: function () {                    selWin.close();                }            }        ]    });    selWin.show();    store.load({        params: {            "proc_inst_id_": proc_inst_id_        }    });}var suggestionWin = null;//填写意见function writeSuggestion(postBackFun) {    var txtArea = new Ext.form.TextArea({        fieldLabel: "意见内容",        anchor: "100%"    });    var list = new Array();    list.push(txtArea);    //意见面板    var sgnPanel = new Ext.Panel({        layout: "form",        labelWidth: 55,        bodyStyle: "padding:10px;",        labelAlign: 'right',        items: list,        border: false    });    //意见窗口    suggestionWin = new Ext.window.Window({        title: '填写流程意见',        width: 300,        height: 170,        layout: 'fit',        closeAction: "close",        plain: true,        modal: true,        buttonAlign: 'right',        items: [sgnPanel],        buttons: [            {                text: '确认', handler: function () {                var stheme = 4;//回退                var desc = txtArea.getValue();                postBackFun({"suggestion_theme": stheme, "suggestion_desc": desc});            }            },            {                text: '取消', handler: function () {                if (suggestionWin)                    suggestionWin.close();            }            }        ]    });    suggestionWin.show();}function AddVarInstByProcInstId(procInstId) {    var key = new Ext.form.TextField({        fieldLabel: "KEY",        anchor: "100%"    });    var Value = new Ext.form.TextField({        fieldLabel: "VALUE",        anchor: "100%"    });    var list = new Array();    list.push(key);    list.push(Value);    var sgnPanel = new Ext.Panel({        layout: "form",        labelWidth: 55,        bodyStyle: "padding:10px;",        labelAlign: 'right',        items: list,        border: false    });    //意见窗口    var varInstWin = new Ext.window.Window({        title: '设置流程变量',        width: 300,        height: 170,        layout: 'fit',        closeAction: "close",        plain: true,        modal: true,        buttonAlign: 'right',        items: [sgnPanel],        buttons: [            {                text: '确认', handler: function () {                Ext.Ajax.request({                    url: "WorkFlowAction.ered?reqCode=AddVarInstByProcInstId",                    method: 'post',                    params: {"porcInstId": procInstId, "varKey": key.getValue(), "varValue": Value.getValue()},                    success: function (response, options) {                        var o = Ext.JSON.decode(response.responseText);                        Ext.MessageBox.alert('提示', o.data.msg);                        varInstWin.close();                    },                    failure: function (response, options) {                        Ext.Msg.hide();                    }                });            }            },            {                text: '取消', handler: function () {                if (varInstWin)                    varInstWin.close();            }            }        ]    });    varInstWin.show();}function changeAssignee(procId, taskId, curAssignee) {    var rwin = new Ext.window.Window({        title: "获取转办人员",        width: 350,        height: 140,        closeAction: "close",        resizable: false,        modal: true,        layout: 'form',        bodyStyle: "padding:10",        border: true,        labelAlign: 'right',        defaultType: 'textfield',        items: [            {                fieldLabel: '目标人员',                id: 'username',                name: 'username',                readOnly: true,                allowBlank: false,                anchor: '100%',                listeners: {                    focus: function () {                        var us = new UserSelect();                        us.makePanelForWindow({                            title: "转办目标人员选择",                            foraccountCmpId: "useraccount",                            forusernameCmpId: "username"                        });                    }                }            },            {                fieldLabel: '工　　号',                id: 'useraccount',                name: 'useraccount',                readOnly: true,                allowBlank: false,                anchor: '100%',                listeners: {                    focus: function () {                        var us = new UserSelect();                        us.makePanelForWindow({                            title: "转办目标人员选择",                            foraccountCmpId: "useraccount",                            forusernameCmpId: "username"                        });                    }                }            }        ],        buttons: [            {                text: '确定',                handler: function () {                    var urlPath = "WorkFlowAction.ered?reqCode=changeAssignee";                    var userCode = Ext.getCmp("useraccount").getValue();                    var userName = Ext.getCmp("username").getValue();                    if (!userCode || !userName) {                        Ext.MessageBox.alert('提示', "请选择转办人员");                        return;                    }                    Ext.Ajax.request({                        url: urlPath,                        method: 'post',                        params: {"procId": procId, "taskId": taskId, "userCode": userCode, "userName": userName},                        success: function (response, options) {                            var o = Ext.JSON.decode(response.responseText);                            Ext.MessageBox.alert('提示', o.data.msg);                            rwin.close();                        },                        failure: function (response, options) {                            Ext.MessageBox.alert('提示', Ext.decode(response.responseText).msg);                            rwin.close();                        }                    });                }            },            {                text: '取消',                handler: function () {                    rwin.close();                }            }        ]    });    rwin.show();}Ext.onReady(function () {    var endprocesslistOutlayFormrownum = {        xtype: 'rownumberer',        text: '序号',        width: 32    };    /*	var endprocesslistOutlayFormsm = new Ext.grid.CheckboxSelectionModel({     singleSelect : true     });*/    /**     * 待办工作的列模式     */    var endprocesslistOutlayFormCm = [endprocesslistOutlayFormrownum/*, endprocesslistOutlayFormsm*/, {        text: '执行IDssss',        dataIndex: 'id_'    }, {        text: '流程实例ID',        dataIndex: 'proc_inst_id_'    }, {        text: '流程定义ID',        dataIndex: 'proc_def_id_'    }, {        text: '主题',        dataIndex: 'wf_title'    }, {        text: '发起人',        dataIndex: 'applyuserid'    }, {        text: '当前节点',        dataIndex: 'name_',        renderer: function (value, cellmeta, record, rowIndex) {            var proc_inst_id_ = record.get("proc_inst_id_");            return "<a href='#' onclick='showTraceView(" + proc_inst_id_ + ")'>" + value + "</a>";        }    }, {        text: '当前操作人',        dataIndex: 'curassignee'    }, {        text: '任务到达时间',        dataIndex: 'create_time_'    }, {        text: '是否挂起',        dataIndex: 'suspension_state_',        renderer: function (value, cellmeta, record, rowIndex) {            if (value == "1")                return "否";            else                return "<span style=\"color:red;\">是</span>";        }    }, {        text: '操作',        width: 300,//    autoWidth : true,        dataIndex: 'proc_def_id_',        renderer: function (value, cellmeta, record, rowIndex) {            var state = record.get("suspension_state_");            var taskId = record.get("taskid");            var proc_inst_id_ = record.get("proc_inst_id_");            var taskName = record.get("name_");            var suspension_state_ = record.get('suspension_state_');            var rtnStr = "";            if (state == "1") {                rtnStr += "<a href='#' onclick='updateProcessState(" + proc_inst_id_ + ",\"suspend\")'>挂起</a>";            }            else {                rtnStr += "<a href='#' onclick='updateProcessState(" + proc_inst_id_ + ",\"active\")'>激活</a>";            }            rtnStr += " | <a href='#' onclick='backProcess(\"" + proc_inst_id_ + "\",\"" + taskId + "\",\"" + taskName + "\")'>回退</a>";            rtnStr += " | <a href='#' onclick='transferAssignee(\"" + proc_inst_id_ + "\",\"" + taskId + "\")'>转办</a>";            rtnStr += " | <a href='#' onclick='endProcess(\"" + taskId + "\",\"" + suspension_state_ + "\",\"" + proc_inst_id_ + "\")'>结束</a>";            rtnStr += " | <a href='#' onclick='taskConsumeTime(\"" + proc_inst_id_ + "\")'>耗时统计</a>";            rtnStr += " | <a href='#' onclick='AddVarInstByProcInstId(\"" + proc_inst_id_ + "\")'>添加流程变量</a>";            rtnStr += " | <a href='#' onclick='changeAssignee(\"" + proc_inst_id_ + "\",\"" + taskId + "\")'>更改设计默认人</a>"            return rtnStr;        }    }];    var endprocesslistOutlayFormStore = Ext.create('Ext.data.Store', {        storeId: 'endprocesslistOutlayFormStore',        pageSize: '20',        model: 'Ext4.Com.Model.RunningProcess_Model',        proxy: {            extraParams: {},            type: 'ajax',            url: 'WorkFlowAction.ered?reqCode=findRunningProcess',            reader: {                type: 'json',                totalProperty: 'TOTALCOUNT', // 记录总数                root: 'ROOT' // Json中的列表数据根节点            }        }    });// 每页显示条数下拉选择框    var pagesize_combo = Ext.create('Ext.form.field.ComboBox', {        triggerAction: 'all',        queryMode: 'local',        store: new Ext.data.ArrayStore({            fields: ['value', 'text'],            data: [                [10, '10条/页'],                [20, '20条/页'],                [50, '50条/页'],                [100, '100条/页'],                [250, '250条/页'],                [500, '500条/页']            ]        }),        valueField: 'value',        displayField: 'text',        value: '20',        editable: false,        width: 85    });// 改变每页显示条数reload数据    pagesize_combo.on("select", function (comboBox) {        var tempnumber = parseInt(comboBox.getValue());        endprocesslistOutlayFormStore.pageSize = tempnumber;        endprocesslistOutlayFormStore.loadPage(1);    });// 分页工具栏    var bbar = new Ext.PagingToolbar({        pageSize: '20',        store: endprocesslistOutlayFormStore,        displayInfo: true,        displayMsg: '显示{0}条到{1}条,共{2}条',        plugins: [Ext.create('Ext.ux.ProgressBarPager')], // 分页进度条        emptyMsg: "没有符合条件的记录",        items: ['-', '&nbsp;&nbsp;', pagesize_combo]    });    /**     存放订单号的panel     */    var endprocesslistOutlayFormgrid = new Ext.grid.Panel({        collapsed: false,        title: '<span class="commoncss">运行中的流程</span>',        border: true,        hideCollapseTool: true,        // 表格面板标题,默认为粗体，我不喜欢粗体，这里设置样式将其格式为正常字体        autoScroll: true,        //frame: true,        store: endprocesslistOutlayFormStore, // 数据存储        viewConfig: {            stripeRows: true,  // 不产横向生滚动条, 各列自动扩展自动压缩, 适用于列数比较少的情况            forceFit: true, enableTextSelection: true        },        columns: endprocesslistOutlayFormCm, // 列模型        tbar: [{            text: '设置流程变量',            iconCls: 'page_saveIcon',            handler: function () {                AddVarInstByProcInstId("ALL");            }        }, '->', new Ext.form.TextField({            id: 'queryParam',            name: 'queryParam',            emptyText: '请输入主题',            enableKeyEvents: true,            listeners: {                specialkey: function (field, e) {                    if (e.getKey() == Ext.EventObject.ENTER) {                        endprocesslistOutlayFormStore.proxy.extraParams.title = Ext.getCmp('queryParam').getValue().toUpperCase();                        endprocesslistOutlayFormStore.loadPage(1)                    }                }            },            width: 130        }), {            text: '查询',            iconCls: 'previewIcon',            handler: function () {                endprocesslistOutlayFormStore.proxy.extraParams.title = Ext.getCmp('queryParam').getValue().toUpperCase();                endprocesslistOutlayFormStore.loadPage(1)            }        }, '-', {            text: '刷新',            iconCls: 'arrow_refreshIcon',            handler: function () {                endprocesslistOutlayFormStore.proxy.extraParams.title = Ext.getCmp('queryParam').getValue().toUpperCase();                endprocesslistOutlayFormStore.loadPage(1)            }        }],        bbar: bbar,        //selModel: endprocesslistOutlayFormsm,        loadMask: {            msg: '正在加载表格数据,请稍等...'        }    });    endprocesslistOutlayFormStore.loadPage(1);// 布局模型    var viewport = new Ext.Viewport({        layout: 'fit',        items: [endprocesslistOutlayFormgrid]    });})