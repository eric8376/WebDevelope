/**
 *<pre></pre>
 *<br>
 *<pre>所属模块：</pre>
 * @author 黄琦鸿
 *创建于  2014/12/28 19:11.
 */
Ext.require('Ext4.HOS.GridPanel.HospitalInfo_Grid');
Ext.require('Ext4.HOS.GridPanel.CourseInfo_Grid');
Ext.onReady(function () {
    var grid = new Ext4.HOS.GridPanel.HospitalInfo_Grid({
        createFlag: true,
        delFlag: true,
        updateFlag: true,
        border: false,
        paging: true,
        /* extendEndCM: [
         {
         xtype: 'actioncolumn',
         text: '科目维护',
         align: "center",
         menuDisabled: true,
         items: [
         {
         iconCls: 'zoomIcon',
         tooltip: '科目维护',
         handler: function (thisview, rowIndex, colIndex, item, e, record, row) {
         var root = {
         text: record.get('deptname'),
         expanded: true,
         id: record.get('deptid')
         };

         var CourseInfo_Grid = new Ext4.HOS.GridPanel.CourseInfo_Grid({
         createFlag: true,
         delFlag: true,
         StoreUrl:'HospitalManageAction.ered?reqCode=queryDeptCourseInfo',
         delUrl: 'HospitalManageAction.ered?reqCode=deleteDeptCourseInfo',
         hideSaveBtn:true,
         paging: true,
         createText:'新增科目',
         delText:'删除科目',
         CU_FormPanel_FUN: function () {
         var sel_node=deptTree.getSelectionModel().getSelection();
         if(Ext.isEmpty(sel_node))
         {
         Ext.Msg.show({
         title: '提示',
         msg:'请选择医院',
         buttons: Ext.Msg.OK,
         icon: Ext.MessageBox.WARNING
         });
         return;
         }
         var temp=    new Ext4.HOS.GridPanel.CourseInfo_Grid({
         forChoice:true,  paging: true,
         canMultiChoice: true,
         showSelModel: true,
         backFunctionForChoice: function (rec) {
         var params=  getgriddata('choices',temp)
         params.deptid=sel_node[0].data.id;
         Ext.Ajax.request({
         url: './HospitalManageAction.ered?reqCode=saveDeptCourseInfo',
         waitTitle: '提示',
         method: 'POST',
         waitMsg: '正在处理数据,请稍候...',
         params:params,
         success: function (response) {
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
         Ext.Msg.show({
         title: '提示',
         msg: "数据提交成功",
         buttons: Ext.Msg.OK,
         icon: Ext.MessageBox.WARNING
         })
         CourseInfo_Grid.getStore().reload();
         CourseInfo_Grid.CU_window.close()
         }
         },
         failure:function(){
         Ext.Msg.show({
         title: '提示',
         msg:'添加失败',
         buttons: Ext.Msg.OK,
         icon: Ext.MessageBox.WARNING
         });
         CourseInfo_Grid.getStore().reload();
         }
         });
         },
         extra_Params: {
         cur_deptid: sel_node[0].data.id
         }
         })
         //返回选择科目的面板
         return temp;
         },
         beforeCreateMethod: function (rec, back) {
         var sel_node=deptTree.getSelectionModel().getSelection();
         if(Ext.isEmpty(sel_node))
         {
         Ext.Msg.show({
         title: '提示',
         msg: '请选择左边部门',
         buttons: Ext.Msg.OK,
         icon: Ext.MessageBox.WARNING
         });
         back(false);

         }else
         {
         back(true);
         }

         },
         extra_Params: {
         justShowSelf: true,
         cur_deptid: record.get('deptid')
         }
         })
         var deptTree = new Ext.tree.Panel({
         store: new Ext.data.TreeStore({
         preloadChildren: true,
         root: root,
         proxy: {
         type: 'ajax', url: './organization.ered?reqCode=departmentTreeManage'}
         }),
         autoScroll: false,
         animate: false,
         useArrows: false,
         border: false
         });
         deptTree.getSelectionModel().select(root);
         deptTree.on('cellclick', function (treeview, htmltext, index, node) {
         var deptid = node.data.id;
         var store = CourseInfo_Grid.getStore();
         store.proxy.extraParams.cur_deptid = deptid;
         store.loadPage(1);
         });
         new Ext.window.Window({
         layout: 'border',
         modal: true,
         closeAction: 'destroy',
         maximized: true,
         title: '部门科目维护',
         items: [
         {
         title: '<span class="commoncss">组织机构</span>',
         iconCls: 'chart_organisationIcon',
         tools: [
         {
         id: 'refresh',
         handler: function () {
         var treestore = deptTree.getStore();
         var node = treestore.getNodeById(root.id);
         if (Ext.isEmpty(node)) {
         treestore.reload();
         return;
         }
         if (node.data.leaf) {
         treestore.load({node: node.parentNode});
         } else {
         treestore.load({node: node});
         }
         }
         }
         ],
         collapsible: true,
         width: 210,
         minSize: 160,
         maxSize: 280,
         split: true,
         region: 'west',
         autoScroll: true,
         items: [ deptTree ]
         },
         {
         region: 'center',
         layout: 'fit',
         border: false,
         items: [ CourseInfo_Grid ]
         }
         ]

         }).show()
         }
         }
         ]
         }
         ],*/
        // width:600,
        autoScroll: true,
        title: '<span class="commoncss">医院信息列表</span>'
    })

    // 布局模型
    new Ext.Viewport({
        layout: 'fit',
        items: [grid]
    });

})