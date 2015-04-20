/**
 * 编程环境 IDEA.
 * 编写者: 王少伟
 * 主题:【短信通知查看】
 * 时间: 2013-06-10 下午4:36
 */
Ext.require('Ext4.SB.Model.SendMesHis');
Ext.onReady(function () {
    /**
     * 类声明
     * 短信发送记录窗体 Ext.MessageWin
     *
     */

    //短信查看主窗体
    var MesWin;


    //--------------------------------数据源
    //短信通知记录
    var store_SendMes = Ext.create('Ext.data.Store', {


        model: 'Ext4.SB.Model.SendMesHis',
        proxy: {
            extraParams: {},
            type: 'ajax',
            url: 'SysComunicateAction.ered?reqCode=getSendMesHis',
            reader: {
                type: 'json',
                totalProperty: 'TOTALCOUNT', // 记录总数
                root: 'ROOT' // Json中的列表数据根节点
            }
        }
    });

    //用户信息对照表
    var userInfo = "";
    //加载用户信息对照表
    Ext.Ajax.request({
        url: 'SystemBaseAction.ered?reqCode=getAllUser',
        success: function (response, opts) {
            userInfo = Ext.JSON.decode(response.responseText);
            userInfo.IDsystem = "信息管理系统";
            store_SendMes.load();
        },
        failure: function (response, opts) {
            Ext.MessageBox.alert('提示', '读取用户索引表失败');
        }
    });


    //----------渲染--------------------------------------------
    //短信类型
    var typeArray = ['普通短信', '彩信'];

    function typeRender(v) {
        return typeArray[parseInt(v) - 1];
    }

    //发送类型
    var sendTypeArray = ['系统发送', '用户发送'];

    function sendTypeRender(v) {
        return sendTypeArray[parseInt(v) - 1];
    }

    //发送人转换成名字
    function nameRender(v) {
        return eval("userInfo.ID" + v);
    }

    //返回值解释
    function resFlagRender(v) {
        var str = "";
        if (v == "-12") {
            str = "未知错误";
        } else if (v == "-01") {
            str = "账号余额不足";
        } else if (v == "-02") {
            str = "账号错误！";
        } else if (v == "-03") {
            str = "参数不够或参数内容的类型错误！";
        } else if (v == "-13") {
            str = "文件传输错误";
        } else if (v.length > 5) {
            return "<font color=green>发送成功</font>";
        } else {
            return v;
        }

        return "<font color=red>" + str + "</font>";

    }


    //---------------------------------类声明----------------------------------
    //短信发送记录窗体
    Ext.define('Ext.MessageWin', {
        extend: 'Ext.UXWindow1',
        xtype: "window",
        title: "短信通知查看",
        width: 1050,
        height: 669,
        layout: "fit",
        initComponent: function () {
            this.items = [
                new Ext.UXGrid1({
                    store: store_SendMes,
                    addFlag: false,
                    editFlag: false,
                    delFlag: false,
                    columns: [
                        {
                            header: '发送日期', dataIndex: 'send_time', width: 140, renderer: function (v) {
                            return '<font color=blue>' + v + '</span>';
                        }
                        },
                        {header: '发送方', dataIndex: 'send_peo', width: 77},
                        {header: '接收方', dataIndex: 'receive_peo', width: 60},
                        {header: '发送内容', dataIndex: 'msg_info', width: 600},
                        {header: '是否成功', dataIndex: 'is_success', renderer: COM001Render}
                    ],
                    listeners: {
                        cellclick: this.event_showInfo,
                        scope: this
                    }
                })
            ];
            this.callParent(arguments);
        },
        event_showInfo: function (pGrid, td, colIndex, record, tr, rowIndex, e, eOpts) {
            var form = Ext.getCmp('infoForm').getForm();
            form.loadRecord(record);
            form.findField('rec_user').setValue(record.get('receive_peo'));
            form.findField('message').setValue(record.get('msg_info'));
            infoMenu.showAt(e.getPoint());
        }
    });


    //------------------------------实例
    MesWin = new Ext.MessageWin();
    MesWin.show();

    //显示仿信息菜单
    var infoMenu = new Ext.menu.Menu({
        items: [
            {
                xtype: 'form',
                title: '短信详情',
                frame: true,
                id: 'infoForm',
                width: 159,
                height: 180,
                layout: 'border',
                html: '123',
                items: [
                    {
                        xtype: 'textfield',
                        height: 25,
                        region: 'north',
                        value: '接收人',
                        readOnly: true,
                        name: 'rec_user'
                    },
                    {
                        xtype: 'textarea',
                        region: 'center',
                        value: '文本',
                        readOnly: true,
                        name: 'message'
                    }
                ]
            }
        ]
    });

});