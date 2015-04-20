/**
 * UI元素托管
 *
 * @author XiongChun
 * @since 2011-06-29
 */
Ext.require('Ext4.Com.Model.Parts_Model');
Ext.onReady(function () {
    var menuid;
    var root = {
        text: root_menuname,
        expanded: true,
        id: '01'
    };
    var menuTree = new Ext.tree.Panel({
        store: new Ext.data.TreeStore({
            preloadChildren: true,
            root: root,
            proxy: {
                type: 'ajax', url: 'part.ered?reqCode=queryMenuItems'
            }
        }),
        title: '',
        applyTo: 'menuTreeDiv',
        autoScroll: false,
        animate: false,
        useArrows: false,
        border: false
    });

    menuTree.on('cellclick', function (treeview, htmltext, index, node) {
        if (!node.isLeaf()) {
            store.removeAll();
            Ext.getCmp('id_addRow').setDisabled(true);
            Ext.getCmp('id_save').setDisabled(true);
            return;
        }
        Ext.getCmp('id_addRow').setDisabled(false);
        menuid = node.data.id
        store.proxy.extraParams.menuid = menuid;
        store.loadPage(1);
    });

    menuTree.getSelectionModel().select(root);

    var columns = [
        {
            xtype: 'rownumberer',
            text: '序号',
            width: 32
        }, {
            text: '删除',
            dataIndex: 'delete',
            width: 35,
            renderer: iconColumnRender
        }, {
            text: '元素Dom标识',
            dataIndex: 'cmpid',
            sortable: true,
            width: 150,
            editor: {xtype: 'textfield', allowBlank: false}

        }, {
            text: '元素类型',
            dataIndex: 'cmptype',
            renderer: CMPTYPERender,
            editor: {
                xtype: 'combobox',
                queryMode: 'local',
                valueField: 'value',
                displayField: 'text',
                triggerAction: 'all',
                store: CMPTYPEStore,
                listWidth: 408,
                value: '0',
                name: 'locked',
                emptyText: '请选择...',
                allowBlank: false,
                forceSelection: true,
                editable: false,
                anchor: "99%"
            }
        }, {
            text: '元素描述',
            dataIndex: 'remark',
            width: 200,
            editor: new Ext.form.TextField({
                maxLength: 50
            })
        }, {
            text: '托管页面功能菜单',
            dataIndex: 'menuname',
            id: 'menuname',
            width: 150
        }, {
            text: '元素编号',
            dataIndex: 'partid',
            width: 120
        }, {
            text: '菜单编号',
            dataIndex: 'menuid',
            hidden: true,
            width: 120
        }];


    var store = Ext.create('Ext.data.Store', {
        pageSize: '50',
        proxy: {
            extraParams: {},
            type: 'ajax',
            url: 'part.ered?reqCode=queryParts',
            reader: {
                type: 'json',
                totalProperty: 'TOTALCOUNT', // 记录总数
                root: 'ROOT' // Json中的列表数据根节点
            }
        },
        model: 'Ext4.Com.Model.Parts_Model'
    });

    store.on('beforeload', function () {
        Ext.apply(this.proxy.extraParams, {
            menuid: menuid
        })
    });

    store.on('load', function () {
        if (store.getTotalCount() == 0) {
            // Ext.getCmp('id_addRow').setDisabled(true);
            Ext.getCmp('id_save').setDisabled(true);
        } else {
            // Ext.getCmp('id_addRow').setDisabled(false);
            Ext.getCmp('id_save').setDisabled(false);
        }

    });

    var pagesize_combo = new Ext.form.field.ComboBox({
        name: 'pagesize',
        hiddenName: 'pagesize',
        triggerAction: 'all',
        lazyRender: true,
        mode: 'local',
        store: new Ext.data.ArrayStore({
            fields: ['value', 'text'],
            data: [[10, '10条/页'], [20, '20条/页'],
                [50, '50条/页'], [100, '100条/页'],
                [250, '250条/页'], [500, '500条/页']]
        }),
        valueField: 'value',
        displayField: 'text',
        value: '50',
        editable: false,
        width: 85
    });


    pagesize_combo.on("select", function (comboBox) {
        var number = parseInt(comboBox.getValue());
        bbar.pageSize = number;
        store.pageSize = number;
        store.loadPage(1);
    });

    var bbar = new Ext.PagingToolbar({
        pageSize: '50',
        store: store,
        displayInfo: true,
        displayMsg: '显示{0}条到{1}条,共{2}条',
        emptyMsg: "没有符合条件的记录",
        plugins: [Ext.create('Ext.ux.ProgressBarPager')], // 分页进度条
        items: ['-', '&nbsp;&nbsp;', pagesize_combo]
    });

    var grid = Ext.create('Ext.grid.Panel', {
        title: '<span class="commoncss">托管UI元素列表</span>',
        height: 500,
        viewConfig: {
            enableTextSelection: true
        },
        autoScroll: true,
        region: 'center',
        store: store,
        loadMask: {
            msg: '正在加载表格数据,请稍等...'
        },
        plugins: [
            Ext.create('Ext.grid.plugin.CellEditing', {
                clicksToEdit: 1
            })
        ]
        ,
        frame: true,
        autoExpandColumn: 'menuname',
        columns: columns,
        tbar: [{
            text: '新增',
            iconCls: 'addIcon',
            id: 'id_addRow',
            handler: function () {
                addInit();
            }
        }, '-', {
            text: '保存',
            iconCls: 'acceptIcon',
            id: 'id_save',
            handler: function () {
                if (runMode == '0') {
                    Ext.Msg
                        .alert('提示',
                        '系统正处于演示模式下运行,您的操作被取消!该模式下只能进行查询操作!');
                    return;
                }
                saveOrUpdateData();
            }
        }, '-', {
            text: '刷新',
            iconCls: 'arrow_refreshIcon',
            handler: function () {
                store.reload();
            }
        }],
        bbar: bbar
    });

    grid.on("cellclick", function (pGrid, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        var fieldName = grid.columns[cellIndex].dataIndex;
        if (fieldName == 'delete' && cellIndex == 1) {
            var dirtytype = record.get('dirtytype');
            if (Ext.isEmpty(dirtytype)) {
                Ext.Msg.confirm('请确认', '你确认要删除当前对象吗?', function (btn,
                                                                 text) {
                    if (btn == 'yes') {
                        delItem(record.get('partid'));
                    } else {
                        return;
                    }
                });
            } else {
                store.remove(record);

            }
        }
    });

    Ext.getCmp('id_addRow').setDisabled(true);
    Ext.getCmp('id_save').setDisabled(true);

    /*
     * store.load({ params : { start : 0, limit : bbar.pageSize } });
     */
    var viewport = new Ext.Viewport({
        layout: 'border',
        items: [{
            title: '<span style="font-weight:normal">功能菜单</span>',
            iconCls: 'layout_contentIcon',
            tools: [{
                id: 'refresh',
                handler: function () {
                    var treestore = menuTree.getStore();
                    treestore.load({node: treestore.getRootNode()});
                }
            }],
            collapsible: true,
            width: 210,
            minSize: 160,
            maxSize: 280,
            split: true,
            region: 'west',
            autoScroll: true,
            items: [menuTree]
        }, grid]
    });

    function addInit() {
        var selectModel = menuTree.getSelectionModel();
        var selectNode = selectModel.getSelection()[0];
        var rec = {partid: '保存后自动生成', menuid: selectNode.data.id, menuname: selectNode.data.text, dirtytype: '1'};
        store.insert(0, rec);
        // store.getAt(0).dirty=true; //不起作用
//		store.getAt(0).set('cmpid', '不能为空,请输入');
        // 通过这种办法变相的将新增行标识为脏数据
        Ext.getCmp('id_save').setDisabled(false);
    }

    function saveOrUpdateData() {
        var m = store.getModifiedRecords();
        if (Ext.isEmpty(m)) {
            Ext.MessageBox.alert('提示', '没有数据需要保存!');
            return;
        }
        var rowEditing = grid.editingPlugin;
        for (var i = 0; i < m.length; i++) {
            var record = m[i];
            if (Ext.isEmpty(record.get('cmpid'))) {
                Ext.Msg.alert('提示', '元素Dom标识字段数据校验不合法,请重新输入!', function () {
                    rowEditing.startEdit(m[i], 2);
                });
                return false;
            }
            if (Ext.isEmpty(record.get('cmptype'))) {
                Ext.Msg.alert('提示', '元素类型字段数据校验不合法,请重新输入!', function () {
                    rowEditing.startEdit(m[i], 3);
                });
                return false;
            }
        }

        var jsonArray = [];
        Ext.each(m, function (item) {
            jsonArray.push(item.getData());
        });

        Ext.Ajax.request({
            url: 'part.ered?reqCode=saveDirtyDatas',
            success: function (response) {

                var resultArray = Ext.JSON
                    .decode(response.responseText);
                if (resultArray.bflag == '1') {
                    Ext.getCmp('id_save').setDisabled(true);
                    store.reload();
                }
                Ext.Msg.alert('提示', resultArray.msg);
            },
            failure: function (response) {
                Ext.MessageBox.alert('提示', '数据保存失败');
            },
            params: {
                dirtydata: Ext.encode(jsonArray)
            }
        });
    }

    function delItem(partid) {
        if (runMode == '0') {
            Ext.Msg.alert('提示', '系统正处于演示模式下运行,您的操作被取消!该模式下只能进行查询操作!');
            return;
        }
        Ext.Ajax.request({
            url: 'part.ered?reqCode=deleteItem',
            success: function (response) {
                store.reload();
                var resultArray = Ext.JSON
                    .decode(response.responseText);
                Ext.Msg.alert('提示', resultArray.msg);
            },
            failure: function (response) {
                Ext.MessageBox.alert('提示', '数据删除失败');
            },
            params: {
                partid: partid
            }
        });
    }

    function iconColumnRender(value) {
        return "<a href='javascript:void(0);'><img src='" + webContext
            + "/resource/image/ext/delete.png'/></a>";
        ;
    }

});