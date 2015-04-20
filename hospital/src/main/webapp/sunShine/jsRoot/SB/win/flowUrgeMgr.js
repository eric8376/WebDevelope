/**
 * 编程环境 IDEA.
 * 编写者: 王少伟
 * 主题:【流程催办管理升级版】
 * 时间: 2013-08-20  下午6:05
 */
    //--------------------导入包语句--------------------
importJs("sunShine.common.UXGrid1");


//--------------------定义类--------------------
Ext.define('sunShine.SB.win.flowUrgeMgr', {
    extend: 'sunShine.common.UXWindow1',
    alias: 'widget.flowUrgeMgr',

    title: '流程超时提醒管理升级版',
    layout: 'border',

    curPanelFlag: '',
    copySource: {type: '', data: new Array()},//复制的资源

    initComponent: function () {
        var me = this;
        //_____________渲染_____________
        //环节颜色渲染(黑色代表已设置,灰色代表未设置)
        function Render_pointStatus(v, m, rec) {
            if (rec.get('source_type') == '0') {
                return '<font color=#aaa>' + v + '</span>';
            }
            return '<font color=green>' + v + '</font>';
        }

        //是否催办方式
        function Render_isUrge(v) {
            return v == 1 ? "<font color=green>是</font>" : "<font color=#aaa>否</font>";
        }

        //催办方式
        function Render_urgeType(v) {
            return ['<font color=green>定时提醒</font>', '<font color=blue>周期提醒</font>', '<span style="color:green;">递归提醒</span>'][v];
        }

        //催办方式
        function Render_activityType(v) {
            return ['无', '短信', '邮件', 'RTX'][v];
        }

        //用户渲染
        this.userNames_ = {};
        function Render_user(v) {
            if (Ext.isEmpty(v)) {
                return "执行人";
            }
            var name = me.userNames_[v];
            return name ? "<font color=green>" + name + "</font>" : v;
        }

        //引用模板渲染
        this.messageTpls_ = {};
        function Render_mesTpl(v) {
            var name = me.messageTpls_[v];
            return name ? name : v;
        }

        //_____________数据源_____________ (用户，信息模板，流程，环节，到达提醒，超时提醒)
        this.userArray = [];
        this.tplArray = [];
        getGridStore({
            fields: ['tpl_no', 'tpl_name'],
            params: {ref_no: 'messageTpl_query1'},
            autoLoad: true,
            listeners: {load: me.event_tplStoreLoad, scope: me}
        });
        this.userStore = getGridStore({
            url: 'FlowUrgeAction.ered?reqCode=getAllUserForCombo',
            fields: ['account', 'username'],
            autoLoad: false,
            listeners: {load: me.event_userStoreLoad, scope: me}
        });
        this.flowStore = getGridStore({
            url: 'WorkFlowAction.ered?reqCode=flowListFind',
            fields: ['id', 'name', 'resourceName', 'deploymentTime'],
            autoLoad: true
        });
        this.pointStore = getGridStore({
            url: 'Quick.ered?reqCode=exec',
            fields: ['source_type', 'urge_no', 'flow_no', 'point_no', 'use_time', 'urge_count', 'is_urge', 'explain'],
            autoLoad: false,
            params: {exec_target: 'flowUrge2Service', exec_method: 'getAllUrge', id: ''},
            listeners: {load: me.event_pointStoreLoad, scope: me}
        });
        this.mx2Store = getGridStore({
            autoLoad: false,
            fields: ['mx2_no', 'urge_no', 'receive_man', 'activity', 'tpl_no'],
            params: {ref_no: 'flowUrgeMx2_query1', urge_no: -1}
        });
        this.mxStore = getGridStore({
            url: 'FlowUrgeAction.ered?reqCode=getUrges',
            fields: ['urge_no', 'mx_no', 'urge_type', 'interval_time', 'repeat_urge_count', 'repeat_urge_interval', 'activity', 'receive_man', 'tpl_no'],
            params: {urge_no: -1},
            autoLoad: false
        });

        //_____________初始化开始_____________
        this.items = [
            {
                xtype: 'UXGrid1',
                gridFlag: 'flow',
                iconCls: 'collapse-allicon',
                region: 'center',
                title: '发布的流程一览',
                store: this.flowStore,
                searchFlag: false,
                addFlag: false,
                bbarFlag: true,
                editFlag: false,
                delFlag: false,
                columns: [
                    {xtype: 'rownumberer', text: '序号', width: 30},
                    {xtype: 'gridcolumn', text: '流程定义ID', dataIndex: 'id', width: 136},
                    {xtype: 'gridcolumn', text: '流程名称', dataIndex: 'name', flex: 1}
                ],
                selModel: Ext.create('Ext.selection.CheckboxModel', {mode: 'single'}),
                tbar: [
                    {text: '复制', iconCls: 'downloadicon', handler: this.event_flowGridCopy, scope: me},
                    {text: '粘贴', iconCls: 'accepticon', handler: this.event_flowGridPaste, scope: me},
                    '-',
                    {xtype: 'checkbox', name: 'flow_copy_notice', boxLabel: '复制提示', checked: true},
                    {xtype: 'checkbox', name: 'flow_paste_notice', boxLabel: '粘贴提示', checked: true}
                ],
                listeners: {
                    itemclick: this.event_flowGridSelect, render: function () {
                        me.down('grid[gridFlag=flow]').getEl().dom.onclick = function () {
                            me.curPanelFlag = 'flow';
                            me.down('tbtext[tbFlag=1]').setText("<font color=green>[发布的流程一览]</font>");
                        };
                    }, scope: me
                }
            },
            {
                xtype: 'panel',
                panelFlag: 'rightPanel',
                iconCls: 'configicon',
                split: true,
                frame: true,
                collapsible: true,
                titleCollapse: true,
                collapseMode: 'mini',
                collapsed: true,
                region: 'east',
                width: '80%',
                layout: 'border',
                title: '！请选择流程',
                items: [
                    {
                        xtype: 'UXGrid1',
                        gridFlag: 'point',
                        region: 'center',
                        margin: 0,
                        store: this.pointStore,
                        addFlag: false,
                        bbarFlag: false,
                        operWin: Ext.create('sunShine.SB.operWin.point_addWin', {pWin: me}),
                        columns: [
                            {xtype: 'rownumberer', text: '序号', width: 30},
                            {
                                xtype: 'gridcolumn',
                                text: '备注',
                                dataIndex: 'explain',
                                width: 114,
                                renderer: Render_pointStatus
                            },
                            {xtype: 'gridcolumn', text: '环节编号', dataIndex: 'point_no', width: 90},
                            {xtype: 'gridcolumn', text: '流程时长表达式', dataIndex: 'use_time', flex: 1},
                            {
                                xtype: 'gridcolumn',
                                text: '是否催办',
                                dataIndex: 'is_urge',
                                width: 58,
                                renderer: Render_isUrge
                            }
                        ],
                        selModel: Ext.create('Ext.selection.CheckboxModel'),
                        tbar: [
                            {text: '复制', iconCls: 'downloadicon', handler: this.event_pointGridCopy, scope: me},
                            {text: '粘贴', iconCls: 'accepticon', handler: this.event_pointGridPaste, scope: me},
                            '-',
                            {text: '删除', iconCls: 'deleteicon', handler: this.event_pointGriddeletes, scope: me},
                            '-',
                            {xtype: 'checkbox', name: 'point_delete_notice', boxLabel: '删除提示', checked: true},
                            {xtype: 'checkbox', name: 'point_mx_notice', boxLabel: '点击查看明细', checked: true}
                        ],
                        //搜索事件
                        event_search: function () {
                            var value = this.down('textfield[name=searchKey]').getValue();
                            if (this.store.getCount() == 0) {
                                this.store.load();
                            }
                            this.store.clearFilter(true);
                            this.store.filter({
                                filterFn: function (item) {
                                    var re = new RegExp("(.|)" + value + "(.|)");
                                    return re.exec(item.get("explain")) ? true : (re.exec(item.get("point_no")));
                                }
                            });
                        },
                        event_del: me.event_pointGriddelete,
                        listeners: {
                            itemclick: this.event_pointGridSelect, render: function () {
                                this.down('grid[gridFlag=point]').getEl().dom.onclick = function () {
                                    me.curPanelFlag = 'point';
                                    me.down('tbtext[tbFlag=1]').setText("<font color=green>[" + me.down('panel[panelFlag=rightPanel]').title + "]</font>");
                                };
                            }, scope: me
                        }
                    },
                    {
                        xtype: 'tabpanel',
                        tabFlag: 'rightTab',
                        iconCls: 'chart_organisationicon',
                        margin: 0,
                        split: true,
                        collapsible: true,
                        titleCollapse: true,
                        collapseMode: 'mini',
                        collapsed: true,
                        region: 'east',
                        width: '80%',
                        title: '！请选择有效的环节',
                        items: [
                            {
                                xtype: 'UXGrid1',
                                gridFlag: 'mx2',
                                iconCls: 'flag_blueicon',
                                title: '任务到达提醒设置',
                                searchFlag: false,
                                bbarFlag: false,
                                store: this.mx2Store,
                                operWin: '',
                                columns: [
                                    {xtype: 'rownumberer', text: '序号', width: 30},
                                    {
                                        xtype: 'gridcolumn',
                                        text: '提醒动作',
                                        dataIndex: 'activity',
                                        width: 63,
                                        renderer: Render_activityType
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        text: '接收人',
                                        dataIndex: 'receive_man',
                                        width: 63,
                                        renderer: Render_user
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        text: '引用信息模板',
                                        dataIndex: 'tpl_no',
                                        flex: 1,
                                        renderer: Render_mesTpl
                                    }

                                ],
                                selModel: Ext.create('Ext.selection.CheckboxModel'),
                                tbar: [
                                    {text: '复制', iconCls: 'downloadicon', handler: this.event_mx2GridCopy, scope: me},
                                    {text: '粘贴', iconCls: 'accepticon', handler: this.event_mx2GridPaste, scope: me},
                                    '-',
                                    {text: '删除', iconCls: 'deleteicon', handler: this.event_mx2Griddeletes, scope: me},
                                    {
                                        text: '高级删除',
                                        iconCls: 'deleteicon',
                                        handler: this.event_mx2Griddeletes_special,
                                        scope: me
                                    },
                                    '-',
                                    {xtype: 'checkbox', name: 'mx2_delete_notice', boxLabel: '删除提示', checked: true}
                                ],
                                event_del: me.event_mx2Griddelete,
                                listeners: {
                                    render: function () {
                                        this.getEl().dom.onclick = function () {
                                            me.curPanelFlag = 'mx2';
                                            me.down('tbtext[tbFlag=1]').setText("<font color=green>[任务到达提醒设置]</font>");
                                        };
                                    }
                                }
                            },
                            {
                                xtype: 'UXGrid1',
                                gridFlag: 'mx',
                                iconCls: 'medal_gold_1icon',
                                title: '工作超时提醒设置',
                                searchFlag: false,
                                bbarFlag: false,
                                store: this.mxStore,
                                operWin: '',
                                columns: [
                                    {xtype: 'rownumberer', text: '序号', width: 30},
                                    {
                                        xtype: 'gridcolumn',
                                        text: '提醒方式',
                                        dataIndex: 'urge_type',
                                        width: 63,
                                        renderer: Render_urgeType
                                    },
                                    {xtype: 'gridcolumn', text: '间隔分钟(el/cron)', dataIndex: 'interval_time', flex: 1},
                                    {xtype: 'gridcolumn', text: '重催次数', dataIndex: 'repeat_urge_count', width: 63},
                                    {xtype: 'gridcolumn', text: '重催间隔(el)', dataIndex: 'repeat_urge_interval', flex: 1},
                                    {
                                        xtype: 'gridcolumn',
                                        text: '提醒动作',
                                        dataIndex: 'activity',
                                        width: 63,
                                        renderer: Render_activityType
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        text: '接收人',
                                        dataIndex: 'receive_man',
                                        width: 63,
                                        renderer: Render_user
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        text: '引用信息模板',
                                        dataIndex: 'tpl_no',
                                        width: 100,
                                        renderer: Render_mesTpl
                                    }
                                ],
                                selModel: Ext.create('Ext.selection.CheckboxModel'),
                                tbar: [
                                    {text: '复制', iconCls: 'downloadicon', handler: this.event_mxGridCopy, scope: me},
                                    {text: '粘贴', iconCls: 'accepticon', handler: this.event_mxGridPaste, scope: me},
                                    '-',
                                    {text: '删除', iconCls: 'deleteicon', handler: this.event_mxGriddeletes, scope: me},
                                    {
                                        text: '高级删除',
                                        iconCls: 'deleteicon',
                                        handler: this.event_mxGriddeletes_special,
                                        scope: me
                                    },
                                    '-',
                                    {xtype: 'checkbox', name: 'mx_delete_notice', boxLabel: '删除提示', checked: true}
                                ],
                                event_del: me.event_mxGriddelete,
                                listeners: {
                                    render: function () {
                                        this.getEl().dom.onclick = function () {
                                            me.curPanelFlag = 'mx';
                                            me.down('tbtext[tbFlag=1]').setText("<font color=green>[工作超时提醒设置]</font>");
                                        };
                                    }
                                }
                            }
                        ]
                    }
                ]
            }
        ];
        //添加状态栏
        this.bbar = [
            '当前焦点:', {
                xtype: 'tbtext',
                tbFlag: '1',
                text: '<font color=#aaa>无</font>'
            }, '-', '复制内容类型:', {
                xtype: 'tbtext',
                tbFlag: '2',
                text: '<font color=#aaa>无</font>'
            }, '-', '复制记录数:', {xtype: 'tbtext', tbFlag: '3', text: '<font color=#aaa>无</font>'}
        ],

            //添加键盘事件
            Ext.create('Ext.util.KeyNav', Ext.getDoc(), {
                processEvent: function (e) {
                    if (e.ctrlKey && e.keyCode == 67) {//复制
                        switch (me.curPanelFlag) {
                            case "flow":
                                me.event_flowGridCopy();
                                break;
                            case "point":
                                me.event_pointGridCopy();
                                break;
                            case "mx2":
                                me.event_mx2GridCopy();
                                break;
                            case "mx":
                                me.event_mxGridCopy();
                                break;
                        }
                    } else if (e.ctrlKey && e.keyCode == 86) {//粘贴
                        switch (me.curPanelFlag) {
                            case "flow":
                                me.event_flowGridPaste();
                                break;
                            case "point":
                                me.event_pointGridPaste();
                                break;
                            case "mx2":
                                me.event_mx2GridPaste();
                                break;
                            case "mx":
                                me.event_mxGridPaste();
                                break;
                        }
                    }
                    return false;
                }
            });

        //_____________初始化结束_____________
        me.callParent(arguments);
    },
    //流程表格选择事件
    event_flowGridSelect: function (view, record) {
        var rightPanel = this.down('panel[panelFlag=rightPanel]');
        rightPanel.setTitle(record.get('id') + "<span class=normal_title> 流程的所有环节信息</span>");
        rightPanel.expand();
        this.pointStore.getProxy().extraParams.id = record.get('id');
        this.pointStore.load();
    },
    //环节表格选择事件
    event_pointGridSelect: function (view, record) {
        var me = this;
        var tempTabpanel = this.down('tabpanel[tabFlag=rightTab]');
        if (record.get('source_type') == 1 && me.down('checkbox[name=point_mx_notice]').getValue()) {
            var urge_no = record.get('urge_no');
            tempTabpanel.P_urge_no = urge_no;
            tempTabpanel.setTitle(record.get('explain') + "<span class=normal_title> 环节的提醒设置</span>");
            tempTabpanel.setDisabled(false);
            tempTabpanel.expand();

            this.mxStore.getProxy().extraParams.urge_no = urge_no;
            this.mx2Store.getProxy().extraParams.urge_no = urge_no;
            this.mxStore.load();
            this.mx2Store.load();
        } else {
            tempTabpanel.setTitle("！请选择有效的环节");
            tempTabpanel.setDisabled(true);
            tempTabpanel.collapse();
        }
    },
    //用户数据源加载
    event_userStoreLoad: function (store) {
        var me = this;
        store.each(function (rec) {
            me.userArray.push([rec.get('account'), rec.get('username')]);
            me.userNames_[rec.get('account')] = rec.get('username');
        });
        me.down('grid[gridFlag=mx2]').operWin = Ext.create('sunShine.SB.operWin.mx2_addWin', {
            pWin: me,
            userArray: me.userArray,
            tplArray: me.tplArray
        });
        me.down('grid[gridFlag=mx]').operWin = Ext.create('sunShine.SB.operWin.mx_addWin', {
            pWin: me,
            userArray: me.userArray,
            tplArray: me.tplArray
        });
    },

    //信息模板数据源加载
    event_tplStoreLoad: function (store) {
        var me = this;
        store.each(function (rec) {
            me.tplArray.push([rec.get('tpl_no'), rec.get('tpl_name')]);
            me.messageTpls_[rec.get('tpl_no')] = rec.get('tpl_name');
        });
        me.userStore.load();
    },
    //环节数据源加载隐藏掉tabpanel
    event_pointStoreLoad: function () {
        var tempTabpanel = this.down('tabpanel[tabFlag=rightTab]');
        tempTabpanel.setDisabled(true);
        tempTabpanel.collapse();
    },

    //1、流程表格复制
    event_flowGridCopy: function () {
        var records = this.down('grid[gridFlag=flow]').getView().getSelectionModel().getSelection();
        if (records.length <= 0) {
            Ext.Msg.alert('提示', '请在[发布的流程一览]表格里选择需要复制的流程信息！');
            return;
        }
        this.copySource = {type: 'flow', data: records};
        if (this.down('checkbox[name=flow_copy_notice]').getValue()) {
            Ext.Msg.alert('复制提示', '已复制1条流程信息，您可以粘贴到其它流程！<br/>复制规则：系统筛选[粘贴流程]的环节信息与[被复制流程]的环节信息相同的环节配置进行粘贴');
        }
        this.down('tbtext[tbFlag=2]').setText("<font color=blue>流程信息</font>");
        this.down('tbtext[tbFlag=3]').setText("<font color=blue>" + records.length + "</font>");
    },
    //2、环节表格复制
    event_pointGridCopy: function () {
        var records = this.down('grid[gridFlag=point]').getView().getSelectionModel().getSelection();
        if (records.length <= 0) {
            Ext.Msg.alert('提示', '请在[' + this.down('panel[panelFlag=rightPanel]').title + ']表格里选择需要复制的环节信息！');
            return;
        }
        this.copySource = {type: 'point', data: records};
        if (this.down('checkbox[name=flow_copy_notice]').getValue()) {
            Ext.Msg.alert('复制提示', '已复制' + records.length + '条环节信息，您可以粘贴到其它流程！<br/>复制规则：系统筛选[粘贴流程]的环节信息与[被复制环节信息]相同的环节配置进行粘贴');
        }
        this.down('tbtext[tbFlag=2]').setText("<font color=blue>环节信息</font>");
        this.down('tbtext[tbFlag=3]').setText("<font color=blue>" + records.length + "</font>");
    },
    //3、到达表格复制
    event_mx2GridCopy: function () {
        var records = this.down('grid[gridFlag=mx2]').getView().getSelectionModel().getSelection();
        if (records.length <= 0) {
            Ext.Msg.alert('提示', '请在[任务到达提醒设置]表格里选择需要复制的配置项！');
            return;
        }
        this.copySource = {type: 'mx2', data: records};
        if (this.down('checkbox[name=flow_copy_notice]').getValue()) {
            Ext.Msg.alert('复制提示', '已复制' + records.length + '条任务到达配置项，您可以粘贴到其它流程或其它环节或其它任务到达提醒设置！<br/>复制规则如下：<br/>' +
            '1、粘贴到其它流程:系统将对该流程下[所有环节]的[任务到达提醒设置]进行粘贴<br/>2、粘贴到其它环节:系统将对所有[被粘贴环节]的[任务到达提醒设置]进行粘贴<br/>3、粘贴到任务到达提醒设置:对该设置列表进行粘贴');
        }
        this.down('tbtext[tbFlag=2]').setText("<font color=blue>任务到达提醒</font>");
        this.down('tbtext[tbFlag=3]').setText("<font color=blue>" + records.length + "</font>");
    },
    //4、超时表格复制
    event_mxGridCopy: function () {
        var records = this.down('grid[gridFlag=mx]').getView().getSelectionModel().getSelection();
        if (records.length <= 0) {
            Ext.Msg.alert('提示', '请在[工作超时提醒设置]表格里选择需要复制的配置项！');
            return;
        }
        this.copySource = {type: 'mx', data: records};
        if (this.down('checkbox[name=flow_copy_notice]').getValue()) {
            Ext.Msg.alert('复制提示', '已复制' + records.length + '条工作超时配置项，您可以粘贴到其它流程或其它环节或其它工作超时提醒设置！<br/>复制规则如下：<br/>' +
            '1、粘贴到其它流程:系统将对该流程下[所有环节]的[工作超时提醒设置]进行粘贴<br/>2、粘贴到其它环节:系统将对所有[被粘贴环节]的[工作超时提醒设置]进行粘贴<br/>3、粘贴到工作超时提醒设置:对该设置列表进行粘贴');
        }
        this.down('tbtext[tbFlag=2]').setText("<font color=blue>工作超时提醒</font>");
        this.down('tbtext[tbFlag=3]').setText("<font color=blue>" + records.length + "</font>");
    },
    //5、流程表格粘贴
    event_flowGridPaste: function () {
        //判断复制数据
        var copyRes = this.tool_getCopyString("");
        if (!copyRes) {
            return;
        }

        var me = this;
        var records = this.down('grid[gridFlag=flow]').getView().getSelectionModel().getSelection();
        if (records.length <= 0) {
            Ext.Msg.alert('提示', '请在[发布的流程一览]表格里选择需要被粘贴的流程信息！');
            return;
        }
        var params = {type: me.copySource.type, to_id: records[0].get('id'), from_id: copyRes};
        if (this.down('checkbox[name=flow_paste_notice]').getValue()) {
            Ext.Msg.confirm('粘贴提示', '确定粘贴到选中流程?', function (choose) {
                if (choose == 'no') {
                    return false;
                }
                submitAjax('flowUrge2Service', 'saveToFlow', params, function () {
                    me.pointStore.load();
                });
            });
        } else {
            submitAjax('flowUrge2Service', 'saveToFlow', params, function () {
                me.pointStore.load();
            });
        }
    },
    //6、环节表格粘贴
    event_pointGridPaste: function () {
        //判断复制数据
        var copyRes = this.tool_getCopyString("flow,point");
        if (!copyRes) {
            return;
        }

        var me = this;
        var records = this.down('grid[gridFlag=point]').getView().getSelectionModel().getSelection();
        if (records.length <= 0) {
            Ext.Msg.alert('提示', '请在[' + this.down('panel[panelFlag=rightPanel]').title + ']表格里选择需要被粘贴的环节信息！');
            return;
        }
        var to_id = "";
        for (var i = 0; i < records.length; i++) {
            to_id += records[i].get('urge_no');
            if (i != records.length - 1) {
                to_id += ',';
            }
        }
        var params = {type: me.copySource.type, to_id: to_id, from_id: copyRes};
        if (this.down('checkbox[name=flow_paste_notice]').getValue()) {
            Ext.Msg.confirm('粘贴提示', '确定粘贴到选中流程?', function (choose) {
                if (choose == 'no') {
                    return false;
                }
                submitAjax('flowUrge2Service', 'saveToUrge', params, function () {
                    me.pointStore.load();
                });
            });
        } else {
            submitAjax('flowUrge2Service', 'saveToUrge', params, function () {
                me.pointStore.load();
            });
        }
    },
    //7、到达表格粘贴
    event_mx2GridPaste: function () {
        //判断复制数据
        var copyRes = this.tool_getCopyString("flow,point,mx");
        if (!copyRes) {
            return;
        }

        var me = this;
        var to_id = this.down('tabpanel[tabFlag=rightTab]').P_urge_no;

        var params = {type: me.copySource.type, to_id: to_id, from_id: copyRes};
        if (this.down('checkbox[name=flow_paste_notice]').getValue()) {
            Ext.Msg.confirm('粘贴提示', '确定粘贴到选中流程?', function (choose) {
                if (choose == 'no') {
                    return false;
                }
                submitAjax('flowUrge2Service', 'saveToUrgeMx2', params, function () {
                    me.mx2Store.load();
                });
            });
        } else {
            submitAjax('flowUrge2Service', 'saveToUrgeMx2', params, function () {
                me.mx2Store.load();
            });
        }
    },
    //8、超时表格粘贴
    event_mxGridPaste: function () {
        //判断复制数据
        var copyRes = this.tool_getCopyString("flow,point,mx2");
        if (!copyRes) {
            return;
        }

        var me = this;
        var to_id = this.down('tabpanel[tabFlag=rightTab]').P_urge_no;

        var params = {type: me.copySource.type, to_id: to_id, from_id: copyRes};
        if (this.down('checkbox[name=flow_paste_notice]').getValue()) {
            Ext.Msg.confirm('粘贴提示', '确定粘贴到选中流程?', function (choose) {
                if (choose == 'no') {
                    return false;
                }
                submitAjax('flowUrge2Service', 'saveToUrgeMx', params, function () {
                    me.mxStore.load();
                });
            });
        } else {
            submitAjax('flowUrge2Service', 'saveToUrgeMx', params, function () {
                me.mxStore.load();
            });
        }
    },

    //1、环节表格删除（单条)
    event_pointGriddelete: function (record, grid) {
        var params = {del_id: record.get('urge_no')};
        submitAjax('flowUrge2Service', 'deleteUrge', params, function () {
            grid.getStore().load();
        });
    },
    //2、环节表格删除（多条）
    event_pointGriddeletes: function () {
        var me = this;
        var records = this.down('grid[gridFlag=point]').getView().getSelectionModel().getSelection();
        if (records.length <= 0) {
            Ext.Msg.alert('提示', '请在[' + this.down('panel[panelFlag=rightPanel]').title + ']表格里选择需要批量删除的环节配置信息！');
            return;
        }
        var del_id = "";
        for (var i = 0; i < records.length; i++) {
            del_id += records[i].get('urge_no');
            if (i != records.length - 1) {
                del_id += ',';
            }
        }
        var params = {del_id: del_id};
        if (this.down('checkbox[name=point_delete_notice]').getValue()) {
            Ext.Msg.confirm('删除提示', '确定删除选中环节配置信息?', function (choose) {
                if (choose == 'no') {
                    return false;
                }
                submitAjax('flowUrge2Service', 'deleteUrges', params, function () {
                    me.pointStore.load();
                });
            });
        } else {
            submitAjax('flowUrge2Service', 'deleteUrges', params, function () {
                me.pointStore.load();
            });
        }
    },
    //3、到达表格删除（单条)
    event_mx2Griddelete: function (record, grid) {
        var params = {del_id: record.get('mx2_no')};
        submitAjax('flowUrge2Service', 'deleteUrgeMx2', params, function () {
            grid.getStore().load();
        });
    },
    //4、到达表格删除（多条）
    event_mx2Griddeletes: function () {
        var me = this;
        var records = this.down('grid[gridFlag=mx2]').getView().getSelectionModel().getSelection();
        if (records.length <= 0) {
            Ext.Msg.alert('提示', '请在[任务到达提醒设置]表格里选择需要批量删除的配置项！');
            return;
        }
        var del_id = "";
        for (var i = 0; i < records.length; i++) {
            del_id += records[i].get('mx2_no');
            if (i != records.length - 1) {
                del_id += ',';
            }
        }
        var params = {del_id: del_id};
        if (this.down('checkbox[name=mx2_delete_notice]').getValue()) {
            Ext.Msg.confirm('删除提示', '确定删除选中配置项?', function (choose) {
                if (choose == 'no') {
                    return false;
                }
                submitAjax('flowUrge2Service', 'deleteUrgeMx2s', params, function () {
                    me.mx2Store.load();
                });
            });
        } else {
            submitAjax('flowUrge2Service', 'deleteUrgeMx2s', params, function () {
                me.mx2Store.load();
            });
        }
    },
    //5、到达表格高级删除(多条)
    event_mx2Griddeletes_special: function () {
        var me = this;
        var records = this.down('grid[gridFlag=mx2]').getView().getSelectionModel().getSelection();
        if (records.length <= 0) {
            Ext.Msg.alert('提示', '请在[任务到达提醒设置]表格里选择需要高级删除的配置项！');
            return;
        }
        var del_id = "";
        for (var i = 0; i < records.length; i++) {
            del_id += records[i].get('mx2_no');
            if (i != records.length - 1) {
                del_id += ',';
            }
        }

        var params = {del_id: del_id};
        if (this.down('checkbox[name=mx2_delete_notice]').getValue()) {
            Ext.Msg.confirm('删除提示', '执行该动作将连带删除[本流程所有配置完全相同的配置项]<br/>确定删除?', function (choose) {
                if (choose == 'no') {
                    return false;
                }
                submitAjax('flowUrge2Service', 'deleteUrgeMx2s_special', params, function () {
                    me.mx2Store.load();
                });
            });
        } else {
            submitAjax('flowUrge2Service', 'deleteUrgeMx2s_special', params, function () {
                me.mx2Store.load();
            });
        }
    },
    //6、超时表格删除（单条)
    event_mxGriddelete: function (record, grid) {
        var params = {del_id: record.get('mx_no')};
        submitAjax('flowUrge2Service', 'deleteUrgeMx', params, function () {
            grid.getStore().load();
        });
    },
    //7、超时表格删除（多条）
    event_mxGriddeletes: function () {
        var me = this;
        var records = this.down('grid[gridFlag=mx]').getView().getSelectionModel().getSelection();
        if (records.length <= 0) {
            Ext.Msg.alert('提示', '请在[工作超时提醒设置]表格里选择需要批量删除的配置项！');
            return;
        }
        var del_id = "";
        for (var i = 0; i < records.length; i++) {
            del_id += records[i].get('mx_no');
            if (i != records.length - 1) {
                del_id += ',';
            }
        }

        var params = {del_id: del_id};
        if (this.down('checkbox[name=mx_delete_notice]').getValue()) {
            Ext.Msg.confirm('删除提示', '确定删除选中配置项?', function (choose) {
                if (choose == 'no') {
                    return false;
                }
                submitAjax('flowUrge2Service', 'deleteUrgeMxs', params, function () {
                    me.mxStore.load();
                });
            });
        } else {
            submitAjax('flowUrge2Service', 'deleteUrgeMxs', params, function () {
                me.mxStore.load();
            });
        }
    },
    //8、超时表格高级删除(多条)
    event_mxGriddeletes_special: function () {
        var me = this;
        var records = this.down('grid[gridFlag=mx]').getView().getSelectionModel().getSelection();
        if (records.length <= 0) {
            Ext.Msg.alert('提示', '请在[工作超时提醒设置]表格里选择需要高级删除的配置项！');
            return;
        }
        var del_id = "";
        for (var i = 0; i < records.length; i++) {
            del_id += records[i].get('mx_no');
            if (i != records.length - 1) {
                del_id += ',';
            }
        }

        var params = {del_id: del_id};
        if (this.down('checkbox[name=mx_delete_notice]').getValue()) {
            Ext.Msg.confirm('删除提示', '执行该动作将连带删除[本流程所有配置完全相同的配置项]<br/>确定删除?', function (choose) {
                if (choose == 'no') {
                    return false;
                }
                submitAjax('flowUrge2Service', 'deleteUrgeMxs_special', params, function () {
                    me.mxStore.load();
                });
            });
        } else {
            submitAjax('flowUrge2Service', 'deleteUrgeMxs_special', params, function () {
                me.mxStore.load();
            });
        }
    },

    //工具-将复制资源转换成字符串，如果复制资源为空或不符合的复制信息，则返回false
    tool_getCopyString: function (inValidTypes) {
        //空串
        if (this.copySource.type == '' || this.copySource.data.length < 1) {
            Ext.Msg.alert('提示', '请先执行复制后再进行粘贴');
            return false;
        }

        //判断是否符合复制信息
        var typeStrs = inValidTypes.split(',');
        for (var i = 0; i < typeStrs.length; i++) {
            if (typeStrs[i] == this.copySource.type) {
                Ext.Msg.alert('提示', '根据粘贴规则,您所复制的配置信息无法粘贴到当前表格!请仔细阅读规则!');
                return false;
            }
        }

        //转换成字符串
        var res = "";
        for (var i = 0; i < this.copySource.data.length; i++) {
            if (this.copySource.type == "flow") {
                res += this.copySource.data[i].get('id');
            } else if (this.copySource.type == "point") {
                res += this.copySource.data[i].get('urge_no');
            } else if (this.copySource.type == "mx2") {
                res += this.copySource.data[i].get('mx2_no');
            } else {
                res += this.copySource.data[i].get('mx_no');
            }
            if (i != this.copySource.data.length - 1) {
                res += ',';
            }
        }
        return res;
    }
});
