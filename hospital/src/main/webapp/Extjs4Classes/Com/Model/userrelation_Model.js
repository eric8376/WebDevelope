/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 14-1-20
 * Time: 下午2:45
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Ext4.Com.Model.userrelation_Model', {
    extend: 'Ext.data.Model',
    fields: [
        {
            name: 'relation_id'
        }, {
            name: 'user_id'
        },

        {
            name: 'p_user_id'
        }, {
            name: 'p_username'
        }, {
            name: 'username'
        }
    ]
});