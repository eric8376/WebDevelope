/**
 * 编程环境 IDEA.
 * 编写者: 王少伟
 * 主题:【快捷查询sql管理】
 * 时间: 2013-06-15  下午5:06
 */


/**
 * 包声明
 * QSM
 * 类声明
 *SQL显示主面板 QSM.mainPanel
 *
 */

//包声明
var QSM = {};
//所对应类别
QSM.entityClass = "com.common.model.hibernateMapping.T_SB.QuickSql";
Ext.define('listAll', {
    extend: 'Ext.data.Model',
    fields: [{name: 'sql_no'}, {name: 'ref_no'}, {name: 'name'}, {name: 'explain'}, {name: 'columns'}, {name: 'after_sql'}, {name: 'create_date'}, {name: 'create_user'}, {name: 'last_upd_date'},
        {name: 'last_upd_user'}]
});
//--------------------------------数据源
//SQL记录表
QSM.store_QuickSql = Ext.create('Ext.data.Store', {
    model: 'listAll',

    proxy: {
        extraParams: {
            ref_no: '89757'
        },
        type: 'ajax',
        url: 'Quick.ered?reqCode=listAll',
        reader: {
            type: 'json',
            totalProperty: 'TOTALCOUNT', // 记录总数
            root: 'ROOT' // Json中的列表数据根节点
        }
    }
});


//导出SQL记录表(所有SQL数据)
QSM.store_QuickSqlAll = Ext.create('Ext.data.Store', {

    model: 'listAll',
    proxy: {
        extraParams: {
            ref_no: '89757', searchKey: '%'
        },
        type: 'ajax',
        url: 'Quick.ered?reqCode=listAll',
        reader: {
            type: 'json',
            totalProperty: 'TOTALCOUNT', // 记录总数
            root: 'ROOT' // Json中的列表数据根节点
        }
    },
    listeners: {
        //加载后导出sql
        load: function (store) {
            var me = this;
            var mes = "insert into T_SB_QUICK_SQL(sql_no,ref_no,name,explain,columns,after_sql,create_date,create_user,last_upd_date,last_upd_user)<br/>";
            var index = 0;
            store.each(function (rec) {
                index++;
                mes += "select ";
                for (var i = 0; i < me.fields.length; i++) {
                    if (i == 6 || i == 8) {
                        mes += "to_date('" + rec.get(me.fields.items[i].name) + "','yyyy-mm-dd hh24:mi:ss')";
                    } else {
                        mes += "'" + rec.get(me.fields.items[i].name) + "'";
                    }
                    if (i != me.fields.length - 1) {
                        mes += ",";
                    }
                }
                mes += " from dual<br/>";
                if (index != store.getCount()) {
                    mes += "union all<br/>";
                }
            });

            //show窗体
            var clip = new ZeroClipboard.Client(); //复制到剪帖板
            new Ext.window.Window({
                bodyStyle: 'padding:8px;background:#fff;color:red',
                title: '<font color=blue><b>请保存下列sql语句</b></font>',
                html: "<div id='copy-window'>" + mes + "</div>",
                autoScroll: true,
                width: document.body.clientWidth * 0.8,
                height: document.body.clientHeight * 0.9,
                listeners: {
                    move: function () {
                        clip.reposition('copy-window');
                    },
                    destroy: function () {
                        clip.div.parentNode.removeChild(clip.div);
                    }
                }
            }).show();
            clip.setHandCursor(true); // 设置鼠标为手型
            clip.setText(mes.replace(new RegExp("<br/>", "g"), "\r\n")); // 设置要复制的文本。
            clip.glue("copy-window"); // 和上一句位置不可调换
            clip.addEventListener("complete", function () {
                Ext.Msg.alert("剪贴板", "已将sql语句复制到剪帖板!");
            });
        }
    }
});


//用户信息对照表
var userInfo = "";
//加载用户信息对照表
Ext.Ajax.request({
    url: 'SystemBaseAction.ered?reqCode=getAllUser',
    success: function (response, opts) {
        userInfo = Ext.JSON.decode(response.responseText);
        userInfo.IDsystem = "系统";
        QSM.store_QuickSql.load();
    },
    failure: function (response, opts) {
        Ext.MessageBox.alert('提示', '读取用户索引表失败');
    }
});


//操作窗口
Ext.define('QSM.operWin', {
    extend: 'Ext.UXWindow2',
    xtype: "window",
    title: "添加或者修改SQL语句",
    width: 951,
    height: 461,
    layout: "fit",
    isInsert: true,
    initComponent: function () {
        this.items = [
            {
                xtype: "form",
                id: 'QSM.operForm',
                title: "",
                labelWidth: 100,
                labelAlign: "left",
                layout: "form",
                padding: "8",
                items: [
                    {
                        xtype: "textfield",
                        fieldLabel: "引用编号<font color=red>(*唯一)</font>",
                        anchor: "100%",
                        maxLength: 50,
                        name: 'ref_no',
                        allowBlank: false
                    },
                    {
                        xtype: "textfield",
                        fieldLabel: "描述名称",
                        anchor: "100%",
                        maxLength: 20,
                        name: 'name',
                        allowBlank: false
                    },
                    {
                        xtype: "textarea",
                        fieldLabel: "查询列描述<br/>（用,分隔）",
                        anchor: "100%",
                        height: 80,
                        maxLength: 800,
                        name: 'columns',
                        allowBlank: false
                    },
                    {
                        xtype: "textarea",
                        fieldLabel: "from后面(包括from)的完整语句",
                        anchor: "100%",
                        height: 200,
                        maxLength: 1000,
                        name: 'after_sql',
                        allowBlank: false
                    },
                    {
                        xtype: "textfield",
                        fieldLabel: "备注",
                        anchor: "100%",
                        name: 'explain'
                    },
                    {xtype: 'textfield', name: 'sql_no', hidden: true}
                ]
            }
        ];

        //底部按钮
        this.buttons = [
            {text: '保存', iconCls: 'acceptIcon', handler: this.saveForm, scope: this}
        ];

        //绑定事件
        this.on("show", function () {
            if (this.isInsert) {
                Ext.getCmp('QSM.operForm').getForm().reset()
            }
        }, this);
        this.callParent(arguments);
    },
    //保存表单
    saveForm: function () {
        var me = this;
        var form = Ext.getCmp('QSM.operForm').getForm();
        if (!form.isValid())
            return;

        //提交
        var url = this.isInsert ? 'Quick.ered?reqCode=addData' : 'Quick.ered?reqCode=updData';
        form.submit({
            url: url,
            waitTitle: '提示',
            method: 'POST',
            waitMsg: '正在处理数据,请稍候...',
            success: function (form, action) {
                Ext.MessageBox.alert('提示', "已保存!");
                QSM.store_QuickSql.load();
                me.hide();
            },
            failure: function (form, action) {
                Ext.MessageBox.alert('提示', "未成功保存，请检查引用编号是否唯一!");
            },
            params: {
                entityClass: QSM.entityClass,
                create_date: '{sysdate}',
                create_user: '{userid}',
                last_upd_date: '{sysdate}',
                last_upd_user: '{userid}'
            }
        });
    }
});


//---------------------------渲染---------------------------
//发送人转换成名字
function nameRender(v) {
    return v ? eval("userInfo.ID" + v) : '无';
}

//SQL显示主面板
Ext.define('QSM.mainPanel', {
    extend: 'Ext.UXGrid1',
    title: '<span class="commoncss">快捷SQL查询语句管理</span>',
    columns: [
        {header: '编号', dataIndex: 'sql_no'},
        {header: '引用编号', dataIndex: 'ref_no'},
        {header: '描述名称', dataIndex: 'name'},
        {header: '备注', dataIndex: 'explain'},
        {header: '查询的字段(,分隔)', dataIndex: 'columns'},
        {header: 'from后面(包括from)后的语句', dataIndex: 'after_sql'},
        {header: '创建时间', dataIndex: 'create_date'},
        {header: '创建人', dataIndex: 'create_user', renderer: nameRender},
        {header: '最后修改时间', dataIndex: 'last_upd_date'},
        {header: '最后修改人', dataIndex: 'last_upd_user', renderer: nameRender}
    ],
    store: QSM.store_QuickSql,
    operWin: new QSM.operWin(),
    //编辑事件
    event_dbl: function (store, record, pGrid, rowIndex) {
        this.operWin.show();
        var form = Ext.getCmp('QSM.operForm').getForm();
        form.loadRecord(record);
    },
    //删除事件
    event_del: function (store, record, pGrid, rowIndex) {
        //执行删除
        Ext.Ajax.request({
            url: 'Quick.ered?reqCode=delData',
            success: function (resp, opts) {
                var respText = Ext.JSON.decode(resp.responseText);
                QSM.store_QuickSql.load();
                Ext.Msg.alert('提示', respText.msg);
            },
            failure: function () {
                Ext.Msg.alert('提示', '当前网络忙!<br/>请刷新后重试~');
            },
            params: {entityClass: QSM.entityClass, sql_no: record.get('sql_no')}
        });
    }
});


//显示
Ext.onReady(function () {
    var tmpPanel = new QSM.mainPanel();
    //增加导出按扭
    tmpPanel.getDockedItems()[0].add('-');
    tmpPanel.getDockedItems()[0].add(new Ext.Button({
        text: '导出sql语句', iconCls: 'pluginIcon', handler: function () {
            QSM.store_QuickSqlAll.load();
        }
    }));

    new Ext.Viewport({
        layout: 'fit',
        items: [tmpPanel]
    });


});