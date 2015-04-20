/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 14-1-20
 * Time: 下午2:45
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Ext4.Com.Model.Users_Model', {
    extend: 'Ext.data.Model',
    fields: [
        {
            name: 'userid'
        }, {
            name: 'username'
        }, {
            name: 'sex'
        }, {
            name: 'account'
        }, {
            name: 'locked'
        }, {
            name: 'deptid'
        }, {
            name: 'deptname'
        }, {
            name: 'remark'
        }, {
            name: 'usertype'
        }, {
            name: 'empower'
        }
    ]
});