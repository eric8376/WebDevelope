/**
 * Created by 黄琦鸿 on 14-2-23.
 */
var SF_store = new Ext.data.SimpleStore({
    fields: ['text', 'value'],
    data: [
        ['是', '0'],
        ['否', '1']
    ]
});
/**
 * 紧急度数据存储
 */
var jjd_store = new Ext.data.SimpleStore({
    fields: ['text', 'value'],
    data: [
        ['一般', '0'],
        ['加急', '1'],
        ['特急', '2']
    ]
});
/**
 * 查看零售下单明细
 * @param storeindex
 * @param CanSeePrice
 */
function showSellRetailProduceDetail(storeindex, CanSeePrice) {
    var store = Ext.StoreMgr.lookup('orderdetail_check');
    var rec = store.getAt(storeindex);
    var uploadFile;
    var ispurchase = Ext.isEmpty(rec.data.purchase_price);
    var filetype;
    var fileKey;
    var width_ = 800;
    var height_ = 600;
    if (ispurchase) {//为true表示不是外购的
        fileKey = 'T_SR_PropertyAppendixFile_File';
        filetype = '10';
    } else {
        filetype = '11';
        fileKey = 'PurchaseAppendixFile_File';
        width_ = 600;
        height_ = 350;
    }
    uploadFile = new CM.simpleUpLoadGrid({
        anchor: '100%', fieldLabel: '下载附件',
        gridSettings: {
            fileKey: fileKey,//文件存储位置(必配)
            type: filetype,//类型（必配）
            height: 200,
            to_id: rec.get('orderdetailid'),//域使用id
            upLoadFlag: false//是否是上传模式
        }
    });
    //品牌水晶字 附件
    reloadAppendixData(uploadFile.id, rec.get('orderdetailid'));
    var formpanel_temp;
    if (ispurchase) {
        formpanel_temp = new Ext.form.FormPanel({
            labelWidth: 80,
            autoScroll: true,
            labelAlign: 'right',
            bodyStyle: 'padding:10 10 10 10',
            items: [
                {
                    xtype: 'fieldset',
                    height: 160,
                    title: '产品基本信息',
                    layout: 'column',
                    layoutConfig: {columns: 2},
                    items: [
                        {
                            layout: 'form', defaults: {
                            style: 'background:none;border:none;',
                            readOnly: true
                        }, border: false, columnWidth: 0.5, items: [
                            {
                                xtype: 'textfield', name: 'design_no',
                                fieldLabel: "设计件编号", anchor: '100%'
                            },
                            {xtype: 'textfield', name: 'product_name', fieldLabel: "成品件名称", anchor: '100%'}
                        ]
                        },
                        {
                            layout: 'form', defaults: {
                            style: 'background:none;border:none;',
                            readOnly: true
                        }, border: false, columnWidth: 0.5, items: [
                            {xtype: 'textfield', name: 'product_breed', fieldLabel: "成品件分类", anchor: '100%'},
                            {
                                xtype: 'textfield',
                                hideLabel: !CanSeePrice,
                                hidden: !CanSeePrice,
                                name: 'price',
                                fieldLabel: "成品件价格",
                                anchor: '100%'
                            }
                        ]
                        }


                    ]
                },
                {
                    xtype: 'fieldset', height: 320, layout: 'fit', title: '产品属性', items: [
                    new Ext.grid.EditorGridPanel({
                        collapsed: false,
                        clicksToEdit: 1,
                        listeners: {
                            validateedit: function (e) {
                                e.cancel = true;
                            }
                        },
                        border: true,
                        hideCollapseTool: true,
                        // 表格面板标题,默认为粗体，我不喜欢粗体，这里设置样式将其格式为正常字体
                        height: 400,
                        autoScroll: true,
                        frame: true,
                        store: new Ext.data.Store({
                            autoLoad: true,
                            baseParams: {
                                product_id: rec.data.product_id
                            },
                            // 获取数据的方式
                            proxy: new Ext.data.HttpProxy({
                                url: 'AD_DesignAction.ered?reqCode=queryCompleteAttribute'
                            }),
                            // 数据读取器
                            reader: new Ext.data.JsonReader({}, [
                                {

                                    name: 'attribute_name' // 数据索引:和Store模型对应
                                },
                                {
                                    name: 'codedesc'
                                },
                                {
                                    name: 'field'
                                }
                            ])
                        }), // 数据存储
                        stripeRows: true, // 斑马线
                        cm: new Ext.grid.ColumnModel([
                            {
                                header: '属性名', // 列标题resizable:false,
                                resizable: true,
                                sortable: true,
                                editor: new Ext.grid.GridEditor(new Ext.form.TextField({
                                    // 只对原有数据编辑有效,对新增一行的场景无效
                                    allowBlank: false

                                })),
                                menuDisabled: true,
                                dataIndex: 'attribute_name' // 数据索引:和Store模型对应
                            },
                            {
                                header: '属性值',
                                sortable: true,
                                resizable: true,
                                menuDisabled: true,
                                editor: new Ext.grid.GridEditor(new Ext.form.TextField({
                                    // 只对原有数据编辑有效,对新增一行的场景无效
                                    allowBlank: false

                                })),
                                dataIndex: 'codedesc'
                            }
                        ]), // 列模型
                        viewConfig: {
                            // 不产横向生滚动条, 各列自动扩展自动压缩, 适用于列数比较少的情况
                            forceFit: true
                        },
                        loadMask: {
                            msg: '正在加载表格数据,请稍等...'
                        }
                    })
                ]
                },
                {
                    xtype: 'fieldset',
                    height: 320,
                    layout: 'column',
                    layoutConfig: {columns: 2},
                    title: '产品需求',
                    items: [
                        {
                            layout: 'form', border: false, defaults: {
                            style: 'background:none;border:none;',
                            readOnly: true
                        }, columnWidth: 0.5, items: [
                            {
                                xtype: 'numberfield',
                                fieldLabel: '销售价格',
                                hideLabel: !CanSeePrice,
                                hidden: !CanSeePrice,
                                name: 'sales_price',
                                anchor: '100%'
                            },
                            {
                                xtype: 'combo',
                                fieldLabel: '是否丝印',
                                editable: false,
                                typeAhead: true,
                                displayField: 'text',
                                valueField: 'value',
                                mode: 'local',
                                forceSelection: true,
                                store: SF_store,
                                name: 'silk_screen',
                                triggerAction: "all",
                                anchor: '100%'
                            },
                            {
                                xtype: 'combo', fieldLabel: '是否企业形象水晶字', typeAhead: true, editable: false,
                                displayField: 'text',
                                valueField: 'value', forceSelection: true, mode: 'local', store: SF_store,
                                triggerAction: "all", name: 'business_crystal_word', anchor: '100%'
                            }
                        ]
                        },
                        {
                            layout: 'form', border: false, defaults: {
                            style: 'background:none;border:none;',
                            readOnly: true
                        }, columnWidth: 0.5, items: [
                            {xtype: 'numberfield', fieldLabel: '下单数量', name: 'num', anchor: '100%'},
                            {
                                xtype: 'combo',
                                fieldLabel: '是否赠送',
                                editable: false,
                                typeAhead: true,
                                displayField: 'text',
                                valueField: 'value',
                                forceSelection: true,
                                mode: 'local',
                                store: SF_store,
                                triggerAction: "all",
                                hiddenName: 'gift',
                                anchor: '100%'
                            },
                            {
                                xtype: 'combo', fieldLabel: '是否品牌水晶字', editable: false,
                                typeAhead: true,
                                displayField: 'text',
                                valueField: 'value', forceSelection: true, mode: 'local', store: SF_store,
                                triggerAction: "all", name: 'brand_crystal_word', anchor: '100%'
                            }
                        ]
                        },
                        {
                            layout: 'form', columnWidth: 1, border: false, items: [
                            uploadFile,
                            {
                                xtype: 'textarea',
                                readOnly: true, fieldLabel: '描述', name: 'remark', anchor: '100%', border: false
                            }
                        ]
                        }
                    ]
                }
            ]
        });
    }
    else {
        formpanel_temp = new Ext.form.FormPanel({
            bodyStyle: 'padding:10 10 10 10',
            layout: 'column',
            layoutConfig: {columns: 2},
            items: [
                {
                    layout: 'form', defaults: {
                    style: 'background:none;border:none;',
                    readOnly: true
                }, labelAlign: 'right', columnWidth: 0.5, labelWidth: 90, anchor: '100%', border: false, items: [
                    {xtype: 'textfield', fieldLabel: '产品名称', name: 'product_name', anchor: '100%'},
                    {
                        xtype: 'numberfield',
                        hideLabel: !CanSeePrice,
                        hidden: !CanSeePrice,
                        fieldLabel: '采购价格',
                        name: 'purchase_price',
                        anchor: '100%'
                    },
                    {xtype: 'numberfield', fieldLabel: '数量', name: 'num', anchor: '100%'}

                ]
                },
                {
                    layout: 'form', labelAlign: 'right', defaults: {
                    style: 'background:none;border:none;',
                    readOnly: true
                }, columnWidth: 0.5, labelWidth: 90, anchor: '100%', border: false,
                    items: [
                        {xtype: 'textfield', fieldLabel: '产品分类', name: 'product_breed', anchor: '100%'},
                        {
                            xtype: 'numberfield',
                            hideLabel: !CanSeePrice,
                            hidden: !CanSeePrice,
                            fieldLabel: '销售价格',
                            name: 'sales_price',
                            anchor: '100%'
                        },
                        {
                            xtype: 'combo',
                            fieldLabel: '是否赠送',
                            allowBlank: false,
                            editable: false,
                            typeAhead: true,
                            value: '1',
                            displayField: 'text',
                            valueField: 'value',
                            forceSelection: true,
                            mode: 'local',
                            store: SF_store,
                            triggerAction: "all",
                            hiddenName: 'gift',
                            anchor: '100%'
                        }
                    ]
                },
                {
                    columnWidth: 1,
                    layout: 'form',
                    border: false,
                    labelAlign: 'right', labelWidth: 90,
                    items: [
                        {
                            xtype: 'textarea',
                            readOnly: true, fieldLabel: '备注', name: 'remark', anchor: '100%'
                        },
                        uploadFile
                    ]

                }
            ]

        });
    }

    formpanel_temp.getForm().loadRecord(rec);

    var setdetailWin = new Ext.Window({
        title: '查看下单明细', // 窗口标题
        layout: 'fit', // 设置窗口布局模式
        width: width_,
        height: height_,
        closable: true, // 是否可关闭
        resizable: false,
        bodyStyle: 'padding:5 5 5',
        labelAlign: 'right',
        draggable: true,// 是否可拖动
        closeAction: 'close',
        animCollapse: true,
        modal: true,
        animateTarget: Ext.getBody(),

        border: false,
        items: [
            formpanel_temp
        ], buttons: [
            {
                xtype: 'button', iconCls: 'acceptIcon', text: '关闭', handler: function () {
                setdetailWin.close();
            }
            }
        ]
    }).show();

}

/**
 * 删除的成品件costid
 */
var delProductAdditionalCostids = '';
/**
 * 需求补录
 * @type {*}
 */
Ext.xqblForm = Ext.extend(Ext.form.FormPanel, {
    xtype: "form",
    labelWidth: 110,
    autoHeight: true,
    border: false,
    bodyStyle: 'overflow-y:auto;overflow-x:hidden;',
    labelAlign: "right",
    layout: "form",
    initComponent: function () {
        this.items = [
            {
                title: '需求补录',
                layout: 'form',
                items: [
                    {
                        xtype: 'textarea', anchor: '100%',
                        name: 'needContext',
                        fieldLabel: '补录内容'
                    },
                    new CM.simpleUpLoadGrid({
                        fieldLabel: '需求补录附件', anchor: '100%',
                        id: 'LosingRecordAppendix_xqbl_upload',
                        gridSettings: {
                            fileKey: 'T_WF_appendix_file',//文件存储位置(必配)
                            type: '15',//类型（必配）
                            height: 200,
                            to_id: '',//域使用id
                            upLoadFlag: true//是否是上传模式
                        }
                    })
                ]
            },
            {
                title: '不足需求',
                layout: 'form',
                items: [
                    {
                        xtype: "combo",
                        store: LosingTypeStore,
                        mode: 'remote',
                        editable: false,
                        readOnly: true,
                        style: 'background:none;border:none;',
                        allowBlank: false,
                        hiddenName: 'losingtype',
                        forceSelection: false, // 选中内容必须为下拉列表的子项
                        typeAhead: true,
                        displayField: 'text',
                        valueField: 'value',
                        triggerAction: "all",
                        fieldLabel: "需求不足类型",
                        anchor: "100%"
                    },
                    {
                        xtype: 'textarea', anchor: '100%',
                        name: 'describe',
                        readOnly: true,
                        fieldLabel: '需求不足描述'
                    },
                    new CM.simpleUpLoadGrid({
                        fieldLabel: '需求不足附件', anchor: '100%',
                        id: 'LosingRecordAppendix_xqbl_download',
                        gridSettings: {
                            fileKey: 'T_WF_appendix_file',//文件存储位置(必配)
                            type: '14',//类型（必配）
                            height: 200,
                            to_id: '',//域使用id
                            upLoadFlag: false//是否是上传模式
                        }
                    })
                ]
            }

        ];
        Ext.xqblForm.superclass.initComponent.call(this);
    }
});
/**
 * 需求不足确认
 * @type {*}
 */
Ext.xqbzqrForm = Ext.extend(Ext.form.FormPanel, {
    xtype: "form",
    labelWidth: 110,
    autoHeight: true,
    border: false,
    bodyStyle: 'overflow-y:auto;overflow-x:hidden;',
    labelAlign: "right",
    layout: "form",
    initComponent: function () {
        this.items = [
            new Ext.shgcjbxx_start(), new Ext.khxx_apry(), new Ext.xcxx(), new Ext.shkhxq_start(),
            {
                title: '不足需求',
                layout: 'form',
                items: [
                    {
                        xtype: "combo",
                        store: LosingTypeStore,
                        mode: 'remote',
                        editable: false,
                        allowBlank: false,
                        hiddenName: 'losingtype',
                        readOnly: true,
                        style: 'background:none;border:none;',
                        forceSelection: false, // 选中内容必须为下拉列表的子项
                        typeAhead: true,
                        displayField: 'text',
                        valueField: 'value',
                        triggerAction: "all",
                        fieldLabel: "需求不足类型",
                        anchor: "100%"
                    },
                    {
                        xtype: 'textarea', anchor: '100%',
                        name: 'describe',
                        readOnly: true,
                        fieldLabel: '需求不足描述'
                    },
                    new CM.simpleUpLoadGrid({
                        fieldLabel: '需求不足附件', anchor: '100%',
                        id: 'LosingRecordAppendix_xqbzqr_download',
                        gridSettings: {
                            fileKey: 'T_WF_appendix_file',//文件存储位置(必配)
                            type: '14',//类型（必配）
                            height: 200,
                            to_id: '',//域使用id
                            upLoadFlag: false//是否是上传模式
                        }
                    })
                ]
            }

        ];
        Ext.xqbzqrForm.superclass.initComponent.call(this);
    }
});

/**
 * 工程下单
 */
Ext.gcxdForm = Ext.extend(Ext.form.FormPanel, {
    xtype: "form",
    labelWidth: 110,
    labelAlign: "right",
    choiceCustomerStore: false,//如果为true表示下单方式是新建后，在下单页面去选择客户店面
    border: false,
    initComponent: function () {
        var me = this;
        this.items = [new Ext.gcjbxx({choiceCustomerStore: me.choiceCustomerStore}), new Ext.khxx({hiddenSaleInfo: false}), new Ext.xcxx(), new Ext.khxq()];
        Ext.gcxdForm.superclass.initComponent.call(this);
    }
});
/**
 * 资料审查_客户信息
 */
Ext.zlscForm = Ext.extend(Ext.form.FormPanel, {
    xtype: "form",
    labelWidth: 110,
    border: false,
    bodyStyle: 'overflow-y:auto;overflow-x:hidden;',
    labelAlign: "right",
    layout: "form",
    initComponent: function () {
        this.items = [new Ext.shgcjbxx_start(), new Ext.khxx(), new Ext.xcxx(), new Ext.shkhxq_start()];
        Ext.zlscForm.superclass.initComponent.call(this);
    }
});

/**
 *  紧急度确认
 */
Ext.surejjdForm = Ext.extend(Ext.form.FormPanel, {
    xtype: "form",
    labelWidth: 110,
    border: false,
    bodyStyle: 'overflow-y:auto;overflow-x:hidden;',
    labelAlign: "right",
    layout: "form",
    initComponent: function () {
        this.items = [new Ext.shgcjbxx_start(), new Ext.xcxx(), new Ext.shkhxq_start()];
        Ext.surejjdForm.superclass.initComponent.call(this);
    }
});
/**
 *  安排人员_客户信息
 */
Ext.apryForm = Ext.extend(Ext.form.FormPanel, {
    xtype: "form",
    labelWidth: 110,
    border: false,
    bodyStyle: 'overflow-y:auto;overflow-x:hidden;',
    labelAlign: "right",
    layout: "form",
    initComponent: function () {
        this.items = [new Ext.shgcjbxx_start(), new Ext.khxx_apry(), new Ext.xcxx(), new Ext.shkhxq_start()];
        Ext.apryForm.superclass.initComponent.call(this);
    }
});
/**
 *制作平面图纸
 */
Ext.zzpmtForm = Ext.extend(Ext.form.FormPanel, {
    xtype: "form",
    labelWidth: 110,
    bodyStyle: 'overflow-y:auto;overflow-x:hidden; ',
    labelAlign: "right",
    layout: "form",
    anchor: '100%',
    border: false,
    initComponent: function () {
        this.items = [new Ext.shgcjbxx_zzpmt(), new Ext.xcxx(), new Ext.shkhxq_start(), new Ext.zzpmt(),
            new Ext.xqbl()
        ];
        Ext.zzpmtForm.superclass.initComponent.call(this);
    }
});
/**
 *审核平面图纸
 */
Ext.shpmtForm = Ext.extend(Ext.form.FormPanel, {
    xtype: "form",
    border: false,
    labelWidth: 110,
    canSeeOverMealInfo: false,
    bodyStyle: 'overflow-y:auto;overflow-x:hidden;',
    labelAlign: "right",
    layout: "form",
    initComponent: function () {
        var me = this;
        this.items = [new Ext.shgcjbxx_zzpmt(), new Ext.xcxx(), new Ext.shkhxq_start(), new Ext.sppmt({canSeeOverMealInfo: me.canSeeOverMealInfo})];
        Ext.shpmtForm.superclass.initComponent.call(this);
    }
});
/**
 *研发经理审核定制件
 */
Ext.shdzjForm = Ext.extend(Ext.form.FormPanel, {
    xtype: "form",
    labelWidth: 110,
    border: false,
    bodyStyle: 'overflow-y:auto;overflow-x:hidden;',
    labelAlign: "right",
    layout: "form",
    initComponent: function () {
        this.items = [new Ext.shgcjbxx_shdzj(), new Ext.shdzj(), new Ext.ProductPriceGridPanel({
            id: 'Cmpgrid_check', forcheck: true, width: 793,
            height: 200
        })];
        Ext.shdzjForm.superclass.initComponent.call(this);
    }
});
/**
 *客户确认
 */
Ext.khqrForm = Ext.extend(Ext.form.FormPanel, {
    xtype: "form",
    border: false,
    labelWidth: 110,
    bodyStyle: 'overflow-y:auto;overflow-x:hidden;',
    labelAlign: "right",
    layout: "form",
    initComponent: function () {
        this.items = [new Ext.shgcjbxx_shdzj(), new Ext.xcxx(), new Ext.shkhxq_start({hiddenAddNeedsButton: false}), new Ext.shpmt({
            hiddenPlanePrice: false,
            hiddenLayoutAppendix: false
        })];
        Ext.khqrForm.superclass.initComponent.call(this);
    }
});
/**
 *报价审核
 */
Ext.bjshForm = Ext.extend(Ext.form.FormPanel, {
    xtype: "form",
    labelWidth: 110,
    border: false,
    bodyStyle: 'overflow-y:auto;overflow-x:hidden;',
    labelAlign: "right",
    layout: "form",
    initComponent: function () {
        this.items = [new Ext.shgcjbxx_shdzj(), new Ext.bjshkhxq(), new Ext.bjshpmt(), new Ext.shpmbj()];
        Ext.bjshForm.superclass.initComponent.call(this);
    }
});
/**
 *预报价
 */
Ext.ybjForm = Ext.extend(Ext.form.FormPanel, {
    xtype: "form",
    border: false,
    labelWidth: 110,
    bodyStyle: 'overflow-y:auto;overflow-x:hidden;',
    labelAlign: "right",
    layout: "form",
    initComponent: function () {
        this.items = [
            new Ext.shgcjbxx_ybj(), new Ext.xcxx(), new Ext.shkhxq_start(), new Ext.shpmt({
                hideOtherCost: false,
                hiddenPlanePrice: false,
                hiddenExportExcelDataButton: false
            })
        ];
        Ext.ybjForm.superclass.initComponent.call(this);
    }
});
/**
 *效果图下单
 */
Ext.xgtxdForm = Ext.extend(Ext.form.FormPanel, {
    xtype: "form",
    border: false,
    labelWidth: 110,
    bodyStyle: 'overflow-y:auto;overflow-x:hidden;',
    labelAlign: "right",
    layout: "form",
    initComponent: function () {
        this.items = [
            //工程基本信息，现场信息，客户需求，平面图信息  ，效果图信息
            new Ext.gcjbxx_xgtxd(), new Ext.xcxx_xgtxd(), new Ext.khxq_xgtxd(), new Ext.xgtxx()
        ];
        Ext.xgtxdForm.superclass.initComponent.call(this);
    }
});
/**
 * 减免审批
 *
 */
Ext.jmspForm = Ext.extend(Ext.form.FormPanel, {
    xtype: "form",
    border: false,
    labelWidth: 110,
    bodyStyle: 'overflow-y:auto;overflow-x:hidden;',
    labelAlign: "right",
    layout: "form",
    initComponent: function () {
        this.items = [
            //工程基本信息， 客户需求，平面图信息  ，效果图信息
            new Ext.gcjbxx_xgtxd(), new Ext.shkhxq_start(), new Ext.shpmt({hiddenPlanePrice: false}), new Ext.jmsp_xgtxx()
        ];
        Ext.jmspForm.superclass.initComponent.call(this);
    }
});
/**
 *确认收款
 */
Ext.qrskForm = Ext.extend(Ext.form.FormPanel, {
    xtype: "form",
    border: false,
    labelWidth: 110,
    bodyStyle: 'overflow-y:auto;overflow-x:hidden;',
    labelAlign: "right",
    layout: "form",
    initComponent: function () {
        this.items = [
            //工程基本信息， 客户需求，平面图信息  ，效果图信息
            new Ext.gcjbxx_xgtxd(), new Ext.shkhxq_start(), new Ext.shpmt({hiddenPlanePrice: false}), new Ext.already_money(), new Ext.qrsk_xgtxx()
        ];
        Ext.qrskForm.superclass.initComponent.call(this);
    }
});
/**
 * 效果图安排人员
 *
 */
Ext.xgtapryForm = Ext.extend(Ext.form.FormPanel, {
    xtype: "form",
    border: false,
    labelWidth: 110,
    bodyStyle: 'overflow-y:auto;overflow-x:hidden;',
    labelAlign: "right",
    layout: "form",
    initComponent: function () {
        this.items = [
            //工程基本信息， 客户需求，平面图信息  ，效果图信息
            new Ext.gcjbxx_xgtapry(), new Ext.shkhxq_start(), new Ext.xgtxx_xgtapry({
                hiddendifficulty: false, difficultyStyle: '',
                difficultyReadonly: false
            })
        ];
        Ext.xgtapryForm.superclass.initComponent.call(this);
    }
});
/**
 * 建模人员安排
 *
 */
Ext.jmryapForm = Ext.extend(Ext.form.FormPanel, {
    xtype: "form",
    border: false,
    labelWidth: 110,
    bodyStyle: 'overflow-y:auto;overflow-x:hidden;',
    labelAlign: "right",
    layout: "form",
    initComponent: function () {
        var Customizelist = Customizelist_sppmt(true, false, false, false, false, false, false);
        var shpmt = new Ext.shpmt();
        shpmt.add(Customizelist);
        this.items = [
            new Ext.gcjbxx_xgtxd(), new Ext.shkhxq_start(), shpmt, new Ext.ProductPriceGridPanel({
                id: 'productAppendix', InMadeDzjModel: true, forcheck: true, width: 793,
                height: 200
            })
        ];
        Ext.jmryapForm.superclass.initComponent.call(this);
    }
});
/**
 * 定制件建模
 *
 */
Ext.dzjjmForm = Ext.extend(Ext.form.FormPanel, {
    xtype: "form",
    border: false,
    labelWidth: 110,
    bodyStyle: 'overflow-y:auto;overflow-x:hidden;',
    labelAlign: "right",
    layout: "form",
    initComponent: function () {
        this.items = [
            new Ext.gcjbxx_xgtxd(), new Ext.shkhxq_start(), new Ext.sppmt({
                justshowDzj: true,
                showDzjModel: true,
                showDzjModelType: true
            }),//只显示定制件，显示建模人(可编辑)和定制件模型附件(上传)，
            new Ext.xgtxx_xgtapry(), new Ext.ProductPriceGridPanel({
                id: 'productAppendix', InMadeDzjModel: true, forcheck: false, width: 793,
                height: 200
            })
        ];
        Ext.dzjjmForm.superclass.initComponent.call(this);
    }
});
/**
 * 审核定制件模型
 */
Ext.shdzjmxForm = Ext.extend(Ext.form.FormPanel, {
    xtype: "form",
    border: false,
    labelWidth: 110,
    bodyStyle: 'overflow-y:auto;overflow-x:hidden;',
    labelAlign: "right",
    layout: "form",
    initComponent: function () {
        this.items = [
            new Ext.gcjbxx_xgtxd(), new Ext.shkhxq_start(), new Ext.sppmt({
                justshowDzj: true,
                showDzjModel: true,
                showDzjModelType: false
            }), new Ext.xgtxx_xgtapry(), new Ext.ProductPriceGridPanel({
                id: 'productAppendix', InMadeDzjModel: true, forcheck: true, width: 793,
                height: 200
            })
        ];
        Ext.shdzjmxForm.superclass.initComponent.call(this);
    }
});

/**
 * 制作效果图
 */
Ext.zzxgtForm = Ext.extend(Ext.form.FormPanel, {
    xtype: "form",
    border: false,
    labelWidth: 110,
    bodyStyle: 'overflow-y:auto;overflow-x:hidden;',
    labelAlign: "right",
    uploadpicture: false,
    layout: "form",
    initComponent: function () {
        var me = this;
        this.items = [
            new Ext.gcjbxx_xgtapry(), new Ext.shkhxq_start(), new Ext.sppmt({
                justshowDzj: true,
                showDzjModel: true,
                showDzjModelType: false
            }),//只显示定制件，显示建模人(可编辑)和定制件模型附件（都是不可编辑状态），
            new Ext.xgtxx_xgtapry() //效果图附件
            , new Ext.zzxgtAppendix({uploadpicture: me.uploadpicture}), /* new Ext.xgtxx_xgtapry() ,*/new Ext.ProductPriceGridPanel({
                id: 'productAppendix', InMadeDzjModel: true, forcheck: true, width: 793,
                height: 200
            })
        ];
        Ext.zzxgtForm.superclass.initComponent.call(this);
    }
});
/**
 * 效果图审核
 */
Ext.shxgtForm = Ext.extend(Ext.form.FormPanel, {
    xtype: "form",
    border: false,
    labelWidth: 110,
    bodyStyle: 'overflow-y:auto;overflow-x:hidden;',
    labelAlign: "right",
    layout: "form",
    initComponent: function () {
        this.items = [
            new Ext.gcjbxx_xgtapry(), new Ext.shkhxq_start(), /* new Ext.shpmt(),*///只显示定制件，显示建模人(可编辑)和定制件模型附件（都是不可编辑状态），
            new Ext.xgtxx_xgtapry() //效果图附件
            , new Ext.shzzxgtAppendix()
        ];
        Ext.shxgtForm.superclass.initComponent.call(this);
    }
});
/**
 * 客户确认效果图
 */
Ext.khqrxgtForm = Ext.extend(Ext.form.FormPanel, {
    xtype: "form",
    border: false,
    labelWidth: 110,
    bodyStyle: 'overflow-y:auto;overflow-x:hidden;',
    labelAlign: "right",
    layout: "form",
    initComponent: function () {
        this.items = [
            new Ext.gcjbxx_xgtapry(), new Ext.shkhxq_start({hiddenAddNeedsButton: false}), /* new Ext.shpmt(),*///只显示定制件，显示建模人(可编辑)和定制件模型附件（都是不可编辑状态），
            new Ext.xgtxx_xgtapry({hiddenOpinion: false, hiddendifficulty: true}) //效果图附件
            , new Ext.shzzxgtAppendix({hiddenOriginal: true})
        ];
        Ext.khqrxgtForm.superclass.initComponent.call(this);
    }
});
/**
 * 发货通知
 */
Ext.SendGoodsAdvoiceForm = Ext.extend(Ext.form.FormPanel, {
    labelWidth: 110,
    xtype: "form",
    labelAlign: "right",
    layout: "form",
    showprojectaddr: false,
    border: false,
    forcheck: false,
    initComponent: function () {
        var me = this;
        var mysm = new Ext.grid.CheckboxSelectionModel();
        this.items = [new Ext.shgcjbxx_start({showprojectaddr: me.showprojectaddr}),
            getWF3FieldSet({
                title: '工程需求信息填写<font color=red>*</font>', items: [{
                    xtype: "combo",
                    store: SFZTZZ_store,
                    mode: 'local',
                    readOnly: true,
                    style: 'background:none;border:none;',
                    hiddenName: 'whole_assembly_require',
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
            new Ext.SendGoodsAdvoiceInfo({forcheck: me.forcheck})
        ];
        Ext.SendGoodsAdvoiceForm.superclass.initComponent.call(this);
    }
});
/**
 * 物流发货
 */
Ext.WLSendGoodsForm = Ext.extend(Ext.form.FormPanel, {
    labelWidth: 120,
    xtype: "form",
    labelAlign: "right",
    layout: "form",
    forcheck: false,
    showSGT: false,
    border: false,
    initComponent: function () {
        var me = this;
        this.items = [new Ext.shgcjbxx_start(),
            new Ext.SendGoodsAdvoiceInfo({forcheck: true}),
            new Ext.WLSendGoodsFormInfo({forcheck: me.forcheck}),
            new CM.simpleUpLoadGrid({
                fieldLabel: '查看施工图',
                hideLabel: !me.showSGT,
                hidden: !me.showSGT,
                showInHeader: true,
                id: 'Construction_drawing',
                gridSettings: {
                    fileKey: 'T_WF_appendix_file',//文件存储位置(必配)
                    type: '319',//类型（必配）
                    height: 200,
                    to_id: '',//域使用id
                    upLoadFlag: false//是否是上传模式
                }
            })
        ];
        Ext.WLSendGoodsForm.superclass.initComponent.call(this);
    }
});

/**
 *  查看零售下单
 */
Ext.sellRetailInfo = Ext.extend(Ext.form.FormPanel, {
    labelWidth: 80,
    border: false,
    bodyStyle: 'padding:10 10 10 10',
    labelAlign: "right",
    CanSeeCustomizeInfo: false,
    CanSeePrice: false,
    CanSeeSendAddress: false,
    autoScroll: true,
    CanUploadCDAppendix: false,
    CanseeCDAppendix: false,
    initComponent: function () {
        var me = this;
        var cmArray = [new Ext.grid.RowNumberer({
            header: '序号',
            width: 32
        }), {
            header: '编号',
            dataIndex: 'design_no',
            renderer: function (value) {
                if (Ext.isEmpty(value)) {
                    return '--';
                } else {
                    return value;
                }
            }
        }, {
            header: '产品名称',
            dataIndex: 'product_name'
        }, {
            header: '产品类型',
            dataIndex: 'product_breed'
        }]
        if (me.CanSeePrice) {
            cmArray.push({
                header: '价格',
                dataIndex: 'price',
                renderer: function (value) {
                    if (Ext.isEmpty(value)) {
                        return '--';
                    } else {
                        return value;
                    }
                }
            });
            cmArray.push({
                header: '销售价格',
                dataIndex: 'sales_price',
                renderer: function (value) {
                    if (Ext.isEmpty(value)) {
                        return '--';
                    } else {
                        return value;
                    }
                }
            });
            cmArray.push({
                header: '采购价格',
                dataIndex: 'purchase_price',
                renderer: function (value) {
                    if (Ext.isEmpty(value)) {
                        return '--';
                    } else {
                        return value;
                    }
                }
            });
        }
        cmArray.push({
            header: '数量',
            dataIndex: 'num',
            renderer: function (value) {
                if (Ext.isEmpty(value)) {
                    return '--';
                } else {
                    return value;
                }
            }
        });
        cmArray.push({
            header: '备注',
            dataIndex: 'remark'
        });
        cmArray.push({
            header: '明细',
            dataIndex: 'showdetail',
            renderer: function (value, cellmeta, record, rowIndex) {
                return '<img onclick="showSellRetailProduceDetail(' + rowIndex + ',' + me.CanSeePrice
                    + ');" src="./resource/image/ext/magnifier.png"/>';
            }
        });
        var CDAppendix = {border: false, hidden: true};
        if (me.CanseeCDAppendix) {
            CDAppendix = new CM.simpleUpLoadGrid({
                anchor: '100%', fieldLabel: me.CanUploadCDAppendix ? '拆单附件上传' : '拆单附件下载',
                id: 'CDAppendix',
                gridSettings: {
                    fileKey: 'SellRetaillAppendixFile_File',//文件存储位置(必配)
                    type: '13',//类型（必配）
                    height: 200,
                    to_id: '',//域使用id
                    upLoadFlag: me.CanUploadCDAppendix ? true : false//是否是上传模式
                }
            });
        }

        this.items = [
            {
                xtype: 'fieldset', height: 290, title: '工程单需求', layout: 'column', layoutConfig: {columns: 2}, items: [
                {
                    layout: 'form', defaults: {
                    style: 'background:none;border:none;',
                    readOnly: true
                }, columnWidth: 0.5, border: false, labelAlign: 'right',
                    items: [
                        {xtype: 'textfield', name: 'ordernumber', fieldLabel: "工程单号", anchor: '77%'},
                        {xtype: 'textfield', name: 'service_name', fieldLabel: "客服人员", anchor: '77%'},
                        {
                            xtype: 'textfield',
                            readOnly: true,
                            name: 'ordernumber_gift',
                            fieldLabel: '工程单(赠)',
                            anchor: '97%'
                        },
                        {
                            xtype: 'numberfield',
                            fieldLabel: '工程总价',
                            hideLabel: !me.CanSeePrice,
                            hidden: !me.CanSeePrice,
                            name: 'projectmoney',
                            anchor: '77%',
                            allowBlank: false
                        }
                    ]
                },
                {
                    layout: 'form', defaults: {
                    style: 'background:none;border:none;',
                    readOnly: true
                }, columnWidth: 0.5, labelAlign: 'right', border: false, labelWidth: 120,
                    items: [
                        {
                            xtype: "combo",
                            triggerAction: "all",
                            store: jjd_store,
                            mode: 'local',
                            name: 'urgent_level',
                            hiddenName: 'urgent_level',
                            forceSelection: true,
                            allowBlank: false,
                            // / 选中内容必须为下拉列表的子项
                            editable: false,
                            typeAhead: true,
                            displayField: 'text',
                            valueField: 'value',
                            fieldLabel: "紧急度",
                            anchor: "100%"
                        },
                        {
                            xtype: "textfield",
                            name: 'business',
                            allowBlank: false,
                            anchor: "100%",
                            fieldLabel: '客户经理'
                        },
                        {
                            xtype: 'textfield',
                            name: 'customizename',
                            hideLabel: !me.CanSeeCustomizeInfo,
                            hidden: !me.CanSeeCustomizeInfo,
                            fieldLabel: '客户名称',
                            anchor: '100%'
                        }


                    ]
                },
                {
                    layout: 'form', labelAlign: 'right', border: false, columnWidth: 1, items: [
                    {
                        xtype: 'textfield',
                        style: 'background:none;border:none;',
                        readOnly: true,
                        name: 'send_address',
                        hideLabel: !me.CanSeeSendAddress,
                        hidden: !me.CanSeeSendAddress,
                        anchor: '100%',
                        fieldLabel: '发货地址'
                    },
                    new CM.simpleUpLoadGrid({
                        anchor: '100%', fieldLabel: '工程附件下载',
                        id: 'SellRetaillAppendix_check',
                        gridSettings: {
                            fileKey: 'SellRetaillAppendixFile_File',//文件存储位置(必配)
                            type: '12',//类型（必配）
                            height: 200,
                            to_id: '',//域使用id
                            upLoadFlag: false//是否是上传模式
                        }
                    }),
                    CDAppendix,
                    {
                        xtype: 'textarea',
                        readOnly: true, fieldLabel: '描述', name: 'remark', anchor: '100%', border: false
                    }
                ]
                }
            ]
            },
            {
                xtype: 'fieldset', height: 240, layout: 'fit', title: '下单明细', items: [
                new Ext.grid.GridPanel({
                    collapsed: false,
                    border: true,
                    autoScroll: true,
                    frame: true,
                    store: new Ext.data.Store({
                        storeId: 'orderdetail_check',
                        proxy: new Ext.data.HttpProxy({
                            url: 'SellRetailAction.ered?reqCode=getOrderDetail'
                        }),
                        reader: new Ext.data.JsonReader({
//                                    totalProperty: 'TOTALCOUNT', // 记录总数
//                                    root: 'ROOT'
                        }, [
                            {
                                name: 'orderdetailid'
                            },
                            {
                                name: 'projectid'
                            },
                            {
                                name: 'product_id'
                            },
                            {
                                name: 'silk_screen'
                            },
                            {
                                name: 'brand_crystal_word'
                            },
                            {
                                name: 'business_crystal_word'
                            },
                            {
                                name: 'num'
                            },
                            {
                                name: 'gift'
                            },
                            {
                                name: 'purchase_price'
                            },
                            {
                                name: 'sales_price'
                            },
                            {
                                name: 'product_no'
                            },
                            {
                                name: 'remark'
                            },
                            {
                                name: 'ispurchase'
                            },
                            {
                                name: 'product_name'
                            },
                            {
                                name: 'product_breed'
                            },
                            {
                                name: 'design_no'
                            },
                            {
                                name: 'price'
                            }
                        ])
                    }),
                    stripeRows: true, // 斑马线
                    sm: new Ext.grid.CheckboxSelectionModel({singleSelect: true}),
                    cm: new Ext.grid.ColumnModel(cmArray), // 列模型
                    viewConfig: {
                        // 不产横向生滚动条, 各列自动扩展自动压缩, 适用于列数比较少的情况
                        forceFit: true
                    },
                    loadMask: {
                        msg: '正在加载表格数据,请稍等...'
                    }
                })
            ]
            }

        ];
        Ext.sellRetailInfo.superclass.initComponent.call(this);
    }
});