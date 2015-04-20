/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 14-1-20
 * Time: 下午2:45
 * To change this template use File | Settings | File Templates.
 */
/**
 * 文件上传
 */
Ext.define('Ext4.Com.Model.FileRecord', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'fileId'
    }, {
        name: 'fileName'
    }, {
        name: 'fileSize'
    }, {
        name: 'fileType'
    }, {
        name: 'fileState'
    }]
});