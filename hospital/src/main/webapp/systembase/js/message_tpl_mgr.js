/**
 * 编程环境 IDEA.
 * 编写者: 王少伟
 * 主题:【发送内容模板管理】
 * 时间: 2013-06-11  下午2:26
 */

/**
 * ★☆使用需要导入★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★
 <eRedG4:import src="/systembase/js/commonJs.js"/>
 <eRedG4:import src="/systembase/js/message_tpl_mgr.js"/>
 * 类声明
 * 信息模板选择组件  MTM.MesTplField
 *            ★displayField    显示的依据字段
 *            ★valueField     显示树接口
 *            ★name           上传时候的字段名称
 *            ★allowBlank     是否允许为空
 *            ...
 *★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆
 *            ★getRawValue()     rawValue数据
 *            ★getValue()        value数据
 *            ★getOtherValue()   选中的record的其它数据
 *            ★loadField2    当所在的表单loadRecord时调用此方法 将根据id转换成value
 * ★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆★☆
 */
//增加个仿命名空间，避免冲突
var MTM = {};
//参照规则说明
MTM.paramRegulars = [
    ['r', '换行'],
    ['account', '接收人账号'],
    ['name', '接收人用户名'],
    ['job_use_time', '流程总时长'],
    ['job_key', '流程主键ID'],
    ['job_flow_no', '流程ID'],
    ['job_point_no', '环节ID'],
    ['job_index', '第几次催促']
];


Ext.define('listTpl', {
    extend: 'Ext.data.Model',
    fields: [{name: 'tpl_no'}, {name: 'tpl_name'}, {name: 'title'}, {name: 'content'}, {name: 'tpl_explain'}, {name: 'create_date'}]
});

//-----------------------------------数据源-----------------------------------------
//所有信息模板
MTM.store_all_tpl = Ext.create('Ext.data.Store', {
    model: 'listTpl',
    headers: ['模板编号', '模板名称', '标题', '内容', '备注', '创建时间'],
    pageLoad: true,
    proxy: {
        extraParams: {},
        type: 'ajax',
        url: 'MessageTplAction.ered?reqCode=listTpl',
        reader: {
            type: 'json',
            totalProperty: 'TOTALCOUNT', // 记录总数
            root: 'ROOT' // Json中的列表数据根节点
        }
    }
});

//所有信息模板
MTM.store_all_tpl2 = Ext.create('Ext.data.Store', {
    model: 'istTpl',
    headers: ['模板编号', '模板名称', '标题', '内容', '备注', '创建时间'],
    proxy: {
        extraParams: {
            start: 0, limit: 999, searchKey: ''
        },
        type: 'ajax',
        url: 'MessageTplAction.ered?reqCode=listTpl',
        reader: {
            type: 'json',
            totalProperty: 'TOTALCOUNT', // 记录总数
            root: 'ROOT' // Json中的列表数据根节点
        }
    }
});


//-----------------------------------主面板定义-----------------------------------------
//操作表单
MTM.operForm = new Ext.form.Panel({
    items: [
        {xtype: "textfield", fieldLabel: "模板名", anchor: "100%", name: 'tpl_name', allowBlank: false, maxLength: 30},
        {
            xtype: "textfield",
            fieldLabel: "标题",
            anchor: "100%",
            name: 'title',
            allowBlank: false,
            value: '无',
            maxLength: 30
        },
        {
            xtype: "textarea",
            fieldLabel: "内容",
            anchor: "100%",
            name: 'content',
            allowBlank: false,
            height: 180,
            maxLength: 140
        },
        {xtype: "textfield", fieldLabel: "备注", anchor: "100%", name: 'tpl_explain', maxLength: 100},
        {xtype: 'textfield', name: 'tpl_no', hidden: true}
    ]
});

//操作窗口
Ext.define('MTM.operWin', {
    extend: 'Ext.UXWindow2',
    xtype: "window",
    title: "添加或修改信息模板",
    width: 520,
    height: 345,
    layout: "fit",
    isInsert: true,//是否是添加模式
    initComponent: function () {
        this.items = [MTM.operForm];

        this.on('beforeshow', function () {
            if (this.isInsert)
                MTM.operForm.getForm().reset();
        });

        this.buttons = [
            {text: '保存', iconCls: 'acceptIcon', handler: this.event_saveForm, scope: this},
            {
                text: '参数套用规则',
                icon: webContext + '/resource/image/ext/zoom.png',
                handler: this.event_lookRef,
                scope: this
            }
        ];
        this.callParent(arguments);
    },
    //提交表单
    event_saveForm: function () {
        var me = this;
        var form = MTM.operForm.getForm();
        if (!form.isValid())
            return;

        //提交
        var url = this.isInsert ? 'MessageTplAction.ered?reqCode=addTpl' : 'MessageTplAction.ered?reqCode=updTpl';
        form.submit({
            url: url,
            waitTitle: '提示',
            method: 'POST',
            waitMsg: '正在处理数据,请稍候...',
            success: function (form, action) {
                Ext.MessageBox.alert('提示', action.result.msg);
                MTM.store_all_tpl.load();
                me.hide();
            },
            failure: function (form, action) {
                Ext.MessageBox.alert('提示', action.result.msg);
            }
        });
    },
    //查看引用规则
    event_lookRef: function () {
        if (!this.refWin) {
            var Messages = '<table border=1 cellspacing=0 style="width:100%;border-color:#eee;">';
            Messages += "<tr style='background:#eee;'><th height=40><b>参数</b></th><th><b>替换值描述<br/></th></tr>";
            for (var i = 0; i < MTM.paramRegulars.length; i++) {
                Messages += "<tr><td>{" + MTM.paramRegulars[i][0] + "}</td><td>" + MTM.paramRegulars[i][1] + "</td></tr>";
            }
            Messages += "<tr><td>/{</td><td>{</td></tr><tr><td>/}</td><td>}</td></tr></table>";
            this.refWin = new Ext.UXWindow2({
                bodyStyle: 'background:#fff;',
                modal: false,
                width: 243,
                height: 494,
                autoScroll: true,
                title: '参数套用规则（only:内容）',
                html: Messages
            });
        }

        this.refWin.show();
    }
});

//信息菜单表单
MTM.menuForm = new Ext.form.Panel({
    frame: true,
    title: '模板预览',
    width: 353,
    height: 201,
    layout: 'border',
    items: [
        {xtype: "textfield", height: 25, region: 'north', name: 'title', readOnly: true},
        {xtype: "textarea", region: 'center', name: 'content', readOnly: true}
    ]
});

//信息菜单
MTM.infoMenu = new Ext.menu.Menu({
    items: [MTM.menuForm]
});

//显示所有信息面板
MTM.getGridPanel = function (settings) {
    //默认配置
    var defaultSettings = {
        title: '<span class="commoncss">信息模板查看</span>',
        store: MTM.store_all_tpl,
        operWin: new MTM.operWin(),
        ctFlag: true,
        //编辑事件
        event_dbl: function (store, record, pGrid, rowIndex) {
            this.operWin.show();
            var form = MTM.operForm.getForm();
            form.loadRecord(record);
        },
        //删除事件
        event_del: function (store, record, pGrid, rowIndex) {
            //执行删除
            Ext.Ajax.request({
                url: 'MessageTplAction.ered?reqCode=delTpl',
                success: function (resp, opts) {
                    var respText = Ext.JSON.decode(resp.responseText);
                    MTM.store_all_tpl.load();
                    Ext.Msg.alert('提示', respText.msg);
                },
                failure: function () {
                    Ext.Msg.alert('提示', '当前网络忙!<br/>请刷新后重试~');
                },
                params: {tpl_no: record.get('tpl_no'), tpl_name: record.get('tpl_name')}
            });
        },
        event_ct: function (store, record, pGrid, rowIndex, e) {
            MTM.menuForm.getForm().loadRecord(record);
            MTM.infoMenu.showAt(e.getPoint());
        }
    };
    //应用配置
    Ext.apply(defaultSettings, settings);
    return new Ext.UXGrid1(defaultSettings);
}

//信息模板选择组件
MTM.MesTplField = new Ext.define('MTM.MesTplField', {
    extend: 'Ext.container.Container',
    autoEl: "div",
    width: 200,
    height: 22,
    layout: "column",
    displayField: 'title',
    valueField: 'tpl_no',
    name: 'id',
    allowBlank: false,

    textField1: '',
    textField2: '',
    selectBtn: '',
    gridPanel: '',
    initComponent: function () {
        //创建组件
        this.gridPanel = MTM.getGridPanel({
            store: MTM.store_all_tpl2,
            title: '',
            width: 673,
            height: 190,
            addFlag: false,
            editFlag: false,
            delFlag: false,
            ctFlag: false,
            bbarFlag: false,
            columns: [{header: '标题', dataIndex: 'title', width: 182}, {header: '内容', dataIndex: 'content', width: 430}]
        });
        this.textField1 = new Ext.form.TextField({region: "center", allowBlank: this.allowBlank});
        this.textField2 = new Ext.form.TextField({region: "south", hidden: true, name: this.name});
        this.selectBtn = new Ext.Button({
            text: "选择",
            region: "east",
            menu: {items: this.gridPanel},
            menuAlign: 'tr-br'
        });
        this.items = [this.textField1, this.selectBtn, this.textField2];

        //绑定事件
        this.gridPanel.on("rowclick", this.event_rowclick, this);
        this.textField1.on("focus", this.event_filed1Focus, this);
        this.callParent(arguments);
        //加载数据
        MTM.store_all_tpl2.load();
    },
    //获取RawValue
    getRawValue: function () {
        return this.textField2.getValue();
    },
    //获取值
    getValue: function () {
        return this.textField1.getValue();
    },
    //获取某个值
    getOtherValue: function (fieldName) {
        var rec = this.gridPanel.getSelectionModel().getSelections()[0];
        if (rec)
            return rec.get(fieldName);
    },
    //选择
    event_rowclick: function (pGrid, rowIndex, e) {
        var record = pGrid.getStore().getAt(rowIndex);
        this.textField1.setValue(record.get(this.displayField));
        this.textField2.setValue(record.get(this.valueField));
        this.selectBtn.hideMenu();
    },
    //Field1获得焦点
    event_filed1Focus: function () {
        this.selectBtn.showMenu();
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





