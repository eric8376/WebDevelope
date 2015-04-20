/**
 *<pre></pre>
 *<br>
 *<pre>所属模块：</pre>
 * @author 黄德威
 *创建于  2015/3/18 18:49.
 */
Ext.define('Ext4.HOS.Model.HistoryCheckinfo_Model', {
    extend: 'Ext.data.Model',
    fields: [
        {
            name: 'history_id'
        },
        {
            name: 'operater'
        },
        {
            name: 'operate_time'
        },
        {
            name: 'record_id'
        },
        {
            name: 'operate_type'
        },
        {
            name: 'username'
        }
    ]
});