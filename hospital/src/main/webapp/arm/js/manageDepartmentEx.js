//设置部门管理角色 - 扩展
function manageRoleSet(pDeptid) {
    var managePanel = new Ext.form.Panel({
        layout: "form",
        labelWidth: 75,
        bodyStyle: "padding:10px;padding-top:20px;",
        defaultType: 'textfield',
        labelAlign: 'right',
        items: [
            {
                fieldLabel: '主　　管',
                id: 'director',
                name: 'director',
                readOnly: true,
                anchor: '100%',
                listeners: {
                    focus: function () {
                        var us = new UserSelect();
                        us.makePanelForWindow({
                            title: "部门主管选择",
                            foruseridCmpId: "directorid",
                            forusernameCmpId: "director"
                        });
                    }
                }
            },
            {
                fieldLabel: '日常主管',
                id: 'usualdirector',
                name: 'usualdirector',
                readOnly: true,
                anchor: '100%',
                listeners: {
                    focus: function () {
                        var us = new UserSelect();
                        us.makePanelForWindow({
                            title: "部门日常主管选择",
                            foruseridCmpId: "usualdirectorid",
                            forusernameCmpId: "usualdirector"
                        });
                    }
                }
            },
            {
                id: 'directorid',
                name: 'directorid',
                hidden: true,
                anchor: '100%'
            },
            {
                id: 'usualdirectorid',
                name: 'usualdirectorid',
                hidden: true,
                anchor: '100%'
            }
        ],
        border: false
    });
    Ext.Msg.wait('正在提交数据……', '请稍候', {
        animate: true
    });
    Ext.Ajax.request({
        url: "./organization.ered?reqCode=queryDeptManagerByDeptid",
        method: 'post',
        params: {"deptid": pDeptid},
        success: function (response, options) {
            Ext.Msg.hide();
            var o = Ext.JSON.decode(response.responseText);
            if (o) {
                var count = o.length;
                for (var i = 0; i < count; i++) {
                    if (o[i].roletype == "1") {
                        Ext.getCmp("director").setValue(o[i].username);
                        Ext.getCmp("directorid").setValue(o[i].userid);
                    }
                    else if (o[i].roletype == "2") {
                        Ext.getCmp("usualdirector").setValue(o[i].username);
                        Ext.getCmp("usualdirectorid").setValue(o[i].userid);
                    }
                }
            }
            var manageWin = new Ext.window.Window({
                title: '部门管理人员设置',
                width: 300,
                height: 170,
                layout: 'form',
                closeAction: "destroy",
                plain: true,
                modal: true,
                buttonAlign: 'right',
                defaultType: 'textfield',
                bodyStyle: 'background-color:#FFF',
                items: [managePanel],
                buttons: [
                    {
                        text: '清空', iconCls: 'tbar_synchronizeIcon', handler: function () {
                        Ext.getCmp("director").setValue("");
                        Ext.getCmp("directorid").setValue("");
                        Ext.getCmp("usualdirector").setValue("");
                        Ext.getCmp("usualdirectorid").setValue("");
                    }
                    },
                    {
                        text: '确认', iconCls: 'acceptIcon', handler: function () {
                        var directorid = Ext.getCmp("directorid").getValue();
                        var usualdirectorid = Ext.getCmp("usualdirectorid").getValue();
                        saveDeptManager({
                            "deptid": pDeptid,
                            "directorid": directorid,
                            "usualdirectorid": usualdirectorid
                        });
                    }
                    }
                ]
            });
            manageWin.show();
        },
        failure: function (response, options) {
            Ext.Msg.hide();
            Ext.MessageBox.alert('提示', response.responseText);
        }
    });
}
//保存部门管理人
function saveDeptManager(d) {
    Ext.Msg.wait('正在提交数据……', '请稍候', {
        animate: true
    });
    Ext.Ajax.request({
        url: "./organization.ered?reqCode=saveDeptManager",
        method: 'post',
        params: d,
        success: function (response, options) {
            Ext.Msg.hide();
            var o = Ext.JSON.decode(response.responseText);
            Ext.MessageBox.alert('提示', o.data.msg);
        },
        failure: function (response, options) {
            Ext.Msg.hide();
            Ext.MessageBox.alert('提示', response.responseText);
        }
    });
}