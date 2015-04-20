/**
 * 表格综合示例
 * 
 * @author XiongChun
 * @since 2010-10-20
 */
Ext.onReady(function() {
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
			// 定义一个行级展开器(需要在CM和grid配置中加入)
			var expander = new Ext.grid.plugin.RowExpander({
                rowBodyTpl : [
                    '<p style=margin-left:70px;><span style=color:Teal;>项目ID</span><br><span>{xmid}</span></p>',
                    '<p style=margin-left:70px;><span style=color:Teal;>项目名称</span><br><span>{xmmc}</span></p>',
                    '<p style=margin-left:70px;><span style=color:Teal;>产地</span><br><span>{cd}</span></p>'],
                // 屏蔽双击事件
                expandOnDblClick : true
            });

			// 定义自动当前页行号
			var rownum =   {
                xtype: 'rownumberer',
                text: '序号',
                width: 32
            } ;

			// 定义列模型
			var cm = [rownum,   {
				text : '项目ID', // 列标题
				dataIndex : 'xmid', // 数据索引:和Store模型对应
				sortable : true
					// 是否可排序
				}, {
				text : '大类',
				dataIndex : 'sfdlbm',
				hidden : true, // 隐藏列
				sortable : true,
				width : 50
					// 列宽
				}, {
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
			}];

			/**
			 * 数据存储
			 */
			var store =Ext.create('Ext.data.Store',{
                model: 'Catalogs_Model',
                autoLoad:true,
                pageSize:'20',
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

			/**
			 * 翻页排序时候的参数传递
			 */
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
								}]
					});

			// 表格实例
			var grid = new Ext.grid.Panel({
						// 表格面板标题,默认为粗体，我不喜欢粗体，这里设置样式将其格式为正常字体
						title : '<span class="commoncss">表格综合演示二</span>',
						height : 500,
						autoScroll : true,
						frame : true,
						region : 'center', // 和VIEWPORT布局模型对应，充当center区域布局
						store : store, // 数据存储
						stripeRows : true, // 斑马线
                columns : cm, // 列模型
						tbar : tbar, // 表格工具栏
						bbar : bbar,// 分页工具栏
                plugins : expander,
						viewConfig : {
							// 不产横向生滚动条, 各列自动扩展自动压缩, 适用于列数比较少的情况
							forceFit : true
						},
						loadMask : {
							msg : '正在加载表格数据,请稍等...'
						}
					});

			// 是否默认选中第一行数据
			bbar.on("change", function() {
						// grid.getSelectionModel().selectFirstRow();

					});
            //grid.expandRow(2);
			// 页面初始自动查询数据
			// store.load({params : {start : 0,limit : bbar.pageSize}});

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

		});