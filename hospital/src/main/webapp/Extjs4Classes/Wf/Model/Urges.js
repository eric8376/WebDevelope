/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 14-1-18
 * Time: 下午3:37
 * To change this template use File | Settings | File Templates.
 */


Ext.define('Ext4.Wf.Model.Urges', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'mx_no'},
        {name: 'urge_no'},
        {name: 'interval_time'},
        {name: 'activity'},
        {name: 'receive_man'},
        {name: 'tpl_no'},
        {name: 'first_urge_type'},
        {name: 'repeat_urge_count'},
        {name: 'repeat_urge_interval'},
        {name: 'urge_type'}
    ]
});