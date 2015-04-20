/**
 * 编程环境 IDEA.
 * 编写者: 王少伟
 * 主题:【某些常用构件集成公共包】
 * 时间: 2013-05-20 下午4:36
 *
 *1、 Ext.UXPagingToolbar1   --分页栏1(根据演示的集成的，有页面记录数设置，分页进度条)
 *2、 Ext.UXWindow1 --不可关闭的窗体，可缩小，放大
 *3、 Ext.UXWindow2 --可关闭的窗体，关闭策略隐藏，可缩小，放大，有遮挡层
 *4、 Ext.getUXTree1({width,height,dataUrl,click(node,tree)})  --树图(可设宽高,以及设定点击事件,dataUrl设定) 带刷新根节点功能和选中节点功能
 *5、 Ext.UXGrid1 表格（模糊搜索、、、分页支持、添加编辑删除集成）
 *6、 Ext.UXPanel1   --自动创建ViewPort，并将panel放置进去，frame默认ture
 *  collapseFlag:false,//小化功能
 *    operWin:'',//对应的数据操作表单
 *    searchKey:'',//搜索框
 *    tbarFlag:true,//是否开启搜索栏
 *    bbarFlag:true,//是否开启分页栏
 *    searchFlag:true,//是否搜索功能
 *    refreshFlag:true,//是否更新功能
 *    addFlag:true,//是否有打开添加窗口
 *    editFlag:true,//编辑功能
 *    delFlag:true,//删除功能
 *     //编辑事件
 *    event_dbl:function(store,record,pGrid,rowIndex)
 *    //单元格点击事件
 *    event_c:function(store,record,pGrid,rowIndex,colIndex)
 *    //删除事件
 *    event_del:function(store,record,pGrid,rowIndex,colIndex)
 *
 */







//分页栏1(根据演示的集成的，有页面记录数设置，分页进度条)
Ext.define('Ext.UXPagingToolbar1', {
    extend: 'Ext.PagingToolbar',
    pageSize: 20,
    title: '',
    store: '',
    displayInfo: true,
    displayMsg: '显示{0}条到{1}条,共{2}条',
    plugins: "", // 分页进度条
    emptyMsg: "没有符合条件的记录",
    initComponent: function () {
        if (this.plugins == "") {
            this.plugins = [Ext.create('Ext.ux.ProgressBarPager')];
        }

        this.items = [
            '-',
            '&nbsp;&nbsp;',
            {
                xtype: 'combo',
                triggerAction: 'all',
                queryMode: 'local',
                store: [
                    [10, '10条/页'],
                    [20, '20条/页'],
                    [50, '50条/页'],
                    [100, '100条/页'],
                    [250, '250条/页'],
                    [500, '500条/页']
                ],
                value: '20',
                editable: false,
                width: 85,
                listeners: {
                    select: this.event_select,
                    scope: this
                }
            }];
        this.callParent(arguments);
    },
    // 实现设置每页几条
    event_select: function (combo) {
        number = parseInt(combo.getValue());
        this.pageSize = parseInt(number);
        this.store.pageSize = parseInt(number);
        this.store.loadPage(1);
    }
});


//window1类 --不可关闭的窗体，可缩小，放大
Ext.define('Ext.UXWindow1', {
    extend: 'Ext.window.Window',
    xtype: 'window',
    title: '',
    closable: false,
    constrain: true,
    maximizable: true,
    collapsible: true,
    animateTarget: document.body,
    initComponent: function () {
        //统一外观
        this.title = "<span style=\"font-weight:normal;color:rgba(0,0,255,0.85);\">" + this.title + "</span>";
        this.iconCls = "folder_userIcon";
        this.width = document.body.clientWidth - 50;
        this.height = document.body.clientHeight - 50;

        //指定显示坐标
        this.pageY = 20; // 页面定位X坐标
        this.pageX = document.body.clientWidth / 2 - this.width / 2; // 页面定位Y坐标
        this.callParent(arguments);
    }
});

//window2类  --可关闭的窗体，关闭策略隐藏，可缩小，放大，有遮挡层
Ext.define('Ext.UXWindow2', {
    extend: 'Ext.window.Window',
    title: '',
    closable: true,
    closeAction: 'hide',
    constrain: true,
    maximizable: true,
    collapsible: true,
    modal: true,
    animateTarget: document.body,
    buttons: [],
    initComponent: function () {
        //统一外观
        this.title = "<span style=\"font-weight:normal;rgba(16,22,255,0.64);\">" + this.title + "</span>";
        this.iconCls = "folder_wrenchIcon";

        //指定显示坐标
        this.pageY = 20; // 页面定位X坐标
        this.pageX = document.body.clientWidth / 2 - this.width / 2; // 页面定位Y坐标

        //增加取消按钮
        this.buttons.push({
            text: '取消', iconCls: 'window_caise_listIcon', handler: function () {
                this.hide();
            }, scope: this
        });
        this.callParent(arguments);
    },
    setTitle: function (title, iconCls) {
        this.title = "<span style=\"font-weight:normal;color:rgba(16,22,255,0.64);\">" + title + "</span>";

        if (this.header && this.headerAsText) {
            this.header.child('span').update(this.title);
            //this.header.child('span').dom.innerHTML=this.title;
        }
        if (iconCls) {
            this.setIconClass(iconCls);
        }
        this.fireEvent('titlechange', this, title);
        return this;
    }
});


//因为Ext.treepanel不支持重构，所以只能这样了。。。
//tree1类
Ext.getUXTree1 = function (settings) {
    //返回的树图
    var treePanel;

    //单点击事件
    function event_click(node, e) {
        //支持事件点击任务改造
        if (settings && settings.click != null)
            settings.click(node, treePanel);
    }

    //配置信息
    var paramObj = {
        title: "",
        region: "east",
        split: true,
        width: 100,
        height: 100,
        autoScroll: true,
        animate: true,
        enableDD: true,
        containerScroll: true,
        dataUrl: "SysPbAction.ered?reqCode=queryDeptTreeWithUser1",
        collapsible: true,
        titleCollapse: true,
        root: new Ext.tree.AsyncTreeNode({id: 'root', text: '根目录', expanded: true}),
        rootVisible: false,
        tbar: [
            {
                text: '刷新所有',
                iconCls: 'arrow_refreshIcon',
                handler: function () {
                    treePanel.getRootNode().reload();
                }
            },
            {
                text: '刷新选中节点',
                iconCls: 'tbar_synchronizeIcon',
                handler: function () {
                    var selectModel = treePanel.getSelectionModel();
                    var selectNode = selectModel.getSelection()[0];
                    if (Ext.isEmpty(selectNode)) {
                        Ext.Msg.alert('提示', '请在树图中选择需要重新读取数据的节点！');
                    } else {
                        if (!selectNode.data.leaf)
                            selectNode.reload();
                    }
                }
            }
        ],
        listeners: {click: event_click}
    };
    Ext.apply(paramObj, settings);

    //实例化
    treePanel = new Ext.tree.TreePanel(paramObj);

    return treePanel;
};


//grid1类
Ext.define('Ext.UXGrid1', {
    extend: 'Ext.grid.Panel',
    title: "",
    width: 793,
    height: 367,
    store: [],//数据源
    collapseFlag: false,//小化功能
    operWin: '',//对应的数据操作表单
    searchKey: '',//搜索框
    tbarFlag: true,//是否开启搜索栏
    bbarFlag: true,//是否开启分页栏
    searchFlag: true,//是否搜索功能
    refreshFlag: true,//是否更新功能
    addFlag: true,//是否有打开添加窗口
    editFlag: true,//编辑功能
    delFlag: true,//删除功能
    ctFlag: false,//右键菜单
    editText: '编辑',//编辑文字显示
    delText: '删除',//删除文字显示
    columns: [],
    columnLength: 0,//总共几个字段
    split: true,
    viewConfig: {forceFit: true},
    loadMask: {msg: '系统正在为您加载,请稍候...'},
    initComponent: function () {
        //小化功能
        if (this.collapseFlag) {
            this.collapsible = true;
            this.titleCollapse = true;
        }

        //提示数据源是否有匹配
        if (this.store == "")
            alert('请为视图上的表格匹配数据源！！！');

        //分页栏设置
        if (this.bbarFlag) {
            this.store.getProxy().pageSize = 20;
            if (this.store.pageLoad && this.store.pageLoad == true) {
                this.store.loadPage(1);
            }
            this.bbar = new Ext.UXPagingToolbar1({store: this.store});
        }

        //搜索栏设置
        if (this.tbarFlag) {
            this.tbar = [];
            //搜索功能
            if (this.searchFlag) {
                //实例化搜索框并加上回车事件
                this.searchKey = new Ext.form.TextField({
                    width: 188, emptyText: '输入关键字进行模糊搜索...', listeners: {
                        specialkey: this.event_search_specialkey,
                        scope: this
                    }
                });

                //配置参数，并且加上搜索框和按钮
                this.store.getProxy().extraParams.searchKey = '%';
                this.store.pageSize = 20;
                this.tbar.push(this.searchKey);
                this.tbar.push({text: '搜索', iconCls: 'page_findIcon', handler: this.event_search, scope: this});
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
        }

        //自动添加字段
        if (this.columns == "") {
            this.columns = [];
            var storeitems = this.store.proxy.model.getFields();
            for (var i = 0; i < storeitems.length; i++) {
                this.columns.push({
                    header: (this.store.headers && this.store.headers.length > i) ? this.store.headers[i] : storeitems[i].name,
                    sortable: true,
                    resizable: true,
                    dataIndex: storeitems[i].name,
                    width: 100
                });
            }
        }

        //添加编辑字段
        if (this.editFlag) {
            this.columns.push({
                header: this.editText,
                width: 40,
                dataIndex: 'x1',
                renderer: function () {
                    return '<a href=# title="点击编辑该条记录"><img src="' + webContext + '/resource/image/ext/edit1.png"/></a>';
                }
            });
        }

        //添加删除字段
        if (this.delFlag) {
            this.columns.push({
                header: this.delText,
                width: 40,
                dataIndex: 'x2',
                renderer: function (v) {
                    return '<a href=# title="点击删除该条记录"><img src="' + webContext + '/resource/image/ext/delete.png"/></a>';
                }
            });
        }
        this.columnLength = this.columns.length;

        //添加 事件
        this.on('itemdblclick', this.Pevent_dbl, this);
        this.on('cellclick', this.Pevent_c, this);
        this.on('rowcontextmenu', this.Pevent_ct, this);

        //初始化...
        this.callParent(arguments);


    },
    //刷新事件
    event_refresh: function (btn, e) {
        this.store.load();
    },
    //搜索事件
    event_search: function (btn, e) {
        this.store.getProxy().extraParams.searchKey = "%" + this.searchKey.getValue() + "%";
        this.store.load();
    },
    //搜索框回车事件
    event_search_specialkey: function (field, e) {
        if (e.getKey() == Ext.EventObject.ENTER) {
            this.event_search(field, e, this);
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
    },
    //父窗体双击事件
    Pevent_dbl: function (gridpanel, record, item, rowIndex, e, eOpts) {
        //非编辑模式返回
        if (!this.editFlag)
            return;
        var storeTmp = gridpanel.getStore();
        //调用子类方法
        this.event_dbl(storeTmp, record, gridpanel, rowIndex, this);
    },
    //父窗体单元格点击事件
    Pevent_c: function (pGrid, td, colIndex, record, tr, rowIndex, e, eOpts) {
        this.operWin.isInsert = false;
        var storeTmp = pGrid.getStore();
        //编辑事件
        if ((this.editFlag && this.delFlag && colIndex == this.columnLength - 2) || (this.editFlag && this.delFlag == false && colIndex == this.columnLength - 1)) {
            this.Pevent_dbl(pGrid, record, null, rowIndex, e, eOpts);
            //删除事件
        } else if (this.delFlag && colIndex == this.columnLength - 1) {
            //删除提示
            var me = this;
            Ext.Msg.confirm('提示', '删除操作一旦执行将无法恢复,确定继续？', function (choose) {
                if (choose == "no") {
                    return;
                }
                me.event_del(storeTmp, record, pGrid, rowIndex, colIndex, this);
            });
        } else {
            this.event_c(storeTmp, record, pGrid, rowIndex, colIndex, e, this);
        }
    },
    //父窗体右击事件
    Pevent_ct: function (pGrid, rowIndex, e) {
        if (!this.ctFlag)
            return;
        e.stopEvent();
        var storeTmp = pGrid.getStore();
        var record = storeTmp.getAt(rowIndex);
        this.event_ct(storeTmp, record, pGrid, rowIndex, e);
    },
    //右双击事件
    event_ct: function (store, record, pGrid, rowIndex, e) {

    },
    //双击事件
    event_dbl: function (store, record, pGrid, rowIndex) {
        //子类可重写此方法
        Ext.Msg.alert('提示', '！执行了表格编辑事件，子类要实现此方法请实现如下方法<br/>event_dbl:function(store,record,pGrid,rowIndex)<br/><font style="color:red">！如果不需要编辑事件，请配置editFlag=false</font>');
    },
    //单元格点击事件
    event_c: function (store, record, pGrid, rowIndex, colIndex, e) {
        //子类可重写此方法
    },
    //删除事件
    event_del: function (store, record, pGrid, rowIndex, colIndex) {
        //子类可重写此方法
        Ext.Msg.alert('提示', '！执行了表格删除事件，子类要实现此方法请实现如下方法<br/>event_del:function(store,record,pGrid,rowIndex,colIndex)<br/><font style="color:#ff0c07">！如果不需要删除事件，请配置delFlag=false</font>');
    }
});


//自动创建ViewPort的Panel容器
Ext.define('Ext.UXPanel1', {
    extend: 'Ext.panel.Panel',
    xtype: "panel",
    frame: true,
    initComponent: function () {
        var me = this;
        this.callParent(arguments);
        new Ext.Viewport({
            layout: 'fit',
            items: [me]
        });
    }
});







	
