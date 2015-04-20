/**
 * 编程环境 IDEA.
 * 编写者: 王少伟
 * 主题:【工作流第三大块fieldSet 子元素集合】
 * 时间: 2013-07-08  上午10:20
 */
/**
 * 报价其他话费
 // * @return {Array}
 */
function getWF3_items0(settings) {
    if (!settings) {
        settings = {};
    }
    var gridPanelExpense = returnExpend(settings.read);
    Ext.apply(gridPanelExpense, settings);

    var items = [
//        {
//            xtype:'container',
//            id:'WF3_CodeImg_container',
//            html:'<img id="WF3_CodeImg" style="float:left;width:100px;border:1px solid black;" src="">'
//        },
        {
            layout: "column",
            border: false,
            layoutConfig: {columns: 2},
            items: [
                {
                    border: false,
                    layout: "form",
                    columnWidth: 1,
                    items: [
                        getWF3_RGP(gridPanelExpense)
                    ]
                }
            ]
        }
    ];

    return items;
}
/**
 * 工程基本信息
 */
function getWF3_items1() {
    var items = [
//        {
//            xtype:'container',
//            id:'WF3_CodeImg_container',
//            html:'<img id="WF3_CodeImg" style="float:left;width:100px;border:1px solid black;" src="">'
//        },
        {
            layout: "column",
            border: false,
            layoutConfig: {columns: 2},
            items: [
                {
                    border: false,
                    layout: "form",
                    columnWidth: 0.5,
                    items: [
                        getWF3_RTF({name: 'ordernumber', fieldLabel: "工程单号"}),
                        getWF3_RTF({name: 'progectname', fieldLabel: "工程名称"}),
                        getWF3_RTF({name: 'service', fieldLabel: "客服人员"}),
                        getWF3_RTF({name: 'business', fieldLabel: "客户经理"}),
                        getWF3_RTF({name: 'decoratetype', fieldLabel: "装修类型"}),
                        getWF3_RTF({name: 'open_shop_time', fieldLabel: "计划开店/翻新时间"})
                    ]
                },
                {
                    layout: "form",
                    border: false,
                    columnWidth: 0.5,
                    items: [
                        getWF3_RTF({name: 'urgent_level', fieldLabel: "紧急度"}),
                        getWF3_RTF({name: 'ischain', fieldLabel: "是否连锁"}),
                        getWF3_RTF({name: 'ismall', fieldLabel: "是否商场单"}),
                        getWF3_RTF({fieldLabel: ''}),
                        getWF3_RTF({name: 'designstyle', fieldLabel: "设计风格"}), //otherdesignstyle
                        getWF3_RTF({name: 'decorate_time', fieldLabel: "进场装修时间"})
                    ]
                }
            ]
        }
    ];

    return items;
}
/**
 * 客户信息
 */
function getWF3_items2() {
    var items = [
        {
            layout: "column",
            border: false,
            layoutConfig: {columns: 2},
            items: [
                {
                    border: false,
                    layout: "form",
                    columnWidth: 0.5,
                    items: [
                        getWF3_RTF({name: 'ordernumber', fieldLabel: "客户编号"}),
                        getWF3_RTF({name: 'projectaddr', fieldLabel: "工程地址"}),
                        getWF3_RTF({name: 'plies', fieldLabel: "楼层数"})
                    ]
                },
                {
                    layout: "form",
                    border: false,
                    columnWidth: 0.5,
                    items: [
                        getWF3_RTF({name: 'ismall', fieldLabel: "是否商场单"}),
                        getWF3_RTF({name: 'needhamal', fieldLabel: "是否需要人工搬运"}),
                        getWF3_RTF({name: 'transportation', fieldLabel: "交通是否便利"})
                    ]
                }
            ]
        }
    ];

    return items;
}
/**
 * 合同谈判关键信息填写
 */
function getWF3_items3(isRead) {

    var items = [
        {
            layout: "column",
            border: false,
            layoutConfig: {columns: 2},
            items: [
                {
                    border: false,
                    layout: "form",
                    columnWidth: 0.5,
                    items: [
                        isRead ? getWF3_Number({
                            id: "count_time",
                            name: 'count_time',
                            fieldLabel: '合同总时间/天',
                            xtype: 'numberfield'/*,readOnly:true*/
                        }) :
                            getWF3_Number({
                                id: "count_time",
                                name: 'count_time',
                                fieldLabel: '合同总时间/天',
                                xtype: 'numberfield',
                                readOnly: true
                            })

                        //,
                    ]
                }
            ]
        }
    ];

    return items;
}
/**
 * 柜台信息（不包括现场成品-只读)
 */
function getWF3_items4() {
    var gtStore = new Ext.data.JsonStore({
        //autoLoad:true,
        url: 'Quick.ered?reqCode=listAll',
        root: 'ROOT',
        totalProperty: 'TOTALCOUNT',
        fields: ['product_id', 'product_name', 'price', 'length', 'width', 'height'],
        baseParams: {ref_no: 'workflow_WF3_item4', project_id: '1001'}
    });

    var baseSettings = {
        needProjectid: true,
        store: gtStore,
        columns: [
            {header: '柜台名', dataIndex: 'product_name'},
            {header: '长', dataIndex: 'length'},
            {header: '宽', dataIndex: 'width'},
            {header: '高', dataIndex: 'height'},
            {header: '柜台价格', dataIndex: 'price'}
        ]
    };

    return getWF3_RGP(baseSettings);
}
/**
 * 最终合同信息填写
 */
function getWF3_items5() {
    var items = [
        {
            layout: "column",
            border: false,
            layoutConfig: {columns: 2},
            items: [
                {
                    border: false,
                    layout: "form",
                    columnWidth: 0.5,
                    items: [
                        getWF3_HT_Type({name: 'a1'})
                    ]
                },
                {
                    layout: "form",
                    border: false,
                    columnWidth: 0.5,
                    items: [
                        getWF3_Number({name: 'b1', fieldLabel: "金额"})
                    ]
                }
            ]
        }
    ];

    return items;
}
/**
 * 收款情况填写
 */
function getWF3_items6(isRead) {
    if (!isRead) {
        isRead = false;
    }
//    var a1 = {name: 'receivable', fieldLabel: "应收金额"};
//    var a2 = {name: 'collectiondate', fieldLabel: '收款时间'};
//    var a3 = {name: 'payment_account', fieldLabel: "付款账号"};
//    var b1 = {name: 'paid_accounts', fieldLabel: "实收金额"};
//    var b2 = {name: 'collectionway', fieldLabel: '收款方式',field:'CollectionWay'};
//    var b3 = {name: 'collectiontype', fieldLabel: '收款类型',field:'CollectionType'};
    var a1 = {name: 'barMoney', fieldLabel: '柜台金额', readOnly: true, style: 'background:none;border:none;'}
    var a2 = {name: 'spotMoney', fieldLabel: '现场成品金额', readOnly: true, style: 'background:none;border:none;'}
    var a3 = {name: 'barContractMoney', fieldLabel: '柜台合同金额', readOnly: true, style: 'background:none;border:none;'}
    var a4 = {name: 'spotContractMoney', fieldLabel: '现场成品合同金额', readOnly: true, style: 'background:none;border:none;'}
    var a5 = {name: 'barOfficial', fieldLabel: '柜台应收金额', readOnly: true, style: 'background:none;border:none;'}
    var a6 = {name: 'spotOfficial', fieldLabel: '现场成品应收金额', readOnly: true, style: 'background:none;border:none;'}
    var b1 = {name: 'No', fieldLabel: '', hidden: true, allowBlank: true} //占位符
    var b2 = {name: 'barCustomer', fieldLabel: '柜台实收金额'}
    var b3 = {name: 'spotCustomer', fieldLabel: '现场成品实收金额'}
    var b4 = {name: 'NoTwo', fieldLabel: '', hidden: true, allowBlank: true} //占位符


    var items = [
        {
            layout: "column",
            border: false,
            layoutConfig: {columns: 2},
            items: [
                {
                    border: false,
                    layout: "form",
                    columnWidth: 0.5,
                    items: [
                        isRead ? getWF3_Text(a1) : getWF3_Text(a2),
                        isRead ? getWF3_Text(a3) : getWF3_Text(a4),
                        isRead ? getWF3_Text(b2) : getWF3_Text(b3)
//                        false?getWF3_RTF(a1) : getWF3_Number(a1),
//                        false?getWF3_RTF(a2) : getWF3_Date(a2),
//                        isRead?getWF3_RTF(a3) : getWF3_Text(a3)
                    ]
                },
                {
                    layout: "form",
                    border: false,
                    columnWidth: 0.5,
                    items: [
                        isRead ? getWF3_Text(b1) : getWF3_Text(b1),
                        isRead ? getWF3_Text(a5) : getWF3_Text(a6),
                        isRead ? getWF3_Text(b4) : getWF3_Text(b4)
//                        false?getWF3_RTF(b1) : getWF3_Number(b1),
//                        false?getWF3_RTF(b2) : getWF3_SK_Type(b2),
//                        false?getWF3_RTF(b3) : getWF3_SK_Type(b3)
                    ]
                }
            ]
        }
    ];

    return items;
}
/**
 * 水晶字、丝印需求填写
 */
function getWF3_items7(isRead) {
    if (!isRead) {
        isRead = false;
    }
    var a1 = {name: 'iscrystal', fieldLabel: "是否需要水晶字"};
    var b1 = {name: 'isscreen', fieldLabel: '是否需要丝印'};

    var items = [
        {
            layout: "column",
            border: false,
            layoutConfig: {columns: 2},
            items: [
                {
                    border: false,
                    layout: "form",
                    columnWidth: 0.5,
                    items: [
                        isRead ? getWF3_RTF(a1) : getWF3_Bool(a1)
                    ]
                },
                {
                    layout: "form",
                    border: false,
                    columnWidth: 0.5,
                    items: [
                        isRead ? getWF3_RTF(b1) : getWF3_Bool(b1)
                    ]
                }
            ]
        }
    ];

    return items;
}
/**
 * 客户需求信息
 */
function getWF3_items8(isRead, showWholeAssembly) {
    if (!isRead) {
        isRead = false;
    }
    if (!showWholeAssembly) {
        showWholeAssembly = false;
    }

    var items = [
        {
            layout: "column",
            border: false,
            layoutConfig: {columns: 2},
            items: [
                {
                    border: false,
                    layout: "form",
                    columnWidth: 0.5,
                    items: [
                        getWF3_RTF({name: 'budget', fieldLabel: '甲方预算'}),
                        getWF3_RTF({name: 'firstdate', fieldLabel: '完成的时间期限'}),
                        getWF3_RTF({name: 'isscreen', fieldLabel: '是否丝印'}),
                        getWF3_RTF({name: 'iscrystal', fieldLabel: '是否水晶字'}),
                        getWF3_RTF({name: 'counterCapital', fieldLabel: '预计货柜资金'}),
                        getWF3_RTF({name: 'doorheadCapital', fieldLabel: '预计门头资金'}),
                        {
                            xtype: "combo",
                            store: SFZTZZ_store,
                            hidden: !showWholeAssembly,
                            hideLabel: !showWholeAssembly,
                            mode: 'local',
                            allowBlank: !showWholeAssembly,
                            hiddenName: 'whole_assembly',
                            forceSelection: false, // 选中内容必须为下拉列表的子项
                            editable: false,
                            typeAhead: true,
                            displayField: 'text',
                            valueField: 'value',
                            triggerAction: "all",
                            fieldLabel: "是否整体组装",
                            anchor: "50%"
                        }

                    ]
                },
                {
                    layout: "form",
                    border: false,
                    columnWidth: 0.5,
                    items: [
                        getWF3_RTF({name: 'likestyle', fieldLabel: '甲方喜欢风格'}),
                        getWF3_RTF({name: 'needhamal', fieldLabel: '是否需要搬运工'}),
                        getWF3_RTF({name: 'isenterpriseSign', fieldLabel: '是否有VI企业标志'}),
                        getWF3_RTF({name: 'isdoor', fieldLabel: '是否包含门头装修'}),
                        getWF3_RTF({name: 'localDecorateCapital', fieldLabel: '预计现场装修资金'}),
                        getWF3_RTF({name: 'countCapital', fieldLabel: '预计投入资金合计'})
                    ]
                }
            ]
        },
        {xtype: 'textarea', anchor: '-18', height: 58, fieldLabel: '设计要求', readOnly: true, name: 'requirements'},
        getWF3_SimpleAPX({fieldLabel: '品牌水晶字', gridSettings: {title: '', type: 1, upLoadFlag: false}}),
        getWF3_SimpleAPX({fieldLabel: 'VI企业标志', gridSettings: {title: '', type: 2, upLoadFlag: false}}),
        getWF3_SimpleAPX({fieldLabel: '门头尺寸图', gridSettings: {title: '', type: 3, upLoadFlag: false}}),
        getWF3_SimpleAPX({fieldLabel: '参考材料', gridSettings: {title: '', type: 4, upLoadFlag: false}}),
        {
            layout: "column",
            border: false,
            layoutConfig: {columns: 2},
            items: [
                {
                    border: false,
                    layout: "form",
                    columnWidth: 0.5,
                    items: [
                        getWF3_RTF({name: 'openstyle', fieldLabel: '卖场开门类型'}),//otheropenStyle
                        getWF3_RTF({name: 'heightcupboard', fieldLabel: '高柜高度'}), //otherheightcupboard
                        getWF3_RTF({name: 'hangCeiling', fieldLabel: '是否制作吊顶'})
                    ]
                },
                {
                    layout: "form",
                    border: false,
                    columnWidth: 0.5,
                    items: [
                        getWF3_RTF({name: 'enternumber', fieldLabel: '卖场入口数量'}), //otherenternumber
                        getWF3_RTF({name: 'lowcupboard', fieldLabel: '低柜高度'}),//otherlowcupboard
                        getWF3_RTF({name: 'hangCeilingHeight', fieldLabel: '吊顶层高度'})
                    ]
                }
            ]
        },
        {xtype: 'textarea', anchor: '-18', height: 58, fieldLabel: '吊顶特殊要求', readOnly: true, name: 'hangCeilingRequire'}
    ];

    return items;
}
/**
 * 客户店面信息
 */
function getWF3_items9(isRead) {
    if (!isRead) {
        isRead = false;
    }

    var items = [
        getWF3_SimpleAPX({
            fieldLabel: '室内尺寸图',
            gridSettings: {id: 'storePic', title: '', fileKey: 'T_SO_CENTRE_file', upLoadFlag: false, type: 1}
        }),
        getWF3_SimpleAPX({
            fieldLabel: '门头尺寸图',
            gridSettings: {id: 'doorPic', title: '', fileKey: 'T_SO_CENTRE_file', upLoadFlag: false, type: 2}
        }),
        getWF3_SimpleAPX({
            fieldLabel: '现场照片',
            gridSettings: {id: 'xcPic', title: '', fileKey: 'T_SO_CENTRE_file', upLoadFlag: false, type: 3}
        }),
        {
            layout: "column",
            border: false,
            layoutConfig: {columns: 2},
            items: [
                {
                    border: false,
                    layout: "form",
                    columnWidth: 0.5,
                    items: [
                        getWF3_RTF({name: 'isbeam', fieldLabel: '内梁图纸纸张'}),
                        getWF3_RTF({name: 'planepicture', fieldLabel: '平面框图张数'}),
                        getWF3_RTF({name: 'structure', fieldLabel: '内部结构图张数'}),
                        getWF3_RTF({name: 'stairleftpictrue', fieldLabel: '楼梯侧面图张数'}),
                        getWF3_RTF({name: 'staitpictrue', fieldLabel: '楼梯位置照片张数'}),
                        getWF3_RTF({name: 'isheating', fieldLabel: '暖气片张数'}),
                        getWF3_RTF({name: 'iswindow', fieldLabel: '窗户图张数'}),
                        getWF3_RTF({name: 'isfire', fieldLabel: '消防栓张数'}),
                        getWF3_RTF({name: 'ispower', fieldLabel: '配电图张数'})
                    ]
                },
                {
                    layout: "form",
                    border: false,
                    columnWidth: 0.5,
                    items: [
                        getWF3_RTF({name: 'ischannel', fieldLabel: '漏水或排污管图张数'}),
                        getWF3_RTF({name: 'powerismove', fieldLabel: '配电箱是否可移动'}),
                        getWF3_RTF({name: 'doorpictrue', fieldLabel: '门头尺寸图张树'}),
                        getWF3_RTF({name: 'storefrontpictrue', fieldLabel: '店面正面照片张数'}),
                        getWF3_RTF({name: 'nearvisitpictrue', fieldLabel: '店面临近街景张数'}),
                        getWF3_RTF({name: 'storetowardspictrue', fieldLabel: '店面正对面张数'}),
                        getWF3_RTF({name: 'aroundpicture', fieldLabel: '四侧墙体张数'}),
                        getWF3_RTF({name: 'storedoorpictrue', fieldLabel: '店面正大门张数'}),
                        getWF3_RTF({name: 'doorwallpictrue', fieldLabel: '正对大门墙面张数'})
                    ]
                }
            ]
        }
    ];

    return items;
}
/**
 * 申请并行生产的理由查看
 */
function getWF3_items10() {
    var items = [
        {xtype: 'textarea', name: 'bx_reason', anchor: '-18', fieldLabel: '理由', height: 58, readOnly: true}
    ];

    return items;
}
/**
 * 卖场信息
 */
function getWF3_items11(isRead) {
    if (!isRead) {
        isRead = false;
    }

    var items = [
        {
            layout: "column",
            border: false,
            layoutConfig: {columns: 2},
            items: [
                {
                    border: false,
                    layout: "form",
                    columnWidth: 0.5,
                    items: [
                        getWF3_RTF({name: 'airConditionerNumberLishi', fieldLabel: '立式机数量'}),
                        getWF3_RTF({name: 'airConditionerNumberGuashi', fieldLabel: '挂式机数量'}),
                        getWF3_RTF({name: 'airConditionerNumberQianrus', fieldLabel: '嵌入式机数量'}),
                        getWF3_RTF({name: 'backgroundMusicEquipment', fieldLabel: '是否安排背景音乐'}),
                        getWF3_RTF({name: 'meanwhileNumber', fieldLabel: '可同时验光人数'})
                    ]
                },
                {
                    layout: "form",
                    border: false,
                    columnWidth: 0.5,
                    items: [
                        getWF3_RTF({name: 'airConditionerPowerLishi', fieldLabel: '立式机功率'}),
                        getWF3_RTF({name: 'airConditionerPowerGuashi', fieldLabel: '挂式机功率'}),
                        getWF3_RTF({name: 'airConditionerPowerQianrush', fieldLabel: '嵌入式机功率'}),
                        getWF3_RTF({name: 'televisionEquipment', fieldLabel: '是否安排电视设备'}),
                        getWF3_RTF({fieldLabel: ''})
                    ]
                }
            ]
        },
        {
            name: 'rgygsEquipment',
            xtype: 'textarea',
            anchor: '-18',
            height: 58,
            fieldLabel: '准备安排在人工验光室的验光设备',
            readOnly: true
        },
        {
            name: 'zhygsEquipment',
            xtype: 'textarea',
            anchor: '-18',
            height: 58,
            fieldLabel: '准备安排在综合验光室的验光设备',
            readOnly: true
        },
        {
            name: 'mpjgsEquipment',
            xtype: 'textarea',
            anchor: '-18',
            height: 58,
            fieldLabel: '为磨片加工室配备的设备',
            readOnly: true
        },
        {
            layout: "column",
            border: false,
            layoutConfig: {columns: 2},
            items: [
                {
                    border: false,
                    layout: "form",
                    columnWidth: 0.5,
                    items: [
                        getWF3_RTF({name: 'hasvisserviced', fieldLabel: '是否有VIS识别系统'})
                    ]
                },
                {
                    layout: "form",
                    border: false,
                    columnWidth: 0.5,
                    items: [
                        getWF3_RTF({name: 'needvisservice', fieldLabel: '是否提供VIS服务'})
                    ]
                }
            ]
        },
        {xtype: 'textarea', anchor: '-18', height: 58, fieldLabel: '招牌的颜色和用材要求', readOnly: true}
    ];

    return items;
}
/**
 * 店面功能区信息
 */
function getWF3_items12() {
    var ptssStore = new Ext.data.JsonStore({
        //autoLoad:true,
        url: 'Quick.ered?reqCode=listAll',
        root: 'ROOT',
        totalProperty: 'TOTALCOUNT',
        fields: ['ptssname', 'ptssnumber', 'ptsslength', 'ptsswidth', 'ptssarea'],
        baseParams: {ref_no: 'workflow_WF3_item1', businessreqid: '1001'}
    });
    var baseSettings = {
        needBussiness: true,
        store: ptssStore,
        columns: [
            {header: '名称', dataIndex: 'ptssname'},
            {header: '数量', dataIndex: 'ptssnumber'},
            {header: '长', dataIndex: 'ptsslength'},
            {header: '宽', dataIndex: 'ptsswidth'},
            {header: '面积', dataIndex: 'ptssarea'}
        ]
    };

    return getWF3_RGP(baseSettings);
}
/**
 * 合同签订信息填写  TODO
 */
function getWF3_items13(isRead) {
    if (!isRead) {
        isRead = false;
    }

    var items = [
        {
            layout: "column",
            border: false,
            layoutConfig: {columns: 3},
            items: [
                {
                    border: false,
                    layout: "form",
                    columnWidth: 0.2,
                    items: [
                        getWF3_Text({name: 'barContract', fieldLabel: '柜台合同', hidden: true, allowBlank: true})

                    ]
                },
                {
                    layout: "form",
                    border: false,
                    columnWidth: 0.4,
                    items: [
                        isRead ? getWF3_Number({
                            id: "barReceivable",
                            name: 'barReceivable',
                            fieldLabel: '柜台总金额',
                            xtype: 'numberfield'/*,readOnly:true*/
                        }) :
                            getWF3_Number({
                                id: "barReceivable",
                                name: 'barReceivable',
                                fieldLabel: '柜台总金额',
                                xtype: 'numberfield',
                                readOnly: true
                            })
                    ]
                },
                {
                    layout: "form",
                    border: false,
                    columnWidth: 0.4,
                    items: [
                        isRead ? getWF3_Number({
                            id: "barOfficial",
                            name: 'barOfficial',
                            fieldLabel: '合同金额',
                            xtype: 'numberfield'
                        }) :
                            getWF3_Number({
                                id: "barOfficial",
                                name: 'barOfficial',
                                fieldLabel: '合同金额',
                                xtype: 'numberfield',
                                readOnly: true
                            })
                    ]
                },
                {
                    layout: "form",
                    border: false,
                    columnWidth: 1,
                    items: [
                        isRead ? getWF3_SimpleAPX({
                            id: 'gthtup',
                            fieldLabel: '柜台合同上传',
                            gridSettings: {title: '', type: 301, upLoadFlag: true}
                        }) :
                            getWF3_SimpleAPX({
                                id: 'gthtdown',
                                fieldLabel: '柜台合同下载',
                                gridSettings: {title: '', type: 301, upLoadFlag: false}
                            })
//                        getWF3_Text({name:'barOfficial',fieldLabel:'实收金额'}),
//                        getWF3_Text({name:'spotOfficial',fieldLabel:'实收金额'})
                    ]

                }, {
                    border: false,
                    layout: "form",
                    columnWidth: 0.2,
                    items: [
                        getWF3_Text({name: 'spotContract', fieldLabel: '现场成品', hidden: true, allowBlank: true})
                    ]
                },
                {
                    layout: "form",
                    border: false,
                    columnWidth: 0.4,
                    items: [
                        isRead ? getWF3_Number({
                            name: 'spotReceivable',
                            fieldLabel: '现场成品总金额',
                            xtype: 'numberfield'/*,readOnly:true*/
                        }) :
                            getWF3_Number({
                                name: 'spotReceivable',
                                fieldLabel: '现场成品总金额',
                                xtype: 'numberfield',
                                readOnly: true
                            })
                    ]
                },
                {
                    layout: "form",
                    border: false,
                    columnWidth: 0.4,
                    items: [
                        getWF3_Number({
                            name: 'spotOfficial',
                            id: 'spotOfficial1',
                            fieldLabel: '合同金额',
                            xtype: 'numberfield',
                            readOnly: true
                        })
                    ]
                },
                {
                    layout: "form",
                    border: false,
                    columnWidth: 1,
                    id: 'download',
                    items: [
                        isRead ? getWF3_SimpleAPX({
                            id: 'xccphtup',
                            fieldLabel: '现场成品合同上传',
                            gridSettings: {title: '', type: 489, upLoadFlag: true}
                        }) :
                            getWF3_SimpleAPX({
                                id: 'xccphtdown',
                                fieldLabel: '现场成品合同下载',
                                gridSettings: {title: '', type: 489, upLoadFlag: false}
                            })
//                        getWF3_Text({name:'barOfficial',fieldLabel:'实收金额'}),
//                        getWF3_Text({name:'spotOfficial',fieldLabel:'实收金额'})
                    ]
                }
            ]
        }
    ];

    return items;
}
/**
 * 客服其他费用  TODO
 */
function getWF3_items14(settings) {
    if (!settings) {
        settings = {};
    }
    var gridPanelExpense = returnOther(settings.inputMoney);
    Ext.apply(gridPanelExpense, settings);
    var items = [
        {
            layout: "column",
            border: false,
            layoutConfig: {columns: 2},
            items: [
                {
                    border: false,
                    layout: "form",
                    columnWidth: 1,
                    items: [
                        getWF3_RGP(gridPanelExpense)
                    ]
                }
            ]
        }
    ];

    return items;
}
/**
 * 人员选择  TODO
 */
function getWF3_items15() {

//    Ext.apply(gridPanelExpense, settings);
    var items = [
        {
            layout: "column",
            border: false,
            layoutConfig: {columns: 2},
            items: [
                {
                    border: false,
                    layout: "form",
                    columnWidth: 0.85,
                    items: [
                        getWF3_Text({
                            id: 'checkEmp',
                            readOnly: true,
                            fieldLabel: '参会人员选择<font color=red>*</font>',
                            anchor: '100%',
                            style: 'background:none;border:none;'
                        })
                    ]
                }, {
                    border: false,
                    layout: "form",
                    columnWidth: 0.15,
                    items: [{
                        text: '选择参会人员',
                        xtype: 'button',
                        anchor: '100%',
                        listeners: {
                            click: function () {
                                returnUser("checkEmp").show();
                            }
                        }
                    }
                    ]
                }, {
                    border: false,
                    layout: "form",
                    columnWidth: 1,
                    items: [
                        getWF3_Text({
                            id: 'content',
                            name: 'content',
                            fieldLabel: '发送内容<font color=red>*</font>',
                            xtype: 'textarea',
                            emptyText: '请输入要通知的内容',
                            anchor: '100%'
                        })
                    ]
                }
            ]
        }
    ];

    return items;
}
/**
 * 其他花费列表 TODO
 */
function getWF3_items16(settings) {
    if (!settings) {
        settings = {};
    }
    var gridPanelExpense = returnOther(settings.inputMoney);
    Ext.apply(gridPanelExpense, settings);
    var items = [
        {
            layout: "column",
            border: false,
            layoutConfig: {columns: 2},
            items: [
                {
                    border: false,
                    layout: "form",
                    columnWidth: 1,
                    items: [
                        getWF3_EADITRGP(gridPanelExpense)
                    ]
                }
            ]
        }
    ];

    return items;
}
/**
 * 报价单确认，现场成品，其他费用总额  TODO
 */
function getWF3_items17(isRead) {
    if (!isRead) {
        isRead = false;
    }

    var items = [
        {
            layout: "column",
            border: false,
            layoutConfig: {columns: 2},
            items: [
                {
                    border: false,
                    layout: "form",
                    columnWidth: 0.5,
                    items: [
                        getWF3_Number({name: 'barAllMoney', fieldLabel: '柜台总金额', xtype: 'numberfield', readOnly: true})
                    ]
                },
                {
                    layout: "form",
                    border: false,
                    columnWidth: 0.5,
                    items: [
                        getWF3_Number({
                            name: 'spotAllMoney',
                            fieldLabel: '现场成品总金额',
                            xtype: 'numberfield',
                            readOnly: true
                        })
                    ]
                },
                {
                    layout: "form",
                    border: false,
                    columnWidth: 0.5,
                    items: [
                        getWF3_Number({
                            name: 'otherAllMoney',
                            fieldLabel: '其他费用总金额',
                            xtype: 'numberfield',
                            readOnly: true
                        })
                    ]
                }

            ]
        }
    ];

    return items;
}
/**
 * 合同谈判组件
 * @return {Array}
 */
function getWF3_items18() {
    var storeIs = new Ext.data.SimpleStore({
        fields: ['codedesc', 'code'],
        data: [['成功', '0'], ['未成功', '1']]
    });
    var a1 = {
        id: 'barResult',
        mode: 'local',
        fieldLabel: '柜台合同谈判<font color=red>*</font>',
        width: 180,
        allowBlank: false,
        store: storeIs,
        editable: false,
        triggerAction: 'all',
        displayField: 'codedesc',
        valueField: 'code'
    };
    var a2 = {
        id: 'spotResult',
        mode: 'local',
        fieldLabel: '现场成品合同谈判<font color=red>*</font>',
        width: 180,
        allowBlank: false,
        store: storeIs,
        editable: false,
        triggerAction: 'all',
        displayField: 'codedesc',
        valueField: 'code'
    };

//    Ext.apply(gridPanelExpense, settings);
    var items = [
        {
            layout: "column",
            border: false,
            layoutConfig: {columns: 2},
            items: [
                {
                    border: false,
                    layout: "form",
                    columnWidth: 0.5,
                    items: [
//                        getWF3_Text({id:'checkEmp',readOnly:true,fieldLabel:'参会人员选择<font color=red>*</font>',anchor:'100%',style: 'background:none;border:none;'})
                        new Ext.form.ComboBox(a1)
                    ]
                }, {
                    border: false,
                    layout: "form",
                    xtype: 'panel',
                    columnWidth: 1,
                    items: [
//                        getWF3_Text({name:'barResultYj',fieldLabel:'柜台谈判结果意见<font color=red>*</font>',xtype:'textArea',emptyText:'请输入您的意见内容',anchor:'100%'})
                        new Ext.OpinionsPanel({title: '', fromid: '', type: '3', labelWidth: 110, id: 'checkBar'})
                    ]
                }, {
                    border: false,
                    layout: "form",
                    columnWidth: 0.5,
                    items: [
                        //          getWF3_Text({id:'checkEmp',readOnly:true,fieldLabel:'参会人员选择<font color=red>*</font>',anchor:'100%',style: 'background:none;border:none;'})
//                        getWF3_SK_Type(a2)
                        new Ext.form.ComboBox(a2)
                    ]
                }, {
                    border: false,
                    layout: "form",
                    columnWidth: 1,
                    items: [
//                        getWF3_Text({name:'spotResultYj',fieldLabel:'现场成品谈判结果意见<font color=red>*</font>',xtype:'textArea',emptyText:'请输入您的意见内容',anchor:'100%'})
                        new Ext.OpinionsPanel({title: '', fromid: '', type: '4', labelWidth: 110, id: 'checkSpot'})
                    ]
                }
            ]
        }
    ];

    return items;
}
/**
 * 合同谈判组件2
 * @return {Array}
 */
function getWF3_items19() {
    var storeIs = new Ext.data.SimpleStore({
        fields: ['codedesc', 'code'],
        data: [['成功', '0'], ['未成功', '1']]
    });
    var a1 = {
        name: 'barResult',
        id: 'barResult2',
        mode: 'local',
        fieldLabel: '柜台合同谈判<font color=red>*</font>',
        width: 180,
        allowBlank: false,
        store: storeIs,
        editable: false,
        triggerAction: 'all',
        displayField: 'codedesc',
        valueField: 'code',
        readOnly: true
    };
    var a2 = {
        name: 'spotResult',
        id: 'spotResult2',
        mode: 'local',
        fieldLabel: '柜台合同谈判<font color=red>*</font>',
        width: 180,
        allowBlank: false,
        store: storeIs,
        editable: false,
        triggerAction: 'all',
        displayField: 'codedesc',
        valueField: 'code',
        readOnly: true
    };

//    Ext.apply(gridPanelExpense, settings);
    var items = [
        {
            layout: "column",
            border: false,
            layoutConfig: {columns: 2},
            items: [
                {
                    border: false,
                    layout: "form",
                    columnWidth: 0.5,
                    items: [
//                        getWF3_Text({id:'checkEmp',readOnly:true,fieldLabel:'参会人员选择<font color=red>*</font>',anchor:'100%',style: 'background:none;border:none;'})
                        getWF3_SK_Type(a1)
                    ]
                }, {
                    border: false,
                    layout: "form",
                    xtype: 'panel',
                    id: 'checkBar',
                    columnWidth: 1,
                    items: [
//                        getWF3_Text({name:'barResultYj',fieldLabel:'柜台谈判结果意见<font color=red>*</font>',xtype:'textArea',emptyText:'请输入您的意见内容',anchor:'100%'})
                    ]
                }, {
                    border: false,
                    layout: "form",
                    columnWidth: 0.5,
                    items: [
                        //          getWF3_Text({id:'checkEmp',readOnly:true,fieldLabel:'参会人员选择<font color=red>*</font>',anchor:'100%',style: 'background:none;border:none;'})
                        getWF3_SK_Type(a2)
                    ]
                }, {
                    border: false,
                    layout: "form",
                    columnWidth: 1,
                    id: 'checkSpot',
                    items: [
//                        getWF3_Text({name:'spotResultYj',fieldLabel:'现场成品谈判结果意见<font color=red>*</font>',xtype:'textArea',emptyText:'请输入您的意见内容',anchor:'100%'})
                    ]
                }
            ]
        }
    ];

    return items;
}
/**
 * 收款情况填写
 */
function getWF3_items20(isRead) {
    if (!isRead) {
        isRead = false;
    }
//    var a1 = {name: 'receivable', fieldLabel: "应收金额"};
//    var a2 = {name: 'collectiondate', fieldLabel: '收款时间'};
//    var a3 = {name: 'payment_account', fieldLabel: "付款账号"};
//    var b1 = {name: 'paid_accounts', fieldLabel: "实收金额"};
//    var b2 = {name: 'collectionway', fieldLabel: '收款方式',field:'CollectionWay'};
//    var b3 = {name: 'collectiontype', fieldLabel: '收款类型',field:'CollectionType'};
    var a1 = {name: 'barMoney', fieldLabel: '柜台金额', readOnly: true, style: 'background:none;border:none;'}
    var a2 = {name: 'spotMoney', fieldLabel: '现场成品金额', readOnly: true, style: 'background:none;border:none;'}
    var a3 = {name: 'barContractMoney', fieldLabel: '柜台合同金额', readOnly: true, style: 'background:none;border:none;'}
    var a4 = {name: 'spotContractMoney', fieldLabel: '现场成品合同金额', readOnly: true, style: 'background:none;border:none;'}
    var a5 = {name: 'barOfficial', fieldLabel: '柜台应收金额', readOnly: true, style: 'background:none;border:none;'}
    var a6 = {name: 'spotOfficial', fieldLabel: '现场成品应收金额', readOnly: true, style: 'background:none;border:none;'}
    var b1 = {name: 'No', fieldLabel: '', hidden: true, allowBlank: true} //占位符
    var b2 = {name: 'barCustomer', fieldLabel: '柜台实收金额'}
    var b3 = {name: 'spotCustomer', fieldLabel: '现场成品实收金额'}
    var b4 = {name: 'NoTwo', fieldLabel: '', hidden: true, allowBlank: true} //占位符


    var items = [
        {
            layout: "column",
            border: false,
            layoutConfig: {columns: 2},
            items: [
                {
                    border: false,
                    layout: "form",
                    columnWidth: 0.5,
                    items: [
                        isRead ? getWF3_Text(a1) : getWF3_Text(a2),
                        isRead ? getWF3_Text(a3) : getWF3_Text(a4)
//                        isRead?getWF3_Text(b2) : getWF3_Text(b3)
//                        false?getWF3_RTF(a1) : getWF3_Number(a1),
//                        false?getWF3_RTF(a2) : getWF3_Date(a2),
//                        isRead?getWF3_RTF(a3) : getWF3_Text(a3)
                    ]
                },
                {
                    layout: "form",
                    border: false,
                    columnWidth: 0.5,
                    items: [
                        isRead ? getWF3_Text(b1) : getWF3_Text(b1),
                        isRead ? getWF3_Text(a5) : getWF3_Text(a6),
                        isRead ? getWF3_Text(b4) : getWF3_Text(b4)
//                        false?getWF3_RTF(b1) : getWF3_Number(b1),
//                        false?getWF3_RTF(b2) : getWF3_SK_Type(b2),
//                        false?getWF3_RTF(b3) : getWF3_SK_Type(b3)
                    ]
                }
            ]
        }
    ];

    return items;
}
/**
 *下单图查看
 * @param settings
 * @return {Ext.form.TextField}
 */
function getWF3_items21(project_id) {
    var XdtInfo = new Ext.Panel({
        items: [new Ext.Button({
            text: '查看工程单下单图信息', iconCls: 'addIcon', id: 'xdtCheck', project_id: '',
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
                        storeId: 'FigurePictureHistoryStore',
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
                            return '<img onclick="uploadOrDownloadAppendix(\'\',' + figure_picture_historyid + ',2,6,\'下载完整工程单信息\',\'\',\'\',\'\',' + false + ',' + false + ',' + true + ',' + true + ',\'T_PM_PackageAppendix_File\')" src="./resource/image/ext/magnifier.png"/>';
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

    return XdtInfo;
}

/**
 * 第二次确认收款ITEMS (柜台合同)
 * @param project_id
 * @return {Ext.Panel}
 */
function getWF3_items22() {

    var a1 = {name: 'barInfo', fieldLabel: '收款信息', readOnly: true, style: 'background:none;border:none;'};
    var a2 = {name: 'barMustMoney', fieldLabel: '该收款项', readOnly: true, style: 'background:none;'};
    var a3 = {name: 'barRealMoney', fieldLabel: '实收款项', readOnly: false, style: 'background:none;'};
    var a4 = {
        name: 'barPlaceholder',
        fieldLabel: '占位符',
        readOnly: true,
        hide: true,
        hideLabel: true,
        allowBlank: true,
        style: 'background:none;border:none;'
    };

    var items = [
        {
            layout: "column",
            border: false,
            layoutConfig: {columns: 2},
            id: 'barMoney',
            items: [
                {
                    border: false,
                    layout: "form",
                    columnWidth: 0.5,
                    items: [
                        getWF3_Text(a1), getWF3_Text(a2)
                    ]
                },
                {
                    layout: "form",
                    border: false,
                    columnWidth: 0.5,
                    items: [
                        getWF3_Text(a4), getWF3_Text(a3)
                    ]
                }
            ]
        }
    ]


    return items;
}

/**
 * 第二次确认收款ITEMS (现场成品)
 * @param project_id
 * @return {Ext.Panel}
 */
function getWF3_items23() {

    var a1 = {name: 'spotInfo', fieldLabel: '收款信息', readOnly: true, style: 'background:none;border:none;'};
    var a2 = {name: 'spotMustMoney', fieldLabel: '该收款项', readOnly: true, style: 'background:none;'};
    var a3 = {name: 'spotRealMoney', fieldLabel: '实收款项', readOnly: false, style: 'background:none;'};
    var a4 = {
        name: 'spotPlaceholder',
        fieldLabel: '占位符',
        readOnly: true,
        hide: true,
        hideLabel: true,
        allowBlank: true,
        style: 'background:none;border:none;'
    };

    var items = [
        {
            layout: "column",
            border: false,
            layoutConfig: {columns: 2},
            id: 'spotMoney',
            items: [
                {
                    border: false,
                    layout: "form",
                    columnWidth: 0.5,
                    items: [
                        getWF3_Text(a1), getWF3_Text(a2)
                    ]
                },
                {
                    layout: "form",
                    border: false,
                    columnWidth: 0.5,
                    items: [
                        getWF3_Text(a4), getWF3_Text(a3)
                    ]
                }
            ]
        }
    ]


    return items;
}


/**
 * 合同选择按钮
 * @return {Array}
 */
function getWF3_items25(readOnly) {

    var items = [
        {
            layout: "column",
            border: false,
            layoutConfig: {columns: 2},
            items: [
                {
                    border: false,
                    layout: "form",
                    columnWidth: 0.5,
                    items: [
                        {
                            xtype: 'button', id: 'button1', text: '综合合同(柜台以及现场成品统一合同)', handler: function () {
                            var item1 = getWF3_items26(readOnly);

                            if (this.ownerCt.items.items[0].id == 'haveTemp') {
                                this.ownerCt.items.items[0].destroy()
                                this.ownerCt.items.removeAt(0);
                                Ext.getCmp('button2').show();
                                Ext.getCmp('button1').setText('综合合同(柜台以及现场成品统一合同)');
                                this.ownerCt.doLayout();
                            } else {
                                this.ownerCt.items.insert(0, item1);
                                Ext.getCmp('button2').hide();
                                Ext.getCmp('button1').setText('返回并删除合同填写框');
                                this.ownerCt.doLayout();
                            }
                        }
                        }
                    ]
                }, {
                    border: false,
                    layout: "form",
                    columnWidth: 0.5,
                    items: [
                        {
                            xtype: 'button', id: 'button2', text: '独立合同(柜台以及现场成品独立合同)', handler: function () {

                            var item1 = getWF3_items28(readOnly);
                            if (this.ownerCt.items.items[0].id == 'haveTemp2') {
                                this.ownerCt.items.items[0].destroy()
                                this.ownerCt.items.removeAt(0);
                                Ext.getCmp('button1').show();
                                Ext.getCmp('button2').setText('独立合同(柜台以及现场成品独立合同)');
                                this.ownerCt.doLayout();
                            } else {
                                this.ownerCt.items.insert(0, item1);
                                Ext.getCmp('button1').hide();
                                Ext.getCmp('button2').setText('返回并删除合同填写框');
                                this.ownerCt.doLayout();
                            }

                        }
                        }
                    ]
                }
            ]
        }
    ]

    return items;
}

/**
 * 综合合同选择
 */
function getWF3_items26(readOnly) {
    var items = new Ext.Panel({
        border: false,
        layout: "form",
        id: 'haveTemp',
        items: [
            {
                name: 'bargaiMoney',
                id: 'bargaiMoney',
                xtype: 'numberfield',
                fieldLabel: '柜台合同总价',
                style: 'background:none;',
                anchor: '100%',
                readOnly: readOnly
            },
            {
                name: 'bargaiOpinion',
                id: 'bargaiOpinion',
                xtype: 'textarea',
                fieldLabel: '合同意见',
                style: 'background:none;',
                anchor: '100%',
                readOnly: readOnly
            }
        ]
    })


    return items;
}

/**
 * 独立合同
 * @return {Ext.Panel}
 */
function getWF3_items28(readOnly) {
    var items = new Ext.Panel(
        {
            layout: "column",
            border: false,
            id: 'haveTemp2',
            layoutConfig: {columns: 2},
            items: [
                {
                    border: false,
                    layout: "form",
                    items: [
                        {
                            name: 'bargaiBarMoney',
                            id: 'bargaiBarMoney',
                            xtype: 'numberfield',
                            fieldLabel: '柜台合同总价',
                            style: 'background:none;',
                            anchor: '100%',
                            readOnly: readOnly
                        },
                        {
                            name: 'bargaiSpotMoney',
                            id: 'bargaiSpotMoney',
                            xtype: 'numberfield',
                            fieldLabel: '现场成品合同总价',
                            style: 'background:none;',
                            anchor: '100%',
                            readOnly: readOnly
                        }
                    ]
                }, {
                    border: false,
                    layout: "form",
                    items: [
                        {
                            name: 'bargaiAllOpinion',
                            id: 'bargaiAllOpinion',
                            xtype: 'textarea',
                            fieldLabel: '合同意见',
                            style: 'background:none;',
                            anchor: '100%',
                            readOnly: readOnly
                        }
                    ]
                }
            ]
        }
    );

    return items;
}

function getWF3_items9(isRead) {
    if (!isRead) {
        isRead = false;
    }

    var items = [
        getWF3_SimpleAPX({
            fieldLabel: '室内尺寸图',
            gridSettings: {id: 'storePic', title: '', fileKey: 'T_SO_CENTRE_file', upLoadFlag: false, type: 1}
        }),
        getWF3_SimpleAPX({
            fieldLabel: '门头尺寸图',
            gridSettings: {id: 'doorPic', title: '', fileKey: 'T_SO_CENTRE_file', upLoadFlag: false, type: 2}
        }),
        getWF3_SimpleAPX({
            fieldLabel: '现场照片',
            gridSettings: {id: 'xcPic', title: '', fileKey: 'T_SO_CENTRE_file', upLoadFlag: false, type: 3}
        }),
        {
            layout: "column",
            border: false,
            layoutConfig: {columns: 2},
            items: [
                {
                    border: false,
                    layout: "form",
                    columnWidth: 0.5,
                    items: [
                        getWF3_RTF({name: 'isbeam', fieldLabel: '内梁图纸纸张'}),
                        getWF3_RTF({name: 'planepicture', fieldLabel: '平面框图张数'}),
                        getWF3_RTF({name: 'structure', fieldLabel: '内部结构图张数'}),
                        getWF3_RTF({name: 'stairleftpictrue', fieldLabel: '楼梯侧面图张数'}),
                        getWF3_RTF({name: 'staitpictrue', fieldLabel: '楼梯位置照片张数'}),
                        getWF3_RTF({name: 'isheating', fieldLabel: '暖气片张数'}),
                        getWF3_RTF({name: 'iswindow', fieldLabel: '窗户图张数'}),
                        getWF3_RTF({name: 'isfire', fieldLabel: '消防栓张数'}),
                        getWF3_RTF({name: 'ispower', fieldLabel: '配电图张数'})
                    ]
                },
                {
                    layout: "form",
                    border: false,
                    columnWidth: 0.5,
                    items: [
                        getWF3_RTF({name: 'ischannel', fieldLabel: '漏水或排污管图张数'}),
                        getWF3_RTF({name: 'powerismove', fieldLabel: '配电箱是否可移动'}),
                        getWF3_RTF({name: 'doorpictrue', fieldLabel: '门头尺寸图张树'}),
                        getWF3_RTF({name: 'storefrontpictrue', fieldLabel: '店面正面照片张数'}),
                        getWF3_RTF({name: 'nearvisitpictrue', fieldLabel: '店面临近街景张数'}),
                        getWF3_RTF({name: 'storetowardspictrue', fieldLabel: '店面正对面张数'}),
                        getWF3_RTF({name: 'aroundpicture', fieldLabel: '四侧墙体张数'}),
                        getWF3_RTF({name: 'storedoorpictrue', fieldLabel: '店面正大门张数'}),
                        getWF3_RTF({name: 'doorwallpictrue', fieldLabel: '正对大门墙面张数'})
                    ]
                }
            ]
        }
    ];

    return items;
}


/**
 * 获取字符型字段
 */
function getWF3_Text(settings) {
    if (!settings) {
        settings = {};
    }
    var baseSettings = {name: 'a1', fieldLabel: "字符值", width: 180, allowBlank: false, editable: false};
    Ext.apply(baseSettings, settings);

    return new Ext.form.TextField(baseSettings);
}
/**
 * 获取数字型字段
 */
function getWF3_Number(settings) {
    if (!settings) {
        settings = {};
    }
    var baseSettings = {
        name: 'a1',
        fieldLabel: "数字值",
        decimalPrecision: 4,
        width: 180,
        allowBlank: false,
        editable: false
    };
    Ext.apply(baseSettings, settings);

    return new Ext.form.NumberField(baseSettings);
}
/**
 * 获取日期型字段
 */
function getWF3_Date(settings) {
    if (!settings) {
        settings = {};
    }
    var baseSettings = {name: 'a1', format: 'Y-m-d', fieldLabel: "时间值", width: 180, allowBlank: false, editable: false};
    Ext.apply(baseSettings, settings);

    return new Ext.form.DateField(baseSettings);

}
/**
 * 获取是否字段
 */
function getWF3_Bool(settings) {
    if (!settings) {
        settings = {};
    }
    var store = new Ext.data.ArrayStore({
        data: [[0, '是'], [1, '否']],
        fields: ['value', 'text']
    });
    var baseSettings = {
        hiddenName: settings.name,
        fieldLabel: "布尔值",
        width: 180,
        allowBlank: false,
        store: store,
        editable: false,
        triggerAction: 'all',
        displayField: 'text',
        valueField: 'value',
        mode: 'local'
    };
    Ext.apply(baseSettings, settings);
    delete baseSettings["name"];

    return new Ext.form.ComboBox(baseSettings);

}
/**
 * 获取数据字典
 * 获取合同是否成功方式
 */
function getWF3_SK_Type(settings) {
    if (!settings) {
        settings = {field: 'CollectionWay'};
    }
    var tempStore = new Ext.data.JsonStore({
        autoLoad: true,
        url: 'Quick.ered?reqCode=listAll',
        root: 'ROOT',
        totalProperty: 'TOTALCOUNT',
        fields: ['code', 'codedesc'],
        baseParams: {ref_no: 'eacode_query1', field: settings.field}
    });

    var baseSettings = {
        hiddenName: settings.name,
        fieldLabel: "收款方式",
        width: 180,
        allowBlank: false,
        store: tempStore,
        editable: false,
        triggerAction: 'all',
        displayField: 'codedesc',
        valueField: 'code'
    };
    Ext.apply(baseSettings, settings);
    delete baseSettings["name"];

    return new Ext.form.ComboBox(baseSettings);

}
/**
 * 获取合同类型
 */
function getWF3_HT_Type(settings) {
    if (!settings) {
        settings = {};
    }
    var baseSettings = {
        hiddenName: settings.name, value: 2, fieldLabel: "合同类型", width: 180, allowBlank: false, store: [
            [2, '柜台合同']
        ], editable: false, triggerAction: 'all'
    };
    Ext.apply(baseSettings, settings);
    delete baseSettings["name"];

    return new Ext.form.ComboBox(baseSettings);

}
/**
 *获取只读式字段 readonly textfield(统一风格)
 */
function getWF3_RTF(settings) {
    if (!settings) {
        settings = {};
    }

    var baseSettings = {
        fieldLabel: "xx字段",
        readOnly: true,
        width: 200,
        style: 'background:none;border:none;border-bottom:none;'
    };
    Ext.apply(baseSettings, settings);

    return new Ext.form.TextField(baseSettings);

}
/**
 *  可编辑模式GRIDPANEL
 */
function getWF3_EADITRGP(settings) {
    if (!settings) {
        settings = {};
    }

    var baseSettings = {
        columns: [],
        border: false,
        style: 'padding:0px;border:1px solid #cfcfcf',
        store: [],
//        readOnly: true,
        autoHeight: true,
        stripeRows: true,
        viewConfig: {forceFit: true},
        loadMask: true
    };
    Ext.apply(baseSettings, settings);
    return new Ext.grid.EditorGridPanel(baseSettings);

}
/**
 *获取只读式表格 readonly gridpanel(统一风格)
 */
function getWF3_RGP(settings) {
    if (!settings) {
        settings = {};
    }
    var baseSettings = {
        columns: [],
        border: false,
        style: 'padding:0px;border:1px solid #cfcfcf',
        store: [],
        readOnly: true,
        autoHeight: true,
        stripeRows: true,
        viewConfig: {forceFit: true},
        loadMask: true
    };
    Ext.apply(baseSettings, settings);

    return new Ext.grid.GridPanel(baseSettings);

}
/**
 *获取附件下载块 CM.Appendix
 */
function getWF3_APX(settings) {
    if (!settings) {
        settings = {};
    }

    var baseSettings = {
        title: '',
        collapsible: false,
        style: 'padding:0px;border:1px solid #cfcfcf',
        fileKey: "T_WF_appendix_file",
        border: false
    };
    Ext.apply(baseSettings, settings);

    return new CM.upLoadGrid(baseSettings);
}
/**
 *获取简约式附件下载块 CM.simpleUpLoadGrid
 */
function getWF3_SimpleAPX(settings) {
    if (!settings) {
        settings = {gridSettings: {}};
    } else if (!settings.gridSettings) {
        settings.gridSettings = {};
    }

    var gridSettings = {
        border: false,
        style: 'padding:0px;border:1px solid #cfcfcf',
        fileKey: "T_WF_appendix_file",
        title: '',
        upLoadFlag: false
    };
    Ext.apply(gridSettings, settings.gridSettings);
    settings.gridSettings = gridSettings;

    return new CM.simpleUpLoadGrid(settings)

}




