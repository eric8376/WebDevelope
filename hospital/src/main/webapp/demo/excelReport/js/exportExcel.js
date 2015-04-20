/**
 * Excel导出
 * 
 * @author XiongChun
 * @since 2010-08-20
 */
Ext.require('Ext4.Demo.Model.Catalogs_Model');
Ext.onReady(function() {
	var cm =[
        {
        xtype: 'rownumberer',
        text: '序号',
        width: 32
    }, {
				text : '项目ID',
				dataIndex : 'xmid',
				sortable : true
			}, {
				text : '大类',
				dataIndex : 'sfdlbm',
				hidden : true,
				width : 50
			}, {
				text : '项目名称',
				dataIndex : 'xmmc',
				width : 200
			}, {
				text : '项目热键',
				dataIndex : 'xmrj'
			}, {
				text : '规格',
				dataIndex : 'gg'
			}, {
				text : '单位',
				dataIndex : 'dw',
				width : 60
			}, {
				text : '启用状态',
				dataIndex : 'qybz',
				hidden : true,
				width : 60
			}, {
				text : '剂型',
				dataIndex : 'jx',
				width : 60
			}, {
				text : '产地',
				dataIndex : 'cd',
				width : 200
			}, {
				text : '医院编码',
				dataIndex : 'yybm'
			}, {
				text : '更改时间',
				dataIndex : 'ggsj'
			}, {
				id : '_blank',
				text : '',
				dataIndex : '_blank'
			}];

	/**
	 * 数据存储
	 */
	var store =Ext.create('Ext.data.Store',{
        model: 'Ext4.Demo.Model.Catalogs_Model',
        pageSize:'20',
        proxy: {
            type: 'ajax',
            url: 'excelReportDemo.ered?reqCode=queryCatalogs4Export',
            reader: {
                type: 'json',
                totalProperty : 'TOTALCOUNT', // 记录总数
                root : 'ROOT' // Json中的列表数据根节点
            }
        }
    }) ;

	/**
	 * 翻页排序时候的参数传递
	 */
	store.on('beforeload', function() {
        Ext.apply(store.proxy.extraParams, {xmmc: Ext.getCmp('xmmc').getValue()});
			});
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
	pagesize_combo.on("select", function(comboBox) {
   var     number = parseInt(comboBox.getValue());
        bbar.pageSize = number;
        store.pageSize = number;
        store.loadPage(1 );
			});

	var bbar = new Ext.PagingToolbar({
				pageSize : '20',
				store : store,
				displayInfo : true,
				displayMsg : '显示{0}条到{1}条,共{2}条',
                emptyMsg: "没有符合条件的记录",
                plugins: [Ext.create('Ext.ux.ProgressBarPager') ], // 分页进度条
				items : ['-', '&nbsp;&nbsp;', pagesize_combo]
			});

	var grid = new Ext.grid.Panel({
		title : '<span class="commoncss">医院收费目录</span>',
		height : 500,
		// width:600,
		autoScroll : true,
		region : 'center',
		store : store,
		loadMask : {
			msg : '正在加载表格数据,请稍等...'
		},
		stripeRows : true,
		frame : true,
		autoExpandColumn : '_blank',
        columns : cm,
		tbar : [
            new Ext.form.TextField({
							id : 'xmmc',
							name : 'xmmc',
							emptyText : '请输入项目名称',
							enableKeyEvents : true,
							listeners : {
								specialkey : function(field, e) {
									if (e.getKey() == Ext.EventObject.ENTER) {
										queryCatalogItem();
									}
								}
							},
							width : 150
						}), {
					text : '查询',
					iconCls : 'page_findIcon',
					handler : function() {
						queryCatalogItem();
					}
				},  '-', {
					text : '导出(简单表头1)',
					tooltip : '以仿Ajax方式导出,界面无刷新',
					iconCls : 'page_excelIcon',
					handler : function() {
						exportExcel('excelReportDemo.ered?reqCode=exportExcel');
					}
				}, '-', {
					text : '导出(复杂表头)',
					tooltip : '以仿Ajax方式导出,界面无刷新',
					iconCls : 'page_excelIcon',
					handler : function() {
						exportExcel('excelReportDemo.ered?reqCode=exportExcel2');
					}
				}],
		bbar : bbar
	});
	store.loadPage(1);
	bbar.on("change", function() {
        grid.getSelectionModel().select(0);
			});

	/**
	 * 布局
	 */
	var viewport = new Ext.Viewport({
				layout : 'border',
				items : [grid]
			});

	/**
	 * 查询医院收费目录
	 */
	function queryCatalogItem() {
        store.loadPage(1,{params : {
            xmmc : Ext.getCmp('xmmc').getValue()
        }})
	}

});