var endprocesslistDynamicFormrownum = new Ext.grid.RowNumberer({
    header: '序号',
    width: 32
});
/*	var endprocesslistDynamicFormsm = new Ext.grid.CheckboxSelectionModel({
 singleSelect : true
 });*/
/**
 * 待办工作的列模式
 */
var endprocesslistDynamicFormCm = new Ext.grid.ColumnModel([endprocesslistDynamicFormrownum/*, endprocesslistDynamicFormsm*/, {
    header: '流程ID', // 列标题resizable:false,
    resizable: true,
    sortable: true,
    editor: new Ext.grid.GridEditor(new Ext.form.TextField({
        // 只对原有数据编辑有效,对新增一行的场景无效
        allowBlank: false

    })),
    menuDisabled: true,
    dataIndex: 'type' // 数据索引:和Store模型对应
}, {
    header: '流程定义ID', // 列标题resizable:false,
    resizable: true,
    sortable: true,
    editor: new Ext.grid.GridEditor(new Ext.form.TextField({
        // 只对原有数据编辑有效,对新增一行的场景无效
        allowBlank: false

    })),
    menuDisabled: true,
    dataIndex: 'type' // 数据索引:和Store模型对应
}, {
    header: '流程启动时间', // 列标题resizable:false,
    resizable: true,
    sortable: true,
    editor: new Ext.grid.GridEditor(new Ext.form.TextField({
        // 只对原有数据编辑有效,对新增一行的场景无效
        allowBlank: false

    })),
    menuDisabled: true,
    dataIndex: 'theme' // 数据索引:和Store模型对应
}, {
    header: '流程结束时间', // 列标题resizable:false,
    resizable: true,
    sortable: true,
    editor: new Ext.grid.GridEditor(new Ext.form.TextField({
        // 只对原有数据编辑有效,对新增一行的场景无效
        allowBlank: false

    })),
    menuDisabled: true,
    dataIndex: 'currenttransactor' // 数据索引:和Store模型对应
}, {
    header: '流程结束原因', // 列标题resizable:false,
    resizable: true,
    sortable: true,
    /*editor : new Ext.grid.GridEditor(new Ext.form.TextField({
     // 只对原有数据编辑有效,对新增一行的场景无效
     allowBlank : false

     })),*/
    menuDisabled: true,
    dataIndex: 'Creator' // 数据索引:和Store模型对应
}]);

var endprocesslistDynamicFormStore = new Ext.data.Store({
    // 获取数据的方式
    proxy: new Ext.data.HttpProxy({
        url: 'T_AD_AttributeAction.ered?reqCode=queryT_AD_Attribute'
    }),
    // 数据读取器
    reader: new Ext.data.JsonReader({
        totalProperty: 'TOTALCOUNT', // 记录总数
        root: 'ROOT' // Json中的列表数据根节点
    }, [{
        name: 'attribute_id' // 数据索引:和Store模型对应
    }, {
        name: 'attribute_name' // 数据索引:和Store模型对应
    }, {
        name: 'data_type'
    }, {
        name: 'data_size'
    }, {
        name: 'unit'
    }, {
        name: 'expression_name'
    }, {
        name: 'validate_pointout'
    }, {
        name: 'describe'
    }, {
        name: 'attribute_type'
    }, {
        name: 'input_type'
    }, {
        name: 'no_size'
    }, {
        name: 'field'
    }, {
        name: 'fieldvalue'
    }, {
        name: 'sequence'
    }])
});
// 每页显示条数下拉选择框
var pagesize_combo = new Ext.form.field.ComboBox({
    name: 'pagesize',
    triggerAction: 'all',
    mode: 'local',
    store: new Ext.data.ArrayStore({
        fields: ['value', 'text'],
        data: [[10, '10条/页'], [20, '20条/页'], [50, '50条/页'],
            [100, '100条/页'], [250, '250条/页'],
            [500, '500条/页']]
    }),
    valueField: 'value',
    displayField: 'text',
    value: '20',
    editable: false,
    width: 85
});
// 改变每页显示条数reload数据
pagesize_combo.on("select", function (comboBox) {
    bbar.pageSize = parseInt(comboBox.getValue());
    number = parseInt(comboBox.getValue());
    endprocesslistDynamicFormStore.reload({
        params: {
            start: 0,
            limit: bbar.pageSize
        }
    });
});
var number = parseInt(pagesize_combo.getValue());
// 分页工具栏
var bbar = new Ext.PagingToolbar({
    pageSize: number,
    store: endprocesslistDynamicFormStore,
    displayInfo: true,
    displayMsg: '显示{0}条到{1}条,共{2}条',
    plugins: new Ext.ux.ProgressBarPager(), // 分页进度条
    emptyMsg: "没有符合条件的记录",
    items: ['-', '&nbsp;&nbsp;', pagesize_combo]
});
/**
 存放订单号的panel
 */
var endprocesslistDynamicFormgrid = new Ext.grid.EditorGridPanel({
    collapsed: false,
    title: '<span class="commoncss">已结束流程(动态)</span>',
    clicksToEdit: 1,
    listeners: {
        validateedit: function (e) {
            e.cancel = true;
        }
    },
    border: true,
    hideCollapseTool: true,
    // 表格面板标题,默认为粗体，我不喜欢粗体，这里设置样式将其格式为正常字体
    autoScroll: true,
    frame: true,
    store: endprocesslistDynamicFormStore, // 数据存储
    stripeRows: true, // 斑马线
    cm: endprocesslistDynamicFormCm, // 列模型
    bbar: bbar,
//			sm:endprocesslistDynamicFormsm,
    viewConfig: {
        // 不产横向生滚动条, 各列自动扩展自动压缩, 适用于列数比较少的情况
        forceFit: true
    },
    loadMask: {
        msg: '正在加载表格数据,请稍等...'
    }
});
endprocesslistDynamicFormStore.addSorted(new Ext.data.Record());
// 布局模型
var viewport = new Ext.Viewport({
    layout: 'fit',
    items: [endprocesslistDynamicFormgrid]
});
