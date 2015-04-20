/**
 * 编程环境 IDEA.
 * 编写者: 王少伟
 * 主题:【公共类-tree】
 * 时间: 2013-06-28  下午3:35
 */
    //--------------------导入包语句--------------------
    //importJs("")


    //--------------------定义类--------------------
Ext.define('sunShine.common.UXTree1', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.UXTree1',

    title: "",
    region: "east",
    split: true,
    width: 258,
    height: 258,
    store: "",
    rootVisible: false,
    useArrows: true,
    autoScroll: true,
    collapsible: true,
    titleCollapse: true,
    tbar: "",

    initComponent: function () {
        var me = this;
        //_____________初始化开始_____________
        //统一标题
        if (this.title != "") {
            this.title = '<span class="normal_title">' + this.title + '</span>';
        }

        if (this.tbar == "") {
            this.tbar = [];
        }

        //添加展开所有按钮
        this.tbar.push({
            text: '展开',
            tooltip: '展开所有节点',
            iconCls: 'expand-allIcon',
            handler: this.event_expandAll,
            scope: this
        });

        //添加折叠所有按钮
        this.tbar.push({
            text: '折叠',
            tooltip: '折叠所有节点',
            iconCls: 'collapse-allIcon',
            handler: this.event_collapseAll,
            scope: this
        });

        //添加刷新按钮
        this.tbar.push({
            text: '刷新',
            iconCls: 'arrow_refreshIcon',
            handler: this.event_refreshAll,
            scope: this
        });
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
    //展开全部
    event_expandAll: function () {
        var me = this;
        me.getEl().mask('正在展开所有树节点...');
        var toolbar = me.down('toolbar');
        me.expandAll(function () {
            me.getEl().unmask();
        });
    },
    //折叠全部
    event_collapseAll: function () {
        var me = this;
        var toolbar = me.down('toolbar');

        me.collapseAll();
    },
    //刷新全部
    event_refreshAll: function () {
        this.store.load();
    }
});
