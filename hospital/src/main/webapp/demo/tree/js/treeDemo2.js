/**
 * 树形UI综合示例(异步树)
 *
 * @author XiongChun
 * @since 2010-10-28
 */
Ext.onReady(function () {


    var root =  {
        text: '功能菜单',
        expanded: true,
        id: '01'
    };
    var treestore= new Ext.data.TreeStore({
        preloadChildren: true,
        root: root,
        proxy: {
            extraParams:{
                showCheck:false
            },
            type: 'ajax', url: './treeDemo.ered?reqCode=queryMenuItems'}
    })
    function refreshNode(nodeid) {
        var treestore = tree.getStore();
        var node = treestore.getNodeById(nodeid);
        /* 异步加载树在没有展开节点之前是获取不到对应节点对象的 */
        if (Ext.isEmpty(node)) {
            treestore.reload();
            return;
        }
        if (node.data.leaf) {
            treestore.load({node: node.parentNode});
        } else {
            treestore.load({node: node});
        }
    }
    // 表格工具栏
    var tbar = new Ext.toolbar.Toolbar({
        items: [
            {
                text: '刷新根节点',
                iconCls: 'arrow_refreshIcon',
                handler: function () {
                    refreshNode(root.id);
                }
            },
            {
                text: '刷新选中节点',
                iconCls: 'tbar_synchronizeIcon',
                handler: function () {
                    var selectModel = tree.getSelectionModel();
                    var selectNode = selectModel.getSelection()[0];
                    if (Ext.isEmpty(selectNode)) {
                        Ext.Msg.alert('提示', '没有选中任何节点!');
                        return ;
                    }
                    refreshNode(selectNode.data.id);
                }
            }
        ]
    });
    // 定义一个树面板
    var tree =
        Ext.create('Ext.tree.Panel', {
            store:treestore,
            rootVisible: true,
            autoScroll: false,
            animate: false,
            useArrows: false,
            tbar:tbar,
            border: false,
            applyTo: 'treeDiv',
            width: 400,
            height: 500
        });
    // 选中根节点

    // 绑定节点单击事件
    tree.on("cellclick", function (treeview, htmltext, index, node) {
        // Ext.MessageBox.alert('提示', 'ID:' + node.id + " text:"
        // + node.text);
    });

    tree.getSelectionModel().select(root);

    var firstWindow = new Ext.window.Window({
        title: '<span class="commoncss">树范例二(异步加载树)</span>', // 窗口标题
        layout: 'fit', // 设置窗口布局模式
        width: 300, // 窗口宽度
        height: 400, // 窗口高度
        closable: false, // 是否可关闭
        collapsible: true, // 是否可收缩
        maximizable: true, // 设置是否可以最大化
        border: false, // 边框线设置
        constrain: true, // 设置窗口是否可以溢出父容器
        pageY: 20, // 页面定位Y坐标
        pageX: document.body.clientWidth / 2 - 300 / 2, // 页面定位X坐标
        items: [tree]
        // 嵌入的表单面板
    });
    firstWindow.show(); // 显示窗口

});