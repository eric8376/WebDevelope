Ext.require('Ext4.Com.Model.processDefinitionManage_Model');

Ext.onReady(function () {
    var processDefinitionManagesm = Ext.create('Ext.selection.CheckboxModel', {
        mode: 'SINGLE'
    });
    /**
     * 待办工作的列模式
     */
    var processDefinitionManageCm = [{
        xtype: 'rownumberer',
        text: '序号',
        width: 32
    }, {
        text: '流程定义ID', // 列标题resizable:false,
        resizable: true,
        sortable: true,
        menuDisabled: true,
        dataIndex: 'id' // 数据索引:和Store模型对应
    }, {
        text: '部署ID', // 列标题resizable:false,
        resizable: true,
        sortable: true,
        menuDisabled: true,
        dataIndex: 'deploymentid' // 数据索引:和Store模型对应
    }, {
        text: '流程名称', // 列标题resizable:false,
        resizable: true,
        sortable: true,
        menuDisabled: true,
        dataIndex: 'name' // 数据索引:和Store模型对应
    }, {
        text: 'KEY', // 列标题resizable:false,
        resizable: true,
        sortable: true,
        menuDisabled: true,
        dataIndex: 'key' // 数据索引:和Store模型对应
    }, {
        text: '版本号', // 列标题resizable:false,
        resizable: true,
        sortable: true,
        menuDisabled: true,
        dataIndex: 'version' // 数据索引:和Store模型对应
    }/*, {
     text : '图片', // 列标题resizable:false,
     resizable : true,
     sortable : true,
     renderer : function(value, cellmeta, record, rowIndex) {
     var rowindex = rowIndex;
     return '<a target="_blank" href=\'//processFiles\\struts-config-WorkFlow.xml\' >图片</a>';
     },
     menuDisabled : true,
     dataIndex : 'arriveTime' // 数据索引:和Store模型对应
     }*/, {
        text: '部署时间', // 列标题resizable:false,
        resizable: true,
        sortable: true,
        menuDisabled: true,
        dataIndex: 'resourceName' // 数据索引:和Store模型对应
    }, {
        text: '是否挂起', // 列标题resizable:false,
        resizable: true,
        sortable: true,
        menuDisabled: true,
        renderer: function (value, cellmeta, record, rowIndex) {
            var rowindex = rowIndex;
            if (value == '1') {
                return '<a  href=\'#\' onclick="alert(\'asassa\')">挂起</a>';
            }
            else {
                return '<a  href=\'#\' onclick="alert(\'asassa\')">激活</a>';
            }
        },
        dataIndex: 'isSuspended' // 数据索引:和Store模型对应
    }, {
        text: '操作', // 列标题resizable:false,
        resizable: true,
        sortable: true,
        menuDisabled: true,
        renderer: function (value, cellmeta, record, rowIndex) {
            var rowindex = rowIndex;
            return '<a  href=\'#\' onclick="alert(\'asassa\')">删除</a>';
        },
        dataIndex: 'id' // 数据索引:和Store模型对应
    }];

    var processDefinitionManageStore = Ext.create('Ext.data.Store', {
        autoLoad: true,
        pageSize: '20',
        model: 'Ext4.Com.Model.processDefinitionManage_Model',
        proxy: {
            extraParams: {},
            type: 'ajax',
            url: 'WorkFlowAction.ered?reqCode=flowListFind',
            reader: {
                type: 'json'
            }
        }
    });
// 每页显示条数下拉选择框
    var pagesize_combo = Ext.create('Ext.form.field.ComboBox', {
        triggerAction: 'all',
        queryMode: 'local',
        store: new Ext.data.ArrayStore({
            fields: ['value', 'text'],
            data: [
                [10, '10条/页'],
                [20, '20条/页'],
                [50, '50条/页'],
                [100, '100条/页'],
                [250, '250条/页'],
                [500, '500条/页']
            ]
        }),
        valueField: 'value',
        displayField: 'text',
        value: '20',
        editable: false,
        width: 85
    });
// 改变每页显示条数reload数据
    pagesize_combo.on("select", function (comboBox) {
        var tempnumber = parseInt(comboBox.getValue());
        processDefinitionManageStore.pageSize = tempnumber;
        processDefinitionManageStore.loadPage(1);
    });
// 分页工具栏
    var bbar = new Ext.PagingToolbar({
        pageSize: '20',
        store: processDefinitionManageStore,
        displayInfo: true,
        displayMsg: '显示{0}条到{1}条,共{2}条',
        plugins: [Ext.create('Ext.ux.ProgressBarPager')], // 分页进度条
        emptyMsg: "没有符合条件的记录",
        items: ['-', '&nbsp;&nbsp;', pagesize_combo]
    });
    /**
     * 上传部署流程文件的窗口面板
     */
    var uploadProcessFileForm = new Ext.form.Panel({
        fileUpload: true, // 一定要设置这个属性,否则获取不到上传对象的
        labelWidth: 60,
        labelAlign: 'right',
        bodyStyle: 'padding:5 5 5 5',
        items: [
            {
                fieldLabel: '选择文件',
                // id : 'file1',
                name: 'file1', // 必须为file1/file2/file3/file4/file5.目前Web标准上传模式支持最多5个文件的批量上传
                xtype: 'fileuploadfield', // 上传字段
                allowBlank: false,
                regex: new RegExp("^.*\.zip|.*\.bar|.*\.bpmn|.*\.pbmn20.xml$", "i"),
                regexText: '只支持zip、bar、bpmn、pbmn20.xml格式',
                anchor: '100%'
            }
        ]
    });
    /**
     * 上传部署流程文件的窗口
     */
    var uploadProcessFileWindow = new Ext.window.Window({
        title: '<span class="commoncss">部署新流程</span>', // 窗口标题
        layout: 'fit', // 设置窗口布局模式
        width: 500, // 窗口宽度
        height: 200, // 窗口高度
        closable: true, // 是否可关闭
        resizable: true,
        draggable: true,// 是否可拖动
        closeAction: 'hide',
        modal: true,
        animCollapse: true,
        animateTarget: Ext.getBody(),
        border: false, // 边框线设置
        // pageY : 20, // 页面定位X坐标
        pageX: document.body.clientWidth / 2 - 500 / 2, // 页面定位Y坐标
        items: [uploadProcessFileForm], // 嵌入的表单面板
        buttons: [
            { // 窗口底部按钮配置
                text: '部署', // 按钮文本
                iconCls: 'uploadIcon', // 按钮图标
                handler: function () { // 按钮响应函数
                    submitProcessFileForm();
                }
            },
            {	// 窗口底部按钮配置
                text: '关闭', // 按钮文本
                iconCls: 'tbar_synchronizeIcon', // 按钮图标
                handler: function () { // 按钮响应函数
                    uploadProcessFileWindow.hide();
                }
            }
        ]
    });

    /**
     * 提交流程部署窗口
     */
    function submitProcessFileForm() {
        var requesturl = 'WorkFlowAction.ered?reqCode=flowdeploy';
        uploadProcessFileForm.form.submit({
            url: requesturl,
            waitTitle: '提示',
            method: 'POST',
            waitMsg: '正在提交流程部署,请稍候...',
            timeout: 60000, // 60s
            success: function (form, action) {
                uploadProcessFileForm.form.reset();
                uploadProcessFileWindow.hide();
                //if (mode == 'http') store.reload();
                Ext.MessageBox.alert('提示', action.result.msg);
                processDefinitionManageStore.reload();
            },
            failure: function (response) {
                Ext.MessageBox.alert('提示', '流程部署失败');
            }
        });
    }

    /**
     存放订单号的panel
     */
    var processDefinitionManagegrid = new Ext.grid.Panel({
        collapsed: false,
        title: '<span class="commoncss">待办工作</span>',
        border: true,
        viewConfig: {
            // 不产横向生滚动条, 各列自动扩展自动压缩, 适用于列数比较少的情况
            enableTextSelection: true
        },
        hideCollapseTool: true,
        // 表格面板标题,默认为粗体，我不喜欢粗体，这里设置样式将其格式为正常字体
        autoScroll: true,
        frame: true,
        store: processDefinitionManageStore, // 数据存储
        stripeRows: true, // 斑马线
        columns: processDefinitionManageCm, // 列模型
        selModel: processDefinitionManagesm,
        tbar: ['->', {
            text: '部署流程',
            iconCls: 'deleteIcon',
            handler: function () {
                //var record = processDefinitionManagegrid.getSelectionModel().getSelected();
                uploadProcessFileWindow.show();
            }
        }],
        loadMask: {
            msg: '正在加载表格数据,请稍等...'
        }
    });
// 布局模型
    var viewport = new Ext.Viewport({
        layout: 'fit',
        items: [processDefinitionManagegrid]
    });

});