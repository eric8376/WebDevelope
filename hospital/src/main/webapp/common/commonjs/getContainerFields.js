//获取面板中所有字段的值
function getpanelfieldvalues(fatherpanel) {
    var o = {},
        key,
        val;
    //如果items为空，那么，如果不为button和label就是基本组件了
//    if(fatherpanel.items)
//    {
    if (Ext.isEmpty(fatherpanel.items)) {
        var componentxtype = fatherpanel.xtype;
        if (!componentxtype) {
            componentxtype = fatherpanel.getXType();
        }
        if (componentxtype == 'panel') {
            return;
        }
        if (componentxtype == 'radio') {
            if (fatherpanel.checked == false) {
                return;
            } else {
                key = fatherpanel.getName();
                val = fatherpanel.value;
                o[key] = val;
                return o;
            }
        }
        else if (componentxtype == 'button' || componentxtype == 'label' || !componentxtype || componentxtype == 'grid') {
            return;
        }
        if (componentxtype == 'datefield') {
            key = fatherpanel.getName();
            val = fatherpanel.value;
        } else {
            key = fatherpanel.getName();
            val = fatherpanel.getValue();
        }

        if (Ext.isEmpty(val)) {
            val = '';
        }
        o[key] = val;
    }
    else {
        for (var i = 0; i < fatherpanel.items.length; i++) {
            if (fatherpanel.items.items[i].isXType('radiogroup')) {
                key = fatherpanel.items.items[i].getName();
                for (var i = 0; i < fatherpanel.items.items[0].items.length; i++) {
                    var radio_obj = fatherpanel.items.items[0].items.items[i];
                    if (radio_obj.checked) {
                        val = radio_obj.value;
                        o[key] = val;
                    }
                }


            } else {
                var temp;
                temp = getpanelfieldvalues(fatherpanel.items.items[i]);
                Ext.apply(o, temp);
            }

        }
    }
//    }
    return o;
}
/**
 * 获取列表的数据
 * @return {*}
 */
function getgriddata(gridpanelID, the_component) {
    o = {};
    var grid_panel = Ext.isEmpty(the_component) ? Ext.getCmp(gridpanelID) : the_component;
    if (!Ext.isEmpty(grid_panel)) {
        var datastore = grid_panel.getStore();
        if (datastore.getCount() != 0) {
            var records = new Array();
            for (var i = 0; i < datastore.getCount(); i++) {
                records.push(datastore.getAt(i).data);
            }
            var gridpaneldata = Ext.JSON.encode(records);
            eval("o." + gridpanelID + "=gridpaneldata");
        }
    }
    return o;
}
/**
 * 加载附件数据
 * @param AppendixId
 * @param Storeid
 */
function reloadAppendixData(AppendixId, Storeid) {
    if (Ext.getCmp(AppendixId)) {
        Ext.getCmp(AppendixId).getGridPanel().to_id = Storeid;
        Ext.getCmp(AppendixId).getStore().getProxy().extraParams.to_id = Storeid;
        Ext.getCmp(AppendixId).getStore().reload();
    }
}
/**
 * 绑定附件
 * @param AppendixId
 * @param Storeid
 * @constructor
 */
function BindAppendixData(AppendixId, Storeid, backfun) {
    if (Ext.getCmp(AppendixId)) {
        Ext.getCmp(AppendixId).getGridPanel().addBind(Storeid);
        Ext.getCmp(AppendixId).getStore().reload({
            callback: function () {
                if (backfun) {
                    backfun();
                }

            }
        });
    }
}
/**
 * 解除附件绑定
 * @param AppendixId
 * @param Storeid
 * @constructor
 */
function RemoveBindAppendixData(AppendixId, Storeid) {
    if (Ext.getCmp(AppendixId)) {
        if (Storeid) {
            Ext.getCmp(AppendixId).getGridPanel().removeBind(Storeid);
        }
        changeAppendixModel(AppendixId, false);
    }
}
