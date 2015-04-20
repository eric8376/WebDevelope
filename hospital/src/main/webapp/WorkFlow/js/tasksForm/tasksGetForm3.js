/**
 * 编程环境 IDEA.
 * 编写者: 王少伟
 * 主题:【模拟实现-表单获取接口】
 * 时间: 2013-07-06  下午3:17
 */
/**
 *工作流第三大块命名空间
 */
var WF3 = WF3 || {};
/**
 * 基础表单
 */
WF3.baseForm = function () {
    this.thisItem = this;
    this.itemPanel = "";
    this.loadData = {};//保存最后一次加载的表单数据
    this.loadParams = {};//加载表单时需要引用的数据参数
    this.saveMethod = "saveFormData1";//保存所对应的方法
    this.drawing_id = "";
    this.project_id = "";//保存的工程单id
    this.downGrids = [];//所有下载表格
    this.upGrids = [];//所有上传表格
    this.needBussinesses = [];//所有需要根据需求id加载的表格
    this.needProjectids = [];//所有需要根据工程单id加载的表格
    this.changeTemp = false;
    //初始化
    this.Init = function () {
    }

    //获取表单
    this.makeForm = function () {
        return this.itemPanel;
    }

    //保存表单数据
    this.saveFormData = function (params, postBackFunction) {
        var me = this;
        if (Ext.isEmpty(this.itemPanel)) {
            Ext.Msg.alert('提示', '表单面板为空,无法保存数据');
            return false;
        }
        if (!this.changeTemp && !this.itemPanel.getForm().isValid()) {
            Ext.Msg.alert('提示', '请注意完善带<font color=red>*</font>的表单数据!');
            return false;
        }

        //      校验附件数据
        var tmp_appendix_ids = "";
        for (var i = 0; i < me.upGrids.length; i++) {
            var tempGrid = me.upGrids[i];
            if (tempGrid.hidden || tempGrid.PGrid.hidden) {
                continue;
            }
//            if(tempGrid.hidden)
//            {
//               continue;
//            }
            if (!tempGrid.allowblank_) {
                if (tempGrid.getStore().getCount() == 0) {
                    Ext.Msg.alert('<font color=red>警告</font>', "请注意上传带<font color=red>*</font>的附件");
                    return false;
                }

            }
            tmp_appendix_ids += tempGrid.tmp_id;
            if (i != me.upGrids.length - 1) {
                tmp_appendix_ids += ",";
            }

        }
        //数据保存
        var cancontinue = me.save();
        if (typeof cancontinue != 'undefined') {
            if (postBackFunction) {
                postBackFunction();
            }
            Ext.Msg.alert('提示', cancontinue);
            return;
        }

        //表单提交以及流程回转

        Ext.apply(params, {
            exec_target: 'taskForm3Service', exec_method: me.saveMethod, tmp_appendix_ids: tmp_appendix_ids,
            project_id: me.project_id, drawing_id: me.drawing_id, changeTemp: me.changeTemp
        });
        this.itemPanel.getForm().submit({
            url: 'Quick.ered?reqCode=exec',
            method: 'POST',
            params: params,
            success: function (form, action) {
                if (postBackFunction) {
                    postBackFunction();
                }
                Ext.Msg.alert('提示', '流程提交成功!!');
            },
            failure: function () {
                Ext.Msg.alert('提示', '很报歉，未成功读取到工程表单数据！');
            }
        });
    }

    //获取表单数据
    this.getFormData = function () {
        if (Ext.isEmpty(this.itemPanel)) {
            Ext.Msg.alert('提示', '表单面板为空,无法获取数据');
            return false;
        }
        var data_get = this.get(this.loadData);
        if (typeof(data_get) == 'object') {
            Ext.apply(this.loadData, data_get);
        }
        return this.loadData;
    }

    //加载表单数据
    this.loadFormData = function (project_id, backFunction) {
        var me = this;
        if (Ext.isEmpty(this.itemPanel)) {
            Ext.Msg.alert('提示', '表单面板为空,无法加载数据');
            return false;
        }

        //加载产品数据
        for (var i = 0; i < me.needProjectids.length; i++) {
            var tempGrid = me.needProjectids[i];
            tempGrid.getStore().baseParams.project_id = project_id;
            tempGrid.getStore().load();
        }

        //加载表单数据
        Ext.apply(me.loadParams, {project_id: project_id, exec_target: 'taskForm3Service', exec_method: 'getFormData'})
        me.project_id = project_id;
        this.itemPanel.getForm().load({
            waitMsg: '正在读取信息',
            waitTitle: '提示',
            url: 'Quick.ered?reqCode=exec',
            success: function (form_rs, action) {
                me.loadData = action.result.data;

                if (me.loadData.businessreqid) {
                    //加载功能区数据
                    for (var i = 0; i < me.needBussinesses.length; i++) {
                        var tempGrid = me.needBussinesses[i];
                        tempGrid.getStore().baseParams.businessreqid = me.loadData.businessreqid;
                        tempGrid.getStore().load();
                    }
                }

//                if (document && document.getElementById("WF3_CodeImg")) {
//                    document.getElementById("WF3_CodeImg").src = "Quick.ered?reqCode=getCodeImg&model=1&code=" + me.loadData.ordernumber;
//                } else {
//                    Ext.getCmp('WF3_CodeImg_container').html='<img id="WF3_CodeImg" style="float:left;height:100px;border:1px solid black;" src="Quick.ered?reqCode=getCodeImg&model=1&code='+ me.loadData.ordernumber+'">';
//                }
                me.load();
            },
            failure: function () {
                Ext.Msg.alert('提示', '很报歉，未成功读取到工程表单数据！');
            },
            params: me.loadParams
        });

        //加载附件数据
        for (var i = 0; i < me.downGrids.length; i++) {
            var tempGrid = me.downGrids[i];
            tempGrid.to_id = project_id;
            tempGrid.getStore().baseParams.to_id = project_id;
            tempGrid.getStore().load();
        }


    }

    //初始化表单窗口
    this.initPanel = function (itemPanel) {
        this.itemPanel = itemPanel;
        this.downGrids = [];
        this.upGrids = [];
        this.needBussinesses = [];
        this.needProjectids = []
        this.getAllUploadGrid(itemPanel);
        return this.itemPanel;
    }


    //获取所有本表单下面的【附件】
    this.getAllUploadGrid = function (itemPanel) {

        for (var i = 0; i < itemPanel.items.length; i++) {

            var tempItem = itemPanel.items.items[i];
            if (tempItem.fileKey) {
                if (tempItem.upLoadFlag) {
                    this.upGrids.push(tempItem);
                } else {
                    this.downGrids.push(tempItem);
                }
                continue;
            } else if (tempItem.gridSettings && tempItem.gridSettings.fileKey) {
                if (tempItem.gridSettings.upLoadFlag) {
                    this.upGrids.push(tempItem.getGridPanel());
                } else {
                    this.downGrids.push(tempItem.getGridPanel());
                }
                continue;
            } else {
                if (tempItem.needBussiness && tempItem.needBussiness == true) {
                    this.needBussinesses.push(tempItem);
                } else if (tempItem.needProjectid && tempItem.needProjectid == true) {
                    this.needProjectids.push(tempItem);
                }
            }

            if (tempItem.items && tempItem.items.length > 0) {
                this.getAllUploadGrid(tempItem);
            }
        }
    }


    //子类方法
    this.save = function () {
    }
    this.get = function () {
    }
    this.load = function () {
    }

}
/**
 * 继承基础表单
 */
function extendBase(child) {
    Ext.apply(child, new WF3.baseForm());
}
/**
 * 0、花费报价
 */
function make_WF3_0_Form() {
    extendBase(this);
    this.loadParams = {d1: true};
    this.saveMethod = "saveFormData0";
    var ItemPanel = null;
    this.makeForm = function () {
        this.ItemPanel = this.initPanel(new WF3.form0());
        return this.ItemPanel;
    }
    this.save = function () {
        var othercost = getgriddata("grid_expense");
        Ext.apply(othercost, {exec_target: 'taskForm3Service', exec_method: 'save_expend', project_id: this.project_id})
        Ext.Ajax.request({
            url: 'Quick.ered?reqCode=exec',
            params: othercost,
            success: function (response) {
            },
            failure: function () {
                Ext.Msg.alert('提示', '数据存储错误，请联系IT部');
            }
        })
//        var cost_other =  getgriddataRow("service_expense");
//        Ext.apply(cost_other, {exec_target: 'taskForm3Service', exec_method:'saveOtherCost' , project_id: this.project_id , caiwu :1})
//        Ext.Ajax.request({
//            url: 'Quick.ered?reqCode=exec',
//            params : cost_other,
//            success : function(response) {
//            },
//            failure : function() {
//                Ext.Msg.alert('提示', '数据存储错误，请联系IT部');
//            }
//        })

    }
    this.get = function () {

    }
    this.load = function () {
        var me = this.ItemPanel;
        var project_id = this.project_id;
        var Store_ = Ext.StoreMgr.lookup('Customize_Store_shpmt');
        if (Store_) {
            Store_.baseParams.projectid = project_id;
            Store_.reload()
        }
        Ext.Ajax.request({
            url: 'taskslistAction.ered?reqCode=queryPlaneInfo',
            success: function (response) {
                if (response.responseText != '') {
                    var pmtinfo = Ext.JSON.decode(response.responseText);
                    if (pmtinfo[0].drawing_id !== null) {
                        hasDrawing = true;
                    }
                    Ext.getCmp('ordernumber_ybj').ordernumber = pmtinfo[0].ordernumber;
                    reloadAppendixData("result_original_download", pmtinfo[0].drawingid);
                    reloadAppendixData("result_picture_download", pmtinfo[0].drawingid);
                    reloadAppendixData("doorheadsizepicture_picture_download", pmtinfo[0].drawingid);    //审核效果图_门头尺寸图（图片）附件
                    reloadAppendixData("doorheadsizepicture_original_download", pmtinfo[0].drawingid);    //审核效果图_门头尺寸图（原件）附件
                    loadFormdataByDto(pmtinfo[0], me, null);

                    reloadAppendixData("Layout_Appendix_khqr_download", pmtinfo[0].layoutplaneid);
                    Ext.getCmp('Designer_khqr_Value').setValue(pmtinfo[0].designer);
                    Ext.getCmp('useSetMeal_khqr_Value').setValue(pmtinfo[0].usesetmeal);
                    Ext.getCmp('describe_khqr_Value').setValue(pmtinfo[0].describe);
                    Ext.getCmp('append_datetime_khqr').setValue(pmtinfo[0].append_datetime);
                    Ext.getCmp('doesover_khqr').setValue(pmtinfo[0].doesover);
                    var planequote_value = getPriceStatue(pmtinfo[0].buget, pmtinfo[0].planequote);
                    if (pmtinfo[0].planequote) {
                        setFieldValueById('planequote_khqr', pmtinfo[0].planequote);
                        setProjectIdById('planequote_khqr', pmtinfo[0].projectid);
                        setFieldValueById('localplanequote_khqr', pmtinfo[0].localplanequote);

                    }
                    setFieldValueById('othercost_ybj', pmtinfo[0].othercost);
                    if (pmtinfo[0].title) {
                        pmtinfo[0].planequoteDifficulty_khqr = "不含面板价格,与甲方预算相差" + '(' + planequote_value + ')';
                        setFieldValueById('planequoteDifficulty_khqr', pmtinfo[0].planequoteDifficulty_khqr);

                        pmtinfo[0].localplanequoteDifficulty_khqr = "只含面板价格";
                        setFieldValueById('localplanequoteDifficulty_khqr', pmtinfo[0].localplanequoteDifficulty_khqr);

                        document.getElementById('title_khqr').innerHTML = '<a href="./taskslistAction.ered?reqCode=downloadFile&fromid=' + pmtinfo[0].drawing_id + '&title=' + pmtinfo[0].title + '" target="_blank">' + pmtinfo[0].title + '</a>';
                    }

                }
//                Ext.getCmp("content").setValue(pmtinfo[0].username+'邀请您参加工程单：'+pmtinfo[0].ordernumber+'的报价讨论会，会议地点：公司本部小会议室');

            },
            failure: function (response) {
                Ext.Msg.alert('提示', "获取平面图信息失败");
            },
            params: {
                projectid: project_id,
                otherCost: false
            }
        });
        loadformdata(me, null, project_id);
    }
}
/**
 * 1、柜台报价
 */
function make_WF3_1_Form() {

    var ItemPanel = null;
    extendBase(this);
    this.loadParams = {d1: true};
    this.saveMethod = "saveFormData1";
    this.makeForm = function () {
        this.ItemPanel = this.initPanel(new WF3.form1());
        return this.ItemPanel
    }
    this.save = function () {
    }
    this.get = function () {
    }
    this.load = function () {

        var project_id = this.project_id;
        var Store_ = Ext.StoreMgr.lookup('Customize_Store_shpmt');
        if (Store_) {
            Store_.baseParams.projectid = project_id;
            Store_.reload()
        }
        var me = this.ItemPanel;
        Ext.Ajax.request({
            url: 'taskslistAction.ered?reqCode=queryPlaneInfo',
            success: function (response) {
                if (response.responseText != '') {
                    var pmtinfo = Ext.JSON.decode(response.responseText);
                    if (pmtinfo[0].drawing_id !== null) {
                        hasDrawing = true;
                    }
                    Ext.getCmp('ordernumber_ybj').ordernumber = pmtinfo[0].ordernumber;
                    reloadAppendixData("result_original_download", pmtinfo[0].drawingid);
                    reloadAppendixData("result_picture_download", pmtinfo[0].drawingid);
                    reloadAppendixData("doorheadsizepicture_picture_download", pmtinfo[0].drawingid);    //审核效果图_门头尺寸图（图片）附件
                    reloadAppendixData("doorheadsizepicture_original_download", pmtinfo[0].drawingid);    //审核效果图_门头尺寸图（原件）附件
                    loadFormdataByDto(pmtinfo[0], me, null);

                    reloadAppendixData("Layout_Appendix_khqr_download", pmtinfo[0].layoutplaneid);
                    Ext.getCmp('Designer_khqr_Value').setValue(pmtinfo[0].designer);
                    Ext.getCmp('useSetMeal_khqr_Value').setValue(pmtinfo[0].usesetmeal);
                    Ext.getCmp('describe_khqr_Value').setValue(pmtinfo[0].describe);
                    Ext.getCmp('append_datetime_khqr').setValue(pmtinfo[0].append_datetime);
                    Ext.getCmp('doesover_khqr').setValue(pmtinfo[0].doesover);
                    var planequote_value = getPriceStatue(pmtinfo[0].buget, pmtinfo[0].planequote);
                    if (pmtinfo[0].planequote) {
                        setFieldValueById('planequote_khqr', pmtinfo[0].planequote);
                        setProjectIdById('planequote_khqr', pmtinfo[0].projectid);
                        setFieldValueById('localplanequote_khqr', pmtinfo[0].localplanequote);

                    }
                    setFieldValueById('othercost_ybj', pmtinfo[0].othercost);
                    if (pmtinfo[0].title) {
                        pmtinfo[0].planequoteDifficulty_khqr = "不含面板价格,与甲方预算相差" + '(' + planequote_value + ')';
                        setFieldValueById('planequoteDifficulty_khqr', pmtinfo[0].planequoteDifficulty_khqr);

                        pmtinfo[0].localplanequoteDifficulty_khqr = "只含面板价格";
                        setFieldValueById('localplanequoteDifficulty_khqr', pmtinfo[0].localplanequoteDifficulty_khqr);

                        document.getElementById('title_khqr').innerHTML = '<a href="./taskslistAction.ered?reqCode=downloadFile&fromid=' + pmtinfo[0].drawing_id + '&title=' + pmtinfo[0].title + '" target="_blank">' + pmtinfo[0].title + '</a>';
                    }

                }
//                Ext.getCmp("content").setValue(pmtinfo[0].username+'邀请您参加工程单：'+pmtinfo[0].ordernumber+'的报价讨论会，会议地点：公司本部小会议室');

            },
            failure: function (response) {
                Ext.Msg.alert('提示', "获取平面图信息失败");
            },
            params: {
                projectid: project_id,
                otherCost: true
            }
        });
        loadformdata(me, null, project_id);
    }
}
/**
 * 2、发送报价单
 */
function make_WF3_2_Form() {
    var ItemPanel = null;
    extendBase(this);
    this.loadParams = {d1: true};
    this.saveMethod = "saveFormData2";
    this.makeForm = function () {
        this.ItemPanel = this.initPanel(new WF3.form2());
        return this.ItemPanel
    }
    this.save = function () {
    }
    this.get = function () {
    }
    this.load = function () {
        var project_id = this.project_id;
        var Store_ = Ext.StoreMgr.lookup('Customize_Store_shpmt');
        if (Store_) {
            Store_.baseParams.projectid = project_id;
            Store_.reload()
        }
//        Ext.getCmp('ResultInfoCheck').getStore().baseParams.projectid=project_id;
//        Ext.getCmp('ResultInfoCheck').getStore().reload();
        var me = this.ItemPanel;
        Ext.Ajax.request({
            url: 'taskslistAction.ered?reqCode=queryPlaneInfo',
            success: function (response) {
                if (response.responseText != '') {
                    var pmtinfo = Ext.JSON.decode(response.responseText);
                    if (pmtinfo[0].drawing_id !== null) {
                        hasDrawing = true;
                    }
                    Ext.getCmp('ordernumber_ybj').ordernumber = pmtinfo[0].ordernumber;
                    reloadAppendixData("result_original_download", pmtinfo[0].drawingid);
                    reloadAppendixData("result_picture_download", pmtinfo[0].drawingid);
                    reloadAppendixData("doorheadsizepicture_picture_download", pmtinfo[0].drawingid);    //审核效果图_门头尺寸图（图片）附件
                    reloadAppendixData("doorheadsizepicture_original_download", pmtinfo[0].drawingid);    //审核效果图_门头尺寸图（原件）附件
                    loadFormdataByDto(pmtinfo[0], me, null);

                    reloadAppendixData("Layout_Appendix_khqr_download", pmtinfo[0].layoutplaneid);
                    Ext.getCmp('Designer_khqr_Value').setValue(pmtinfo[0].designer);
                    Ext.getCmp('useSetMeal_khqr_Value').setValue(pmtinfo[0].usesetmeal);
                    Ext.getCmp('describe_khqr_Value').setValue(pmtinfo[0].describe);
                    Ext.getCmp('append_datetime_khqr').setValue(pmtinfo[0].append_datetime);
                    Ext.getCmp('doesover_khqr').setValue(pmtinfo[0].doesover);
                    var planequote_value = getPriceStatue(pmtinfo[0].buget, pmtinfo[0].planequote);
                    if (pmtinfo[0].planequote) {
                        setFieldValueById('planequote_khqr', pmtinfo[0].planequote);
                        setProjectIdById('planequote_khqr', pmtinfo[0].projectid);
                        setFieldValueById('localplanequote_khqr', pmtinfo[0].localplanequote);

                    }
                    setFieldValueById('othercost_ybj', pmtinfo[0].othercost);
                    if (pmtinfo[0].title) {
                        pmtinfo[0].planequoteDifficulty_khqr = "不含面板价格,与甲方预算相差" + '(' + planequote_value + ')';
                        setFieldValueById('planequoteDifficulty_khqr', pmtinfo[0].planequoteDifficulty_khqr);

                        pmtinfo[0].localplanequoteDifficulty_khqr = "只含面板价格";
                        setFieldValueById('localplanequoteDifficulty_khqr', pmtinfo[0].localplanequoteDifficulty_khqr);

                        document.getElementById('title_khqr').innerHTML = '<a href="./taskslistAction.ered?reqCode=downloadFile&fromid=' + pmtinfo[0].drawing_id + '&title=' + pmtinfo[0].title + '" target="_blank">' + pmtinfo[0].title + '</a>';
                    }

                }
//                Ext.getCmp("content").setValue(pmtinfo[0].username+'邀请您参加工程单：'+pmtinfo[0].ordernumber+'的报价讨论会，会议地点：公司本部小会议室');

            },
            failure: function (response) {
                Ext.Msg.alert('提示', "获取平面图信息失败");
            },
            params: {
                projectid: project_id,
                otherCost: true
            }
        });
        loadformdata(me, null, project_id);
    }
}
/**
 * 3、合同谈判
 */
function make_WF3_3_Form() {
    extendBase(this);
    this.loadParams = {d1: true, d11: true};
    this.saveMethod = "saveFormData3";
    var mianPanel;
    this.makeForm = function () {
        mianPanel = this.initPanel(new WF3.form3());
        return mianPanel;
    }
    this.save = function () {
        var drawing_id = Ext.getCmp('pmtInfo_gcxd').drawing_id;
        if (true) {
            if ((drawing_id == null || drawing_id == '') && Ext.getCmp('Layout_Appendix_zzpmt').getGridPanel().getStore().getTotalCount() == 0) {
                Ext.MessageBox.alert('提示', '请选择图纸或平面布局图');
                return;
            }
        }
        showWaitMsg('保存平面图信息中,请稍等...');
        this.drawing_id = drawing_id;

    }
    this.get = function () {
    }
    this.change = function (change) {
        this.changeTemp = change;
        var fieldArray = mianPanel.findByType('field');
        var length = fieldArray.length;
        for (var i = 0; i < length; i++) {
            fieldArray[i].allowBlank = true;
        }
    }
    this.load = function () {
        var project_id = this.project_id;
        var me = mianPanel;
        loadformdata_zzpmt(me, null, project_id);
        loadformdata(me, null, project_id);
        Ext.getCmp('Layout_Appendix_zzpmt').hide();
        Ext.getCmp('Layout_Appendix_zzpmt').label.hide();
        Ext.getCmp('choiceAppendix').planeChange = true;
//        this.change(true);
    }
}
/**
 * 4、折扣审批
 */
function make_WF3_4_Form() {
    extendBase(this);
    this.loadParams = {d2: true, d7: true, d13: true};
    this.saveMethod = "saveFormData4";
    var mianPanel;
    this.makeForm = function () {
        mianPanel = this.initPanel(new WF3.form4());
        return mianPanel;
    }
    this.save = function () {
    }
    this.get = function () {
    }
    this.load = function () {
        var project_id = this.project_id;
        var me = mianPanel;
        Ext.Ajax.request({
            url: 'taskslistAction.ered?reqCode=queryPlaneInfo',
            success: function (response) {
                if (response.responseText != '') {
                    var pmtinfo = Ext.JSON.decode(response.responseText);
                    getOpinionPanel_Check(pmtinfo[0].planeid, 3, function (backpanel) {
                        Ext.getCmp('checkBar').add(backpanel);
                        Ext.getCmp('checkBar').doLayout();
                    })
                    getOpinionPanel_Check(pmtinfo[0].planeid, 4, function (backpanel) {
                        Ext.getCmp('checkSpot').add(backpanel);
                        Ext.getCmp('checkSpot').doLayout();

                    })
                    tempGrid = Ext.getCmp('gthtdown');
                    tempGrid.to_id = pmtinfo[0].agreement_id_bar;
                    tempGrid.getStore().baseParams.to_id = pmtinfo[0].agreement_id_bar;
                    tempGrid.getStore().load();

                    tempGrid = Ext.getCmp('xccphtdown');
                    tempGrid.to_id = pmtinfo[0].agreement_id_spot;
                    tempGrid.getStore().baseParams.to_id = pmtinfo[0].agreement_id_spot;
                    tempGrid.getStore().load();
                }
            },
            failure: function (response) {
                Ext.Msg.alert('提示', "获取平面图信息失败");
            },
            params: {
                projectid: project_id,
                otherCost: true,
                gtAndxc: true
            }
        });
        loadformdata(me, null, project_id);
    }
}
/**
 * 5、工厂确认
 */
function make_WF3_5_Form() {
    extendBase(this);
    this.loadParams = {d1: true, d2: true, d7: true};
    this.saveMethod = "saveFormData5";
    var mianPanel;
    this.makeForm = function () {
        mianPanel = this.initPanel(new WF3.form5());
        return mianPanel;
    }
    this.save = function () {
    }
    this.get = function () {
    }
    this.load = function () {
        var me = mianPanel;
        loadformdata_shpmt(null, null, this.project_id);
        loadformdata(me, null, this.project_id);
    }
}
/**
 * 6、工程部确认
 */
function make_WF3_6_Form() {
    extendBase(this);
    this.loadParams = {d1: true, d2: true, d7: true};
    this.saveMethod = "saveFormData6";
    var PanelMain;
    this.makeForm = function () {
        PanelMain = this.initPanel(new WF3.form6())
        return PanelMain;
    }
    this.save = function () {
    }
    this.get = function () {
    }
    this.load = function () {
        var me = PanelMain;
        loadformdata(me, null, this.project_id);
        loadformdata_shpmt(null, null, this.project_id);
    }
}
/**
 * 7、货柜合同签订
 */
function make_WF3_7_Form() {

    extendBase(this);
    this.loadParams = {d1: true, d13: true, d7: true};
    this.saveMethod = "saveFormData7";
    var mianPanel;
    this.makeForm = function () {
        mianPanel = this.initPanel(new WF3.form7());
        return mianPanel;
    }
    this.save = function () {
    }
    this.get = function () {
    }
    this.load = function () {
        var project_id = this.project_id;
//        Ext.getCmp('ResultInfoCheck').getStore().baseParams.projectid=project_id;
//        Ext.getCmp('ResultInfoCheck').getStore().reload();
        var me = mianPanel;
        loadformdata(me, null, project_id);
        Ext.Ajax.request({
            url: 'taskslistAction.ered?reqCode=queryPlaneInfo',
            success: function (response) {
                var tempGrid = null;
                if (response.responseText != '') {
                    var pmtinfo = Ext.JSON.decode(response.responseText);
                    getOpinionPanel_Check(pmtinfo[0].planeid, 3, function (backpanel) {
                        Ext.getCmp('checkBar').add(backpanel);
                        Ext.getCmp('checkBar').doLayout();
                    })
                    if (Ext.get('spotOfficial').getValue() != 0) {
                        getOpinionPanel_Check(pmtinfo[0].planeid, 4, function (backpanel) {
                            Ext.getCmp('checkSpot').add(backpanel);
                            Ext.getCmp('checkSpot').doLayout();

                        })
                    }
                    tempGrid = Ext.getCmp('gthtdown');
                    tempGrid.to_id = pmtinfo[0].agreement_id_bar;
                    tempGrid.getStore().baseParams.to_id = pmtinfo[0].agreement_id_bar;
                    tempGrid.getStore().load();
//                }
                    tempGrid = Ext.getCmp('xccphtdown');
                    tempGrid.to_id = pmtinfo[0].agreement_id_spot;
                    tempGrid.getStore().baseParams.to_id = pmtinfo[0].agreement_id_spot;
                    tempGrid.getStore().load();
//                }
                }
//                Ext.getCmp("content").setValue(pmtinfo[0].username+'邀请您参加工程单：'+pmtinfo[0].ordernumber+'的报价讨论会，会议地点：公司本部小会议室');
                if (Ext.get('spotOfficial').getValue() == 0) {
                    Ext.getCmp('download').hide();
                    Ext.getCmp('spotResult2').label.hide();
                    Ext.getCmp('spotResult2').hide();
                    Ext.getCmp('uplaodSport').hide();
                    Ext.getCmp('uplaodSport2').hide();
                }
            },
            failure: function (response) {
                Ext.Msg.alert('提示', "获取平面图信息失败");
            },
            params: {
                projectid: project_id,
                otherCost: true,
                gtAndxc: true
            }
        });
    }
}
/**
 * 8、客户预付款 （70%）
 */
function make_WF3_8_Form() {
    var ItemPanel = null;
    extendBase(this);
    this.loadParams = {d1: true, d2: true, d9: true};
    this.saveMethod = "saveFormData8";
    this.makeForm = function () {
        this.ItemPanel = this.initPanel(new WF3.form8())
        return this.ItemPanel;
    }
    this.save = function () {
    }
    this.get = function () {
    }
    this.load = function () {
        var me = this.ItemPanel;
        var project_id = this.project_id;
        var Store_ = Ext.StoreMgr.lookup('Customize_Store_shpmt');
        if (Store_) {
            Store_.baseParams.projectid = project_id;
            Store_.reload()
        }
        Ext.Ajax.request({
            url: 'taskslistAction.ered?reqCode=queryPlaneInfo',
            success: function (response) {
                if (response.responseText != '') {
                    var pmtinfo = Ext.JSON.decode(response.responseText);
                    if (pmtinfo[0].drawing_id !== null) {
                        hasDrawing = true;
                    }
                    Ext.getCmp('ordernumber_ybj').ordernumber = pmtinfo[0].ordernumber;
                    reloadAppendixData("result_original_download", pmtinfo[0].drawingid);
                    reloadAppendixData("result_picture_download", pmtinfo[0].drawingid);
                    reloadAppendixData("doorheadsizepicture_picture_download", pmtinfo[0].drawingid);    //审核效果图_门头尺寸图（图片）附件
                    reloadAppendixData("doorheadsizepicture_original_download", pmtinfo[0].drawingid);    //审核效果图_门头尺寸图（原件）附件
                    loadFormdataByDto(pmtinfo[0], me, null);

                    reloadAppendixData("Layout_Appendix_khqr_download", pmtinfo[0].layoutplaneid);
                    Ext.getCmp('Designer_khqr_Value').setValue(pmtinfo[0].designer);
                    Ext.getCmp('useSetMeal_khqr_Value').setValue(pmtinfo[0].usesetmeal);
                    Ext.getCmp('describe_khqr_Value').setValue(pmtinfo[0].describe);
                    Ext.getCmp('append_datetime_khqr').setValue(pmtinfo[0].append_datetime);
                    Ext.getCmp('doesover_khqr').setValue(pmtinfo[0].doesover);
                    var planequote_value = getPriceStatue(pmtinfo[0].buget, pmtinfo[0].planequote);
                    if (pmtinfo[0].planequote) {
                        setFieldValueById('planequote_khqr', pmtinfo[0].planequote);
                        setProjectIdById('planequote_khqr', pmtinfo[0].projectid);
                        setFieldValueById('localplanequote_khqr', pmtinfo[0].localplanequote);

                    }
                    setFieldValueById('othercost_ybj', pmtinfo[0].othercost);
                    if (pmtinfo[0].title) {
                        pmtinfo[0].planequoteDifficulty_khqr = "不含面板价格,与甲方预算相差" + '(' + planequote_value + ')';
                        setFieldValueById('planequoteDifficulty_khqr', pmtinfo[0].planequoteDifficulty_khqr);

                        pmtinfo[0].localplanequoteDifficulty_khqr = "只含面板价格";
                        setFieldValueById('localplanequoteDifficulty_khqr', pmtinfo[0].localplanequoteDifficulty_khqr);

                        document.getElementById('title_khqr').innerHTML = '<a href="./taskslistAction.ered?reqCode=downloadFile&fromid=' + pmtinfo[0].drawing_id + '&title=' + pmtinfo[0].title + '" target="_blank">' + pmtinfo[0].title + '</a>';
                    }

                }
//                Ext.getCmp("content").setValue(pmtinfo[0].username+'邀请您参加工程单：'+pmtinfo[0].ordernumber+'的报价讨论会，会议地点：公司本部小会议室');

            },
            failure: function (response) {
                Ext.Msg.alert('提示', "获取平面图信息失败");
            },
            params: {
                projectid: project_id,
                otherCost: true
            }
        });
        loadformdata(me, null, project_id);


    }
}
/**
 * 9、财务确认
 */
function make_WF3_9_Form() {

    var ItemPanel = null;
    extendBase(this);
    this.loadParams = {d1: true, d9: true};
    this.saveMethod = "saveFormData9";
    this.makeForm = function () {
        this.ItemPanel = this.initPanel(new WF3.form9())
        return this.ItemPanel;
    }
    this.save = function () {
    }
    this.get = function (loadData) {
        loadData.doendproject = true;
    }
    this.load = function () {
        var me = this.ItemPanel;
        var project_id = this.project_id;
        var Store_ = Ext.StoreMgr.lookup('Customize_Store_shpmt');
        if (Store_) {
            Store_.baseParams.projectid = project_id;
            Store_.reload()
        }
        Ext.Ajax.request({
            url: 'taskslistAction.ered?reqCode=queryPlaneInfo',
            success: function (response) {
                if (response.responseText != '') {
                    var pmtinfo = Ext.JSON.decode(response.responseText);
                    if (pmtinfo[0].drawing_id !== null) {
                        hasDrawing = true;
                    }
                    Ext.getCmp('ordernumber_ybj').ordernumber = pmtinfo[0].ordernumber;
                    reloadAppendixData("result_original_download", pmtinfo[0].drawingid);
                    reloadAppendixData("result_picture_download", pmtinfo[0].drawingid);
                    reloadAppendixData("doorheadsizepicture_picture_download", pmtinfo[0].drawingid);    //审核效果图_门头尺寸图（图片）附件
                    reloadAppendixData("doorheadsizepicture_original_download", pmtinfo[0].drawingid);    //审核效果图_门头尺寸图（原件）附件
                    loadFormdataByDto(pmtinfo[0], me, null);

                    reloadAppendixData("Layout_Appendix_khqr_download", pmtinfo[0].layoutplaneid);
                    Ext.getCmp('Designer_khqr_Value').setValue(pmtinfo[0].designer);
                    Ext.getCmp('useSetMeal_khqr_Value').setValue(pmtinfo[0].usesetmeal);
                    Ext.getCmp('describe_khqr_Value').setValue(pmtinfo[0].describe);
                    Ext.getCmp('append_datetime_khqr').setValue(pmtinfo[0].append_datetime);
                    Ext.getCmp('doesover_khqr').setValue(pmtinfo[0].doesover);
                    var planequote_value = getPriceStatue(pmtinfo[0].buget, pmtinfo[0].planequote);
                    if (pmtinfo[0].planequote) {
                        setFieldValueById('planequote_khqr', pmtinfo[0].planequote);
                        setProjectIdById('planequote_khqr', pmtinfo[0].projectid);
                        setFieldValueById('localplanequote_khqr', pmtinfo[0].localplanequote);

                    }
                    setFieldValueById('othercost_ybj', pmtinfo[0].othercost);
                    if (pmtinfo[0].title) {
                        pmtinfo[0].planequoteDifficulty_khqr = "不含面板价格,与甲方预算相差" + '(' + planequote_value + ')';
                        setFieldValueById('planequoteDifficulty_khqr', pmtinfo[0].planequoteDifficulty_khqr);

                        pmtinfo[0].localplanequoteDifficulty_khqr = "只含面板价格";
                        setFieldValueById('localplanequoteDifficulty_khqr', pmtinfo[0].localplanequoteDifficulty_khqr);

                        document.getElementById('title_khqr').innerHTML = '<a href="./taskslistAction.ered?reqCode=downloadFile&fromid=' + pmtinfo[0].drawing_id + '&title=' + pmtinfo[0].title + '" target="_blank">' + pmtinfo[0].title + '</a>';
                    }

                }
//                Ext.getCmp("content").setValue(pmtinfo[0].username+'邀请您参加工程单：'+pmtinfo[0].ordernumber+'的报价讨论会，会议地点：公司本部小会议室');

            },
            failure: function (response) {
                Ext.Msg.alert('提示', "获取平面图信息失败");
            },
            params: {
                projectid: project_id,
                otherCost: true
            }
        });
        loadformdata(me, null, project_id);


    }
}
/**
 * 10、客服主管审批平行
 */
function make_WF3_10_Form() {
    extendBase(this);
    this.loadParams = {d1: true, d5: true};
    this.saveMethod = "saveFormData10";
    var itemPanel = null;
    this.makeForm = function () {
        itemPanel = new WF3.form10();
        return this.initPanel(itemPanel);
    }
    this.save = function () {
    }
    this.get = function () {
    }
    this.load = function () {

        loadformdata(itemPanel, null, this.project_id);
    }
    this.getResult = function () {
        return itemPanel.findById("bxzt_bx").getValue();
    }
}
/**
 * 11、水晶字或丝印确认
 */
function make_WF3_11_Form() {
    extendBase(this);
    this.loadParams = {d1: true, d2: true, d3: true};
    this.saveMethod = "saveFormData11";
    this.makeForm = function () {
        return this.initPanel(new WF3.form11());
    }
    this.save = function () {
    }
    this.get = function () {
    }
    this.load = function () {
    }
}
/**
 * 12、设计柜台立面图
 */
function make_WF3_12_Form() {
    extendBase(this);
    this.loadParams = {d1: true};
    this.saveMethod = "saveFormData12";
    this.makeForm = function () {
        return this.initPanel(new WF3.form12());
    }
    this.save = function () {
    }
    this.get = function () {
    }
    this.load = function () {
    }
}
/**
 * 13、绘制cdr图
 */
function make_WF3_13_Form() {
    extendBase(this);
    this.loadParams = {d1: true};
    this.saveMethod = "saveFormData13";
    this.makeForm = function () {
        return this.initPanel(new WF3.form13());
    }
    this.save = function () {
    }
    this.get = function () {
    }
    this.load = function () {
    }
}
/**
 * 14、客服确认水晶字或丝印
 */
function make_WF3_14_Form() {
    extendBase(this);
    this.loadParams = {d1: true, d3: true};
    this.saveMethod = "saveFormData14";
    this.makeForm = function () {
        return this.initPanel(new WF3.form14());
    }
    this.save = function () {
    }
    this.get = function () {
    }
    this.load = function () {
    }
}
/**
 * 15、现场成品报价（含水晶字）
 */
function make_WF3_15_Form() {
    extendBase(this);
    this.loadParams = {d1: true, d2: true};
    this.saveMethod = "saveFormData15";
    this.makeForm = function () {
        return this.initPanel(new WF3.form15());
    }
    this.save = function () {
    }
    this.get = function () {
    }
    this.load = function () {
    }
}
/**
 * 16、现场成品合同签订
 */
function make_WF3_16_Form() {
    extendBase(this);
    this.loadParams = {d1: true, d2: true, d7: true};
    this.saveMethod = "saveFormData16";

    this.makeForm = function () {
        return this.initPanel(new WF3.form16());
    }
    this.save = function () {
    }
    this.get = function () {
    }
    this.load = function () {
    }
}
/**
 * 17、财务确认合同
 */
function make_WF3_17_Form() {
    extendBase(this);
    this.loadParams = {d1: true};
    this.saveMethod = "saveFormData17";
    this.makeForm = function () {
        return this.initPanel(new WF3.form17());
    }
    this.save = function () {
    }
    this.get = function () {
    }
    this.load = function () {
    }
}
/**
 * 18、施工图人员安排
 */
function make_WF3_18_Form() {
    extendBase(this);
    this.loadParams = {d1: true, d2: true, d10: true};
    this.saveMethod = "saveFormData18";
    this.makeForm = function () {
        return this.initPanel(new WF3.form18());
    }
    this.save = function () {
    }
    this.get = function () {
    }
    this.load = function () {
    }
}
/**
 * 19、绘制施工图
 */
function make_WF3_19_Form() {
    extendBase(this);
    this.loadParams = {d1: true, d2: true, d10: true};
    this.saveMethod = "saveFormData19";
    var ItemPanel = null;
    this.makeForm = function () {
        this.ItemPanel = this.initPanel(new WF3.form19());
        return this.ItemPanel;
    }
    this.save = function () {
    }
    this.get = function () {
    }
    this.load = function () {
        var me = this.ItemPanel
        var project_id = this.project_id;
        Ext.Ajax.request({
            url: 'taskslistAction.ered?reqCode=queryPlaneInfo',
            success: function (response) {
                if (response.responseText != '') {
                    var pmtinfo = Ext.JSON.decode(response.responseText);
                    var pmtInfoPanel = new Ext.pmtInfo({
                        doesover: pmtinfo[0].doesover,
                        append_datetime: pmtinfo[0].append_datetime,
                        describe: pmtinfo[0].describe,
                        usesetmeal: pmtinfo[0].usesetmeal,
                        designer: pmtinfo[0].designer,
                        drawing_id: pmtinfo[0].drawing_id,
                        drawingtitle: pmtinfo[0].title
                    });
                    me.insert(2, pmtInfoPanel);
                    me.doLayout();
                }

            },
            failure: function (response) {
                Ext.Msg.alert('提示', "获取平面图信息失败");
            },
            params: {
                projectid: project_id
            }
        });

    }
}
/**
 * 20、施工图审核
 */
function make_WF3_20_Form() {
    var ItemPanel = null;
    extendBase(this);
    var panel = this;
    this.loadParams = {d1: true, d4: true, d2: true, d10: true};
    this.saveMethod = "saveFormData20";
    this.makeForm = function () {
        this.ItemPanel = this.initPanel(new WF3.form20());
        return this.ItemPanel;
    }
    this.save = function () {
    }
    this.get = function () {
    }
    this.load = function () {
        var me = this.ItemPanel
        var project_id = this.project_id;
        Ext.Ajax.request({
            url: 'taskslistAction.ered?reqCode=queryPlaneInfo',
            success: function (response) {
                if (response.responseText != '') {
                    var pmtinfo = Ext.JSON.decode(response.responseText);
                    var pmtInfoPanel = new Ext.pmtInfo({
                        doesover: pmtinfo[0].doesover,
                        append_datetime: pmtinfo[0].append_datetime,
                        describe: pmtinfo[0].describe,
                        usesetmeal: pmtinfo[0].usesetmeal,
                        designer: pmtinfo[0].designer,
                        drawing_id: pmtinfo[0].drawing_id,
                        drawingtitle: pmtinfo[0].title
                    });
                    me.insert(2, pmtInfoPanel);
                    me.doLayout();

                    Ext.getCmp('projectSee').to_id = pmtinfo[0].constructionid;
                    Ext.getCmp('projectSee').getStore().baseParams.to_id = pmtinfo[0].constructionid;
                    Ext.getCmp('projectSee').getStore().load();
                    panel.drawing_id = pmtinfo[0].drawing_id;
                }

            },
            failure: function (response) {
                Ext.Msg.alert('提示', "获取平面图信息失败");
            },
            params: {
                projectid: project_id,
                sgtTemp: true
            }
        });
    }
}
/**
 * 21、客服核对                                                                  h
 */
function make_WF3_21_Form() {
    extendBase(this);
    this.loadParams = {d1: true, d2: true, d4: true, d10: true};
    this.saveMethod = "saveFormData21";
    this.makeForm = function () {
        return this.initPanel(new WF3.form21());
    }
    this.save = function () {
    }
    this.get = function () {
    }
    this.load = function () {
        var project_id = this.project_id;
        Ext.getCmp('downloadXdtInfo').project_id = project_id;
        loadformdata_shpmt(this.ItemPanel, null, project_id);
        Ext.StoreMgr.lookup('ProductMeterial_store').baseParams.projectid = project_id;
        Ext.StoreMgr.lookup('ProductMeterial_store').baseParams.justproduct = true;  //表示不显示现场成品
        Ext.StoreMgr.lookup('ProductMeterial_store').baseParams.just_Meterial_Package = true;  //表示只查看该订单中没有拆包信息或者没有料单信息的成品件
        Ext.StoreMgr.lookup('ProductMeterial_store').reload();
        Ext.StoreMgr.lookup('CustomizeMeterial_store').baseParams.just_Meterial_Package = true;  //表示只查看该订单中没有拆包信息或者没有料单信息的成品件
        Ext.StoreMgr.lookup('CustomizeMeterial_store').baseParams.projectid = project_id;
        Ext.StoreMgr.lookup('CustomizeMeterial_store').reload();
        Ext.getCmp('DbItems').project_id = project_id;
        Ext.Ajax.request({
            url: 'taskslistAction.ered?reqCode=queryPlaneInfo',
            success: function (response) {
                if (response.responseText != '') {
                    var pmtinfo = Ext.JSON.decode(response.responseText);
                    var tempGrid = Ext.getCmp('storePic');
//                    tempGrid.to_id = pmtinfo[0].ordernumber;
//                    Ext.getCmp('ordernumber_ybj').ordernumber=pmtinfo[0].ordernumber;
                    tempGrid.getStore().baseParams.to_id = pmtinfo[0].ordernumber;
                    tempGrid.getStore().load();
                    tempGrid = Ext.getCmp('doorPic');
                    tempGrid.to_id = pmtinfo[0].ordernumber;
                    tempGrid.getStore().baseParams.to_id = pmtinfo[0].ordernumber;
                    tempGrid.getStore().load();
                    tempGrid = Ext.getCmp('xcPic');
                    tempGrid.to_id = pmtinfo[0].ordernumber;
                    tempGrid.getStore().baseParams.to_id = pmtinfo[0].ordernumber;
                    tempGrid.getStore().load();
                    Ext.getCmp('projectSee2').to_id = pmtinfo[0].constructionid;
                    Ext.getCmp('projectSee2').getStore().baseParams.to_id = pmtinfo[0].constructionid;
                    Ext.getCmp('projectSee2').getStore().load();
                    reloadAppendixData("Layout_Appendix_khqr_download", pmtinfo[0].layoutplaneid);
//                    reloadAppendixData("Layout_Appendix_zzpmt_download",pmtinfo[0].planeid);

//                    Ext.getCmp('Designer_khqr_Value').setValue(pmtinfo[0].designer);
//                    Ext.getCmp('useSetMeal_khqr_Value') .setValue(pmtinfo[0].usesetmeal);
//                    Ext.getCmp('describe_khqr_Value') .setValue(pmtinfo[0].describe);
//                    Ext.getCmp('append_datetime_khqr').setValue(pmtinfo[0].append_datetime);
//                    Ext.getCmp('doesover_khqr').setValue(pmtinfo[0].doesover);
                    var planequote_value = getPriceStatue(pmtinfo[0].buget, pmtinfo[0].planequote);
                    setFieldValueById('othercost_ybj', pmtinfo[0].othercost);
                    if (pmtinfo[0].planequote) {
                        setFieldValueById('planequote_khqr', pmtinfo[0].planequote);
                        setProjectIdById('planequote_khqr', pmtinfo[0].projectid);
                        setFieldValueById('localplanequote_khqr', pmtinfo[0].localplanequote);
                    }
                    if (pmtinfo[0].title) {
                        pmtinfo[0].planequoteDifficulty_khqr = "不含面板价格,与甲方预算相差" + '(' + planequote_value + ')';
                        setFieldValueById('planequoteDifficulty_khqr', pmtinfo[0].planequoteDifficulty_khqr);

                        pmtinfo[0].localplanequoteDifficulty_khqr = "只含面板价格";
                        setFieldValueById('localplanequoteDifficulty_khqr', pmtinfo[0].localplanequoteDifficulty_khqr);

//                        document.getElementById('title_khqr').innerHTML = '<a href="./taskslistAction.ered?reqCode=downloadFile&fromid='+pmtinfo[0].drawing_id+'&title='+pmtinfo[0].title+'" target="_blank">'+pmtinfo[0].title+'</a>';
                    }
                }
            },
            failure: function (response) {
                Ext.Msg.alert('提示', "获取平面图信息失败");
            },
            params: {
                projectid: project_id,
                otherCost: true,
                sgtTemp: true
            }
        });
    }
}
/**
 * 22、研发部确认
 */
function make_WF3_22_Form() {
    extendBase(this);
    this.loadParams = {d1: true};
    this.saveMethod = "saveFormData22";
    this.produceplaneid = '';
    var me;
    this.makeForm = function () {
        me = this.initPanel(new WF3.form22())
        return me;
    }
    this.save = function () {
    }
    this.get = function (loadData) {
//        loadData.produceplaneid=this.produceplaneid;
        loadData.productdata = getgriddata("productdata").productdata;
//        loadData.customizedata=getgriddata("customizedata").customizedata;
    }
    this.load = function () {
        var project_id = this.project_id;
        Ext.getCmp('downloadXdtInfo_form22').project_id = project_id;
        if (Ext.isEmpty(me)) {
            Ext.Msg.alert('提示', '表单面板为空,无法加载数据');
            return;
        }

//        loadformdata(this.ItemPanel,null,projectid,null,null);
        loadformdata_shpmt(me, null, project_id, null, null);
        loadformdata(me, null, project_id);
        Ext.StoreMgr.lookup('ProductMeterial_store').baseParams.projectid = project_id;
        Ext.StoreMgr.lookup('ProductMeterial_store').baseParams.justproduct = true;  //表示不显示现场成品
        Ext.StoreMgr.lookup('ProductMeterial_store').baseParams.just_Meterial_Package = true;  //表示只查看该订单中没有拆包信息或者没有料单信息的成品件
        Ext.StoreMgr.lookup('ProductMeterial_store').reload();
//        Ext.StoreMgr.lookup('CustomizeMeterial_store') .baseParams.just_Meterial_Package=true;  //表示只查看该订单中没有拆包信息或者没有料单信息的成品件
//        Ext.StoreMgr.lookup('CustomizeMeterial_store') .baseParams.projectid=project_id;
//        Ext.StoreMgr.lookup('CustomizeMeterial_store') .reload();

    }
}
/**
 * 23、客服补充
 */
function make_WF3_23_Form() {
    var ItemPanel = null;
    extendBase(this);
    this.loadParams = {d1: true};
    this.saveMethod = "saveFormData23";
    this.makeForm = function () {
        this.ItemPanel = this.initPanel(new WF3.form23());
        return this.ItemPanel
    }

    this.save = function () {
        /****************其他花费存储*************/
        var cost_other = getgriddataRow("cost_other");
        Ext.apply(cost_other, {
            exec_target: 'taskForm3Service',
            exec_method: 'saveOtherCost',
            project_id: this.project_id
        })
        Ext.Ajax.request({
            url: 'Quick.ered?reqCode=exec',
            params: cost_other,
            success: function (response) {
            },
            failure: function () {
                Ext.Msg.alert('提示', '获取设计件id失败');
            }
        })


    }
    this.get = function () {
    }
    this.load = function () {
        var storeParams = {};
        Ext.apply(storeParams, {project_id: this.project_id})
        Ext.getCmp('cost_other').getStore().baseParams = storeParams;
        Ext.getCmp('cost_other').getStore().reload();
        loadformdata_bjshpmt(this.ItemPanel, null, this.project_id);
        if (Ext.getCmp('financeverifierstatus').getValue() == '') {
            Ext.getCmp('financeverifierstatus').setValue(1);
        }
        Ext.getCmp('financeverifierstatus').setReadOnly(true);

    }
}
/**
 * 24、会议资料准备
 */
function make_WF3_24_Form() {
    extendBase(this);
    this.loadParams = {d1: true};
    this.saveMethod = "saveFormData24";
    this.makeForm = function () {
        this.ItemPanel = this.initPanel(new WF3.form24());
        return this.ItemPanel;
    }
    var ItemPanel = null;
    this.save = function () {

    }
    this.get = function () {
    }
    this.load = function () {
        var project_id = this.project_id;
        var Store_ = Ext.StoreMgr.lookup('Customize_Store_shpmt');
        if (Store_) {
            Store_.baseParams.projectid = project_id;
            Store_.reload()
        }
        Ext.getCmp('ResultInfoCheck').getStore().baseParams.projectid = project_id;
        Ext.getCmp('ResultInfoCheck').getStore().reload();
        var me = this.ItemPanel;
        Ext.Ajax.request({
            url: 'taskslistAction.ered?reqCode=queryPlaneInfo',
            success: function (response) {
                if (response.responseText != '') {
                    var pmtinfo = Ext.JSON.decode(response.responseText);
                    reloadAppendixData("result_original_download", pmtinfo[0].drawingid);
                    reloadAppendixData("result_picture_download", pmtinfo[0].drawingid);
                    reloadAppendixData("doorheadsizepicture_picture_download", pmtinfo[0].drawingid);    //审核效果图_门头尺寸图（图片）附件
                    reloadAppendixData("doorheadsizepicture_original_download", pmtinfo[0].drawingid);    //审核效果图_门头尺寸图（原件）附件
                    loadFormdataByDto(pmtinfo[0], me, null);
                    if (pmtinfo[0].title) {
                        document.getElementById('pmtInfo').innerHTML = '<a href="./taskslistAction.ered?reqCode=downloadFile&fromid=' + pmtinfo[0].drawing_id + '&title=' + pmtinfo[0].title + '" target="_blank">' + pmtinfo[0].title + '</a>';
                    }

                }
                Ext.getCmp("content").setValue(pmtinfo[0].username + '邀请您参加工程单：' + pmtinfo[0].ordernumber + '的报价讨论会，会议地点：公司本部小会议室');

            },
            failure: function (response) {
                Ext.Msg.alert('提示', "获取平面图信息失败");
            },
            params: {
                projectid: project_id
            }
        });
        loadformdata(me, null, project_id);


    }
}
/**
 * 25、会议纪要上传
 */
function make_WF3_25_Form() {
    extendBase(this);
    this.loadParams = {d1: true};
    this.saveMethod = "saveFormData25";
    this.makeForm = function () {
        this.ItemPanel = this.initPanel(new WF3.form25());
        return this.ItemPanel;
    }
    var ItemPanel = null;
    this.save = function () {
    }
    this.get = function () {
    }
    this.load = function () {
        var project_id = this.project_id;
        var Store_ = Ext.StoreMgr.lookup('Customize_Store_shpmt');
        if (Store_) {
            Store_.baseParams.projectid = project_id;
            Store_.reload()
        }
        var Store_ = Ext.StoreMgr.lookup('Customize_Store_shpmt');
        if (Store_) {
            Store_.baseParams.projectid = project_id;
            Store_.reload()
        }
        Ext.getCmp('ResultInfoCheck').getStore().baseParams.projectid = project_id;
        Ext.getCmp('ResultInfoCheck').getStore().reload();
        var me = this.ItemPanel;
        Ext.Ajax.request({
            url: 'taskslistAction.ered?reqCode=queryPlaneInfo',
            success: function (response) {
                if (response.responseText != '') {
                    var pmtinfo = Ext.JSON.decode(response.responseText);
                    reloadAppendixData("result_original_download", pmtinfo[0].drawingid);
                    reloadAppendixData("result_picture_download", pmtinfo[0].drawingid);
                    reloadAppendixData("doorheadsizepicture_picture_download", pmtinfo[0].drawingid);    //审核效果图_门头尺寸图（图片）附件
                    reloadAppendixData("doorheadsizepicture_original_download", pmtinfo[0].drawingid);    //审核效果图_门头尺寸图（原件）附件
                    loadFormdataByDto(pmtinfo[0], me, null);
                    if (pmtinfo[0].title) {
                        document.getElementById('pmtInfo').innerHTML = '<a href="./taskslistAction.ered?reqCode=downloadFile&fromid=' + pmtinfo[0].drawing_id + '&title=' + pmtinfo[0].title + '" target="_blank">' + pmtinfo[0].title + '</a>';
                    }

                }

            },
            failure: function (response) {
                Ext.Msg.alert('提示', "获取平面图信息失败");
            },
            params: {
                projectid: project_id
            }
        });
        loadformdata(me, null, project_id);
    }
}
/**
 * 26、报价单确认
 */
function make_WF3_26_Form() {
    extendBase(this);
    this.loadParams = {d12: true};
    this.saveMethod = "saveFormData26";
    this.makeForm = function () {
        this.ItemPanel = this.initPanel(new WF3.form26());
        return this.ItemPanel;
    }
    var ItemPanel = null;
    this.save = function () {
    }
    this.get = function () {
    }
    this.load = function () {
        var me = this.ItemPanel;
        var project_id = this.project_id
        Ext.Ajax.request({
            url: 'taskslistAction.ered?reqCode=queryPlaneInfo',
            success: function (response) {
                if (response.responseText != '') {
                    var pmtinfo = Ext.JSON.decode(response.responseText);
                    Ext.getCmp('ordernumber_ybj').ordernumber = pmtinfo[0].ordernumber;
                    Ext.getCmp('Designer_khqr_Value').setValue(pmtinfo[0].designer);
                    Ext.getCmp('useSetMeal_khqr_Value').setValue(pmtinfo[0].usesetmeal);
                    Ext.getCmp('describe_khqr_Value').setValue(pmtinfo[0].describe);
                    Ext.getCmp('append_datetime_khqr').setValue(pmtinfo[0].append_datetime);
                    Ext.getCmp('doesover_khqr').setValue(pmtinfo[0].doesover);
                    var planequote_value = getPriceStatue(pmtinfo[0].buget, pmtinfo[0].planequote);
                    if (pmtinfo[0].planequote) {
                        setFieldValueById('planequote_khqr', pmtinfo[0].planequote);
                        setProjectIdById('planequote_khqr', pmtinfo[0].projectid);
                        setFieldValueById('localplanequote_khqr', pmtinfo[0].localplanequote);
                    }
                    setFieldValueById('othercost_ybj', pmtinfo[0].othercost);
//                    reloadAppendixData('Counter_price_list_ybj',pmtinfo[0].drawing_id);       //柜台价格明细附件
                    if (pmtinfo[0].title) {
                        pmtinfo[0].planequoteDifficulty_khqr = "只含展柜价格,与甲方预算相差" + '(' + planequote_value + ')';
                        setFieldValueById('planequoteDifficulty_khqr', pmtinfo[0].planequoteDifficulty_khqr);

                        pmtinfo[0].localplanequoteDifficulty_khqr = "只含面板价格";
                        setFieldValueById('localplanequoteDifficulty_khqr', pmtinfo[0].localplanequoteDifficulty_khqr);
                        document.getElementById('title_khqr').innerHTML = '<a href="./taskslistAction.ered?reqCode=downloadFile&fromid=' + pmtinfo[0].drawing_id + '&title=' + pmtinfo[0].title + '" target="_blank">' + pmtinfo[0].title + '</a>';
                    }

                }

                return true;//返回true，关闭窗口

            },
            failure: function (response) {
                Ext.Msg.alert('提示', "获取平面图信息失败");
            },
            params: {
                projectid: this.project_id,
                justshowCounter: true,
                otherCost: true
            }
        });
        loadformdata(me, null, project_id);

    }
}
/**
 *  27、下单图补充
 */
function make_WF3_27_Form() {
    extendBase(this);
    this.loadParams = {d1: true, d2: true, d10: true};
    this.saveMethod = "saveFormData27";
    var ItemPanel = null;
    this.makeForm = function () {
        this.ItemPanel = this.initPanel(new WF3.form30());
        return this.ItemPanel;
    }
    this.save = function () {

        this.itemPanel.getForm().submit({
            url: 'taskslistAction.ered?reqCode=save_planeBc',
            method: 'POST',
            params: {
                project_id: this.project_id, drawing_id: Ext.getCmp('pmtInfo_gcxd').drawing_id
            },
            success: function (form, action) {
            },
            failure: function () {
                Ext.Msg.alert('提示', '很报歉，未成功读取到工程表单数据！');
            }
        });


    }
    this.get = function () {
    }
    this.load = function () {

        var me = this.ItemPanel
        var project_id = this.project_id;
        loadformdata_zzpmt(me, null, project_id);
//        Ext.getCmp('UploadXdtInfo').project_id=project_id;
        Ext.getCmp('choiceAppendix').planeChange = false;
        var Store_ = Ext.StoreMgr.lookup('Customize_Store_shpmt');
        if (Store_) {
            Store_.baseParams.projectid = project_id;
            Store_.reload()
        }
//        Ext.StoreMgr.lookup('ProductMeterial_store') .baseParams.projectid=project_id;
//        Ext.StoreMgr.lookup('ProductMeterial_store') .baseParams.justproduct=true;  //表示不显示现场成品
//        Ext.StoreMgr.lookup('ProductMeterial_store') .baseParams.just_Meterial_Package=true;  //表示只查看该订单中没有拆包信息或者没有料单信息的成品件
//        Ext.StoreMgr.lookup('ProductMeterial_store') .reload();
//        Ext.StoreMgr.lookup('CustomizeMeterial_store') .baseParams.just_Meterial_Package=true;  //表示只查看该订单中没有拆包信息或者没有料单信息的成品件
//        Ext.StoreMgr.lookup('CustomizeMeterial_store') .baseParams.projectid=project_id;
//        Ext.StoreMgr.lookup('CustomizeMeterial_store') .reload();

        Ext.getCmp('Layout_Appendix_zzpmt').label.hide();
        Ext.getCmp('Layout_Appendix_zzpmt').hide();

        Ext.Ajax.request({
            url: 'taskslistAction.ered?reqCode=queryPlaneInfo',
            success: function (response) {
                if (response.responseText != '') {
                    var pmtinfo = Ext.JSON.decode(response.responseText);
                    Ext.StoreMgr.lookup('Ad_design_Store').baseParams.drawing_id
                    Ext.StoreMgr.lookup('Ad_design_Store').reload();
                    Ext.StoreMgr.lookup('Customer_Store').baseParams.drawing_id
                    Ext.StoreMgr.lookup('Customer_Store').reload();
                    Ext.StoreMgr.lookup('Customize_Store_zzpmt').baseParams.drawing_id
                    Ext.StoreMgr.lookup('Customize_Store_zzpmt').reload();
//                    Ext.getCmp('UploadXdtInfo').ProjectXDTCount=pmtinfo[0].ProjectXDTCount;
//                    var pmtInfoPanel = new Ext.pmtInfo({doesover: pmtinfo[0].doesover, append_datetime: pmtinfo[0].append_datetime, describe: pmtinfo[0].describe, usesetmeal: pmtinfo[0].usesetmeal, designer: pmtinfo[0].designer, drawing_id: pmtinfo[0].drawing_id, drawingtitle: pmtinfo[0].title});
//                    me.insert(1, pmtInfoPanel);
//                    me.doLayout();

                }
            },
            failure: function (response) {
                Ext.Msg.alert('提示', "获取平面图信息失败");
            },
            params: {
                projectid: project_id
            }
        });
    }
}
/**
 * 30、物流确认
 */
function make_WF3_30_Form() {
    extendBase(this);
    this.loadParams = {d14: true};
    this.saveMethod = "saveFormData27";
    this.makeForm = function () {
        this.ItemPanel = this.initPanel(new WF3.form27());
        return this.ItemPanel;
    }
    var ItemPanel = null;
    this.save = function () {
    }
    this.get = function () {
    }
    this.load = function () {

    }
}

/**
 * 31、合同工期确定
 */
function make_WF3_31_Form() {
    extendBase(this);
    this.loadParams = {d1: true, d2: true, d7: true};
    this.saveMethod = "saveFormData31";
    var mianPanel;
    this.makeForm = function () {
        mianPanel = this.initPanel(new WF3.form31());
        return mianPanel;
    }
    this.save = function () {
    }
    this.get = function () {
    }
    this.load = function () {
    }
}


/**
 * 模块测试
 */
//var testForm = new make_WF3_3_Form();
////var FormNames = [
////    '会议资料准备','会议纪要上传',
////    '客服其他费用补充','财务补充',
////    '报价单确认','发送报价单',               s
////    '合同谈判', '折扣审批',
////    '工厂确认','工程部确认',
////    '货柜合同签订', '客户预付款（70%）',
////    '财务确认', '客服主管审批平行',
////    '水晶字或丝印确认', '设计柜台立面图',
////    '绘制cdr图', '客服确认水晶字或丝印',
////    '现场成品报价（含水晶字）','现场成品合同签订',
////    '财务确认合同', '施工图人员安排',
////    '绘制施工图', '施工图审核',
////    '客户核对', '研发部确认'];
////var FormPanel = [
////    make_WF3_24_Form,make_WF3_25_Form,
////    make_WF3_23_Form,make_WF3_0_Form,
////    make_WF3_26_Form,make_WF3_2_Form,
////    make_WF3_3_Form,make_WF3_4_Form,
////    make_WF3_6_Form,make_WF3_7_Form,
////    make_WF3_8_Form,make_WF3_9_Form,
////    make_WF3_10_Form,make_WF3_11_Form,
////    make_WF3_12_Form,make_WF3_13_Form,
////    make_WF3_14_Form,make_WF3_15_Form,
////    make_WF3_16_Form,make_WF3_17_Form,
////    make_WF3_18_Form,make_WF3_19_Form,
////    make_WF3_20_Form,make_WF3_21_Form,
////    make_WF3_22_Form,make_WF3_23_Form]
//var xxx = new Ext.Window({
//    title: '<span style="float:right;color:#ff0ae8;margin-right:45%;">合同谈判-No1</span>工程单:K001-01-24',
//    width: 850,
//    height: 600,
//    layout: 'fit',
//    bodyStyle: 'background:white;',
//    items: [testForm.makeForm()],
//    formNo: 0,
//    buttons: [
//        {text: '上一单', handler: function () {
//            if (xxx.formNo == 1) {
//                return;
//            }
//            xxx.removeAll();
//            testForm = eval("new "+FormPanel[--xxx.formNo]+'()');
//            xxx.add(testForm.makeForm());
//            xxx.doLayout();
//            xxx.setTitle('<span style="float:right;color:#ff0ae8;margin-right:45%;">' + FormNames[xxx.formNo] + '-No' + xxx.formNo + '</span>工程单:K001-01-18');
//        }},
//        {text: '下一单', handler: function () {
//            if (xxx.formNo == 25) {
//                return;
//            }
//            xxx.removeAll();
//            testForm = eval("new "+FormPanel[++xxx.formNo]+'()');
//            xxx.add(testForm.makeForm());
//            xxx.doLayout();
//            xxx.setTitle('<span style="float:right;color:#ff0ae8;margin-right:45%;">' + FormNames[xxx.formNo ] + '-No' + xxx.formNo + '</span>工程单:K001-01-18');
//        }},
//        {text: '测试save', handler: function () {
//            testForm.saveFormData({/*sendcontent : Ext.getCmp('content').getValue()*/});
//        }},
//        {text: '测试get', handler: function () {
//            console.log(testForm.getFormData());
//        }},
//        {text: '测试load', handler: function () {
//
////            alert(Ext.getCmp('cost_other').getStore().proxy.url);
////            Ext.getCmp('cost_other').getStore().proxy = new Ext.data.HttpProxy({url:"xxx"});
////            alert(Ext.getCmp('cost_other').getStore().proxy.url);
//            testForm.loadFormData("10103289700");
//        }}
//    ]
//});
//Ext.onReady(function () {
//    setTimeout(function () {
//        xxx.show();
//    }, 800);
//});

/**
 * 获取gridpanel的数据
 * @param gridpanelID
 * @return {*}
 */
function getgriddata(gridpanelID) {
    o = {};
    var grid_panel = Ext.getCmp(gridpanelID);
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
 * 计算可客服补充其他费用
 * @param gridpanelID
 * @return {*}
 */
function getgriddataRow(gridpanelID) {
    o = {};
    var grid_panel = Ext.getCmp(gridpanelID);
    if (!Ext.isEmpty(grid_panel)) {
        var datastore = grid_panel.getStore();
        if (datastore.getCount() != 0) {
            for (var i = 0; i < datastore.getCount(); i++) {
                o['cost_name' + i] = datastore.getAt(i).data.cost_name;
                o['cost_describe' + i] = datastore.getAt(i).data.cost_describe;
                o['cost_time' + i] = datastore.getAt(i).data.cost_time;
                o['cost_money' + i] = datastore.getAt(i).data.cost_money;
            }
            o["length"] = datastore.getCount();
//            var gridpaneldata = Ext.JSON.encode(records);
//            eval("o." + gridpanelID + "=gridpaneldata");
        } else {
            o["length"] = 0;
        }
    }
    return o;
}

/**
 * 财务审核是否一致
 */
function make_WF3_32_Form() {
    var ItemPanel = null;
    extendBase(this);
    this.loadParams = {d1: true};
    this.saveMethod = "saveFormData32";
    this.makeForm = function () {
        this.ItemPanel = this.initPanel(new WF3.form32());
        return this.ItemPanel
    }

    this.save = function () {


    }
    this.get = function () {
    }
    this.load = function () {
        var me = this.ItemPanel
        var project_id = this.project_id;
        Ext.getCmp('xdtCheck').project_id = this.project_id;
        Ext.Ajax.request({
            url: 'taskslistAction.ered?reqCode=queryPlaneInfo',
            success: function (response) {
                if (response.responseText != '[]' && response.responseText != '') {
                    var pmtinfo = Ext.JSON.decode(response.responseText);
                    if (pmtinfo[0].drawing_id !== null) {
                        hasDrawing = true;
                    }
                    reloadAppendixData("Layout_Appendix_khqr_download", pmtinfo[0].layoutplaneid);
                    Ext.getCmp('Designer_khqr_Value').setValue(pmtinfo[0].designer);
                    Ext.getCmp('useSetMeal_khqr_Value').setValue(pmtinfo[0].usesetmeal);
                    Ext.getCmp('describe_khqr_Value').setValue(pmtinfo[0].describe);
                    Ext.getCmp('append_datetime_khqr').setValue(pmtinfo[0].append_datetime);
                    Ext.getCmp('doesover_khqr').setValue(pmtinfo[0].doesover);
                    var planequote_value = getPriceStatue(pmtinfo[0].buget, pmtinfo[0].planequote);
                    if (pmtinfo[0].planequote) {
                        setFieldValueById('planequote_khqr', pmtinfo[0].planequote);
                        setProjectIdById('planequote_khqr', pmtinfo[0].projectid);
                        setFieldValueById('localplanequote_khqr', pmtinfo[0].localplanequote);

                    }
                    if (pmtinfo[0].title) {
                        pmtinfo[0].planequoteDifficulty_khqr = "不含面板价格,与甲方预算相差" + '(' + planequote_value + ')';
                        setFieldValueById('planequoteDifficulty_khqr', pmtinfo[0].planequoteDifficulty_khqr);

                        pmtinfo[0].localplanequoteDifficulty_khqr = "只含面板价格";
                        setFieldValueById('localplanequoteDifficulty_khqr', pmtinfo[0].localplanequoteDifficulty_khqr);

                        document.getElementById('title_khqr').innerHTML = '<a href="./taskslistAction.ered?reqCode=downloadFile&fromid=' + pmtinfo[0].drawing_id + '&title=' + pmtinfo[0].title + '" target="_blank">' + pmtinfo[0].title + '</a>';
                    }
                    Ext.getCmp('ordernumber_ybj').ordernumber = pmtinfo[0].ordernumber;
                }
                var o = {};
                return true;//返回true，关闭窗口

            },
            failure: function (response) {
                Ext.Msg.alert('提示', "获取平面图信息失败");
            },
            params: {
                projectid: project_id
            }
        });
        loadformdata(this.ItemPanel, null, project_id);

    }
}

/**
 * 财务确认第二笔款
 */
function make_WF3_33_Form() {
    var ItemPanel = null;
    extendBase(this);
    this.loadParams = {d1: true, d15: true};
    this.saveMethod = "saveFormData28";
    this.makeForm = function () {
        this.ItemPanel = this.initPanel(new WF3.form33());
        return this.ItemPanel
    }

    this.save = function () {


    }
    this.get = function () {
    }
    this.load = function () {
        var me = this.ItemPanel
        var project_id = this.project_id;
        loadformdata(this.ItemPanel, null, project_id);


    }
}


function make_WF3_34_Form() {
    var ItemPanel = null;
    extendBase(this);
    this.loadParams = {d1: true, d7: true, d13: true};
    this.saveMethod = "saveFormData29";
    this.makeForm = function () {
        this.ItemPanel = this.initPanel(new WF3.form34());
        return this.ItemPanel
    }

    this.save = function () {


    }
    this.get = function () {
    }
    this.load = function () {
        var me = this.ItemPanel
        var project_id = this.project_id;
        loadformdata(this.ItemPanel, null, project_id);
    }
}


//function cw(){
//new Ext.Window({
//    title: '测试',
//    width: 800,
//    height: 500,
//    layout:'auto',
//    items: [
////        new CM.upLoadGrid({fileKey: "T_SB_MailIn_file"})
////        ,
////        new CM.upLoadGrid({fileKey: "T_SB_MailIn_file"})
////        ,
////        new Ext.Panel({title:'xdfs'}),
//        new CM.simpleUpLoadGrid({gridSettings:{fileKey: "T_SB_MailIn_file",id:'test_cm',to_id:'89757',autoLoad:true}})
////        ,
////        new CM.simpleUpLoadGrid({gridSettings:{fileKey: "T_SB_MailIn_file"}})
////        ,
////        new CM.simpleUpLoadGrid({gridSettings:{fileKey: "T_SB_MailIn_file"}})
//    ],
//    buttons: [
//        {text: '测试转换模式false', handler: function () {
//            Ext.getCmp('test_cm').changeModel(false);
//        }
//        },
//        {text: '测试转换模式true', handler: function () {
//            Ext.getCmp('test_cm').changeModel(true);
//        }
//        },
//        {text: '添加绑定', handler: function () {
//            Ext.getCmp('test_cm').addBind("89757");
//        }
//        },
//        {text: '解除绑定', handler: function () {
//            Ext.getCmp('test_cm').removeBind("89757");
//        }
//        }
//    ],
//    listeners:{
//        destroy:function(){
//            cw();
//        }
//    }
//}).show();
//
//}
//
//cw();
