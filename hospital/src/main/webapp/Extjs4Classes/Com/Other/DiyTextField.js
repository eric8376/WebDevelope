/**
 *<pre>自定义文本框组件</pre>
 *<br>
 *<pre>所属模块：</pre>
 * @author 黄琦鸿
 *创建于  2014/9/11 10:31.
 */

Ext.define('Ext4.Com.Other.DiyTextField', {
    extend: 'Ext.form.field.Trigger',
    // 图片和输入框之间的距离
    msgMargin: 5,
    // 图片的宽度
    msgWidth: 90,
    validator: '',
    // 图片的高度
    msgHeight: 23,
    // 临时的FieldBody样式
    extraFieldBodyCls: Ext.baseCSSPrefix + 'form-file-wrap',
    componentLayout: 'triggerfield',
    childEls: ['msglabelWrap'],
    onRender: function () {
        var me = this, id = me.id, inputEl;
        me.callParent(arguments);
        inputEl = me.inputEl;
        // name goes on the fileInput, not the text input
        inputEl.dom.name = '';
        // 将imgConfig对象拷贝给前一个参数，并覆盖
        me.msglabel = new Ext.form.Label({
            renderTo: id + '-msglabelWrap',
            ownerCt: me,
            ownerLayout: me.componentLayout,
            id: id + '-img',
            ui: me.ui,
            hidden: true,
            width: me.msgWidth,
            height: me.msgHeight,
            border: 1,
            style: {
                borderColor: 'red',
                fontSize: 10,
                marginLeft: me.msgMargin,
                borderStyle: 'solid'
            },
            inputName: me.getName()
        });
        me.setWidth(me.getWidth() + me.msgWidth + me.msglabel.getEl().getMargin('lr'));
        me.msglabelWrap.setWidth(me.msgWidth + me.msglabel.getEl().getMargin('lr'));
        if (Ext.isIE) {
            me.msglabel.getEl().repaint();
        }
        me.on('change', function (textfield, newValue, oldValue, eOpts) {
            var errors;
            if (me.validator != '') {
                errors = me.validator(newValue);
            }
            if (Ext.isEmpty(errors) || errors == true) {
                me.msglabel.hide();
            } else {
                me.msglabel.setText(errors);
                me.msglabel.show()
            }
        })
        me.on('errorchange', function (textfield, error, eOpts) {
            var errors = me.getErrors();
            if (Ext.isEmpty(errors) || errors == true) {
                me.msglabel.hide();
            } else {
                me.msglabel.setText(Ext.isEmpty(errors[0]) ? errors[1] : errors[0]);
                me.msglabel.show()
            }
        });
    },
    /**
     * Gets the markup to be inserted into the subTplMarkup.
     */
    getTriggerMarkup: function () {
        return '<td id="' + this.id + '-msglabelWrap"></td>';
    },
    setValue: Ext.emptyFn

});