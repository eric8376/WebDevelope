/**
 * 编程环境 IDEA.
 * 编写者: 王少伟
 * 主题:【工程单长期恢复与暂停】
 * 时间: 2013-08-16 上午10:56
 */

//定义命名空间
var LongPauseGCD = {};


Ext.define('AllUserWorkStatus_Model', {
    extend: 'Ext.data.Model',
    fields: [{name: 'mgr_no'}, {name: 'task_id'}, {name: 'key'}, {name: 'flow_no'}, {name: 'point_no'}, {name: 'job_name'},
        {name: 'assignee'}, {name: 'status'}, {name: 'is_finish'}, {name: 'job_level'}, {name: 'last_resume_date'}, {name: 'username'}, {name: 'ordernumber'}]
});
//--------------------------------数据源
//用户工作状态表
LongPauseGCD.store_work_status = Ext.create('Ext.data.Store', {
    model: 'AllUserWorkStatus_Model',
    autoLoad: true,
    proxy: {
        extraParams: {
            searchKey: '%', start: 0, limit: 20
        },
        type: 'ajax',
        url: 'UserWorkMgrAction.ered?reqCode=getAllUserWorkStatus',
        reader: {
            type: 'json',
            totalProperty: 'TOTALCOUNT', // 记录总数
            root: 'ROOT' // Json中的列表数据根节点
        }
    }
});

//---------------------------------渲染---------------------------------
//紧急度
LongPauseGCD.Render_level = function (v) {
    return v == 0 ? "<font color=green>一般</font>" : (v == 1 ? "<font color=blue>加急</font>" : "<font color=red>特急</font>");
}
//状态
LongPauseGCD.Render_status = function (v, m, rec) {
    var is_finish = rec.get('is_finish');
    var status = rec.get('status');
    var resStr = "状态：" + (is_finish == 0 ? "<font color=green>正常</font>" : "<font color=blue>长期挂起中</font>");
    resStr += " | 当前执行状态：" + (status == 1 ? "<font color=green>执行中...</font>" : "<font color=blue>等待中...</font>");
    if (is_finish == 2 && v) {
        resStr += " | 恢复时间：<font color=blue>" + v + "</font>";
    }
    return resStr;
}


//---------------------------------类定义
//长期挂起操作窗体
Ext.define('LongPauseGCD.bigPause_operWin', {
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
        this.callParent(arguments);
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
                    LongPauseGCD.store_work_status.load();
                    me.hide();
                },
                failure: function (response, opts) {
                    Ext.MessageBox.alert('提示', '网络连接异常!');
                },
                params: {
                    exec_target: 'userTaskService',
                    exec_method: 'updateTaskToLongPause',
                    cur_useraccount: "{useraccount}",
                    mgr_no: record.get("mgr_no"),
                    resume_datetime: datetime
                }
            });
        });

    }
});

//状态查询主窗体
Ext.define('LongPauseGCD.statusQueryWin', {
    extend: 'Ext.UXWindow1',
    xtype: "window",
    title: "工程单工作状态管理",
    width: 1123,
    height: 603,
    layout: "fit",
    grid1: '',
    operWin: new LongPauseGCD.bigPause_operWin(),

    initComponent: function () {
        var me = this;
        //历史箱
        this.grid1 = new Ext.UXGrid1({
            store: LongPauseGCD.store_work_status,
            addFlag: false,
            delFlag: false,
            editFlag: false,
            columns: [
                {header: '工程单号', dataIndex: 'ordernumber', width: 138},
                {header: '紧急度', dataIndex: 'job_level', width: 54, renderer: LongPauseGCD.Render_level},
                {header: '当前流程主题', width: 168, dataIndex: 'job_name'},
                {header: '当前执行人', width: 80, dataIndex: 'username'},
                {header: '状态', width: 500, dataIndex: 'last_resume_date', renderer: LongPauseGCD.Render_status},
                {
                    header: "恢复",
                    dataIndex: "data4",
                    width: 45,
                    renderer: function () {
                        return '<a href=# title="点击开始执行此项任务"><img src="' + webContext + '/resource/image/ext/check.png"/></a>';
                    }
                },
                {
                    header: "长期挂起",
                    dataIndex: "data4",
                    width: 60,
                    renderer: function () {
                        return '<a href=# title="点击长期挂起该任务"><img src="' + webContext + '/resource/image/ext/delete.png"/></a>';
                    }
                }
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
                            LongPauseGCD.store_work_status.load();
                        },
                        failure: function (response, opts) {
                            Ext.MessageBox.alert('提示', '网络连接异常!');
                        },
                        params: {
                            exec_target: 'userTaskService',
                            exec_method: 'updateTaskToLongResume',
                            cur_useraccount: "{useraccount}",
                            mgr_no: record.get("mgr_no")
                        }
                    });
                    //长期挂起任务
                } else if (colIndex == totalColumns - 1) {
                    me.operWin.record = record;
                    me.operWin.show();
                }
            }
        });

        this.items = [this.grid1];
        this.callParent(arguments);
    }
});

//--------------------------------显示
Ext.onReady(function () {
    LongPauseGCD.mainWin = new LongPauseGCD.statusQueryWin();
    LongPauseGCD.mainWin.show();
});

