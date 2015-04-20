/**
 * Created with IntelliJ IDEA.
 * User: 黄琦鸿
 * Date: 13-12-31
 * Time: 下午3:05
 * To change this template use File | Settings | File Templates.
 */
    //--------------------定义类--------------------
Ext.define('Ext4.Com.GridPanel.CommonGridPanel', {
    extend: 'Ext.grid.Panel',
    requires: ['Ext.grid.plugin.CellEditing', 'Ext.ux.ProgressBarPager'],
    alias: 'widget.commongridpanel',
    forceFit: true,
    backFunctionForChoice: '',
    EditAble: false,
    saveBtnText: '保存',
    beforeFuncrionForChoice: '',//该方法第一个参数是数据参数，第二个参数是回调函数
    canMultiChoice: true,
    showSelModel: false,
    forChoice: false,//如果是选择面板的数据加载，就把该参数传到后台去，只查出为外键空的数据
    autoScroll: true,
    stripeRows: true, // 斑马线
    //提交后台的参数
    params: {},  //每次提交都会提交上去的参数
    cloneparams: {},
    hideSaveBtn: false,
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
    CU_FormPanel_FUN: '',
    //新增/修改记录的窗口，不需要用户配置
    CU_window: '',
    viewConfig: {
        fixed: true
    },
    //新增/修改记录的窗口的尺寸
    getCU_WidthAndHeight: function () {
        return {
            CU_Window_Width: 200,
            CU_Window_Height: 200
        }
    },
    //是否可以搜索，搜索字段的key是"searchkey"
    searchFlag: false,
    searchFieldEmptyText: '',//搜索文本框的空文本提示
    specialData: '',//用于保存特殊数据，比如每次打开添加窗口时，都要显示的特殊数据，只要面板有相应的字段，就能lode进去

    //查询的数据存储
    DataStore: '',
    extra_Params: {},
    //查询的列模式
    DataCM: new Array(),
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
    formPanelVerify: true,
    DefineVerify: '',//表单自定义校验
    //进行删除和修改之前做的操作或判断
    beforeDeleteMethod: '',
    beforeUpdateMethods: '',
    beforeCreateMethod: '',
    beforeResetInCreateMethod: '',
    afterDeleteMethod: '',
    afterUpdateMethod: '',
    afterCreateMethod: '',
    beforeCreateSubmitMethod: '',
    beforeUpdateSubmitMethod: '',
    beforeLoadDataMethod: '',
    afterLoadDataMethod: '',
    beforeWinCloseMethod: '',
    collapsed: false,
    editText: '修改',
    delText: '删除',
    createText: '新增',
    anchor: "100%",
    loadMask: {
        msg: '正在加载表格数据,请稍等...'
    },
    constructor: function () {
        this.extendTopBtn = new Array();
        this.extendEndCM = new Array();
        this.extendBeginCM = new Array();
        this.DataCM = new Array();
        this.callParent(arguments);
    },
    initComponent: function () {
        var me = this;
        if (me.EditAble) {
            me.plugins = [
                Ext.create('Ext.grid.plugin.CellEditing', {
                    clicksToEdit: 1/*,
                     listeners: {
                     validateedit: function (e) {
                     e.cancel = true;
                     e.record.data[e.field] = e.value;
                     }
                     }*/
                })
            ]
        }
        me.cloneparams = Ext.clone(me.params);
        var selModel = Ext.create('Ext.selection.CheckboxModel');
        if (!me.canMultiChoice) {
            selModel = Ext.create('Ext.selection.CheckboxModel', {
                mode: 'SINGLE'
            });
        }
        if (me.showSelModel) {
            me.selModel = selModel;
        }

        var tbarArray = new Array();
        if (me.extendEndCM.length > 0) {
            me.extendCMFun(me.extendEndCM, false);
        }
        if (me.extendBeginCM.length > 0) {
            me.extendCMFun(me.extendBeginCM, true);
        }
        me.columns = me.DataCM; // 列模型
        Ext.apply(me.DataStore.getProxy().extraParams, me.extra_Params);
        me.store = me.DataStore;

        if (me.paging) {
            var paging_combo = Ext.create('Ext.form.field.ComboBox', {
                triggerAction: 'all',
                queryMode: 'local',
                store: new Ext.data.ArrayStore({
                    fields: ['value', 'text'],
                    data: [
                        [10, '10条/页'],
                        [25, '25条/页'],
                        [50, '50条/页'],
                        [100, '100条/页'],
                        [250, '250条/页'],
                        [500, '500条/页']
                    ]
                }),
                valueField: 'value',
                displayField: 'text',
                value: '25',
                editable: false,
                width: 85
            });
            paging_combo.on("select", function (comboBox) {
                var number = parseInt(comboBox.getValue());
                paging_bbar.pageSize = number;
                me.store.pageSize = number;
                me.store.loadPage(1);
            });


            var paging_bbar =
                new Ext.PagingToolbar({
                    pageSize: me.store.pageSize,
                    store: me.store,
                    displayInfo: true,
                    displayMsg: '显示{0}条到{1}条,共{2}条',
                    emptyMsg: "没有符合条件的记录",
                    plugins: [Ext.create('Ext.ux.ProgressBarPager')], // 分页进度条
                    items: ['-', '&nbsp;&nbsp;', paging_combo]
                });


            this.bbar = paging_bbar;
        }
        else {
            if (me.DataStore.getProxy().extraParams) {
                me.DataStore.getProxy().extraParams.limit = 9999999;
            }
        }
        if (me.searchFlag) {
            me.DataStore.on('beforeload', function () {
                me.DataStore.proxy.extraParams.searchkey = me.down('textfield[name=searchKey]').getValue();
            });
            tbarArray.push({
                    xtype: 'textfield', name: 'searchKey', emptyText: me.searchFieldEmptyText,
                    enableKeyEvents: true,
                    width: 130,
                    listeners: {
                        specialkey: function (field, e) {
                            if (e.getKey() == Ext.EventObject.ENTER) {
                                if (me.paging) {
                                    me.StoreQuery(me.DataStore, paging_bbar.pageSize, field.getValue());
                                } else {
                                    me.StoreQuery(me.DataStore, null, field.getValue());
                                }

                            }
                        }
                    }
                }
            );
            tbarArray.push({
                text: '查询',
                iconCls: 'previewIcon',
                handler: function () {
                    if (me.paging) {
                        me.StoreQuery(me.DataStore, paging_bbar.pageSize, me.down('textfield[name=searchKey]').getValue());
                    } else {
                        me.StoreQuery(me.DataStore, null, me.down('textfield[name=searchKey]').getValue());
                    }

                }
            })
        }

        if (me.createFlag) {
            tbarArray.push({
                text: me.createText,
                iconCls: 'addIcon',
                handler: function () {
                    me.extendCreate();
                }
            });

        }
        if (me.updateFlag) {
            tbarArray.push({
                text: me.editText,
                iconCls: 'checkIcon',
                handler: function () {
                    me.extendUpdate();
                }
            });

        }
        if (me.delFlag) {
            tbarArray.push({
                text: me.delText,
                iconCls: 'deleteIcon',
                handler: function () {
                    Ext.Msg.confirm('请确认', me.delText + '操作确认', function (btn, text) {
                        if (btn == 'yes') {
                            me.extendDelete();
                        }
                    });

                }
            });

        }
        if (me.forChoice) {
            me.DataStore.proxy.extraParams.forChoice = me.forChoice;
            var choiceBtn = {
                xtype: 'button',
                iconCls: 'acceptIcon',
                text: '选择',
                handler: function () {
                    var rec = me.getSelectionModel().getSelection();
                    if (Ext.isEmpty(rec)) {
                        Ext.Msg.show({
                            title: '提示',
                            msg: '请选择记录',
                            buttons: Ext.Msg.OK,
                            icon: Ext.MessageBox.WARNING
                        });
                        return;
                    }
                    //如果在选择按钮点击之前要处理某些业务，可以把这个业务配置在beforeFuncrionForChoice上，
                    if (me.beforeFuncrionForChoice != '' && typeof (me.beforeFuncrionForChoice) == 'function') {
                        me.beforeFuncrionForChoice(rec, me.backFunctionForChoice);
                    } else {
                        if (me.backFunctionForChoice != '' && typeof (me.backFunctionForChoice) == 'function') {
                            me.backFunctionForChoice(rec);
                        }
                    }
                }
            };
            if (!Ext.Array.forEach(me.extendTopBtn, function (item) {
                    if (item.text == '选择') {
                        Ext.Array.remove(me.extendTopBtn, item);
                    }
                }))
                me.extendTopBtn.unshift(choiceBtn);
        }
        if (me.extendTopBtn.length > 0) {
            for (var j = 0; j < me.extendTopBtn.length; j++) {
                tbarArray.push(me.extendTopBtn[j])
            }
        }
        me.dockedItems = [
            {
                xtype: 'toolbar',
                dock: 'top',
                items: tbarArray
            }
        ];
        //_____________初始化结束_____________
        me.callParent(arguments);
    },
    StoreQuery: function (store_, pageSize, searchkey) {
        store_.proxy.extraParams.searchkey = searchkey;
        if (pageSize == null) {
            store_.reload()
        } else {
            store_.proxy.extraParams.limit = parseInt(pageSize);
            store_.reload();
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
        if (me.CU_FormPanel_FUN != '') {
            this.CU_FormPanel = me.CU_FormPanel_FUN();
        } else {
            Ext.Msg.show({
                title: '提示',
                msg: '请选择配置CU_FormPanel_FUN，来创建面板',
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.WARNING
            });
            return;
        }
        me.params = Ext.clone(me.cloneparams);
        if (me.beforeResetInCreateMethod != '') {
            me.beforeResetInCreateMethod(me.params, function (returndata) {
                if (returndata) {
                    me.docreate()
                }
            });
        } else {
            me.docreate();
        }
    },
    docreate: function () {
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
        var rec = me.getSelectionModel().getSelection();
        if (Ext.isEmpty(rec)) {
            Ext.Msg.show({
                title: '提示',
                msg: '请选择要修改的记录',
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.WARNING
            });
            return;
        }
        if (me.CU_FormPanel_FUN != '') {
            this.CU_FormPanel = me.CU_FormPanel_FUN(rec);
        } else {
            Ext.Msg.show({
                title: '提示',
                msg: '请选择配置CU_FormPanel_FUN，来创建面板',
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.WARNING
            });
            return;
        }
        me.params = Ext.clone(me.cloneparams);
        rec = rec[0];
        if (me.beforeUpdateMethods != '') {
            var cloneVar = Ext.clone(rec.data);
            Ext.apply(cloneVar, me.params);
            var allSuccess = true;
            for (var len = 0; len < me.beforeUpdateMethods.length; len++) {
                me.beforeUpdateMethods[len](cloneVar, function (returndata) {
                    if (!returndata) {
                        allSuccess = false;
                    }
                    if (typeof(me.afterDeleteMethod) == 'function') {
                        alert(1)
                    }
                });
                if (!allSuccess) {
                    break;
                }
            }
            if (allSuccess) {
                me.updateFunction(rec);
            } else {
                this.CU_FormPanel.destroy();
                this.CU_FormPanel = '';
            }
        } else {
            me.updateFunction(rec);
        }


    },
    extendDelete: function () {
        var me = this;
        var rec = me.getSelectionModel().getSelection()[0];
        if (Ext.isEmpty(rec)) {
            Ext.Msg.show({
                title: '提示',
                msg: '请选择要' + me.delText + '的记录',
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.WARNING
            });
            return;
        }
        rec = rec.data;
        if (me.beforeDeleteMethod != '') {
            var cloneVar = Ext.clone(rec);
            me.beforeDeleteMethod(Ext.apply(cloneVar, me.params), function (returndata) {
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
        var cloneVar = Ext.clone(me.params);
        Ext.apply(cloneVar, rec);
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
                    Ext.Msg.show({
                        title: '提示',
                        msg: result.error,
                        buttons: Ext.Msg.OK,
                        icon: Ext.MessageBox.WARNING
                    });
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
                Ext.Msg.show({
                    title: '提示',
                    msg: '数据传输失败，请联系相关人员',
                    buttons: Ext.Msg.OK,
                    icon: Ext.MessageBox.WARNING
                });
            },
            timeout: 3000000,// default 30000 milliseconds
            params: cloneVar
        });

    },
    createFunction: function () {
        var me = this;
        me.params.operate = 'create';
        if (me.specialData != '') {
            this.CU_FormPanel.getForm().loadRecord(me.specialData)
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
        if (me.beforeLoadDataMethod != '' && typeof(me.beforeLoadDataMethod) == 'function') {
            me.beforeLoadDataMethod(rec);
        }
        this.CU_FormPanel.getForm().loadRecord(rec);
        if (me.afterLoadDataMethod != '' && typeof(me.afterLoadDataMethod) == 'function') {
            me.afterLoadDataMethod(rec);
        }
        if (me.afterUpdateMethod != '' && typeof(me.afterUpdateMethod) == 'function') {
            me.showWin(me.updateUrl, me.updateTitle, me.afterUpdateMethod);
        } else {
            me.showWin(me.updateUrl, me.updateTitle);
        }

    },
    showWin: function (url, title, backfun) {
        var me = this;
        var CU_size = me.getCU_WidthAndHeight();
//        if (me.CU_window == '') {
        me.CU_window = Ext.create('Ext.window.Window', {
            closeAction: 'destroy',
            border: false,
            layout: 'fit',
            width: CU_size.CU_Window_Width,
            height: CU_size.CU_Window_Height,
            resizable: false,
            center: true,
            constrain: true,
            modal: true,
            items: [me.CU_FormPanel],
            buttons: [
                {
                    xtype: 'button',
                    text: me.saveBtnText,
                    hidden: me.hideSaveBtn,
                    thistitle: title,
                    thisurl: url,
                    iconCls: 'acceptIcon',
                    handler: function () {
                        var title = this.thistitle;
                        var url = this.thisurl;
                        var isValid = true;
                        var fields = me.CU_FormPanel.getForm().getFields();
                        fields.each(function (f) {
                            if (f.xtype == 'textfield') {
                                f.setValue(Ext.String.trim(f.getValue()));
                            }
                        });
                        if (me.formPanelVerify) {
                            if (me.DefineVerify != '') {
                                isValid = me.DefineVerify();
                            }
                            if (!isValid) {
                                Ext.Msg.show({
                                    title: '提示',
                                    msg: '表单数据有误',
                                    buttons: Ext.Msg.OK,
                                    icon: Ext.MessageBox.WARNING
                                });
                                return;
                            }
                            isValid = me.CU_FormPanel.getForm().isValid();
                        }
                        if (isValid) {
                            var cloneVar = Ext.clone(me.params);
                            if (url == me.updateUrl && title == me.updateTitle) {
                                var rec = me.getSelectionModel().getSelection()[0];
                                if (!Ext.isEmpty(rec)) {
                                    Ext.apply(cloneVar, rec.data);
                                }
                            }
//                            Ext.apply(cloneVar, me.CU_FormPanel.getForm().getValues());
                            if (me.beforeCreateSubmitMethod != '' || me.beforeUpdateSubmitMethod != '') {
                                if (url == me.createUrl && title == me.createTitle) {
                                    me.beforeCreateSubmitMethod(cloneVar, function (returndata) {
                                        if (returndata) {
                                            Ext.apply(cloneVar, me.params);
                                            me.submitMethod(cloneVar, url, backfun);
                                        }
                                    });
                                } else if (url == me.updateUrl && title == me.updateTitle) {
                                    me.beforeUpdateSubmitMethod(cloneVar, function (returndata) {
                                        if (returndata) {
                                            Ext.apply(cloneVar, me.params);
                                            me.submitMethod(cloneVar, url, backfun);
                                        }
                                    });
                                }


                            } else {
                                me.submitMethod(cloneVar, url, backfun);
                            }
                        } else {
                            var panelitems = me.CU_FormPanel.getForm().getFields().items;
                            var length = panelitems.length
                            for (var i = 0; i < length; i++) {
                                var temp = panelitems[i];
                                var label = temp.fieldLabel;
                                label = Ext.isEmpty(label) ? temp.boxLabel : label;
                                var errors = temp.getErrors();
                                if (!Ext.isEmpty(errors)) {
                                    Ext.Msg.show({
                                        title: '提示',
                                        msg: label + '：' + errors[0],
                                        buttons: Ext.Msg.OK,
                                        icon: Ext.MessageBox.WARNING
                                    });
                                    break;
                                }
                            }

                        }
                    }
                }
            ]
        });
//        } else {
//            var button = me.CU_window.getDockedItems('toolbar[dock="bottom"]')[0].items.items[0];
//            button.thistitle = title;
//            button.thisurl = url;
//        }
        me.CU_window.setTitle(title)
        me.CU_window.show()
    },
    submitMethod: function (data, url, backfun) {
        var me = this;

        me.CU_FormPanel.getForm().submit({
            url: url,
            waitTitle: '提示',
            method: 'POST',
            waitMsg: '数据处理中,请稍后......',
            timeout: 600,// default 30000 milliseconds
            params: data,
            success: function (action, returnobj) {
                var result = Ext.JSON.decode(returnobj.response.responseText);
                if (result.error) {
                    Ext.Msg.show({
                        title: '提示',
                        msg: result.error,
                        buttons: Ext.Msg.OK,
                        icon: Ext.MessageBox.WARNING
                    });
                }
                else {
                    Ext.Msg.alert('提示', result.success);

                    if (me.beforeWinCloseMethod != '' && typeof(me.beforeWinCloseMethod) == 'function') {
                        me.beforeWinCloseMethod(function (back) {
                            me.CU_window.close();
                            if (backfun) {
                                backfun();
                            }
                        })

                    } else {
                        me.CU_window.close();
                        if (backfun) {
                            backfun();
                        }
                    }
                    me.DataStore.reload();
                }
                return;
            },
            failure: function () {
                Ext.Msg.show({
                    title: '提示',
                    msg: '数据传输失败，请联系相关人员',
                    buttons: Ext.Msg.OK,
                    icon: Ext.MessageBox.WARNING
                });
            }
        });


    }
})
;
