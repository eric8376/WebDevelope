/**
 * 编程环境 IDEA.
 * 编写者: 王少伟
 * 主题:【人员工作安排查询】
 * 时间: 2013-06-10 下午4:36
 */

/**
 * ★☆使用需要导入★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★
 <eRedG4:import src="/systembase/js/commonJs.js"/>
 <eRedG4:import src="/systembase/js/user_work_status_query.js"/>
 * 类声明
 * 状态查询主窗体  UWSQ.statusQueryWin
 *            ★hideTree()     隐藏树接口
 *            ★showTree()     显示树接口
 *            ★setDeptId(deptid,isRefresh)      设置部门ID并加载数据接口 (isRefresh为空时默认刷新,为false时不刷新)
 *
 *
 *
 * 信息模板选择组件  UWSQ.WorkStatusField
 *            ★displayField    显示的依据字段
 *            ★valueField     显示树接口
 *            ★name           上传时候的字段名称
 *            ★allowBlank     是否允许为空
 *            ★winSettings     {}弹出的窗体设置参数
 *            ★treeRootId     :'001009',//默认设计部
 *            ...
 *★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆
 *            ★getRawValue()     rawValue数据
 *            ★getValue()        value数据
 *            ★getOtherValue()   选中的record的其它数据
 *            ★loadField2    当所在的表单loadRecord时调用此方法 将根据id转换成value
 */
//增加个仿命名空间，避免冲突
var UWSQ = {};
Ext.define('UserWorkStatusInDept', {
    extend: 'Ext.data.Model',
    fields: ['id_', 'proc_inst_id_', 'proc_def_id_', 'name_', 'create_time_', 'userid', 'username', 'deptid', 'account', {
        name: 'is_same',
        defaultValue: false
    }, 'ordernumber']
});

//--------------------------------数据源
//用户工作状态表
UWSQ.store_user_work_status =
    Ext.create('Ext.data.Store', {
        model: 'UserWorkStatusInDept',
        proxy: {
            type: 'ajax',
            url: 'UserWorkMgrAction.ered?reqCode=getUserWorkStatusInDept',
            reader: {
                type: 'json',
                totalProperty: 'TOTALCOUNT', // 记录总数
                root: 'ROOT' // Json中的列表数据根节点
            }
        }, listeners: {
            beforeload: function (sto) {
                syncVar = true;
                elems = [];
            },
            load: function (sto) {
                var tempUserName = "存储上一个人的名字";
                sto.each(function (rec) {
                    if (tempUserName == rec.get('username')) {
                        rec.set('is_same', true);
                    }
                    tempUserName = rec.get('username');
                });
            }
        }
    });

//获取随机颜色
function getColor() {
    return "green";
    //return "rgb("+parseInt(Math.random()*255)+","+parseInt(Math.random()*255)+","+parseInt(Math.random()*255)+")";
}
//颜色随机替换
var elems = [];
var syncVar = false;
var elemid = 1;
function colorChange() {
    for (var i = 0; i < elems.length; i++) {
        if (syncVar) {
            syncVar = false;
            break;
        }
        var spanElem = document.getElementById("temp_span_" + elems[i]);
        if (spanElem) {
            document.getElementById("temp_span_" + elems[i]).style.color = getColor();
        }
    }
}
//setInterval(colorChange,800);


//--------------------------------渲染
//渲染状态
UWSQ.RenderStatus = function RenderStatus(v, m, record) {
    if (record.get('is_same')) {
        return '<span style="color:#999;">受委托了多条任务>></span>';
    }

    if (v == null || !v) {
        var tmpid = elemid++;
        elems.push(tmpid);
        syncVar = true;
        return "<span id=\"temp_span_" + tmpid + "\" style=\"color:" + getColor() + "\">空闲中...</span>";
    }
    return "工作中...";
}
//渲染是否为空
UWSQ.RenderIsNull = function RenderIsNull(v, m, record) {
    if (record.get('is_same')) {
        return '<span style="color:#999;">' + v + '</span>';
    }

    if (v == null || !v) {
        return "<font color=green>无</font>";
    }

    return v;
}

//渲染人员（去重)
UWSQ.RenderClearRepeat = function RenderClearRepeat(v, metadata, record, row, col, store) {
    if (record.get('is_same')) {
        return '<span style="color:#999;">' + v + '</span>';
    }
    return v;
}


//---------------------------------类定义
//状态查询主窗体
Ext.define('UWSQ.statusQueryWin', {
    extend: 'Ext.UXWindow1',
    xtype: "window",
    title: "人员工作状态查询",
    width: 1123,
    height: 603,
    layout: "border",
    tree1: '',//树图
    grid1: '',//表格图
    infoFlag: true,

    initComponent: function () {
        //部门树
        this.tree1 = Ext.getUXTree1({
            width: 230,
            region: 'west',
            title: '部门列表',
            dataUrl: 'SysPbAction.ered?reqCode=queryDeptTree'
        });
        //历史箱
        this.grid1 = new Ext.UXGrid1({
            region: 'center',
            store: UWSQ.store_user_work_status,
            addFlag: false,
            delFlag: false,
            editFlag: false,
            columns: [
                {header: '部门编号', dataIndex: 'deptid', hidden: true, renderer: UWSQ.RenderClearRepeat},
                {header: '用户账号', dataIndex: 'account', renderer: UWSQ.RenderClearRepeat},
                {header: '用户名', dataIndex: 'username', renderer: UWSQ.RenderClearRepeat},
                {header: '状态', dataIndex: 'id_', renderer: UWSQ.RenderStatus},
                {header: '工程单号', dataIndex: 'ordernumber'},
                {header: '流程ID', dataIndex: 'proc_inst_id_', renderer: UWSQ.RenderIsNull, hidden: true},
                {header: '环节ID', dataIndex: 'proc_def_id_', renderer: UWSQ.RenderIsNull, hidden: true},
                {header: '流程主题', dataIndex: 'name_', renderer: UWSQ.RenderIsNull},
                {header: '开始时间', dataIndex: 'create_time_', renderer: UWSQ.RenderIsNull}
            ]
        });

        //需要详细信息，则显示窗口、绑定事件
        if (this.infoFlag) {
            this.grid1.on('rowclick', this.event_queryWorkInfo, this);
            this.infoPanel = new Ext.panel.Panel({
                layout: 'fit',
                collapsed: true,
                region: 'east',
                width: '50%',
                frame: false,
                split: true,
                collapsible: true,
                titleCollapse: true,
                collapseMode: 'mini',
                items: [new UTM.mainBoard()]
            });
            this.items = [
                this.tree1, this.grid1, this.infoPanel
            ];
        } else {
            this.items = [
                this.tree1, this.grid1
            ];
        }


        //事件绑定
        this.tree1.on("click", this.treeClick, this);
        this.callParent(arguments);
    },
    //树单击叶子 事件
    treeClick: function (node) {
        if (!node.leaf) {
            //return false;
        }

        //加载数据
        UWSQ.store_user_work_status.getProxy().extraParams.searchKey = this.grid1.searchKey.getValue();
        this.setDeptId(node.id);
    },
    //隐藏树接口
    hideTree: function () {
        this.tree1.hide();
    },
    //显示树接口
    showTree: function () {
        this.tree1.show();
    },
    //设置部门ID并加载数据接口 (isRefresh为空时默认刷新,为false时不刷新)
    setDeptId: function (deptid, isRefresh) {
        UWSQ.store_user_work_status.getProxy().extraParams.deptid = deptid;
        if (isRefresh && isRefresh == false)
            return;
        //加载
        UWSQ.store_user_work_status.load();
    },
    //查询工作状态
    event_queryWorkInfo: function (pGrid, rowIndex) {
        var tempRecord = pGrid.getStore().getAt(rowIndex);
        this.infoPanel.expand();
        this.infoPanel.setTitle(tempRecord.get('username') + ' <span class=commoncss>的工作详细情况</span>');
        UTM.store_current_job.getProxy().extraParams.assignee = tempRecord.get('account');
        UTM.store_all_job.getProxy().extraParams.assignee = tempRecord.get('account');
        UTM.store_all_job.load();
    }

});


//工作信息选择组件
Ext.define('UWSQ.WorkStatusField', {
    extend: 'Ext.container.Container',
    xtype: "container",
    autoEl: "div",
    width: 200,
    height: 22,
    layout: "border",
    displayField: 'username',
    valueField: 'account',
    name: 'account',
    allowBlank: false,
    winSettings: {},
    treeRootId: 'root-001009',//默认设计部

    textField1: '',
    textField2: '',
    selectBtn: '',
    gridPanel: '',
    operWin: '',

    initComponent: function () {
        var me = this;
        //创建弹开的窗体
        this.operWin = new UWSQ.statusQueryWin(Ext.apply({
            infoFlag: false,
            modal: true,
            closable: true,
            closeAction: "hide"
        }, this.winSettings));
        this.operWin.tree1.setRootNode(new Ext.tree.AsyncTreeNode({id: this.treeRootId, text: '根目录', expanded: true}));

        //创建组件
        this.gridPanel = this.operWin.grid1;
        this.textField1 = new Ext.form.TextField({region: "center", allowBlank: this.allowBlank});
        this.textField2 = new Ext.form.TextField({region: "south", hidden: true, name: this.name});
        this.selectBtn = new Ext.Button({text: "选择", region: "east", handler: this.event_filed1Focus, scope: this});
        this.items = [this.textField1, this.selectBtn, this.textField2];

        //绑定事件
        this.gridPanel.on("rowclick", this.event_rowclick, this);
        this.textField1.on("focus", this.event_filed1Focus, this);
        this.callParent(arguments);

        //加载数据
        UWSQ.store_user_work_status.getProxy().extraParams.deptid = this.treeRootId;
        UWSQ.store_user_work_status.on("load", function (store) {

            store.each(function (rec) {
                if (rec.get('deptid') == me.treeRootId) {
                    UWSQ.store_user_work_status.remove(rec);
                }
            });
        }, this);
        UWSQ.store_user_work_status.load();
    },
    //获取RawValue
    getRawValue: function () {
        return this.textField1.getValue();
    },
    //获取值
    getValue: function () {
        return this.textField2.getValue();
    },
    //获取某个值
    getOtherValue: function (fieldName) {
        var rec = this.gridPanel.getSelectionModel().getSelections()[0];
        if (rec)
            return rec.get(fieldName);
    },
    //选择
    event_rowclick: function (pGrid, rowIndex, e) {
        var me = this;
        var record = pGrid.getStore().getAt(rowIndex);
        var id_ = record.get("id_");
        if (id_ && id_ != null) {
            Ext.Msg.confirm('提示', '该员工处于工作状态中，是否继续选择!', function (choose) {
                if (choose == "no") {
                    return;
                }
                me.textField1.setValue(record.get(me.displayField));
                me.textField2.setValue(record.get(me.valueField));
                me.operWin.hide();
            });
        } else {
            me.textField1.setValue(record.get(me.displayField));
            me.textField2.setValue(record.get(me.valueField));
            me.operWin.hide();
        }
    },
    //Field1获得焦点
    event_filed1Focus: function () {
        this.operWin.show();
    },
    //Field2值改变加载Field1
    loadField2: function () {
        var me = this;
        var value = me.textField2.getValue();
        me.textField1.setValue("");
        me.gridPanel.getStore().each(function (rec) {
            if (rec.get(me.valueField) == value) {
                me.textField1.setValue(rec.get(me.displayField));
            }
        });
    }
});

//调用表单组件示例
//Ext.onReady(function(){
//    var win=new Ext.window.Window({layout:'fit',items:[new UWSQ.WorkStatusField()]});
//    win.show();
//});
