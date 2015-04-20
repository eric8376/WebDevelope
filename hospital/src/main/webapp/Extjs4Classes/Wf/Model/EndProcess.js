/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 14-1-18
 * Time: 下午3:37
 * To change this template use File | Settings | File Templates.
 */


Ext.define('Ext4.Wf.Model.EndProcess', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'id_'
    }, {
        name: 'proc_def_id_'
    }, {
        name: 'wf_title'
    }, {
        name: 'applyuserid'
    }, {
        name: 'start_time_'
    }, {
        name: 'end_time_'
    }, {
        name: 'delete_reason_'
    }, {
        name: 'proc_inst_id_'
    }, {
        name: 'business_key_'
    }]
});