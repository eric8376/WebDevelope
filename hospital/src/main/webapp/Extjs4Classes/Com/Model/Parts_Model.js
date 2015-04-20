/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 14-1-20
 * Time: 下午2:45
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Ext4.Com.Model.Parts_Model', {
    extend: 'Ext.data.Model',
    fields: [
        {
            name: 'partid'
        }, {
            name: 'menuid'
        }, {
            name: 'menuname'
        }, {
            name: 'cmpid'
        }, {
            name: 'cmptype'
        }, {
            name: 'remark'
        }, {
            name: 'partauthtype'
        }, {
            name: 'authorizeid'
        }, {
            name: 'roleid'
        }, {
            name: 'userid'
        }, {
            name: 'dirtytype'
        }
    ]
});