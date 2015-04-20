/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 14-1-18
 * Time: 下午3:37
 * To change this template use File | Settings | File Templates.
 */

/**
 *RTX提醒发送历史
 */
Ext.define('Ext4.SB.Model.RTXNotifyHis', {
    extend: 'Ext.data.Model',
    fields: [{name: 'notify_no'}, {name: 'type'}, {name: 'send_user'}, {name: 'send_date'}, {name: 'rec_users'}, {name: 'receiver'}, {name: 'title'}, {name: 'msg'},
        {name: 'res_flag'}]
});