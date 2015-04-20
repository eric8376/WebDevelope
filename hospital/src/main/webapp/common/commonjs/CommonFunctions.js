/**  .
 * 公用方法js
 * Created with IntelliJ IDEA.
 * User: xm001
 * Date: 13-6-26
 * Time: 上午9:22
 * To change this template use File | Settings | File Templates.
 */

/**
 *通用的gridpanel，带curd可扩展
 */
/**
 *通用的gridpanel，带curd可扩展
 */

Ext.define('Ext.CommonGridPanel', {
    extend: 'Ext.grid.Panel',
    autoScroll: true,
    //提交后台的参数
    params: {},  //每次提交都会提交上去的参数
    //是否可以新增
    createFlag: false,
    //新增的请求地址
    createUrl: '',
    createTitle: '',

    //是否可以修改
    updateFlag: false,
    //修改的请求地址
    updateUrl: '',
    updateTitle: '',

    //是否可以删除
    delFlag: false,
    //删除记录的请求地址,请求时把选择的记录的所有字段当作参数传到后台
    delUrl: '',

    //新增/修改记录的表单，需要用户配置
    CU_FormPanel: {},
    //新增/修改记录的窗口，不需要用户配置
    CU_window: '',
    //新增/修改记录的窗口的尺寸
    CU_Window_Width: 200,
    CU_Window_Height: 200,

    //是否可以搜索，搜索字段的key是"searchkey"
    searchFlag: false,
    searchFieldEmptyText: '',//搜索文本框的空文本提示
    serachKey_Id: '',
    specialData: '',//用于保存特殊数据，比如每次打开添加窗口时，都要显示的特殊数据，只要面板有相应的字段，就能lode进去

    //查询的数据存储
    DataStore: '',
    //查询的列模式
    DataCM: new Array(),
    SM: '',
    //是否分页
    paging: false,
    //扩展部分，扩展tbar和column
    //扩展功能按钮文本内容数组
    extendTopBtn: new Array(),
    //列尾扩展数组
    extendEndCM: new Array(),
    //列头扩展数组
    extendBeginCM: new Array(),

    //是否表单校验
    formPanelVerify: false,
    //进行删除和修改之前做的操作或判断
    beforeDeleteMethod: '',
    beforeUpdateMethod: '',
    beforeCreateMethod: '',
    afterDeleteMethod: '',
    afterUpdateMethod: '',
    afterCreateMethod: '',
    beforeCreateSubmitMethod: '',
    beforeUpdateSubmitMethod: '',
    collapsed: false,
    justCopy: false,
    anchor: "100%",
    viewConfig: {
        stripeRows: true, // 斑马线
        // 不产横向生滚动条, 各列自动扩展自动压缩, 适用于列数比较少的情况
        forceFit: true,
        enableTextSelection: true
    },

    // 表格面板标题,默认为粗体，我不喜欢粗体，这里设置样式将其格式为正常字体
    loadMask: {
        msg: '正在加载表格数据,请稍等...'
    },
    border: true,
    requires: [
        'Ext.grid.plugin.CellEditing'],
    initComponent: function () {
        var me = this;
        var tbarArray = new Array();
        if (me.extendEndCM.length > 0) {
            me.extendCMFun(me.extendEndCM, false);
        }
        if (me.extendBeginCM.length > 0) {
            me.extendCMFun(me.extendBeginCM, true);
        }
        if (me.SM != '') {
            me.DataCM.splice(0, 0, me.SM);
            this.selModel = me.SM;
        }
        var grid_cm = me.DataCM;
        this.columns = grid_cm; // 列模型
        this.store = me.DataStore;
        if (me.paging) {
            var paging_combo =
                Ext.create('Ext.form.field.ComboBox', {
                    typeAhead: true,
                    triggerAction: 'all',
                    lazyRender: true,
                    queryMode: 'local',
                    store: new Ext.data.ArrayStore({
                        fields: ['value', 'text'],
                        data: [
                            [10, '10条/页'],
                            [20, '20条/页'],
                            [50, '50条/页'],
                            [100, '100条/页'],
                            [250, '250条/页'],
                            [500, '500条/页']
                        ]
                    }),
                    valueField: 'value',
                    displayField: 'text',
                    value: '20',
                    editable: false,
                    width: 85
                });

            var paging_number = parseInt(paging_combo.getValue());
            me.store.proxy.extraParams.limit = paging_number;
            me.store.pageSize = paging_number;
            me.store.on("beforeload", function () {
                Ext.apply(me.store.proxy.extraParams, {type: paging_combo.getValue()});
            });
            if (Ext.isEmpty(me.store.pageSize)) {
                me.store.pageSize = 20;
            }
            paging_combo.on("select", function (comboBox) {
                paging_bbar.pageSize = parseInt(comboBox.getValue());
                paging_number = parseInt(comboBox.getValue());
                me.store.proxy.extraParams.limit = paging_number;
                me.store.pageSize = paging_number;
                me.store.reload();
            });
            var paging_bbar = new Ext.PagingToolbar({
                pageSize: paging_number,
                store: me.store,
                displayInfo: true,
                displayMsg: '显示{0}条到{1}条,共{2}条',
                plugins: [Ext.create('Ext.ux.ProgressBarPager')], // 分页进度条
                emptyMsg: "没有符合条件的记录",
                items: ['-', '&nbsp;&nbsp;', paging_combo]
            })
            this.bbar = paging_bbar;
        }
        if (me.searchFlag) {
            me.DataStore.on('beforeload', function () {
                me.DataStore.proxy.extraParams.searchkey = me.down('textfield[name=searchKey]').getValue();
            });
            tbarArray.push(new Ext.form.TextField({
                emptyText: me.searchFieldEmptyText,
                enableKeyEvents: true,
                listeners: {
                    afterrender: function () {
                        me.serachKey_Id = this.id;
                    },
                    specialkey: function (field, e) {
                        if (e.getKey() == Ext.EventObject.ENTER) {
                            if (me.paging) {
                                me.DesignQuery(me.DataStore, me.down('pagingtoolbar').pageSize, field.getValue());
                            } else {
                                me.DesignQuery(me.DataStore, null, field.getValue());
                            }

                        }
                    }
                },
                width: 130
            }));
            tbarArray.push({
                text: '查询',
                iconCls: 'previewIcon',
                handler: function () {
                    if (me.paging) {
                        me.DesignQuery(me.DataStore, me.down('pagingtoolbar').pageSize, Ext.getCmp(me.serachKey_Id).getValue());
                    } else {
                        me.DesignQuery(me.DataStore, null, Ext.getCmp(me.serachKey_Id).getValue());
                    }

                }
            })
        }

        if (me.createFlag) {
            tbarArray.push({
                text: '新增',
                iconCls: 'addIcon',
                handler: function () {
                    me.extendCreate();
                }
            });

        }
        if (me.updateFlag) {
            tbarArray.push({
                text: '修改',
                iconCls: 'checkIcon',
                handler: function () {
                    me.extendUpdate();
                }
            });

        }
        if (me.delFlag) {
            tbarArray.push({
                text: '删除',
                iconCls: 'deleteIcon',
                handler: function () {
                    me.extendDelete();
                }
            });

        }
        if (me.extendTopBtn.length > 0) {
            for (var j = 0; j < me.extendTopBtn.length; j++) {
                tbarArray.push(me.extendTopBtn[j])
            }
        }
        this.tbar = tbarArray;
        this.callParent(arguments);

    },
    DesignQuery: function (store, pageSize, searchkey) {
//        if (searchkey == '') {
//            Ext.MessageBox.alert('提示', '查询条件不能为空');
//            initDesign_store.removeAll();
//            return false;
//        }
        store.proxy.extraParams.searchkey = searchkey;
        if (pageSize == null) {
            store.reload({})
        } else {
            store.reload({
                params: {
                    start: 0,
                    limit: parseInt(pageSize)
                }
            });
        }
    },
    //扩展列模式数组
    extendCMFun: function (ExtendCm, inBegin) {
        if (inBegin) {
            inBegin = true;
        } else {
            inBegin = false;
        }
        var cmlength = ExtendCm.length;
        var me = this;
        if (cmlength > 0) {
            //在开头扩展列
            if (inBegin) {
                for (var i = cmlength - 1; i >= 0; i--) {
                    me.DataCM.splice(0, 0, ExtendCm[i]);

                }
            } else
            //在末尾扩展列
            {
                for (var i = 0; i < cmlength; i++) {
                    me.DataCM.push(ExtendCm[i]);
                }
            }
        }


    },
    extendCreate: function () {
        var me = this;
        if (me.beforeCreateMethod != '') {
            me.beforeCreateMethod(me.params, function (returndata) {
                if (returndata) {
                    me.createFunction();
                }
            });
        } else {
            me.createFunction();
        }

    },
    extendUpdate: function () {
        var me = this;
        var rec = this.getSelectionModel().getSelection()[0];
        if (Ext.isEmpty(rec)) {
            Ext.Msg.alert('提示', '请选择要修改的记录');
            return;
        }
        rec = rec.data;
        if (me.beforeUpdateMethod != '') {
            me.beforeUpdateMethod(Ext.apply(rec, me.params), function (returndata) {
                if (returndata) {
                    me.updateFunction(rec);
                }
            });

        } else {
            me.updateFunction(rec);
        }


    },
    extendDelete: function () {
        var me = this;
        var rec = this.getSelectionModel().getSelection()[0];
        if (Ext.isEmpty(rec)) {
            Ext.Msg.alert('提示', '请选择要删除的记录');
            return;
        }
        rec = rec.data;
        if (me.beforeDeleteMethod != '') {
            me.beforeDeleteMethod(Ext.apply(rec, me.params), function (returndata) {
                if (returndata) {
                    me.deleteFunction(rec);
                }
            });
        } else {
            me.deleteFunction(rec);
        }


    },
    deleteFunction: function (rec) {
        var me = this;
        me.params.operate = 'delete';
        Ext.apply(me.params, rec.data);
        //如果删除前要校验就调用校验的方法
        var msgTip = Ext.MessageBox.show({
            closable: false,
            title: '提示',
            width: 250,
            msg: '数据处理中,请稍后......'
        });
        Ext.Ajax.request({
            url: me.delUrl,
            success: function (response) {
                var result = Ext.JSON.decode(response.responseText);
                msgTip.hide();
                if (result.error) {
                    Ext.Msg.alert('提示', result.error);
                }
                else {
                    if (me.afterDeleteMethod != '' && typeof(me.afterDeleteMethod) == 'function') {
                        me.afterDeleteMethod();
                    }
                    Ext.Msg.alert('提示', result.success);
                }
                me.DataStore.reload();
            },
            failure: function () {
                Ext.Msg.alert('提示', '数据传输失败，请联系相关人员');
            },
            timeout: 3000000,// default 30000 milliseconds
            params: me.params
        });

    },
    createFunction: function () {
        var me = this;
        me.params.operate = 'create';
        if (me.CU_window != '') {
            this.CU_FormPanel.getForm().getEl().dom.reset();
        }
        if (me.specialData != '') {
            var rec = new Ext.data.Record(me.specialData);
            this.CU_FormPanel.getForm().loadRecord(rec)
        }
        if (me.afterCreateMethod != '' && typeof(me.afterCreateMethod) == 'function') {
            me.showWin(me.createUrl, me.createTitle, me.afterCreateMethod);
        } else {
            me.showWin(me.createUrl, me.createTitle);

        }

    },
    updateFunction: function (rec) {
        var me = this;
        me.params.operate = 'update';
        Ext.apply(me.params, rec.data);
        this.CU_FormPanel.getForm().loadRecord(rec);
        if (me.afterUpdateMethod != '' && typeof(me.afterUpdateMethod) == 'function') {

            me.showWin(me.updateUrl, me.updateTitle, me.afterUpdateMethod);
        } else {
            me.showWin(me.updateUrl, me.updateTitle);
        }

    },
    showWin: function (url, title, backfun) {
        var me = this;
        var isValid = true;
        if (me.CU_window == '') {
            me.CU_window = Ext.create('Ext.window.Window', {
                closeAction: 'hide',
                border: false,
                width: me.CU_Window_Width,
                height: me.CU_Window_Height,
                resizable: false,
                center: true,
                modal: true,
                items: [me.CU_FormPanel],
                fbar: {
                    items: [
                        {
                            xtype: 'button', text: '保存', iconCls: 'acceptIcon', handler: function () {
                            var btn = this;
                            if (me.formPanelVerify) {
                                isValid = me.CU_FormPanel.getForm().isValid();
                            }
                            if (isValid) {
                                var formData = Ext.apply(me.params, me.CU_FormPanel.getForm().getValues());
                                if (me.beforeCreateSubmitMethod != '' || me.beforeUpdateSubmitMethod != '') {
                                    if (url == me.createUrl) {
                                        me.beforeCreateSubmitMethod(formData, function (returndata) {
                                            if (returndata) {
                                                me.submitMethod(url, backfun);
                                            }
                                        });
                                    } else if (url == me.updateUrl) {
                                        me.beforeUpdateSubmitMethod(formData, function (returndata) {
                                            if (returndata) {
                                                me.submitMethod(url, backfun);
                                            }
                                        });
                                    }


                                } else {
                                    me.submitMethod(url, backfun);
                                }
                            } else {
                                Ext.Msg.alert('提示', '表单数据不全');
                            }

                        }
                        }
                    ]
                }

            });
        }
        me.CU_window.setTitle(title)
        me.CU_window.show()
    },
    submitMethod: function (url, backfun) {
        var me = this;
        var formData = Ext.apply(me.params, me.CU_FormPanel.getForm().getValues());
        var msgTip = Ext.MessageBox.show({
            closable: false,
            title: '提示',
            width: 250,
            msg: '数据处理中,请稍后......'
        });
        Ext.Ajax.request({
            url: url,
            success: function (response) {
                var result = Ext.JSON.decode(response.responseText);
                msgTip.hide();
                if (result.error) {
                    Ext.Msg.alert('提示', result.error);
                }
                else {
                    Ext.Msg.alert('提示', result.success);
                    me.CU_window.hide();
                    if (backfun) {
                        backfun();
                    }
                    me.DataStore.load();
                }
                return;

            },
            failure: function () {
                Ext.Msg.alert('提示', '数据传输失败，请联系相关人员');
            },
            timeout: 3000000,// default 30000 milliseconds
            params: formData
        });

    }


});

/**
 * 调用通用附件的change方法去改变附件的模式
 * @param Model  要改变的模式boolean
 *  @param AppendixId  要改变的附件组件id
 *
 */
function changeAppendixModel(AppendixId, Model) {
    if (Ext.getCmp(AppendixId)) {
        Ext.getCmp(AppendixId).getGridPanel().changeModel(Model);
        Ext.getCmp(AppendixId).getGridPanel().init();
    }

}

/**
 *
 * @param formid
 * @param to_id
 * @param operate   1表示上传，2表示下载附件
 * @param type 上传附件的type
 */
function DownloadOrUploadMaterialAppendix(formid, to_id, operate, type) {
    var MaterialAppendix;
    var title = '上传料单';
    var buttontext = '上传附件';
    var params = {};
    params.formid = formid;
    if (operate == 1) {
        MaterialAppendix = new CM.upLoadGrid_Expand({
            simpleShow: true,
            upLoadFlag: true,
            collapsible: false,
            title: '',
            hasVersion: true,
            autoLoad: true,
            oneMode: true,
            fileKey: 'T_PM_MaterialAppendix_File',
            type: type,
            to_id: to_id,
            uploadUrl: '/ProduceAction.ered?reqCode=doBindingAppendix',
            fileTypes: '*.*', // 在这里限制文件类型:'*.jpg,*.png,*.gif'
            fileTypesDescription: '所有文件',
            RequestParams: params,
            callbackfun: function () {
                Ext.StoreMgr.lookup("MaterialhistoryStore").reload();
                Ext.StoreMgr.lookup("ProductMeterial_store").reload();
                Ext.StoreMgr.lookup("CustomizeMeterial_store").reload();
            }
        })  //1表示成品件料单明细附件，2表示定制件料单明细附件
    } else {
        title = '下载料单';
        buttontext = "关闭";
        MaterialAppendix = new CM.upLoadGrid_Expand({
            upLoadFlag: false,
            collapsible: false,
            title: '',
            autoLoad: true,
            fileKey: 'T_PM_MaterialAppendix_File',
            type: type,
            to_id: to_id
        })  //1表示成品件料单明细附件，2表示定制件料单明细附件
        var MaterialWin = new Ext.Window({
            title: '<span class="commoncss">' + title + '</span>', // 窗口标题
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
            items: [MaterialAppendix],
            buttons: [
                { // 窗口底部按钮配置
                    text: buttontext, // 按钮文本
                    iconCls: 'acceptIcon', // 按钮图标
                    handler: function () {
//                        if(operate==1)
//                        {
//                            Ext.Ajax.request({
//                                url: 'ProduceAction.ered?reqCode=doBindingAppendix',
//                                success: function (response) {
//                                    Ext.Msg.alert('提示',response.responseText);
//                                    Ext.StoreMgr.lookup("MaterialhistoryStore").reload();
//                                    Ext.StoreMgr.lookup("ProductMeterial_store").reload();
//                                    Ext.StoreMgr.lookup("CustomizeMeterial_store").reload();
//                                    MaterialWin.close();
//                                    MaterialAppendix.destroy();
//                                },
//                                failure: function (response) {
//                                    Ext.Msg.alert('提示', "获取当前登陆用户失败");
//                                }  ,
//                                params:{
//                                    formid:formid,
//                                    tmp_id:MaterialAppendix.tmp_id ,
//                                    type:type
//                                }
//                            });  }
//                        else
//                        {
                        MaterialAppendix.destroy();
                        MaterialWin.close();

//                        }
                    }
                }
            ]
        });
        MaterialWin.show();
    }

}
/**
 *
 * @param formid
 * @param to_id
 * @param operate   1表示上传，2表示下载附件
 * @param type 上传附件的type
 */
function DownloadOrUploadPackageInfoAppendix(params, to_id, operate, type, backfun) {
    var MaterialAppendix;
    var title = '导入部件信息';
    var product_id;
    if (params != '') {
        product_id = params.product_id
    }
    if (operate == 1) {
        var casetype = 0;
        Ext.Msg.confirm('请确认', '是否混装', function (btn, text) {
            if (btn == 'yes') {
                casetype = 1;
            }
            params.casetype = casetype;
            MaterialAppendix = new CM.upLoadGrid_Expand({
                upLoadFlag: true,
                collapsible: false,
                title: '',
                simpleShow: true,
                autoLoad: true,
                hasVersion: true,
                oneMode: true,
                fileKey: 'T_PM_PackageAppendix_File',
                type: type,
                to_id: to_id,
                to_id_: product_id,
                uploadUrl: '/ProduceAction.ered?reqCode=importExcel',
                fileTypes: '*.xls', // 在这里限制文件类型:'*.jpg,*.png,*.gif'
                fileTypesDescription: '2003版本的excel',
                RequestParams: params,
                callbackfun: function () {
                    if (backfun) {
                        backfun();
                    }
                }
            })  //1表示成品件料单明细附件，2表示定制件料单明细附件
        });

    } else {
        title = '下载部件信息excel文件';
        MaterialAppendix = new CM.upLoadGrid_Expand({
            upLoadFlag: false, collapsible: false, title: '',
            autoLoad: true, fileKey: 'T_PM_PackageAppendix_File', type: type, to_id: to_id
        })  //1表示成品件料单明细附件，2表示定制件料单明细附件
        var MaterialWin = new Ext.Window({
            title: '<span class="commoncss">' + title + '</span>', // 窗口标题
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
            items: [MaterialAppendix],
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
    }
}
/**
 *
 * @param formid        定制件或成品件的id
 *  * @param type        3表示是订单生产，定制件设置取库数量
 *                      2表示是订单生产，成品件设置取库数量
 *                      1表示是库存生产，设置生产数量
 * @param cur_storageNumber当前的成品件或定制件的库存数量，用于判断如果设置的取库数量大于库存数量的报警
 */
function setTackNumber(gridpanelid, cur_stockNumber, type, numberFieldname, backfun) {
    if (Ext.isEmpty(cur_stockNumber)) {
        cur_stockNumber = 0;
    }
    var record = Ext.getCmp(gridpanelid).getSelectionModel().getSelected();
    if (Ext.isEmpty(record)) {
        Ext.Msg.alert('提示', '请选择要操作的记录');
        return;
    }
    var product_id = record.get('product_id');
    var hidestocknumber = true;
    var textvalue = '生产数量';
    var wintitle = '设置数量';
    var operationname = '您确定要生产'
    var lastoptionName = "个库存吗?";
    var takestocknumber;
    var remark = record.get('remark');
    if (type == 2) {
        if (cur_stockNumber == 0) {
            Ext.Msg.alert('提示', '当前库存为零，无法设置取库数量');
            return;
        }
        hidestocknumber = false;
        textvalue = '取库数量';
        wintitle = '设置取库数量';
        operationname = '您确定要取';
        takestocknumber = record.get('takestocknumber');
    } else {
        takestocknumber = record.get('producenum');
    }
    if (takestocknumber == '' || takestocknumber == null) {
        takestocknumber = 0;
    }
    var setTackNumberformPanel = new Ext.form.FormPanel({
        border: false,
        anchor: "100%",
        labelAlign: 'right',
        bodyStyle: 'padding:5 5 5',
        labelWidth: 120,
        border: false,
        items: [
            {
                xtype: 'textfield',
                fieldLabel: '当前库存量',
                readOnly: true,
                hideLabel: hidestocknumber,
                hidden: hidestocknumber,
                border: false,
                style: 'background:none;border:none;',
                anchor: '100%',
                value: cur_stockNumber
            },
            {
                xtype: 'numberfield',
                fieldLabel: textvalue,
                anchor: '100%',
                name: 'takestocknumber',
                value: takestocknumber,
                allowBlank: false,
                regex: /^\d*$/
            },
            {
                xtype: 'textarea', name: 'remark', anchor: '100%', fieldLabel: '备注'
            }
        ]
    });
    setTackNumberformPanel.getForm().loadRecord(record);
    var setTackNumberWindow = new Ext.Window({
        title: '<span class="commoncss">' + wintitle + '</span>', // 窗口标题
        layout: 'form', // 设置窗口布局模式
        width: 400,
        autoHeight: true,
        draggable: true,// 是否可拖动
        closable: true, // 是否可关闭
        modal: true,
        closeAction: 'close',
        border: true,
        pageX: document.body.clientWidth / 2 - 500 / 2, // 页面定位Y坐标
        items: [setTackNumberformPanel],
        buttons: [
            {
                text: '设置',
                iconCls: 'acceptIcon',
                handler: function () {
                    if (setTackNumberformPanel.getForm().isValid()) {
                        var takestocknumber = setTackNumberformPanel.getForm().findField('takestocknumber').getValue();
                        var formpanelfieldvalues = setTackNumberformPanel.getForm().getFieldValues();
                        Ext.Msg.confirm('请确认', '<span style="color:red">' + operationname + takestocknumber + lastoptionName + '</span>',
                            function (btn, text) {
                                if (btn == 'yes') {
                                    if (type == 2) {
                                        if (takestocknumber > cur_stockNumber) {
                                            Ext.Msg.alert('提示', '取库数量大于当前产品库存数量,请重新输入');
                                            return;
                                        }
                                        if (takestocknumber > record.get('num')) {
                                            Ext.Msg.alert('提示', '取库数量大于当前产品生产数量,请重新输入');
                                            return;
                                        }
                                    }
                                    if (takestocknumber == 0) {
                                        Ext.Msg.alert('提示', textvalue + '数量不能为0,请重新输入');
                                        return;
                                    }
                                    Ext.apply(record.data, formpanelfieldvalues);
                                    Ext.getCmp(gridpanelid).getStore().sort('submit_datetime', 'DESC');
                                    formpanelfieldvalues.takestocknumber = takestocknumber;
                                    record.set(numberFieldname, takestocknumber)
                                    if (backfun) {
                                        backfun(formpanelfieldvalues)
                                    }
                                    setTackNumberWindow.close();
                                }
                            });

                    } else {
                        Ext.Msg.alert('提示', '表单数据有误,请重新输入');
                    }
                }
            }
        ]
        // 嵌入的表单面板
    });
    setTackNumberWindow.show();
}
/**
 *
 * @param formid  要绑定到谁身上
 * @param to_id   下载模式时，要查看附件的对象id
 * @param operate  上传/下载(1/2)
 * @param type   该附件保存到对应表的type字段值
 * @param title
 * @param fileType
 * @param filetypeDesc
 * @param uploadUrl
 * @param hasVersion  用于onemodel模式时，是否校验附件是否已存在，及如果为false就总的只能传一个附件，为true就每次只能传一个附件，但可以传多次
 * @param oneMode表示只能传一个附件
 * @param showWindowRightNow
 * @param simpleShow
 */
function uploadOrDownloadAppendix(formid, to_id, operate, type, title, fileType, filetypeDesc, uploadUrl, hasVersion, oneMode, showWindowRightNow, simpleShow, fileKey, backfun) {
    var params = {};
    params.formid = formid;
    var Appendix;
    if (operate == 1) {
        if (typeof(hasVersion) == 'undefined') {
            hasVersion = false;
        }
        if (typeof(oneMode) == 'undefined') {
            oneMode = false;
        }
        var fileKeyTmep = false;
        var HaveTemp = '';
        if (type == 5 || type == '5') {
            fileKeyTmep = true;
            HaveTemp = 'T_OR_PROJECT_ALL';
        }
        new CM.upLoadGrid_Expand({
            upLoadFlag: true,
            collapsible: false,
            title: title,
            autoLoad: true,
            oneMode: oneMode,
            simpleShow: simpleShow,
            hasVersion: hasVersion,
            fileKey: fileKey,
            type: type,
            to_id: to_id,
            to_id_: formid,
            showWindowRightNow: showWindowRightNow,
            fileKeyTmep: fileKeyTmep,
            HaveTemp: HaveTemp,
            uploadUrl: uploadUrl,// '/CMAppendixAction.ered?reqCode=addAppendix'
            fileTypes: fileType, // 在这里限制文件类型:'*.jpg,*.png,*.gif'
            fileTypesDescription: filetypeDesc,    //选择文件时的说明
            RequestParams: params,
            callbackfun: function () {
                if (backfun) {
                    backfun()
                }
            }
        })  //1表示成品件料单明细附件，2表示定制件料单明细附件
    } else {
        Appendix = new CM.upLoadGrid_Expand({
            upLoadFlag: false, collapsible: false, title: '',
            autoLoad: true, fileKey: fileKey, type: type, to_id: to_id, fileKeyTmep: fileKeyTmep, HaveTemp: HaveTemp
        })  //1表示成品件料单明细附件，2表示定制件料单明细附件
        var MaterialWin = new Ext.Window({
            title: '<span class="commoncss">' + title + '</span>', // 窗口标题
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
            items: [Appendix],
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
    }

}


/**
 * 人员选择窗口
 * @return {Ext.Window}
 */
function returnUser(id) {
//    if(!seeting){
//        seeting = {};
//    }
    var root = new Ext.tree.AsyncTreeNode({
        id: '001',
        text: '世纪阳光人员表单',
        checked: false,
        expanded: true
    });

    var tbar = new Ext.Toolbar({
        items: [{
            text: '邀请参会人员',
            iconCls: 'arrow_refreshIcon',
            handler: function () {
                // 获取选中节点数组
                var checkedNodes = tree.getChecked();
                if (Ext.isEmpty(checkedNodes)) {
                    Ext.Msg.alert('提示', '没有选中任何人员');
                    return;
                }
                var strName = '';
                var strId = '';
                Ext.each(checkedNodes, function (node) {
                    strName = strName + node.text + ',';
                    strId = strId + node.id + ',';
                });
                // 可以将此字符串传到后台处理
//                Ext.Msg.alert('提示', strName);
                Ext.getCmp(id).setValue(strName);
                if (undefined != Ext.getCmp(id + '_id')) {
                    Ext.getCmp(id + '_id').setValue(strId);
                }
                roleGrantWindow.close();

            }
        }]
    });

    var tree = new Ext.tree.TreePanel({
        loader: new Ext.tree.TreeLoader({
            baseAttrs: {},
            dataUrl: 'Quick.ered?reqCode=getEmployee'
        }),
        title: '',
        tbar: tbar,
//        renderTo : 'treeDiv',
        width: 400,
        // border: false, //面板边框
        useArrows: false, // 箭头节点图标
        root: root, // 根节点
        height: 500,
        autoScroll: true, // 内容溢出时产生滚动条
//        checked : false,
        animate: false

        // 是否动画显示
    });


    var roleGrantWindow = new Ext.Window({
        layout: 'fit',
        width: 400,
        height: document.body.clientHeight,
        resizable: true,
        draggable: true,
        closeAction: 'close',
        closable: true,
        title: '<span class="commoncss">参会人员选择</span>',
        // iconCls : 'award_star_silver_3Icon',
        modal: true,
        pageY: 15,
        pageX: document.body.clientWidth / 2 - 420 / 2,
        collapsible: true,
        titleCollapse: true,
        maximizable: false,
        // animateTarget: document.body,
        // //如果使用autoLoad,建议不要使用动画效果
        buttonAlign: 'right',
        constrain: true,
        items: [tree],
        buttons: [{
            text: '关闭',
            iconCls: 'deleteIcon',
            handler: function () {
                roleGrantWindow.close();
            }
        }]
    });
//
//    tree.on("click", function(node, e) {
//        Ext.MessageBox.alert('提示', 'ID:' + node.id + " text:"
//        + node.text);
//    });
//    tree.getRootNode().select();

    return roleGrantWindow;
}