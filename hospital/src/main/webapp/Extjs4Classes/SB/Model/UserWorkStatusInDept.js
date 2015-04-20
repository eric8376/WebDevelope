/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 14-1-18
 * Time: 下午3:37
 * To change this template use File | Settings | File Templates.
 */



Ext.define('Ext4.SB.Model.UserWorkStatusInDept', {
    extend: 'Ext.data.Model',
    fields: ['id_', 'proc_inst_id_', 'proc_def_id_', 'name_', 'create_time_', 'userid', 'username', 'deptid', 'account', {
        name: 'is_same',
        defaultValue: false
    }, 'ordernumber']
});