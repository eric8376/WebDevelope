/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 14-1-18
 * Time: 下午3:37
 * To change this template use File | Settings | File Templates.
 */


/**
 *用户工作代理
 */
Ext.define('Ext4.SB.Model.jobProxy', {
    extend: 'Ext.data.Model',
    fields: [
        {
            name: 'job_proxy_id'
        },
        {
            name: 'user_bproxyername'
        },
        {
            name: 'user_proxyername'
        },
        {
            name: 'job_proxy_state'
        },
        {
            name: 'job_proxy_starttime'
        },
        {
            name: 'job_proxy_endtime'
        }
    ]
});