/**
 *<pre></pre>
 *<br>
 *<pre>所属模块：</pre>
 * @author 黄琦鸿
 *创建于  2014/12/28 19:11.
 */
Ext.require('Ext4.HOS.Model.CheckReport_Model');
Ext.require('Ext4.HOS.Panel.CheckQuery_Panel');
Ext.require('Ext4.Com.GridPanel.CommonGridPanel');
Ext.onReady(function () {
    var mySave = function (surface, config) {
        config = config || {};
        var exportTypes = {
                'image/png': 'Image',
                'image/jpeg': 'Image',
                'image/svg+xml': 'Svg'
            },
            prefix = exportTypes[config.type] || 'Svg',
            exporter = Ext.draw.engine[prefix + 'Exporter'];
        exporter.defaultUrl = 'HospitalManageAction.ered?reqCode=SaveReport2Image';
        return exporter.generate(surface, config);
    };
    var queryPanel = new Ext4.HOS.Panel.CheckQuery_Panel({
        enableQueryBtn: true,
        enableResetBtn: true,
        enableExportBtn: true,
        enableCheckType: false,
        collapsible: true,
        region: 'north',
        split: true,
        splitterResize: false,
        deptId: root_deptid.substr(0, 6),
        deptName: Hospitaltname,
        height: 110,
        resetFunction: function () {
            queryPanel.getForm().reset()
            dataStore.reload()
        },
        queryFunction: function (params) {
            if (queryPanel.getForm().isValid()) {
                dataStore.reload()
            } else {
                Ext.Msg.show({
                    title: '提示',
                    msg: '表单数据不全',
                    buttons: Ext.Msg.OK,
                    icon: Ext.MessageBox.WARNING
                });
            }
        },
        justExportExcelFun:function(values){
            exportExcelByAjax('HospitalManageAction.ered?reqCode=getGridData2Excel', values);
        }

    });
    var dataStore = Ext.create('Ext.data.Store', {
        autoLoad: true,
        proxy: {
            extraParams: {},
            type: 'ajax',
            url: 'HospitalManageAction.ered?reqCode=GetCheckReportData',
            reader: {
                type: 'json'
            }
        },
        listeners: {
            'beforeload': function (store, operation, eOpts) {
                var ViewChange = panel.down("#ViewChange").getValue()
                var params = queryPanel.getForm().getValues();
                params.ViewChange = ViewChange;
                Ext.apply(store.getProxy().extraParams, params);
                return true;
            }

        },
        model: 'Ext4.HOS.Model.CheckReport_Model'
    })
    /**
     * 数据报表数据存储
     * @type {Ext.data.Store}
     */
    var chart_dataStore = Ext.create('Ext.data.Store', {
        proxy: {
            extraParams: {},
            type: 'ajax',
            url: 'HospitalManageAction.ered?reqCode=GetChartData',
            reader: {
                type: 'json'
            }
        },
        listeners: {
            'beforeload': function (store, operation, eOpts) {
                var ViewChange = panel.down("#ViewChange").getValue()
                var params = queryPanel.getForm().getValues();
                params.ViewChange = ViewChange;
                Ext.apply(store.getProxy().extraParams, params);
                return true;
            }

        },
        model: 'Ext4.HOS.Model.CheckReport_Model'
    })

    var sws_zqlchar = Ext.create('Ext.chart.Chart', {
        style: 'background:#fff',
        checkType: 'CT00101',
        animate: true, title: '手卫生正确率',
        shadow: true,
        store: chart_dataStore,
        axes: [
            {
                type: 'Numeric',
                position: 'left',
                fields: ['zql'],
                title: '手卫生正确率',
                grid: true,
                minimum: 0,
                maximum: 100
            },
            {
                type: 'Category',
                position: 'bottom',
                fields: ['text'],
                title: '医院部门'
            }
        ],
        series: [
            {
                type: 'column',
                axis: 'left',
                highlight: true,
                tips: {
                    trackMouse: true,
                    width: 140,
                    renderer: function (storeItem, item) {
                        var total = 0;
                        dataStore.each(function (rec) {
                            total += rec.get('sws_count');
                        });
                        var zql = storeItem.data.zql;
                        var count = storeItem.data.sws_count;
                        this.setTitle(storeItem.get('text') + '<br>检查数量：' +
                        count + '<br>占有比例：' +
                        Math.round(count / total * 100) + '%' +
                        "<br>正确率：" + zql + '%');
                    }
                },
                label: {
                    display: 'insideEnd',
                    'text-anchor': 'middle',
                    field: 'zql',
                    renderer: Ext.util.Format.numberRenderer('0'),
                    orientation: 'horizontal',
                    color: '#333'
                },
                xField: 'text',
                yField: 'zql'
            }
        ]
    });
    var sws_yclchar = Ext.create('Ext.chart.Chart', {
        style: 'background:#fff',
        animate: true,
        checkType: 'CT00103',
        shadow: true, title: '手卫生依从率',
        store: chart_dataStore,
        axes: [
            {
                type: 'Numeric',
                position: 'left',
                fields: ['ycl'],
                title: '手卫生依从率',
                grid: true,
                minimum: 0,
                maximum: 100
            },
            {
                type: 'Category',
                position: 'bottom',
                fields: ['text'],
                title: '医院部门'
            }
        ],
        series: [
            {
                type: 'column',
                axis: 'left',
                highlight: true,
                tips: {
                    trackMouse: true,
                    width: 140,
                    renderer: function (storeItem, item) {
                        var total = 0;
                        dataStore.each(function (rec) {
                            total += rec.get('sws_yclcount');
                        });
                        var notdocount = storeItem.data.sws_yclnotdocount;
                        var ycl = storeItem.data.ycl;
                        var count = storeItem.data.sws_yclcount;
                        if (Ext.isEmpty(notdocount)) {
                            notdocount = 0;
                        }
                        this.setTitle(storeItem.get('text') + '<br>检查数量：'
                        + storeItem.data.sws_yclcount + '<br>未依从数量：' + notdocount + '<br>占有比例：'
                        + Math.round(count / total * 100) + '%' + "<br>依从率：" + ycl + '%');

                    }
                },
                label: {
                    display: 'insideEnd',
                    'text-anchor': 'middle',
                    field: 'ycl',
                    renderer: Ext.util.Format.numberRenderer('0'),
                    orientation: 'horizontal',
                    color: '#333'
                },
                xField: 'text',
                yField: 'ycl'
            }
        ]
    });

    var zskh_zqlchar = Ext.create('Ext.chart.Chart', {
        style: 'background:#fff',
        animate: true,
        shadow: true, title: '知识考核正确率',
        store: chart_dataStore,
        checkType: 'CT00102',
        axes: [
            {
                type: 'Numeric',
                position: 'left',
                fields: ['zskh_zql'],
                title: '知识考核正确率',
                grid: true,
                minimum: 0,
                maximum: 100
            },
            {
                type: 'Category',
                position: 'bottom',
                fields: ['text'],
                title: '医院部门'
            }
        ],
        series: [
            {
                type: 'column',
                axis: 'left',
                highlight: true,
                tips: {
                    trackMouse: true,
                    width: 140,
                    renderer: function (storeItem, item) {
                        var total = 0;
                        dataStore.each(function (rec) {
                            total += rec.get('zskh_allcount');
                        });
                        var zql = storeItem.data.zskh_zql;
                        var count = storeItem.data.zskh_allcount;
                        this.setTitle(storeItem.get('text') + '<br>考核数量：' +
                        storeItem.data.zskh_allcount + '<br>占有比例：' +
                        Math.round(count / total * 100) + '%' +
                        "<br>正确率：" + zql + '%');
                    }
                },
                label: {
                    display: 'insideEnd',
                    'text-anchor': 'middle',
                    field: 'zskh_zql',
                    renderer: Ext.util.Format.numberRenderer('0'),
                    orientation: 'horizontal',
                    color: '#333'
                },
                xField: 'text',
                yField: 'zskh_zql'
            }
        ]
    });
    var zskh_yz_zqlchar = Ext.create('Ext.chart.Chart', {
        style: 'background:#fff',
        animate: true,
        shadow: true, title: '“原则”正确率',
        store: chart_dataStore,
        checkType: 'CT00102',
        axes: [
            {
                type: 'Numeric',
                position: 'left',
                fields: ['zskh_yzzql'],
                title: '知识考核正确率',
                grid: true,
                minimum: 0,
                maximum: 100
            },
            {
                type: 'Category',
                position: 'bottom',
                fields: ['text'],
                title: '医院部门'
            }
        ],
        series: [
            {
                type: 'column',
                axis: 'left',
                highlight: true,
                tips: {
                    trackMouse: true,
                    width: 140,
                    renderer: function (storeItem, item) {
                        var total = 0;
                        dataStore.each(function (rec) {
                            total += rec.get('zskh_yzcount');
                        });
                        var zql = storeItem.data.zskh_yzzql;
                        var count = storeItem.data.zskh_yzcount;
                        this.setTitle(storeItem.get('text') + '<br>检查数量：' +
                        storeItem.data.zskh_yzcount + '<br>占有比例：' +
                        Math.round(count / total * 100) + '%' +
                        "<br>正确率：" + zql + '%');
                    }
                },
                label: {
                    display: 'insideEnd',
                    'text-anchor': 'middle',
                    field: 'zskh_yzzql',
                    renderer: Ext.util.Format.numberRenderer('0'),
                    orientation: 'horizontal',
                    color: '#333'
                },
                xField: 'text',
                yField: 'zskh_yzzql'
            }
        ]
    });
    var zskh_zz_zqlchar = Ext.create('Ext.chart.Chart', {
        style: 'background:#fff',
        animate: true,
        shadow: true, title: '“指针”正确率',
        store: chart_dataStore,
        checkType: 'CT00102',
        axes: [
            {
                type: 'Numeric',
                position: 'left',
                fields: ['zskh_zzzql'],
                title: '知识考核正确率',
                grid: true,
                minimum: 0,
                maximum: 100
            },
            {
                type: 'Category',
                position: 'bottom',
                fields: ['text'],
                title: '医院部门'
            }
        ],
        series: [
            {
                type: 'column',
                axis: 'left',
                highlight: true,
                tips: {
                    trackMouse: true,
                    width: 140,
                    renderer: function (storeItem, item) {
                        var total = 0;
                        dataStore.each(function (rec) {
                            total += rec.get('zskh_zzcount');
                        });
                        var zql = storeItem.data.zskh_zzzql;
                        var count = storeItem.data.zskh_zzcount;
                        this.setTitle(storeItem.get('text') + '<br>检查数量：' +
                        storeItem.data.zskh_zzcount + '<br>占有比例：' +
                        Math.round(count / total * 100) + '%' +
                        "<br>正确率：" + zql + '%');

                    }
                },
                label: {
                    display: 'insideEnd',
                    'text-anchor': 'middle',
                    field: 'zskh_zzzql',
                    renderer: Ext.util.Format.numberRenderer('0'),
                    orientation: 'horizontal',
                    color: '#333'
                },
                xField: 'text',
                yField: 'zskh_zzzql'
            }
        ]
    });
    var zskh_sx_zqlchar = Ext.create('Ext.chart.Chart', {
        style: 'background:#fff',
        animate: true,
        shadow: true,
        checkType: 'CT00102',
        title: '“洗手+手消”正确率',
        store: chart_dataStore,
        axes: [
            {
                type: 'Numeric',
                position: 'left',
                fields: ['zskh_sxzql'],
                title: '知识考核正确率',
                grid: true,
                minimum: 0,
                maximum: 100
            },
            {
                type: 'Category',
                position: 'bottom',
                fields: ['text'],
                title: '医院部门'
            }
        ],
        series: [
            {
                type: 'column',
                axis: 'left',
                highlight: true,
                tips: {
                    trackMouse: true,
                    width: 140,
                    renderer: function (storeItem, item) {
                        var total = 0;
                        dataStore.each(function (rec) {
                            total += rec.get('zskh_sxcount');
                        });
                        var zql = storeItem.data.zskh_sxzql;
                        var count = storeItem.data.zskh_sxcount;
                        this.setTitle(storeItem.get('text') + '<br>检查数量：' +
                        storeItem.data.zskh_sxcount + '<br>占有比例：' +
                        Math.round(count / total * 100) + '%' +
                        "<br>正确率：" + zql + '%');
                    }
                },
                label: {
                    display: 'insideEnd',
                    'text-anchor': 'middle',
                    field: 'zskh_sxzql',
                    renderer: Ext.util.Format.numberRenderer('0'),
                    orientation: 'horizontal',
                    color: '#333'
                },
                xField: 'text',
                yField: 'zskh_sxzql'
            }
        ]
    });
    var chartTabPanel = Ext.create('Ext.tab.Panel', {
        border: false,
        layout: {type: 'fit'},
        tbar: [
            new Ext.form.field.ComboBox({
                name: 'ViewChange', labelWidth: 60,
                itemId: 'ViewChange',
                hiddenName: 'ViewChange', labelAlign: 'right',
                store: RV001Store,
                value: '1',
                queryMode: 'local',
                triggerAction: 'all',
                valueField: 'value',
                displayField: 'text',
                fieldLabel: '视图切换',
                forceSelection: true,
                listeners: {
                    'select': function () {
                        alert('功能待开发')

                    }

                }
            }),
            {
                text: '保存图表',
                iconCls: 'imageIcon',
                handler: function () {
                    Ext.MessageBox.confirm('下载确认', '您确定将图表保存成图片吗?', function (choice) {
                        if (choice == 'yes') {
                            var activpane = chartTabPanel.getActiveTab();
                            var itemxtype = activpane.xtype;
                            mySave(itemxtype == 'tabpanel' ? activpane.getActiveTab().surface : activpane.surface, {
                                type: 'image/png'
                            });
                        }
                    });
                }
            }
        ],
        xtype: 'tabpanel',
        layout: 'fit',
        height: document.body.clientHeight - 140,
        items: [{
            layout: 'fit',
            title: '手卫生检查图表',
            xtype: 'tabpanel',
            items: [
                sws_zqlchar,
                sws_yclchar],
            listeners: {
                'tabchange': function (tabPanel, newCard, oldCard, eOpts) {
                    chart_dataStore.getProxy().extraParams.checkType = newCard.checkType;
                    chart_dataStore.reload();
                },
                'activate': function (tabPanel, eOpts) {
                    chart_dataStore.getProxy().extraParams.checkType = tabPanel.getActiveTab().checkType;
                    chart_dataStore.reload();
                }

            }
        },
            {
                layout: 'fit',
                title: '知识考核图表',
                xtype: 'tabpanel',
                items: [zskh_zqlchar, zskh_yz_zqlchar, zskh_zz_zqlchar, zskh_sx_zqlchar],
                listeners: {
                    'tabchange': function (tabPanel, newCard, oldCard, eOpts) {
                        chart_dataStore.getProxy().extraParams.checkType = newCard.checkType;
                        chart_dataStore.reload();
                    },
                    'activate': function (tabPanel, eOpts) {
                        chart_dataStore.getProxy().extraParams.checkType = tabPanel.getActiveTab().checkType;
                        chart_dataStore.reload();
                    }
                }
            }

        ]
    })
    var panel = new Ext.Panel({
        layout: {type: 'vbox', align: 'stretch'},
        region: 'center', border: false,
        autoScroll: true,
        items: [
            new Ext4.Com.GridPanel.CommonGridPanel({
                height: document.body.clientHeight - 140,
                DataStore: dataStore,
                autoScroll: true,
                tbar: [{
                    text: '查看全院数据', xtype: 'button', iconCls: 'zoomIcon', handler: function () {
                        Ext.Ajax.request({
                            url: './HospitalManageAction.ered?reqCode=getQuanCheckYuanReportData',
                            success: function (response) {
                                var resultArray = Ext.JSON
                                    .decode(response.responseText);
                                var record = new Ext4.HOS.Model.CheckReport_Model(resultArray[0]);
                                var formpanel = new Ext.form.Panel({
                                    border: false,
                                    xtype: 'form', bodyStyle: 'padding:5 5 5 5 ',
                                    items: [
                                        {
                                            xtype: 'fieldset', defaults: {
                                            xtype: 'textfield', labelWidth: 80, labelAlign: 'right',
                                            fieldStyle: 'background:none;border:none;',
                                            readOnly: true

                                        },
                                            title: '手卫生', layout: {
                                            type: 'column'
                                        }, items: [
                                            {
                                                fieldLabel: "正确率", name: "zql", columnWidth: 0.5

                                            }, {
                                                fieldLabel: "依从率", name: "ycl", columnWidth: 0.5
                                            }
                                        ]

                                        }
                                        , {
                                            xtype: 'fieldset', defaults: {
                                                xtype: 'textfield', labelWidth: 80, labelAlign: 'right',
                                                fieldStyle: 'background:none;border:none;',
                                                readOnly: true
                                            },
                                            layout: {
                                                type: 'column'
                                            },
                                            title: '知识考核', items: [
                                                {
                                                    fieldLabel: "正确率", name: "zskh_zql", columnWidth: 0.5

                                                },
                                                {
                                                    fieldLabel: "'原则'正确率", name: "zskh_yzzql", columnWidth: 0.5

                                                },
                                                {
                                                    fieldLabel: "'指针'正确率", name: "zskh_zzzql", columnWidth: 0.5

                                                },
                                                {
                                                    fieldLabel: "'手消'正确率", name: "zskh_sxzql", columnWidth: 0.5
                                                }
                                            ]
                                        }

                                    ]
                                })
                                formpanel.getForm().loadRecord(record);
                                new Ext.window.Window({
                                    modal: true,
                                    title: '全院信息',
                                    width: 370,
                                    height: 170,
                                    center: true,
                                    resizable: false,
                                    closable: true,
                                    closeAction: 'destroy',
                                    layout: {
                                        type: 'fit'
                                    },
                                    items: [
                                        formpanel
                                    ], listeners: {
                                        'beforeshow': function () {

                                        }

                                    }
                                }).show();
                            },
                            failure: function (response) {
                                var resultArray = Ext.JSON
                                    .decode(response.responseText);
                                Ext.Msg.alert('提示', '获取数据失败');
                            }
                        });

                    }
                }],
                forceFit: false,
                DataCM: [
                    {
                        xtype: 'rownumberer',
                        text: '序号',
                        width: 40
                    },
                    {
                        text: '科室', // 列标题
                        dataIndex: 'text', // 数据索引:和Store模型对应
                        sortable: true
                    }
                    , {
                        text: '正确性检查数量', // 列标题
                        dataIndex: 'sws_count', // 数据索引:和Store模型对应
                        sortable: true
                    }, {
                        text: '正确数量', // 列标题
                        dataIndex: 'sws_zqcount', // 数据索引:和Store模型对应
                        sortable: true
                    }, {
                        text: '依从性检查数量', // 列标题
                        dataIndex: 'sws_yclcount', // 数据索引:和Store模型对应
                        sortable: true
                    }, {
                        text: '手卫生依从率', // 列标题
                        dataIndex: 'ycl', // 数据索引:和Store模型对应
                        sortable: true,
                        renderer: function (value) {
                            return Ext.isEmpty(value) ? value : (value + '%')
                        }
                    }, {
                        text: '手卫生正确率', // 列标题
                        dataIndex: 'zql', // 数据索引:和Store模型对应
                        sortable: true,
                        renderer: function (value) {
                            return Ext.isEmpty(value) ? value : (value + '%')
                        }
                    }, {
                        text: '知识考核检查数量', // 列标题
                        dataIndex: 'zskh_allcount', // 数据索引:和Store模型对应
                        sortable: true
                    }, {
                        text: '原则正确数量', // 列标题
                        dataIndex: 'zskh_yzzqcount', // 数据索引:和Store模型对应
                        sortable: true
                    }, {
                        text: '指征正确数量', // 列标题
                        width: 100,
                        dataIndex: 'zskh_zzzqcount', // 数据索引:和Store模型对应
                        sortable: true
                    }, {
                        text: '手消正确数量', // 列标题
                        width: 100,
                        dataIndex: 'zskh_sxzqcount', // 数据索引:和Store模型对应
                        sortable: true
                    }, {
                        text: '知识考核正确率', // 列标题
                        dataIndex: 'zskh_zql', // 数据索引:和Store模型对应
                        sortable: true,
                        renderer: function (value, obj, record) {
                            return Ext.isEmpty(record.data.zskh_allcount) ? '' : ( Ext.isEmpty(value) ? value : (value + '%'))
                        }
                    }
                ]
            }),
            chartTabPanel
        ],
        title: '<span class="commoncss">手卫报表</span>'
    });
    // 布局模型
    new Ext.Viewport({
        layout: 'border',
        items: [queryPanel, panel]
    });
})