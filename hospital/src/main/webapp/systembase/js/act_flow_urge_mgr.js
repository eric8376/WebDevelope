/**
 * 编程环境 IDEA.
 * 编写者: 王少伟
 * 主题:【流程催促管理】
 * 时间: 2013-06-10 下午4:36
 */
Ext.require('Ext4.Wf.Model.Flows');
Ext.require('Ext4.Wf.Model.Urges');
Ext.require('Ext4.Com.Model.CustomService_Model');
Ext.onReady(function () {
    /**
     * 实体类定义
     * 设置一览      Ext.SettingWin
     * 添加流程设置   Ext.addSettingWin
     * 添加催办设置   Ext.addUrgeWin
     */

    //主窗体
    var mainWin;


    //--------------------------数据源
    //流程设置数据grid
    var store_flow = Ext.create('Ext.data.Store', {
        model: 'Ext4.Wf.Model.Flows',
        autoLoad: true,
        proxy: {
            extraParams: {
                searchKey: '', start: 0, limit: 20
            },
            type: 'ajax',
            url: 'FlowUrgeAction.ered?reqCode=getFlows',
            reader: {
                type: 'json',
                totalProperty: 'TOTALCOUNT', // 记录总数
                root: 'ROOT' // Json中的列表数据根节点
            }
        },
        listeners: {
            load: function () {
                Ext.getCmp('main_urge_grid').collapse();
            }
        }
    });
    //催促设置详情数据grid
    var store_urge = Ext.create('Ext.data.Store', {
        model: 'Ext4.Wf.Model.Urges',
        proxy: {
            extraParams: {
                urge_no: ''
            },
            type: 'ajax',
            url: 'FlowUrgeAction.ered?reqCode=getUrges',
            reader: {
                type: 'json',
                totalProperty: 'TOTALCOUNT', // 记录总数
                root: 'ROOT' // Json中的列表数据根节点
            }
        },
        listeners: {
            load: function () {
                Ext.getCmp('main_urge_grid').expand();
            }
        }
    });
    //临时催促设置详情数据
    var store_urge_tmp = Ext.create('Ext.data.Store', {
        model: 'Ext4.Wf.Model.Urges',


        proxy: {
            extraParams: {
                urge_no: ''
            },
            type: 'ajax',
            url: 'FlowUrgeAction.ered?reqCode=getUrges',
            reader: {
                type: 'json',
                totalProperty: 'TOTALCOUNT', // 记录总数
                root: 'ROOT' // Json中的列表数据根节点
            }
        }
    });
    //指定人下拉框数据源
    var store_users_combo =
        //用户信息数据源
        Ext.create('Ext.data.Store', {
            model: 'Ext4.Com.Model.CustomService_Model',
            proxy: {
                extraParams: {},
                type: 'ajax',
                url: 'FlowUrgeAction.ered?reqCode=getAllUserForCombo',
                reader: {
                    type: 'json',
                    totalProperty: 'TOTALCOUNT', // 记录总数
                    root: 'ROOT' // Json中的列表数据根节点
                }
            },
            listeners: {
                load: function (store) {
                    //临时 增加客服经理选择

                    var rec = {account: 'special_khjl', username: '客户经理'};
                    store_users_combo.add(rec);
                }
            }
        });
    //天计时
    var store_day = [0, 1, 2, 3, 4, 5];
    //小时计时
    var store_hours = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
    //分钟计时
    var store_minutes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59];
    //触发动作
    var store_activities = [
        [0, '无'],
        [1, '短信'],
        [2, '邮件'],
        [3, 'RTX']
    ];
    //催办类型
    var store_urge_type = [
        [0, '普通-按下面时间间隔进行催促'],
        [1, '特殊1-【<=700㎡：面积/100*60】【>700㎡：(700/100*60)+((面积-700)/100*120)】'],
        [2, '特殊2-【面积/200*480】'],
        [3, '特殊3-【50平：10分钟】【51~100平：20分钟】【101~200平：30分钟】【其它不催办】'],
        [4, '特殊4-【50平：80分钟】【51~100平：200分钟】【101~200平：420分钟】【其它不催办】'],
        [5, '特殊5-【一个定制件10分钟】'],
        [6, '特殊6-【一个定制件60分钟】'],
        [7, '特殊7-【1%~50%修改量：原时间的30%】【51%~70%修改量：原时间的45%】【71%~100%修改量：原时间的60%】'],
        [8, '特殊8-【绘制平面图时间*工作量】'],
        [9, '特殊9-【面积/50*10】'],
        [10, '特殊10-【面积/50*15】']
    ];


    //------------------------------渲染
    //渲染时长
    function Render_use(v) {
        var strs = v.split('-');
        return "" + strs[1] + "时" + strs[2] + "分";
    }

    //渲染动作
    function Render_act(v) {
        return store_activities[v][1];
    }

    //指定接收人渲染
    function Render_user(v) {
        return v == null ? '默认执行人' : v;
    }

    //渲染类型
    function Render_urgeType(v) {
        return store_urge_type[v][1];
    }

    //渲染首次催办计算方式
    function Render_firstUrgeType(v) {
        return v == 0 ? "定时催办" : "周期催办";
    }

    //---------------------------实体类定义
    //设置一览
    Ext.define('Ext.SettingWin', {
        extend: 'Ext.UXWindow1',
        xtype: "window",
        title: "流程设置",
        width: 1188,
        height: 680,
        layout: "border",
        closable: false,
        constrain: true,
        maximizable: true,
        collapsible: true,
        operWin: '操作窗体',
        initComponent: function () {
            this.tbar = [
                {
                    xtype: "textfield",
                    width: 188,
                    emptyText: "输入关键字搜索...",
                    id: 'searchKey'
                },
                {
                    text: "搜索",
                    iconCls: 'page_findIcon',
                    handler: this.event_search,
                    scope: this
                },
                '-',
                {
                    text: "添加",
                    iconCls: 'addIcon',
                    handler: this.event_add,
                    scope: this
                }
            ]
            this.items = [
                {
                    xtype: "grid",
                    title: "",
                    region: "center",
                    border: false,
                    split: true,
                    store: store_flow,
                    bbar: new Ext.UXPagingToolbar1({store: store_flow}),
                    columns: [
                        {
                            header: "流程编号",
                            sortable: true,
                            resizable: true,
                            dataIndex: "flow_no",
                            width: 100
                        },
                        {
                            header: "环节编号",
                            sortable: true,
                            resizable: true,
                            dataIndex: "point_no",
                            width: 100
                        },
                        {header: '催办类型', width: 333, dataIndex: 'urge_type', renderer: Render_urgeType},
                        {
                            header: "流程时长表达式",
                            sortable: true,
                            resizable: true,
                            dataIndex: "use_time",
                            width: 100//,
                            //renderer: Render_use
                        },
                        {
                            header: "是否催办",
                            sortable: true,
                            resizable: true,
                            dataIndex: "is_urge",
                            width: 100
                        },
                        {
                            header: "催办次数",
                            sortable: true,
                            resizable: true,
                            dataIndex: "urge_count",
                            width: 100
                        },
                        {
                            header: "备注",
                            sortable: true,
                            resizable: true,
                            dataIndex: "explain",
                            width: 100
                        },
                        {
                            header: "编辑",
                            width: 32,
                            dataIndex: 'urge_no',
                            renderer: function () {
                                return '<a href=# title="编辑该条排班信息"><img src="' + webContext + '/resource/image/ext/edit1.png"/></a>';
                            }
                        },
                        {
                            header: "删除",
                            width: 32,
                            dataIndex: 'urge_no',
                            renderer: function (v) {
                                return '<a href=# title="删除该条排班信息"><img src="' + webContext + '/resource/image/ext/delete.png"/></a>';
                            }
                        }
                    ],
                    listeners: {
                        itemdblclick: this.event_gridDblClick,
                        cellclick: this.event_cellClick,
                        scope: this
                    }
                },
                {
                    xtype: "grid",
                    id: 'main_urge_grid',
                    title: "催办设置详情",
                    region: "east",
                    border: false,
                    width: 600,
                    split: true,
                    collapsible: true,
                    titleCollapse: true,
                    collapsed: true,
                    store: store_urge,
                    columns: [

                        {
                            xtype: 'rownumberer',
                            text: '序号',
                            width: 32
                        },
                        {header: '催办方式', dataIndex: 'urge_type', renderer: Render_firstUrgeType},
                        {
                            header: "间隔时长",
                            sortable: true,
                            resizable: true,
                            dataIndex: "interval_time",
                            width: 100//,
                            // renderer: Render_use
                        },
                        {
                            header: "催办动作",
                            sortable: true,
                            resizable: true,
                            dataIndex: "activity",
                            width: 100,
                            renderer: Render_act
                        },
                        {
                            header: "指定接收人ID",
                            sortable: true,
                            resizable: true,
                            dataIndex: "receive_man",
                            width: 100,
                            renderer: Render_user
                        },
                        {
                            header: "引用模板编号",
                            sortable: true,
                            resizable: true,
                            dataIndex: "tpl_no",
                            width: 100
                        }
                    ]
                }
            ];
            this.callParent(arguments);

            //操作窗体
            this.operWin = new Ext.addSettingWin();
        },
        //搜索
        event_search: function (btn, e) {
            var searchKey = Ext.getCmp('searchKey').getValue();
            store_flow.getProxy().extraParams.searchKey = searchKey;
            store_flow.load();
        },
        //添加
        event_add: function (btn, e) {
            //设置窗体参数
            this.operWin.setTitle("当前状态：添加流程设置");
            this.operWin.isInsert = true;
            this.operWin.show();

            //初始化form表单
            var form = Ext.getCmp('add_flow_form').getForm();
            form.findField('flow_no').setReadOnly(false);
            form.findField('point_no').setReadOnly(false);
            store_urge_tmp.removeAll();
            Ext.getCmp('urge_grid').collapse();
            form.reset();
        },
        //表格双击事件
        event_gridDblClick: function (pGrid, record, item, index, e, eOpts) {
            //设置窗体参数
            this.operWin.setTitle("当前状态：修改流程设置");
            this.operWin.isInsert = false;
            this.operWin.show();

            //初始化
            var form = Ext.getCmp('add_flow_form').getForm();
            form.findField('flow_no').setReadOnly(true);
            form.findField('point_no').setReadOnly(true);
            form.loadRecord(record);
//            var tmpStrs = record.get('use_time').split('-');
//            form.findField('t1').setValue(tmpStrs[0]);
//            form.findField('t2').setValue(tmpStrs[1]);
//            form.findField('t3').setValue(tmpStrs[2]);
            store_urge_tmp.getProxy().extraParams.urge_no = record.get('urge_no');
            store_urge_tmp.load();


            //显示参数表格
            setTimeout(function () {
                Ext.getCmp('urge_grid').expand();
            }, 800);
        },
        //表格单击事件
        event_cellClick: function (pGrid, td, colIndex, record, tr, rowIndex, e, eOpts) {
            //催办次数加载
            store_urge.getProxy().extraParams.urge_no = record.get('urge_no');
            store_urge.load();

            //编辑
            if (colIndex == 7) {
                this.event_gridDblClick(pGrid, record, null, rowIndex, e, eOpts);
            }
            //删除
            else if (colIndex == 8) {
                //删除提示
                Ext.Msg.confirm('提示', '删除操作一旦执行将无法恢复,确定继续？', function (choose) {
                    if (choose == "no") {
                        return;
                    }

                    //执行删除
                    Ext.Ajax.request({
                        url: 'FlowUrgeAction.ered?reqCode=delFlow',
                        success: function (resp, opts) {
                            var respText = Ext.JSON.decode(resp.responseText);
                            Ext.Msg.alert('提示', respText.msg);
                            if (respText.success) {
                                //同步参数与数据
                                pGrid.getStore().remove(record);
                            }
                        },
                        failure: function () {
                            Ext.Msg.alert('提示', '当前网络忙!<br/>请刷新后重试~');
                        },
                        params: {urge_no: record.get('urge_no')}
                    });
                });
            }
        }
    });

    //添加流程设置
    Ext.define('Ext.addSettingWin', {
        extend: 'Ext.UXWindow2',
        title: "添加流程设置",
        width: 1000,
        height: 313,
        layout: "border",
        constrain: true,
        collapsible: true,
        closeAction: 'hide',
        modal: true,
        operWin: '操作窗体',
        isInsert: true,//是否是添加窗口

        initComponent: function () {
            this.items = [
                {
                    xtype: "form",
                    id: 'add_flow_form',
                    title: "",
                    labelWidth: 100,
                    labelAlign: "left",
                    layout: "form",
                    region: "center",
                    split: true,
                    padding: "8",
                    items: [
                        {
                            xtype: "textfield",
                            fieldLabel: "流程编号",
                            anchor: "100%",
                            name: 'flow_no',
                            allowBlank: false,
                            maxLength: 50
                        },
                        {
                            xtype: "textfield",
                            fieldLabel: "环节编号",
                            anchor: "100%",
                            name: 'point_no',
                            allowBlank: false,
                            maxLength: 50
                        },
                        {
                            xtype: "combo",
                            mode: "local",
                            triggerAction: "all",
                            editable: false,
                            fieldLabel: "催办类型",
                            anchor: "100%",
                            name: 'urge_type',
                            store: store_urge_type,
                            value: 0
                        },
                        {
                            xtype: "textfield",
                            fieldLabel: "流程时长(el)",
                            anchor: "100%",
                            name: 'use_time',
                            allowBlank: false,
                            maxLength: 500
                        },
//                        {
//                            xtype: "container",
//                            autoEl: "div",
//                            height: 26,
//                            layout: "table",
//                            items: [
//                                {
//                                    xtype: "label",
//                                    text: "流程时长:",
//                                    style: "padding-right:55px;font-size:12px;"
//                                },
//                                {
//                                    xtype: "combo",
//                                    hidden: true,
//                                    triggerAction: "all",
//                                    fieldLabel: "标签",
//                                    width: 51,
//                                    name: 't1',
//                                    store: store_day,
//                                    value: 0,
//                                    editable: false
//                                },
//                                {
//                                    xtype: "label",
//                                    hidden: true,
//                                    text: "天"
//                                },
//                                {
//                                    xtype: "combo",
//                                    triggerAction: "all",
//                                    fieldLabel: "标签",
//                                    width: 50,
//                                    name: 't2',
//                                    store: store_hours,
//                                    value: 0,
//                                    editable: false
//                                },
//                                {
//                                    xtype: "label",
//                                    text: "时"
//                                },
//                                {
//                                    xtype: "combo",
//                                    triggerAction: "all",
//                                    fieldLabel: "标签",
//                                    width: 49,
//                                    name: 't3',
//                                    store: store_minutes,
//                                    value: 0,
//                                    editable: false
//                                },
//                                {
//                                    xtype: "label",
//                                    text: "分"
//                                }
//                            ]
//                        },
                        {
                            xtype: "numberfield",
                            fieldLabel: "催办次数",
                            anchor: "100%",
                            name: 'urge_count',
                            value: 0,
                            readOnly: true
                        },
                        {
                            xtype: "checkbox",
                            fieldLabel: "是否催办",
                            boxLabel: "",
                            anchor: "100%",
                            name: 'is_urge',
                            checked: true
                        },
                        {
                            xtype: "textfield",
                            fieldLabel: "备注",
                            anchor: "100%",
                            name: 'explain',
                            maxLength: 20
                        },
                        {xtype: 'textfield', name: 'urge_no', hidden: true}
                    ]
                },
                {
                    xtype: "grid",
                    id: 'urge_grid',
                    title: "催办设置详情",
                    region: "east",
                    width: 625,
                    split: true,
                    titleCollapse: true,
                    collapsible: true,
                    collapsed: true,
                    store: store_urge_tmp,
                    columns: [

                        {
                            xtype: 'rownumberer',
                            text: '序号',
                            width: 32
                        },
                        {header: '催办方式', dataIndex: 'urge_type', renderer: Render_firstUrgeType},
                        {
                            header: "间隔时长",
                            sortable: true,
                            resizable: true,
                            dataIndex: "interval_time",
                            width: 100//,
                            // renderer: Render_use
                        },
                        {
                            header: "催办动作",
                            sortable: true,
                            resizable: true,
                            dataIndex: "activity",
                            width: 100,
                            renderer: Render_act
                        },
                        {
                            header: "指定接收人ID",
                            sortable: true,
                            resizable: true,
                            dataIndex: "receive_man",
                            width: 100,
                            renderer: Render_user
                        },
                        {
                            header: "引用模板编号",
                            sortable: true,
                            resizable: true,
                            dataIndex: "tpl_no",
                            width: 100
                        },
                        {
                            header: "编辑",
                            width: 32,
                            dataIndex: 'mx_no',
                            renderer: function () {
                                return '<a href=# title="编辑该条排班信息"><img src="' + webContext + '/resource/image/ext/edit1.png"/></a>';
                            }
                        },
                        {
                            header: "删除",
                            width: 32,
                            dataIndex: 'mx_no',
                            renderer: function (v) {
                                return '<a href=# title="删除该条排班信息"><img src="' + webContext + '/resource/image/ext/delete.png"/></a>';
                            }
                        }
                    ],
                    tbar: [
                        {
                            text: "添加",
                            iconCls: 'addIcon',
                            handler: this.event_add,
                            scope: this
                        }
                    ],
                    listeners: {
                        itemdblclick: this.event_gridDblClick,
                        cellclick: this.event_cellClick,
                        scope: this
                    }
                }
            ];
            this.buttons = [
                {text: '重置', iconCls: 'noticeIcon', handler: this.event_resetForm, scope: this},
                {text: '保存', iconCls: 'acceptIcon', handler: this.event_submitForm, scope: this}
            ];
            this.callParent(arguments);
            this.operWin = new Ext.addUrgeWin();
        },
        //添加动作
        event_add: function (btn, event) {
            if (this.isInsert) {
                Ext.Msg.alert('提示', '未保存的流程是不允许设置催办信息的！请先保存表单！');
                return;
            }


            this.operWin.urge_no = Ext.getCmp('add_flow_form').getForm().findField('urge_no').getValue();
            this.operWin.isInsert = true;
            this.operWin.pWin = this;
            this.operWin.setTitle('添加催办设置');
            this.operWin.show();

            //初始化
            Ext.getCmp('add_urge_form').getForm().reset();
        },
        //提交表单
        event_submitForm: function (btn, e) {
            var me = this;
            var form = Ext.getCmp('add_flow_form').getForm();
            if (!form.isValid())
                return;

            //参数同步
            //var use_time = (form.findField('t1').getValue()==""?0:form.findField('t1').getValue()) + "-" + form.findField('t2').getValue() + "-" + form.findField('t3').getValue();
            var is_urge = form.findField('is_urge').checked ? 1 : 0;
            var urge_type = form.findField('urge_type').getValue();

            //表单提交
            var url = this.isInsert ? "FlowUrgeAction.ered?reqCode=addFlow" : "FlowUrgeAction.ered?reqCode=updFlow";
            form.submit({
                url: url,
                waitTitle: '提示',
                method: 'POST',
                waitMsg: '正在处理数据,请稍候...',
                success: function (form, action) {
                    if (me.isInsert) {
                        //设置表单与状态
                        form.findField('urge_no').setValue(action.result.msg);
                        form.findField('flow_no').setReadOnly(true);
                        form.findField('point_no').setReadOnly(true);
                        me.setTitle('当前状态：修改表单');
                        me.isInsert = false;

                        //显示参数窗口
                        Ext.getCmp('urge_grid').expand();
                        Ext.MessageBox.alert('提示', '已添加！');
                    } else {
                        //加载数据
                        store_flow.load();
                        Ext.MessageBox.alert('提示', action.result.msg);
                    }
                },
                failure: function (form, action) {
                    Ext.MessageBox.alert('提示', action.result.msg);
                },
                params: {/*use_time: use_time, */is_urge_: is_urge, urge_type: urge_type}
            });
        },
        //重置表单To添加状态
        event_resetForm: function (btn, e) {
            //初始化form表单
            var form = Ext.getCmp('add_flow_form').getForm();
            form.reset();
            form.findField('flow_no').setReadOnly(false);
            form.findField('flow_no').setReadOnly(false);
            store_urge_tmp.removeAll();

            //窗体设置
            this.isInsert = true;
            this.setTitle("当前状态：添加流程设置");

            //隐藏参数窗口
            Ext.getCmp('urge_grid').collapse();
        },
        //取消表单
        event_cancelForm: function (btn, e) {
            this.hide();
        },
        //表格双击事件
        event_gridDblClick: function (pGrid, record, item, index, e, eOpts) {

            if (this.isInsert) {
                Ext.Msg.alert('提示', '未保存的流程是不允许设置催办信息的！请先保存表单！');
                return;
            }

            this.operWin.show();
            var form = Ext.getCmp('add_urge_form').getForm();
            form.loadRecord(record);
//            var tmpStrs = record.get('interval_time').split('-');
//            form.findField('t1').setValue(tmpStrs[0]);
//            form.findField('t2').setValue(tmpStrs[1]);
//            form.findField('t3').setValue(tmpStrs[2]);

            this.operWin.urge_no = record.get('urge_no');
            this.operWin.isInsert = false;
            this.operWin.setTitle('修改催办设置');
            //初始化loadField2
            Ext.getCmp('mesTplField').loadField2();
        },
        //表格单击事件
        event_cellClick: function (pGrid, td, colIndex, record, tr, rowIndex, e, eOpts) {
            var me = this;
            var count = Ext.getCmp('urge_grid').columns.length;
            //编辑
            if (colIndex == count - 2) {
                this.event_gridDblClick(pGrid, record, null, rowIndex, e, eOpts);
            }
            //删除
            else if (colIndex == count - 1) {
                var form = Ext.getCmp('add_flow_form').getForm();

                //删除提示
                Ext.Msg.confirm('提示', '删除操作一旦执行将无法恢复,确定继续？', function (choose) {
                    if (choose == "no") {
                        return;
                    }

                    //执行删除
                    Ext.Ajax.request({
                        url: 'FlowUrgeAction.ered?reqCode=delUrge',
                        success: function (resp, opts) {
                            var respText = Ext.JSON.decode(resp.responseText);
                            if (respText.success) {
                                //同步参数与数据
                                store_urge_tmp.remove(record);
                                form.findField('urge_count').setValue(store_urge_tmp.getCount());

                                //保存表单
                                me.event_submitForm();
                            }

                            Ext.Msg.alert('提示', respText.msg);
                        },
                        failure: function () {
                            Ext.Msg.alert('提示', '当前网络忙!<br/>请刷新后重试~');
                        },
                        params: {mx_no: record.get('mx_no')}
                    });
                });
            }

        }

    });

    //添加催办设置
    Ext.define('Ext.addUrgeWin', {
        extend: 'Ext.UXWindow2',
        title: "添加催办设置",
        width: 818,
        height: 270,
        layout: "fit",
        constrain: true,
        collapsible: true,
        closeAction: 'hide',
        isInsert: true,//是否是添加状态
        pWin: '父窗体',
        modal: true,
        initComponent: function () {
            this.items = [
                {
                    xtype: "form",
                    id: 'add_urge_form',
                    title: "",
                    labelWidth: 100,
                    labelAlign: "left",
                    layout: "form",
                    padding: 5,
                    items: [
                        new Ext.form.field.ComboBox({
                            name: 'urge_type',
                            hiddenName: 'urge_type',
                            store: [
                                [0, '定时催办'],
                                [1, '周期催办']
                            ],
                            queryMode: 'local',
                            triggerAction: 'all',
                            fieldLabel: '催办方式',
                            forceSelection: true,
                            editable: false,
                            anchor: "100%"
                        }),
                        {
                            xtype: "textfield",
                            fieldLabel: "间隔分钟(el/cron)",
                            anchor: "100%",
                            name: 'interval_time',
                            maxLength: 500,
                            value: 0,
                            allowBlank: false
                        }, {
                            xtype: "numberfield",
                            fieldLabel: "重复催办次数",
                            anchor: "100%",
                            name: 'repeat_urge_count',
                            maxLength: 20,
                            value: 0,
                            allowBlank: false
                        },
                        {
                            xtype: "textfield",
                            fieldLabel: "重复催办间隔(el)",
                            anchor: "100%",
                            name: 'repeat_urge_interval',
                            maxLength: 500,
                            value: 0,
                            allowBlank: false
                        },
//                        {
//                            xtype: "combo",
//                            triggerAction: "all",
//                            fieldLabel: "间隔小时数",
//                            anchor: "100%",
//                            name: 't2',
//                            editable: false,
//                            store: store_hours,
//                            allowBlank:false,
//                            value: 0
//                        },
//                        {
//                            xtype: "combo",
//                            triggerAction: "all",
//                            fieldLabel: "间隔分钟数",
//                            anchor: "100%",
//                            name: 't3',
//                            editable: false,
//                            store: store_minutes,
//                            allowBlank:false,
//                            value: 0
//                        },
                        new Ext.form.field.ComboBox({
                            name: 'activity',
                            hiddenName: 'activity',
                            store: store_activities,
                            queryMode: 'local',
                            triggerAction: 'all',
                            fieldLabel: '催办动作',
                            forceSelection: true,
                            editable: false,
                            anchor: "100%"
                        }),

                        new Ext.form.field.ComboBox({
                            name: 'receive_man',
                            hiddenName: 'receive_man',
                            store: store_users_combo,
                            queryMode: 'remote',
                            triggerAction: 'all',
                            valueField: 'account',
                            displayField: 'username',
                            value: '0',
                            fieldLabel: '指定接收人',
                            forceSelection: true,
                            editable: false,
                            anchor: "99%"
                        }),
                        new MTM.MesTplField({id: 'mesTplField', fieldLabel: '引用信息模板', anchor: "100%", name: 'tpl_no'}),
                        {xtype: 'textfield', name: 'mx_no', hidden: true},//隐藏明细编号
                        {
                            xtype: "combo",
                            triggerAction: "all",
                            fieldLabel: "",//间隔天数
                            anchor: "100%",
                            hidden: true,
                            name: 't1',
                            editable: false,
                            store: store_day,
                            value: 0
                        }
                    ]
                }
            ];
            this.buttons = [
                {text: '保存', iconCls: 'acceptIcon', handler: this.submitForm, scope: this}
            ];
            this.callParent(arguments);
        },
        //保存表单
        submitForm: function (btn, e) {
            var me = this;
            var form = Ext.getCmp('add_urge_form').getForm();
            if (!form.isValid())
                return;

            //参数同步
            //var interval_time = (form.findField('t1').getValue()==""?0:form.findField('t1').getValue()) + "-" + (form.findField('t2').getValue()) + "-" + (form.findField('t3').getValue());
            var urge_no = this.urge_no;
            var activity = form.findField('activity').getValue();
            //var first_urge_type=form.findField('first_urge_type').getValue();

            //验证指定人是否合格
            var receive_man = form.findField('receive_man').getValue();

            //表单提交
            var url = this.isInsert ? "FlowUrgeAction.ered?reqCode=addUrge" : "FlowUrgeAction.ered?reqCode=updUrge";
            //表单提交
            form.submit({
                url: url,
                waitTitle: '提示',
                method: 'POST',
                waitMsg: '正在处理数据,请稍候...',
                success: function (pForm, action) {
                    //保存表单
                    if (me.isInsert) {
                        Ext.getCmp('add_flow_form').getForm().findField('urge_count').setValue(store_urge_tmp.getCount() + 1);
                        me.pWin.event_submitForm();
                    }

                    //同步数据源与参数
                    store_urge_tmp.getProxy().extraParams.urge_no = urge_no;
                    store_urge_tmp.load();

                    Ext.MessageBox.alert('提示', action.result.msg);
                },
                failure: function (pForm, action) {
                    Ext.MessageBox.alert('提示', action.result.msg);
                },
                params: {
                    /*interval_time: interval_time,*/
                    urge_no: urge_no,
                    activity: activity,
                    receive_man: receive_man/*,first_urge_type:first_urge_type*/
                }
            });
        },
        //提交 表单
        cancelForm: function (btn, e) {
            this.hide();
        }
    });


    //初始化...
    mainWin = new Ext.SettingWin();
    mainWin.show();

});