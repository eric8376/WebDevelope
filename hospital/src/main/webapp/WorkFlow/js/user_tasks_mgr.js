/**
 * 编程环境 IDEA.
 * 编写者: 王少伟
 * 主题:【任务管理】
 * 时间: 2013-06-20  上午11:32
 */


/**
 *  任务管理命名空间
 */
var UTM = {};

//------------------------------【数据源区】------------------------------
/**
 * 任务数据源字段
 */
UTM.store_fields = ['mgr_no', 'key', 'flow_no', 'point_no', 'job_name', 'create_date', 'assignee', 'status', 'is_finish', 'pause_minutes', 'run_minutes', 'last_pause_date', 'last_pause_man', 'last_resume_date', 'last_resume_man', 'job_level', 'run_seconds', 'run_time'];


/**
 *  任务操作日志列表
 */
UTM.store_job_oper_log = new Ext.data.JsonStore({
    autoLoad: false,
    url: 'Quick.ered?reqCode=listAll',
    root: 'ROOT',
    totalProperty: 'TOTALCOUNT',
    fields: ['log_no', 'mgr_no', 'oper_type', 'oper_date', 'oper_man', 'explain'],
    baseParams: {ref_no: "user_task_log001", mgr_no: 1}
});

/**
 *  当前正在执行的任务列表
 */
UTM.store_current_job = new Ext.data.JsonStore({
    autoLoad: true,
    url: 'Quick.ered?reqCode=listAll',
    root: 'ROOT',
    totalProperty: 'TOTALCOUNT',
    fields: UTM.store_fields,
    baseParams: {ref_no: "user_tasks_001", status: 1, assignee: "{useraccount}"},
    listeners: {
        load: function (temp_store) {
            var dateNow = new Date();
            temp_store.each(function (rec) {
                var dateCreate = Date.parseDate(rec.get("create_date"), "Y-m-d h:i:s");
                var time = parseInt((dateNow.getTime() - dateCreate.getTime()) / 1000);
                var hour = parseInt(time / 3600);
                var min = parseInt(time % 3600 / 60);
                var sec = time % 60;
                rec.set("run_seconds", time);
                rec.set("run_time", hour + "小时" + min + "分钟" + sec + "秒");
            });
        }
    }
});

/**
 *  被挂起的任务列表
 */
UTM.store_all_job = new Ext.data.JsonStore({
    autoLoad: true,
    url: 'Quick.ered?reqCode=listAll',
    root: 'ROOT',
    totalProperty: 'TOTALCOUNT',
    fields: UTM.store_fields,
    baseParams: {ref_no: "user_tasks_001", status: 0, assignee: "{useraccount}"},
    listeners: {
        load: function (tempStore) {
            UTM.store_current_job.load();
        }
    }
});

//用户信息对照表
var userInfo = {};
//用户信息数据源
new Ext.data.JsonStore({
    autoLoad: true,
    url: 'FlowUrgeAction.ered?reqCode=getAllUserForCombo',
    root: 'ROOT',
    totalProperty: 'TOTALCOUNT',
    fields: ['account', 'username'],
    listeners: {
        load: function (store) {
            store.each(function (rec) {
                userInfo["ID" + rec.get("account")] = rec.get("username");
            });
            userInfo.IDsystem = "信息管理系统";
        }
    }
});

//------------------------------【其它组件】------------------------------
/**
 * 任务视图模板
 */
UTM.view_tpl = new Ext.XTemplate(
    '<div class="main_board">',
    '<tpl for=".">',
    '<div class="job_border" <tpl if="job_level==2">style="border-color:red;"</tpl><tpl if="job_level==1">style="border-color:blue;"</tpl>>',
    '<div>任务级别：<tpl if="job_level==2"><span style="color:red;font-weight:bolder;">特急任务</span></tpl><tpl if="job_level==1"><span style="color:blue;font-weight:bolder;">加急任务</span></tpl><tpl if="job_level==0"><span style="color:green;">一般任务</span></tpl></div>',
    '<div>主题：{job_name}</div>',
    '<div>创建时间：{create_date}</div>',
    '<div>累计时间：{run_time}</div>',
    '<div>状态：工作中...</div>',
    '</div>',
    '</tpl>',
    '</div>'
);
/**
 * 跳转时间
 */
function runTime() {
    UTM.store_current_job.each(function (rec) {
        var time = parseInt(rec.get("run_seconds")) + 1;
        var hour = parseInt(time / 3600);
        var min = parseInt(time % 3600 / 60);
        var sec = time % 60;
        rec.set("run_seconds", time);
        rec.set("run_time", hour + "小时" + min + "分钟" + sec + "秒");
    });
}
//跳时间
setInterval(runTime, 1000);
//跳任务
setInterval(function () {
    UTM.store_all_job.load();
}, 30000);


//------------------------------【UI面板】------------------------------
/**
 * 某任务的操作日志
 */
UTM.userTaskLog = new Ext.menu.Menu({
    style: 'background:transparent;border:0;',
    record: {},
    items: [
        new Ext.UXGrid1({
            frame: true,
            width: document.body.clientWidth - 80,
            tbarFlag: false,
            bbarFlag: false,
            editFlag: false,
            delFlag: false,
            title: '任务操作日志',
            store: UTM.store_job_oper_log,
            columns: [
                {header: '日志编号', dataIndex: 'log_no'},
                {header: '操作日期', dataIndex: 'oper_date'},
                {
                    header: '操作人', dataIndex: 'oper_man', renderer: function (v) {
                    return eval("userInfo.ID" + v);
                }
                },
                {
                    header: '操作类型', dataIndex: 'oper_type', renderer: function (v) {
                    switch (parseInt(v)) {
                        case 1:
                            return "受委托";
                        case 2:
                            return "挂起";
                        case 3:
                            return "恢复";
                        case 4:
                            return "完成";
                    }
                }
                },
                {header: '备注', dataIndex: 'explain'}
            ]
        })
    ],
    setRecord: function (record) {
        this.record = record;
        UTM.store_job_oper_log.baseParams.mgr_no = record.get("mgr_no");
        UTM.store_job_oper_log.load();
        this.showAt([40, 20]);
    }
});

//长期挂起操作窗体
Ext.define('UTM.rightMenus_bigPause_operWin', {
    extend: 'Ext.UXWindow2',
    title: '长期挂起-设定恢复时间',
    width: 314,
    height: 138,
    layout: 'fit',
    record: '',

    initComponent: function () {
        var me = this;
        //_____________初始化开始_____________
        this.items = [
            {
                xtype: 'form',
                id: 'menu_item_oper_form',
                layout: 'form',
                padding: 8,
                items: [
                    {
                        xtype: 'datefield',
                        fieldLabel: '选择日期',
                        name: 'delay_date',
                        minValue: new Date(),
                        editable: false,
                        format: 'Y-m-d',
                        allowBlank: false,
                        anchor: '100%'
                    },
                    {
                        xtype: 'timefield',
                        fieldLabel: '选择时间',
                        name: 'delay_time',
                        format: 'H:i',
                        editable: false,
                        allowBlank: false,
                        anchor: '100%'
                    }
                ]
            }
        ];

        this.buttons = [
            {text: '提交', iconCls: 'acceptIcon', handler: this.event_delaySubmit, scope: this}
        ];

        //_____________初始化结束_____________
        UTM.rightMenus_bigPause_operWin.superclass.initComponent.call(this);
    },
    //延迟启动
    event_delaySubmit: function (btn, e) {
        var me = this;
        var record = me.record;
        var form = Ext.getCmp('menu_item_oper_form').getForm();
        if (!form.isValid())
            return false;

        var datetime = new Date(form.findField("delay_date").getValue()).format('Y-m-d') + " " + form.findField("delay_time").getValue() + ":00";
        Ext.Msg.confirm('提示', '请再次确认恢复任务的时间是否设置准确了！', function (choose) {
            if (choose == "no") {
                return false;
            }

            Ext.Ajax.request({
                url: 'Quick.ered?reqCode=exec',
                success: function (response, opts) {
                    var res = Ext.JSON.decode(response.responseText);
                    Ext.Msg.alert('提示', res.msg);
                    UTM.store_all_job.load();
                    me.hide();
                },
                failure: function (response, opts) {
                    Ext.MessageBox.alert('提示', '网络连接异常!');
                },
                params: {
                    exec_target: 'userTaskService',
                    exec_method: 'updateTaskToPause',
                    cur_useraccount: "{useraccount}",
                    mgr_no: record.get("mgr_no"),
                    resume_datetime: datetime
                }
            });
        });

    }
});

//大暂停列
UTM.grid_column_bigPause = new Ext.grid.Column({
    header: "长期挂起",
    dataIndex: "data4",
    hidden: true,
    width: 60,
    renderer: function () {
        return '<a href=# title="点击长期挂起该任务"><img src="' + webContext + '/resource/image/ext/delete.png"/></a>';
    }
});

//菜单大暂停按扭
UTM.rightMenus_bigPause = new Ext.menu.Item({
    text: '长期挂起', iconCls: 'deleteIcon',
    hidden: true,
    handler: function () {
        var record = UTM.rightMenus.record;
        UTM.rightMenus.operWin.record = record;
        UTM.rightMenus.operWin.show();
    }
});

/**
 * 当前任务列表右键菜单
 */
UTM.rightMenus = new Ext.menu.Menu({
    operWin: new UTM.rightMenus_bigPause_operWin(),
    record: {},
    items: [
        {
            id: 'menu_power_detail',
            iconCls: 'acceptIcon',
            text: '查看详情',
            handler: function () {
                var record = UTM.rightMenus.record;
                UTM.userTaskLog.setRecord(record);
            }
        },
        {
            id: 'menu_power_pause',
            iconCls: 'deleteIcon',
            text: '挂起任务',
            handler: function () {
                var record = UTM.rightMenus.record;
                Ext.Ajax.request({
                    url: 'Quick.ered?reqCode=exec',
                    success: function (response, opts) {
                        var res = Ext.JSON.decode(response.responseText);
                        Ext.Msg.alert('提示', res.msg);
                        UTM.store_all_job.load();
                    },
                    failure: function (response, opts) {
                        Ext.MessageBox.alert('提示', '网络连接异常!');
                    },
                    params: {
                        exec_target: 'userTaskService',
                        exec_method: 'updateTaskToPause',
                        cur_useraccount: "{useraccount}",
                        mgr_no: record.get("mgr_no")
                    }
                });
            }
        },
        UTM.rightMenus_bigPause
    ],
    setRecord: function (record) {
        this.record = record;
        Ext.getCmp('menu_power_pause').setDisabled(record.get("job_level") != 0);
    }
});

/**
 * 任务管理查看主窗口
 */
Ext.define('UTM.mainBoard', {
    extend: 'Ext.Container',
    title: "任务管理面板",
    width: 1294,
    height: 824,
    layout: "border",

    initComponent: function () {
        this.items = [
            {
                xtype: "panel",
                iconCls: "dynamicRefreshIcon",
                title: "当前正在执行的任务列表",
                height: 170,
                region: "north",
                autoScroll: true,
                items: [
                    new Ext.DataView({
                        store: UTM.store_current_job,
                        tpl: UTM.view_tpl,
                        autoHeight: true,
                        multiSelect: false,
                        overClass: 'job_border_over',
                        itemSelector: 'div.job_border',
                        emptyText: '您现在处于空闲状态...请耐心等待新的任务调度...',
                        listeners: {
                            click: function (pView, rowIndex, e) {
                                var record = pView.getStore().getAt(rowIndex);
                                UTM.userTaskLog.setRecord(record);
                            },
                            contextmenu: function (p, r, h, e) {
                                e.stopEvent();
                                var record = p.getStore().getAt(r);
                                UTM.rightMenus.setRecord(record);
                                UTM.rightMenus.showAt(e.getPoint());
                            },
                            scope: this
                        }
                    })
                ]
            },
            new Ext.UXGrid1({
                title: '被挂起的任务列表',
                iconCls: 'disconnectIcon',
                region: "center",
                addFlag: false,
                editFlag: false,
                delFlag: false,
                searchFlag: false,
                bbarFlag: false,
                store: UTM.store_all_job,
                columns: [
                    {
                        header: "队列编号",
                        dataIndex: "mgr_no",
                        width: 100
                    },
                    {
                        header: "任务级别",
                        dataIndex: "job_level",
                        width: 100,
                        renderer: function (v) {
                            switch (v) {
                                case 2:
                                    return "<span style='color:red;font-weight:bolder;'>特急任务</span>";
                                case 1:
                                    return "<span style='color:blue;font-weight:bolder;'>加急任务</span>";
                                case 0:
                                    return "<span style='color:green;'>一般任务</span>";
                            }
                        }
                    },
                    {
                        header: "主题",
                        dataIndex: "job_name",
                        width: 100
                    },
                    {
                        header: "状态",
                        dataIndex: "status",
                        width: 100,
                        renderer: function (v) {
                            return v == 0 ? "挂起中..." : "执行中...";
                        }
                    },
                    {
                        header: "创建时间",
                        dataIndex: "create_date",
                        width: 144
                    },
                    {
                        header: "最后挂起时间",
                        dataIndex: "last_pause_date",
                        width: 144
                    },
                    {
                        header: "加入执行队列",
                        dataIndex: "data4",
                        width: 89,
                        renderer: function () {
                            return '<a href=# title="点击开始执行此项任务"><img src="' + webContext + '/resource/image/ext/check.png"/></a>';
                        }
                    },
                    UTM.grid_column_bigPause
                ],
                //单点事件
                event_c: function (store, record, pGrid, rowIndex, colIndex, e) {
                    var totalColumns = pGrid.getColumnModel().getColumnCount();

                    //恢复任务
                    if (colIndex == totalColumns - 2) {
                        Ext.Ajax.request({
                            url: 'Quick.ered?reqCode=exec',
                            success: function (response, opts) {
                                var res = Ext.JSON.decode(response.responseText);
                                Ext.Msg.alert('提示', res.msg);
                                UTM.store_all_job.load();
                            },
                            failure: function (response, opts) {
                                Ext.MessageBox.alert('提示', '网络连接异常!');
                            },
                            params: {
                                exec_target: 'userTaskService',
                                exec_method: 'updateTaskToResume',
                                cur_useraccount: "{useraccount}",
                                mgr_no: record.get("mgr_no")
                            }
                        });
                        //长期挂起任务
                    } else if (colIndex == totalColumns - 1) {
                        if (!UTM.rightMenus_bigPause.hidden) {
                            UTM.rightMenus.operWin.record = record;
                            UTM.rightMenus.operWin.show();
                        } else {
                            Ext.Msg.alert('提示', '您没有权限进行此操作！')
                        }
                    }
                }
            })
        ];

        UTM.mainBoard.superclass.initComponent.call(this);
    }
});



