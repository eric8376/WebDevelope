/**
 * 编程环境 IDEA.
 * 编写者: 王少伟
 * 主题:【任务第三大块所有节点】
 * 时间: 2013-07-06  下午2:39
 */
/**
 *工作流第三大块命名空间
 */
var WF3 = WF3 || {};
/**
 *公共表单
 */
WF3.commonForm = Ext.extend(Ext.form.FormPanel, {
    xtype: "form",
    title: '',
    border: false,
    labelWidth: 110,
    bodyStyle: 'overflow-y:auto;overflow-x:hidden;padding:3px;',
    labelAlign: "right",
    layout: "form",
    autoScroll: true,

    initComponent: function () {
        var me = this;
        me.title = "";
        WF3.commonForm.superclass.initComponent.call(this);
    }
});
/**
 * 0、财务补充
 */
WF3.form0 = Ext.extend(WF3.commonForm, {
    layout: 'form',
    initComponent: function () {
        this.items = [
            new Ext.shgcjbxx_start(),
            new Ext.shpmt({
                hideOtherCost: false,
                hiddenPlanePrice: false,
                hiddenExportExcelDataButton: false,
                experTobjqr: true
            }),
            /*new Ext.xgtxx_xgtapry() ,*/new Ext.shzzxgtAppendix({hiddenOriginal: true}),
//            getWF3FieldSet({layout: 'fit', title: '报价单上传<font color=red>*</font>', items: getWF3_SimpleAPX({fieldLabel : '报价单上传',gridSettings:{title:'',type:401,upLoadFlag:true}})}),
            getWF3FieldSet({
                title: '花费明细',
                items: getWF3_items0({needProjectid: true, id: 'grid_expense', read: false})
            })/*,*/
//            getWF3FieldSet({title: '客服补充花费',items : getWF3_items16({needProjectid : true,
//                                                                             id : 'service_expense',
//                                                                             inputMoney : true,
//                                                                             clicksToEdit :1})})
        ];

        WF3.form0.superclass.initComponent.call(this);
    }
});
/**
 * 1、柜台报价
 */
WF3.form1 = Ext.extend(WF3.commonForm, {
    layout: 'form',
    initComponent: function () {
        this.items = [
            new Ext.shgcjbxx_start(),
//            getWF3FieldSet({title: '平面图柜台信息', items: getWF3_items4()}),
            new Ext.shpmt({
                hideOtherCost: false,
                hiddenPlanePrice: false,
                hiddenExportExcelDataButton: false,
                experTobjqr: true
            }),
            /*new Ext.xgtxx_xgtapry() ,*/new Ext.shzzxgtAppendix({hiddenOriginal: true})
//            getWF3FieldSet({layout: 'fit', title: '报价单上传<font color=red>*</font>', items: getWF3_SimpleAPX({fieldLabel : '报价单上传',gridSettings:{title:'',type:411,upLoadFlag:true}})})
        ];

        WF3.form1.superclass.initComponent.call(this);
    }
});
/**
 * 2、发送报价单
 */
WF3.form2 = Ext.extend(WF3.commonForm, {
    layout: 'form',
    initComponent: function () {
        this.items = [
//            getWF3FieldSet({title: '平面图柜台信息', items: getWF3_items4()}),
            new Ext.shgcjbxx_start(),
            new Ext.shpmt({
                hideOtherCost: false,
                hiddenPlanePrice: false,
                hiddenExportExcelDataButton: false,
                experTobjqr: true
            }),
            /*new Ext.xgtxx_xgtapry() ,*/new Ext.shzzxgtAppendix({hiddenOriginal: true})
//            getWF3FieldSet({layout: 'fit', title: '报价单上传<font color=red>*</font>', items: getWF3_SimpleAPX({fieldLabel : '报价单上传',gridSettings:{title:'',type:411,upLoadFlag:true}})})
        ];

        WF3.form2.superclass.initComponent.call(this);
    }
});
/**
 * 3、合同谈判
 */
WF3.form3 = Ext.extend(WF3.commonForm, {
    layout: 'form',
    initComponent: function () {
        this.items = [
            new Ext.shgcjbxx_start(),
//            getWF3FieldSet({layout: 'fit', title: '合同上传<font color=red>*</font>', items: getWF3_SimpleAPX({type:301})}),
            getWF3FieldSet({
                title: '工程需求信息填写<font color=red>*</font>', items: [{
                    xtype: "combo",
                    store: SFZTZZ_store,
                    mode: 'local',
                    allowBlank: false,
                    hiddenName: 'whole_assembly',
                    forceSelection: false, // 选中内容必须为下拉列表的子项
                    editable: false,
                    typeAhead: true,
                    displayField: 'text',
                    valueField: 'value',
                    triggerAction: "all",
                    fieldLabel: "是否整体组装",
                    anchor: "50%"
                }]
            }),
            getWF3FieldSet({title: '合同谈判关键信息填写<font color=red>*</font>', items: getWF3_items3(true)}),
            getWF3FieldSet({title: '合同金额<font color=red>*</font>', items: getWF3_items25(false)}),
//            getWF3FieldSet({title: '合同谈判结果与意见<font color=red>*</font>',items: getWF3_items18()}),
//            getWF3FieldSet({title: '合同签订信息填写<font color=red>*</font>', items: getWF3_items13(true)}) ,
            new Ext.zzpmt()
        ];

        WF3.form3.superclass.initComponent.call(this);
    }
});
/**
 * 4、折扣审批
 */
WF3.form4 = Ext.extend(WF3.commonForm, {
    layout: 'form',
    initComponent: function () {
        this.items = [
            new Ext.shgcjbxx_start(),
            new Ext.khxx(),
            getWF3FieldSet({title: '合同谈判结果与意见<font color=red>*</font>', items: getWF3_items19()}),
            getWF3FieldSet({title: '合同签订信息填写<font color=red>*</font>', items: getWF3_items13(false)}),
            getWF3FieldSet({title: '合同谈判信息', items: getWF3_items3(false)})
        ];

        WF3.form4.superclass.initComponent.call(this);
    }
});
/**
 * 5、工厂确认
 */
WF3.form5 = Ext.extend(WF3.commonForm, {
    layout: 'form',
    initComponent: function () {
        var Customizelist_sm = new Ext.grid.CheckboxSelectionModel({
            singleSelect: true
        });
        var Customizelist_cm = new Ext.grid.ColumnModel([Customizelist_sm, {
            header: '定制件编号',
            sortable: true,
            dataIndex: 'customize_no'
        }, {
            header: '定制件名称',
            sortable: true,
            dataIndex: 'customize_name'
        }, {
            header: '定制件类型',
            sortable: true,
            dataIndex: 'customize_breed'
        }, {
            header: '审核人',
            sortable: true,
            dataIndex: 'approval_username'
        }, {
            header: '数量',
            sortable: true,
            dataIndex: 'num'
        }, {
            header: '审核状态',
            sortable: true,
            renderer: function (value) {
                if (value == 0 || value == '') {
                    return '未审核';
                }
                else if (value == 1) {
                    return '审核通过';
                }
                //2 审核不通过
                else if (value == 2) {
                    return '审核不通过';
                }
            },
            dataIndex: 'approval_status'
        }, {
            header: '查看定制件明细',
            dataIndex: 'CustomizeDetailInfo',
            renderer: function (value, cellmeta, record, rowIndex) {
                return '<img onclick="CustomizeDetailInfo_sppmt(' + rowIndex + ',\'Customize_Store_shpmt\',' + null + ',' + false + ',' + false + ')" src="./resource/image/ext/magnifier.png"/>';
            }
        }]);
        /**
         * 标准件数据存储
         */
        var Ad_design_Store = new Ext.Ad_design_Store({storeId: 'Ad_design_Store_shpmt'});
        /**
         * 现场成品数据存储
         */
        var Customer_Store = new Ext.Customer_Store({storeId: 'Customer_Store_shpmt'});
        /**
         *  定制件列表数据存储
         */
        var Customizelist_Store = new Ext.Customizelist_Store({storeId: 'Customize_Store_shpmt'});

        var Ad_design_Gridpanel = new Ext.grid.GridPanel({
            collapsed: false,
            title: '设计件信息',
            height: 200,
            anchor: '100%',
            border: false,
            hideCollapseTool: true,
            // 表格面板标题,默认为粗体，我不喜欢粗体，这里设置样式将其格式为正常字体
            autoScroll: true,
            frame: true,
            store: Ad_design_Store, // 数据存储
            stripeRows: true, // 斑马线
            cm: Ad_design_cm, // 列模型
            listeners: {
                rowdblclick: function () {
                    var product_id = Ad_design_Gridpanel.getSelectionModel().getSelected().get('product_id');
                    showAttInfo(product_id)
                }
            },
            sm: new Ext.grid.CheckboxSelectionModel({
                singleSelect: true
            }),
            viewConfig: {
                // 不产横向生滚动条, 各列自动扩展自动压缩, 适用于列数比较少的情况
                forceFit: false
            },
            loadMask: {
                msg: '正在加载表格数据,请稍等...'
            }
        });
        dynamicColumn('Customer_Store_shpmt');
        var Customer_Gridpanel = new Ext.grid.GridPanel({
            collapsed: false,
            title: '自定义现场成品信息',
            height: 200,
            anchor: '100%',
            border: false,
            hideCollapseTool: true,
            // 表格面板标题,默认为粗体，我不喜欢粗体，这里设置样式将其格式为正常字体
            autoScroll: true,
            frame: true,
            store: Customer_Store, // 数据存储
            stripeRows: true, // 斑马线
            cm: new Ext.grid.ColumnModel(Customer_cm_array), // 列模型
            viewConfig: {
                // 不产横向生滚动条, 各列自动扩展自动压缩, 适用于列数比较少的情况
                forceFit: false
            },
            loadMask: {
                msg: '正在加载表格数据,请稍等...'
            }
        });
        var Customizelist_Gridpanel = new Ext.grid.GridPanel({
            collapsed: false,
            height: 200,
            anchor: '100%',
            border: false,
            hideCollapseTool: true,
            // 表格面板标题,默认为粗体，我不喜欢粗体，这里设置样式将其格式为正常字体
            autoScroll: true,
            title: '定制件信息',
            frame: true,
            store: Customizelist_Store, // 数据存储
            stripeRows: true, // 斑马线
            cm: Customizelist_cm, // 列模型
            sm: Customizelist_sm,
            viewConfig: {
                // 不产横向生滚动条, 各列自动扩展自动压缩, 适用于列数比较少的情况
                forceFit: false
            },
            loadMask: {
                msg: '正在加载表格数据,请稍等...'
            }
        });
        this.items = [
//            new Ext.shgcjbxx_start(),
//            new Ext.khxx(),
            getWF3FieldSet({
                title: '平面图柜台信息',
                items: [Customizelist_Gridpanel, Ad_design_Gridpanel, Customer_Gridpanel]/*getWF3_items4()*/
            }),
            getWF3FieldSet({title: '合同谈判信息', items: getWF3_items3(false)})
        ]
        WF3.form5.superclass.initComponent.call(this);
    }
});
/**
 * 6、工程部确认
 */
WF3.form6 = Ext.extend(WF3.commonForm, {
    layout: 'form',
    initComponent: function () {
        var Customizelist_sm = new Ext.grid.CheckboxSelectionModel({
            singleSelect: true
        });
        var Customizelist_cm = new Ext.grid.ColumnModel([Customizelist_sm, {
            header: '定制件编号',
            sortable: true,
            dataIndex: 'customize_no'
        }, {
            header: '定制件名称',
            sortable: true,
            dataIndex: 'customize_name'
        }, {
            header: '定制件类型',
            sortable: true,
            dataIndex: 'customize_breed'
        }, {
            header: '审核人',
            sortable: true,
            dataIndex: 'approval_username'
        }, {
            header: '数量',
            sortable: true,
            dataIndex: 'num'
        }, {
            header: '审核状态',
            sortable: true,
            renderer: function (value) {
                if (value == 0 || value == '') {
                    return '未审核';
                }
                else if (value == 1) {
                    return '审核通过';
                }
                //2 审核不通过
                else if (value == 2) {
                    return '审核不通过';
                }
            },
            dataIndex: 'approval_status'
        }, {
            header: '查看定制件明细',
            dataIndex: 'CustomizeDetailInfo',
            renderer: function (value, cellmeta, record, rowIndex) {
                return '<img onclick="CustomizeDetailInfo_sppmt(' + rowIndex + ',\'Customize_Store_shpmt\',' + null + ',' + false + ',' + false + ')" src="./resource/image/ext/magnifier.png"/>';
            }
        }]);

        /**
         * 标准件数据存储
         */
        var Ad_design_Store = new Ext.Ad_design_Store({storeId: 'Ad_design_Store_shpmt'});
        /**
         * 现场成品数据存储
         */
        var Customer_Store = new Ext.Customer_Store({storeId: 'Customer_Store_shpmt'});
        /**
         *  定制件列表数据存储
         */
        var Customizelist_Store = new Ext.Customizelist_Store({storeId: 'Customize_Store_shpmt'});
        var Ad_design_Gridpanel = new Ext.grid.GridPanel({
            collapsed: false,
            title: '设计件信息',
            height: 200,
            anchor: '100%',
            border: false,
            hideCollapseTool: true,
            // 表格面板标题,默认为粗体，我不喜欢粗体，这里设置样式将其格式为正常字体
            autoScroll: true,
            frame: true,
            store: Ad_design_Store, // 数据存储
            stripeRows: true, // 斑马线
            cm: Ad_design_cm, // 列模型
            listeners: {
                rowdblclick: function () {
                    var product_id = Ad_design_Gridpanel.getSelectionModel().getSelected().get('product_id');
                    showAttInfo(product_id)
                }
            },
            sm: new Ext.grid.CheckboxSelectionModel({
                singleSelect: true
            }),
            viewConfig: {
                // 不产横向生滚动条, 各列自动扩展自动压缩, 适用于列数比较少的情况
                forceFit: false
            },
            loadMask: {
                msg: '正在加载表格数据,请稍等...'
            }
        });
        dynamicColumn('Customer_Store_shpmt');
        var Customer_Gridpanel = new Ext.grid.GridPanel({
            collapsed: false,
            title: '自定义现场成品信息',
            height: 200,
            anchor: '100%',
            border: false,
            hideCollapseTool: true,
            // 表格面板标题,默认为粗体，我不喜欢粗体，这里设置样式将其格式为正常字体
            autoScroll: true,
            frame: true,
            store: Customer_Store, // 数据存储
            stripeRows: true, // 斑马线
            cm: new Ext.grid.ColumnModel(Customer_cm_array), // 列模型
            viewConfig: {
                // 不产横向生滚动条, 各列自动扩展自动压缩, 适用于列数比较少的情况
                forceFit: false
            },
            loadMask: {
                msg: '正在加载表格数据,请稍等...'
            }
        });
        var Customizelist_Gridpanel = new Ext.grid.GridPanel({
            collapsed: false,
            height: 200,
            anchor: '100%',
            border: false,
            hideCollapseTool: true,
            // 表格面板标题,默认为粗体，我不喜欢粗体，这里设置样式将其格式为正常字体
            autoScroll: true,
            title: '定制件信息',
            frame: true,
            store: Customizelist_Store, // 数据存储
            stripeRows: true, // 斑马线
            cm: Customizelist_cm, // 列模型
            sm: Customizelist_sm,
            viewConfig: {
                // 不产横向生滚动条, 各列自动扩展自动压缩, 适用于列数比较少的情况
                forceFit: false
            },
            loadMask: {
                msg: '正在加载表格数据,请稍等...'
            }
        });
        this.items = [
            new Ext.shgcjbxx_start(),
//            getWF3FieldSet({title: '客户信息', /*collapsed: true,*/ items: getWF3_items2()}),
            new Ext.khxx(),
            getWF3FieldSet({
                title: '平面图柜台信息',
                items: [Customizelist_Gridpanel, Ad_design_Gridpanel, Customer_Gridpanel]
            }),
            getWF3FieldSet({title: '合同谈判信息', items: getWF3_items3(false)})
        ]
        WF3.form6.superclass.initComponent.call(this);
    }
});
/**
 * 7、货柜合同签订
 */
WF3.form7 = Ext.extend(WF3.commonForm, {
    layout: 'form',
    initComponent: function () {
        this.items = [
//            getWF3FieldSet({title: '工程基本信息', /*collapsed: true,*/ items: getWF3_items1()}),
//            getWF3FieldSet({title: '客户信息', /*collapsed: true,*/ items: getWF3_items2()}),
//            getWF3FieldSet({title: '平面图柜台信息', /*collapsed: true,*/ items: getWF3_items4()}),
            new Ext.shgcjbxx_start(),
//            getWF3FieldSet({layout: 'fit', title: '合同上传<font color=red>*</font>', items: getWF3_SimpleAPX({type:301})}),

            getWF3FieldSet({title: '合同谈判关键信息填写<font color=red>*</font>', items: getWF3_items3(false)}),
            getWF3FieldSet({title: '合同谈判结果与意见<font color=red>*</font>', items: getWF3_items19()}),
            getWF3FieldSet({title: '合同签订信息填写<font color=red>*</font>', items: getWF3_items13(false)}),
            getWF3FieldSet({
                layout: 'fit',
                title: '柜台合同扫描件上传<font color=red>*</font>',
                items: getWF3_SimpleAPX({fieldLabel: '扫描件上传', gridSettings: {title: '', type: 307, upLoadFlag: true}})
            }),
            getWF3FieldSet({
                id: 'uplaodSport',
                layout: 'fit',
                title: '现场成品合同扫描件上传<font color=red>*</font>',
                items: getWF3_SimpleAPX({
                    fieldLabel: '扫描件上传',
                    gridSettings: {id: 'uplaodSport2', title: '', type: 308, upLoadFlag: true}
                })
            })

        ]
        WF3.form7.superclass.initComponent.call(this);
    }
});
/**
 * 8、客户预付款 （70%）
 */
WF3.form8 = Ext.extend(WF3.commonForm, {
    layout: 'form',
    initComponent: function () {
        this.items = [
            new Ext.shgcjbxx_start(),
            getWF3FieldSet({title: '收款情况', items: getWF3_items20(true)}),
            new Ext.khxx(),
            new Ext.shpmt({
                hideOtherCost: false,
                hiddenPlanePrice: false,
                hiddenExportExcelDataButton: false,
                experTobjqr: true
            }),
            /*new Ext.xgtxx_xgtapry() ,*/new Ext.shzzxgtAppendix({hiddenOriginal: true})
//            getWF3FieldSet({title: '收款情况填写<font color=red>*</font>', items:[getWF3_Number({name:'payment_account',fieldLabel:'收款账号'})]})
        ]
        WF3.form8.superclass.initComponent.call(this);
    }
});
/**
 * 9、财务确认
 */
WF3.form9 = Ext.extend(WF3.commonForm, {
    layout: 'form',
    initComponent: function () {
        this.items = [
            new Ext.shgcjbxx_start(),
            new Ext.already_money(),
            getWF3FieldSet({title: '收款情况', items: getWF3_items6(true)}),
            new Ext.shpmt({
                hideOtherCost: false,
                hiddenPlanePrice: false,
                hiddenExportExcelDataButton: false,
                experTobjqr: true
            }),
            /*new Ext.xgtxx_xgtapry() ,*/new Ext.shzzxgtAppendix({hiddenOriginal: true}),
            getWF3FieldSet({
                layout: 'fit',
                title: '收款凭证上传<font color=red>*</font>',
                items: getWF3_SimpleAPX({fieldLabel: '收款凭证上传', gridSettings: {title: '', type: 309, upLoadFlag: true}})
            })
        ]
        WF3.form9.superclass.initComponent.call(this);
    }
});
/**
 * 10、客服主管审批平行
 */
WF3.form10 = Ext.extend(WF3.commonForm, {
    layout: 'form',
    initComponent: function () {
        var store = new Ext.data.SimpleStore({
            fields: ['name', 'code'],
            data: [['同意', '1'], ['拒绝', '0']]
        });
        var cmoBox = new Ext.form.ComboBox({
            id: 'bxzt_bx',
            hiddenName: 'area1',
            fieldLabel: '申请结果',
            triggerAction: 'all',
            store: store,
            displayField: 'name',
            valueField: 'code',
            mode: 'local',
            listWidth: 120, // 下拉列表的宽度,默认为下拉选择框的宽度
            forceSelection: true,
            typeAhead: true,
            value: '0',
            resizable: true
            //anchor : '95%'
        });
        this.items = [
            new Ext.shgcjbxx_start(),
            //getWF3FieldSet({title: '并行生产申请信息',items:getWF3_items10()})
            getWF3FieldSet({title: '申请并行结果', items: [cmoBox]})
        ]
        WF3.form10.superclass.initComponent.call(this);
    }
});
/**
 * 11、水晶字或丝印确认
 */
WF3.form11 = Ext.extend(WF3.commonForm, {
    layout: 'form',
    initComponent: function () {
        this.items = [
            new Ext.shgcjbxx_start(),
            new Ext.khxx(),
            getWF3FieldSet({title: '平面图柜台信息', /*collapsed: true,*/ items: getWF3_items4()}),
            getWF3FieldSet({title: '品牌水晶字、丝印确认<font color=red>*</font>', items: getWF3_items7()}),
            getWF3FieldSet({
                layout: 'fit',
                title: '客户Logo上传<font color=red>*</font>',
                items: getWF3_SimpleAPX({
                    fieldLabel: '客户Logo上传',
                    gridSettings: {title: '', type: 311, upLoadFlag: true}
                })
            })
        ]
        WF3.form11.superclass.initComponent.call(this);
    }
});
/**
 * 12、设计柜台立面图
 */
WF3.form12 = Ext.extend(WF3.commonForm, {
    layout: 'form',
    initComponent: function () {
        this.items = [
            new Ext.shgcjbxx_start(),
            getWF3FieldSet({title: '平面图柜台信息', /*collapsed: true,*/ items: getWF3_items4()}),
            getWF3FieldSet({
                layout: 'fit',
                title: '客户Logo查看', /*collapsed: true,*/
                items: getWF3_SimpleAPX({
                    fieldLabel: '客户Logo查看',
                    gridSettings: {title: '', type: 311, upLoadFlag: false}
                })
            }),
            getWF3FieldSet({
                layout: 'fit',
                title: '立面图上传<font color=red>*</font>',
                items: getWF3_SimpleAPX({fieldLabel: '立面图上传', gridSettings: {title: '', type: 312, upLoadFlag: true}})
            })
        ]
        WF3.form12.superclass.initComponent.call(this);
    }
});
/**
 * 13、绘制cdr图
 */
WF3.form13 = Ext.extend(WF3.commonForm, {
    layout: 'form',
    initComponent: function () {
        this.items = [
            new Ext.shgcjbxx_start(),
            getWF3FieldSet({title: '平面图柜台信息', /*collapsed: true,*/ items: getWF3_items4()}),
            getWF3FieldSet({
                layout: 'fit',
                title: '客户Logo查看', /*collapsed: true,*/
                items: getWF3_SimpleAPX({
                    fieldLabel: '客户Logo查看',
                    gridSettings: {title: '', type: 311, upLoadFlag: false}
                })
            }),
            getWF3FieldSet({
                layout: 'fit',
                title: '立面图查看', /*collapsed: true,*/
                items: getWF3_SimpleAPX({fieldLabel: '立面图查看', gridSettings: {title: '', type: 312, upLoadFlag: false}})
            }),
            getWF3FieldSet({
                layout: 'fit',
                title: 'CDR文件上传<font color=red>*</font>',
                items: getWF3_SimpleAPX({fieldLabel: 'CDR文件上传', gridSettings: {title: '', type: 313, upLoadFlag: true}})
            })
        ]
        WF3.form13.superclass.initComponent.call(this);
    }
});
/**
 * 14、客服确认水晶字或丝印
 */
WF3.form14 = Ext.extend(WF3.commonForm, {
    layout: 'form',
    initComponent: function () {
        this.items = [
            new Ext.shgcjbxx_start(),
            getWF3FieldSet({title: '平面图柜台信息', /*collapsed: true,*/ items: getWF3_items4()}),
            getWF3FieldSet({title: '品牌水晶字、丝印确认信息', items: getWF3_items7(true)}),
            getWF3FieldSet({
                layout: 'fit',
                title: '客户Logo查看',
                items: getWF3_SimpleAPX({
                    fieldLabel: '客户Logo查看',
                    gridSettings: {title: '', type: 311, upLoadFlag: false}
                })
            }),
            getWF3FieldSet({
                layout: 'fit',
                title: '立面图查看', /*collapsed: true,*/
                items: getWF3_SimpleAPX({fieldLabel: '立面图查看', gridSettings: {title: '', type: 312, upLoadFlag: false}})
            }),
            getWF3FieldSet({
                layout: 'fit',
                title: 'CDR文件查看', /*collapsed: true,*/
                items: getWF3_SimpleAPX({
                    fieldLabel: 'CDR文件查看',
                    gridSettings: {title: '', type: 313, upLoadFlag: false}
                })
            })
        ]
        WF3.form14.superclass.initComponent.call(this);
    }
});
/**
 * 15、现场成品报价（含水晶字）
 */
WF3.form15 = Ext.extend(WF3.commonForm, {
    layout: 'form',
    initComponent: function () {
        this.items = [
            new Ext.shgcjbxx_start(),
            new Ext.khxx(),
            getWF3FieldSet({
                layout: 'fit',
                title: '现场成品报价查看',
                items: getWF3_SimpleAPX({fieldLabel: '现场成品报价查看', gridSettings: {title: '', type: 5, upLoadFlag: false}})
            })
        ]
        WF3.form15.superclass.initComponent.call(this);
    }
});
/**
 * 16、现场成品合同签订
 */
WF3.form16 = Ext.extend(WF3.commonForm, {
    layout: 'form',
    initComponent: function () {
        this.items = [
            new Ext.shgcjbxx_start(),
            new Ext.khxx(),
            getWF3FieldSet({
                layout: 'fit',
                title: '现场成品合同上传<font color=red>*</font>',
                items: getWF3_SimpleAPX({
                    fieldLabel: '现场成品合同上传',
                    gridSettings: {title: '', type: 316, upLoadFlag: true}
                })
            })
        ]
        WF3.form16.superclass.initComponent.call(this);
    }
});
/**
 * 17、财务确认合同
 */
WF3.form17 = Ext.extend(WF3.commonForm, {
    layout: 'form',
    initComponent: function () {
        this.items = [
            new Ext.shgcjbxx_start(),
            getWF3FieldSet({
                layout: 'fit',
                title: '现场成品合同查看',
                items: getWF3_SimpleAPX({
                    fieldLabel: '现场成品合同查看',
                    gridSettings: {title: '', type: 316, upLoadFlag: false}
                })
            })
        ]
        WF3.form17.superclass.initComponent.call(this);
    }
});
/**
 * 18、施工图人员安排
 */
WF3.form18 = Ext.extend(WF3.commonForm, {
    layout: 'form',
    initComponent: function () {
        this.items = [
            new Ext.shgcjbxx_start(),
            new Ext.shkhxq_start(),
//            getWF3FieldSet({title: '客户需求信息', /*collapsed: true,*/ items: getWF3_items8()}),
            getWF3FieldSet({title: '客户店面信息', /*collapsed: true,*/ items: getWF3_items9()}),
            getWF3FieldSet({
                layout: 'fit',
                title: '平面图查看',
                items: getWF3_SimpleAPX({id: 'planeSee', upLoadFlag: false})
            })
        ]
        WF3.form18.superclass.initComponent.call(this);
    }
});
/**
 * 19、绘制施工图
 */
WF3.form19 = Ext.extend(WF3.commonForm, {
    layout: 'form',
    initComponent: function () {
        this.items = [
//            new Ext.shgcjbxx_start(),
            getWF3FieldSet({title: '客户需求信息', /*collapsed: true,*/ items: getWF3_items8()}),
//            new Ext.shpmt({hideOtherCost:false,hiddenPlanePrice:false,hiddenExportExcelDataButton:false,experTobjqr:true}),
//            getWF3FieldSet({title: '客户店面信息', /*collapsed: true,*/ items: getWF3_items9()}),
//            getWF3FieldSet({layout: 'fit', title: '平面图查看', items: getWF3_SimpleAPX({id:'planeSee',upLoadFlag: false})}),
            getWF3FieldSet({
                layout: 'fit',
                title: '施工图上传<font color=red>*</font>',
                items: getWF3_SimpleAPX({
                    id: 'projectSee',
                    fieldLabel: '施工图上传',
                    gridSettings: {title: '', type: 319, upLoadFlag: true}
                })
            })
        ]
        WF3.form19.superclass.initComponent.call(this);
    }
});
/**
 * 20、施工图审核
 */
WF3.form20 = Ext.extend(WF3.commonForm, {
    layout: 'form',
    initComponent: function () {
        this.items = [
//            new Ext.shgcjbxx_start(),
            getWF3FieldSet({title: '客户需求信息', /*collapsed: true,*/ items: getWF3_items8()}),
            getWF3FieldSet({
                layout: 'fit',
                title: '施工图查看',
                items: getWF3_SimpleAPX({
                    id: 'projectSee',
                    fieldLabel: '施工图查看',
                    gridSettings: {title: '', type: 319, upLoadFlag: false}
                })
            })
        ]
        WF3.form20.superclass.initComponent.call(this);
    }
});
/**
 * 21、客服核对
 */
WF3.form21 = Ext.extend(WF3.commonForm, {
    layout: 'form',
    initComponent: function () {
        var productmeterialandpackageinfo = new Ext.ProductMeterialAndPackageInfo({
            setMaterial: true,
            isFactory: false,
            isManager: true,
            canImportExcel: false,
            justShowProductInfo: true
        });
        var customizemeterialinfo = new Ext.CustomizeMeterialInfo({
            setMaterial: true,
            isFactory: true,
            isManager: true,
            justShowCustomizeInfo: true,
            CustomizeDownloadAppendix: true
        });
        var WholeProjectInfo = new Ext.Panel({
            items: [new Ext.Button({
                text: '查看工程单下单图信息', iconCls: 'addIcon',
                id: 'downloadXdtInfo',
                project_id: '',
                handler: function () {
                    var product_id = this.project_id;
                    if (product_id == '') {
                        Ext.Msg.alert('提示', '加载数据中，请稍后再试');
                        return;
                    }

                    /**
                     * 该成品件的各个版本的部件明细
                     */
                    var WholeProjectInfoHistoryGrid = new Ext.grid.GridPanel({
                        collapsed: false,
                        border: false,
                        hideCollapseTool: true,
                        // 表格面板标题,默认为粗体，我不喜欢粗体，这里设置样式将其格式为正常字体
                        autoScroll: true,
                        frame: true,
                        store: new Ext.data.Store({
                            baseParams: {
                                formid: product_id
                            },
                            autoLoad: true,
                            // 获取数据的方式
                            proxy: new Ext.data.HttpProxy({
                                url: 'taskslistAction.ered?reqCode=queryFigurePictureHistory'
                            }),
                            // 数据读取器
                            reader: new Ext.data.JsonReader({
                                // totalProperty : 'TOTALCOUNT', // 记录总数
                                // root : 'ROOT' // Json中的列表数据根节点
                            }, [
                                {
                                    name: 'version' // 数据索引:和Store模型对应
                                },
                                {
                                    name: 'figure_picture_historyid' // 数据索引:和Store模型对应
                                },
                                {
                                    name: 'file_name' // 数据索引:和Store模型对应
                                },
                                {
                                    name: 'explain' // 数据索引:和Store模型对应
                                },
                                {
                                    name: 'upload_user' // 数据索引:和Store模型对应
                                },
                                {
                                    name: 'upload_date' // 数据索引:和Store模型对应
                                },
                                {
                                    name: 'appendix_id' // 数据索引:和Store模型对应
                                },
                                {
                                    name: 'to_id' // 数据索引:和Store模型对应
                                },
                                {
                                    name: 'type' // 数据索引:和Store模型对应
                                }
                            ])
                        }), // 数据存储
                        stripeRows: true, // 斑马线
                        cm: new Ext.grid.ColumnModel([{
                            header: '附件名称',
                            sortable: true,
                            dataIndex: 'file_name'
                        }, {
                            header: '版本号',
                            sortable: true,
                            dataIndex: 'version'
                        }, {
                            header: '上传时间',
                            sortable: true,
                            dataIndex: 'upload_date'
                        }, {
                            header: '上传人',
                            sortable: true,
                            dataIndex: 'upload_user'
                        }, {
                            header: '备注',
                            sortable: true,
                            dataIndex: 'explain'
                        }, {
                            header: '下载附件',
                            sortable: true,
                            dataIndex: 'download',
                            renderer: function (value, cellmeta, record, rowIndex) {
                                var figure_picture_historyid = record.get('figure_picture_historyid');
                                return '<img onclick="uploadOrDownloadAppendix(\'\',' + figure_picture_historyid + ',2,6,\'下载工程单下单图附件\',\'\',\'\',\'\',' + false + ',' + false + ',' + true + ',' + true + ',\'T_PM_PackageAppendix_File\')" src="./resource/image/ext/magnifier.png"/>';
                            }
                        }]), // 列模型
                        viewConfig: {
                            // 不产横向生滚动条, 各列自动扩展自动压缩, 适用于列数比较少的情况
                            forceFit: true
                        },
                        loadMask: {
                            msg: '正在加载表格数据,请稍等...'
                        }
                    });
                    var WholeProjectInfoHistoryWindow = new Ext.Window({
                        layout: 'fit', // 设置窗口布局模式
                        closable: true, // 是否可关闭
                        modal: true,
                        width: 500,
                        height: 300,
                        collapsible: true, // 是否可收缩
                        closeAction: 'close',
                        animCollapse: true,
                        animateTarget: Ext.getBody(),
                        border: false, // 边框线设置
                        // pageY : 20, // 页面定位X坐标
                        pageX: document.body.clientWidth / 2 - 500 / 2, // 页面定位Y坐标
                        items: [WholeProjectInfoHistoryGrid],
                        buttons: [{
                            text: '关闭',
                            iconCls: 'acceptIcon',
                            handler: function () {
                                WholeProjectInfoHistoryWindow.close();
                            }
                        }]

                        // 嵌入的表单面板
                    });
                    WholeProjectInfoHistoryWindow.show();

                }
            })], border: false, style: 'padding:3 3 3'
        });
        this.items = [
            new Ext.shgcjbxx_start(),
            new Ext.khxx(),
            getWF3FieldSet({title: '客户店面信息', /*collapsed: true,*/ items: getWF3_items9()}),
            getWF3FieldSet({title: '客户需求信息', /*collapsed: true,*/ items: getWF3_items8(false, true)}),
            getWF3FieldSet({title: '功能区信息', /*collapsed: true,*/ items: getWF3_items12()}),
            getWF3FieldSet({title: '店面卖场信息', /*collapsed: true,*/ items: getWF3_items11()}),
            //new Ext.shpmt({hideOtherCost:false,hiddenPlanePrice:false,hiddenExportExcelDataButton:false,experTobjqr:true}),
            getWF3FieldSet({
                layout: 'fit',
                title: '施工图查看', /*collapsed: true,*/
                items: getWF3_SimpleAPX({
                    id: 'projectSee2',
                    fieldLabel: '施工图查看',
                    gridSettings: {title: '', type: 319, upLoadFlag: false}
                })
            }),
            WholeProjectInfo,
//            productmeterialandpackageinfo,
//            customizemeterialinfo,
            new Ext.sppmt({title: '下单图', canSeeOverMealInfo: this.canSeeOverMealInfo})
        ]
        WF3.form21.superclass.initComponent.call(this);
    }
});
/**
 * 22、研发部确认
 */
WF3.form22 = Ext.extend(WF3.commonForm, {
    layout: 'form',
    initComponent: function () {
        var WholeProjectInfo = new Ext.Button({
            fieldLabel: '工程单下单图信息', text: '点击查看', iconCls: 'addIcon',
            id: 'downloadXdtInfo_form22',
            project_id: '',
            handler: function () {
                var product_id = this.project_id;
                if (product_id == '') {
                    Ext.Msg.alert('提示', '加载数据中，请稍后再试');
                    return;
                }

                /**
                 * 该成品件的各个版本的部件明细
                 */
                var WholeProjectInfoHistoryGrid = new Ext.grid.GridPanel({
                    collapsed: false,
                    border: false,
                    hideCollapseTool: true,
                    // 表格面板标题,默认为粗体，我不喜欢粗体，这里设置样式将其格式为正常字体
                    autoScroll: true,
                    frame: true,
                    store: new Ext.data.Store({
                        baseParams: {
                            formid: product_id
                        },
                        autoLoad: true,
                        // 获取数据的方式
                        proxy: new Ext.data.HttpProxy({
                            url: 'taskslistAction.ered?reqCode=queryFigurePictureHistory'
                        }),
                        // 数据读取器
                        reader: new Ext.data.JsonReader({
                            // totalProperty : 'TOTALCOUNT', // 记录总数
                            // root : 'ROOT' // Json中的列表数据根节点
                        }, [
                            {
                                name: 'version' // 数据索引:和Store模型对应
                            },
                            {
                                name: 'figure_picture_historyid' // 数据索引:和Store模型对应
                            },
                            {
                                name: 'file_name' // 数据索引:和Store模型对应
                            },
                            {
                                name: 'explain' // 数据索引:和Store模型对应
                            },
                            {
                                name: 'upload_user' // 数据索引:和Store模型对应
                            },
                            {
                                name: 'upload_date' // 数据索引:和Store模型对应
                            },
                            {
                                name: 'appendix_id' // 数据索引:和Store模型对应
                            },
                            {
                                name: 'to_id' // 数据索引:和Store模型对应
                            },
                            {
                                name: 'type' // 数据索引:和Store模型对应
                            }
                        ])
                    }), // 数据存储
                    stripeRows: true, // 斑马线
                    cm: new Ext.grid.ColumnModel([{
                        header: '附件名称',
                        sortable: true,
                        dataIndex: 'file_name'
                    }, {
                        header: '版本号',
                        sortable: true,
                        dataIndex: 'version'
                    }, {
                        header: '上传时间',
                        sortable: true,
                        dataIndex: 'upload_date'
                    }, {
                        header: '上传人',
                        sortable: true,
                        dataIndex: 'upload_user'
                    }, {
                        header: '备注',
                        sortable: true,
                        dataIndex: 'explain'
                    }, {
                        header: '下载附件',
                        sortable: true,
                        dataIndex: 'download',
                        renderer: function (value, cellmeta, record, rowIndex) {
                            var figure_picture_historyid = record.get('figure_picture_historyid');
                            return '<img onclick="uploadOrDownloadAppendix(\'\',' + figure_picture_historyid + ',2,6,\'下载工程单下单图附件\',\'\',\'\',\'\',' + false + ',' + false + ',' + true + ',' + true + ',\'T_PM_PackageAppendix_File\')" src="./resource/image/ext/magnifier.png"/>';
                        }
                    }]), // 列模型
                    viewConfig: {
                        // 不产横向生滚动条, 各列自动扩展自动压缩, 适用于列数比较少的情况
                        forceFit: true
                    },
                    loadMask: {
                        msg: '正在加载表格数据,请稍等...'
                    }
                });
                var WholeProjectInfoHistoryWindow = new Ext.Window({
                    layout: 'fit', // 设置窗口布局模式
                    closable: true, // 是否可关闭
                    modal: true,
                    width: 500,
                    height: 300,
                    collapsible: true, // 是否可收缩
                    closeAction: 'close',
                    animCollapse: true,
                    animateTarget: Ext.getBody(),
                    border: false, // 边框线设置
                    // pageY : 20, // 页面定位X坐标
                    pageX: document.body.clientWidth / 2 - 500 / 2, // 页面定位Y坐标
                    items: [WholeProjectInfoHistoryGrid],
                    buttons: [{
                        text: '关闭',
                        iconCls: 'acceptIcon',
                        handler: function () {
                            WholeProjectInfoHistoryWindow.close();
                        }
                    }]

                    // 嵌入的表单面板
                });
                WholeProjectInfoHistoryWindow.show();

            }
        });
        this.items = [
            new Ext.shgcjbxx_start(),

            {
                layout: 'column', layoutConfig: {columns: 2}, border: false, items: [
                {
                    layout: 'form', border: false, labelWidth: 80, columnWidth: .3, items: [
                    {
                        xtype: 'button',
                        iconCls: 'previewIcon',
                        fieldLabel: '综合视图',
                        text: '打开综合视图',
                        handler: function () {
                            returnZhView(Ext.get('ordernumber').getValue());
                        }
                    }
                ]
                },
                {
                    layout: 'form', columnWidth: .7, labelWidth: 110, border: false, items: [
                    WholeProjectInfo
                ]
                }

            ]
            },
            new Ext.sppmt({title: '下单图', canSeeOverMealInfo: this.canSeeOverMealInfo}),
            new Ext.ProductMeterialAndPackageInfo({id: 'productdata', setMaterial: false})//,
//            new Ext. CustomizeMeterialInfo({id:'customizedata',setMaterial:false})

        ]
        WF3.form22.superclass.initComponent.call(this);
    }
});
/**
 * 23、客服补充其他费用
 */
WF3.form23 = Ext.extend(WF3.commonForm, {
    layout: 'form',
    initComponent: function () {
        this.items = [
            new Ext.shgcjbxx_start(),
//            new Ext.xgtxx_xgtapry() ,new Ext.shzzxgtAppendix({hiddenOriginal:true}),
            new Ext.bjshpmt(),
            getWF3FieldSet({title: '其他费用', items: getWF3_items14({inputMoney: false, id: 'cost_other'})})
            /*getWF3FieldSet({layout: 'form', title: '其他费用附件上传<font color=red>*</font>',
             items: getWF3_SimpleAPX({fieldLabel : '其他费用附件上传',gridSettings : {upLoadFlag:true,type:501}})}*/
        ]
        WF3.form23.superclass.initComponent.call(this);
    }
});
/**
 * 23、会议资料准备
 */
WF3.form24 = Ext.extend(WF3.commonForm, {
    layout: 'form',
    initComponent: function () {
        this.items = [
            new Ext.shgcjbxx_start(),
//            new Ext.shpmt({hiddenExportExcelDataButton:false}),
            new Ext.xgtxx_xgtapry(), new Ext.shzzxgtAppendix({hiddenOriginal: true}),
            getWF3FieldSet({
                layout: 'form', title: '会议资料附件上传<font color=red>*</font>',
                items: getWF3_SimpleAPX({fieldLabel: '会议资料上传', gridSettings: {upLoadFlag: true, type: 511}})
            }),
            getWF3FieldSet({
                title: '注意事项清单列表', collapsed: false, items: [
                    {
                        xtype: 'panel',
                        border: false,
                        style: "font-family:宋体;text-align:left;font-size:13px;margin-bottom:3px;padding-bottom:3px;padding-top:3px;padding-left:30px",
//                  fieldLabel : '<span style="color:red;font-size:13px;" >请使用你们现在使用的客户编号(例如:"A001")，谢谢合作</span>',
                        html: '<a href="./taskslistAction.ered?reqCode=downloadRedFile" target="_blank">注意事项清单列表下载</a>',
                        anchor: '100%'
                    }
                ]
            }),
            getWF3FieldSet({
                layout: 'form', title: '参会人员选择<font color=red>*</font>',
                items: getWF3_items15()
            })
        ]
        WF3.form24.superclass.initComponent.call(this);
    }
});
/**
 * 25、会议纪要上传
 */
WF3.form25 = Ext.extend(WF3.commonForm, {
    layout: 'form',
    initComponent: function () {
        this.items = [
            new Ext.shgcjbxx_start(),
//            new Ext.shpmt({hiddenExportExcelDataButton:false}),
            new Ext.xgtxx_xgtapry(), new Ext.shzzxgtAppendix({hiddenOriginal: true}),
            getWF3FieldSet({
                layout: 'form', title: '会议纪要附件上传<font color=red>*</font>',
                items: getWF3_SimpleAPX({fieldLabel: '会议纪要上传', gridSettings: {upLoadFlag: true, type: 521}})
            }),
            getWF3FieldSet({
                layout: 'form', title: '注意事项扫描件上传<font color=red>*</font>',
                items: getWF3_SimpleAPX({fieldLabel: '注意事项扫描件', gridSettings: {upLoadFlag: true, type: 513}})
            })
        ]
        WF3.form25.superclass.initComponent.call(this);
    }
});
/**
 * 26、报价确认
 */
WF3.form26 = Ext.extend(WF3.commonForm, {
    layout: 'form',
    initComponent: function () {
        this.items = [
            new Ext.shgcjbxx_start(),
//            getWF3FieldSet({title: '平面图柜台信息', items: getWF3_items4()}),
            new Ext.shpmt({
                hideOtherCost: false,
                hiddenPlanePrice: false,
                hiddenExportExcelDataButton: false,
                experTobjqr: true
            }),
            getWF3FieldSet({title: '工程单金额分类总计', items: [getWF3_items17()]}),
            getWF3FieldSet({
                title: '花费明细',
                items: getWF3_items0({needProjectid: true, id: 'grid_expense', read: true})
            }),
            getWF3FieldSet({
                title: '客服补充花费', items: getWF3_items16({
                    needProjectid: true,
                    id: 'service_expense',
                    inputMoney: true,
                    clicksToEdit: 1,
                    listeners: {
                        validateedit: function (e) {
                            e.cancel = true;
                        }
                    }
                })
            })
        ];

        WF3.form26.superclass.initComponent.call(this);
    }
});
/**
 * 27、下单图补充
 */
WF3.form27 = Ext.extend(WF3.commonForm, {
    layout: 'form',
    initComponent: function () {
        this.items = [
            getWF3FieldSet({title: '工程基本信息<font color=red>*</font>', items: getWF3_items2()}),
            getWF3FieldSet({title: '合同谈判关键信息<font color=red>*</font>', items: getWF3_items3(false)})
        ];

        WF3.form27.superclass.initComponent.call(this);
    }
});
/**
 * 28。物流确认
 */
WF3.form30 = Ext.extend(WF3.commonForm, {
    layout: 'form',
    initComponent: function () {
//        var  productmeterialandpackageinfo=  new Ext.ProductMeterialAndPackageInfo({setMaterial:false,isFactory:false, isManager:false,canImportExcel:false,justShowProductInfo:true} );
//        var customizemeterialinfo   =   new Ext. CustomizeMeterialInfo({setMaterial:false,isFactory:true, isManager:false,justShowCustomizeInfo:true,CustomizeUploadAppendix:true})     ;
        this.items = [
//            WholeProjectInfo ,
            new Ext.shgcjbxx_start(),
//            productmeterialandpackageinfo,
//            customizemeterialinfo,
            new Ext.zzpmt({title: '下单图', xdtFj: true})
        ]
        WF3.form27.superclass.initComponent.call(this);
    }
});


WF3.form31 = Ext.extend(WF3.commonForm, {
    layout: 'form',
    initComponent: function () {
        this.items = [
//            new Ext.shgcjbxx_start(),
//            new Ext.khxx(),
            getWF3FieldSet({title: '合同谈判信息', items: getWF3_items3(false)})
        ]
        WF3.form31.superclass.initComponent.call(this);
    }
});


WF3.form32 = Ext.extend(WF3.commonForm, {
    layout: 'form',
    initComponent: function () {
        this.items = [
            getWF3_items21(),
            new Ext.shgcjbxx_start(),
            new Ext.shpmt({title: '下单图', hiddenExportExcelDataButton: false, hiddenPlanePrice: false})
//            new Ext.khxx(),
//            getWF3FieldSet({title: '合同谈判信息', items: getWF3_items3(false)})
        ]
        WF3.form31.superclass.initComponent.call(this);
    }
});

WF3.form33 = Ext.extend(WF3.commonForm, {
    layout: 'form',
    initComponent: function () {
        this.items = [
            new Ext.shgcjbxx_start(),
            new Ext.already_money(),
            getWF3FieldSet({title: '柜台合同谈判信息', items: getWF3_items22()}),
            getWF3FieldSet({title: '现场成品合同谈判信息', items: getWF3_items23()})
//            getWF3FieldSet({title: '合同谈判信息', items: getWF3_items24()})
            //getWF3_items22(),
            //getWF3_items23(),
            //getWF3_items24()
        ]
        WF3.form33.superclass.initComponent.call(this);
    }
});


WF3.form34 = Ext.extend(WF3.commonForm, {
    layout: 'form',
    initComponent: function () {
        this.items = [
            new Ext.shgcjbxx_start(),
            getWF3FieldSet({title: '合同谈判关键信息填写<font color=red>*</font>', items: getWF3_items3(false)}),
            getWF3FieldSet({title: '合同金额<font color=red>*</font>', items: getWF3_items28(true)}),
            getWF3_SimpleAPX({
                id: 'gthtup',
                fieldLabel: '柜台合同上传',
                gridSettings: {title: '', type: 301, upLoadFlag: true, allowblank_: true}
            }),
            getWF3_SimpleAPX({
                id: 'xccphtup',
                fieldLabel: '现场成品合同上传',
                gridSettings: {title: '', type: 489, upLoadFlag: true, allowblank_: true}
            }),
            getWF3FieldSet({
                title: '工程需求信息填写<font color=red>*</font>', items: [{
                    xtype: "combo",
                    store: SF_store,
                    mode: 'local',
                    allowBlank: false,
                    hiddenName: 'whole_assembly',
                    forceSelection: false, // 选中内容必须为下拉列表的子项
                    editable: false,
                    typeAhead: true,
                    displayField: 'text',
                    valueField: 'value',
                    readOnly: true,
                    triggerAction: "all",
                    fieldLabel: "是否整体组装",
                    anchor: "50%"
                }]
            })
        ]
        WF3.form34.superclass.initComponent.call(this);
    }
});


/**
 * 获取fieldSet(统一风格)
 */
function getWF3FieldSet(settings) {
    if (!settings) {
        settings = {}
    }

    var baseSettings = {
        title: '信息块',
        collapsible: true,
        collapsed: false/*,
         autoHeight: true*/
    };
    Ext.apply(baseSettings, settings);

    return new Ext.form.FieldSet(baseSettings);
}
