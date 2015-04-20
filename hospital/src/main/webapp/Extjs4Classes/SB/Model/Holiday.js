/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 14-1-18
 * Time: 下午3:37
 * To change this template use File | Settings | File Templates.
 */


/**
 *节假日
 */
Ext.define('Ext4.SB.Model.Holiday', {
    extend: 'Ext.data.Model',
    fields: [{name: 'hol_no'}, {name: 'hol_day'}, {name: 'hol_name'}, {name: 'hol_explain'}, {name: 'hol_islunar'}]
});