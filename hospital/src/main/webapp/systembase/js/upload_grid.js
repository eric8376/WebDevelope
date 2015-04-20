/**
 * 编程环境 IDEA.
 * 编写者: 王少伟
 * 主题:【仿命名空间CM 所有公用的类】
 * 时间: 2013-06-10 下午4:36
 *
 * ■仿命名空间CM 所有公用的类
 * ■CF 20130526
 *
 * ●上传通用窗口类 【CM.upLoadGrid】
 *   ▲【属性】:【默认值】          【注释】
 *   ▲fileKey:''        文件存储位置(必配)
 *     ▲type:''           类型（必配）
 *     ▲to_id:''          域使用id
 *     ▲upLoadFlag:true   是否是上传模式
 *   ◆ 【方法】                    【注释】                         【参数解析】
 *   ◆ changeModel(choose)         改变窗口模式(是否是上传模式)         true:上传模式 false 下载模式
 *     ◆ addBind(to_id)             绑定到某关联域id(关联域id)          to_id指绑定到附件所对应的记录id
 *     ◆ removeBind(to_id)           解除某关联域id下的所有绑定(如果所对应的附件不再有中间表关联的时候则连同附件一并删除)
 *     ◆ init()   初始化
 *
 *     ★ column可以自己设置，默认是序号+文件名+描述（下面是所有的字段和字段所对应的意义
 *     ★ fields: ['appendix_id','from_id','to_id',    'type','file_name','explain','upload_user','upload_date','save_key','file_type','file_size','save_file_name']
 *     ★           关联表id            附件物理id  关联到的域id   域类型    用户文件名     用户描述    上传者id         上传日期        保存key     文件类型       文件大小(k)    保存的文件名
 *
 */




//仿命名空间定义
var CM = {};

Ext.define('Appendix', {
    extend: 'Ext.data.Model',
    fields: [{name: 'appendix_id'}, {name: 'from_id'}, {name: 'to_id'}, {name: 'type'}, {name: 'file_name'}, {name: 'explain'}, {name: 'upload_user'},
        {name: 'upload_date'}, {name: 'save_key'}, {name: 'file_type'}, {name: 'file_size'}, {name: 'save_file_name'}, {name: 'temp_id'}, {name: 'username'}]
});
//临时上传表格
Ext.define('CM.upLoadGrid', {
    extend: 'Ext.grid.Panel',
    fileKey: '',//文件存储位置(★必配)
    type: 1,//类型 （默认1）
    to_id: '',//抽象ID
    copy_id: '',//复制哪一抽象ID
    tmp_id: '',//临时上传ID(默认使用none+32位随机数字)
    upLoadFlag: true,//是否是上传模式
    ShowFlag: false,//是否展示（【上传模式】或者【下载模式】)
    autoLoad: false,
    oneMode: false, //上传时是否只能上传一个附件
    //-------------------分割线--------------------------
    upLoadWin: '',//上传窗体
    operWin: '',//修改窗体
    operForm: '',//表单
    xtype: "grid",
    title: "附件栏",
    store: '',
    width: 435,
    height: 150,
    collapsible: true,
    titleCollapse: true,
    split: true,
    region: 'south',//默认如果有border布局的话在下方
    viewConfig: {forceFit: true},
    loadMask: {msg: '正在为您加载附件信息,请稍候...'},
    addBtn: '添加按钮',
    columns: "",
    uploadPanel: '',//swf插件
    fileKeyTmep: false,//是否拥有中间表
    HaveTemp: '',//中间表的表名
    initComponent: function () {
        var me = this;

        //1、生成随机-临时上传ID
        this.tmp_id = 'none-' + parseInt(Math.random() * 100000000) + "-" + parseInt(Math.random() * 100000000) + "-" + parseInt(Math.random() * 100000000) + "-" + parseInt(Math.random() * 100000000);

        //3、设置标题
        if (this.ShowFlag) {
            this.title += (this.upLoadFlag ? "【上传模式】" : "【下载模式】");
        }

        //4、检查存储位置
        if (this.fileKey == "") {
            alert('请开发人员为附件表格指定\n【文件存储位置fileKey】');
            throw new Error("CM.upLoadGrid必需配备属性【文件存储位置fileKey】!请注意配置！");
        }

        //5、指定数据源
        this.store = Ext.create('Ext.data.Store', {

            model: 'Appendix',
            proxy: {
                extraParams: {
                    type: me.type,
                    to_id: me.to_id,
                    fileKey: me.fileKey,
                    copy_id: me.copy_id,
                    tmp_id: me.tmp_id,
                    upLoadFlag: me.upLoadFlag
                },
                type: 'ajax',
                url: 'CMAppendixAction.ered?reqCode=queryAppendix',
                reader: {
                    type: 'json',
                    totalProperty: 'TOTALCOUNT', // 记录总数
                    root: 'ROOT' // Json中的列表数据根节点
                }
            },
            listeners: {
                beforeLoad: function (store) {
                    if (me) {
                        me.store.getProxy().extraParams.fileKey = me.fileKey;
                        me.store.getProxy().extraParams.type = me.type;
                        me.store.getProxy().extraParams.to_id = me.to_id;
                        me.store.getProxy().extraParams.copy_id = me.copy_id;
                        me.store.getProxy().extraParams.tmp_id = me.tmp_id;
                        me.store.getProxy().extraParams.upLoadFlag = me.upLoadFlag;
                    }
                },
                load: function (store) {
                    //复制操作
                    if (me.copy_id != '') {
                        me.copyAppendix(me.fileKey, me.copy_id, me.tmp_id, store);
                        me.copy_id = '';
                    }
                    //单个模式
                    if (me.oneMode && me.upLoadFlag == true) {
                        var records = [];
                        for (var i = 0; i < store.getCount(); i++) {
                            if (i != 0) {
                                var record = store.getAt(i);
                                records.push(record);
                            }
                        }
                        //执行删除操作
                        for (var i = 0; i < records.length; i++) {
                            Ext.Ajax.request({
                                url: 'CMAppendixAction.ered?reqCode=delAppendix',
                                success: function (response, opts) {
                                },
                                failure: function (response, opts) {
                                },
                                params: {
                                    fileKey: me.fileKey,
                                    appendix_id: records[i].get('appendix_id'),
                                    temp_id: records[i].get("temp_id")
                                }
                            });
                            me.store.remove(records[i]);
                        }
                    }
                }
            }
        });
        if (me.autoLoad) {
            me.autoLoad = false;
            setTimeout(function () {
                if (me && me.store) {
                    if (me.fileKeyTmep == true) {
//            this.getStore().url = 'CMAppendixAction.ered?reqCode=queryAppendix&HaveTemp=T_OR_PROJECT_ALL'
                        me.store.getProxy().extraParams.HaveTemp = me.HaveTemp;
                    }
                    me.store.load();
                }
            }, 1000);
        }

        //6、检查并设定columns
        if (this.columns == "") {
            this.columns = [

                {
                    xtype: 'rownumberer',
                    text: '序号',
                    width: 32
                },
                {
                    header: "文件名",
                    sortable: true,
                    resizable: true,
                    dataIndex: "file_name",
                    autoWidth: true
                }, {
                    header: "上传人",
                    sortable: true,
                    resizable: true,
                    dataIndex: "username",
                    autoWidth: true
                }, {
                    header: "上传时间",
                    sortable: true,
                    resizable: true,
                    dataIndex: "upload_date",
                    autoWidth: true
                },
                {
                    header: "描述",
                    sortable: true,
                    resizable: true,
                    dataIndex: "explain",
                    autoWidth: true
                }
            ];
        }

        //7、添加编辑
        this.columns.push({
            hidden: this.upLoadFlag == false,
            header: "编辑",
            width: 40,
            dataIndex: 'x1',
            renderer: function () {
                return '<a href=# title="点击编辑该附件信息"><img src="' + webContext + '/resource/image/ext/edit1.png"/></a>';
            }
        });

        //8、添加删除
        this.columns.push({
            hidden: this.upLoadFlag == false,
            header: "删除",
            width: 40,
            dataIndex: 'x2',
            renderer: function (v) {
                return '<a href=# title="点击删除该该附件信息"><img src="' + webContext + '/resource/image/ext/delete.png"/></a>';
            }
        });

        //9、查看模式下载
        this.columns.push({
            hidden: this.upLoadFlag,
            header: "下载",
            width: 40,
            dataIndex: 'x1',
            renderer: function () {
                return '<a href=# title="点击下载该附件"><img src="' + webContext + '/resource/image/ext/download.png"/></a>';
            }
        });


        //11、创建上传swf插件uploadPanel
        this.uploadPanel = new UploadPanel({
            uploadUrl: webContext + '/CMAppendixAction.ered?reqCode=addAppendix',
            filePostName: 'swfUploadFile',
            flashUrl: webContext + '/resource/myux/uploadpanel/swf/swfupload.swf',
            fileSize: '200MB',
            border: false,
            fileTypes: '*.*', // 在这里限制文件类型:'*.jpg,*.png,*.gif'
            fileTypesDescription: '所有文件',
            postParams: {
                fileKey: this.fileKey,
                type: this.type,
                to_id: this.tmp_id
            }
        });

        //12、添加上传窗口
        this.upLoadWin = new Ext.window.Window({
            animateTarget: document.body,
            title: '上传新附件',
            width: 500,
            height: 350,
            resizable: false,
            layout: 'fit',
            constrain: true,
            closeAction: 'hide',
            maximizable: true,
            modal: true,
            listeners: {
                'hide': function (obj) {
                    if (me.fileKeyTmep == true) {
//            this.getStore().url = 'CMAppendixAction.ered?reqCode=queryAppendix&HaveTemp=T_OR_PROJECT_ALL'
                        me.store.getProxy().extraParams.HaveTemp = me.HaveTemp;
                    }
                    me.store.load();
                },
                afterrender: function () {

                    setTimeout(function () {
                        window.__flash__removeCallback = function (instance, name) {
                            if (instance) instance[name] = null;
                        }

                        //保险起见再加一层
                        setTimeout(function () {
                            window.__flash__removeCallback = function (instance, name) {
                                if (instance) instance[name] = null;
                            }
                        }, 1000);
                    }, 500);
                }
            },
            items: [this.uploadPanel]
        });

        //13、添加修改名字的表单
        this.operForm = new Ext.form.Panel({
            title: "",
            labelWidth: 100,
            labelAlign: "left",
            layout: "form",
            padding: "6",
            items: [
                {
                    xtype: "textfield",
                    fieldLabel: "文件名",
                    name: 'file_name',
                    anchor: "100%",
                    allowBlank: false,
                    maxLength: 20
                },
                {
                    xtype: "textarea",
                    fieldLabel: "描述",
                    anchor: "100%",
                    name: 'explain',
                    maxLength: 100
                },
                {xtype: 'textfield', name: 'appendix_id', hidden: true},
                {xtype: 'textfield', name: 'temp_id', hidden: true}
            ]
        });

        //14、添加更改名字窗口
        this.operWin = new Ext.window.Window({
            animateTarget: document.body,
            title: "更改文件命名与描述",
            width: 400,
            height: 179,
            layout: "fit",
            modal: true,
            constrain: true,
            closeAction: 'hide',
            listeners: {
                'hide': function (obj) {
                    if (me.fileKeyTmep == true) {
//            this.getStore().url = 'CMAppendixAction.ered?reqCode=queryAppendix&HaveTemp=T_OR_PROJECT_ALL'
                        me.store.getProxy().extraParams.HaveTemp = me.HaveTemp;
                    }
                    me.store.load();
                }
            },
            items: [this.operForm],
            buttons: [
                {text: '保存', iconCls: 'acceptIcon', handler: this.event_submitForm, scope: this},
                {text: '取消', iconCls: 'cancelIcon', handler: this.event_cancelForm, scope: this}
            ]
        });

        //15、监听表格 事件
        this.on('itemdblclick', this.event_dbl, this);
        this.on('cellclick', this.event_c, this);


        //初始化...
        this.callParent(arguments);
        //10、添加工具栏
        if (this.upLoadFlag) {
            this.addBtn = new Ext.Button({
                hidden: this.upLoadFlag == false,
                text: '上传新附件',
                iconCls: 'addIcon',
                handler: this.event_add,
                scope: this
            });
            this.add(new Ext.Toolbar({
                items: [this.addBtn, {
                    text: '刷新',
                    iconCls: 'arrow_refreshIcon',
                    handler: this.event_refresh,
                    scope: this
                }]
            }));
        }
    },
    //上传新附件
    event_add: function (btn, e) {
        var me = this;
        if (me.PGrid) {
            me.PGrid.selectBtn.hideMenu();
        }
        me.upLoadWin.show();
        if (me.oneMode) {
            alert('本附件只能上传一份，多份附件将以最后上传的一份为准!');
        }
    },
    //表格双击事件
    event_dbl: function (pGrid, record, item, index, e, eOpts) {
        if (this.upLoadFlag) {
            var form = this.operForm.getForm();
            form.loadRecord(record);
            this.operWin.show();
        }
    },
    //表格单击事件
    event_c: function (pGrid, rowIndex, colIndex, e) {
        var column_count = (pGrid.getColumnModel().getColumnCount());
        var store_tmp = pGrid.getStore();
        var record = store_tmp.getAt(rowIndex);
        var me = this;

        //上传模式
        if (this.upLoadFlag) {
            if (colIndex == column_count - 3) {
                //编辑
                this.event_dbl(pGrid, rowIndex, e, this);
            } else if (colIndex == column_count - 2) {
                //删除
                Ext.Msg.confirm('提示', '删除操作一旦执行将无法恢复,确定继续？', function (choose) {
                    if (choose == "no") {
                        return;
                    }

                    //执行删除操作
                    Ext.Ajax.request({
                        url: 'CMAppendixAction.ered?reqCode=delAppendix',
                        success: function (response, opts) {
                            var resultArray = Ext.JSON.decode(response.responseText);
                            Ext.Msg.alert('提示', resultArray.msg);
                            if (resultArray.success) {
                                store_tmp.load();
                            }
                        },
                        failure: function (response, opts) {
                            Ext.Msg.alert('提示', '当前网络忙!<br/>请刷新后重试~');
                        },
                        params: {
                            fileKey: me.fileKey,
                            appendix_id: record.get('appendix_id'),
                            temp_id: record.get("temp_id")
                        }
                    });

                });
            }
            //下载模式
        } else {
            if (colIndex == column_count - 1) {
                // 通过iFrame实现类ajax文件下载
                var downloadIframe = document.createElement('iframe');
                downloadIframe.src = 'CMAppendixAction.ered?reqCode=downAppendix&fileKey=' + me.fileKey + '&from_id=' + record.get('from_id') + '&file_name=' + record.get('file_name');
                downloadIframe.style.display = "none";
                document.body.appendChild(downloadIframe);
            }
        }
    },
    //保存表单(修改文件名和描述)
    event_submitForm: function (btn, e) {
        var me = this;
        var form = this.operForm.getForm();
        if (!form.isValid())
            return;

        //提交表单
        form.submit({
            url: 'CMAppendixAction.ered?reqCode=updAppendix',
            waitTitle: '提示',
            method: 'POST',
            waitMsg: '正在处理数据,请稍候...',
            success: function (form, action) {
                Ext.MessageBox.alert('提示', action.result.msg);
            },
            failure: function (form, action) {
                Ext.MessageBox.alert('提示', '数据保存失败');
            },
            params: {fileKey: me.fileKey}
        });
    },
    //取消表单
    event_cancelForm: function (btn, e) {
        this.operWin.hide();
    },
    //刷新数据
    event_refresh: function (btn, e) {
        this.getStore().load();
    },
    //初始化
    init: function () {
        //重设参数
        this.tmp_id = 'none-' + parseInt(Math.random() * 100000000) + "-" + parseInt(Math.random() * 100000000) + "-" + parseInt(Math.random() * 100000000) + "-" + parseInt(Math.random() * 100000000);
        this.store.getProxy().extraParams.tmp_id = this.tmp_id;
        this.store.getProxy().extraParams.copy_id = this.copy_id;
        this.store.getProxy().extraParams.to_id = this.to_id;
        this.store.removeAll();
        this.store.load();

        //重新构造上传器
        this.upLoadWin.remove(this.uploadPanel);
        this.uploadPanel = new UploadPanel({
            uploadUrl: webContext + '/CMAppendixAction.ered?reqCode=addAppendix',
            filePostName: 'swfUploadFile',
            flashUrl: webContext + '/resource/myux/uploadpanel/swf/swfupload.swf',
            fileSize: '200MB',
            border: false,
            fileTypes: '*.*', // 在这里限制文件类型:'*.jpg,*.png,*.gif'
            fileTypesDescription: '所有文件',
            postParams: {
                fileKey: this.fileKey,
                type: this.type,
                to_id: this.tmp_id
            }
        });
        this.upLoadWin.add(this.uploadPanel);
    },
    //复制附件
    copyAppendix: function (filekey, to_id, temp_to_id, store) {
        Ext.Ajax.request({
            url: 'CMAppendixAction.ered?reqCode=copyAppendix',
            success: function (response, opts) {
                store.load();
            },
            failure: function (response, opts) {
                Ext.Msg.alert('提示', '未成功复制文件!~');
            },
            params: {fileKey: filekey, to_id: to_id, temp_to_id: temp_to_id}
        });
    },
    //绑定到某使用域的id
    addBind: function (to_id) {
        //获取参数
        var me = this;
        var store_tmp = me.getStore();

        //执行绑定操作
        Ext.Ajax.request({
            url: 'CMAppendixAction.ered?reqCode=makeAppendixToArea',
            success: function (response, opts) {
                var resultArray = Ext.JSON.decode(response.responseText);

                if (resultArray.success) {
                    if (me && store_tmp) {
                        me.to_id = to_id;
                        store_tmp.getProxy().extraParams.to_id = to_id;
                        store_tmp.getProxy().extraParams.copy_id = me.copy_id;
                        store_tmp.getProxy().extraParams.tmp_id = me.tmp_id;
                        //store_tmp.load();
                    }
                }
            },
            failure: function (response, opts) {
                Ext.Msg.alert('提示', '当前网络忙!<br/>请刷新后重试~');
            },
            params: {to_id: to_id, temp_to_id: me.tmp_id}
        });
    },
    //删除某使用域id下的所有关联(如果所对应的附件不再有中间表关联的时候则连同附件一并删除)
    removeBind: function (to_id) {
        var me = this;
        var store_tmp = me.getStore();
        Ext.Ajax.request({
            url: 'CMAppendixAction.ered?reqCode=delAppendixByToId',
            success: function (response, opts) {
                var resultArray = Ext.JSON.decode(response.responseText);

                if (resultArray.success) {
                    if (store_tmp) {
                        me.to_id = to_id;
                        store_tmp.getProxy().extraParams.to_id = to_id;
                        store_tmp.getProxy().extraParams.copy_id = me.copy_id;
                        store_tmp.getProxy().extraParams.tmp_id = me.tmp_id;
                        store_tmp.load();
                    }
                }
            },
            failure: function (response, opts) {
                Ext.Msg.alert('提示', '当前网络忙!<br/>请刷新后重试~');
            },
            params: {fileKey: me.fileKey, to_id: to_id}
        });
    },
    //转换模式(true:添加模式false查看模式)
    changeModel: function (choose) {
        var theGrid = this;
        if (choose) {
            if (theGrid.upLoadFlag)
                return;
            theGrid.upLoadFlag = true;
            theGrid.getStore().getProxy().extraParams.upLoadFlag = true;
            theGrid.addBtn = new Ext.Button({
                hidden: this.upLoadFlag == false,
                text: '上传新附件',
                iconCls: 'addIcon',
                handler: theGrid.event_add,
                scope: theGrid
            });
            theGrid.add(new Ext.Toolbar({
                items: [theGrid.addBtn, {
                    text: '刷新',
                    iconCls: 'arrow_refreshIcon',
                    handler: theGrid.event_refresh,
                    theGrid: this,
                    scope: theGrid
                }]
            }));
            theGrid.doLayout();
            var cModel = theGrid.getColumnModel();
            cModel.setHidden(3, false);
            cModel.setHidden(4, false);
            cModel.setHidden(5, true);
            theGrid.getStore().load();

            if (theGrid.P_selectBtn) {
                theGrid.P_selectBtn.setText("上传");
            }
        } else {
            if (theGrid.upLoadFlag == false)
                return;
            theGrid.upLoadFlag = false;
            theGrid.getStore().getProxy().extraParams.upLoadFlag = false;
            theGrid.removeAll();
            theGrid.doLayout();
            var cModel = theGrid.getColumnModel();
            cModel.setHidden(3, true);
            cModel.setHidden(4, true);
            cModel.setHidden(5, false);
            theGrid.getStore().load();

            if (theGrid.P_selectBtn) {
                theGrid.P_selectBtn.setText("更多");
            }
        }
    }
});


//简易附件组件
Ext.define('CM.simpleUpLoadGrid', {
    extend: 'Ext.container.Container',
    style: 'background:#fff;',
    labelSettings: {text: ''},
    autoEl: "div",
    width: 618,
    height: 22,
    text: '',
    layout: "border",
    displayField: 'file_name',
    valueField: 'from_id',
    name: 'id',
    allowBlank: true,
    gridSettings: {},//表格设置
    disabled: false,
    showInHeader: false,

    textField1: '',
    label: '',
    textField2: '',
    selectBtn: '',
    gridPanel: '',
    initComponent: function () {
        var me = this;
        me.gridSettings.width = me.width - 8;
        me.gridSettings.collapsible = false;
        me.gridSettings.PGrid = me;
        this.gridPanel = new CM.upLoadGrid(me.gridSettings);
        me.labelSettings.style = 'line-height:' + (me.height) + 'px;text-align:right;';
        if (me.labelSettings.text != '') {
            me.labelSettings.text += ":";
        } else {
            me.labelSettings.hidden = true;
        }
        this.label = new Ext.form.Label(Ext.apply({text: '', width: 100, region: 'west'}, me.labelSettings));
        this.textField1 = new Ext.form.TextField({
            value: '',
            disabled: me.disabled,
            region: "center",
            allowBlank: this.allowBlank,
            style: "border-top:0;border-left:0;border-right:0;background:transparent;"
        });
        this.textField2 = new Ext.form.TextField({
            disabled: me.disabled,
            region: "south",
            hidden: true,
            name: this.name
        });
        this.selectBtn = new Ext.Button({
            disabled: me.disabled,
            text: (this.gridPanel.upLoadFlag ? "上传" : "更多"),
            iconCls: (this.gridPanel.upLoadFlag ? 'uploadIcon' : 'previewIcon'),
            region: "east",
            menu: {items: this.gridPanel},
            menuAlign: (me.showInHeader ? "br-tr" : 'tr-br')
        });
        this.items = [this.label, this.textField1, this.selectBtn, this.textField2];
        this.gridPanel.P_selectBtn = this.selectBtn;
        me.disabled = false;

        //绑定事件
        this.textField1.on("focus", this.event_filed1Focus, this);
        this.gridPanel.getStore().on("load", function (store) {
            if (store.getCount() == 0) {
                this.textField1.setValue("");
                this.textField2.setValue("");
            } else {
                var rec = store.getAt(0);
                this.textField1.setValue(rec.get(this.displayField));
                this.textField2.setValue(rec.get(this.valueField));
            }
        }, this);
        this.callParent(arguments);
    },
    setDisabled: function (choose) {
        this.textField1.setDisabled(choose);
        this.textField2.setDisabled(choose);
        this.selectBtn.setDisabled(choose);
    },
    //获取数据源
    getStore: function () {
        return this.gridPanel.getStore();
    },
    //获取gridPanel
    getGridPanel: function () {
        return this.gridPanel;
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
    //Field1获得焦点
    event_filed1Focus: function () {
        var me = this;
        me.textField1.blur();

        if (me.gridPanel.upLoadFlag) {
            me.selectBtn.showMenu();
        } else {
            if (me.textField2.getValue() != "") {
                // 通过iFrame实现类ajax文件下载
                var downloadIframe = document.createElement('iframe');
                downloadIframe.src = 'CMAppendixAction.ered?reqCode=downAppendix&fileKey=' + me.gridPanel.fileKey + '&from_id=' + me.textField2.getValue() + '&file_name=' + me.textField1.getValue();
                downloadIframe.style.display = "none";
                document.body.appendChild(downloadIframe);
            }
        }
    }

});

//new Ext.window.Window({layout:'form',width:500,height:200,items:[new CM.simpleUpLoadGrid({labelSettings:{text:'123'},gridSettings:{fileKey:'T_SO_CENTRE_file',type:1,oneMode:true}})]}).show();


//临时上传表格
Ext.define('CM.upLoadGrid_Expand', {
    extend: 'Ext.grid.Panel',
    fileKey: '',//文件存储位置(★必配)
    type: 1,//类型 （默认1）
    to_id: '',//抽象ID
    hasVersion: false, //如果为true，那么即使是onemdel也不进行附件校验
    simpleShow: false,//有版本控制的附件，上传时，直接显示上传窗口
    showWindowRightNow: false,//没有版本控制的附件，显示时，显示已上传的附件窗口。如果为单附件模式，在该窗口里删除原来的附件后才能继续上传附件
    copy_id: '',//复制哪一抽象ID
    tmp_id: '',//临时上传ID(默认使用none+32位随机数字)
    upLoadFlag: true,//是否是上传模式
    ShowFlag: false,//是否展示（【上传模式】或者【下载模式】)
    autoLoad: false,
    oneMode: false, //上传时是否只能上传一个附件
    //-------------------分割线--------------------------
    upLoadWin: '',//上传窗体
    operWin: '',//修改窗体
    operForm: '',//表单
    uploadUrl: '/CMAppendixAction.ered?reqCode=addAppendix',
    fileTypes: '*.*', // 在这里限制文件类型:'*.jpg,*.png,*.gif'
    fileTypesDescription: '所有文件',
    file_queue_limit: 0,
    RequestParams: {},
    button_action: SWFUpload.BUTTON_ACTION.SELECT_FILES,
    xtype: "grid",
    title: "附件栏",
    store: '',
    width: 435,
    height: 150,
    collapsible: true,
    titleCollapse: true,
    split: true,
    region: 'south',//默认如果有border布局的话在下方
    viewConfig: {forceFit: true},
    loadMask: {msg: '正在为您加载附件信息,请稍候...'},
    addBtn: '添加按钮',
    columns: "",
    uploadPanel: '',//swf插件
    initComponent: function () {
        var me = this;
        if (me.oneMode) {
            this.button_action = SWFUpload.BUTTON_ACTION.SELECT_FILE;
            this.file_queue_limit = 1;
        }
        //如果有版本控制的附件，不允许立马显示上传窗口。只能简单显示上传窗口。
        if (me.hasVersion && me.showWindowRightNow) {
            Ext.Msg.alert('提示', '该附件有版本控制，无法立刻显示上传附件窗口，请将立刻显示上传窗口设置该为false或将是hasVersion设置为false');
            return;
        }
        //如果是没有版本控制的附件，且为单附件上传模式，就必须校验to_id的值是否有值
        if (me.upLoadFlag && me.oneMode && me.showWindowRightNow)         //单例上传模式要校验是否设置了to_id参数
        {
            if (me.to_id == '') {
                Ext.Msg.alert('提示', '单附件上传模式to_id必填，用于校验是否已经有附件了');
                return;
            }
        }

        if (!me.hasVersion) //如果没有版本控制
        {
            if (me.oneMode)    //并且是单附件模式，就判断是否已经有附件了
            {
                if (me.to_id == '') {
                    Ext.Msg.alert('提示', '单附件上传模式to_id必填，用于校验是否已经有附件了');
                    return;
                }
            }
        }
        me.ComponetInit();

    },
    ComponetInit: function () {
        var me = this;
        //1、生成随机-临时上传ID
        this.tmp_id = 'none-' + parseInt(Math.random() * 100000000) + "-" + parseInt(Math.random() * 100000000) + "-" + parseInt(Math.random() * 100000000) + "-" + parseInt(Math.random() * 100000000);

        //3、设置标题
        if (this.ShowFlag) {
            this.title += (this.upLoadFlag ? "【上传模式】" : "【下载模式】");
        }

        //4、检查存储位置
        if (this.fileKey == "") {
            alert('请开发人员为附件表格指定\n【文件存储位置fileKey】');
            throw new Error("CM.upLoadGrid必需配备属性【文件存储位置fileKey】!请注意配置！");
        }
        //5、指定数据源
        this.store = Ext.create('Ext.data.Store', {
            autoLoad: true,
            model: 'Appendix',
            proxy: {
                extraParams: {
                    type: me.type,
                    to_id: me.to_id,
                    fileKey: me.fileKey,
                    copy_id: me.copy_id,
                    tmp_id: me.tmp_id,
                    upLoadFlag: me.upLoadFlag
                },
                type: 'ajax',
                url: 'CMAppendixAction.ered?reqCode=queryAppendix',
                reader: {
                    type: 'json',
                    totalProperty: 'TOTALCOUNT', // 记录总数
                    root: 'ROOT' // Json中的列表数据根节点
                }
            },
            listeners: {
                beforeLoad: function (store) {
                    if (me) {
                        me.store.setParams({
                            fileKey: me.fileKey,
                            type: me.type,
                            to_id: me.to_id,
                            copy_id: me.copy_id,
                            tmp_id: me.tmp_id,
                            upLoadFlag: me.upLoadFlag
                        })
                    }
                },
                load: function (store) {
                    //复制操作
                    if (me.copy_id != '') {
                        me.copyAppendix(me.fileKey, me.copy_id, me.tmp_id, store);
                        me.copy_id = '';
                    }
                    //单个模式
//                    if (me.oneMode && me.upLoadFlag == true) {
//                        var records = [];
//                        for (var i = 0; i < store.getCount(); i++) {
//                            if (i != 0) {
//                                var record = store.getAt(i);
//                                records.push(record);
//                            }
//                        }
//                        //执行删除操作
//                        for (var i = 0; i < records.length; i++) {
//                            Ext.Ajax.request({
//                                url: 'CMAppendixAction.ered?reqCode=delAppendix',
//                                success: function (response, opts) {
//                                },
//                                failure: function (response, opts) {
//                                },
//                                params: {fileKey: me.fileKey, appendix_id: records[i].get('appendix_id'),temp_id:records[i].get("temp_id") }
//                            });
//                            me.store.remove(records[i]);
//                        }
//                    }
                }
            }
        });
        if (me.autoLoad) {
            me.autoLoad = false;
            setTimeout(function () {
                if (me && me.store) {
                    if (me.fileKeyTmep == true) {
//            this.getStore().url = 'CMAppendixAction.ered?reqCode=queryAppendix&HaveTemp=T_OR_PROJECT_ALL'
                        me.store.getProxy().extraParams.HaveTemp = me.HaveTemp;
                    }
                    me.store.load();
                }
            }, 1000);
        }

        //6、检查并设定columns
        if (this.columns == "") {
            this.columns = [

                {
                    xtype: 'rownumberer',
                    text: '序号',
                    width: 32
                },
                {
                    header: "文件名",
                    sortable: true,
                    resizable: true,
                    dataIndex: "file_name",
                    width: 100
                },
                {
                    header: "描述",
                    sortable: true,
                    resizable: true,
                    dataIndex: "explain",
                    width: 200
                }
            ];
        }

        //7、添加编辑
        this.columns.push({
            hidden: this.upLoadFlag == false,
            header: "编辑",
            width: 40,
            dataIndex: 'x1',
            renderer: function () {
                return '<a href=# title="点击编辑该附件信息"><img src="' + webContext + '/resource/image/ext/edit1.png"/></a>';
            }
        });

        //8、添加删除
        this.columns.push({
            hidden: this.upLoadFlag == false,
            header: "删除",
            width: 40,
            dataIndex: 'x2',
            renderer: function (v) {
                return '<a href=# title="点击删除该该附件信息"><img src="' + webContext + '/resource/image/ext/delete.png"/></a>';
            }
        });

        //9、查看模式下载
        this.columns.push({
            hidden: this.upLoadFlag,
            header: "下载",
            width: 40,
            dataIndex: 'x1',
            renderer: function () {
                return '<a href=# title="点击下载该附件"><img src="' + webContext + '/resource/image/ext/download.png"/></a>';
            }
        });


        me.RequestParams.fileKey = this.fileKey;
        me.RequestParams.type = this.type;
        me.RequestParams.to_id = this.tmp_id;
        //11、创建上传swf插件uploadPanel
        this.uploadPanel = new UploadPanel({
            uploadUrl: webContext + me.uploadUrl,
            filePostName: 'swfUploadFile',
            flashUrl: webContext + '/resource/myux/uploadpanel/swf/swfupload.swf',
            fileSize: '200MB',
            border: false,
            fileTypes: me.fileTypes, // 在这里限制文件类型:'*.jpg,*.png,*.gif'
            fileTypesDescription: me.fileTypesDescription,
            button_Action: me.button_action,
            File_Queue_Limit: me.file_queue_limit,
            postParams: me.RequestParams,
            callbackfun: me.callbackfun
        });

        this.upLoadWin = new Ext.window.Window({
            animateTarget: document.body,
            title: '上传新附件',
            width: 500,
            height: 350,
            resizable: false,
            layout: 'fit',
            constrain: true,
            closeAction: 'hide',
            maximizable: true,
            modal: true,
            listeners: {
                'hide': function (obj) {
                    if (me.fileKeyTmep == true) {
//            this.getStore().url = 'CMAppendixAction.ered?reqCode=queryAppendix&HaveTemp=T_OR_PROJECT_ALL'
                        me.store.getProxy().extraParams.HaveTemp = me.HaveTemp;
                    }
                    me.store.load();
                },
                afterrender: function () {

                    setTimeout(function () {
                        window.__flash__removeCallback = function (instance, name) {
                            if (instance) instance[name] = null;
                        }

                        //保险起见再加一层
                        setTimeout(function () {
                            window.__flash__removeCallback = function (instance, name) {
                                if (instance) instance[name] = null;
                            }
                        }, 1000);
                    }, 500);
                }
            },
            items: [this.uploadPanel]
        });

        //13、添加修改名字的表单
        this.operForm = new Ext.form.Panel({
            title: "",
            labelWidth: 100,
            labelAlign: "left",
            layout: "form",
            padding: "6",
            items: [
                {
                    xtype: "textfield",
                    fieldLabel: "文件名",
                    name: 'file_name',
                    anchor: "100%",
                    allowBlank: false,
                    maxLength: 20
                },
                {
                    xtype: "textarea",
                    fieldLabel: "描述",
                    anchor: "100%",
                    name: 'explain',
                    maxLength: 100
                },
                {xtype: 'textfield', name: 'appendix_id', hidden: true},
                {xtype: 'textfield', name: 'temp_id', hidden: true}
            ]
        });

        //14、添加更改名字窗口
        this.operWin = new Ext.window.Window({
            animateTarget: document.body,
            title: "更改文件命名与描述",
            width: 400,
            height: 179,
            layout: "fit",
            modal: true,
            constrain: true,
            closeAction: 'hide',
            listeners: {
                'hide': function (obj) {
                    if (me.fileKeyTmep == true) {
//            this.getStore().url = 'CMAppendixAction.ered?reqCode=queryAppendix&HaveTemp=T_OR_PROJECT_ALL'
                        me.store.getProxy().extraParams.HaveTemp = me.HaveTemp;
                    }
                    me.store.load();
                }
            },
            items: [this.operForm],
            buttons: [
                {text: '保存', iconCls: 'acceptIcon', handler: this.event_submitForm, scope: this},
                {text: '取消', iconCls: 'cancelIcon', handler: this.event_cancelForm, scope: this}
            ]
        });

        //15、监听表格 事件
        this.on('itemdblclick', this.event_dbl, this);
        this.on('cellclick', this.event_c, this);


        //初始化...
        this.callParent(arguments);
        //10、添加工具栏
        if (this.upLoadFlag) {
            this.addBtn = new Ext.Button({
                hidden: this.upLoadFlag == false,
                text: '上传新附件',
                iconCls: 'addIcon',
                handler: this.event_add,
                scope: this
            });
            this.add(new Ext.Toolbar({
                items: [this.addBtn, {
                    text: '刷新',
                    iconCls: 'arrow_refreshIcon',
                    handler: this.event_refresh,
                    scope: this
                }]
            }));
        }
        if (this.showWindowRightNow) {
            me.showUploadWindow();
        } else {
            if (this.simpleShow) {
                me.event_add();
            }
        }


    },
    //上传新附件
    event_add: function (btn, e) {
        var me = this;
        if (!me.hasVersion) //如果有版本控制的附件，即使是onemodel也不进行是否已经有附件的校验 ，但是如果没有版本控制的话，就要进行是否已经存在版本的校验，如果已存在就不能继续上传附件
        {
            if (me.oneMode) {
                if (me.store.getTotalCount() != 0) {
                    Ext.Msg.alert('提示', '已存在附件，无法继续上传附件');
                    return;
                }
            }

        }
        if (me.PGrid) {
            me.PGrid.selectBtn.hideMenu();
        }
        me.upLoadWin.show();
        if (me.oneMode) {
            alert('本附件只能上传一份，多份附件将以最后上传的一份为准!');
        }
    },
    //表格双击事件
    event_dbl: function (pGrid, record, item, index, e, eOpts) {
        if (this.upLoadFlag) {
            var form = this.operForm.getForm();
            form.loadRecord(record);
            this.operWin.show();
        }
    },
    //表格单击事件
    event_c: function (pGrid, rowIndex, colIndex, e) {
        var column_count = (pGrid.getColumnModel().getColumnCount());
        var store_tmp = pGrid.getStore();
        var record = store_tmp.getAt(rowIndex);
        var me = this;

        //上传模式
        if (this.upLoadFlag) {
            if (colIndex == column_count - 3) {
                //编辑
                this.event_dbl(pGrid, rowIndex, e, this);
            } else if (colIndex == column_count - 2) {
                //删除
                Ext.Msg.confirm('提示', '删除操作一旦执行将无法恢复,确定继续？', function (choose) {
                    if (choose == "no") {
                        return;
                    }

                    //执行删除操作
                    Ext.Ajax.request({
                        url: 'CMAppendixAction.ered?reqCode=delAppendix',
                        success: function (response, opts) {
                            var resultArray = Ext.JSON.decode(response.responseText);
                            Ext.Msg.alert('提示', resultArray.msg);
                            if (resultArray.success) {
                                store_tmp.load();
                            }
                        },
                        failure: function (response, opts) {
                            Ext.Msg.alert('提示', '当前网络忙!<br/>请刷新后重试~');
                        },
                        params: {
                            fileKey: me.fileKey,
                            appendix_id: record.get('appendix_id'),
                            temp_id: record.get("temp_id")
                        }
                    });

                });
            }
            //下载模式
        } else {
            if (colIndex == column_count - 1) {
                // 通过iFrame实现类ajax文件下载
                var downloadIframe = document.createElement('iframe');
                downloadIframe.src = 'CMAppendixAction.ered?reqCode=downAppendix&fileKey=' + me.fileKey + '&from_id=' + record.get('from_id') + '&file_name=' + record.get('file_name');
                downloadIframe.style.display = "none";
                document.body.appendChild(downloadIframe);
            }
        }
    },
    //保存表单(修改文件名和描述)
    event_submitForm: function (btn, e) {
        var me = this;
        var form = this.operForm.getForm();
        if (!form.isValid())
            return;

        //提交表单
        form.submit({
            url: 'CMAppendixAction.ered?reqCode=updAppendix',
            waitTitle: '提示',
            method: 'POST',
            waitMsg: '正在处理数据,请稍候...',
            success: function (form, action) {
                Ext.MessageBox.alert('提示', action.result.msg);
            },
            failure: function (form, action) {
                Ext.MessageBox.alert('提示', '数据保存失败');
            },
            params: {fileKey: me.fileKey}
        });
    },
    //取消表单
    event_cancelForm: function (btn, e) {
        this.operWin.hide();
    },
    //刷新数据
    event_refresh: function (btn, e) {
        if (this.fileKeyTmep == true) {
//            this.getStore().url = 'CMAppendixAction.ered?reqCode=queryAppendix&HaveTemp=T_OR_PROJECT_ALL'
            this.getStore().getProxy().extraParams.HaveTemp = this.HaveTemp;
        }
        this.getStore().load();
    },
    //初始化
    init: function () {
        var me = this;
        //重设参数
        this.tmp_id = 'none-' + parseInt(Math.random() * 100000000) + "-" + parseInt(Math.random() * 100000000) + "-" + parseInt(Math.random() * 100000000) + "-" + parseInt(Math.random() * 100000000);
        this.store.getProxy().extraParams.tmp_id = this.tmp_id;
        this.store.getProxy().extraParams.copy_id = this.copy_id;
        this.store.getProxy().extraParams.to_id = this.to_id;
        this.store.removeAll();
        this.store.load();

        //重新构造上传器
        this.upLoadWin.remove(this.uploadPanel);
        me.RequestParams.fileKey = this.fileKey;
        me.RequestParams.type = this.type;
        me.RequestParams.to_id = this.tmp_id;
        this.uploadPanel = new UploadPanel({
            uploadUrl: webContext + me.uploadUrl,
            filePostName: 'swfUploadFile',
            flashUrl: webContext + '/resource/myux/uploadpanel/swf/swfupload.swf',
            fileSize: '200MB',
            border: false,
            fileTypes: me.fileTypes, // 在这里限制文件类型:'*.jpg,*.png,*.gif'
            fileTypesDescription: me.fileTypesDescription,
            button_Action: me.button_action,
            File_Queue_Limit: me.file_queue_limit,
            postParams: me.RequestParams,
            callbackfun: me.callbackfun
        });
        this.upLoadWin.add(this.uploadPanel);
    },
    //复制附件
    copyAppendix: function (filekey, to_id, temp_to_id, store) {
        Ext.Ajax.request({
            url: 'CMAppendixAction.ered?reqCode=copyAppendix',
            success: function (response, opts) {
                store.load();
            },
            failure: function (response, opts) {
                Ext.Msg.alert('提示', '未成功复制文件!~');
            },
            params: {fileKey: filekey, to_id: to_id, temp_to_id: temp_to_id}
        });
    },
    //绑定到某使用域的id
    addBind: function (to_id) {
        //获取参数
        var me = this;
        var store_tmp = me.getStore();

        //执行绑定操作
        Ext.Ajax.request({
            url: 'CMAppendixAction.ered?reqCode=makeAppendixToArea',
            success: function (response, opts) {
                var resultArray = Ext.JSON.decode(response.responseText);

                if (resultArray.success) {
                    if (me && store_tmp) {
                        me.to_id = to_id;
                        store_tmp.getProxy().extraParams.to_id = to_id;
                        store_tmp.getProxy().extraParams.copy_id = me.copy_id;
                        store_tmp.getProxy().extraParams.tmp_id = me.tmp_id;
                        //store_tmp.load();
                    }
                }
            },
            failure: function (response, opts) {
                Ext.Msg.alert('提示', '当前网络忙!<br/>请刷新后重试~');
            },
            params: {to_id: to_id, temp_to_id: me.tmp_id}
        });
    },
    //删除某使用域id下的所有关联(如果所对应的附件不再有中间表关联的时候则连同附件一并删除)
    removeBind: function (to_id) {
        var me = this;
        var store_tmp = me.getStore();
        Ext.Ajax.request({
            url: 'CMAppendixAction.ered?reqCode=delAppendixByToId',
            success: function (response, opts) {
                var resultArray = Ext.JSON.decode(response.responseText);

                if (resultArray.success) {
                    if (store_tmp) {
                        me.to_id = to_id;
                        store_tmp.getProxy().extraParams.to_id = to_id;
                        store_tmp.getProxy().extraParams.copy_id = me.copy_id;
                        store_tmp.getProxy().extraParams.tmp_id = me.tmp_id;
                        store_tmp.load();
                    }
                }
            },
            failure: function (response, opts) {
                Ext.Msg.alert('提示', '当前网络忙!<br/>请刷新后重试~');
            },
            params: {fileKey: me.fileKey, to_id: to_id}
        });
    },
    //转换模式(true:添加模式false查看模式)
    changeModel: function (choose) {
        var theGrid = this;
        if (choose) {
            if (theGrid.upLoadFlag)
                return;
            theGrid.upLoadFlag = true;
            theGrid.getStore().getProxy().extraParams.upLoadFlag = true;
            theGrid.addBtn = new Ext.Button({
                hidden: this.upLoadFlag == false,
                text: '上传新附件',
                iconCls: 'addIcon',
                handler: theGrid.event_add,
                scope: theGrid
            });
            theGrid.add(new Ext.Toolbar({
                items: [theGrid.addBtn, {
                    text: '刷新',
                    iconCls: 'arrow_refreshIcon',
                    handler: theGrid.event_refresh,
                    theGrid: this,
                    scope: theGrid
                }]
            }));
            theGrid.doLayout();
            var cModel = theGrid.getColumnModel();
            cModel.setHidden(3, false);
            cModel.setHidden(4, false);
            cModel.setHidden(5, true);
            theGrid.getStore().load();

            if (theGrid.P_selectBtn) {
                theGrid.P_selectBtn.setText("上传");
            }
        } else {
            if (theGrid.upLoadFlag == false)
                return;
            theGrid.upLoadFlag = false;
            theGrid.getStore().getProxy().extraParams.upLoadFlag = false;
            theGrid.removeAll();
            theGrid.doLayout();
            var cModel = theGrid.getColumnModel();
            cModel.setHidden(3, true);
            cModel.setHidden(4, true);
            cModel.setHidden(5, false);
            theGrid.getStore().load();

            if (theGrid.P_selectBtn) {
                theGrid.P_selectBtn.setText("更多");
            }
        }
    },
    /**
     * new出该组建并自动显示出来
     */
    showUploadWindow: function () {
        var me = this;
        var MaterialWin = new Ext.window.Window({
            layout: 'fit', // 设置窗口布局模式
            width: 500, // 窗口宽度
            closable: true, // 是否可关闭
            resizable: false,
            bodyStyle: 'padding:5 5 5',
            labelAlign: 'right',
            draggable: true,// 是否可拖动
            closeAction: 'close',
            animCollapse: true,
            modal: true,
            animateTarget: Ext.getBody(),
            border: true,
            pageX: document.body.clientWidth / 2 - 500 / 2, // 页面定位Y坐标
            items: [me],
            buttons: [
                { // 窗口底部按钮配置
                    text: "关闭", // 按钮文本
                    iconCls: 'acceptIcon', // 按钮图标
                    handler: function () {
                        MaterialWin.close();
                    }
                }
            ]
        });
        MaterialWin.show();
    },
    /**
     * 文件上传成功后的回调方法
     */
    callbackfun: function () {
    }
});

//简易附件组件
Ext.define('CM.simpleUpLoadGrid_Expand', {
    extend: 'Ext.container.Container',
    xtype: "container", style: 'background:#fff;',
    labelSettings: {text: ''},
    autoEl: "div",
    width: 618,
    height: 22,
    text: '',
    layout: "border",
    displayField: 'file_name',
    valueField: 'from_id',
    name: 'id',
    allowBlank: true,
    gridSettings: {},//表格设置
    disabled: false,
    showInHeader: false,
    textField1: '',
    label: '',
    textField2: '',
    selectBtn: '',
    gridPanel: '',
    initComponent: function () {
        var me = this;
        me.gridSettings.width = me.width - 8;
        me.gridSettings.collapsible = false;
        me.gridSettings.PGrid = me;
        me.gridSettings.uploadUrl = '/CMAppendixAction.ered?reqCode=addAppendix';
        me.gridSettings.fileTypes = '*.*';// 在这里限制文件类型:'*.jpg,*.png,*.gif'
        me.gridSettings.fileTypesDescription = '所有文件';
        me.gridSettings.file_queue_limit = 0;
        me.gridSettings.RequestParams = {};
        me.gridSettings.button_action = SWFUpload.BUTTON_ACTION.SELECT_FILES;
        this.gridPanel = new CM.upLoadGrid_Expand(me.gridSettings);
        me.labelSettings.style = 'line-height:' + (me.height) + 'px;text-align:right;';
        if (me.labelSettings.text != '') {
            me.labelSettings.text += ":";
        } else {
            me.labelSettings.hidden = true;
        }
        this.label = new Ext.form.Label(Ext.apply({text: '', width: 100, region: 'west'}, me.labelSettings));
        this.textField1 = new Ext.form.TextField({
            value: '',
            disabled: me.disabled,
            region: "center",
            allowBlank: this.allowBlank,
            style: "border-top:0;border-left:0;border-right:0;background:transparent;"
        });
        this.textField2 = new Ext.form.TextField({
            disabled: me.disabled,
            region: "south",
            hidden: true,
            name: this.name
        });
        this.selectBtn = new Ext.Button({
            disabled: me.disabled,
            text: (this.gridPanel.upLoadFlag ? "上传" : "更多"),
            iconCls: (this.gridPanel.upLoadFlag ? 'uploadIcon' : 'previewIcon'),
            region: "east",
            menu: {items: this.gridPanel},
            menuAlign: (me.showInHeader ? "br-tr" : 'tr-br')
        });
        this.items = [this.label, this.textField1, this.selectBtn, this.textField2];
        this.gridPanel.P_selectBtn = this.selectBtn;
        me.disabled = false;

        //绑定事件
        this.textField1.on("focus", this.event_filed1Focus, this);
        this.gridPanel.getStore().on("load", function (store) {
            if (store.getCount() == 0) {
                this.textField1.setValue("");
                this.textField2.setValue("");
            } else {
                var rec = store.getAt(0);
                this.textField1.setValue(rec.get(this.displayField));
                this.textField2.setValue(rec.get(this.valueField));
            }
        }, this);
        this.callParent(arguments);
    },
    setDisabled: function (choose) {
        this.textField1.setDisabled(choose);
        this.textField2.setDisabled(choose);
        this.selectBtn.setDisabled(choose);
    },
    //获取数据源
    getStore: function () {
        return this.gridPanel.getStore();
    },
    //获取gridPanel
    getGridPanel: function () {
        return this.gridPanel;
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
    //Field1获得焦点
    event_filed1Focus: function () {
        var me = this;
        me.textField1.blur();

        if (me.gridPanel.upLoadFlag) {
            me.selectBtn.showMenu();
        } else {
            if (me.textField2.getValue() != "") {
                // 通过iFrame实现类ajax文件下载
                var downloadIframe = document.createElement('iframe');
                downloadIframe.src = 'CMAppendixAction.ered?reqCode=downAppendix&fileKey=' + me.gridPanel.fileKey + '&from_id=' + me.textField2.getValue() + '&file_name=' + me.textField1.getValue();
                downloadIframe.style.display = "none";
                document.body.appendChild(downloadIframe);
            }
        }
    }

});

//new Ext.window.Window({layout:'form',width:500,height:200,items:[new CM.simpleUpLoadGrid({labelSettings:{text:'123'},gridSettings:{fileKey:'T_SO_CENTRE_file',type:1,oneMode:true}})]}).show();
