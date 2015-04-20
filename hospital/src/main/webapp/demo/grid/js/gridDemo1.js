/**
 * 表格综合示例
 * 
 * @author XiongChun
 * @since 2010-10-20
 */
Ext.onReady(function(){
Ext.define('Catalogs_Model', {
    extend: 'Ext.data.Model',
    fields: [
        {
            name : 'xmid'
        }, {
            name : 'sfdlbm'
        }, {
            name : 'xmmc'
        }, {
            name : 'xmrj'
        }, {
            name : 'gg'
        }, {
            name : 'dw'
        }, {
            name : 'qybz'
        }, {
            name : 'jx'
        }, {
            name : 'cd'
        }, {
            name : 'yybm'
        }, {
            name : 'ggsj'
        }
    ]
});
			// 复选框
    var selModel = Ext.create('Ext.selection.CheckboxModel' );

			// 定义自动当前页行号
			var rownum =   {
                    xtype: 'rownumberer',
                    text: '序号',
                    width: 32
                }

            // 定义列模型
			var cm = [rownum,   {
						text : '操作', // 列标题
						dataIndex : 'edit',
						width : 35,
						renderer : iconColumnRender
					}, {
						text : '项目ID', // 列标题
						dataIndex : 'xmid', // 数据索引:和Store模型对应
						sortable : true
						// 是否可排序
				}	, {
						text : '大类',
						dataIndex : 'sfdlbm',
						hidden : true, // 隐藏列
						sortable : true,
						width : 50
						// 列宽
				}	, {
						text : '项目名称',
						dataIndex : 'xmmc',
						sortable : true,
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
						renderer : colorRender, // 演示render的用法(自定义)
						width : 60
					}, {
						text : '启用状态',
						dataIndex : 'qybz',
						// 演示render的用法(代码转换,该render由<eRedG4:ext.codeRender/>标签生成)
						renderer : QYBZRender,
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
					}];

			/**
			 * 数据存储
			 */
			var store = Ext.create('Ext.data.Store',{
                model: 'Catalogs_Model',
                pageSize:'20',
                autoLoad:true,
                proxy: {
                    type: 'ajax',
                    url: 'gridDemo.ered?reqCode=querySfxmDatas',
                    reader: {
                        type: 'json',
                        totalProperty : 'TOTALCOUNT', // 记录总数
                        root : 'ROOT' // Json中的列表数据根节点
                    }
                }
            }) ;

			// 翻页排序时带上查询条件
			store.on('beforeload', function() {
                Ext.apply(store.proxy.extraParams, {xmmc: Ext.getCmp('xmmc').getValue() });
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
			pagesize_combo.on("select", function(comboBox) {
                var  number = parseInt(comboBox.getValue());
                bbar.pageSize = number;
                store.pageSize = number;
                store.loadPage(1 );
					});

			// 分页工具栏
			var bbar = new Ext.PagingToolbar({
                pageSize:'20',
                store : store,
                displayInfo : true,
                displayMsg : '显示{0}条到{1}条,共{2}条',
                emptyMsg : "没有符合条件的记录",
                items : [ '-', '&nbsp;&nbsp;', pagesize_combo ]
            });

			// 表格工具栏
			var tbar = new Ext.toolbar.Toolbar({
						items : [{
									xtype : 'textfield',
									id : 'xmmc',
									name : 'xmmc',
									emptyText : '请输入项目名称',
									width : 150,
									enableKeyEvents : true,
									// 响应回车键
									listeners : {
										specialkey : function(field, e) {
											if (e.getKey() == Ext.EventObject.ENTER) {
												queryCatalogItem();
											}
										}
									}
								}, {
									text : '查询',
									iconCls : 'page_findIcon',
									handler : function() {
										queryCatalogItem();
									}
								}, {
									text : '刷新',
									iconCls : 'page_refreshIcon',
									handler : function() {
										store.reload();
									}
								}, '-', {
									text : '获取选择行',
									handler : function() {
										getCheckboxValues();
									}
								}]
					});

			// 表格右键菜单
			var contextmenu = new Ext.menu.Menu({
						id : 'theContextMenu',
						items : [{
							text : '查看详情',
							iconCls : 'previewIcon',
							handler : function() {
								// 获取当前选择行对象
								var record = grid.getSelectionModel()
										.getSelection();
								var xmmc = record[0].get('xmmc');
								Ext.MessageBox.alert('提示', xmmc);
							}
						}, {
							text : '导出列表',
							iconCls : 'page_excelIcon',
							handler : function() {
								// 获取当前选择行对象
								var record = grid.getSelectionModel()
										.getSelection();
								var xmmc =  record[0].get('xmmc');
								Ext.MessageBox.alert('提示', xmmc);
							}
						}]
					});

			// 表格实例
			var grid = new Ext.grid.Panel({
						// 表格面板标题,默认为粗体，我不喜欢粗体，这里设置样式将其格式为正常字体
						title : '<span class="commoncss">表格综合演示一</span>',
						height : 500,
						frame : true,
						autoScroll : true,
						region : 'center', // 和VIEWPORT布局模型对应，充当center区域布局
						store : store, // 数据存储
						stripeRows : true, // 斑马线
                        columns : cm,
                        selModel : selModel,
						tbar : tbar, // 表格工具栏
						bbar : bbar,// 分页工具栏
						viewConfig : {
			// 不产横向生滚动条, 各列自动扩展自动压缩, 适用于列数比较少的情况
						// forceFit : true
						},
						loadMask : {
							msg : '正在加载表格数据,请稍等...'
						}
					});
			// 页面初始自动查询数据
			// store.load({params : {start : 0,limit : bbar.pageSize}});

			// 小画笔点击事件
			grid.on("cellclick", function(gridpanel, td, cellIndex, record, tr, rowIndex, e, eOpts) {
                if(cellIndex==0)
                {
                    return ;
                }
                var fieldName = grid.columns[cellIndex-1].dataIndex;
						// columnIndex为小画笔所在列的索引,缩阴从0开始
						// 这里要非常注意!!!!!
						if (fieldName == 'edit' && cellIndex == 2) {
							var xmmc = record.get("xmmc");
							// 到此你就可以继续做其他任何事情了
							Ext.MessageBox.alert('提示', xmmc);
						}
					});

			// 监听单元格双击事件
			grid.on("celldblclick", function(gridview ,  td,  cellIndex,  record,  tr,  rowIndex, e,  eOpts) {
                if(cellIndex==0)
                {
                    return ;
                }
                var fieldName = grid.columns[cellIndex-1].dataIndex;
				var cellData = record.get(fieldName);
					// Ext.MessageBox.alert('提示', cellData);
				});

			// 监听行双击事件
			grid.on('itemdblclick', function(pGrid, record, item, index, e, eOpts) {
						// 获取单元格数据集
						var data = record.get("xmmc");
						Ext.MessageBox.alert('提示', "双击行的索引为:" + rowIndex);
					});

			// 给表格绑定右键菜单
			grid.on("itemcontextmenu", function(grid, record, item, index, e, eOpts ) {
						e.preventDefault(); // 拦截默认右键事件
                        grid.getSelectionModel().select(record);
						contextmenu.showAt(e.getXY());
					});

			// 布局模型
			var viewport = new Ext.Viewport({
						layout : 'border',
						items : [grid]
					});

			// 查询表格数据
			function queryCatalogItem() {
				store.load({
							params : {
								start : 0,
								limit : bbar.pageSize,
								xmmc : Ext.getCmp('xmmc').getValue()
							}
						});
			}

			// 获取选择行
			function getCheckboxValues() {
				// 返回一个行集合JS数组
				var rows = grid.getSelectionModel().getSelection();
				if (Ext.isEmpty(rows)) {
					Ext.MessageBox.alert('提示', '您没有选中任何数据!');
					return;
				}
				// 将JS数组中的行级主键，生成以,分隔的字符串
				var strChecked = jsArray2JsString(rows, 'xmid');
				Ext.MessageBox.alert('提示', strChecked);
				// 获得选中数据后则可以传入后台继续处理
			}

			// 演示render的用法
			function colorRender(value, cellMetaData, record) {
				// alert(record.data.xmid); 可以获取到Record对象哦
				if (value == '盒') {
					return "<span style='color:red; font-weight:bold'>" + value
							+ "</span>";
				}
				if (value == '瓶') {
					return "<span style='color:green; font-weight:bold'>"
							+ value + "</span>";
				}
				return value;
			}

			// 生成一个图标列
			function iconColumnRender(value) {
				return "<a href='javascript:void(0);'><img src='" + webContext
						+ "/resource/image/ext/edit1.png'/></a>";;
			}
})