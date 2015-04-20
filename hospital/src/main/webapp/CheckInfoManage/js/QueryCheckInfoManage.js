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
        deptId: root_deptid.substr(0, 6),
        enableCheckType:false,
        deptName: Hospitaltname,
        height: 80,
        enableResetBtn: true,
        resetFunction: function () {
            queryPanel.getForm().reset()
            var gridpanel=   check_tab_panel.getActiveTab();
            Ext.apply(gridpanel.getStore().getProxy().extraParams, queryPanel.getForm().getValues())
            gridpanel.getStore().reload()
        },
        queryFunction: function (params) {
         var gridpanel=   check_tab_panel.getActiveTab();
            Ext.apply(gridpanel.getStore().getProxy().extraParams, params)
            gridpanel.getStore().reload()
        },
        justExportExcelFun:function(values){
            values.check_type = check_tab_panel.getActiveTab().check_type;
            exportExcelByAjax('HospitalManageAction.ered?reqCode=getQueryGridData2Excel', values);
        }
    });
    //正确性检查
    var zqx_CheckInfo_Grid = new Ext4.HOS.GridPanel.CheckInfo_Grid({
        flex: 1,
        check_type: 'CT00101',
        deptId: root_deptid.substr(0, 6),
        deptName: Hospitaltname,
        title: '正确性检查',
        region: 'center',
        verify_statu: 'VS00101',
//        deptid: root_deptid,
//        delFlag: ismanager == 'true' ? true : false,
        updateFlag: ismanager == 'true' ? true : false,
        paging: true,
        extra_Params: {}
    })

    //依从性检查
    var ycx_CheckInfo_Grid = new Ext4.HOS.GridPanel.CheckInfo_Grid({
        autoloaddata: false,
        flex: 1,
        check_type: 'CT00103',
        deptId: root_deptid.substr(0, 6),
        deptName: Hospitaltname,
        title: '依从性检查',
        region: 'center',
        verify_statu: 'VS00101',
//        deptid: root_deptid,
//        delFlag: ismanager == 'true' ? true : false,
        updateFlag: ismanager == 'true' ? true : false,
        paging: true,
        extra_Params: {}
    })
    //知识考核检查
    var zskh_CheckInfo_Grid = new Ext4.HOS.GridPanel.CheckInfo_Grid({
        flex: 1,
        title: '知识点考核',
        autoloaddata: false,
        deptId: root_deptid.substr(0, 6),
        deptName: Hospitaltname,
        verify_statu: 'VS00101',
        check_type: 'CT00102',
        region: 'center',
        //delFlag: ismanager == 'true' ? true : false,
        updateFlag: ismanager == 'true' ? true : false,
        paging: true,
        extra_Params: {}
    })
    var check_tab_panel = Ext.create('Ext.tab.Panel', {
        region: 'center',
        items: [
            ycx_CheckInfo_Grid, zqx_CheckInfo_Grid, zskh_CheckInfo_Grid
        ],
        layout: 'fit',
        listeners: {
            'tabchange': function (tabPanel, newCard, oldCard, eOpts) {
                Ext.apply(newCard.getStore().getProxy().extraParams, queryPanel.getForm().getValues())
                newCard.getStore().reload()
            }

        }

    });

    // 布局模型
    new Ext.Viewport({
        layout: 'border',
        items: [
            queryPanel, check_tab_panel]
    });

})