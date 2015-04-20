/**
 * 编程环境 IDEA.
 * 编写者: 王少伟
 * 主题:【规律排班管理】
 * 时间: 2013-06-10 下午4:36
 */
Ext.require('Ext4.SB.Model.RegPbInfo');
Ext.require('Ext4.Com.Model.departuserDatas_Model');
Ext.onReady(function () {
    /*
     *  类窗体定义
     *Ext.regPb 规律排班管理
     *Ext.addRegPb 添加规律排班
     */

    //------------------------数据源------------------------
    //本月1号
    var date1 = new Date();
    date1.setDate(1);
    date1 = date1.format('Y-m-d');
    //次月1号
    var date2 = new Date();
    date2.setMonth(date2.getMonth() + 1);
    date2.setDate(1);
    date2 = date2.format('Y-m-d');
    //排班grid
    var store_pb = Ext.create('Ext.data.Store', {
        model: 'Ext4.SB.Model.RegPbInfo',
        autoLoad: true,
        proxy: {
            extraParams: {
                start: 0, limit: 20, searchKey: '%', minDate: date1, maxDate: date2
            },
            type: 'ajax',
            url: 'SysPbAction.ered?reqCode=queryRegPbInfo',
            reader: {
                type: 'json',
                totalProperty: 'TOTALCOUNT', // 记录总数
                root: 'ROOT' // Json中的列表数据根节点
            }
        },
        listeners: {
            load: function (store) {
                Ext.getCmp('emp_grid').collapse();
            }
        }
    });
    //引用某排班的成员grid
    var store_pb_emp = Ext.create('Ext.data.Store', {
        model: 'Ext4.Com.Model.departuserDatas_Model',

        proxy: {
            extraParams: {
                pb_no: ''
            },
            type: 'ajax',
            url: 'SysPbAction.ered?reqCode=queryRegPbInfoMX',
            reader: {
                type: 'json',
                totalProperty: 'TOTALCOUNT', // 记录总数
                root: 'ROOT' // Json中的列表数据根节点
            }
        },
        listeners: {
            load: function (store) {
                Ext.getCmp('emp_grid').expand();
            }
        }
    });
    //时间下拉框选项
    var store_time1 = ['7:50', '8:00', '8:10', '8:20', '8:30', '8:40', '8:50', '9:00', '9:10', '9:20', '9:30', '9:40', '9:50', '10:00'];
    var store_time2 = ['16:50', '17:00', '17:10', '17:20', '17:30', '17:40', '17:50', '18:00', '18:10', '18:20', '18:30', '18:40', '18:50', '19:00'];
    var store_time3 = ['11:20', '11:30', '11:40', '11:50', '12:00', '12:10', '12:20', '12:30'];
    var store_time4 = ['12:50', '13:00', '13:10', '13:20', '13:30', '13:40', '13:50', '14:00'];

    //------------------------类窗体定义---------------------------
    //规律排班窗体
    Ext.define('Ext.regPb', {
        extend: 'Ext.UXWindow1',
        xtype: "window",
        title: "规律排班管理",
        closable: false,
        constrain: true,
        maximizable: true,
        collapsible: true,
        width: 1121,
        height: 536,
        layout: "border",
        pageY: 20,
        operWin: '操作窗体',
        initComponent: function () {
            this.tbar = [
                {
                    text: "添加",
                    iconCls: 'addIcon',
                    handler: this.event_add,
                    scope: this
                }
            ]
            this.items = [
                {
                    xtype: "form",
                    id: 'pb_query_form',
                    title: "筛选框",
                    labelWidth: 100,
                    labelAlign: "left",
                    layout: "form",
                    region: "north",
                    height: 145,
                    collapseMode: "standard",
                    collapsible: true,
                    titleCollapse: true,
                    collapsed: false,
                    split: true,
                    items: [
                        {
                            xtype: "datefield",
                            fieldLabel: "起始时间",
                            anchor: "",
                            width: 135,
                            editable: false,
                            format: 'Y-m-d',
                            name: 'minDate',
                            value: date1,
                            allowBlank: false
                        },
                        {
                            xtype: "datefield",
                            fieldLabel: "结束时间",
                            anchor: "",
                            width: 135,
                            editable: false,
                            format: 'Y-m-d',
                            name: 'maxDate',
                            value: date2,
                            allowBlank: false
                        },
                        {
                            xtype: "textfield",
                            fieldLabel: "关键字",
                            anchor: "",
                            width: 135,
                            name: 'searchKey',
                            emptyText: '输入关键字模糊查找...'
                        },
                        {
                            xtype: "button",
                            text: "开始筛选",
                            iconCls: 'acceptIcon',
                            handler: this.event_query,
                            scope: this
                        }
                    ]
                },
                {
                    xtype: 'grid',
                    id: 'emp_grid',
                    store: store_pb_emp,
                    region: 'east',
                    width: 264,
                    split: true,
                    titleCollapse: true,
                    collapsible: true,
                    collapsed: true,
                    title: '引用该规则的成员',
                    columns: [{header: '部门', dataIndex: 'deptname'},
                        {header: '用户编号', dataIndex: 'userid'},
                        {header: '用户姓名', dataIndex: 'username'}
                    ],
                    viewConfig: {forceFit: true},
                    loadMask: {msg: '正在加载引用成员，请稍候...'}

                },
                {
                    xtype: "grid",
                    id: 'pb_grid',
                    title: "",
                    region: "center",
                    split: true,
                    store: store_pb,
                    columns: [
                        {
                            header: "编号",
                            sortable: true,
                            resizable: true,
                            dataIndex: "pb_no",
                            width: 53
                        },
                        {
                            header: "名称",
                            sortable: true,
                            resizable: true,
                            dataIndex: "pb_name",
                            width: 100
                        },
                        {
                            header: "日期",
                            sortable: true,
                            resizable: true,
                            dataIndex: "pb_date",
                            width: 77
                        },
                        {
                            header: "上班？",
                            sortable: true,
                            resizable: true,
                            dataIndex: "pb_iswork",
                            width: 41,
                            renderer: function (v) {
                                return v == 1 ? "是" : "";
                            }
                        },
                        {
                            header: "有薪？",
                            sortable: true,
                            resizable: true,
                            dataIndex: "pb_ispay",
                            width: 41,
                            renderer: function (v) {
                                return v == 1 ? "是" : "";
                            }
                        },
                        {
                            header: "上班时间",
                            sortable: true,
                            resizable: true,
                            dataIndex: "pb_start_work_time",
                            width: 66
                        },
                        {
                            header: "下班时间",
                            sortable: true,
                            resizable: true,
                            dataIndex: "pb_end_work_time",
                            width: 66
                        },
                        {
                            header: "午休开始时间",
                            sortable: true,
                            resizable: true,
                            dataIndex: "pb_start_wuxiu_time",
                            width: 86
                        },
                        {
                            header: "午休结束时间",
                            sortable: true,
                            resizable: true,
                            dataIndex: "pb_end_wuxiu_time",
                            width: 86
                        },
                        {
                            header: "备注",
                            sortable: true,
                            resizable: true,
                            dataIndex: "pb_explain"
                        },
                        {
                            header: "编辑",
                            width: 32,
                            dataIndex: 'pb_no',
                            renderer: function () {
                                return '<a href=# title="编辑该条排班信息"><img src="' + webContext + '/resource/image/ext/edit1.png"/></a>';
                            }
                        },
                        {
                            header: "删除",
                            width: 32,
                            dataIndex: 'pb_no',
                            renderer: function (v) {
                                return '<a href=# title="删除该条排班信息"><img src="' + webContext + '/resource/image/ext/delete.png"/></a>';
                            }
                        }
                    ],
                    bbar: new Ext.PagingToolbar({displayInfo: true, pageSize: 20, store: store_pb}),
                    listeners: {
                        itemdblclick: this.event_gridDblClick,
                        cellclick: this.event_cellClick,
                        scope: this
                    },
                    viewConfig: {forceFit: true},
                    loadMask: {msg: '正在加载表格数据,请稍等...'}
                }
            ]
            this.callParent(arguments);
            this.operWin = new Ext.addRegPb();//添加规律排班窗体
        },
        //添加规律排班
        event_add: function (btn, event) {
            Ext.getCmp('pb_form').getForm().reset();
            this.operWin.isInsert = true;
            this.operWin.show();
        },
        //遍历节点找寻数据（如遇数据展开)
        searchNode: function (node, store_tmp, win) {
            var nodeArray = node.childNodes;
            for (var i = 0; i < nodeArray.length; i++) {
                //叶子节点
                if (nodeArray[i].leaf) {
                    var tmpChoose = false;
                    //判断是否相同的id
                    store_tmp.each(function (rec) {
                        if (rec.get('userid') == nodeArray[i].id) {
                            nodeArray[i].attributes.checked = true;
                            node.expand();
                            tmpChoose = true;
                        } else {
                            nodeArray[i].attributes.checked = false;
                        }
                    });
                    return tmpChoose;
                } else {
                    //继续搜索下一级
                    var res = win.searchNode(nodeArray[i], store_tmp, win);
                    if (res) {
                        node.expand();
                    }
                    return res;
                }
            }
        },
        //表格双击事件
        event_gridDblClick: function (pGrid, record, item, index, e, eOpts) {
            this.operWin.isInsert = false;
            var pb_form = Ext.getCmp('pb_form').getForm();
            pb_form.loadRecord(record);

            //参数转换
            pb_form.findField('pb_iswork').setValue(record.get('pb_iswork') == 1);
            pb_form.findField('pb_ispay').setValue(record.get('pb_ispay') == 1);

            //加载成员数据
            var tree_dept = Ext.getCmp('tree_dept');
            tree_dept.collapseAll();
            var rootNode = tree_dept.getRootNode();
            //树成员引用数据
            this.searchNode(rootNode, store_pb_emp, this);

            this.operWin.show();
            Ext.Msg.alert('提示', '请自行选择引用此规则的人员');
        },
        //表格单元格点击事件
        event_cellClick: function (pGrid, rowIndex, colIndex, e) {
            var store_tmp = pGrid.getStore();
            var record = store_tmp.getAt(rowIndex);

            //加载引用成员
            store_pb_emp.getProxy().extraParams.pb_no = record.get('pb_no');
            store_pb_emp.load();

            //修改弹框、加载数据
            if (colIndex == 10) {
                this.event_gridDblClick(pGrid, rowIndex, e);
            }
            //删除排班操作(只能删除将来的排班)
            else if (colIndex == 11) {
                var date = new Date(record.get('pb_date'));
                if (date <= new Date()) {
                    Ext.Msg.alert('提示', '不能删除以前（包括今天）的排班记录!!');
                    return;
                }

                //删除提示
                Ext.Msg.confirm('提示', '删除操作一旦执行将无法恢复,确定继续？', function (choose) {
                    if (choose == "no") {
                        return;
                    }

                    //执行删除
                    Ext.Ajax.request({
                        url: 'SysPbAction.ered?reqCode=delRegPbInfo',
                        success: function (resp, opts) {
                            var respText = Ext.JSON.decode(resp.responseText);
                            Ext.Msg.alert('提示', respText.msg);
                            if (respText.success) {
                                store_tmp.remove(record);
                            }
                        },
                        failure: function () {
                            Ext.Msg.alert('提示', '当前网络忙!<br/>请刷新后重试~');
                        },
                        params: {pb_no: record.get('pb_no')}
                    });
                });
            }
        },
        //筛选事件
        event_query: function (btn, e) {
            //获取参数
            var form = Ext.getCmp('pb_query_form').getForm();
            if (!form.isValid()) {
                return;
            }
            var gridPanel = Ext.getCmp('pb_grid');
            var minDate = new Date(form.findField('minDate').getValue()).format('Y-m-d');
            var maxDate = new Date(form.findField('maxDate').getValue()).format('Y-m-d');
            var searchKey = form.findField('searchKey').getValue();

            //加载数据
            store_pb.getProxy().extraParams.minDate = minDate;
            store_pb.getProxy().extraParams.maxDate = maxDate;
            store_pb.getProxy().extraParams.searchKey = searchKey;
            store_pb.load();
        }
    });

    //添加规律排班窗体
    Ext.define('Ext.addRegPb', {
        extend: 'Ext.UXWindow2',
        xtype: "window",
        title: "添加规律排班",
        width: 711,
        height: 588,
        constrain: true,
        collapsible: true,
        closeAction: 'hide',
        pageY: 20,
        layout: "border",
        modal: true,
        isInsert: true,//是否是添加 操作
        initComponent: function () {
            this.items = [
                {
                    xtype: "treepanel",
                    id: 'tree_dept',
                    autoScroll: true,
                    titleCollapse: true,
                    collapsible: true,
                    root: new Ext.tree.AsyncTreeNode({id: 'root', expanded: true}),
                    rootVisible: false,
                    dataUrl: 'SysPbAction.ered?reqCode=queryDeptTreeWithUser',
                    title: "选择部门人员（可多选）",
                    region: "west",
                    width: 230,
                    split: true
                },
                {
                    xtype: "form",
                    id: 'pb_form',
                    title: "",
                    labelWidth: 100,
                    labelAlign: "left",
                    layout: "form",
                    region: "center",
                    split: true,
                    items: [
                        {
                            xtype: "datefield",
                            fieldLabel: "排班日期",
                            anchor: "100%",
                            format: 'Y-m-d',
                            name: 'pb_date',
                            allowBlank: false,
                            editable: false,
                            minValue: new Date()
                        },
                        {
                            xtype: "textfield",
                            fieldLabel: "排班名称",
                            anchor: "100%",
                            name: 'pb_name',
                            allowBlank: false,
                            maxLength: 10
                        },
                        {
                            xtype: "checkbox",
                            fieldLabel: "工作日",
                            boxLabel: "",
                            anchor: "100%",
                            name: 'pb_iswork'
                        },
                        {
                            xtype: "checkbox",
                            fieldLabel: "有薪",
                            boxLabel: "",
                            anchor: "100%",
                            name: 'pb_ispay'
                        },
                        {
                            xtype: "combo",
                            triggerAction: "all",
                            fieldLabel: "上班时间",
                            anchor: "100%",
                            name: 'pb_start_work_time',
                            editable: false,
                            value: '9:00',
                            store: store_time1
                        },
                        {
                            xtype: "combo",
                            triggerAction: "all",
                            fieldLabel: "下班时间",
                            anchor: "100%",
                            name: 'pb_end_work_time',
                            editable: false,
                            value: '18:00',
                            store: store_time2
                        },
                        {
                            xtype: "combo",
                            triggerAction: "all",
                            fieldLabel: "午休开始时间",
                            anchor: "100%",
                            name: 'pb_start_wuxiu_time',
                            editable: false,
                            value: '12:00',
                            store: store_time3
                        },
                        {
                            xtype: "combo",
                            triggerAction: "all",
                            fieldLabel: "午休结束时间",
                            anchor: "100%",
                            name: 'pb_end_wuxiu_time',
                            editable: false,
                            value: '13:30',
                            store: store_time4
                        },
                        {
                            xtype: "textarea",
                            fieldLabel: "备注",
                            anchor: "100%",
                            height: 280,
                            name: 'pb_explain',
                            maxLength: 30
                        },
                        {xtype: 'textfield', name: 'pb_no', hidden: true}//隐藏的排班编号
                    ]
                }
            ];
            this.buttons = [{text: '保存', iconCls: 'acceptIcon', handler: this.event_submitForm, scope: this}];
            this.callParent(arguments);
        },
        //提交表单
        event_submitForm: function (btn, e) {
            //表单
            var form = Ext.getCmp('pb_form').getForm();
            var url = this.isInsert ? "SysPbAction.ered?reqCode=addRegPbInfo" : "SysPbAction.ered?reqCode=updRegPbInfo";
            if (!form.isValid())
                return;

            //参数转换
            var pb_iswork = form.findField('pb_iswork').getValue() ? 1 : 0;
            var pb_ispay = form.findField('pb_ispay').getValue() ? 1 : 0;
            //部门树选择的人员数据整理
            var tree_dept = Ext.getCmp('tree_dept');
            var emps = tree_dept.getChecked();
            if (emps.length == 0) {
                Ext.Msg.alert('提示', '请在左边树图选择需要引用此次排班规则的人员！');
                return;
            }
            var users = "";//用户id群,用逗号分隔开
            Ext.each(emps, function (node) {
                users += node.id + ",";
            });
            users = users.substr(0, users.length - 1);

            //表单提交
            form.submit({
                url: url,
                waitTitle: '提示',
                method: 'POST',
                waitMsg: '正在处理数据,请稍候...',
                success: function (form, action) {
                    Ext.MessageBox.alert('提示', action.result.msg);
                    store_pb.load();
                },
                failure: function (form, action) {
                    Ext.MessageBox.alert('提示', '数据保存失败');
                },
                params: {pb_iswork: pb_iswork, pb_ispay: pb_ispay, users: users}
            });
        },
        //取消提交隐藏窗口
        event_cancelForm: function (btn, e) {
            //重置表单
            var form = Ext.getCmp('pb_form').getForm();
            form.reset();

            //隐藏
            this.hide();
        }
    });

    //------------------------实体---------------------------
    var regPb = new Ext.regPb();
    regPb.show();

    //小化表单
    setTimeout(function () {
        Ext.getCmp('pb_query_form').collapse();
    }, 1500);


});