/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 14-1-20
 * Time: 下午2:45
 * To change this template use File | Settings | File Templates.
 */
/**
 *设计件数据模型
 */
Ext.define('Ext4.Com.Model.processDefinitionManage_Model', {
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