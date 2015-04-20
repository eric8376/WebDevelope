/**
 * 编程环境 IDEA.
 * 编写者: 王少伟
 * 主题:【设计部人员工作安排查询】
 * 时间: 2013-06-10 下午4:36
 */

var AD_UWSQ = {};
AD_UWSQ.treeRootId = "root-001009";


//--------------------------------显示
Ext.onReady(function () {
    AD_UWSQ.mainWin = new UWSQ.statusQueryWin();
    AD_UWSQ.mainWin.tree1.setRootNode(new Ext.tree.AsyncTreeNode({
        id: AD_UWSQ.treeRootId,
        text: '根目录',
        expanded: true
    }));
    AD_UWSQ.mainWin.show();
});

