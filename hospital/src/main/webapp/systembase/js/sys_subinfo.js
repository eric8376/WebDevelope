/**
 * 编程环境 IDEA.
 * 编写者: 王少伟
 * 主题:【用户子信息】
 * 时间: 2013-06-10 下午4:36
 */
Ext.onReady(function () {
    /**
     * 类
     * Ext.InfoWin 用户子信息管理总窗口
     */


    //主窗体
    var mainWin;
    //-----------------数据源
    //菜单 数据源
    var store_menus = new Ext.data.ArrayStore({
        data: [["个人信息管理"]],
        fields: ['menu_name']
    });


    //头像更换处理
    //-------------------------------类窗口
    //用户子信息管理总窗口
    Ext.define('Ext.InfoWin', {
        extend: 'Ext.UXWindow1',
        xtype: "window",
        title: "用户信息管理",
        width: 1245,
        height: 588,
        layout: "border",
        initComponent: function () {
            this.items = [
                {
                    xtype: "form",
                    title: "",
                    labelWidth: 100,
                    labelAlign: "left",
                    layout: "border",
                    region: "west",
                    width: 190,
                    split: true,
                    collapsible: true,
                    titleCollapse: true,
                    minWidth: 190,
                    items: [
                        {
                            xtype: "panel",
                            title: "",
                            region: "north",
                            height: 194,
                            width: 197,
                            minWidth: 197,
                            layout: "absolute",
                            items: [
                                {
                                    xtype: "container",
                                    autoEl: "div",
                                    style: 'border:1px solid #ddd;',
                                    x: 30,
                                    y: 10,
                                    width: 130,
                                    height: 130,
                                    html: '<image style=\"width:100%;height:100%;\" title="可以在个人信息管理下方更换头像" id=\"user_head_img\" src=\"' + webContext + '/resource/image/error/404-01.gif\"/>'
                                },
                                {
                                    xtype: "label",
                                    text: "部门：",
                                    x: 30,
                                    y: 150,
                                    style: "font-size:13px;"
                                },
                                {
                                    xtype: "label",
                                    text: "姓名：",
                                    x: 30,
                                    y: 170,
                                    style: "font-size:13px;"
                                },
                                {
                                    xtype: "label",
                                    text: "IT部",
                                    x: 70,
                                    y: 150,
                                    width: 110,
                                    id: 'lab1',
                                    style: "font-size:13px;"
                                },
                                {
                                    xtype: "label",
                                    text: "刘德华",
                                    x: 70,
                                    y: 170,
                                    id: 'lab2',
                                    style: "font-size:13px;"
                                }
                            ]
                        },
                        {
                            xtype: "grid",
                            id: 'menus_grid',

                            title: "应用菜单",
                            region: "center",
                            store: store_menus,
                            viewConfig: {forceFit: true},
                            columns: [
                                {
                                    header: "",//菜单名
                                    style: 'height:0px;',
                                    dataIndex: "menu_name"
                                }
                            ],
                            listeners: {
                                cellclick: this.event_calCellClick,
                                scope: this
                            }
                        }
                    ]
                },
                {
                    xtype: "form",
                    id: 'info_form1',
                    title: "应用菜单-->个人信息管理",
                    labelWidth: 100,
                    padding: 5,
                    labelAlign: "left",
                    layout: "form",
                    defaultType: 'textfield',
                    region: "center",
                    width: 1042,
                    items: [{
                        fieldLabel: '员工工号',
                        name: 'user_id',
                        anchor: '100%',
                        allowBlank: false,
                        readOnly: true
                    }, {
                        fieldLabel: '员工姓名',
                        name: 'user_name',
                        anchor: '100%',
                        readOnly: true
                    }, {
                        fieldLabel: '所在部门',
                        name: 'dept_name',
                        anchor: '100%',
                        readOnly: true
                    },
                        {
                            xtype: 'datefield',
                            fieldLabel: '出生年月',
                            name: 'user_birth',
                            anchor: '100%',
                            editable: false,
                            format: 'Y-m-d'
                        }, {
                            fieldLabel: '内部e-mail',
                            name: 'user_mail_in',
                            anchor: '100%',
                            maxLength: 50,
                            vtype: 'email'
                        }, {
                            fieldLabel: '外部e-mail',
                            name: 'user_mail_out',
                            anchor: '100%',
                            maxLength: 50,
                            vtype: 'email'
                        }, {
                            fieldLabel: '内部RTX账号',
                            name: 'user_rtx_in',
                            anchor: '100%',
                            maxLength: 15
                        }, {
                            fieldLabel: '家庭电话',
                            name: 'user_tel_out',
                            anchor: '100%',
                            maxLength: 15
                        }, {
                            fieldLabel: '手机号码',
                            name: 'user_phone',
                            anchor: '100%',
                            maxLength: 15
                        }, {
                            fieldLabel: '公司座机号',
                            name: 'user_tel_in',
                            anchor: '100%',
                            maxLength: 15
                        }, {
                            fieldLabel: '传真',
                            name: 'user_cz',
                            anchor: '100%',
                            maxLength: 15
                        }, {
                            fieldLabel: '邮编', // 标签
                            name: 'user_post', // name:后台根据此name属性取值
                            anchor: '100%', // 宽度百分比
                            maxLength: 10
                        }, {
                            fieldLabel: '户籍地址',
                            name: 'user_id_address',
                            anchor: '100%',
                            maxLength: 50
                        }, {
                            fieldLabel: '现居住地址',
                            name: 'user_now_address',
                            anchor: '100%',
                            maxLength: 50
                        }, {
                            fieldLabel: '校验码',
                            name: 'user_vcode',
                            anchor: '100%',
                            maxLength: 20
                        }, {
                            hidden: true,
                            name: 'user_head_img',
                            anchor: '100%',
                            value: 'none'
                        }],
                    bbar: [
                        "->",
                        {
                            text: "保存",
                            iconCls: 'acceptIcon',
                            handler: this.submit_Form1,
                            scope: this
                        },
                        {
                            text: "读取",
                            iconCls: 'tbar_synchronizeIcon',
                            handler: this.info_form1_load,
                            scope: this
                        },
                        {
                            text: "更换头像",
                            iconCls: 'tbar_synchronizeIcon',
                            handler: this.changeHeadImg,
                            scope: this
                        }
                    ]
                }
            ]
            this.callParent(arguments);
        },
        //表单1读取
        info_form1_load: function () {
            var form = Ext.getCmp('info_form1').getForm();

            //读取表单
            form.load({
                waitMsg: '正在读取信息',
                waitTitle: '提示',
                url: 'UserSubInfoAction.ered?reqCode=load_pv_form',
                success: function (form_rs, action) {
                    //判断是否需要更换头像
                    var user_head_img = form.findField('user_head_img').getValue();
                    if (user_head_img == "none" || user_head_img == null) {
                        //初始化图片
                        document.getElementById("user_head_img").src = "" + webContext + '/resource/image/error/404-01.gif';
                        //初始化参数
                        form.findField("user_head_img").setValue("none");
                    }

                    Ext.getCmp('lab1').setText(form.findField("dept_name").getValue());
                    Ext.getCmp('lab2').setText(form.findField("user_name").getValue());
                },
                failure: function (form_rs, action) {
                    Ext.Msg.alert('提示', '数据读取失败:' + action.failureType);
                }
            });
        },
        //保存表单1
        submit_Form1: function (btn, e) {
            var form = Ext.getCmp('info_form1').getForm();
            if (!form.isValid())
                return;

            //提交 表单
            form.submit({
                url: 'UserSubInfoAction.ered?reqCode=save_pv_form',
                waitTitle: '提示',
                method: 'POST',
                waitMsg: '正在处理数据,请稍候...',
                success: function (form, action) {
                    Ext.MessageBox.alert('提示', action.result.msg);
                },
                failure: function (form, action) {
                    Ext.MessageBox.alert('提示', '数据保存失败');
                }
            });
        },
        //表格单击事件
        event_calCellClick: function (pGrid, rowIndex, colIndex) {
            if (rowIndex = 0) {
                var loadAct = eval("this.info_form" + (rowIndex + 1) + "_load");
                loadAct();
            }

        },
        //更换 头像
        changeHeadImg: function (btn, e) {
            alert('暂不支持更换头像!');
        }
    });


    //-----------------------实例
    mainWin = new Ext.InfoWin().show();
    mainWin.info_form1_load();
    setTimeout(function () {
        Ext.getCmp('menus_grid').getSelectionModel().selectAll();
    }, 500);


    //new Ext.UXWindow1({bodyStyle:'background:#fff;'}).show();
});