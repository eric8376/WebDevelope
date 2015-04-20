Ext.onReady(function() {
    var window = new Ext.window.Window({
        width: 650,
        title: 'swfUpload demo',
        height: 300,
        layout: 'fit',
        renderTo: Ext.getBody(),
        items: [
            Ext.create('Ext.ux.uploadPanel.UploadPanel', {
                addFileBtnText: '选择文件',
                uploadBtnText: '上传',
                removeBtnText: '移除所有文件',
                cancelBtnText: '取消上传',
                upload_url: "test"//这里的是我定义了三个要传的参数
            })
        ]
    }).show();
})