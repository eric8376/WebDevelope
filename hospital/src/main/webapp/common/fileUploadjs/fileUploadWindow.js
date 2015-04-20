/**
 * Created by Administrator on 2014/4/29.
 */



function uploadFilePanel(info) {
    if (!info.file_folder) {
        alert('您没有设置[file_folder],目录ID');
        return null;
    }
    return new Ext.form.Panel({
        region: 'center',
        title: '<span class="commoncss">上传文件</span> ',
        fileUpload: true,
        border: false,
//            bodyStyle : 'padding: 10px;',
        layout: 'fit',

        id: 'uploadFileFormPanel',
        items: [
            {
                layout: 'column',
                anchor: '100%',
                border: false,
                items: [
                    {
                        layout: 'form',
                        columnWidth: 0.8,
                        border: false,
                        id: 'uploadFileForm',
                        items: [
                            {
                                xtype: 'fileuploadfield',
                                name: 'file1',
                                id: 'uploadFileId',
                                columnWidth: 0.8,
                                buttonText: '选择文件',
                                fieldLabel: '选择文件',
                                border: false,
                                clearOnSubmit: false,
//                                tpl : info.buttonTpl==null?"":info.buttonTpl,
//                                tplWriteMode:'Append',
                                anchor: '100%',
                                onFileChange: function (button, e, value, field) {
                                    var point = value.lastIndexOf(".") + 1;
                                    var type = value.substr(point);
                                    var yes = false;
                                    if (info.type != "*.*" && info.type != null) {
                                        if (Ext.isArray(info.type)) {
                                            Ext.each(info.type, function (v) {
                                                if (v == type)
                                                    yes = true;
                                            }, this)
                                        } else if (info.type == type) {
                                            yes = true;
                                        } else if (info.type != type) {
                                            Ext.MessageBox.alert('提示', '您选择的文件不符合类型');
                                            return;
                                        }
                                    }
                                    if (yes) {
                                        this.lastValue = null;
                                        Ext.form.field.File.superclass.setValue.call(this, value);
                                    } else {
                                        Ext.MessageBox.alert('提示', '您选择的文件不符合类型');
                                        return;
                                    }


                                }
                            }
                        ]
                    },
                    {
                        xtype: 'button',
                        text: '上传文件',
                        columnWidth: 0.2,
                        style: 'border-width: 0px; width: 78px;margin-top: 5px;margin-left: 0px;',
                        border: false,
                        anchor: '100%',
                        handler: function () {
                            var frm = Ext.getCmp('uploadFileFormPanel').getForm();
                            if (!frm.isValid()) {
                                return;
                            }
                            if (frm.isValid()) {
//                                    checkFiledOverSize(document.getElementById('uploadFileId'));
//                                    if (type == ".jpg" || type == ".gif"
//                                        || type == ".JPG" || type == ".GIF") {
//                                        // todo
//                                    } else {
//                                        Ext.MessageBox.alert('提示',
//                                            '只支持上传jpg和gif格式的图片文件');
//                                        return;
//                                    }
                                frm.submit({
                                    url: 'CMAppendixAction.ered?reqCode=addAppendix',
                                    waitTitle: '提示',
                                    method: 'POST',
                                    waitMsg: '正在上传文件,请稍候...',
                                    timeout: 60000, // 60s
                                    success: function (form, action) {
//                                        aUrl = action.result.aUrl;
                                        Ext.MessageBox.alert('提示',
                                            action.result.msg);
                                        Ext.getCmp(info.saveIdPaenId).setValue(action.result.fileId);
                                        return;
                                    },
                                    failure: function (action) {
                                        Ext.MessageBox.alert('提示',
                                            '文件过大,请查看');
                                        return;
                                    },
                                    params: {
                                        file_folder: info.file_folder,
                                        file_size: info.file_size
                                    },
                                    scope: this
                                });
                            }
                        }
                    }
                ]

            }
        ]
    });

}


