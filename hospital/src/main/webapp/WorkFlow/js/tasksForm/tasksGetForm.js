function makeProcessLogForm(theStoreId, projectid) {
    var thisItem = null;
    var ItemPanel = null;
    this.Init = function () {
        thisItem = this;
    }
    this.makeForm = function () {
        this.ItemPanel = new Ext.comprehensivePanel({StoreId: theStoreId, projectid: projectid});
        return this.ItemPanel;
    }
    this.saveFormData = function (params, postBackFuntion) {
    }
    this.getFormData = function () {
    }
    this.loadFormData = function (projectid, backfunction) {
    }
    this.Init();
}
function getnextCheckRecord(back) {
    Ext.Ajax.request({
        url: 'WorkFlowAction.ered?reqCode=flowLinkProjectTodoByUserId',
        success: function (response) {
            var result = Ext.JSON.decode(response.responseText);
            if (result.error) {
                Ext.Msg.show({
                    title: '提示',
                    msg: result.error,
                    buttons: Ext.Msg.OK,
                    icon: Ext.MessageBox.WARNING
                });
                result.success = false;
            } else {
                if (back) {
                    back(result.ROOT[0])
                }
            }

        },
        failure: function () {
            Ext.Msg.show({
                title: '提示',
                msg: '数据传输失败，请联系相关人员',
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.WARNING
            });
        },
        params: {start: 0, limit: 1, title: '手卫记录审核'},
        timeout: 3000000
    });

}
function makeVerifyCheckRecordForm(theStoreId, projectid) {
    var thisItem = null;
    var ItemPanel = null;
    var dataerror = false;
    this.Init = function () {
        thisItem = this;
    }
    this.makeForm = function (record) {
        this.ItemPanel = new Ext4.HOS.Panel.CheckInfo_Panel({
            isReadOnly: true,
            width: 600,
            height: 330,
            check_type: record.get('check_type'),
            forVerify: true
        })
        return this.ItemPanel;
    }
    this.saveFormData = function (params, postBackFuntion) {
        var me = this;
        if (this.dataerror) {
            Ext.Msg.alert('提示', '数据有误，无法提交');
            return;
        }
        if (this.ItemPanel.getForm().isValid()) {
            var par = this.ItemPanel.getForm().getValues();
            Ext.apply(params, par);
            Ext.Ajax.request({
                url: 'HospitalManageAction.ered?reqCode=doVerifyCheckRecordInfo',
                success: function (response) {
                    var result = Ext.JSON.decode(response.responseText);
                    if (result.error) {
                        Ext.Msg.show({
                            title: '提示',
                            msg: result.error,
                            buttons: Ext.Msg.OK,
                            icon: Ext.MessageBox.WARNING
                        });
                        result.success = false;
                    } else {
                        postBackFuntion(true, true);
                        getnextCheckRecord(
                            function (data) {
                                if (Ext.isEmpty(data)) {
                                    Ext.Msg.show({
                                        title: '提示',
                                        msg: '没有需要审核的下一条数据',
                                        buttons: Ext.Msg.OK,
                                        icon: Ext.MessageBox.WARNING,
                                        fn: function () {
                                            postBackFuntion(true, false);
                                        }
                                    });

                                } else {
//                                               me.defaultParam  = {proc_inst_id_: data.proc_inst_id_,
//                                                   assignee:data.assignee_,
//                                                   activityId: data.task_def_key_,
//                                                   processKey:  data.key_,
//                                                   processId: data.id_,
//                                                   taskId: data.taskid,
//                                                   nodeId:data.taskname,
//                                                   businessKey: data.business_key_};
//                                               me.inVariables = {userStatus: "1"};
//                                               me.loadFormData(data.business_key_)
                                    postBackFuntion(true, false);
                                    handle(new Ext4.Com.Model.flowLinkProjectTodoByUserId_Model(data))
                                }

                            }
                        )
                        /*   Ext.Msg.show({
                         title: '请选择',
                         msg: result.success+',请选择后续操作',
                         buttons: Ext.Msg.YESNO,
                         buttonText: {
                         yes: '审核下一条',
                         no: '关闭'
                         },
                         fn: function (buttonId, text, opt) {
                         if (buttonId == 'yes') {
                         getnextCheckRecord(
                         function(data){
                         if(Ext.isEmpty(data))
                         {
                         Ext.Msg.show({
                         title: '提示',
                         msg: '没有需要审核的数据',
                         buttons: Ext.Msg.OK,
                         icon: Ext.MessageBox.WARNING,
                         fn:function(){
                         postBackFuntion(true,false);
                         }
                         });

                         }else{
                         //                                               me.defaultParam  = {proc_inst_id_: data.proc_inst_id_,
                         //                                                   assignee:data.assignee_,
                         //                                                   activityId: data.task_def_key_,
                         //                                                   processKey:  data.key_,
                         //                                                   processId: data.id_,
                         //                                                   taskId: data.taskid,
                         //                                                   nodeId:data.taskname,
                         //                                                   businessKey: data.business_key_};
                         //                                               me.inVariables = {userStatus: "1"};
                         //                                               me.loadFormData(data.business_key_)
                         postBackFuntion(true,false);
                         handle(new Ext4.Com.Model.flowLinkProjectTodoByUserId_Model(data))
                         }

                         }

                         )

                         } else if (buttonId == 'no') {
                         postBackFuntion(true,false);
                         }
                         },
                         icon: Ext.Msg.OK
                         });*/
                        result.success = true;
                    }

                },
                failure: function () {
                    Ext.Msg.show({
                        title: '提示',
                        msg: '数据传输失败，请联系相关人员',
                        buttons: Ext.Msg.OK,
                        icon: Ext.MessageBox.WARNING
                    });
                },
                params: params,
                timeout: 3000000
            });
        }
        else {
            Ext.Msg.show({
                title: '提示',
                msg: '表单数据不全',
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.WARNING
            });
        }


    }
    this.getFormData = function () {

    }
    this.loadFormData = function (projectid, backfunction) {
        var me = this;
        this.ItemPanel.loadDataByFormID(projectid)
    }
    this.Init();
}
function makeModifyCheckRecordForm(theStoreId, projectid) {
    var thisItem = null;
    var ItemPanel = null;
    var dataerror = false;
    this.Init = function () {
        thisItem = this;
    }
    this.makeForm = function (record) {
        this.ItemPanel = new Ext4.HOS.Panel.CheckInfo_Panel({
            isReadOnly: false,
            check_type: record.get('check_type'),
            isupdate: true
        });
        return this.ItemPanel;
    }
    this.saveFormData = function (params, postBackFuntion) {
        var me = this;
        if (this.dataerror) {
            Ext.Msg.alert('提示', '数据有误，无法提交');
            return;
        }
        if (this.ItemPanel.getForm().isValid()) {
            var par = this.ItemPanel.getForm().getValues();
            params.isFlowUpdate = true;
            params.record_id = params.businessKey;
            Ext.apply(params, par);
            Ext.Ajax.request({
                url: 'HospitalManageAction.ered?reqCode=updateCheckRecordInfo',
                success: function (response) {
                    var result = Ext.JSON.decode(response.responseText);
                    if (result.error) {
                        Ext.Msg.show({
                            title: '提示',
                            msg: result.error,
                            buttons: Ext.Msg.OK,
                            icon: Ext.MessageBox.WARNING
                        });
                        result.success = false;
                    } else {
                        postBackFuntion(true, true);
                        getnextCheckRecord(
                            function (data) {
                                if (Ext.isEmpty(data)) {
                                    Ext.Msg.show({
                                        title: '提示',
                                        msg: '没有需要修改的下一条数据',
                                        buttons: Ext.Msg.OK,
                                        icon: Ext.MessageBox.WARNING,
                                        fn: function () {
                                            postBackFuntion(true, false);
                                        }
                                    });
                                } else {
                                    /*  me.defaultParam  = {proc_inst_id_: data.proc_inst_id_,
                                     assignee:data.assignee_,
                                     activityId: data.task_def_key_,
                                     processKey:  data.key_,
                                     processId: data.id_,
                                     taskId: data.taskid,
                                     nodeId:data.taskname,
                                     businessKey: data.business_key_};
                                     me.inVariables = {userStatus: "1"};*/
                                    postBackFuntion(true, false);
                                    handle(new Ext4.Com.Model.flowLinkProjectTodoByUserId_Model(data))
                                }

                            }
                        )
                        /* Ext.Msg.show({
                         title: '请选择',
                         msg: result.success+',请选择后续操作',
                         buttons: Ext.Msg.YESNO,
                         buttonText: {
                         yes: '修改下一条',
                         no: '关闭'
                         },
                         fn: function (buttonId, text, opt) {
                         if (buttonId == 'yes') {
                         getnextCheckRecord(
                         function(data){
                         if(Ext.isEmpty(data))
                         {
                         Ext.Msg.show({
                         title: '提示',
                         msg: '没有需要修改的数据',
                         buttons: Ext.Msg.OK,
                         icon: Ext.MessageBox.WARNING,
                         fn:function(){
                         postBackFuntion(true,false);
                         }
                         });
                         }else{
                         */
                        /*  me.defaultParam  = {proc_inst_id_: data.proc_inst_id_,
                         assignee:data.assignee_,
                         activityId: data.task_def_key_,
                         processKey:  data.key_,
                         processId: data.id_,
                         taskId: data.taskid,
                         nodeId:data.taskname,
                         businessKey: data.business_key_};
                         me.inVariables = {userStatus: "1"};*/
                        /*
                         postBackFuntion(true,false);
                         handle(new Ext4.Com.Model.flowLinkProjectTodoByUserId_Model(data))
                         }

                         }

                         )
                         } else if (buttonId == 'no') {
                         postBackFuntion(true,false);
                         }
                         },
                         icon: Ext.Msg.OK
                         });*/
                        result.success = true;
                    }

                },
                failure: function () {
                    Ext.Msg.show({
                        title: '提示',
                        msg: '数据传输失败，请联系相关人员',
                        buttons: Ext.Msg.OK,
                        icon: Ext.MessageBox.WARNING
                    });
                },
                params: params,
                timeout: 3000000
            });
        }
        else {
            Ext.Msg.show({
                title: '提示',
                msg: '表单数据不全',
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.WARNING
            });
        }


    }
    this.getFormData = function () {

    }
    this.loadFormData = function (projectid, backfunction) {
        this.ItemPanel.loadDataByFormID(projectid)
    }
    this.Init();
}