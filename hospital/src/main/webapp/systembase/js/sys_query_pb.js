/**
 * 编程环境 IDEA.
 * 编写者: 王少伟
 * 主题:【排班情况查询】
 * 时间: 2013-06-10 下午4:36
 */
Ext.require('Ext4.SB.Model.PbInfo');
Ext.onReady(function () {
    /*类窗体
     * Ext.queryPb 排班生成与查询窗体
     * Ext.pbCreate 生成排班窗体
     *
     */


    //------------------------数据源------------------------
    //本日
    var date1 = new Date();
    date1 = date1.format('Y-m-d');
    //三天后
    var date2 = new Date();
    date2.setDate(date2.getDate() + 3);
    date2 = date2.format('Y-m-d');
    //grid 排班管理
    var store_pb = Ext.create('Ext.data.Store', {
        model: 'Ext4.SB.Model.PbInfo',
        proxy: {
            extraParams: {
                start: 0, limit: 20, search_key: '%', minDate: date1, maxDate: date2, users: '', depts: '', enabled: '1'
            },
            type: 'ajax',
            url: 'SysPbAction.ered?reqCode=queryPbInfo',
            reader: {
                type: 'json',
                totalProperty: 'TOTALCOUNT', // 记录总数
                root: 'ROOT' // Json中的列表数据根节点
            }
        }
    });
    //生成管理年份数据源
    var yearNow = new Date().getFullYear();
    var monthNow = new Date().getMonth() + 1;
    var store_year = [yearNow, yearNow + 1, yearNow + 2, yearNow + 3, yearNow + 4];
    var store_month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    //上班属性
    var workArray = ['上班日', '休息日', '节假日', '工作&节假日'];


    //------------------------窗体定义------------------------
    //排班生成与查询
    Ext.define('Ext.pbWin', {
        extend: 'Ext.UXWindow1',
        xtype: "window",
        title: "排班生成与查询",
        width: 1106,
        height: 691,
        layout: "border",
        operWin: '操作窗体',
        closable: false,
        constrain: true,
        maximizable: true,
        collapsible: true,

        initComponent: function () {
            this.tbar = [
                {
                    text: "生成管理",
                    iconCls: 'addIcon',
                    handler: this.event_create,
                    scope: this
                }
            ];

            this.items = [
                {
                    xtype: "form",
                    id: 'query_form',
                    title: "筛选框",
                    labelWidth: 100,
                    labelAlign: "left",
                    layout: "form",
                    region: "north",
                    height: 170,
                    collapsible: true,
                    collapsed: false,
                    titleCollapse: true,
                    split: true,
                    items: [
                        {
                            xtype: "datefield",
                            triggerAction: "all",
                            fieldLabel: "起始时间",
                            format: 'Y-m-d',
                            anchor: "100%",
                            editable: false,
                            name: 'minDate',
                            value: date1
                        },
                        {
                            xtype: "datefield",
                            triggerAction: "all",
                            fieldLabel: "结束时间",
                            format: 'Y-m-d',
                            anchor: "100%",
                            editable: false,
                            name: 'maxDate',
                            value: date2
                        },
                        {
                            xtype: "textfield",
                            fieldLabel: "关键字",
                            anchor: "100%",
                            name: 'searchKey',
                            emptyText: '输入关键字模糊查找...'
                        },
                        {
                            xtype: "container",
                            autoEl: "div",
                            height: 26,
                            layout: "table",
                            items: [
                                {
                                    xtype: "checkbox",
                                    fieldLabel: "标签",
                                    boxLabel: "<span style='font-size:12px;'>在职人员</span>",
                                    name: 'ck1',
                                    checked: true
                                },
                                {
                                    xtype: "checkbox",
                                    fieldLabel: "标签",
                                    boxLabel: "<span style='font-size:12px;'>离职人员</span>",
                                    name: 'ck2'
                                }
                            ]
                        },
                        {
                            xtype: "button",
                            iconCls: 'acceptIcon',
                            text: "开始筛选",
                            handler: this.event_query,
                            scope: this
                        }
                    ]
                },
                {
                    xtype: "treepanel",
                    id: 'treeDept',
                    title: "部门树",
                    region: "west",
                    width: 178,
                    split: true,
                    dataUrl: 'SysPbAction.ered?reqCode=queryDeptTreeWithUser2',
                    root: new Ext.tree.AsyncTreeNode({id: 'root', expanded: true}),
                    rootVisible: false
                },
                {
                    xtype: "grid",
                    title: "排班具体情况",
                    region: "center",
                    split: true,
                    store: store_pb,
                    columns: [
                        {
                            header: "人员编号",
                            sortable: true,
                            resizable: true,
                            dataIndex: "emp_no",
                            width: 100
                        },
                        {
                            header: "人员姓名",
                            sortable: true,
                            resizable: true,
                            dataIndex: "username",
                            width: 100
                        },
                        {
                            header: "所属部门",
                            sortable: true,
                            resizable: true,
                            dataIndex: "deptid",
                            width: 100
                        },
                        {
                            header: "部门名称",
                            sortable: true,
                            resizable: true,
                            dataIndex: "deptname",
                            width: 100
                        },
                        {
                            header: "日期",
                            sortable: true,
                            resizable: true,
                            dataIndex: "info_date",
                            width: 100
                        },
                        {
                            header: "上班时间",
                            sortable: true,
                            resizable: true,
                            dataIndex: "begin_work_time",
                            width: 100
                        },
                        {
                            header: "下班时间",
                            sortable: true,
                            resizable: true,
                            dataIndex: "end_work_time",
                            width: 100
                        },
                        {
                            header: "午休开始时间",
                            sortable: true,
                            resizable: true,
                            dataIndex: "begin_wuxiu_time",
                            width: 100
                        },
                        {
                            header: "午休结束时间",
                            sortable: true,
                            resizable: true,
                            dataIndex: "end_wuxiu_time",
                            width: 100
                        },
                        {
                            header: "上班属性",
                            sortable: true,
                            resizable: true,
                            dataIndex: "date_type",
                            width: 100,
                            renderer: function (v) {
                                return workArray[v - 1];
                            }
                        },
                        {
                            header: "有薪日",
                            sortable: true,
                            resizable: true,
                            dataIndex: "is_pay",
                            width: 100,
                            renderer: function (v) {
                                return v == 1 ? '是' : '';
                            }
                        },
                        {
                            hidden: true,
                            header: "操作人",
                            sortable: true,
                            resizable: true,
                            dataIndex: "data3",
                            width: 100
                        },
                        {
                            hidden: true,
                            header: "排班产生类型",
                            sortable: true,
                            resizable: true,
                            dataIndex: "data3",
                            width: 100
                        },
                        {
                            hidden: true,
                            header: "查看类型明细",
                            sortable: true,
                            resizable: true,
                            dataIndex: "data3",
                            width: 100
                        }
                    ],
                    viewConfig: {forceFit: true},
                    loadMask: {msg: '正在载入数据,请稍等...'},
                    bbar: new Ext.PagingToolbar({displayInfo: true, pageSize: 20, store: store_pb})
                }
            ];
            this.callParent(arguments);

            this.operWin = new Ext.pbCreate();
        },
        //生成管理
        event_create: function (btn, event) {
            this.operWin.show();
        },
        //开始筛选
        event_query: function (btn, e) {
            var form = Ext.getCmp('query_form').getForm();
            if (!form.isValid())
                return;
            var minDate = new Date(form.findField('minDate').getValue()).format('Y-m-d');
            var maxDate = new Date(form.findField('maxDate').getValue()).format('Y-m-d');
            var searchKey = form.findField('searchKey').getValue();
            var ck1 = form.findField('ck1').getValue();
            var ck2 = form.findField('ck2').getValue();
            var enabled = (ck1 ? "1" : "") + (ck1 && ck2 ? "," : "") + (ck2 ? "0" : "");
            var treePanel = Ext.getCmp('treeDept');
            var checkedNodes = treePanel.getChecked();
            var depts = "";//部门数
            var users = "";//用户数
            Ext.each(checkedNodes, function (n) {
                if (n.id.length == 8) {
                    users += n.id + ",";
                } else {
                    depts += n.id + ",";
                }
            });
            if (users == "" && depts == "") {
                //Ext.Msg.alert('提示','当前搜索范围为全部职员，如需要特殊搜索请在左边部门树选择需要查询的对象范围!');
                //return;
            }
            if (users != "") {
                users = users.substr(0, users.length - 1);
            }
            if (depts != "") {
                depts = depts.substr(0, depts.length - 1);
            }

            store_pb.getProxy().extraParams.minDate = minDate;
            store_pb.getProxy().extraParams.maxDate = maxDate;
            store_pb.getProxy().extraParams.searchKey = searchKey;
            store_pb.getProxy().extraParams.users = users;
            store_pb.getProxy().extraParams.depts = depts;
            store_pb.getProxy().extraParams.enabled = enabled;
            //筛选
            store_pb.load();
        }
    });
    //生成排班窗体
    Ext.define('Ext.pbCreate', {
        extend: 'Ext.UXWindow2',
        xtype: "window",
        title: "排班生成",
        width: 693,
        height: 483,
        layout: "fit",
        timeout: 600000,
        constrain: true,
        maximizable: true,
        collapsible: true,
        closeAction: 'hide',
        modal: true,
        //日志信息
        log_depts: '',//所有部门日历信息
        depts_index: 0,//当前到达第几个部门信息
        //log_calendars:'',//部门日历
        log_emps: [[1], [2]],//部门下人员

        initComponent: function () {
            this.items = [
                {
                    id: 'create_form',
                    xtype: "form",
                    title: "",
                    labelWidth: 100,
                    labelAlign: "left",
                    layout: "fit",
                    tbar: [
                        {
                            xtype: "label",
                            text: "年份："
                        },
                        {
                            xtype: "combo",
                            triggerAction: "all",
                            fieldLabel: "标签",
                            width: 56,
                            editable: false,
                            store: store_year,
                            id: 'combo_year',
                            value: yearNow
                        },
                        {
                            xtype: "label",
                            text: "月份："
                        },
                        {
                            xtype: "combo",
                            triggerAction: "all",
                            fieldLabel: "标签",
                            width: 43,
                            editable: false,
                            store: store_month,
                            id: 'combo_month',
                            value: monthNow
                        },
                        {
                            xtype: "checkbox",
                            fieldLabel: "",
                            boxLabel: "重新生成？",
                            id: 'isRecreate',
                            checked: true
                        },
                        {
                            xtype: 'button',
                            id: 'createBtn',
                            text: "开始生成",
                            iconCls: 'acceptIcon',
                            handler: this.event_beginCreate,
                            scope: this
                        }, '-',
                        {
                            xtype: 'button',
                            text: "清空日志",
                            iconCls: 'deleteIcon',
                            handler: this.event_clearLog,
                            scope: this
                        }
                    ],
                    items: [
                        {
                            xtype: "textarea",
                            //disabled:true,
                            id: 'log_text',
                            fieldLabel: "",
                            readOnly: true,
                            name: 'log_text',
                            emptyText: "生成日志显示处..."
                        }
                    ]
                }
            ];
            this.callParent(arguments);
        },
        //日志输入换行
        putText: function (text) {
            var log_text = Ext.getCmp('log_text');
            log_text.setValue(log_text.getValue() + text + "\r\n");
            log_text.getEl().dom.scrollTop = log_text.getEl().dom.scrollHeight;
        },
        //提交表单
        submitForm: function (params, win) {

            var create_form = Ext.getCmp('create_form').getForm();

            //提交表单
            create_form.submit({
                url: 'SysPbAction.ered?reqCode=createPbInfo',
                waitTitle: '提示',
                method: 'POST',
                waitMsg: '正在处理数据,请稍候...',
                success: function (form, action) {
                    //解码
                    var obj = Ext.JSON.decode(action.result.msg);

                    //第一步获取部门信息和对应的日历信息
                    if (obj.setup == 1) {
                        params.setup = 2;
                        win.log_depts = obj.data;
                        //如果无部门匹配日历则返回
                        if (obj.data.length == 0) {
                            win.putText('\r\n...\r\n...\r\n★☆★☆★☆排班生成完毕：无任何匹配好系统日历的部门,请在【部门日历管理】中进行匹配...★☆★☆★☆');
                            Ext.getCmp('createBtn').setDisabled(false);
                            return;
                        }
                        //显示完成情况
                        for (var i = 0; i < obj.data.length; i++) {
                            win.putText("----★获取到：部门【" + obj.data[i].deptname + "】(No." + obj.data[i].dept_no + ")---------匹配--------->>日历【" + obj.data[i].cal_name + "】(No." + obj.data[i].cal_no + ")");
                        }
                        win.depts_index = 0;//跳到第一个部门
                        win.putText('\r\n\r\n★正在执行第二步：获取部门人员并根据所匹配日历的排班\r\n');
                        win.putText('☆☆部门【' + obj.data[0].deptname + '】正在排班...☆☆');
                        //上传部门数据
                        params.dept_no = win.log_depts[0].dept_no;//上传部门编号
                        params.cal_no = win.log_depts[0].cal_no;//上传日历编号
                        win.submitForm(params, win);
                    }
                    //第二步获取部门人员并根据所匹配日历的排班
                    else if (obj.setup == 2) {
                        //判断是否已经是最后一个部门了(是的话则跳转到下一步)
                        if (win.depts_index == win.log_depts.length - 1) {
                            params.setup = 3;
                        }

                        //如果无成员的话则提示
                        if (obj.data.length == 0) {
                            win.putText('----★该部门没有成员...');
                        } else {
                            //显示完成情况
                            for (var i = 0; i < obj.data.length; i++) {
                                win.putText("----★部门成员【" + obj.data[i].username + "】(No." + obj.data[i].userid + ")---------完成情况--------->>" + (obj.data[i].okFlag == "1" ? "已完成" : "已存在排班记录"));
                            }
                        }

                        //如果 还有下一个部门的话
                        if (params.setup == 2) {
                            win.depts_index = win.depts_index + 1;//跳到第一个部门
                            win.putText('☆☆部门【' + win.log_depts[win.depts_index].deptname + '】正在排班...☆☆');
                            //上传部门数据
                            params.dept_no = win.log_depts[win.depts_index].dept_no;//上传部门编号
                            params.cal_no = win.log_depts[win.depts_index].cal_no;//上传日历编号
                        } else {
                            win.putText("\r\n\r\n★正在执行第三步：节假日设定\r\n");

                        }

                        //继续下一步操作
                        win.submitForm(params, win);
                    }
                    //第三步节假日设定
                    else if (obj.setup == 3) {
                        params.setup = 4;

                        //如果无节假日的话则提示
                        if (obj.data.length == 0) {
                            win.putText('----★暂无节假日设定...');
                        } else {
                            //显示完成情况
                            for (var i = 0; i < obj.data.length; i++) {
                                win.putText("----★节假日【" + obj.data[i].hol_name + "】(" + obj.data[i].hol_day + ")--------->>设置完成");
                            }
                        }

                        win.putText("\r\n\r\n★正在执行第四步：该月份基础日历规则\r\n");
                        //继续下一步操作
                        win.submitForm(params, win);
                    }
                    //第三步该月份基础日历规则设定
                    else if (obj.setup == 4) {
                        params.setup = 5;

                        //如果无规则的话则提示
                        if (obj.data.length == 0) {
                            win.putText('----★暂无基础明细设定...');
                        } else {
                            //显示完成情况
                            for (var i = 0; i < obj.data.length; i++) {
                                win.putText("----★引用了基础日历的明细规则【" + obj.data[i].mx_date + "】--------->>设置完成");
                            }
                        }

                        win.putText("\r\n\r\n★正在执行第五步：该月份日历明细规则设定\r\n");
                        //继续下一步操作
                        win.submitForm(params, win);
                    }
                    //第四步该月份日历明细设定
                    else if (obj.setup == 5) {
                        params.setup = 6;

                        //如果无规则的话则提示
                        if (obj.data.length == 0) {
                            win.putText('----★暂无非基础明细设定...');
                        } else {
                            //显示完成情况
                            for (var i = 0; i < obj.data.length; i++) {
                                win.putText("----★引用了非基础日历的明细规则【" + obj.data[i].mx_date + "】--------->>设置完成");
                            }
                        }

                        win.putText("\r\n\r\n★正在执行第五步：该月份规律排班设定\r\n");
                        //继续下一步操作
                        win.submitForm(params, win);
                    }
                    //第五步排班规则设定->完成
                    else if (obj.setup == 6) {
                        //如果无规则的话则提示
                        if (obj.data.length == 0) {
                            win.putText('----★暂无排班规则设定...');
                        } else {
                            //显示完成情况
                            for (var i = 0; i < obj.data.length; i++) {
                                win.putText("----★引用了排班规则【" + obj.data[i].pb_name + "】(" + obj.data[i].pb_date + ")--------->>设置完成");
                            }
                        }

                        win.putText('\r\n\r\n\r\n----------------...排班生成完毕...----------------');
                        Ext.getCmp('createBtn').setDisabled(false);
                        Ext.Msg.alert('提示', '【' + params.year + '年' + params.month + '月份' + '】的排班信息 生成完毕!!!');
                    }
                },
                failure: function (form, action) {
                    Ext.MessageBox.alert('提示', '当前网络忙！请稍后再试~');
                },
                params: params
            });
        },
        //开始生成
        event_beginCreate: function (btn, e) {
            var log_text = Ext.getCmp('log_text');
            var year = Ext.getCmp('combo_year').getValue();
            var month = Ext.getCmp('combo_month').getValue();
            var isRecreate = Ext.getCmp('isRecreate').getValue();
            if (year == yearNow && month < monthNow) {
                Ext.Msg.alert('提示', '不能生成以前的工作安排');
                return;
            }

            //生成按钮失效
            btn.setDisabled(true);
            var str_tmp = '-----------★开始生成【' + year + '年' + month + '月份' + '】的排班信息★-----------\r\n\r\n';
            if (isRecreate) {
                str_tmp += '--【清除该月排班信息完毕】--\r\n\r\n';
            }
            str_tmp += '★正在执行第一步：获取所有匹配好日历的部门以及日历信息\r\n\r\n';//★
            log_text.setValue(str_tmp);

            //开始生成
            this.submitForm({year: year, month: month, setup: 1, log_text: '', isRecreate: isRecreate}, this);
        },
        //清空日志
        event_clearLog: function (btn, e) {
            var log_text = Ext.getCmp('log_text');
            log_text.setValue('');
        }
    });


    //-------------------实体----------------------------
    var pbWin = new Ext.pbWin();
    pbWin.show();

    //隐藏表单
    setTimeout(function () {
        Ext.getCmp('query_form').collapse();
    }, 1500);
});