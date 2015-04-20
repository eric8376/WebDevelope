/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 14-1-20
 * Time: 下午2:45
 * To change this template use File | Settings | File Templates.
 */
/**
 * 所有平面图信息数据模型
 */
Ext.define('Ext4.Com.Model.AllPlaneinfo_Model', {
    extend: 'Ext.data.Model',
    fields: [
        {
            name: 'describe' // 数据索引:和Store模型对应
        },
        {
            name: 'drawing_id' // 数据索引:和Store模型对应
        },
        {
            name: 'title'
        },
        {
            name: 'cur_choice'
        },
        {
            name: 'designer'
        },
        {
            name: 'usesetmeal'
        },
        {
            name: 'planeverifiertime'
        },
        {
            name: 'planeverifier'
        },    //平面图审核人
        {
            name: 'planequote'
        },  //平面报价
        {
            name: 'localplanequote'
        },
        {
            name: 'projectid'
        },
        {
            name: 'doesover'
        },       //是否超套餐
        {name: 'financeverifier'},//财务审核人
        {name: 'financeverifiertime'},//财务审核时间
        {name: 'choicedate'},//平面图选定时间
        {name: 'financeverifierstatus'}      //财务审核状态
        ,
        {name: 'buget'}
    ]
});