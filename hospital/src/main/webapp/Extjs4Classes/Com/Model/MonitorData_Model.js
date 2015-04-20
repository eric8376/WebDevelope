/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 14-1-20
 * Time: 下午2:45
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Ext4.Com.Model.MonitorData_Model', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'monitorid'
    }, {
        name: 'sqltext'
    }, {
        name: 'starttime'
    }, {
        name: 'costtime'
    }, {
        name: 'effectrows'
    }, {
        name: 'type'
    }
    ]
});