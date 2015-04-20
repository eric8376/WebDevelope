/**
 * 编程环境 IDEA.
 * 编写者: 王少伟
 * 主题:【公共包-Window类1】
 * 时间: 2013-06-26  下午3:36
 *
 * ----------------描述-----------------
 *  不可关闭的窗体，可缩小，放大
 */

Ext.define('sunShine.common.UXWindow1', {
    extend: 'Ext.window.Window',

    title: '',
    closable: false,
    constrain: true,
    maximizable: true,
    modal: true,
    collapsible: true,
    animateTarget: document.body,
    initComponent: function () {
        var me = this;

        //统一外观
        this.title = "<span class=\"normal_title\" style=\"color:rgba(0,0,255,0.85);\">" + this.title + "</span>";
        this.iconCls = "folder_userIcon";
        this.width = document.body.clientWidth - 40;
        this.height = document.body.clientHeight - 40;

        //指定显示坐标
        this.pageX = 20; // 页面定位X坐标
        this.pageY = 20; // 页面定位Y坐标

        me.callParent(arguments);
    }
});
