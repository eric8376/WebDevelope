/**
 *<pre></pre>
 *<br>
 *<pre>所属模块：</pre>
 * @author 黄琦鸿
 *创建于  2014年12月28日18:49:02
 */
Ext.define('Ext4.HOS.GridPanel.CheckInfo_Grid', {
    extend: 'Ext4.Com.GridPanel.CommonGridPanel',
    autoloaddata: true,
    check_type: '',
    queryPanel: {},
    verify_statu: '',
    deptId: "001",
    StoreUrl: 'HospitalManageAction.ered?reqCode=queryCheckInfo',
    canSeeHistory: true,
    checker_name: '',
    checker: '',
    forceFit: false,
    justSeeHistory: false,
    isbatchVerify:false,
    requires: ['Ext4.HOS.Model.CheckInfo_Model', 'Ext4.HOS.Panel.CheckInfo_Panel', 'Ext4.HOS.Model.HistoryCheckinfo_Model'],
    initComponent: function () {
        var me = this;
        me.showSelModel=me.isbatchVerify?true: false;
        if(me.isbatchVerify)
        {
            me.extendTopBtn.push({
                text:'通过',
                iconCls:'acceptIcon',
                handler:function(){
                    me.verifyFun(true)
                }
            });
            me.extendTopBtn.push({
                text:'不通过',
                iconCls:'cancelIcon',
                handler:function(){
                    me.verifyFun(false)
                }

            })
        }
        var extraParams = {
            check_type: me.check_type,
            verify_statu: me.verify_statu
        }
        me.DataStore = Ext.create('Ext.data.Store', {
            autoLoad: me.autoloaddata,
            proxy: {
                extraParams: extraParams,
                type: 'ajax',
                url: me.StoreUrl,
                reader: {
                    type: 'json',
                    totalProperty: 'TOTALCOUNT', // 记录总数
                    root: 'ROOT' // Json中的列表数据根节点
                }
            },
            model: 'Ext4.HOS.Model.CheckInfo_Model'
        });
        me.DataCM = [
            {
                xtype: 'rownumberer',
                text: '序号',
                width: 40
            },
            {
                text: '科室', // 列标题
                dataIndex: 'deptname', // 数据索引:和Store模型对应
                sortable: true
            },
            {
                text: '当事人角色', // 列标题
                dataIndex: 'litigantrole', // 数据索引:和Store模型对应
                sortable: true,
                renderer: LitigantRoleRender
            },
            {
                text: '当事人', // 列标题   renderer: COM001Render   renderer: COM001Render
                dataIndex: 'litigant_name', // 数据索引:和Store模型对应
                sortable: true
            }
        ];
        if (me.check_type == 'CT00103') {
            me.DataCM.push({
                text: '操作名称', // 列标题
                dataIndex: 'course_name', // 数据索引:和Store模型对应
                sortable: true
            });
            me.DataCM.push({
                text: '调查指标', // 列标题
                dataIndex: 'checknorm', // 数据索引:和Store模型对应
                sortable: true,
                renderer: CheckNormRender
            })
        }
        if (me.check_type != 'CT00103') {
            me.DataCM.push({
                text: me.check_type == 'CT00102' ? "含知识考核" : '含正确性', // 列标题
                dataIndex: 'validity', // 数据索引:和Store模型对应
                sortable: true,
                renderer: COM001Render
            });
            if (me.check_type == 'CT00101') {
                me.DataCM.push({
                    text: '正确性', // 列标题
                    dataIndex: 'completed', // 数据索引:和Store模型对应
                    sortable: true,
                    renderer: COM001Render
                });
            }

            me.DataCM.push({
                text: me.check_type == 'CT00101' ? '是否正确手消' : '原则', // 列标题
                dataIndex: 'standard1', // 数据索引:和Store模型对应
                sortable: true,
                renderer: me.check_type == 'CT00101' ? COM001Render : COM003Render
            });
            me.DataCM.push({
                text: me.check_type == 'CT00101' ? '是否有饰品' : '指征', // 列标题
                dataIndex: 'standard2', // 数据索引:和Store模型对应
                sortable: true,
                renderer: me.check_type == 'CT00101' ? COM001Render : COM003Render
            });
            me.DataCM.push({
                text: me.check_type == 'CT00101' ? '是否正确揉搓' : '洗手+手消',// 列标题
                dataIndex: 'standard3', // 数据索引:和Store模型对应
                sortable: true,
                renderer: me.check_type == 'CT00101' ? COM001Render : COM003Render
            })
        }
        me.DataCM.push({
            text: '检查时间', // 列标题
            dataIndex: 'check_time', // 数据索引:和Store模型对应
            sortable: true,
            width:150
        })
        me.DataCM.push({
            text: '备注', // 列标题
            dataIndex: 'remark', // 数据索引:和Store模型对应
            sortable: true
        });
        if (Ext.isEmpty(me.check_type)) {
            me.DataCM.push({
                text: '检查类型', // 列标题
                dataIndex: 'check_type', // 数据索引:和Store模型对应
                sortable: true,
                renderer: CheckTypeRender
            })
        }
        if (me.canSeeHistory) {
            me.extendEndCM.push(
                {
                    text: '查看历史',
                    xtype: "actioncolumn",
                    items: [{
                        xtype: 'button',
                        icon: "./resource/image/ext/zoom.png",
                        handler: function (grid, rowIndex, colIndex, e) {
                            var record = grid.getStore().getAt(rowIndex);
                            var record_id = record.get('record_id');
                            var checktype = record.get('check_type');
                            var store = Ext.create('Ext.data.Store', {
                                model: 'Ext4.HOS.Model.HistoryCheckinfo_Model',
                                pageSize: '20',
                                autoLoad: true,
                                proxy: {
                                    type: 'ajax',
                                    url: 'HospitalManageAction.ered?reqCode=queryHistoryCheckInfo',
                                    reader: {
                                        type: 'json',
                                        totalProperty: 'TOTALCOUNT', // 记录总数
                                        root: 'ROOT' // Json中的列表数据根节点
                                    }
                                }
                            });
                            var grid = new Ext4.Com.GridPanel.CommonGridPanel({
                                autoScroll: true,
                                DataStore: store, // 数据存储
                                stripeRows: true, // 斑马线
                                paging: true,
                                DataCM: [
                                    {
                                        text: '操作员', // 列标题
                                        dataIndex: 'username', // 数据索引:和Store模型对应
                                        sortable: true
                                    },
                                    {
                                        text: '操作时间', // 列标题
                                        dataIndex: 'operate_time', // 数据索引:和Store模型对应
                                        sortable: true
                                    },
                                    {
                                        text: '操作类型', // 列标题
                                        dataIndex: 'operate_type', // 数据索引:和Store模型对应
                                        sortable: true,
                                        renderer: OT001Render
                                    }, {
                                        text: '查看明细',
                                        xtype: "actioncolumn",
                                        items: [{
                                            xtype: 'button',
                                            icon: "./resource/image/ext/zoom.png",
                                            handler: function (grid, rowIndex, colIndex, e) {
                                                var record = grid.getStore().getAt(rowIndex);
                                                var history_id = record.get('history_id');
                                                var formPanel = new Ext4.HOS.Panel.CheckInfo_Panel({
                                                    isReadOnly: true,
                                                    check_type: checktype,
                                                    deptId: me.deptId,
                                                    deptName: me.deptName
                                                })
                                                new Ext.window.Window({
                                                    title: '<span class="commoncss">查看明细</span>', // 窗口标题
                                                    layout: 'fit', // 设置窗口布局模式
                                                    modal: true,
                                                    width: document.body.clientWidth * 0.5, // 窗口宽度
                                                    height: document.body.clientHeight * 0.6, // 窗口高度
                                                    closable: true, // 是否可关闭
                                                    items: [formPanel],
                                                    listeners: {
                                                        'beforeshow': function () {
                                                            formPanel.loadDataByFormID('', history_id);
                                                        }

                                                    }
                                                }).show();
                                            },
                                            scope: this

                                        }]

                                    }],
                                extra_Params: {record_id: record_id}
                            });
                            new Ext.window.Window({
                                title: '<span class="commoncss">历史记录</span>', // 窗口标题
                                layout: 'fit', // 设置窗口布局模式
                                modal: true,
                                width: document.body.clientWidth * 0.5, // 窗口宽度
                                height: document.body.clientHeight * 0.6, // 窗口高度
                                closable: true, // 是否可关闭
                                items: [grid]
                            }).show();
                        },
                        scope: this

                    }]

                })
        }
        if (me.justSeeHistory) {
            me.extendEndCM.push({
                text: '查看明细',
                xtype: "actioncolumn",
                items: [{
                    xtype: 'button',
                    icon: "./resource/image/ext/zoom.png",
                    handler: function (grid, rowIndex, colIndex, e) {
                        var record = grid.getStore().getAt(rowIndex);
                        var history_id = record.get('formid');
                        var formPanel = new Ext4.HOS.Panel.CheckInfo_Panel({
                            isReadOnly: true,
                            deptId: me.deptId,
                            deptName: me.deptName
                        })
                        new Ext.window.Window({
                            title: '<span class="commoncss">查看明细</span>', // 窗口标题
                            layout: 'fit', // 设置窗口布局模式
                            modal: true,
                            width: document.body.clientWidth * 0.5, // 窗口宽度
                            height: document.body.clientHeight * 0.6, // 窗口高度
                            closable: true, // 是否可关闭
                            items: [formPanel],
                            listeners: {
                                'beforeshow': function () {
                                    formPanel.loadDataByFormID('', history_id);
                                }

                            }
                        }).show();
                    },
                    scope: this

                }]

            })
        }
        me.createTitle = '<span class="commoncss">添加' + ( me.check_type == 'CT00101' ?'正确性' :( me.check_type == 'CT00102'?'知识考核':'依从性')) + '检查</span>';
        me.updateTitle = '<span class="commoncss">修改' +( me.check_type == 'CT00101' ?'正确性' :( me.check_type == 'CT00102'?'知识考核':'依从性')) + '检查</span>';
        me.createUrl = 'HospitalManageAction.ered?reqCode=saveCheckRecordInfo';
        me.updateUrl = 'HospitalManageAction.ered?reqCode=updateCheckRecordInfo';
        me.delUrl = 'HospitalManageAction.ered?reqCode=deleteCheckRecordInfo';
        me.CU_FormPanel_FUN = function (rec) {
            return new Ext4.HOS.Panel.CheckInfo_Panel({
                check_type: Ext.isEmpty(rec) ? me.check_type : rec[0].get('check_type'),
                isupdate: true,
                checker_name: me.checker_name,
                checker: me.checker,
                deptId: me.deptId,
                deptName: me.deptName
            })
        };
        me.beforeWinCloseMethod = function (back) {
            Ext.Msg.show({
                title: '请确认',
                msg: '记录保存成功,请选择后续操作',
                buttons: Ext.Msg.YESNOCANCEL,
                buttonText: {
                    yes: '继续',
                    no: '重新创建',
                    cancel: '关闭'

                },
                fn: function (buttonId, text, opt) {
                    if (buttonId == 'yes') {
                        var CU_FormPanel = me.CU_FormPanel;
                        var params = CU_FormPanel.getForm().getValues();
                        Ext.apply(
                            params,
                            {remark: '', completed: '', checknorm: '', course_id: ''}
                        );
                        CU_FormPanel.getForm().loadRecord(new Ext4.HOS.Model.CheckInfo_Model(params));
                    } else if (buttonId == 'no') {
                        var CU_FormPanel = me.CU_FormPanel;
                        CU_FormPanel.getForm().loadRecord(new Ext4.HOS.Model.CheckInfo_Model({
                            check_type: me.check_type,
                            validity: 'COM00102'
                        }));
                    } else if (buttonId == 'cancel') {
                        me.CU_window.close()
                    }
                },
                icon: Ext.Msg.OK
            });

        }
        me.beforeCreateMethod = function (params, back) {
            var CU_FormPanel = this.CU_FormPanel;
            var params = me.queryPanel.getForm().getValues();
            params.check_type = this.check_type;
            params.checker = me.checker;
            params.checker_name = me.checker_name;
            params.check_time = new Date();
            CU_FormPanel.loadStoreData();
            params.validity = 'COM00102'
            CU_FormPanel.getForm().loadRecord(new Ext4.HOS.Model.CheckInfo_Model(params));
            back(true);
        };
        me.beforeUpdateMethods = [function (rec, back) {
            //后台请求输入的检查标准
            var CU_FormPanel = me.CU_FormPanel;
            CU_FormPanel.loadDataByFormID(rec.record_id)
            back(true)
        }];
        me.getCU_WidthAndHeight = function () {
            var me = this;
            return {
                CU_Window_Width: 550,
                CU_Window_Height: 320
            }

        };
        //_____________初始化结束_____________
        me.superclass.initComponent.call(this);
    },
    verifyFun:function(verify_statu){
      var me=this;
       var rec= me.getSelectionModel().getSelection( );
        if (Ext.isEmpty(rec)) {
            Ext.Msg.show({
                title: '提示',
                msg: '请选择要审核的记录',
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.WARNING
            });
            return;
        }
        var records = new Array();
        for(var i=0;i<rec.length;i++)
        {
            var rectemp=rec[i];
            rectemp.set('activityId',rectemp.get('activityid'));
            rectemp.set('processKey',rectemp.get('processkey'));
            rectemp.set('processId',rectemp.get('processid'));
            rectemp.set('taskId',rectemp.get('taskid'));
            rectemp.set('businessKey',rectemp.get('businesskey'));
            records.push(rectemp.data);
        }
        var msgTip = Ext.MessageBox.show({
            closable: false,
            title: '提示',
            width: 250,
            msg: '数据处理中,请稍后......'
        });
        Ext.Ajax.request({
            url: 'HospitalManageAction.ered?reqCode=doBatchVerifyCheckRecordInfo',
            success: function (response) {
                msgTip.hide();
                var result = Ext.JSON.decode(response.responseText);
                if (result.error) {
                    Ext.Msg.show({
                        title: '提示',
                        msg: result.error,
                        buttons: Ext.Msg.OK,
                        icon: Ext.MessageBox.WARNING
                    });
                }
                else {
                 me.getStore().reload()
                }
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
            params: {
                verify_statu: verify_statu,
                records:  Ext.JSON.encode(records)
            }
        });

    }

});