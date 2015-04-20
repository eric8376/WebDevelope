/**
 * 欢迎页面
 */
Ext.require('Ext4.SB.Model.NewMail_Model');
Ext.require('Ext4.Com.Model.flowLinkProjectTodoByUserId_Model');
Ext.require('Ext4.Wf.Model.RunningProcess_Model');
Ext.require('Ext4.HOS.Panel.CheckInfo_Panel');
Ext.require('Ext4.Com.Model.ProcessLog_Model');
function realHandle(record) {
    var t = eval("new " + getMapping(record.get("task_def_key_"), record.get("key_")) + "()");
    var inParam = {
        proc_inst_id_: record.get("proc_inst_id_"),
        assignee: record.get("assignee_"),
        activityId: record.get("task_def_key_"),
        processKey: record.get("key_"),
        processId: record.get("id_"),
        taskId: record.get("taskid"),
        nodeId: record.get("taskname"),
        businessKey: record.get("business_key_")
    };
    var variables = {userStatus: "1"};
    var panl = new flowPanel(inParam, variables, function () {
        window.close();
        Ext.StoreManager.lookup('inhandworkStore').loadPage(1)
    }, t, record);
    //panl.addListeners("onsubmitbegin", setTaskListener);
    setTaskListener(inParam, variables, panl, t);
    var Mainpanel = panl.getMakedPanel();
    if (record.get("task_def_key_") == 'usertask65') {
        Mainpanel.bodyStyle = 'overflow-y:auto;overflow-x:hidden;padding:0 0 0;';
    }
    var diyPanelWidth = Mainpanel.items.items[0].width;
    var diyPanelHeight = Mainpanel.items.items[0].height;

    var window = new Ext.window.Window({
        closeAction: 'destroy',
        border: false,
        layout: 'fit',
        resizable: false,
        center: true,
        constrain: true,
        modal: true,
        title: '<span style="float:right;margin-right:' + (Ext.isEmpty(diyPanelWidth) ? 350 : diyPanelWidth / 2 - 50) + ';">' + record.get("taskname") + '</span><span style="float:left;">' + record.get("wf_title") + '</span>',
        width: Ext.isEmpty(diyPanelWidth) ? 850 : diyPanelWidth,
        height: Ext.isEmpty(diyPanelHeight) ? parseInt(document.body.clientHeight * 0.9) : diyPanelHeight,
        plain: true,
        items: [
            Mainpanel
        ]
    }).show();

}
/**
 * 流程办理
 * @param record
 */
function handle(record) {
    if (record.get('key_') == 'VerifyCheckRecord') {
        Ext.Ajax.request({
            url: 'HospitalManageAction.ered?reqCode=querySimbleCheckInfo',
            success: function (response) {
                var result = Ext.JSON.decode(response.responseText);
                if (result.error) {
                    Ext.Msg.show({
                        title: '提示',
                        msg: result.error,
                        buttons: Ext.Msg.OK,
                        icon: Ext.MessageBox.WARNING
                    });
                }
                record.set('check_type', result[0].check_type);
                realHandle(record);
            },
            failure: function () {
                Ext.Msg.show({
                    title: '提示',
                    msg: '数据传输失败，请联系相关人员',
                    buttons: Ext.Msg.OK,
                    icon: Ext.MessageBox.WARNING
                });
            },
            timeout: 3000000,// default 30000 milliseconds
            params: {
                record_id: record.get('business_key_')
            }
        });
    } else {
        realHandle(record)
    }
}
Ext.onReady(function () {
    //消息群
    var message = "";
    //消息窗口(5秒后如无移动自动销毁)
    var InfoWin = new Ext.ux.TipWindow({
        title: '<span class=commoncss>提示</span>',
        html: '您有[0]条未读信息',
        iconCls: 'commentsIcon'
    }).showAt(document.body.clientWidth - 250, document.body.clientHeight - 150);

    //获取最新收件
//    var new_store_mail_in=Ext.create('Ext.data.Store',{
//
//        model: 'Ext4.SB.Model.NewMail_Model',
//        autoLoad:true,
//        proxy: {
//            extraParams: {
//
//            }  ,
//            type: 'ajax',
//            url: 'SysMailInAction.ered?reqCode=getNewMail',
//            reader: {
//                type: 'json',
//                totalProperty : 'TOTALCOUNT', // 记录总数
//                root : 'ROOT' // Json中的列表数据根节点
//            }
//        }  ,
//        listeners:{
//            load:function(store){
//                if(store.getCount()>0){
//                    message+="您有[<font color=red><b>"+store.getCount()+"</b></font>]封未读邮件！请注意查收~<br/>";
//                    InfoWin.setMessage(message);
//                }
//            }
//        }
//    }) ;
    var panel1 = InitInhandwork();
    var panel2 = InitHaveworkingwork();
    var publicMsg = Ext.create('Ext.panel.Panel', {
        columnWidth: 0.3,
        style: 'margin-left:10;',
        title: '公告',
        border: true
    });
    var mail = Ext.create('Ext.panel.Panel', {columnWidth: 0.3, style: 'margin-left:10;', title: '邮件', border: true})
    var mainPanel = Ext.create('Ext.panel.Panel', {
        layout: {type: 'column', columns: 2},
        border: false,
        bodyStyle: 'padding:10 10 10 10',
        defaults: {
            columnWidth: 0.7
        },
        items: [
            panel1,
            publicMsg,
            Ext.create('Ext.panel.Panel', {columnWidth: 1, height: 20, border: false}),
            panel2,
            mail
        ]
    });
    new Ext.Viewport({
        layout: 'fit',
        items: [mainPanel],
        listeners: {
            'resize': function (port, width, height, oldWidth, oldHeight, eOpts) {
                var newheg = (height - 60) / 2;
                panel1.setHeight(newheg)
                panel2.setHeight(newheg)
                publicMsg.setHeight(newheg)
                mail.setHeight(newheg)
            }
        }
    });
});

//初始化待办页面
function InitInhandwork() {
    var inhandworkrownum =
    {
        xtype: 'rownumberer',
        text: '序号',
        width: 32
    };
    var inhandworksm = Ext.create('Ext.selection.CheckboxModel',
        {mode: 'SINGLE'});
    /**
     * 待办工作的列模式
     */
    var inhandworkCm = [inhandworkrownum, {
        text: '流程名称',
        resizable: true,
        sortable: true,
        menuDisabled: true,
        dataIndex: 'name_'
    }, {
        text: '主题', // 列标题resizable:false,
        resizable: true,
        sortable: true,
        menuDisabled: true,
        dataIndex: 'wf_title', // 数据索引:和Store模型对应
        renderer: function (value, cellmeta, record, rowIndex) {
            var theStoreId = record.get('wf_title');
            var projectid = record.get('business_key_');
            theStoreId = theStoreId.replace('工程单：', '');
            return "<a href='#' onclick='showProjectInfo(\"" + theStoreId + "\",\"" + projectid + "\")'>" + value + "</a>";
        }
    }, {
        text: '申请人', // 列标题resizable:false,
        resizable: true,
        sortable: true,
        menuDisabled: true,
        dataIndex: 'applyuserid' // 数据索引:和Store模型对应
    }, {
        text: '当前环节', // 列标题resizable:false,
        resizable: true,
        sortable: true,
        menuDisabled: true,
        dataIndex: 'taskname', // 数据索引:和Store模型对应
        renderer: function (value, cellmeta, record, rowIndex) {
            var proc_inst_id_ = record.get("proc_inst_id_");
            return "<a href='#' onclick='showTraceView(" + proc_inst_id_ + ")'>" + value + "</a>";
        }
    }, {
        text: '工作到达时间', // 列标题resizable:false,
        resizable: true,
        sortable: true,
        menuDisabled: true,
        dataIndex: 'create_time_' // 数据索引:和Store模型对应
    }];

    var inhandworkStore = Ext.create('Ext.data.Store', {
        pageSize: '20', storeId: 'inhandworkStore',
        model: 'Ext4.Com.Model.flowLinkProjectTodoByUserId_Model',
        proxy: {
            extraParams: {},
            type: 'ajax',
            url: 'WorkFlowAction.ered?reqCode=flowLinkProjectTodoByUserId',
            reader: {
                type: 'json',
                totalProperty: 'TOTALCOUNT', // 记录总数
                root: 'ROOT' // Json中的列表数据根节点
            }
        }
    });
// 每页显示条数下拉选择框

    var pagesize_combo =
        Ext.create('Ext.form.field.ComboBox', {
            triggerAction: 'all',
            queryMode: 'local',
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

    inhandworkStore.on("beforeload", function () {
        Ext.apply(inhandworkStore.proxy.extraParams, {type: pagesize_combo.getValue()});
    });
    pagesize_combo.on("select", function (comboBox) {
        var tempnumber = parseInt(comboBox.getValue());
        inhandworkStore.pageSize = tempnumber;
        bbar.pageSize = tempnumber;
        inhandworkStore.loadPage(1);
    });
    var bbar =
        new Ext.PagingToolbar({
            pageSize: '20',
            store: inhandworkStore,
            displayInfo: true,
            displayMsg: '显示{0}条到{1}条,共{2}条',
            plugins: [Ext.create('Ext.ux.ProgressBarPager')], // 分页进度条
            emptyMsg: "没有符合条件的记录",
            items: ['-', '&nbsp;&nbsp;', pagesize_combo]
        });
// 改变每页显示条数reload数据
// 分页工具栏
    var inhandworkgrid = new Ext.grid.Panel({
        collapsed: false,
        title: '待办工作',
        border: true,
        hideCollapseTool: true,
        autoScroll: true,
        //frame: true,
        store: inhandworkStore, // 数据存储
        columns: inhandworkCm, // 列模型
        bbar: bbar,
        forceFit: true,
        tbar: [
            {
                text: '办理',
                iconCls: 'acceptIcon',
                handler: function () {
                    var record = inhandworkgrid.getSelectionModel().getSelection()[0];
                    if (Ext.isEmpty(record)) {
                        Ext.Msg.alert('提示', '请选择要<b style="color:red;">办理</b>的工作');
                        return;
                    }
                    var assignee_ = record.get('assignee_')
                    if (Ext.isEmpty(assignee_)) {
                        Ext.Msg.show({
                            title: '提示',
                            msg: '任务未签收，无法办理',
                            buttons: Ext.Msg.OK,
                            icon: Ext.MessageBox.WARNING
                        });
                        return;
                    }
                    handle(record);
                }
            }, {
                text: '签收',
                iconCls: 'note_editIcon',
                handler: function () {
                    var record = inhandworkgrid.getSelectionModel().getSelection()[0];
                    if (Ext.isEmpty(record)) {
                        Ext.Msg.alert('提示', '请选择要<b style="color:red;">签收</b>的工作');
                        return;
                    }
//                    var assignee_=record.get('assignee_');
//                        if(!Ext.isEmpty(assignee_))
//                        {
//                            Ext.Msg.show({
//                                title: '提示',
//                                msg: '任务已签收，无需再次签收',
//                                buttons: Ext.Msg.OK,
//                                icon: Ext.MessageBox.WARNING
//                            });
//                            return;
//                        }
                    Ext.Ajax.request({
                        url: 'WorkFlowAction.ered?reqCode=taskClaim',
                        success: function (response) {
                            var result = Ext.JSON.decode(response.responseText);
                            inhandworkStore.reload();
                            if (result.error) {
                                Ext.Msg.show({
                                    title: '提示',
                                    msg: result.data.msg,
                                    buttons: Ext.Msg.OK,
                                    icon: Ext.MessageBox.WARNING
                                });
                            } else {
                                Ext.Msg.show({
                                    title: '提示',
                                    msg: result.data.msg,
                                    buttons: Ext.Msg.OK
                                });
                            }
                        },
                        failure: function () {
                            Ext.Msg.show({
                                title: '提示',
                                msg: '数据传输失败，请联系相关人员',
                                buttons: Ext.Msg.OK,
                                icon: Ext.MessageBox.WARNING
                            });
                        },
                        params: record.data,
                        timeout: 3000000
                    });
                }
            }, '->', new Ext.form.TextField({
                id: 'queryParam',
                name: 'queryParam',
                emptyText: '请输入主题',
                enableKeyEvents: true,
                listeners: {
                    specialkey: function (field, e) {
                        if (e.getKey() == Ext.EventObject.ENTER) {

                            inhandworkStore.proxy.extraParams.title = Ext.getCmp('queryParam').getValue().toUpperCase();
                            inhandworkStore.loadPage(1);
                        }
                    }
                },
                width: 130
            }), {
                text: '查询',
                iconCls: 'previewIcon',
                handler: function () {
                    inhandworkStore.proxy.extraParams.title = Ext.getCmp('queryParam').getValue().toUpperCase();
                    inhandworkStore.loadPage(1);
                }
            }, '-', {
                text: '刷新',
                iconCls: 'arrow_refreshIcon',
                handler: function () {
                    inhandworkStore.proxy.extraParams.title = Ext.getCmp('queryParam').getValue().toUpperCase();
                    inhandworkStore.loadPage(1);
                }
            }
        ],
        selModel: inhandworksm,
        loadMask: {
            msg: '正在加载表格数据,请稍等...'
        }
    });


    inhandworkStore.loadPage(1)
    return inhandworkgrid;
}

function InitHaveworkingwork() {
    var endprocesslistOutlayFormrownum =
    {
        xtype: 'rownumberer',
        text: '序号',
        width: 32
    };

// 表格工具栏
    var tbar = new Ext.Toolbar({
        items: [
            {
                xtype: 'textfield',
                id: 'xmmc',
                name: 'xmmc',
                emptyText: '请输入工程单号',
                width: 150,
                enableKeyEvents: true,
                // 响应回车键
                listeners: {
                    specialkey: function (field, e) {
                        if (e.getKey() == Ext.EventObject.ENTER) {
                            queryCatalogItem();
                        }
                    }
                }
            },
            {
                text: '查询',
                iconCls: 'page_findIcon',
                handler: function () {

                }
            },
            {
                text: '刷新',
                iconCls: 'page_refreshIcon',
                handler: function () {
                    endprocesslistOutlayFormStore.load();
                }
            }
        ]
    });

    /**
     * 待办工作的列模式
     */
    var endprocesslistOutlayFormCm = [endprocesslistOutlayFormrownum, {
        text: '流程名称',
        dataIndex: 'processname'
    }/*, endprocesslistOutlayFormsm*/, {
        text: '主题',
        dataIndex: 'wf_title'
    }, {
        text: '发起人',
        dataIndex: 'applyuserid'
    }, {
        text: '当前节点',
        dataIndex: 'name_',
        renderer: function (value, cellmeta, record, rowIndex) {
            var proc_inst_id_ = record.get("proc_inst_id_");
            return "<a href='#' onclick='showTraceView(" + proc_inst_id_ + ")'>" + value + "</a>";
        }
    }, {
        text: '当前操作人',
        dataIndex: 'curassignee'
    }, {
        text: '任务到达时间',
        dataIndex: 'create_time_'
    }, {
        text: '',
        dataIndex: 'proc_inst_id_',
        renderer: function (value, cellmeta, record, rowIndex) {
            var wf_title = record.get("wf_title");
            var business_key_ = record.get("business_key_");
            var task_key_ = record.get("act_id_");
            var rtnStr = "";
            rtnStr += "<a href='#' onclick='showProcessLog(\"" + value + "\",\"" + wf_title + "\",\"" + business_key_ + "\",\"" + task_key_ + "\")'>查看明细</a>";

            return rtnStr;
        }
    }];
    var endprocesslistOutlayFormStore = Ext.create('Ext.data.Store', {
        pageSize: '20',
        model: 'Ext4.Wf.Model.RunningProcess_Model',
        proxy: {
            extraParams: {},
            type: 'ajax',
            url: 'WorkFlowAction.ered?reqCode=findRunningProcessByAccount',
            reader: {
                type: 'json',
                totalProperty: 'TOTALCOUNT', // 记录总数
                root: 'ROOT' // Json中的列表数据根节点
            }
        }
    });
// 每页显示条数下拉选择框

    var pagesize_combo =
        Ext.create('Ext.form.field.ComboBox', {
            triggerAction: 'all',
            queryMode: 'local',
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

    endprocesslistOutlayFormStore.on("beforeload", function () {
        Ext.apply(endprocesslistOutlayFormStore.proxy.extraParams, {type: pagesize_combo.getValue()});
    });
    if (Ext.isEmpty(endprocesslistOutlayFormStore.pageSize)) {
        endprocesslistOutlayFormStore.pageSize = 20;
    }
    pagesize_combo.on("select", function (comboBox) {
        var tempnumber = parseInt(comboBox.getValue());
        endprocesslistOutlayFormStore.pageSize = tempnumber;
        bbar.pageSize = tempnumber;
        endprocesslistOutlayFormStore.loadPage(1);
    });
    var bbar = new Ext.PagingToolbar({
        pageSize: '20',
        store: endprocesslistOutlayFormStore,
        displayInfo: true,
        displayMsg: '显示{0}条到{1}条,共{2}条',
        plugins: [Ext.create('Ext.ux.ProgressBarPager')], // 分页进度条
        emptyMsg: "没有符合条件的记录",
        items: ['-', '&nbsp;&nbsp;', pagesize_combo]
    })

// 改变每页显示条数reload数据
// 分页工具栏
    var endprocesslistOutlayFormgrid = new Ext.grid.Panel({
        collapsed: false,
        title: '在办工作',
        border: true,
        hideCollapseTool: true,
        // 表格面板标题,默认为粗体，我不喜欢粗体，这里设置样式将其格式为正常字体
        autoScroll: true,
        //frame: true,
        store: endprocesslistOutlayFormStore, // 数据存储
        viewConfig: {stripeRows: true},
        forceFit: true,
        columns: endprocesslistOutlayFormCm, // 列模型
        tbar: ['->', new Ext.form.TextField({
            id: 'queryParam2',
            name: 'queryParam2',
            emptyText: '请输入主题',
            enableKeyEvents: true,
            listeners: {
                specialkey: function (field, e) {
                    if (e.getKey() == Ext.EventObject.ENTER) {
                        endprocesslistOutlayFormStore.proxy.extraParams.findKey = Ext.getCmp('queryParam2').getValue().toUpperCase();
                        endprocesslistOutlayFormStore.loadPage(1)
                    }
                }
            },
            width: 130
        }), {
            text: '查询',
            iconCls: 'previewIcon',
            handler: function () {
                endprocesslistOutlayFormStore.proxy.extraParams.findKey = Ext.getCmp('queryParam2').getValue().toUpperCase();
                endprocesslistOutlayFormStore.loadPage(1);

            }
        }, '-', {
            text: '刷新',
            iconCls: 'arrow_refreshIcon',
            handler: function () {
                endprocesslistOutlayFormStore.proxy.extraParams.findKey = Ext.getCmp('queryParam2').getValue().toUpperCase();
                endprocesslistOutlayFormStore.loadPage(1);

            }
        }
        ],
        bbar: bbar,
        //selModel: endprocesslistOutlayFormsm,
        viewConfig: {
            // 不产横向生滚动条, 各列自动扩展自动压缩, 适用于列数比较少的情况
            forceFit: true
        },
        loadMask: {
            msg: '正在加载表格数据,请稍等...'
        }
    });
    endprocesslistOutlayFormStore.loadPage(1);
    return endprocesslistOutlayFormgrid;
}
function showProcessLog(proc_inst_id_, wf_title, business_key_, task_key_) {
    var store = Ext.create('Ext.data.Store', {
        model: 'Ext4.Com.Model.ProcessLog_Model',
        autoLoad: true,
        proxy: {
            extraParams: {"proc_inst_id_": proc_inst_id_},
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
}
function showProjectInfo(ordernumber, projectid) {

    if (ordernumber.indexOf("增补") != -1) {
        ordernumber = ordernumber.replace('增补单', '');
        getVarToProjectInfo(ordernumber, projectid);
//        Ext.MessageBox.alert('友情提示',"您要查看的增补明细请于下单流程明细查看，谢谢合作");
        return;
    }
    var comprehensivePanel = new Ext.comprehensivePanel({StoreId: ordernumber, projectid: projectid});
    var omprehensivewindow = new Ext.window.Window({
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

function getVarToProjectInfo(ordernumber, projectid) {
    Ext.Ajax.request({
        url: 'addSupplyAction.ered?reqCode=getVarToProjectInfo',
        success: function (response) {
            var o = Ext.JSON.decode(response.responseText);
//            alert(response.responseText);
            showProjectInfo(o[0].ordernumber, o[0].projectid)
//            Ext.MessageBox.alert('提示', o.data.msg);
//            return true;//返回true，关闭窗口

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

function getVarToProjectInfoByZaiBan(ordernumber, projectid, proc_inst_id_, task_key_, window) {
    Ext.Ajax.request({
        url: 'addSupplyAction.ered?reqCode=getVarToProjectInfo',
        success: function (response) {
            var o = Ext.JSON.decode(response.responseText);
//            var comprehensivePanel  = new Ext.comprehensivePanel({StoreId: o[0].ordernumber,projectid:o[0].projectid});
            var t = new makeProcessLogForm(o[0].ordernumber, o[0].projectid);
            var panl = new flowPanel({
                proc_inst_id_: proc_inst_id_,
                model: "show",
                processKey: "myProcess",
                businessKey: o[0].projectid
            }, null, null, t);
            var MakedPanel = panl.getMakedPanel();
            MakedPanel.bodyStyle = "overflow-y:auto;overflow-x:hidden;";
            window.add(MakedPanel);
            window.show();
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