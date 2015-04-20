/**
 * 表格综合示例六(合计表格)
 * 
 * @author XiongChun
 * @since 2010-10-20
 */
Ext.onReady(function() {
    Ext.define('BalanceInfo_Model', {
        extend: 'Ext.data.Model',
        fields: [{
            name : 'sxh' // Json中的属性Key值
        }, {
            name : 'grbm'
        }, {
            name : 'xm'
        }, {
            name : 'xb'
        }, {
            name : 'xnl'
        }, {
            name : 'fyze'
        }, {
            name : 'ybbx'
        }, {
            name : 'zfje'
        }, {
            name : 'jssj'
        }, {
            name : 'yymc'
        }]
    });
			// 定义自动当前页行号
			var rownum = {
                xtype: 'rownumberer',
                text: '序号',
                width: 40
            };

			// 定义列模型
			var cm =  [rownum, {
				text : '结算顺序号', // 列标题
				dataIndex : 'sxh', // 数据索引:和Store模型对应
				width : 200,
				sortable : true,
                summaryType: 'count',
                summaryRenderer: function(value, summaryData, dataIndex) {
                    return ((value === 0 || value > 1) ? '共' + value + ' 人次' : '共 0 人次');
                }
					// 是否可排序
				}, {
				text : '个人编码',
				dataIndex : 'grbm',
				hidden : true,
				sortable : true
			}, {
				text : '姓名',
				dataIndex : 'xm'
			}, {
				text : '性别',
				dataIndex : 'xb'
			}, {
				text : '现年龄',
				dataIndex : 'xnl'
			}, {
				text : '费用总额',
				dataIndex : 'fyze',
                summaryType: 'sum',
                summaryRenderer: function(value, summaryData, dataIndex) {
                    return  '费用总额:'+value.toFixed(2) ;
                }
			}, {
				text : '医保报销',
				dataIndex : 'ybbx',
                summaryType: 'sum',
                summaryRenderer: function(value, summaryData, dataIndex) {
                    return  '医保报销:'+value .toFixed(2) ;
                }
			}, {
				text : '自付金额',
				dataIndex : 'zfje',
                summaryType: 'sum',
                summaryRenderer: function(value, summaryData, dataIndex) {
                    return '自付金额:'+value.toFixed(2) ;
                }
			}, {
				text : '结算时间',
				dataIndex : 'jssj'
			}, {
				text : '就诊医院',
				dataIndex : 'yymc'
			}];

			/**
			 * 数据存储
			 */
			var store =Ext.create('Ext.data.Store',{
                pageSize:'20',
                autoLoad:true,
                proxy: {
                    extraParams: {

                    }  ,
                    type: 'ajax',
                    url: 'gridDemo.ered?reqCode=queryBalanceInfo',
                    reader: {
                        type: 'json',
                        totalProperty : 'TOTALCOUNT', // 记录总数
                        root : 'ROOT' // Json中的列表数据根节点
                    }
                },
                model: 'BalanceInfo_Model'
            }) ;

			/**
			 * 翻页排序时候的参数传递
			 */
			// 翻页排序时带上查询条件
			store.on('beforeload', function() {
                Ext.apply(this.proxy.extraParams, {
                    xm: Ext.getCmp('xm').getValue()
                })
					});
    // 每页显示条数下拉选择框
    var pagesize_combo = new Ext.form.field.ComboBox({
        name: 'pagesize',
        triggerAction: 'all',
        mode: 'local',
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
        var number = parseInt(comboBox.getValue());
        bbar.pageSize = number;
        store.pageSize = number;
        store.loadPage(1 );
    });

    // 分页工具栏
    var bbar = new Ext.PagingToolbar({
        pageSize:20,
        store : store,
        displayInfo : true,
        displayMsg : '显示{0}条到{1}条,共{2}条',
        emptyMsg : "没有符合条件的记录",
        items : ['-', '&nbsp;&nbsp;', pagesize_combo ]
    });
   /* new Ext.PagingToolbar({
        pageSize:20,
        store : store,
        displayInfo : true,
        displayMsg : '显示{0}条到{1}条,共{2}条',
        emptyMsg : "没有符合条件的记录",
        items : ['-', '&nbsp;&nbsp;', pagesize_combo, '-'*//*, {
            text : '合计',
            iconCls : 'addIcon',
            handler : function() {
                summary.toggleSummary();
            }
        }*//*]
    });*/

			// 表格工具栏
			var tbar = new Ext.toolbar.Toolbar({
						items : [{
									xtype : 'textfield',
									id : 'xm',
									name : 'xm',
									emptyText : '请输入姓名',
									width : 150,
									enableKeyEvents : true,
									// 响应回车键
									listeners : {
										specialkey : function(field, e) {
											if (e.getKey() == Ext.EventObject.ENTER) {
												queryBalanceInfo();
											}
										}
									}
								}, {
									text : '查询',
									iconCls : 'page_findIcon',
									handler : function() {
										queryBalanceInfo();
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
						title : '<span class="commoncss">表格综合演示六</span>',
						height : 500,
						autoScroll : true,
						frame : true,
						region : 'center', // 和VIEWPORT布局模型对应，充当center区域布局
						store : store, // 数据存储
						columns : cm, // 列模型
						tbar : tbar, // 表格工具栏
						bbar : bbar,// 分页工具栏
                     features: [ {
                    ftype: 'summary',
                    dock: 'bottom'
                }],
						viewConfig : {
                            stripeRows: false,
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

			// 页面初始自动查询数据
			// store.load({params : {start : 0,limit : bbar.pageSize}});

			// 布局模型
			var viewport = new Ext.Viewport({
						layout : 'border',
						items : [grid]
					});

			// 查询表格数据
			function queryBalanceInfo() {
                store.loadPage(1,{
                    params: {
                        xm : Ext.getCmp('xm').getValue()
                    },
                    callback :fnSumInfo
                });
			}

			/**
			 * 汇总表格
			 */
			function fnSumInfo() {

//				Ext.Ajax.request({
//							url : 'gridDemo.ered?reqCode=sumBalanceInfo',
//							success : function(response) { // 回调函数有1个参数
//								summary.toggleSummary(true);
//								summary.setSumValue(Ext.decode(response.responseText));
//							},
//							failure : function(response) {
//								Ext.MessageBox.alert('提示', '汇总数据失败');
//							}
//						});
			}

		});