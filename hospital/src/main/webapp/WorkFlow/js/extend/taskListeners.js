/*
 根据流程信息设置流程监听
 Author : zhangwei
 ===============================================
 inParam：           流程当前环节信息
 variables：         需要添加进流程的流程变量
 flow：              流程面板
 businessObj：       业务对象
 ===============================================
 */
function setTaskListener(inParam, variables, flow, businessObj) {
    if (inParam.processKey == 'myProcess') {
        setTaskZhuListener(inParam, variables, flow, businessObj);
    } else if (inParam.processKey == 'add_supply') {
        setTaskTwoListener(inParam, variables, flow, businessObj);
    }

}


/*
 根据流程信息设置流程监听
 Author : zhangwei
 ===============================================
 inParam：           流程当前环节信息
 variables：         需要添加进流程的流程变量
 flow：              流程面板
 businessObj：       业务对象
 ===============================================
 */

function setTaskTwoListener(inParam, variables, flow, businessObj) {
    var currentActivityId = inParam.activityId;
    if (inParam.activityId == 'task6') {
        flow.addListeners("onselectednexttask", function (nextTaskInfo, postFun) {
            flow.findUserByActivityIdExTo1(function (userinfo) {
                nextTaskInfo.nextUserAccount = userinfo.nextUserAccount;
                nextTaskInfo.nextUserName = userinfo.nextUserName;
                postFun();
            }, "root-001");
        });
    }

//        if(inParam.activityId == 'task7' ){
//            flow.addListeners("onselectednexttask", function (nextTaskInfo, postFun) {
//                flow.findUserByActivityIdExTo1(function (userinfo) {
//                    nextTaskInfo.nextUserAccount = userinfo.nextUserAccount;
//                    nextTaskInfo.nextUserName = userinfo.nextUserName;
//                    postFun();
//                }, "root-001");
//            });
//        }

//        if(inParam.activityId == 'task30' ){
//            flow.addListeners("onselectednexttask", function (nextTaskInfo, postFun) {
//                flow.findUserByActivityIdExTo1(function (userinfo) {
//                    nextTaskInfo.nextUserAccount = userinfo.nextUserAccount;
//                    nextTaskInfo.nextUserName = userinfo.nextUserName;
//                    postFun();
//                }, "root-001011");
//            });
//        }


//        if(inParam.activityId == 'task13' ){
//            flow.addListeners("onselectednexttask", function (nextTaskInfo, postFun) {
//                flow.findUserByActivityIdExTo1(function (userinfo) {
//                    nextTaskInfo.nextUserAccount = userinfo.nextUserAccount;
//                    nextTaskInfo.nextUserName = userinfo.nextUserName;
//                    postFun();
//                }, "root-001011");
//            });
//        }

//        if(inParam.activityId == 'task36' ){
//            flow.addListeners("onselectednexttask", function (nextTaskInfo, postFun) {
//                flow.findUserByActivityIdExTo1(function (userinfo) {
//                    nextTaskInfo.nextUserAccount = userinfo.nextUserAccount;
//                    nextTaskInfo.nextUserName = userinfo.nextUserName;
//                    postFun();
//                }, "root-001011");
//            });
//        }

    if (inParam.activityId == 'task5') {
        flow.addListeners("onselectednexttask", function (nextTaskInfo, postFun) {
            var measurePanel = new Ext.Panel({
                layout: "column",
                labelAlign: 'right',
                bodyStyle: "line-height:25px;padding:10px;padding-bottom:5px;",
                items: [
                    {
                        xtype: "label",
                        style: "font-size:13px;",
                        text: " 预计设计时间："
                    },
                    {
                        id: "usetime",
                        xtype: "numberfield",
                        width: 40
                    },
                    {
                        xtype: "label",
                        style: "font-size:13px;padding-left:5px;",
                        text: "分钟"
                    }
                ],
                border: false
            });

            var setMeasure = new Ext.Window({
                title: '填写时间量',
                width: 250,
                height: 130,
                //layout: 'fit',
                closeAction: "close",
                plain: true,
                modal: true,
                buttonAlign: 'right',
                resizable: false,
                items: [measurePanel],
                buttons: [
                    {
                        text: '确认', handler: function () {
                        var usetime = Ext.getCmp("usetime").getValue();
                        if (!usetime || usetime == "") {
                            Ext.MessageBox.alert('提示', "请填写时间量");
                            return;
                        }
                        flow.addVariables("useDesigntime", usetime);
                        setMeasure.close();
                        postFun();
                    }
                    },
                    {
                        text: '取消', handler: function () {
                        setMeasure.close();
                    }
                    }
                ]
            });
            setMeasure.show();
        });
    }


    if (inParam.activityId == 'task30') {
        flow.addListeners("onselectednexttask", function (nextTaskInfo, postFun) {
            if (nextTaskInfo.nextTaskId == "task24") {
                var measurePanel = new Ext.Panel({
                    layout: "column",
                    labelAlign: 'right',
                    bodyStyle: "line-height:25px;padding:10px;padding-bottom:5px;",
                    items: [
                        {
                            xtype: "label",
                            style: "font-size:13px;",
                            text: " 预计设计时间："
                        },
                        {
                            id: "usetime",
                            xtype: "numberfield",
                            width: 40
                        },
                        {
                            xtype: "label",
                            style: "font-size:13px;padding-left:5px;",
                            text: "分钟"
                        }
                    ],
                    border: false
                });

                var setMeasure = new Ext.Window({
                    title: '填写时间量',
                    width: 250,
                    height: 130,
                    //layout: 'fit',
                    closeAction: "close",
                    plain: true,
                    modal: true,
                    buttonAlign: 'right',
                    resizable: false,
                    items: [measurePanel],
                    buttons: [
                        {
                            text: '确认', handler: function () {
                            var usetime = Ext.getCmp("usetime").getValue();
                            if (!usetime || usetime == "") {
                                Ext.MessageBox.alert('提示', "请填写时间量");
                                return;
                            }
                            flow.addVariables("useDesigntime", usetime);
                            setMeasure.close();
                            postFun();
                        }
                        },
                        {
                            text: '取消', handler: function () {
                            setMeasure.close();
                        }
                        }
                    ]
                });
                setMeasure.show();

            } else {
                var measurePanel = new Ext.Panel({
                    layout: "column",
                    labelAlign: 'right',
                    bodyStyle: "line-height:25px;padding:10px;padding-bottom:5px;",
                    items: [
                        {
                            xtype: "label",
                            style: "font-size:13px;",
                            text: " 预计拆单时间："
                        },
                        {
                            id: "useChaitime",
                            xtype: "numberfield",
                            width: 40
                        },
                        {
                            xtype: "label",
                            style: "font-size:13px;padding-left:5px;",
                            text: "分钟"
                        }
                    ],
                    border: false
                });

                var assginePanel = new Ext.Panel({
                    layout: "column",
                    labelAlign: 'right',
                    bodyStyle: "line-height:25px;padding:10px;padding-bottom:5px;",
                    items: [
                        {
                            xtype: "label",
                            style: "font-size:13px;",
                            text: " 拆单人员："
                        },
                        {
                            id: "chaiUser",
                            xtype: "textfield",
                            width: 60,
                            listeners: {
                                'focus': function () {
                                    var us = new UserSelect();
                                    us.makePanelForWindow({
                                        title: "被代理人选择",
                                        forusernameCmpId: "chaiUser",
                                        foraccountCmpId: "chaiUserAccount"
                                    });
                                }
                            }
                        }
                    ],
                    border: false
                });


                var assgineAccountPanel = new Ext.Panel({
                    layout: "column",
                    labelAlign: 'right',
                    bodyStyle: "line-height:25px;padding:10px;padding-bottom:5px;",
                    items: [
                        {
                            xtype: "label",
                            style: "font-size:13px;",
                            text: " 拆单人员工号："
                        },
                        {
                            id: "chaiUserAccount",
                            xtype: "textfield",
                            width: 60
                        }
                    ],
                    border: false
                });

                var setMeasure = new Ext.Window({
                    title: '填写时间量',
                    width: 250,
                    height: 200,
                    //layout: 'fit',
                    closeAction: "close",
                    plain: true,
                    modal: true,
                    buttonAlign: 'right',
                    resizable: false,
                    items: [measurePanel, assginePanel, assgineAccountPanel],
                    buttons: [
                        {
                            text: '确认', handler: function () {
                            var useChaitime = Ext.getCmp("useChaitime").getValue();
                            var chaiUserAccount = Ext.getCmp("chaiUserAccount").getValue();
                            var chaiUser = Ext.getCmp("chaiUser").getValue();

                            if (!useChaitime || useChaitime == "") {
                                Ext.MessageBox.alert('提示', "请填写时间量");
                                return;
                            }
                            flow.addVariables("useChaitime", useChaitime);
                            flow.addVariables("useChaitime", useChaitime);
                            nextTaskInfo.nextUserAccount = chaiUserAccount;
                            nextTaskInfo.nextUserName = chaiUser;
                            setMeasure.close();
                            postFun();
                        }
                        },
                        {
                            text: '取消', handler: function () {
                            setMeasure.close();
                        }
                        }
                    ]
                });
                setMeasure.show();

            }
        });
    }
}


/*
 根据流程信息设置流程监听
 Author : zhangwei
 ===============================================
 inParam：           流程当前环节信息
 variables：         需要添加进流程的流程变量
 flow：              流程面板
 businessObj：       业务对象
 ===============================================
 */


function setTaskZhuListener(inParam, variables, flow, businessObj) {

    var currentActivityId = inParam.activityId;
    if (currentActivityId == "usertask4" || currentActivityId == "usertask6" || currentActivityId == "usertask8" || currentActivityId == "usertask10" || currentActivityId == "usertask21") {
        flow.addListeners("onselectednexttask", function (nextTaskInfo, postFun) {
            if (nextTaskInfo.nextTaskId == "exclusivegateway3") {
                var measurePanel = new Ext.Panel({
                    layout: "column",
                    labelAlign: 'right',
                    bodyStyle: "line-height:25px;padding:10px;padding-bottom:5px;",
                    items: [
                        {
                            xtype: "label",
                            style: "font-size:13px;",
                            text: "修改图纸工作量："
                        },
                        {
                            id: "measure",
                            xtype: "numberfield",
                            allowDecimals: false, // 是否允许输入小数
                            allowNegative: false, // 是否允许输入负数
                            maxValue: 100, // 允许输入的最大值
                            minValue: 1, // 允许输入的最小值
                            width: 40
                        },
                        {
                            xtype: "label",
                            style: "font-size:13px;padding-left:5px;",
                            text: "%"
                        }
                    ],
                    border: false
                });

                var setMeasure = new Ext.Window({
                    title: '填写工作量',
                    width: 250,
                    height: 130,
                    //layout: 'fit',
                    closeAction: "close",
                    plain: true,
                    modal: true,
                    buttonAlign: 'right',
                    resizable: false,
                    items: [measurePanel, {
                        border: false,
                        bodyStyle: "padding:10px;padding-top:0px;",
                        html: "<span style='font-size:11px;color:red;'>修改图纸耗时：原绘图时间 * 工作量</span>"
                    }],
                    buttons: [
                        {
                            text: '确认', handler: function () {
                            var measure = Ext.getCmp("measure").getValue();
                            if (!measure || measure == "") {
                                Ext.MessageBox.alert('提示', "请填写工作量");
                                return;
                            }
                            flow.addVariables("drawingMeasure", measure);
                            setMeasure.close();
                            postFun();
                        }
                        },
                        {
                            text: '取消', handler: function () {
                            setMeasure.close();
                        }
                        }
                    ]
                });
                setMeasure.show();
            }
            else if (nextTaskInfo.nextTaskId == "exclusivegateway1") {
                Ext.Ajax.request({
                    url: 'taskslistAction.ered?reqCode=queryPlaneInfo',
                    params: {"projectid": inParam.businessKey},
                    success: function (response) {
                        if (response.responseText != '') {
                            var pmtinfo = Ext.JSON.decode(response.responseText);
                            var urlPath = "AD_DesignAction.ered?reqCode=isMixSet";
                            Ext.Ajax.request({
                                url: urlPath,
                                method: 'post',
                                params: {"drawing_id": pmtinfo[0].drawing_id},
                                success: function (response, options) {
                                    if (response.responseText == "2") {
                                        flow.findUserByActivityIdExTo1(function (userinfo) {
                                            nextTaskInfo.nextUserAccount = userinfo.nextUserAccount;
                                            nextTaskInfo.nextUserName = userinfo.nextUserName;
                                            postFun();
                                        }, "root-001");
                                    }
                                    else {
                                        postFun();
                                    }
                                },
                                failure: function (response, options) {
                                    Ext.MessageBox.alert('提示', Ext.decode(response.responseText).msg);
                                }
                            });
                        }
                        else {
                            postFun();
                        }
                    }
                });
            }
            else {
                postFun();
            }
        });
    }
    if (currentActivityId == "usertask7") {
        flow.addListeners("onsubmitbegin", function (itemPanel, postFun) {
            flow.addVariables("customizeAuthorize", businessObj.getstandardProductExamineStatue());
            postFun();
        });
    }
    if (currentActivityId == "usertask31") {
        flow.addListeners("onselectednexttask", function (nextTaskInfo, postFun) {
            if (nextTaskInfo.nextTaskId == "usertask62") {
                if (businessObj.undoValid) {
                    businessObj.undoValid();
                }
                showAddLosingRecordWin(inParam, postFun);
            }
            else {
                postFun();
            }
        });
    }
    if (currentActivityId == "usertask5") {
        flow.addListeners("onselectednexttask", function (nextTaskInfo, postFun) {
            if (nextTaskInfo.nextTaskId == "usertask63") {
                if (businessObj.undoValid) {
                    businessObj.undoValid();
                }
                showAddLosingRecordWin(inParam, postFun);
            }
            else {
                postFun();
            }
        });
    }
    if (currentActivityId == "usertask12") {
        flow.addListeners("onselectednexttask", function (nextTaskInfo, postFun) {
            if (nextTaskInfo.nextTaskId == "exclusivegateway4") {
                Ext.Ajax.request({
                    url: 'WorkFlowAction.ered?reqCode=getProcessVar',
                    params: {"proc_inst_id_": inParam.proc_inst_id_, "varKey": "renderingsPayments"},
                    success: function (response) {
                        var varValue = response.responseText;
                        if (varValue == "2") {
                            delete nextTaskInfo.nextUserAccount;
                            delete nextTaskInfo.nextUserName;
                            postFun();
                        }
                        else if (businessObj.getdiscount() < 100) {
                            flow.findUserByActivityIdExTo1(function (nextUserInfo) {
                                nextTaskInfo.nextUserAccount = nextUserInfo.nextUserAccount;
                                nextTaskInfo.nextUserName = nextUserInfo.nextUserName;
                                postFun();
                            }, "root-001");
                        }
                        else {
                            delete nextTaskInfo.nextUserAccount;
                            delete nextTaskInfo.nextUserName;
                            postFun();
                        }
                    },
                    failure: function (response, options) {
                        Ext.MessageBox.alert('提示', Ext.decode(response.responseText).msg);
                    }
                });
            }
            else {
                postFun();
            }
        });
    }
    //订单生产计划在安排计划那里生产
    /*    if(currentActivityId=='usertask112')
     {
     flow.addListeners("onsubmitbegin", function (itempanel, postFun) {
     var Plane_window = new Ext.Window({
     layout: 'fit',
     draggable: true,
     closable: false,
     modal: true,
     closeAction: 'close',
     title: '计划列表',
     collapsible: true,
     maximized:true,
     titleCollapse: true,
     buttonAlign: 'right',
     border: false,
     pageY: 20,
     pageX: document.body.clientWidth / 2 - 420 / 2,
     items: [new Ext.ProducePlaneInfo({justManagePlane:true,planetype:1, forchoice:true,  planestatue :1,choicePlane:function(){
     var rec=this.getSelectionModel().getSelected();
     if(Ext.isEmpty(rec))
     {
     Ext.Msg.alert('提示','请选择计划');
     return ;
     }
     //选择计划
     businessObj.produceplaneid= rec.get('produceplaneid');
     Plane_window.close()
     }})] ,//只能生产已发布的产品
     listeners:{
     beforeclose:function(){
     postFun();
     }

     }
     });
     Plane_window.show();
     });
     }*/

    if (currentActivityId == 'usertask8') {
        flow.addListeners("onselectednexttask", function (nextTaskInfo, postFun) {
            if (nextTaskInfo.nextTaskId == "usertask9" || nextTaskInfo.nextTaskId == "exclusivegateway27") {
                if (!businessObj.vialdDrawing()) {
                    Ext.Msg.alert("提示", "无平面报价图，无法提交流程。");
                }
                else {
                    postFun();
                }
            }
            else {
                postFun();
            }
        });
    }
    if (currentActivityId == 'usertask5' || currentActivityId == 'usertask31') {
        flow.addListeners("onsubmitbegin", function (itemPanel, postFun) {
            Ext.Ajax.request({
                url: 'taskslistAction.ered?reqCode=getItemCountByDrawingId',
                params: {"drawing_id": businessObj.getDrawingId()},
                success: function (response) {
                    var pmtinfo = Ext.JSON.decode(response.responseText);
                    if (pmtinfo.success) {
                        if (pmtinfo.data.result == 0 && pmtinfo.data.count == 0) {
                            Ext.Msg.alert("提示", "如果图纸中需要上部成品（面板），请确保已在图纸中绘制完成。", function () {
                                postFun();
                            });
                        }
                        else
                            postFun();
                    }
                    else {
                        Ext.MessageBox.alert('提示', "发生未知异常，请联系系统管理员");
                    }

                },
                failure: function (response, options) {
                    Ext.MessageBox.alert('提示', Ext.decode(response.responseText).msg);
                }
            });
        });
    }
    if (currentActivityId == 'usertask8') {
        flow.addListeners("onsubmitbegin", function (itemPanel, postFun) {
            Ext.Ajax.request({
                url: 'taskslistAction.ered?reqCode=getItemCountByProjectId',
                params: {"projectid": inParam.businessKey},
                success: function (response) {
                    var pmtinfo = Ext.JSON.decode(response.responseText);
                    if (pmtinfo.success) {
                        if (pmtinfo.data.result == 0 && pmtinfo.data.count == 0) {
                            Ext.MessageBox.confirm('提示', "图纸中未包含上部成品（面板），确定要继续提交吗？", function (id) {
                                if (id == 'yes')
                                    postFun();
                            });
                        }
                        else
                            postFun();
                    }
                    else {
                        Ext.MessageBox.alert('提示', "发生未知异常，请联系系统管理员");
                    }

                },
                failure: function (response, options) {
                    Ext.MessageBox.alert('提示', Ext.decode(response.responseText).msg);
                }
            });
        });
    }
    if (currentActivityId == 'usertask21') {
        flow.addListeners("onsubmitbegin", function (itemPanel, postFun) {
            Ext.Msg.alert("提示", "如果预报价图纸中未包含上部成品（面板）请退回到“<span style='color:red;'>修改平面图（制作或修改引立面）</span>”", function () {
                postFun();
            });
        });
        flow.addListeners("onselectednexttask", function (nextTaskInfo, postFun) {
            if (nextTaskInfo.nextTaskId == "exclusivegateway3") {
                var store = new Ext.data.SimpleStore({
                    fields: ['name', 'code'],
                    data: [['修改平面（无需效果图）', '1'], ['修改平面（需效果图）', '3']]
                });
                var firstForm = new Ext.form.FormPanel({
                    id: 'firstForm',
                    name: 'firstForm',
                    labelWidth: 50, // 标签宽度
                    // frame : true, //是否渲染表单面板背景色
                    defaultType: 'textfield', // 表单元素默认类型
                    labelAlign: 'right', // 标签对齐方式
                    bodyStyle: 'padding:5 5 5 5', // 表单元素和表单面板的边距
                    items: [new Ext.form.field.ComboBox({
                        id: 'hxlx',
                        hiddenName: 'area1',
                        fieldLabel: '请选择',
                        triggerAction: 'all',
                        store: store,
                        displayField: 'name',
                        valueField: 'code',
                        mode: 'local',
                        forceSelection: true,
                        typeAhead: true,
                        value: '3',
                        resizable: true,
                        anchor: '95%'
                    })]
                });

                var firstWindow = new Ext.Window({
                    title: '<span class="commoncss">选择后续操作</span>', // 窗口标题
                    layout: 'fit', // 设置窗口布局模式
                    width: 300, // 窗口宽度
                    height: 200, // 窗口高度
                    closeAction: "close",
                    border: false, // 边框线设置
                    constrain: true, // 设置窗口是否可以溢出父容器
                    items: [firstForm], // 嵌入的表单面板
                    buttons: [{ // 窗口底部按钮配置
                        text: '确定', // 按钮文本
                        iconCls: 'acceptIcon', // 按钮图标
                        handler: function () { // 按钮响应函数
                            var v = firstForm.findById("hxlx").getValue();
                            flow.addVariables("editstatus", v);
                            flow.addVariables("askSGTParallel", "0");
                            firstWindow.close();
                            postFun();
                        }
                    }]
                });
                firstWindow.show(); // 显示窗口
            }
            else if (nextTaskInfo.nextTaskId == "servicetask1") {
                var parallelPanel = new Ext.Panel({
                    labelAlign: 'right',
                    bodyStyle: "line-height:25px;padding:20px;padding:8px;padding-bottom:5px;font-size:13px;",
                    items: [
                        {
                            boxLabel: '合同谈判',
                            name: 'C1',
                            id: 'cbox1',
                            inputValue: '1',
                            xtype: 'checkbox',
                            checked: true,
                            disabled: true
                        },
                        {boxLabel: '施工图', name: 'C1', id: 'cbox2', inputValue: '2', xtype: 'checkbox'}
                    ],
                    border: false
                });

                var setParallel = new Ext.Window({
                    title: '并行选择',
                    width: 250,
                    height: 130,
                    //layout: 'fit',
                    closeAction: "close",
                    plain: true,
                    modal: true,
                    buttonAlign: 'right',
                    resizable: false,
                    items: [parallelPanel],
                    buttons: [
                        {
                            text: '确认', handler: function () {
                            if (parallelPanel.findById("cbox2").getValue()) {
                                flow.addVariables("askSGTParallel", "1");
                            }
                            else {
                                flow.addVariables("askSGTParallel", "0");
                            }
                            flow.addVariables("sgtParallel", "0");
                            setParallel.close();
                            postFun();
                        }
                        },
                        {
                            text: '取消', handler: function () {
                            setParallel.close();
                        }
                        }
                    ]
                });
                setParallel.show();
            }
            else {
                postFun();
            }
        });
    }
    if (currentActivityId == 'usertask96') {
        flow.addListeners("onselectednexttask", function (nextTaskInfo, postFun) {
            if (nextTaskInfo.nextTaskId == "servicetask2") {
                var store = new Ext.data.SimpleStore({
                    fields: ['name', 'code'],
                    data: [
                        ['重新报价（无需效果图）', '1'],
                        ['重新报价（需效果图）', '3'],
                        ['修改造型', '2']
                    ]
                });
                var firstForm = new Ext.form.FormPanel({
                    id: 'firstForm',
                    name: 'firstForm',
                    labelWidth: 50, // 标签宽度
                    // frame : true, //是否渲染表单面板背景色
                    defaultType: 'textfield', // 表单元素默认类型
                    labelAlign: 'right', // 标签对齐方式
                    bodyStyle: 'padding:5 5 5 5', // 表单元素和表单面板的边距
                    items: [new Ext.form.field.ComboBox({
                        id: 'hxlx',
                        hiddenName: 'area1',
                        fieldLabel: '请选择',
                        triggerAction: 'all',
                        store: store,
                        displayField: 'name',
                        valueField: 'code',
                        mode: 'local',
                        //listWidth : 120, // 下拉列表的宽度,默认为下拉选择框的宽度
                        forceSelection: true,
                        typeAhead: true,
                        value: '0',
                        resizable: true,
                        anchor: '95%'
                    })]
                });

                var firstWindow = new Ext.Window({
                    title: '<span class="commoncss">选择后续操作</span>', // 窗口标题
                    layout: 'fit', // 设置窗口布局模式
                    width: 300, // 窗口宽度
                    height: 200, // 窗口高度
                    closeAction: "close",
                    border: false, // 边框线设置
                    constrain: true, // 设置窗口是否可以溢出父容器
                    items: [firstForm], // 嵌入的表单面板
                    buttons: [
                        { // 窗口底部按钮配置
                            text: '确定', // 按钮文本
                            iconCls: 'acceptIcon', // 按钮图标
                            handler: function () { // 按钮响应函数
                                var v = firstForm.findById("hxlx").getValue();
                                flow.addVariables("editstatus", v);
                                postFun();
//                                var scale = businessObj.getDiscountScale();
//                                Ext.Ajax.request({
//                                    url: 'taskslistAction.ered?reqCode=getAccountManagerByProjectId',
//                                    method: 'post',
//                                    params: { "projectid": inParam.businessKey },
//                                    success: function (response, options) {
//                                        //alert(response.responseText);
//                                        var tscale = 95;
//                                        if (scale < tscale) {
//                                            flow.addVariables("discountstatus", "1");
//                                            flow.addVariables("ratio", scale);
//                                            Ext.Ajax.request({
//                                                url: 'taskslistAction.ered?reqCode=moneyChange',
//                                                method: 'post',
//                                                params: { "projectid": inParam.businessKey, "barOfficial": businessObj.getBarOfficial() },
//                                                success: function (response, options) {
//                                                    var moneyChange = response.responseText;
//                                                    flow.addVariables("moneyChange", moneyChange);
//                                                    if (v == 0 && moneyChange == "1") {
//                                                        flow.findUserByActivityIdExTo1(function (tnextUserInfo) {
//                                                            nextUserInfo.nextUserAccount = tnextUserInfo.nextUserAccount;
//                                                            nextUserInfo.nextUserName = tnextUserInfo.nextUserName;
//                                                            postFun();
//                                                            firstWindow.close();
//                                                        }, "root-001");
//                                                    }
//                                                    else {
//                                                        postFun();
//                                                        firstWindow.close();
//                                                    }
//                                                }
//                                            });
//                                        }
//                                        else {
//                                            flow.addVariables("ratio", scale);
//                                            flow.addVariables("discountstatus", "0");
//                                            postFun();
//                                            firstWindow.close();
//                                        }
//                                    },
//                                    failure: function (response, options) {
//                                        Ext.Msg.hide();
//                                        Ext.MessageBox.alert('提示', "发生未知异常，请联系管理员。");
//                                    }
//                                });
                            }
                        }
                    ]
                });
                firstWindow.show(); // 显示窗口
            }
            else {
                postFun();
            }
        });
    }
    if (currentActivityId == 'usertask103') {
        flow.addListeners("onsubmitbegin", function (itemPanel, postFun) {
            flow.addVariables("sgtParallel", businessObj.getResult());
            postFun();
        });
    }
}

