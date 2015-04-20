/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 14-1-20
 * Time: 下午2:45
 * To change this template use File | Settings | File Templates.
 */
/**
 * 施工图
 */
Ext.define('Ext4.Com.Model.SgtPic_Model', {
    extend: 'Ext.data.Model',
    fields: [
        {
            name: 'file_name'
        },
        {
            name: 'username'
        },
        {
            name: 'examinepeo'
        },
        {
            name: 'upload_date'
        },
        {
            name: 'buildid'
        }
    ]
});