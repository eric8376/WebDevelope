/**
 * Created by 黄琦鸿 on 2014/7/15.
 * 选择图片。含缩略图，自动按比例缩小
 */

Ext.define('Ext4.Com.Other.scaleimg.ScaleImg', {
    extend: 'Ext.container.Container',
    width_preview: 100,//图片预览的宽度
    height_preview: 100,//图片预览的高度
    buttonText: '选择图片',
    fieldLabelText: '',
    readonly: false,
    layout: 'form',
    initComponent: function () {
        var me = this;
        var fileField = new Ext.form.field.File({
            buttonText: me.buttonText,
            name: 'coverImgFile',
            itemId: 'coverImgFile',
            fieldLabel: me.fieldLabelText,
            regex: new RegExp("^.*\.jpg|.*\.jpeg|.*\.png|.*\.bmp$", "i"),
            regexText: '只支持jpg、jpeg、png、bmp',
            buttonConfig: {
                iconCls: 'acceptIcon',
                hidden: me.readonly
            },
            anchor: '100%',
            margin: '10 0 0 0',
            listeners: {
                change: function (btn, v, e) {
                    var img_reg = /\.([jJ][pP][gG]){1}$|\.([jJ][pP][eE][gG]){1}$|\.([gG][iI][fF]){1}$|\.([pP][nN][gG]){1}$|\.([bB][mM][pP]){1}$/;
                    if (img_reg.test(v)) {
                        //如果是IE
                        if (Ext.isIE) {
                            me.cover.setSrc(Ext.BLANK_IMAGE_URL);  //覆盖原来的图片
                            var fileDom = btn.fileInputEl.dom;
                            fileDom.select();
                            me.cover.imgEl.dom.filters.item('DXImageTransform.Microsoft.AlphaImageLoader').src = document.selection.createRange().text;
                        } else {
                            //支持FF，Chrome
                            var file = btn.fileInputEl.dom.files[0];
                            var url = URL.createObjectURL(file);  //通过createObjectURL获取url
                            me.cover.setSrc(url);
                        }
                    } else {
//                        me.coverPanel.hide();
                        Ext.Msg.alert('提示', '请选择图片类型的文件！');
                        return;
                    }
                }
            }
        });
        var cover = Ext.create('Ext.Img', {
            src: Ext.BLANK_IMAGE_URL,
            itemId: 'cover',
            name: 'coverImg', border: true,
            listeners: {
                scope: this,
                el: {
                    load: function () {
                        //获取选中图片的尺寸
                        var imgwidth = this.dom.naturalWidth;
                        var imgheight = this.dom.naturalHeight;
                        if (imgwidth > 1) {
                            //调用缩略图片的方法将图片缩略
                            me.drawimage(imgwidth, imgheight)
                            //img所在面板显示，如果选中的文件类型不符合要求面板会隐藏。所以这里要显示一下
//                            me.coverPanel.show();
                        }

                    }, click: function () {
                        alert('显示图片原始大小，待开发')
                    }
                }
            }
        });
        var coverPanel = new Ext.panel.Panel({
            border: false, itemId: 'coverPanel', layout: {
                type: 'hbox',
                pack: 'end',
                align: 'middle'
            }, items: [
                {
                    xtype: 'form',
                    layout: 'absolute',
                    width: me.width_preview,
                    height: me.height_preview,
                    items: [cover]
                }
            ]
        })
        me.callParent(arguments);
        //_____________初始化结束_____________
        me.cover = cover;
        me.coverPanel = coverPanel;
        me.coverImgFile = fileField;
    },
//图片的按比例缩小代码:
    drawimage: function (imgwidth, imgheight) {
        var me = this;
        var scaleW = me.width_preview / imgwidth;
        var scaleH = me.height_preview / imgheight;
        var scale = 1;
        if (scaleW < scaleH) {
            scale = scaleW;
        }
        else {
            scale = scaleH;
        }
        if (scale < 1) {
            var tarWidth = imgwidth * scale;
            var tarHeight = imgheight * scale;
            me.cover.setSize(tarWidth, tarHeight);
            me.cover.setPosition((me.width_preview - tarWidth) / 2,
                (me.height_preview - tarHeight) / 2);
        } else {
            me.cover.setSize(imgwidth, imgheight);
            me.cover.setPosition((me.width_preview - imgwidth) / 2,
                (me.height_preview - imgheight) / 2);
        }

    },
    //组件重置
    resetData: function () {
        var me = this;
        me.cover.setSrc(Ext.BLANK_IMAGE_URL);  //覆盖原来的图片
//        me.coverImgFile.initValue();
//        me.coverPanel.hide();
    },
    //缩略图组件加载图片
    loadImg: function (data) {
        var me = this;
        var url = 'CMAppendixAction.ered?reqCode=downAppendix&to_id=' + data.to_id + '&fileKey=' + data.fileKey + '&type=' + data.type + '';
        me.cover.setSrc(url);  //覆盖原来的图片
    },
    //获取显示缩略图的组件
    getCoverPanel: function () {
        return this.coverPanel;
    },
    getFileField: function () {
        return this.coverImgFile
    }
})








