/**
 *<pre>部门科目维护列表</pre>
 *<br>
 *<pre>所属模块：</pre>
 * @author 黄琦鸿
 *创建于  2014年12月28日18:49:02
 */
Ext.define('Ext4.HOS.GridPanel.CourseInfo_Grid', {
    extend: 'Ext4.Com.GridPanel.CommonGridPanel',
    autoloaddata: true,
    requires: ['Ext4.HOS.Model.CourseInfo_Model', 'Ext4.HOS.Panel.CourseInfo_Panel'],
    CU_FormPanel_FUN: function (rec) {
        if (Ext.isEmpty(rec)) {
            return new Ext4.HOS.Panel.CourseInfo_Panel()
        } else {
            return new Ext4.HOS.Panel.CourseInfo_Panel({
                ex_course_id: rec[0].get('course_id')
            })
        }

    },
    StoreUrl: 'HospitalManageAction.ered?reqCode=queryCourseInfo',
    createUrl: 'HospitalManageAction.ered?reqCode=saveCourseInfo',
    updateUrl: 'HospitalManageAction.ered?reqCode=updateCourseInfo',
    delUrl: 'HospitalManageAction.ered?reqCode=deleteCourseInfo',
    getCU_WidthAndHeight: function () {
        return {
            CU_Window_Width: 400,
            CU_Window_Height: 200
        }

    },
    initComponent: function () {
        var me = this;
        me.DataStore = Ext.create('Ext.data.Store', {
            autoLoad: me.autoloaddata,
            proxy: {
                type: 'ajax',
                url: me.StoreUrl,
                reader: {
                    type: 'json',
                    totalProperty: 'TOTALCOUNT', // 记录总数
                    root: 'ROOT' // Json中的列表数据根节点
                }
            },
            model: 'Ext4.HOS.Model.CourseInfo_Model'
        });
        me.DataCM = [
            {
                xtype: 'rownumberer',
                text: '序号',
                width: 40
            },
            {
                text: '科目名称', // 列标题
                dataIndex: 'course_name', // 数据索引:和Store模型对应
                sortable: true
            },
            {
                text: '创建者', // 列标题
                dataIndex: 'username', // 数据索引:和Store模型对应
                sortable: true
            },
            {
                text: '创建时间', // 列标题
                dataIndex: 'create_time', // 数据索引:和Store模型对应
                sortable: true
            },
            {
                text: '备注', // 列标题
                dataIndex: 'remark', // 数据索引:和Store模型对应
                sortable: true
            }
        ];
        me.createTitle = '<span class="commoncss">添加科目信息</span>';
        me.updateTitle = '<span class="commoncss">修改科目信息</span>';

//        me.beforeUpdateMethods = [function (rec, back) {
//
//        }],
        //_____________初始化结束_____________
        me.superclass.initComponent.call(this);
    }

});