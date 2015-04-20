/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 14-1-18
 * Time: 下午3:37
 * To change this template use File | Settings | File Templates.
 */


Ext.define('Ext4.Wf.Model.TaskTimeStatisticsEveryOne', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'name' // Json中的属性Key值
    }, {
        name: 'point'
    }, {
        name: 'time'
    }]
});