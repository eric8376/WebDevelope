/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 14-1-18
 * Time: 下午3:37
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Ext4.SB.Model.Mail_Model', {
    extend: 'Ext.data.Model',
    fields: [{name: 'send_no'}, {name: 'send_user'}, {name: 'send_user_name'}, {name: 'receipts'}, {name: 'receipt_names'}, {name: 'mail_type'},
        {name: 'send_type'}, {name: 'send_date'}, {name: 'mail_no'}, {name: 'subject'}, {name: 'hava_appendix'}]
});