/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 14-1-20
 * Time: 下午2:45
 * To change this template use File | Settings | File Templates.
 */

/**
 * 所有平面图历史和下单图历史信息数据模型
 */
Ext.define('Ext4.Com.Model.PlaneHistory_Model', {
    extend: 'Ext.data.Model',
    fields: [
        {
            name: 'financeverifiertime' // 数据索引:和Store模型对应
        },
        {
            name: 'planeverifiertime' // 数据索引:和Store模型对应
        },
        {
            name: 'drawing_peason_plane' // 数据索引:和Store模型对应
        },
        {
            name: 'planeverifier' // 数据索引:和Store模型对应
        },
        {
            name: 'financeverifier' // 数据索引:和Store模型对应
        },
        {
            name: 'title' // 数据索引:和Store模型对应
        },
        {
            name: 'ordernumber' // 数据索引:和Store模型对应
        },
        {
            name: 'projectid' // 数据索引:和Store模型对应
        },
        {
            name: 'drawing_id' // 数据索引:和Store模型对应
        },
        {
            name: 'planeid' // 数据索引:和Store模型对应
        },
        {
            name: 'describe' // 数据索引:和Store模型对应
        },
        {
            name: 'usesetmeal' // 数据索引:和Store模型对应
        },
        {
            name: 'append_user' // 数据索引:和Store模型对应
        },
        {
            name: 'append_datetime' // 数据索引:和Store模型对应
        }
        ,
        {
            name: 'localplanequote' // 数据索引:和Store模型对应
        }
        ,
        {
            name: 'planequote' // 数据索引:和Store模型对应
        },
        {
            name: 'budget' // 数据索引:和Store模型对应
        },
        {
            name: 'doesover' // 数据索引:和Store模型对应
        },
        {
            name: 'planestatue' // 数据索引:和Store模型对应
        }


    ]
});