/**
 * 编程环境 IDEA.
 * 编写者: 王少伟
 * 主题:【公共类-grid】
 * 时间: 2013-06-28  上午10:47
 * ---------------------
 * 模糊搜索、、、分页支持、添加编辑删除集成
 */
    //--------------------导入包语句--------------------
    //importJs("")


    //--------------------定义类--------------------
Ext.define('sunShine.common.UXGrid1', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.UXGrid1',
    tempMxid: '',
    title: "",
    region: 'center',
    width: 793,
    height: 367,
    store: "",//数据源
    collapseFlag: false,//小化功能
    operWin: '',//对应的数据操作表单
    ChoiceWin: '',//选择参考计划的窗口
    searchKey: '',//搜索框
    tbarFlag: true,//是否开启搜索栏
    bbarFlag: true,//是否开启分页栏
    searchFlag: true,//是否搜索功能
    refreshFlag: true,//是否更新功能
    addFlag: true,//是否有打开添加窗口
    ChoiceModelFlag: false,//弹出选择参考定义明细窗口
    ChoiceDefineFlag: false,//选择参考定义明细
    AddSubMx: false,//设置定义明细的明细
    SubMxInfo: false,
    SubMxInfoWin: '',
    AdditionalFlag: false,//是否显示“追加子明细”按钮
    old_define_id: '',//选择参考定义时，将该参考定义的明细添加在该old_define_id的明细中
    editFlag: true,//编辑功能
    delFlag: true,//删除功能
    ctFlag: false,//右键菜单
    makeMTO: false,
    editText: '编辑',//编辑文字显示
    delText: '删除',//删除文字显示
    canhandleText: '办理',
    columns: "",
    columnLength: 0,//总共几个字段
    split: true,
    tbar: '',
    viewConfig: {enableTextSelection: true},

    initComponent: function () {
        var me = this;
        //_____________初始化开始_____________
        //小化功能
        if (this.collapseFlag) {
            this.collapsible = true;
            this.titleCollapse = true;
        }

        //统一标题
        if (this.title != "") {
            this.title = '<span class="normal_title">' + this.title + '</span>';
        }

        //提示数据源是否有匹配
        if (this.store == "")
            alert('请为视图上的表格匹配数据源！！！');

        //分页栏设置
        if (this.bbarFlag) {
            this.bbar = new Ext.PagingToolbar({
                pageSize: '25',
                store: me.store,
                displayInfo: true,
                displayMsg: '显示{0}条到{1}条,共{2}条',
                plugins: [Ext.create('Ext.ux.ProgressBarPager')], // 分页进度条
                emptyMsg: "没有符合条件的记录",
                items: ['-', '&nbsp;&nbsp;', {
                    xtype: 'combo',
                    store: [1, 25, 50, 100, 200, 500],
                    value: 25,
                    width: 50,
                    editable: false,
                    listeners: {
                        change: me.event_PageSizeChange,
                        scope: me
                    }
                },
                    '条/每页']
            });
        } else {
            this.store.setParams({isPage: false});
        }

        //搜索栏设置
        if (this.tbarFlag) {
            var tempbar = this.tbar == '' ? [] : this.tbar;
            this.tbar = [];
            //搜索功能
            if (this.searchFlag) {
                //实例化搜索框并加上回车事件
                this.tbar.push({
                    xtype: 'textfield', name: 'searchKey', width: 188, emptyText: '输入关键字进行模糊搜索...', listeners: {
                        specialkey: this.event_search_specialkey,
                        scope: this
                    }
                });
                //配置参数，并且加上搜索框和按钮
                this.tbar.push({text: '搜索', iconCls: 'previewIcon', handler: this.event_search, scope: this});
            }
            //分隔符
            if (this.searchFlag && this.refreshFlag)
                this.tbar.push("-");

            //刷新功能
            if (this.refreshFlag) {
                this.tbar.push({text: '刷新', iconCls: 'arrow_refreshIcon', handler: this.event_refresh, scope: this});
            }

            //分隔符
            if (this.addFlag && this.refreshFlag)
                this.tbar.push("-");

            //添加窗口功能
            if (this.addFlag) {
                this.tbar.push({text: '添加', iconCls: 'addIcon', handler: this.event_add, scope: this});
            }
            //选择模版窗口功能
            if (this.ChoiceModelFlag) {
                this.tbar.push({text: '选择参考计划', iconCls: 'addIcon', handler: this.event_ChoiceModel, scope: this});
            }
            if (this.AddSubMx) {
                this.tbar.push({text: '设置计划子明细', iconCls: 'addIcon', handler: this.event_SetSubMx, scope: this});
            }
            if (this.SubMxInfo) {
                this.tbar.push({text: '查看计划子明细', iconCls: 'addIcon', handler: this.event_ShowSubMxInfo, scope: this});
            }

            //选择参考定义功能
            if (this.ChoiceDefineFlag) {
                this.tbar.push({
                    text: '选择参考计划',
                    iconCls: 'addIcon',
                    handler: this.event_Define_ChoiceModel,
                    scope: this
                });
            }
            //添加窗口功能
            if (this.AdditionalFlag) {
                this.tbar.push({text: '补录计划子明细', iconCls: 'addIcon', handler: this.event_Additional, scope: this});
            }

            //添加自定义扩展按扭
            for (var i = 0; i < tempbar.length; i++) {
                //默认样式靠右，并且加上|
                if (i == 0) {
                    this.tbar.push("->");
                    this.tbar.push("-");
                }
                this.tbar.push(tempbar[i]);
            }
            this.tbar = Ext.create('Ext.toolbar.Toolbar', {layout: {overflowHandler: 'Menu'}, items: this.tbar});
        }

        //自动添加字段
        if (this.columns == "") {
            var tempFields = this.store.model.getFields();
            this.columns = [];
            for (var i = 0; i < tempFields.length; i++) {
                this.columns.push({
                    text: (this.store.headers && this.store.headers.length > i) ? this.store.headers[i] : tempFields[i].name,
                    dataIndex: tempFields[i].name,
                    menuDisabled: true,
                    flex: 1
                });
            }
        }

        //添加编辑字段
        if (this.editFlag) {
            this.columns.push({
                xtype: 'actioncolumn',
                text: this.editText,
                align: "center",
                width: 40,
                menuDisabled: true,
                items: [
                    {
                        icon: webContext + '/resource/image/ext/edit1.png',
                        tooltip: me.editText,
                        handler: this.parentEvent_edit,
                        scope: this
                    }
                ]
            });

            this.on('itemdblclick', this.parentEvent_dblclick, this);
        }

        //添加删除字段
        if (this.delFlag) {
            this.columns.push({
                xtype: 'actioncolumn',
                text: this.delText,
                align: "center",
                width: 40,
                menuDisabled: true,
                items: [
                    {
                        icon: webContext + '/resource/image/ext/delete.png',
                        tooltip: me.delText,
                        style: 'cursor: pointer;',
                        handler: this.parentEvent_del,
                        scope: this
                    }
                ]
            });
        }

        //_____________初始化结束_____________
        me.callParent(arguments);
    },
    //设置统一标题
    setTitle2: function (title) {
        if (title != "") {
            title = '<span class="normal_title">' + title + '</span>';
        }
        this.setTitle(title);
    },
    // 实现设置每页几条
    event_PageSizeChange: function (combo, newVal) {
        this.store.pageSize = newVal;
        this.down('pagingtoolbar').pageSize = newVal;
        this.store.setParams({start: 0});
        this.store.load();
    },
    //刷新事件
    event_refresh: function () {
        this.store.load();
    },
    //搜索事件
    event_search: function () {
        this.store.setParams({searchKey: "%" + this.down('textfield[name=searchKey]').getValue() + "%"});
        this.store.load();
    },
    //搜索框回车事件
    event_search_specialkey: function (field, e) {
        if (e.getKey() == Ext.EventObject.ENTER) {
            this.event_search();
        }
    },
    //添加事件
    event_add: function (btn, e) {
        if (!this.operWin) {
            Ext.Msg.alert('提示', '找不到对应的添加窗口！无法提供添加功能...请联系开发人员...<br/><font color="red"><b>operWin未定义<b></font>');
            return;
        }

        //展示操作窗口
        this.operWin.isInsert = true;
        this.operWin.show();

        //初始化该窗体的表单
        var formPanel = this.operWin.down('form');
        if (formPanel) {
            formPanel.getForm().reset();
        }
        this.store.load();
    },
    //在启动环节补充计划子明细
    event_Additional: function (btn, e) {
        //显示带有crud功能的
        var rec = this.getSelectionModel().getSelection()[0];
        if (Ext.isEmpty(rec)) {
            Ext.Msg.alert('提示', '请选择要新增子明细的记录');
            return;
        }
        this.SubMxInfoWin = Ext.create('sunShine.FO.win.SubMxInfoWin', {
            query_ref: 'querySubRunnerInfo',
            showstatue: true,
            AdditionalFlag: true
        });
        this.SubMxInfoWin.tempMxid = rec.get('mx_id');
        this.SubMxInfoWin.items.items[0].tempMxid = rec.get('mx_id');

        this.SubMxInfoWin.AddSubMx = true;
        this.SubMxInfoWin.AdditionalFlag = true;
        this.SubMxInfoWin.tmp_record = this.operWin.tmp_record;
        this.SubMxInfoWin.show();
    },

    //弹出选择参考明细模版窗口
    event_ChoiceModel: function (btn, e) {
        var me = this;
        if (!this.operWin || !this.ChoiceWin) {
            Ext.Msg.alert('提示', '找不到对应的添加窗口！无法提供添加功能...请联系开发人员...<br/><font color="red"><b>operWin或ChoiceWin未定义<b></font>');
            return;
        }
        var old_define_id = this.operWin.tmp_record.get('define_id');
        var params = {
            define_id: old_define_id,
            done_man: "{useraccount}",
            exec_target: 'planeService',
            exec_method: 'PublishStatueverify'
        };
        //校验是否已发布
        Ext.Ajax.request({
            url: 'Quick.ered?reqCode=exec',
            async: true,//默认为false
            params: params,
            success: function (response, opts) {
                if (response.responseText == 0) {
                    me.ChoiceWin.old_define_id = old_define_id;
                    me.ChoiceWin.down('gridpanel[gridFlag=center]').getStore().load();
                    var tempGrid = me.ChoiceWin.down('gridpanel[gridFlag=east]');
                    tempGrid.setTitle('工作项明细查看');
                    tempGrid.collapse();
                    me.ChoiceWin.show();

                } else {
                    Ext.MessageBox.alert('提示', '计划已发布,无法选择参考计划');
                    return;
                }
            },
            failure: function (response, opts) {
                Ext.MessageBox.alert('提示', '校验工作计划失败。请联系相关工作人员');
                return;
            }
        });
    },
    //选择参考明细按钮事件
    event_Define_ChoiceModel: function () {
        this.event_Define_ChoiceModel();
    },
    //双击事件
    parentEvent_dblclick: function (grid, record, item, index, e) {
        var me = this;
        if (!this.operWin) {
            Ext.Msg.alert('提示', '找不到对应的编辑窗口！无法提供编辑功能...请联系开发人员...<br/><font color="red"><b>operWin未定义<b></font>');
            return;
        }
        var params = {
            define_id: record.get('define_id'),
            done_man: "{useraccount}",
            exec_target: 'planeService',
            exec_method: 'PublishStatueverify'
        };
        //校验是否已发布
        Ext.Ajax.request({
            url: 'Quick.ered?reqCode=exec',
            async: true,//默认为false
            params: params,
            success: function (response, opts) {
                if (response.responseText == 0) {

                    //展示操作窗口
                    me.operWin.isInsert = false;
                    me.operWin.show();

                    //该窗体的表单加载数据
                    var formPanel = me.operWin.down('form');
                    if (formPanel) {
                        me.operWin.currentRecord = record;
                        formPanel.getForm().loadRecord(record);
                    }

                    me.event_edit(record, me);

                } else {
                    Ext.MessageBox.alert('提示', '计划已发布,无法编辑工作');
                    return;
                }
            },
            failure: function (response, opts) {
                Ext.MessageBox.alert('提示', '校验工作计划失败。请联系相关工作人员');
                return;
            }
        });

    },
    //编辑
    parentEvent_edit: function (grid, rowIndex, colIndex, e) {
        var record = grid.getStore().getAt(rowIndex);

        this.parentEvent_dblclick(grid, record);
    },
    //删除
    parentEvent_del: function (grid, rowIndex, colIndex, e) {
        //删除提示
        var me = this;
        Ext.Msg.confirm('提示', '删除操作一旦执行将无法恢复,确定继续？', function (choose) {
            if (choose == "no") {
                return;
            }
            var record = grid.getStore().getAt(rowIndex);
            me.event_del(record, me);
        });
    },
    //提醒编辑
    event_edit: function (record, grid) {
        // Ext.Msg.alert('提示', '！执行了表格编辑事件，子类要实现此方法请实现如下方法<br/>event_edit:function(record,grid)<br/><font style="color:red">！如果不需要编辑事件，请配置editFlag=false</font>');
    },
    //提醒删除
    event_del: function (record, grid) {
        Ext.Msg.alert('提示', '！执行了表格删除事件，子类要实现此方法请实现如下方法<br/>event_del:function(record,grid)<br/><font style="color:#ff0c07">！如果不需要删除事件，请配置delFlag=false</font>');
    },
    //添加子明细
    event_SetSubMx: function () {
        //显示带有crud功能的
        var rec = this.getSelectionModel().getSelection()[0];
        if (Ext.isEmpty(rec)) {
            Ext.Msg.alert('提示', '请选择要新增子明细的记录');
            return;
        }
        this.SubMxInfoWin.tempMxid = rec.get('mx_id');
        this.SubMxInfoWin.items.items[0].tempMxid = rec.get('mx_id');
        this.SubMxInfoWin.AddSubMx = true;
        this.SubMxInfoWin.tmp_record = this.operWin.tmp_record
        this.SubMxInfoWin.show();
    },
    event_ShowSubMxInfo: function () {
        //只是显示SubMxInfoWin
        //显示带有crud功能的
        var rec = this.getSelectionModel().getSelection()[0];
        if (Ext.isEmpty(rec)) {
            Ext.Msg.alert('提示', '请选择要查看子明细的记录');
            return;
        }
        if (this.SubMxInfoWin.handleSubRunnerInfo) {
            var mx_status = rec.get('mx_status');
            if (mx_status == 0) {
                Ext.Msg.alert('提示', '该父计划还未开始，无法进行子计划办理');
                return;
            }
            /*else if(mx_status==3||mx_status==4)
             {
             Ext.Msg.alert('提示','该父计划已结束，无法进行子计划办理');
             return;
             }*/
        }
        this.SubMxInfoWin.tempMxid = rec.get('mx_id');
        this.SubMxInfoWin.items.items[0].tempMxid = rec.get('mx_id');
        this.SubMxInfoWin.SubMxInfo = true;
        this.SubMxInfoWin.tmp_record = this.operWin.tmp_record;

        this.SubMxInfoWin.show();
    }
})
;
