/**
 *显示各个任务节点窗口
 */
function show_gcxd_window(Storeid) {
    var gcxd = new makegcxdForm();
    var window_gcxd = new Ext.Window({
        title: '店面:' + Storeid + '下工程单',
        width: 850,
        layout: 'fit',
        modal: true,
        closeAction: 'close',
        height: parseInt(document.body.clientHeight * 0.9),
        resizable: false,
        plain: true
    });
    gcxd.backfunction = function showWindow() {
        window_gcxd.show();
    };
    gcxd.Storeid = Storeid;
    var t = gcxd;
    var panl = new flowPanel({processKey: "myProcess", activityId: "start"}, {
        renderingsPayments: "1",
        editstatus: "3"
    }, function () {
        window_gcxd.close();
    }, t);
    window_gcxd.add(panl.getMakedPanel());
    window_gcxd.show();
}