/**
 * Created by Administrator on 2014/4/29.
 */

Ext.onReady(function () {

    var checkWin = checkFilePanel({fileId: 'name1', fileName: 'name2'});

    //加入fileUploadWindow.js ,
    // 并带入其中参数，
    // file_folder为文件夹ｉｄ，
    // 在eafilefolder表中存在，若没有此文件夹，请根据需要加入相应文件夹，系统会自动创建对应的文件夹
    // ｔｙｐｅ为限定扩展名，可不设
    // 格式如  ['dll','exe']  'exe' '*.*'
    // file_size为大小，无单位则以ｂｙｔｅ为单位，
    // 格式如　'100' '100K' '100M'  '100G'
    // 此方法会返回一个formpanel，如需扩展，请联系小吴同学，谢谢合作。
    var uploadWin = uploadFilePanel({
        file_folder: '001001',
        type: ['dll', 'exe'],
        file_size: '100M',
        saveIdPaenId: 'name3'
    });

    var firstForm = new Ext.form.Panel({
        id: 'firstForm',
        region: 'north',
        name: 'firstForm',
        labelWidth: 65, // 标签宽度
        // frame : true, // 是否渲染表单面板背景色
        defaultType: 'textfield', // 表单元素默认类型
        labelAlign: 'right', // 标签对齐方式
        bodyStyle: 'padding:5 5 5 5', // 表单元素和表单面板的边距
        items: [{
            fieldLabel: '选择文件ID', // 标签
            id: 'name1',
            name: 'name1', // name:后台根据此name属性取值
            // 添加一个监听事件
            listeners: {
                'focus': function (obj) {
                    checkWin.show();
                }
            },
            anchor: '100%' // 宽度百分比
        }, {
            fieldLabel: '选择文件名称', // 标签
            id: 'name2',
            name: 'name2', // name:后台根据此name属性取值
            listeners: {
                'focus': function (obj) {
                    checkWin.show();
                }
            },
            anchor: '100%' // 宽度百分比
        }, {
            fieldLabel: '上传文件返回的ID', // 标签
            id: 'name3',
            name: 'name3', // name:后台根据此name属性取值
            listeners: {
                'focus': function (obj) {
                    checkWin.show();
                }
            },
            anchor: '100%' // 宽度百分比
        }]
    });

//    var firstForm = new Ext.form.Panel({
//        id : 'firstForm',
//        name : 'firstForm',
//        labelWidth : 65, // 标签宽度
//        // frame : true, // 是否渲染表单面板背景色
//        defaultType : 'textfield', // 表单元素默认类型
//        labelAlign : 'right', // 标签对齐方式
//        bodyStyle : 'padding:5 5 5 5', // 表单元素和表单面板的边距
//        items : [{
//            fieldLabel : '普通文本1', // 标签
//            id : 'name1',
//            name : 'name1', // name:后台根据此name属性取值
//            // 添加一个监听事件
//            listeners : {
//                'focus' : function(obj) {
//                    checkWin.show();
//                }
//            },
//            anchor : '100%' // 宽度百分比
//        }, {
//            fieldLabel : '普通文本2', // 标签
//            id : 'name2',
//            name : 'name2', // name:后台根据此name属性取值
//            listeners : {
//                'focus' : function(obj) {
//                    checkWin.show();
//                }
//            },
//            anchor : '100%' // 宽度百分比
//        }]
//    });

    var firstWindow = new Ext.window.Window({
        title: '<span class="commoncss">文件选择框测试</span>', // 窗口标题
        layout: 'border', // 设置窗口布局模式
        width: 400, // 窗口宽度
        height: 250, // 窗口高度
        closable: false, // 是否可关闭
        collapsible: true, // 是否可收缩
        maximizable: true, // 设置是否可以最大化
        border: false, // 边框线设置
        constrain: true, // 设置窗口是否可以溢出父容器
        pageY: 20, // 页面定位X坐标
        pageX: document.body.clientWidth / 2 - 400 / 2, // 页面定位Y坐标
        items: [firstForm, uploadWin], // 嵌入的表单面板
        buttons: [{ // 窗口底部按钮配置
            text: '重置', // 按钮文本
            iconCls: 'tbar_synchronizeIcon', // 按钮图标
            handler: function () { // 按钮响应函数
                firstForm.getForm().reset();
            }
        }]
    });
    firstWindow.show(); // 显示窗口


})
