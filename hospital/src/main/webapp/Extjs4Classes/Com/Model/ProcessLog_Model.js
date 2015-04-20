/**
 *<pre></pre>
 *<br>
 *<pre>所属模块：</pre>
 * @author 黄德威
 *创建于  2015/3/18 18:49.
 */
Ext.define('Ext4.Com.Model.ProcessLog_Model', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id_'},
        {name: 'task_def_key_'},
        {name: 'suggestion_desc'},
        {name: 'proc_inst_id_'},
        {name: 'name_'},
        {name: 'description_'},
        {name: 'assignee_'},
        {name: 'end_time_'},
        {name: 'username'},
        {name: 'suggestion_theme'}
    ]
});