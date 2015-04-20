Ext.require('Ext4.Com.Model.haveWorkingProcess_Model');
Ext.onReady(function () {

    var endprocesslistOutlayFormrownum = {
        xtype: 'rownumberer',
        text: '序号',
        width: 32
    };

// 表格工具栏
    var tbar = [
        {
            xtype: 'textfield',
            id: 'findKey',
            name: 'findKey',
            emptyText: '请输入工程单号',
            width: 150,
            enableKeyEvents: true,
            // 响应回车键
            listeners: {
                specialkey: function (field, e) {
                    if (e.getKey() == Ext.EventObject.ENTER) {
                        findData();
                    }
                }
            }
        },
        {
            text: '查询',
            iconCls: 'page_findIcon',
            handler: function () {
                findData();
            }
        },
        {
            text: '刷新',
            iconCls: 'page_refreshIcon',
            handler: function () {
                endprocesslistOutlayFormStore.reload();
            }
        }
    ];
    /**
     * 待办工作的列模式
     */
    var endprocesslistOutlayFormCm = [endprocesslistOutlayFormrownum/*, endprocesslistOutlayFormsm*/, {
        text: '流程名称', // 列标题resizable:false,
        resizable: true,
        sortable: true,
        menuDisabled: true,
        dataIndex: 'processname' // 数据索引:和Store模型对应
    }, {
        text: '主题',
        dataIndex: 'wf_title'
    }, {
        text: '发起人',
        dataIndex: 'applyuserid'
    }, {
        text: '当前节点',
        dataIndex: 'name_',
        renderer: function (value, cellmeta, record, rowIndex) {
            var proc_inst_id_ = record.get("proc_inst_id_");
            return "<a href='#' onclick='showTraceView(" + proc_inst_id_ + ")'>" + value + "</a>";
        }
    }, {
        text: '当前操作人',
        dataIndex: 'curassignee'
    }, {
        text: '任务到达时间',
        dataIndex: 'create_time_'
    }, {
        text: '',
        dataIndex: 'proc_inst_id_',
        renderer: function (value, cellmeta, record, rowIndex) {
            var wf_title = record.get("wf_title");
            var business_key_ = record.get("business_key_");
            var task_key_ = record.get("act_id_");
            var rtnStr = "";
            rtnStr += "<a href='#' onclick='showProcessLog(\"" + value + "\",\"" + wf_title + "\",\"" + business_key_ + "\",\"" + task_key_ + "\")'>查看明细  </a>";
            if (wf_title.indexOf("增补") != -1) {
                rtnStr += " | <a href='#' onclick='showProcessBack(\"" + value + "\",\"" + wf_title + "\",\"" + business_key_ + "\",\"" + task_key_ + "\")'>撤回</a>";
            }
            return rtnStr;
        }
    }];

    var endprocesslistOutlayFormStore = Ext.create('Ext.data.Store', {
        pageSize: '20',
        model: 'Ext4.Com.Model.haveWorkingProcess_Model',
        proxy: {
            extraParams: {},
            type: 'ajax',
            url: 'WorkFlowAction.ered?reqCode=findRunningProcessByAccount',
            reader: {
                type: 'json',
                totalProperty: 'TOTALCOUNT', // 记录总数
                root: 'ROOT' // Json中的列表数据根节点
            }
        }
    });
// 每页显示条数下拉选择框
    var pagesize_combo = Ext.create('Ext.form.field.ComboBox', {
        triggerAction: 'all',
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
// 改变每页显示条数reload数据
    pagesize_combo.on("select", function (comboBox) {
        var tempnumber = parseInt(comboBox.getValue());
        endprocesslistOutlayFormStore.pageSize = tempnumber;
        endprocesslistOutlayFormStore.loadPage(1);

    });
// 分页工具栏
    var bbar = new Ext.PagingToolbar({
        pageSize: '20',
        store: endprocesslistOutlayFormStore,
        displayInfo: true,
        displayMsg: '显示{0}条到{1}条,共{2}条',
        plugins: [Ext.create('Ext.ux.ProgressBarPager')], // 分页进度条
        emptyMsg: "没有符合条件的记录",
        items: ['-', '&nbsp;&nbsp;', pagesize_combo]
    });
    /**
     存放订单号的panel
     */
    var endprocesslistOutlayFormgrid = new Ext.grid.Panel({
        collapsed: false,
        title: '<span class="commoncss">在办列表</span>',
        tbar: tbar,
        viewConfig: {
            // 不产横向生滚动条, 各列自动扩展自动压缩, 适用于列数比较少的情况
            forceFit: true,
            enableTextSelection: true
        },

        border: true,
        hideCollapseTool: true,
        // 表格面板标题,默认为粗体，我不喜欢粗体，这里设置样式将其格式为正常字体
        autoScroll: true,
        frame: true,
        store: endprocesslistOutlayFormStore, // 数据存储
        stripeRows: true, // 斑马线
        cm: endprocesslistOutlayFormCm, // 列模型
        bbar: bbar,
//			sm:endprocesslistOutlayFormsm,
        loadMask: {
            msg: '正在加载表格数据,请稍等...'
        }
    });
// 布局模型
    var viewport = new Ext.Viewport({
        layout: 'fit',
        items: [endprocesslistOutlayFormgrid]
    });

    function showProcessLog(proc_inst_id_, wf_title, business_key_, task_key_) {
        var window = new Ext.window.Window({
            title: wf_title,
            width: 850,
            plain: true
        });
        var theStoreId = '';
        if (wf_title.indexOf("增补") != -1) {
//        Ext.MessageBox.alert("提示","如要查看综合视图，请从工程单主流程查看，谢谢合作。")
            theStoreId = wf_title.replace('工程单：', '').replace('增补单', '');
            getVarToProjectInfoByZaiBan(theStoreId, business_key_, proc_inst_id_, task_key_, window);
        } else {
            theStoreId = wf_title.replace('工程单：', '');
            var t = new makeProcessLogForm(theStoreId, business_key_);
            var panl = new flowPanel({
                proc_inst_id_: proc_inst_id_,
                model: "show",
                processKey: "myProcess",
                businessKey: business_key_
            }, null, null, t);
            var MakedPanel = panl.getMakedPanel();
            MakedPanel.bodyStyle = "overflow-y:auto;overflow-x:hidden;";
            window.add(MakedPanel);
            window.show();
        }
    }

    function showProcessBack(proc_inst_id_, wf_title, business_key_, task_key_) {
        Ext.MessageBox.confirm("友情提示", "您确定需要撤回该流程吗？(撤回到申请环节)", function (id) {
            if (id == 'yes') {
                Ext.Ajax.request({
                    url: 'addSupplyAction.ered?reqCode=backFlow',
                    success: function (response) {
                        Ext.Msg.alert("友情提示", "流程已经退回对应节点");
                    },
                    failure: function () {
                        Ext.Msg.alert('友情提示', '退回失败，请联系IT部');
                    },
                    params: {
                        proc_inst_id_: proc_inst_id_,
                        wf_title: wf_title,
                        business_key_: business_key_,
                        task_key_: task_key_
                    }
                });

            }
        })
    }


    function findData() {
        var key = Ext.getCmp("findKey").getValue();
        endprocesslistOutlayFormStore.reload({
            params: {
                start: 0,
                limit: bbar.pageSize,
                findKey: key
            }
        });
    }

    findData();

    function getVarToProjectInfoByZaiBan(ordernumber, projectid, proc_inst_id_, task_key_, window) {
        Ext.Ajax.request({
            url: 'addSupplyAction.ered?reqCode=getVarToProjectInfo',
            success: function (response) {
                var o = Ext.JSON.decode(response.responseText);
                var comprehensivePanel = new Ext.comprehensivePanel({
                    StoreId: o[0].ordernumber,
                    projectid: o[0].projectid
                });
                var t = new makeProcessLogForm(o[0].ordernumber, o[0].projectid);
                var panl = new flowPanel({
                    proc_inst_id_: proc_inst_id_,
                    model: "show",
                    processKey: "myProcess",
                    businessKey: o[0].projectid
                }, null, null, t);
                var MakedPanel = panl.getMakedPanel();
                MakedPanel.bodyStyle = "overflow-y:auto;overflow-x:hidden;";
                window.add(MakedPanel);
                window.show();
            },
            failure: function () {
                Ext.Msg.alert('提示', '数据保存失败');
            },
            params: {
                ordernumber: ordernumber,
                add_supply_id: projectid
            }
        });
    }
})




