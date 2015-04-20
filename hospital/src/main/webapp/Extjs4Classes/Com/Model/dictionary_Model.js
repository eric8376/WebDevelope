/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 14-1-20
 * Time: 下午2:45
 * To change this template use File | Settings | File Templates.
 */

/**
 *字典数据模型
 */
Ext.define('Ext4.Com.Model.dictionary_Model', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'text'},
        {name: 'value'},
        {name: 'codeid'}
    ]
});