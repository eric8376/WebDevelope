/*
 用于创建流程提交面板
 Author : zhangwei
 =================================================
 model, 表示初始化流程窗口的模式
 advance    ：推进
 show       ：显示
 join       ：会签
 =================================================
 */
/// ===============================================
/// param：              流程当前环节信息
/// variables：          需要添加进流程的流程变量
/// postBackFuntion：    回调方法
/// businessObj：        用于创建业务panel的对象
/// ===============================================
function flowPanel(param, variables, postBackFuntion, businessObj, record) {
    var itemPanel = this;
    var subBar = null;              //按钮工具栏
    var mainPanel = null;           //主窗口
    var items = new Array();        //子项
    var defaultParam = {processKey: null, activityId: "start", businessKey: null, model: "advance"}; //默认参数
    var inParam = null;
    var businessParam = null;       //业务对象
    var submitParam = null;         //提交对象
    var inVariables = null;
    var selNextTaskWin = null;      //选择下一环节窗口
    var selNextUserWin = null;      //选择环节操作人窗口
    var suggestionWin = null;       //填写意见窗口
    var selNextUserWinEx = null;    //人员选择扩展
    var listeners = {};             //监听
    //初始化
    this.init = function () {
        inParam = (!param) ? defaultParam : Ext.apply(defaultParam, param);
        inVariables = (!variables) ? {} : variables;
        //inVariables.specialChanges = "1";
        if (!inParam.processKey) {
            alert("参数“processKey”不可为空！");
        }
        items.push(businessObj.makeForm(record));
        return inParam;
    }
    //生成工具条
    this.makeBar = function () {
        subBar = ['->',
//                {
//                    text: "保存",
//                    hidden: inParam.model == "show" ? true : false,
//                    iconCls: "page_saveIcon"
//                },
            {
                text: "提交",
                hidden: inParam.model == "show" ? true : false,
                iconCls: "checkIcon",
                handler: function () {
                    itemPanel.triggerListeners("onsubmitbegin", itemPanel, function () {
                        itemPanel.clearAllWindows();//清除所有已显示的窗口
                        itemPanel.taskIsJoin(function (tis) {
                            itemPanel.processAdvance(tis);
                        });
                    });
                }
            },
            {
                text: "转办",
                hidden: inParam.model == "show" ? true : (inParam.activityId == "usertask7" ? false : true),
                iconCls: "arrow_switchIcon",
                handler: function () {
                    itemPanel.transferAssignee(param.taskId);
                }
            },
            {
                text: "日志",
                hidden: inParam.model == "show" ? false : (inParam.activityId == "start" ? true : false),
                iconCls: "pageIcon",
                handler: function () {
                    itemPanel.showProcessLog();
                }
            },
            {
                text: "删除",
                hidden: true, //inParam.model == "show" ? true : (inParam.activityId == "start" ? false : true),
                iconCls: "layout_deleteIcon"
            }, '->'
        ]

    };
    //判断当前环节是否是会签环节
    this.taskIsJoin = function (postBackFun) {
        if (inParam.activityId == "start") {
            postBackFun(false);
        }
        if (postBackFun && inParam.taskId) {
            var urlPath = "WorkFlowAction.ered?reqCode=taskIsJoin";
            Ext.Ajax.request({
                url: urlPath,
                method: 'post',
                params: {"taskId": inParam.taskId},
                success: function (response, options) {
                    var o = Ext.JSON.decode(response.responseText);
                    if (o.success == true) {
                        postBackFun(o.data);
                    }
                    else {
                        Ext.MessageBox.alert('提示', Ext.decode(response.responseText).data.msg);
                    }
                },
                failure: function (response, options) {
                    Ext.MessageBox.alert('提示', Ext.decode(response.responseText).msg);
                }
            });
        }
    };
    //流程推进

    this.processAdvance = function (isJoin) {
        if (undefined == isJoin)//为空时设置默认不是会签
            isJoin = false;
        inParam.isJoin = isJoin;
        itemPanel.findNextTask(inParam, function (nextFlow) {
            var nextCount = nextFlow.length;
            if (nextCount == 0) {
                Ext.MessageBox.alert('异常', "流程流转异常，无法获取下一环节信息");
            }
            else if (nextCount == 1) {
                var nextTaskInfo = {
                    "nextTaskId": nextFlow[0].id,
                    "nextTaskName": nextFlow[0].name,
                    "nextFlow": "to" + nextFlow[0].id
                };
                itemPanel.triggerListeners("onselectednexttask", nextTaskInfo, function () {//触发选择下一环节监听
                    itemPanel.findUserByActivityId(nextTaskInfo, function (nextUserInfo) {
                        itemPanel.triggerListeners("onselectednextuser", nextUserInfo, function () {//触发选择下一环节操作人监听
                            itemPanel.submitProcess(Ext.apply(nextTaskInfo, nextUserInfo));
                        });
                    });
                });
            }
            else if (nextCount > 1) {
                itemPanel.showNextFlowSelWin(nextFlow, function (nextTaskInfo) {
                    itemPanel.triggerListeners("onselectednexttask", nextTaskInfo, function () {//触发选择下一环节监听
                        itemPanel.findUserByActivityId(nextTaskInfo, function (nextUserInfo) {
                            itemPanel.triggerListeners("onselectednextuser", nextUserInfo, function () {//触发选择下一环节操作人监听
                                itemPanel.submitProcess(Ext.apply(nextTaskInfo, nextUserInfo));
                            });
                        });
                    });
                });
            }
        });
    }
    //显示流程日志
    this.showProcessLog = function () {
        var store = Ext.create('Ext.data.Store', {
            model: 'Ext4.Com.Model.ProcessLog_Model',
            autoLoad: true,
            proxy: {
                extraParams: {"proc_inst_id_": inParam.proc_inst_id_},
                type: 'ajax',
                url: 'WorkFlowAction.ered?reqCode=findHistoryTask',
                reader: {
                    type: 'json'
                }
            }
        });
        var cm = [
            {header: '环节名', dataIndex: 'name_', menuDisabled: true, width: 120},
            {header: '操作人', dataIndex: 'username', menuDisabled: true, width: 60},
            {header: '流程意见', dataIndex: 'suggestion_desc', menuDisabled: true, width: 215},
            {header: '操作时间', dataIndex: 'end_time_', menuDisabled: true, width: 120},
            {
                header: '操作',
                dataIndex: 'suggestion_theme',
                menuDisabled: true,
                width: 50,
                renderer: function (value, cellmeta, record, rowIndex) {
                    var htmlTxt = "";
                    if (value == "1")
                        htmlTxt = "<span style='color:green'>同意</span>";
                    else if (value == "2")
                        htmlTxt = "<span style=\"color:red;\">拒绝</span>";
                    else if (value == "3")
                        htmlTxt = "<span>转办</span>";
                    else if (value == "4")
                        htmlTxt = "<span style=\"color:red;\">回退</span>";
                    else
                        htmlTxt = "<span>提交</span>";
                    return htmlTxt;
                }
            }
        ];

        var grid = new Ext.grid.Panel({
            store: store,
            columns: cm
        });


        var logWin = new Ext.Window({
            title: "流程流转历史",
            width: 610,
            height: 390,
            closeAction: "hide",
            resizable: false,
            modal: true,
            layout: 'fit',
            items: [grid],
            buttons: [
                {
                    text: '关闭',
                    handler: function () {
                        logWin.close();
                    }
                }
            ]
        });

        logWin.show();
    };
    //环节转办
    this.transferAssignee = function (taskId) {
        var useraccount = new Ext.form.TextField({
            emptyText: '',
            enableKeyEvents: true,
            width: 150,
            hidden: true
        });
        var username = new Ext.form.TextField({
            id: 'xmmc',
            name: 'xmmc',
            emptyText: '转办人员',
            fieldLabel: "指定转办人员：",
            enableKeyEvents: true,
            width: 350,
            listeners: {
                focus: function () {
                    var us = new UserSelect();
                    us.makePanelForWindow({title: "部门主管选择", foraccountCmp: useraccount, forusernameCmp: username});
                }
            }
        });
        var rwin = new Ext.Window({
            title: "获取转办人员",
            width: 350,
            height: 50,
            closeAction: "hide",
            resizable: false,
            modal: true,
            //layout: 'fit',
            items: [username, useraccount],
            buttons: [
                {
                    text: '确定',
                    handler: function () {
                        var urlPath = "WorkFlowAction.ered?reqCode=transferAssignee";
                        var userCode = useraccount.getValue();
                        if (userCode == "") {
                            alert("请选择转办人员");
                        }
                        Ext.Ajax.request({
                            url: urlPath,
                            method: 'post',
                            params: {
                                "taskId": taskId,
                                "userName": username.getValue(),
                                "userCode": userCode,
                                "curAssignee": inParam.assignee
                            },
                            success: function (response, options) {
                                var o = Ext.JSON.decode(response.responseText);
                                Ext.MessageBox.alert('提示', o.data.msg);
                                postBackFuntion();
                                rwin.close();
                            },
                            failure: function (response, options) {
                                Ext.MessageBox.alert('提示', Ext.decode(response.responseText).msg);
                                rwin.close();
                            }
                        });
                    }
                },
                {
                    text: '取消',
                    handler: function () {
                        rwin.close();
                    }
                }
            ]
        });
        rwin.show();
    };
    //获取下一环节节点
    this.findNextTask = function (curParam, postBackFun) {
        if (postBackFun) {
            var urlPath = "";
            if (curParam.activityId == "start")
                urlPath = "WorkFlowAction.ered?reqCode=findNextTaskByProcKey";
            else
                urlPath = "WorkFlowAction.ered?reqCode=findNextTask";
            Ext.Ajax.request({
                url: urlPath,
                method: 'post',
                params: curParam,
                success: function (response, options) {
                    var o = Ext.JSON.decode(response.responseText);
                    if (o.success == true) {
                        postBackFun(o.data);
                    }
                    else {
                        Ext.MessageBox.alert('提示', Ext.decode(response.responseText).data.msg);
                    }
                },
                failure: function (response, options) {
                    Ext.MessageBox.alert('提示', Ext.decode(response.responseText).msg);
                }
            });
        }
    };
    //获取环节操作人
    this.findUserByActivityId = function (nextTaskInfo, postBackFun) {
        var ActivityId = nextTaskInfo.nextTaskId;
        if (postBackFun) {
            //扩展人员选择
            //if ((inParam.activityId == "usertask3" || inParam.activityId == "usertask15" || inParam.activityId == "usertask5" || inParam.activityId == "usertask31" || inParam.activityId == "usertask33") && (ActivityId == "usertask31" || ActivityId == "usertask18" || ActivityId == "usertask24" || ActivityId == "usertask4" || ActivityId == "usertask19")) {
            if ((inParam.activityId == "usertask3" && ActivityId == "usertask31") || (inParam.activityId == "usertask15" && ActivityId == "usertask18")
                || (inParam.activityId == "usertask5" && ActivityId == "usertask4") || (inParam.activityId == "usertask31" && ActivityId == "usertask4")
                || (inParam.activityId == "usertask33" && ActivityId == "usertask19") || (inParam.activityId == "usertask108" && ActivityId == "usertask109")
                || (inParam.activityId == "usertask107" && ActivityId == "usertask108")) {
                itemPanel.findUserByActivityIdExTo1(postBackFun);
                return false;
            }
            else if ((ActivityId == "usertask24" && inParam.activityId == "usertask23")) {
                itemPanel.findUserByActivityIdExTo1(postBackFun, "root-001008");
                return false;
            }
            var urlPath = "";
            var param = null;
            if (inParam.activityId == "start") {
                urlPath = "WorkFlowAction.ered?reqCode=findUserByProcKeyAndActivityId";
                param = {"processKey": inParam.processKey, "activityId": ActivityId};
            }
            else {
                urlPath = "WorkFlowAction.ered?reqCode=findUserByProcInstIdAndActivityId";
                param = {"procInstanceId": inParam.processId, "activityId": ActivityId};
            }
            Ext.Ajax.request({
                url: urlPath,
                method: 'post',
                params: param,
                success: function (response, options) {
                    var o = Ext.JSON.decode(response.responseText);
                    var nextUserInfo = {};
                    if (o.length == 0) {
                        postBackFun(nextUserInfo);
                    }
                    else if (o.length == 1) {
                        nextUserInfo.nextUserAccount = o[0].account;
                        nextUserInfo.nextUserName = o[0].username;
                        postBackFun(nextUserInfo);
                    }
                    else {
                        var store = new Ext.data.JsonStore({
                            fields: [
                                {name: 'username', type: 'string'},
                                {name: 'account', type: 'string'}
                            ]
                        });
                        store.loadData(o);

                        var cm = new Ext.grid.ColumnModel([
                            {header: '人员', dataIndex: 'username', menuDisabled: true, width: 315}
                        ]);

                        var grid = new Ext.grid.GridPanel({
                            header: false,
                            store: store,
                            cm: cm
                        });

                        itemPanel.selNextUserWin = new Ext.Window({
                            title: "获取操作人员",
                            width: 350,
                            height: 270,
                            closeAction: "hide",
                            resizable: false,
                            border: false,
                            modal: true,
                            layout: 'fit',
                            items: [grid],
                            buttons: [
                                {
                                    text: '确定',
                                    handler: function () {
                                        var record = grid.getSelectionModel().getSelected();
                                        if (!record) {
                                            Ext.MessageBox.alert('提示', "请选择任务接收人");
                                            return;
                                        }
                                        nextUserInfo.nextUserAccount = record.get("account");
                                        nextUserInfo.nextUserName = record.get("username");
                                        postBackFun(nextUserInfo);
                                    }
                                },
                                {
                                    text: '取消',
                                    handler: function () {
                                        if (itemPanel.selNextUserWin)
                                            itemPanel.selNextUserWin.close();
                                    }
                                }
                            ]
                        });
                        itemPanel.selNextUserWin.show();
                    }
                },
                failure: function (response, options) {
                    Ext.MessageBox.alert('提示', Ext.decode(response.responseText).msg);
                }
            });
        }
    };
    //扩展人员选择
    this.findUserByActivityIdExTo1 = function (postBackFun, treeRootId) {
        if (!treeRootId) {
            treeRootId = "root-001";
        }
        var selUser = new UWSQ.WorkStatusField({treeRootId: treeRootId});
        itemPanel.selNextUserWinEx = new Ext.Window({
            title: "人员选择",
            modal: true,
            width: 500,
            layout: 'fit',
            items: [selUser],
            buttons: [
                {
                    text: '确认', handler: function () {
                    var userName = selUser.getRawValue();
                    var userAccount = selUser.getValue();
                    if (!userAccount) {
                        Ext.MessageBox.alert('提示', "请选择任务接收人");
                        return;
                    }
                    var nextUserInfo = {};
                    nextUserInfo.nextUserAccount = userAccount;
                    nextUserInfo.nextUserName = userName;
                    postBackFun(nextUserInfo);
                }
                },
                {
                    text: '取消', handler: function () {
                    if (itemPanel.selNextUserWinEx)
                        itemPanel.selNextUserWinEx.close();
                }
                }
            ]
        });
        itemPanel.selNextUserWinEx.show();
    };
    //下一环节选择窗口
    this.showNextFlowSelWin = function (nextFlow, postBackFun) {
        var store = new Ext.data.JsonStore({
            fields: [
                {name: 'name', type: 'string'},
                {name: 'id', type: 'string'}
            ]
        });
        store.loadData(nextFlow);

        var cm = new Ext.grid.ColumnModel([
            {header: '环节名', dataIndex: 'name', menuDisabled: true, width: 315}
        ]);

        var grid = new Ext.grid.GridPanel({
            header: false,
            store: store,
            cm: cm
        });

        itemPanel.selNextTaskWin = new Ext.Window({
            title: "获取下一环节",
            width: 350,
            height: 270,
            closeAction: "hide",
            resizable: false,
            modal: true,
            border: false,
            layout: 'fit',
            items: [grid],
            buttons: [
                {
                    text: '确定',
                    handler: function () {
                        var record = grid.getSelectionModel().getSelected();
                        if (!record) {
                            Ext.MessageBox.alert('提示', "请选择下一环节节点");
                            return;
                        }
                        var nextTaskInfo = {
                            "nextTaskId": record.get("id"),
                            "nextTaskName": record.get("name"),
                            "nextFlow": "to" + record.get("id")
                        };
                        postBackFun(nextTaskInfo);
                    }
                },
                {
                    text: '取消',
                    handler: function () {
                        if (itemPanel.selNextTaskWin)
                            itemPanel.selNextTaskWin.close();
                    }
                }
            ]
        });
        itemPanel.selNextTaskWin.show();
    };
    //提交流程
    this.submitProcess = function (nextInfo) {
        //填写意见
        itemPanel.writeSuggestion(function (suggestionInfo) {
            Ext.MessageBox.confirm("提示", itemPanel.getCueMsg(nextInfo), function (id) {
                if (id == "yes") {
                    inVariables = Ext.apply(inVariables, suggestionInfo);
//                    var vis = "";
//                    if (inVariables) {
//                        for (var key in inVariables) {
//                            if (vis.length != 0)
//                                vis += ",";
//                            vis += key + ":" + inVariables[key];
//                        }
//                    }
                    var curParam = Ext.apply(inParam, nextInfo);
                    curParam.variables = Ext.encode(inVariables);
                    itemPanel.businessParam = businessObj.getFormData();
                    itemPanel.submitParam = Ext.apply(curParam, itemPanel.businessParam);
                    itemPanel.triggerListeners("onsubmit", itemPanel, function () {
                        Ext.Msg.wait('正在提交数据……', '请稍候', {
                            animate: true
                        });
                        businessObj.saveFormData(itemPanel.submitParam, function (o, noCloseMainWin) {
                            if (itemPanel.suggestionWin)
                                itemPanel.suggestionWin.close();
                            if (itemPanel.selNextUserWin)
                                itemPanel.selNextUserWin.close();
                            if (itemPanel.selNextUserWinEx)
                                itemPanel.selNextUserWinEx.close();
                            if (itemPanel.selNextTaskWin)
                                itemPanel.selNextTaskWin.close();
                            Ext.Msg.hide();
                            if (!noCloseMainWin) {
                                postBackFuntion(o);
                            }

                        });
                        itemPanel.triggerListeners("onsubmitend");
                    });
                }
            });
        });
    };
    //获取提示消息
    this.getCueMsg = function (nextInfo) {
        var msg = "";
        //选择下一环节窗口
        if (itemPanel.selNextTaskWin) {
            msg = "<b style='color:red;'>" + nextInfo.nextTaskName + "</b>";
        }
        //选择环节操作人窗口
        if (itemPanel.selNextUserWin || itemPanel.selNextUserWinEx) {
            msg = msg + "由<b style='color:red;'>" + nextInfo.nextUserName + "</b>处理";
        }
        if (msg.length == 0) {
            return "确定要提交流程吗？";
        }
        else {
            return "确定要将流程提交" + msg + "吗？";
        }
    };
    //填写意见
    this.writeSuggestion = function (postBackFun) {
        if (inParam.activityId == "start") {
            postBackFun();
            return;
        }
        var s_store = new Ext.data.SimpleStore({
            fields: ['text', 'value'],
            data: [
                ['同意', '1'],
                ['拒绝', '2']
            ]
        });
        var cmb = new Ext.form.field.ComboBox({
            triggerAction: "all",
            mode: 'local',
            fieldLabel: "意见主题",
            anchor: "100%",
            displayField: 'text',
            valueField: 'value',
            store: s_store
        });
        var txtArea = new Ext.form.TextArea({
            fieldLabel: "意见内容",
            anchor: "100%"
        });
        var list = new Array();
        if (inParam.isJoin == true)
            list.push(cmb);
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
        itemPanel.suggestionWin = new Ext.Window({
            title: '填写流程意见',
            width: 300,
            height: 220,
            layout: 'fit',
            closeAction: "hide",
            plain: true,
            modal: true,
            buttonAlign: 'right',
            items: [sgnPanel],
            buttons: [
                {
                    text: '确认', handler: function () {
                    var stheme = 0;
                    if (inParam.isJoin == true) {
                        if (cmb.selectedIndex == -1) {
                            Ext.Msg.alert("提示", "请选择意见主题");
                            return;
                        }
                        stheme = cmb.getValue();
                    }
                    var desc = txtArea.getValue();
                    /*if(Ext.util.Format.trim(desc) == ""){
                     Ext.Msg.alert("提示", "请填写流程意见");
                     return;
                     }*/
                    postBackFun({"suggestion_theme": stheme, "suggestion_desc": desc});
                }
                },
                {
                    text: '取消', handler: function () {
                    if (itemPanel.suggestionWin)
                        itemPanel.suggestionWin.close();
                }
                }
            ]
        });
        itemPanel.suggestionWin.show();
    };
    //清除所有窗口
    this.clearAllWindows = function () {
        //选择下一环节窗口
        if (itemPanel.selNextTaskWin) {
            itemPanel.selNextTaskWin.close();
            itemPanel.selNextTaskWin = null;
        }
        //选择环节操作人窗口
        if (itemPanel.selNextUserWin) {
            itemPanel.selNextUserWin.close();
            itemPanel.selNextUserWin = null;
        }
        //填写意见窗口
        if (itemPanel.suggestionWin) {
            itemPanel.suggestionWin.close();
            itemPanel.suggestionWin = null;
        }
        //人员选择扩展
        if (itemPanel.selNextUserWinEx) {
            itemPanel.selNextUserWinEx.close();
            itemPanel.selNextUserWinEx = null;
        }
    };
    //添加监听
    this.addListeners = function (onKey, fun) {
        if (typeof (fun) == "function") {
            listeners[onKey] = fun;
        }
    };
    //触发监听
    this.triggerListeners = function (onKey, pram, postFun) {
        var fun = listeners[onKey];
        if (fun && typeof (fun) == "function") {
            fun(pram, postFun);
        }
        else if (typeof (postFun) == "function") {
            postFun();
        }
    };
    //添加流程变量
    this.addVariables = function (key, value) {
        if (key && value)
            inVariables[key] = value;
    };
    //生成主面板
    this.makeMainPanel = function () {
        if (!subBar)
            itemPanel.makeBar();
        mainPanel = new Ext.panel.Panel({
            dockedItems: [{
                xtype: 'toolbar',
                dock: 'bottom',
                items: subBar
            }],
            items: items,
            layout: {type:'vbox',align:'stretch'},
            border: false,
            bodyStyle: 'overflow-y:auto;overflow-x:hidden;padding:5 5 5',
            autoScroll: true
        });
        if (!inParam.otherOrderType) {
            businessObj.loadFormData(inParam.businessKey);
        }
    };
    //添加子面板
    this.applyPanel = function (item) {
        items.apply(item);
    };
    //获取主面板
    this.getMakedPanel = function () {
        if (!mainPanel)
            itemPanel.makeMainPanel();
        return mainPanel;
    };
    //初始化窗口
    itemPanel.init();
}