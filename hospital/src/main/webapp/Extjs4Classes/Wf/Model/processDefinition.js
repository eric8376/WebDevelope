/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 14-1-18
 * Time: 下午3:37
 * To change this template use File | Settings | File Templates.
 */


Ext.define('Ext4.Wf.Model.processDefinition', {
    extend: 'Ext.data.Model',
    fields: [
        {
            name: 'id' // 数据索引:和Store模型对应
        },
        {
            name: 'deploymentid' // 数据索引:和Store模型对应
        },
        {
            name: 'name'
        },
        {
            name: 'key'
        },
        {
            name: 'version'
        },
        {
            name: 'resourceName'
        },
        {
            name: 'diagramResourceName'
        },
        {
            name: 'deploymentTime'
        },
        {
            name: 'isSuspended'
        }
    ]
});