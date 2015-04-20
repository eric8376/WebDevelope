/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 14-1-18
 * Time: 下午3:37
 * To change this template use File | Settings | File Templates.
 */


/**
 * 收件箱
 */
Ext.define('Ext4.SB.Model.NewMail_Model', {
    extend: 'Ext.data.Model',
    fields: [{name: 'rec_no'}, {name: 'send_user'}, {name: 'send_user_name'}, {name: 'receipts'}, {name: 'receipt_names'}, {name: 'send_type'}, {name: 'mail_type'}, {name: 'rec_date'}, {name: 'read_date'},
        {name: 'mail_no'}, {name: 'status'}, {name: 'subject'}, {name: 'hava_appendix'}]
});