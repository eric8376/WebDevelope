/**
 * 编程环境 IDEA.
 * 编写者: 王少伟
 * 主题:【公共包-Window类2】
 * 时间: 2013-06-26  下午3:36
 *
 * ----------------描述-----------------
 *  可关闭的窗体，关闭策略隐藏，可缩小，放大，有遮挡层
 */

Ext.define('sunShine.common.UXWindow2', {
    extend: 'Ext.window.Window',

    title: '',
    closable: true,
    closeAction: 'hide',
    constrain: true,
    maximizable: true,
    collapsible: true,
    modal: true,
    animateTarget: animateTarget,
    buttons: [],
    initComponent: function () {
        var me = this;

        //统一外观
        this.title = "<span class=\"normal_title\" style=\"color:rgba(16,22,255,0.64);\">" + this.title + "</span>";
        this.iconCls = "folder_wrenchIcon";

        //指定显示坐标
        this.pageX = document.body.clientWidth / 2 - this.width / 2 + "";// 页面定位X坐标
        this.pageY = 20; // 页面定位Y坐标

        //增加取消按钮
        if (this.buttons.length == 0) {
            this.buttons = [];
        }
        this.buttons.push({
            text: '取消', iconCls: 'window_caise_listIcon', handler: function () {
                this.hide();
            }, scope: this
        });

        me.callParent(arguments);
    },
    setTitle: function (title, iconCls) {
        this.title = "<span class=\"normal_title\"  style=\"rgba(16,22,255,0.64);\">" + title + "</span>";

        if (this.header && this.headerAsText) {
            this.header.child('span').update(this.title);
        }
        if (iconCls) {
            this.setIconClass(iconCls);
        }
        this.fireEvent('titlechange', this, title);
        return this;
    }
});
