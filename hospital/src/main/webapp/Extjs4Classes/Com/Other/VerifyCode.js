/**
 *<pre>验证码组件</pre>
 *<br>
 *<pre>所属模块：通用模块</pre>
 * @author 黄琦鸿
 *创建于  2014/8/26 13:04.
 */
Ext.define('Ext4.Com.Other.VerifyCode', {
    extend: 'Ext.form.field.Trigger',
    // 图片的URL地址
    codeImgUrl: Ext.BLANK_IMAGE_URL,
    // 图片和输入框之间的距离
    imgMargin: 5,
    // 图片的宽度
    imgWidth: 75,
    // 图片的高度
    imgHeight: 23,
    // 点击图片的时候是否清空输入框
    clearOnClick: true,
    // 临时的FieldBody样式
    extraFieldBodyCls: Ext.baseCSSPrefix + 'form-file-wrap',
    componentLayout: 'triggerfield',
    childEls: ['imageWrap'],

    onRender: function () {
        var me = this, id = me.id, inputEl;

        me.callParent(arguments);

        inputEl = me.inputEl;

        // name goes on the fileInput, not the text input
        inputEl.dom.name = '';

        // 将imgConfig对象拷贝给前一个参数，并覆盖
        me.image = new Ext.Img(Ext.apply({
            renderTo: id + '-imageWrap',
            ownerCt: me,
            ownerLayout: me.componentLayout,
            id: id + '-img',
            ui: me.ui,
            src: me.codeImgUrl + '&time=' + new Date().getTime(),
            disabled: me.disabled,
            width: me.imgWidth,
            height: me.imgHeight,
            style: me.getImgMarginProp() + me.imgMargin + 'px;cursor:pointer;',
            inputName: me.getName(),
            listeners: {
                scope: me,
                click: {
                    element: 'el',
                    fn: me.onImgClick
                }
            }
        }, me.imgConfig));
        // me.browseButtonWrap.dom.style.width =
        // (me.browseButtonWrap.dom.lastChild.offsetWidth +
        // me.button.getEl().getMargin('lr')) + 'px';

        me.imageWrap.dom.style.width = (me.imgWidth + me.image.getEl()
            .getMargin('lr'))
        + 'px';
        if (Ext.isIE) {
            me.image.getEl().repaint();
        }
    },

    /**
     * Gets the markup to be inserted into the subTplMarkup.
     */
    getTriggerMarkup: function () {
        return '<td id="' + this.id + '-imageWrap"></td><td style="font-size: 11px;width: 90px"><a href="#" style="margin-left:5px;" onclick="(' + this.onImgClick + ')(null,null,null,\'' + this.id + '\')">看不清，换一张</a></td>';
    },

    onImgClick: function (obj, el, elobj, id) {
        var me = this;
        if (id) {
            me = Ext.getCmp(id);
        }
        // 重新定义图片地址
        me.image.setSrc(me.codeImgUrl + '&time=' + new Date().getTime());
        me.reset();
    },
    getImgMarginProp: function () {
        return 'margin-left:';
    },

    setValue: Ext.emptyFn,

    reset: function () {
        var me = this, clear = me.clearOnClick;
        if (me.rendered) {
            if (clear) {
                me.inputEl.dom.value = '';
            }
        }
    }

});