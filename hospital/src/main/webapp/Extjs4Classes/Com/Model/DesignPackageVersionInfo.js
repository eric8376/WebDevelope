/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 14-1-20
 * Time: 下午2:45
 * To change this template use File | Settings | File Templates.
 */
/**
 * 设计件打包版本信息
 */
Ext.define('Ext4.Com.Model.DesignPackageVersionInfo', {
    extend: 'Ext.data.Model',
    fields: [
        {
            name: 'timberversionid' // 数据索引:和Store模型对应
        },
        {
            name: 'version' // 数据索引:和Store模型对应
        },
        {
            name: 'design_no' // 数据索引:和Store模型对应
        },
        {
            name: 'createtime' // 数据索引:和Store模型对应
        },
        {
            name: 'remark' // 数据索引:和Store模型对应
        },
        {
            name: 'creater' // 数据索引:和Store模型对应
        },
        {
            name: 'countofcase' // 数据索引:和Store模型对应
        }
    ]
});