/**
 * 编程环境 IDEA.
 * 编写者: 王少伟
 * 主题:【任务管理平台】
 * 时间: 2013-06-10 下午4:36
 */
Ext.require('Ext4.SB.Model.STQue');
Ext.require('Ext4.SB.Model.CTQue');
Ext.require('Ext4.SB.Model.HisQue');
Ext.require('Ext4.SB.Model.QueParams');

Ext.onReady(function () {
    /**
     * 实体类定义
     * 队列一览     Ext.queueWin
     * 创建一般任务   Ext.addSTWin
     * 创建周期任务   Ext.addCTWin
     * 添加参数窗口   Ext.addParamsWin
     * 临时记录 Ext.tmpRecord
     */

    //主窗体
    var mainWin;
    var st_param_grid = Ext.create('Ext.grid.Panel', {
        title: "参数表",
        region: "east",
        width: 200,
        collapsible: true,
        titleCollapse: true,
        split: true,
        store: store_params_st,
        autoScroll: true,
        columns: [

            {
                xtype: 'rownumberer',
                text: '序号',
                width: 32
            },
            {
                text: "参数名",
                sortable: true,
                resizable: true,
                dataIndex: "p_key",
                width: 100
            },
            {
                text: "参数值",
                sortable: true,
                resizable: true,
                dataIndex: "p_value",
                width: 100
            }
        ],
        viewConfig: {forceFit: true},
        collapsed: true
    })

    //--------------------------数据源
    //当前队列（一般任务）
    var store_st = Ext.create('Ext.data.Store', {
        model: 'Ext4.SB.Model.STQue',
        autoLoad: true,
        proxy: {
            extraParams: {},
            type: 'ajax',
            url: 'TaskAction.ered?reqCode=getSTQue',
            reader: {
                type: 'json',
                totalProperty: 'TOTALCOUNT', // 记录总数
                root: 'ROOT' // Json中的列表数据根节点
            }
        },
        listeners: {
            load: function (store) {
                st_param_grid.collapse();
            }
        }
    });
    //当前队列（高级任务）
    var store_ct = Ext.create('Ext.data.Store', {
        model: 'Ext4.SB.Model.CTQue',
        autoLoad: true,
        proxy: {
            extraParams: {},
            type: 'ajax',
            url: 'TaskAction.ered?reqCode=getCTQue',
            reader: {
                type: 'json',
                totalProperty: 'TOTALCOUNT', // 记录总数
                root: 'ROOT' // Json中的列表数据根节点
            }
        },
        listeners: {
            load: function (store) {
                st_param_grid.collapse();
            }
        }
    });
    //历史队列
    var store_history = Ext.create('Ext.data.Store', {
        model: 'Ext4.SB.Model.HisQue',
        autoLoad: true,
        proxy: {
            extraParams: {
                searchKey: '', start: 0, limit: 20
            },
            type: 'ajax',
            url: 'TaskAction.ered?reqCode=getHisQue',
            reader: {
                type: 'json',
                totalProperty: 'TOTALCOUNT', // 记录总数
                root: 'ROOT' // Json中的列表数据根节点
            }
        },
        listeners: {
            load: function (store) {
            }
        }
    });

    //参数数据源 （临时）
    var store_params = Ext.create('Ext.data.Store', {
        model: 'Ext4.SB.Model.QueParams',

        proxy: {
            extraParams: {
                pb_no: ''
            },
            type: 'ajax',
            url: 'TaskAction.ered?reqCode=getQueParams',
            reader: {
                type: 'json',
                totalProperty: 'TOTALCOUNT', // 记录总数
                root: 'ROOT' // Json中的列表数据根节点
            }
        },
        listeners: {
            load: function (store) {
            }
        }
    });
    //一般数据源参数
    var store_params_st = Ext.create('Ext.data.Store', {

        model: 'Ext4.SB.Model.QueParams',
        proxy: {
            extraParams: {
                serial: ''
            },
            type: 'ajax',
            url: 'TaskAction.ered?reqCode=getQueParams',
            reader: {
                type: 'json',
                totalProperty: 'TOTALCOUNT', // 记录总数
                root: 'ROOT' // Json中的列表数据根节点
            }
        },
        listeners: {
            load: function (store) {
                st_param_grid.expand();
            }
        }
    });

    //高级数据源参数
    var store_params_ct = Ext.create('Ext.data.Store', {
        model: 'Ext4.SB.Model.QueParams',

        proxy: {
            extraParams: {
                serial: ''
            },
            type: 'ajax',
            url: 'TaskAction.ered?reqCode=getQueParams',
            reader: {
                type: 'json',
                totalProperty: 'TOTALCOUNT', // 记录总数
                root: 'ROOT' // Json中的列表数据根节点
            }
        },
        listeners: {
            load: function (store) {
                Ext.getCmp('ct_param_grid').expand();
            }
        }
    });

    //历史数据源参数
    var store_params_his = Ext.create('Ext.data.Store', {
        model: 'Ext4.SB.Model.QueParams',

        proxy: {
            extraParams: {
                serial: ''
            },
            type: 'ajax',
            url: 'TaskAction.ered?reqCode=getQueParams',
            reader: {
                type: 'json',
                totalProperty: 'TOTALCOUNT', // 记录总数
                root: 'ROOT' // Json中的列表数据根节点
            }
        },
        listeners: {
            load: function (store) {
                Ext.getCmp('his_param_grid').expand();
            }
        }
    });
    //小时计时
    var store_hours = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
    //分钟计时
    var store_minutes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59];
    //最小日期
    var minDate = new Date();
    minDate.setDate(minDate.getDate() - 1);


    //-----------------------------实体类---------------------------
    //临时记录对象
    Ext.define('Ext.tmpRecord', {
        extend: 'Ext.data.Model',
        fields: [
            {
                name: 'p_key'
            }, {
                name: 'p_value'
            }
        ]
    });
    //队列一览
    Ext.define('Ext.queueWin', {
        extend: 'Ext.UXWindow1',
        xtype: "window",
        title: "调度平台管理",
        width: 1095,
        height: 628,
        layout: "fit",
        closable: false,
        constrain: true,
        maximizable: true,
        collapsible: true,
        operWin1: '',//参数设置
        operWin2: '',//一般 任务
        operWin3: '',//高级任务
        initComponent: function () {
            this.tbar = [
                {
                    text: "参数设置",
                    iconCls: 'tableIcon',
                    handler: this.event_btn1,
                    scope: this
                },
                {
                    text: "创建一般任务",
                    iconCls: 'addIcon',
                    handler: this.event_btn2,
                    scope: this
                },
                {
                    text: "创建高级任务",
                    iconCls: 'addIcon',
                    handler: this.event_btn3,
                    scope: this
                },
                "->",
                {
                    xtype: "label",
                    text: "当前状态："
                },
                {
                    xtype: "label",
                    text: "已开启！"
                },
                '-',
                {
                    text: "关闭",
                    iconCls: 'disconnectIcon',
                    handler: this.event_power,
                    scope: this
                }
            ]
            this.items = [
                {
                    xtype: "tabpanel",
                    activeTab: 0,
                    items: [
                        new Ext.panel.Panel({
                            title: "当前队列",
                            layout: "fit",
                            items: [
                                new Ext.tab.Panel({
                                    activeTab: 0,
                                    items: [
                                        new Ext.panel.Panel({
                                            title: "一般任务",
                                            iconCls: 'award_star_silver_3Icon',
                                            layout: 'border',
                                            tbar: [
                                                {
                                                    text: '刷新', iconCls: 'database_refreshIcon', handler: function () {
                                                    store_st.load();
                                                }
                                                }
                                            ],
                                            items: [
                                                {
                                                    xtype: "grid",
                                                    region: 'center',
                                                    title: "",
                                                    store: store_st,
                                                    loadMask: {msg: '正在加载数据！请稍候...'},
                                                    viewConfig: {forceFit: true},
                                                    columns: [

                                                        {
                                                            xtype: 'rownumberer',
                                                            text: '序号',
                                                            width: 32
                                                        },
                                                        {
                                                            text: "开始日期时间",
                                                            sortable: true,
                                                            resizable: true,
                                                            dataIndex: "begin_datetime",
                                                            width: 100
                                                        },
                                                        {
                                                            text: "重复次数",
                                                            sortable: true,
                                                            resizable: true,
                                                            dataIndex: "repeat_count",
                                                            width: 100
                                                        },
                                                        {
                                                            text: "重复间隔(毫秒)",
                                                            sortable: true,
                                                            resizable: true,
                                                            dataIndex: "repeat_interval",
                                                            width: 100
                                                        },
                                                        {
                                                            text: "任务类命名",
                                                            sortable: true,
                                                            resizable: true,
                                                            dataIndex: "class_name",
                                                            width: 100
                                                        },
                                                        {
                                                            text: "备注",
                                                            sortable: true,
                                                            resizable: true,
                                                            dataIndex: "explain",
                                                            width: 100
                                                        },
                                                        {
                                                            text: "终止",
                                                            width: 32,
                                                            dataIndex: 'urge_no',
                                                            renderer: function (v) {
                                                                return '<a href=# title="终止该任务"><img src="' + webContext + '/resource/image/ext/delete.png"/></a>';
                                                            }
                                                        }
                                                    ],
                                                    listeners: {
                                                        cellclick: this.event_cellClick,
                                                        scope: this
                                                    }
                                                },
                                                st_param_grid
                                            ]
                                        })
                                        ,
                                        new Ext.panel.Panel({
                                            title: "高级任务",
                                            iconCls: 'award_star_gold_1Icon',
                                            layout: 'border',
                                            tbar: [
                                                {
                                                    text: '刷新', iconCls: 'database_refreshIcon', handler: function () {
                                                    store_ct.load();
                                                }
                                                }
                                            ],
                                            items: [
                                                {
                                                    xtype: "grid",
                                                    region: 'center',
                                                    title: "",
                                                    store: store_ct,
                                                    loadMask: {msg: '正在加载数据！请稍候...'},
                                                    viewConfig: {forceFit: true},
                                                    columns: [

                                                        {
                                                            xtype: 'rownumberer',
                                                            text: '序号',
                                                            width: 32
                                                        },
                                                        {
                                                            text: "编号",
                                                            sortable: true,
                                                            resizable: true,
                                                            dataIndex: "serial",
                                                            width: 100
                                                        },
                                                        {
                                                            text: "创建日期",
                                                            sortable: true,
                                                            resizable: true,
                                                            dataIndex: "create_date",
                                                            width: 100
                                                        },
                                                        {
                                                            text: "Cron表达式",
                                                            sortable: true,
                                                            resizable: true,
                                                            dataIndex: "cron_exp",
                                                            width: 100
                                                        },
                                                        {
                                                            text: "任务类命名",
                                                            sortable: true,
                                                            resizable: true,
                                                            dataIndex: "class_name",
                                                            width: 100
                                                        },
                                                        {
                                                            text: "备注",
                                                            sortable: true,
                                                            resizable: true,
                                                            dataIndex: "explain",
                                                            width: 100
                                                        },
                                                        {
                                                            text: "终止",
                                                            width: 32,
                                                            dataIndex: 'serail',
                                                            renderer: function (v) {
                                                                return '<a href=# title="终止该任务"><img src="' + webContext + '/resource/image/ext/delete.png"/></a>';
                                                            }
                                                        }
                                                    ],
                                                    listeners: {
                                                        cellclick: this.event_cellClick2,
                                                        scope: this
                                                    }
                                                },
                                                {
                                                    xtype: "grid",
                                                    id: 'ct_param_grid',
                                                    title: "参数表",
                                                    region: "east",
                                                    width: 200,
                                                    collapsible: true,
                                                    titleCollapse: true,
                                                    split: true,
                                                    store: store_params_ct,
                                                    autoScroll: true,
                                                    columns: [

                                                        {
                                                            xtype: 'rownumberer',
                                                            text: '序号',
                                                            width: 32
                                                        },
                                                        {
                                                            text: "参数名",
                                                            sortable: true,
                                                            resizable: true,
                                                            dataIndex: "p_key",
                                                            width: 100
                                                        },
                                                        {
                                                            text: "参数值",
                                                            sortable: true,
                                                            resizable: true,
                                                            dataIndex: "p_value",
                                                            width: 100
                                                        }
                                                    ],
                                                    viewConfig: {forceFit: true},
                                                    collapsed: true
                                                }
                                            ]
                                        })

                                    ]
                                })

                            ]
                        })
                        ,
                        new Ext.panel.Panel({
                            title: "历史队列",
                            layout: 'border',
                            items: [
                                {
                                    xtype: "grid",
                                    title: "",
                                    store: store_history,
                                    loadMask: {msg: '正在加载数据！请稍候...'},
                                    viewConfig: {forceFit: true},
                                    region: 'center',
                                    columns: [
                                        {
                                            text: "开始日期时间",
                                            sortable: true,
                                            resizable: true,
                                            dataIndex: "begin_datetime",
                                            width: 152
                                        },
                                        {
                                            text: "任务类命名",
                                            sortable: true,
                                            resizable: true,
                                            dataIndex: "class_name",
                                            width: 100
                                        },
                                        {
                                            text: "备注",
                                            sortable: true,
                                            resizable: true,
                                            dataIndex: "explain",
                                            width: 100
                                        },
                                        {
                                            text: "终止类型",
                                            sortable: true,
                                            resizable: true,
                                            dataIndex: "end_type",
                                            width: 100,
                                            renderer: function (v) {
                                                var tmpArray = ['运行完毕自然终止', 'web客户终强制终止', '后台事件终止', '其它终止原因'];
                                                return tmpArray[v - 1];
                                            }
                                        },
                                        {
                                            text: "终止时间",
                                            sortable: true,
                                            resizable: true,
                                            dataIndex: "end_time",
                                            width: 152
                                        },
                                        {
                                            text: "任务类型",
                                            sortable: true,
                                            resizable: true,
                                            dataIndex: "param1",
                                            width: 100
                                        },
                                        {
                                            text: "重复次数/Cron表达式",
                                            sortable: true,
                                            resizable: true,
                                            dataIndex: "param2",
                                            width: 100
                                        },
                                        {
                                            text: "重复间隔/无",
                                            sortable: true,
                                            resizable: true,
                                            dataIndex: "param3",
                                            width: 100
                                        },
                                        {
                                            text: "保留属性",
                                            sortable: true,
                                            resizable: true,
                                            dataIndex: "param4",
                                            width: 100
                                        }
                                    ],
                                    tbar: [
                                        {
                                            xtype: "textfield",
                                            fieldLabel: "标签",
                                            width: 201,
                                            emptyText: '输入条件模糊查询...',
                                            id: 'searchKey'
                                        },
                                        {
                                            text: "搜索",
                                            iconCls: 'page_findIcon',
                                            handler: this.event_search,
                                            scope: this
                                        }
                                    ],
                                    bbar: new Ext.UXPagingToolbar1({store: store_history}),
                                    listeners: {
                                        cellclick: function (pGrid, td, cellIndex, record, tr, rowIndex, e, eOpts) {
                                            var store_tmp = pGrid.getStore();

                                            //加载 参数表
                                            store_params_his.getProxy().extraParams.serial = record.get('serial');
                                            store_params_his.load();
                                        }
                                    }
                                },
                                {
                                    xtype: "grid",
                                    id: 'his_param_grid',
                                    title: "参数表",
                                    region: "east",
                                    width: 200,
                                    collapsible: true,
                                    titleCollapse: true,
                                    split: true,
                                    store: store_params_his,
                                    autoScroll: true,
                                    columns: [

                                        {
                                            xtype: 'rownumberer',
                                            text: '序号',
                                            width: 32
                                        },
                                        {
                                            text: "参数名",
                                            sortable: true,
                                            resizable: true,
                                            dataIndex: "p_key",
                                            width: 100
                                        },
                                        {
                                            text: "参数值",
                                            sortable: true,
                                            resizable: true,
                                            dataIndex: "p_value",
                                            width: 100
                                        }
                                    ],
                                    viewConfig: {forceFit: true},
                                    collapsed: true
                                }
                            ]
                        })
                    ]
                }
            ];
            this.callParent(arguments);
            this.operWin2 = new Ext.addSTWin();
            this.operWin3 = new Ext.addCTWin();
        },
        //参数设置
        event_btn1: function (btn, e) {
            Ext.Msg.alert('提示', '暂不允许设置参数!');
        },
        //创建一般任务
        event_btn2: function (btn, e) {
            this.operWin2.show();
        },
        //创建高级任务
        event_btn3: function (btn, e) {
            this.operWin3.show();
        },
        //开关
        event_power: function (btn, e) {
            Ext.Msg.alert('提示', '暂不允许控制调度平台开关!');
        },
        //搜索
        event_search: function (btn, e) {
            store_history.getProxy().extraParams.searchKey = Ext.getCmp('searchKey').getValue();
            store_history.load();
        },
        //表格单击事件
        event_cellClick: function (pGrid, td, colIndex, record, tr, rowIndex, e, eOpts) {
            var store_tmp = pGrid.getStore();
            //加载 参数表
            store_params_st.getProxy().extraParams.serial = record.get('serial');
            store_params_st.load();

            if (colIndex == 6) {
                //删除提示
                Ext.Msg.confirm('提示', '删除操作一旦执行将无法恢复,确定继续？', function (choose) {
                    if (choose == "no") {
                        return;
                    }

                    //执行删除
                    Ext.Ajax.request({
                        url: 'TaskAction.ered?reqCode=delSTQue',
                        success: function (resp, opts) {
                            var respText = Ext.JSON.decode(resp.responseText);
                            if (respText.success) {
                                //删除记录
                                store_tmp.remove(record);

                                //历史 队列重新加载
                                store_history.load();

                                //隐藏参数表
                                st_param_grid.collapse();
                            }

                            Ext.Msg.alert('提示', respText.msg);
                        },
                        failure: function () {
                            Ext.Msg.alert('提示', '当前网络忙!<br/>请刷新后重试~');
                        },
                        params: {serial: record.get('serial')}
                    });
                });
            }
        },
        //表格单击事件2
        event_cellClick2: function (pGrid, td, colIndex, record, tr, rowIndex, e, eOpts) {
            var store_tmp = pGrid.getStore();

            //加载 参数表
            store_params_ct.getProxy().extraParams.serial = record.get('serial');
            store_params_ct.load();

            if (colIndex == 6) {
                //删除提示
                Ext.Msg.confirm('提示', '删除操作一旦执行将无法恢复,确定继续？', function (choose) {
                    if (choose == "no") {
                        return;
                    }

                    //执行删除
                    Ext.Ajax.request({
                        url: 'TaskAction.ered?reqCode=delCTQue',
                        success: function (resp, opts) {
                            var respText = Ext.JSON.decode(resp.responseText);
                            if (respText.success) {
                                //删除记录
                                store_tmp.remove(record);

                                //历史 队列重新加载
                                store_history.load();

                                //隐藏参数表
                                Ext.getCmp('ct_param_grid').collapse();
                            }

                            Ext.Msg.alert('提示', respText.msg);
                        },
                        failure: function () {
                            Ext.Msg.alert('提示', '当前网络忙!<br/>请刷新后重试~');
                        },
                        params: {serial: record.get('serial')}
                    });
                });
            }
        }
    });

    //创建一般任务
    Ext.define('Ext.addSTWin', {
        extend: 'Ext.UXWindow2',
        xtype: "window",
        title: "创建一般任务",
        width: 799,
        height: 260,
        layout: "border",
        constrain: true,
        collapsible: true,
        closeAction: 'hide',
        modal: true,
        operWin: '',
        initComponent: function () {
            this.items = [
                {
                    xtype: "form",
                    id: 'st_form',
                    title: "",
                    labelWidth: 100,
                    labelAlign: "left",
                    layout: "form",
                    region: "center",
                    split: true,
                    padding: "5",
                    items: [
                        {
                            xtype: "datefield",
                            fieldLabel: "开始日期",
                            anchor: "100%",
                            format: 'Y-m-d',
                            name: 'date',
                            editable: false,
                            allowBlank: false,
                            minValue: minDate,
                            value: new Date()
                        },
                        {
                            xtype: 'container',
                            autoEl: "div",
                            layout: 'table',
                            height: 26,
                            items: [
                                {
                                    xtype: 'label',
                                    text: '开始时间:',
                                    style: "padding-right:55px;font-size:12px;"
                                },
                                {
                                    xtype: "combo",
                                    width: 44,
                                    triggerAction: "all",
                                    fieldLabel: "",
                                    anchor: "100%",
                                    name: 't1',
                                    editable: false,
                                    store: store_hours,
                                    value: minDate.getHours()
                                },
                                {
                                    xtype: 'label',
                                    text: '时'
                                },
                                {
                                    xtype: "combo",
                                    width: 44,
                                    triggerAction: "all",
                                    fieldLabel: "",
                                    anchor: "100%",
                                    name: 't2',
                                    editable: false,
                                    store: store_minutes,
                                    value: minDate.getMinutes()
                                },
                                {
                                    xtype: 'label',
                                    text: '分'
                                }
                            ]
                        },
                        {
                            xtype: "numberfield",
                            fieldLabel: "重复次数",
                            anchor: "100%",
                            name: 'repeat_count',
                            value: 0,
                            minValue: 0
                        },
                        {
                            xtype: "numberfield",
                            fieldLabel: "重复间隔",
                            anchor: "100%",
                            name: 'repeat_interval',
                            value: 0,
                            minValue: 0
                        },
                        {
                            xtype: "textfield",
                            fieldLabel: "类全名",
                            anchor: "100%",
                            name: 'class_name',
                            allowBlank: false,
                            maxLength: 150
                        },
                        {
                            xtype: "textfield",
                            fieldLabel: "备注",
                            anchor: "100%",
                            name: 'explain',
                            maxLength: 20
                        },
                        {
                            xtype: 'textfield',
                            name: 'serial',
                            hidden: true
                        }
                    ]
                },
                {
                    xtype: "grid",
                    title: "参数表",
                    region: "east",
                    width: 303,
                    collapsible: true,
                    titleCollapse: true,
                    split: true,
                    store: store_params,
                    autoScroll: true,
                    columns: [

                        {
                            xtype: 'rownumberer',
                            text: '序号',
                            width: 32
                        },
                        {
                            text: "参数名",
                            sortable: true,
                            resizable: true,
                            dataIndex: "p_key",
                            width: 90
                        },
                        {
                            text: "参数值",
                            sortable: true,
                            resizable: true,
                            dataIndex: "p_value",
                            width: 90
                        },
                        {
                            text: "删除",
                            width: 35,
                            dataIndex: 'urge_no',
                            renderer: function (v) {
                                return '<a href=# title="删除该条参数"><img src="' + webContext + '/resource/image/ext/delete.png"/></a>';
                            }
                        }
                    ],
                    listeners: {cellclick: this.event_cellClick, scope: this},
                    viewConfig: {forceFit: true},
                    tbar: [
                        {text: '添加', iconCls: 'addIcon', handler: this.event_add, scope: this}
                    ]
                }
            ];

            this.buttons = [
                {text: '保存', iconCls: 'acceptIcon', handler: this.submitForm, scope: this}
            ];
            this.callParent(arguments);
            this.operWin = new Ext.addParamsWin();
        },
        //提交表单
        submitForm: function (btn, e) {
            var me = this;
            var form = Ext.getCmp('st_form').getForm();
            if (!form.isValid())
                return;

            //添加确认
            Ext.Msg.confirm('提示', '请再次确认下配置信息,查看参数表是否配备完全！<br/><br/>请再次确认是否继续创建该条定时任务!!', function (choose) {
                if (choose == "no") {
                    return;
                }

                //参数数据上传
                var keys = "";
                var values = "";
                store_params.each(function (rec) {
                    keys += rec.get('p_key') + ",";
                    values += rec.get('p_value') + ",";
                });
                if (store_params.getCount > 0) {
                    keys = keys.substr(0, keys.length - 1);
                    values = values.substr(0, values.length - 1);
                }

                //表单提交
                form.submit({
                    url: "TaskAction.ered?reqCode=newSTQue",
                    waitTitle: '提示',
                    method: 'POST',
                    waitMsg: '正在处理数据,请稍候...',
                    success: function (form, action) {
                        Ext.MessageBox.alert('提示', action.result.msg);
                        store_st.load();
                        me.hide();
                    },
                    failure: function (form, action) {
                        Ext.MessageBox.alert('提示', action.result.msg);
                    },
                    params: {keys: keys, values: values}
                });
            });
        },
        //取消表单
        cancelForm: function (btn, e) {
            this.hide();
        },
        //添加动作
        event_add: function (btn, e) {
            this.operWin.show();
        },
        //表格单击事件
        event_cellClick: function (pGrid, rowIndex, colIndex, e) {
            if (colIndex == 3) {
                pGrid.getStore().removeAt(rowIndex);
            }
        }
    });

    //添加参数窗口
    Ext.define('Ext.addParamsWin', {
        extend: 'Ext.UXWindow2',
        xtype: "window",
        title: "添加参数",
        width: 376,
        height: 130,
        constrain: true,
        collapsible: true,
        closeAction: 'hide',
        itempanel_id: '',
        modal: true,
        layout: "fit",
        initComponent: function () {
            var itempanel = new Ext.form.Panel({
                padding: 8,
                title: "",
                labelWidth: 100,
                labelAlign: "left",
                layout: "form",
                items: [
                    {
                        xtype: "textfield",
                        fieldLabel: "参数名",
                        anchor: "100%",
                        name: 'p_key',
                        allowBlank: false,
                        maxLength: 200
                    },
                    {
                        xtype: "textfield",
                        fieldLabel: "参数值",
                        anchor: "100%",
                        name: 'p_value',
                        allowBlank: false,
                        maxLength: 200
                    }
                ]
            })
            this.itempanel_id = itempanel.id;
            this.items = [
                itempanel
            ];
            this.buttons = [
                {text: '重置', iconCls: '', handler: this.resetForm, scope: this},
                {text: '保存', iconCls: 'acceptIcon', handler: this.submitForm, scope: this}
            ];
            this.callParent(arguments);
        },
        //提交表单
        submitForm: function (btn, e) {
            var itempanel_id = this.itempanel_id;
            var form = Ext.getCmp(itempanel_id).getForm();
            if (!form.isValid())
                return;

            //值获取
            var p_key = form.findField('p_key').getValue();
            var p_value = form.findField('p_value').getValue();

            //判断该键值是否已存在
            var isExist = false;
            store_params.each(function (rec) {
                if (rec.get('p_key') == p_key) {
                    Ext.Msg.alert('提示', '该参数名已经存在,请更改后再次保存!');
                    isExist = true;
                    return;
                }
            });
            if (isExist)
                return;

            //创建记录
            var newRecord = new Ext.tmpRecord();
            newRecord.set('p_key', p_key);
            newRecord.set('p_value', p_value);
            store_params.add(newRecord);
        },
        //重置表单
        resetForm: function (btn, e) {
            var itempanel_id = this.itempanel_id;
            var form = Ext.getCmp(itempanel_id).getForm();
            form.reset();
        },
        //取消表单
        cancelForm: function (btn, e) {
            this.hide();
        }
    });

    //创建周期任务
    Ext.define('Ext.addCTWin', {
        extend: 'Ext.UXWindow2',
        xtype: "window",
        title: "创建高级任务",
        width: 799,
        height: 260,
        layout: "border",
        constrain: true,
        collapsible: true,
        closeAction: 'hide',
        modal: true,
        operWin: '',
        initComponent: function () {
            this.items = [
                {
                    xtype: "form",
                    id: 'ct_form',
                    title: "",
                    labelWidth: 100,
                    labelAlign: "left",
                    layout: "form",
                    region: "center",
                    split: true,
                    padding: "5",
                    items: [
                        {
                            xtype: "textfield",
                            fieldLabel: "Cron表达式",
                            anchor: "100%",
                            name: 'cron_exp',
                            allowBlank: false,
                            maxLength: 150
                        },
                        {
                            xtype: "textfield",
                            fieldLabel: "类全名",
                            anchor: "100%",
                            name: 'class_name',
                            allowBlank: false,
                            maxLength: 150
                        },
                        {
                            xtype: "textfield",
                            fieldLabel: "备注",
                            anchor: "100%",
                            name: 'explain',
                            maxLength: 20
                        },
                        {
                            xtype: 'textfield',
                            name: 'serial',
                            hidden: true
                        }
                    ]
                },
                {
                    xtype: "grid",
                    title: "参数表",
                    region: "east",
                    width: 303,
                    collapsible: true,
                    titleCollapse: true,
                    split: true,
                    store: store_params,
                    autoScroll: true,
                    columns: [

                        {
                            xtype: 'rownumberer',
                            text: '序号',
                            width: 32
                        },
                        {
                            text: "参数名",
                            sortable: true,
                            resizable: true,
                            dataIndex: "p_key",
                            width: 90
                        },
                        {
                            text: "参数值",
                            sortable: true,
                            resizable: true,
                            dataIndex: "p_value",
                            width: 90
                        },
                        {
                            text: "删除",
                            width: 35,
                            dataIndex: 'urge_no',
                            renderer: function (v) {
                                return '<a href=# title="删除该条参数"><img src="' + webContext + '/resource/image/ext/delete.png"/></a>';
                            }
                        }
                    ],
                    listeners: {cellclick: this.event_cellClick, scope: this},
                    viewConfig: {forceFit: true},
                    tbar: [
                        {text: '添加', iconCls: 'addIcon', handler: this.event_add, scope: this}
                    ]
                }
            ];

            this.buttons = [
                {text: '保存', iconCls: 'acceptIcon', handler: this.submitForm, scope: this}
            ];
            this.callParent(arguments);
            this.operWin = new Ext.addParamsWin();
        },
        //提交表单
        submitForm: function (btn, e) {
            var me = this;
            var form = Ext.getCmp('ct_form').getForm();
            if (!form.isValid())
                return;

            //添加确认
            Ext.Msg.confirm('提示', '请再次确认下配置信息,查看参数表是否配备完全！<br/><br/>请再次确认是否继续创建该条高级任务!!', function (choose) {
                if (choose == "no") {
                    return;
                }

                //参数数据上传
                var keys = "";
                var values = "";
                store_params.each(function (rec) {
                    keys += rec.get('p_key') + ",";
                    values += rec.get('p_value') + ",";
                });
                if (store_params.getCount > 0) {
                    keys = keys.substr(0, keys.length - 1);
                    values = values.substr(0, values.length - 1);
                }

                //表单提交
                form.submit({
                    url: "TaskAction.ered?reqCode=newCTQue",
                    waitTitle: '提示',
                    method: 'POST',
                    waitMsg: '正在处理数据,请稍候...',
                    success: function (form, action) {
                        Ext.MessageBox.alert('提示', action.result.msg);
                        store_st.load();
                        me.hide();
                    },
                    failure: function (form, action) {
                        Ext.MessageBox.alert('提示', action.result.msg);
                    },
                    params: {keys: keys, values: values}
                });
            });
        },
        //取消表单
        cancelForm: function (btn, e) {
            this.hide();
        },
        //添加动作
        event_add: function (btn, e) {
            this.operWin.show();
        },
        //表格单击事件
        event_cellClick: function (pGrid, rowIndex, colIndex, e) {
            if (colIndex == 3) {
                pGrid.getStore().removeAt(rowIndex);
            }
        }
    });


    //----------实体
    mainWin = new Ext.queueWin();
    mainWin.show();

});