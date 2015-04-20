/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 14-1-20
 * Time: 下午2:45
 * To change this template use File | Settings | File Templates.
 */
/**
 * 存在上次图纸中的定制件
 */
Ext.define('Ext4.Com.Model.CustomizeHistory_Model', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'customize_no'}, {name: 'approval_estimate'}, {name: 'approval_username'}, {name: 'approval_status'}, {name: 'approval_datetime'}, {name: 'description'}
    ]
});