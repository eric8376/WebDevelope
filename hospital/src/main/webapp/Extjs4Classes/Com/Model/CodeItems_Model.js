/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 14-1-20
 * Time: 下午5:30
 * To change this template use File | Settings | File Templates.
 */
/**
 * 字典code
 */
Ext.define('Ext4.Com.Model.CodeItems_Model', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'codeid'
    }, {
        name: 'field'
    }, {
        name: 'fieldname'
    }, {
        name: 'code'
    }, {
        name: 'codedesc'
    }, {
        name: 'enabled'
    }, {
        name: 'editmode'
    }, {
        name: 'remark'
    }]
});