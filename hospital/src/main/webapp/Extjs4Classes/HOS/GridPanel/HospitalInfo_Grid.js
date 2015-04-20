/**
 *<pre></pre>
 *<br>
 *<pre>所属模块：</pre>
 * @author 黄琦鸿
 *创建于  2014年12月28日18:49:02
 */
Ext.define('Ext4.HOS.GridPanel.HospitalInfo_Grid', {
    extend: 'Ext4.Com.GridPanel.CommonGridPanel',
    autoloaddata: true,
    requires: ['Ext4.HOS.Model.HospitalInfo_Model', 'Ext4.HOS.Panel.HospitalInfo_Panel'],
    initComponent: function () {
        var me = this;
        me.DataStore = Ext.create('Ext.data.Store', {
            autoLoad: me.autoloaddata,
            proxy: {
                extraParams: {},
                type: 'ajax',
                url: 'HospitalManageAction.ered?reqCode=queryHospitalInfo',
                reader: {
                    type: 'json',
                    totalProperty: 'TOTALCOUNT', // 记录总数
                    root: 'ROOT' // Json中的列表数据根节点
                }
            },
            model: 'Ext4.HOS.Model.HospitalInfo_Model'
        });
        me.DataCM = [
            {
                xtype: 'rownumberer',
                text: '序号',
                width: 40
            },
            {
                text: '医院名称', // 列标题
                dataIndex: 'hospital_name', // 数据索引:和Store模型对应
                sortable: true
            },
            {
                text: '地址', // 列标题
                dataIndex: 'address', // 数据索引:和Store模型对应
                sortable: true
            },
            {
                text: '省', // 列标题
                dataIndex: 'province_name', // 数据索引:和Store模型对应
                sortable: true
            },
            {
                text: '市', // 列标题
                dataIndex: 'city_name', // 数据索引:和Store模型对应
                sortable: true
            },
            {
                text: '区', // 列标题
                dataIndex: 'area_name', // 数据索引:和Store模型对应
                sortable: true
            },
            {
                text: '开通年限', // 列标题
                dataIndex: 'end_of_valid', // 数据索引:和Store模型对应
                sortable: true,
                renderer: function (value) {
                    return Ext.isEmpty(value) ? '永久' : value;

                }
            },
            {
                text: '创建时间', // 列标题
                dataIndex: 'create_time', // 数据索引:和Store模型对应
                sortable: true
            }

        ];
        me.createTitle = '<span class="commoncss">添加医院信息</span>';
        me.updateTitle = '<span class="commoncss">修改医院信息</span>';
        me.createUrl = 'HospitalManageAction.ered?reqCode=saveHospitalInfo';
        me.updateUrl = 'HospitalManageAction.ered?reqCode=updateHospitalInfo';
        me.delUrl = 'HospitalManageAction.ered?reqCode=deleteHospitalInfo';
        me.CU_FormPanel_FUN = function (rec) {
            if (Ext.isEmpty(rec)) {
                return new Ext4.HOS.Panel.HospitalInfo_Panel()
            } else {
                return new Ext4.HOS.Panel.HospitalInfo_Panel({isupdate: true})
            }
        };
        me.afterLoadDataMethod = function (rec) {
            me.CU_FormPanel.loadComboboxValue(rec.data);
            me.CU_FormPanel.end_of_valid.setValue(new Date(rec.get('end_of_valid').replace(new RegExp("-", "g"), "/")).getFullYear()
            - new Date(rec.get('create_time').replace(new RegExp("-", "g"), "/")).getFullYear());
        },
            me.getCU_WidthAndHeight = function () {
                return {
                    CU_Window_Width: 550,
                    CU_Window_Height: 300
                }

            };
        //_____________初始化结束_____________
        me.superclass.initComponent.call(this);
    }

});