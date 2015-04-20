/**
 * 编程环境 IDEA.
 * 编写者: 王少伟
 * 主题:【RTX通知查看】
 * 时间: 2013-06-10 下午4:36
 */
Ext.require('Ext4.SB.Model.RTXNotifyHis');
Ext.onReady(function () {
    /**
     * 类声明
     * RTX发送记录窗体 Ext.RTXMesWin
     *
     */

    //RTX查看主窗体
    var RTXWin;


    //--------------------------------数据源
    //RTX通知记录
    var store_SendRTX = Ext.create('Ext.data.Store', {
        model: 'Ext4.SB.Model.RTXNotifyHis',
        autoLoad: false,
        proxy: {
            extraParams: {},
            type: 'ajax',
            url: 'SysComunicateAction.ered?reqCode=getRTXNotifyHis',
            reader: {
                type: 'json',
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
            store_SendRTX.load();
        },
        failure: function (response, opts) {
            Ext.MessageBox.alert('提示', '读取用户索引表失败');
        }
    });


    //----------渲染--------------------------------------------
    //发送类型
    var typeArray = ['系统发送', '用户发送'];

    function typeRender(v) {
        return typeArray[parseInt(v) - 1];
    }

    //发送人转换成名字
    function nameRender(v) {
        return eval("userInfo.ID" + v);
    }

    //返回值解释
    function resFlagRender(v) {
        var str = "";
        if (v == "-2") {
            str = "发送异常";
        } else if (v == "-1") {
            str = "IP受限";
        } else if (v == "0") {
            str = "未知错误！";
        } else if (v == "1") {
            return "<font color=green>发送成功</font>";
        } else {
            return v;
        }

        return "<font color=red>" + str + "</font>";

    }

    //---------------------------------类声明
    //RTX发送记录窗体
    Ext.define('Ext.RTXMesWin', {
        extend: 'Ext.UXWindow1',
        xtype: "window",
        title: "RTX通知查看",
        width: 1050,
        height: 669,
        layout: "fit",
        initComponent: function () {
            this.items = [
                new Ext.UXGrid1({
                    store: store_SendRTX,
                    addFlag: false,
                    editFlag: false,
                    delFlag: false,
                    columns: [
                        {header: '通知编号', dataIndex: 'notify_no', hidden: true},
                        {header: '类型', dataIndex: 'type', renderer: typeRender, hidden: true},
                        {header: '发送方', dataIndex: 'send_user', renderer: nameRender, hidden: true},
                        {
                            header: '发送日期', width: 140, dataIndex: 'send_date', renderer: function (v) {
                            return '<font color=blue>' + v + '</span>';
                        }
                        },
                        {header: '接收方', width: 60, dataIndex: 'rec_users', renderer: nameRender},
                        {header: '接收RTX账号', dataIndex: 'receiver'},
                        {header: '通知标题', dataIndex: 'title'},
                        {header: '通知内容', width: 800, dataIndex: 'msg'},
                        {header: '返回标志', dataIndex: 'res_flag', renderer: resFlagRender}
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
            form.findField('rec_user').setValue(record.get("title"));
            form.findField('message').setValue(record.get('msg'));
            infoMenu.showAt(e.getPoint());
        }
    });


    //------------------------------实例
    RTXWin = new Ext.RTXMesWin();
    RTXWin.show();

    //显示仿信息菜单
    var infoMenu = new Ext.menu.Menu({
        items: [
            {
                xtype: 'form',
                title: '通知详情',
                frame: true,
                id: 'infoForm',
                width: 353,
                height: 201,
                layout: 'border',
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