/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 14-1-18
 * Time: 下午3:37
 * To change this template use File | Settings | File Templates.
 */


/**
 * 历史邮件
 */
Ext.define('Ext4.SB.Model.HisMail_Model', {
    extend: 'Ext.data.Model',
    fields: [{name: 'his_no'}, {name: 'belong_user'}, {name: 's_r_type'}, {name: 's_r_date'},
        {name: 'send_user'}, {name: 'send_user_name'}, {name: 'receipts'}, {name: 'receipt_names'}, {name: 'mail_type'}, {name: 'send_type'},
        {name: 'read_date'}, {name: 'status'}, {name: 'abandon_date'}, {name: 'mail_no'}, {name: 'subject'}, {name: 'hava_appendix'}]
});