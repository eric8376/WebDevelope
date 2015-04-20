/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 14-1-18
 * Time: 下午3:37
 * To change this template use File | Settings | File Templates.
 */

/**
 *SQL记录表
 */
Ext.define('Ext4.SB.Model.listAll', {
    extend: 'Ext.data.Model',
    fields: [{name: 'sql_no'}, {name: 'ref_no'}, {name: 'name'}, {name: 'explain'}, {name: 'columns'}, {name: 'after_sql'}, {name: 'create_date'}, {name: 'create_user'}, {name: 'last_upd_date'},
        {name: 'last_upd_user'}]
});