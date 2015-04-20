/**
 *<pre></pre>
 *<br>
 *<pre>所属模块：</pre>
 * @author 黄琦鸿
 *创建于  2014/12/28 19:11.
 */
Ext.require('Ext4.HOS.GridPanel.CheckInfo_Grid');
Ext.require('Ext4.HOS.Panel.CheckQuery_Panel');
Ext.onReady(function () {
    var queryPanel = new Ext4.HOS.Panel.CheckQuery_Panel({
        enableQueryBtn: true,
        enableExportBtn: true,
        height: 100,
        ismanager: ismanager == 'true' ? true : false,
        deptId: root_deptid.substr(0, 6),
        deptName: Hospitaltname,
        isHisQuery: true,
        enableResetBtn: true,
        resetFunction: function () {
            queryPanel.getForm().reset()
            var params = queryPanel.getForm().getValues();
            Ext.apply(CheckInfo_Grid.getStore().getProxy().extraParams, params)
            CheckInfo_Grid.getStore().reload()

        },
        excelUrl: 'HospitalManageAction.ered?reqCode=getReport_HIS_DataForExcel',
        queryFunction: function (params) {
            Ext.apply(CheckInfo_Grid.getStore().getProxy().extraParams, params)
            CheckInfo_Grid.getStore().reload()
        },
        listeners: {
            'afterrender': function (com, eOpts) {
                com.operate_type.setValue('OT00101');
                com.operate_type.setReadOnly(true)
            }

        }
    });
    var CheckInfo_Grid = new Ext4.HOS.GridPanel.CheckInfo_Grid({
        region: 'center',
        StoreUrl: 'HospitalManageAction.ered?reqCode=queryHistoryCheckDetailInfo',
//        deptid: root_deptid,
        paging: true,
        canSeeHistory: false,
        justSeeHistory: true,
        extendEndCM: [
            {
                text: '操作类型', // 列标题
                dataIndex: 'operate_type', // 数据索引:和Store模型对应
                sortable: true,
                renderer: OT001Render
            }, {
                text: '操作时间', // 列标题
                dataIndex: 'operate_time', // 数据索引:和Store模型对应
                sortable: true
            }

        ],
        extra_Params: {
            operate_type: 'OT00101'
        }
    })
    // 布局模型
    new Ext.Viewport({
        layout: 'border',
        items: [
            queryPanel, CheckInfo_Grid]
    });

})