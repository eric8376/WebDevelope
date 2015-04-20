/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 14-4-6
 * Time: 下午11:15
 * To change this template use File | Settings | File Templates.
 */


Ext.define("Ext.ux.tree.ComboboxTree", {
    extend : "Ext.form.field.Picker",
    requires : ["Ext.tree.Panel"],
    initComponent : function() {
        var self = this;
        Ext.apply(self, {
            fieldLabel : self.fieldLabel,
            labelWidth : self.labelWidth
        });
        self.callParent();
    },
    createPicker : function() {
        var self = this;
        var store = self.store?self.store:Ext.create('Ext.data.TreeStore', {
            proxy : {
                type : 'ajax',
                url : self.storeUrl
            },
            sorters : [{
                property : 'leaf',
                direction : 'ASC'
            }, {
                property : 'text',
                direction : 'ASC'
            }],
            root : {
                id : self.rootId,
                text : self.rootText
            },
            nodeParameter : self.treeNodeParameter
        });
        self.picker = new Ext.tree.Panel({
            height : 300,
            autoScroll : true,
            floating : true,
            focusOnToFront : false,
            shadow : true,
            ownerCt : this.ownerCt,
            useArrows : true,
            store : store,
            rootVisible : false
        });
        self.picker.on({
            checkchange : function() {
                var records = self.picker.getView().getChecked(), names = [], values = [];
                Ext.Array.each(records, function(rec) {
                    names.push(rec.get('text'));
                    values.push(rec.get('id'));
                });
                self.setRawValue(values.join(';'));// 隐藏值
                self.setValue(names.join(';'));// 显示值
            }
        });
        return self.picker;
    },
    alignPicker : function() {
        var me = this, picker, isAbove, aboveSfx = '-above';
        if (this.isExpanded) {
            picker = me.getPicker();
            if (me.matchFieldWidth) {
                picker.setWidth(me.bodyEl.getWidth());
            }
            if (picker.isFloating()) {
                picker.alignTo(me.inputEl, "", me.pickerOffset);// ""->tl
                isAbove = picker.el.getY() < me.inputEl.getY();
                me.bodyEl[isAbove ? 'addCls' : 'removeCls'](me.openCls
                    + aboveSfx);
                picker.el[isAbove ? 'addCls' : 'removeCls'](picker.baseCls
                    + aboveSfx);
            }
        }
    }
});