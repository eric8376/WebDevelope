/**
 *<pre>CourseInfo_Panel</pre>
 *<br>
 *<pre>所属模块：</pre>
 * @author 黄琦鸿
 *创建于  2014/12/28 18:51.
 */
Ext.define('Ext4.HOS.Panel.CourseInfo_Panel', {
    extend: 'Ext.form.Panel',
    border: false,
    layout: 'form',
    requires: ['Ext4.Com.Model.ValueText_Model'],
    bodyStyle: 'padding:5 5 5 5 ',
    ex_course_id: '',
    defaults: {labelAlign: 'right', labelWidth: 70},
    isReadOnly: false,//只能查看明细时用
    initComponent: function () {
        var me = this;
        var readonlystyle = '';
        if (me.isReadOnly) {
            readonlystyle = 'background:none;border:none;';
        }
        me.items = [
            {
                xtype: 'textfield',
                maxLengthText: '科目名称过长',
                fieldLabel: '科目名称',
                anchor: '99%',
                tabIndex: 1,
                fieldStyle: readonlystyle,
                readOnly: me.isReadOnly,
                allowBlank: false,
                name: 'course_name',
                maxLength: 20
            },
            {
                xtype: 'textarea', maxLengthText: '科目备注过长', fieldLabel: '备注', anchor: '99%', tabIndex: 1,
                fieldStyle: readonlystyle, readOnly: me.isReadOnly, name: 'remark', maxLength: 20
            }
        ]
        //_____________初始化结束_____________
        me.callParent(arguments);
    }
})
