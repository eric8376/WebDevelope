/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 14-1-20
 * Time: 下午2:45
 * To change this template use File | Settings | File Templates.
 */
/**
 *设计件数据模型
 */
Ext.define('Ext4.Com.Model.EndProcess_Model', {
    extend: 'Ext.data.Model',
    fields: [
        {
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
        }
    ]
});