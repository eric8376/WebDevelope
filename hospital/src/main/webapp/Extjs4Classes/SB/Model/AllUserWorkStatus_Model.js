/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 14-1-18
 * Time: 下午3:37
 * To change this template use File | Settings | File Templates.
 */


/**
 *用户工作状态表
 */
Ext.define('Ext4.SB.Model.AllUserWorkStatus_Model', {
    extend: 'Ext.data.Model',
    fields: [{name: 'mgr_no'}, {name: 'task_id'}, {name: 'key'}, {name: 'flow_no'}, {name: 'point_no'}, {name: 'job_name'},
        {name: 'assignee'}, {name: 'status'}, {name: 'is_finish'}, {name: 'job_level'}, {name: 'last_resume_date'}, {name: 'username'}, {name: 'ordernumber'}]
});