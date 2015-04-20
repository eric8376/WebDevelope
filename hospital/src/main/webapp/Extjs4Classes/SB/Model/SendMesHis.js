/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 14-1-18
 * Time: 下午3:37
 * To change this template use File | Settings | File Templates.
 */

/**
 *短信发送历史
 */
Ext.define('Ext4.SB.Model.SendMesHis', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'record_id'},
        {name: 'msg_info'},
        {name: 'is_success'},
        {name: 'send_time'},
        {name: 'send_peo'},
        {name: 'receive_peo'},
        {name: 'is_success'}
    ]
});