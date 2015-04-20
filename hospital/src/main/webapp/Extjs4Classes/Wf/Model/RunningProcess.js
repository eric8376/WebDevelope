/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 14-1-18
 * Time: 下午3:37
 * To change this template use File | Settings | File Templates.
 */


Ext.define('Ext4.Wf.Model.RunningProcess', {
    extend: 'Ext.data.Model',
    fields: [
        {
            name: 'id_'
        },
        {
            name: 'taskid'
        },
        {
            name: 'proc_inst_id_'
        },
        {
            name: 'wf_title'
        },
        {
            name: 'proc_def_id_'
        },
        {
            name: 'name_'
        },
        {
            name: 'suspension_state_'
        },
        {
            name: 'applyuserid'
        },
        {
            name: 'curassignee'
        }
    ]
});