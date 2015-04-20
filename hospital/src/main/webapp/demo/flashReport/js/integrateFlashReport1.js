/**
 * FlashReport报表综合实例(动态数据源|动态报表类型)
 */
Ext.onReady(function() {
    Ext.define('NameValue_Model', {
        extend: 'Ext.data.Model',
        fields: [
            {
                name: 'name'
            },
            {
                name: 'value'
            }
        ]
    });
			var rownum = {
                xtype: 'rownumberer',
                text: 'NO',
                width: 32
            };

			var cm =[rownum, {
						text : '月度',
						dataIndex : 'name',
						width : 80,
						sortable : false
					}, {
						text : '销售额(万元)',
						dataIndex : 'value',
						sortable : true
					}];

			var store =Ext.create('Ext.data.Store',{
                model: 'NameValue_Model',
                pageSize:'100',
                proxy: {
                    type: 'ajax',
                    url: 'flashReportDemo.ered?reqCode=queryXsyjDatas',
                    reader: {
                        type: 'json',
                        totalProperty : 'TOTALCOUNT', // 记录总数
                        root : 'ROOT' // Json中的列表数据根节点
                    }
                }
            }) ;

			var bbar = new Ext.PagingToolbar({
						pageSize : 100,
						store : store,
						displayInfo : true,
						displayMsg : '显示{0}条到{1}条,共{2}条',
                        emptyMsg: "没有符合条件的记录",
                        plugins: [Ext.create('Ext.ux.ProgressBarPager') ]  // 分页进度条
					});

			var tbar = new Ext.Toolbar({
						items : ['<span class="commoncss">请选择产品类型:</span>',
                            Ext.create('Ext.form.field.ComboBox', {
                                id : 'idproduct',
                                hiddenName : 'product',
                                triggerAction: 'all',
                                queryMode: 'local',
                                store: new Ext.data.ArrayStore({
                                    fields: ['value', 'text'],
                                    data:[[1, '产品1'],
                                        [2, '产品2']]
                                }),
                                valueField: 'value',
                                displayField: 'text',
                                value: '1',
                                editable: false,
                                resizable : false,
                                width : 140
                            }) ]
					});

			Ext.getCmp('idproduct').on('select', function(comboBox) {
                store.loadPage(1 ,{params : {
                    product : comboBox.getValue()
                }});
						updateChart();
					});

			var grid = new Ext.grid.Panel({
						title : '<span style="font-weight:normal">销售业绩(表格展示)</span>',
						frame : true,
						width : 280,
						maxSize : 300,
						autoScroll : true,
						region : 'west',
						split : true,
						collapsible : true,
						store : store,
						stripeRows : true,
                        columns : cm,
						tbar : tbar,
						bbar : bbar,
						viewConfig : {
			// forceFit : true
						},
						loadMask : {
							msg : '正在加载表格数据,请稍等...'
						}
					});

			store.on('beforeload', function() {
                Ext.apply(store.proxy.extraParams, {product: Ext.getCmp('idproduct').getValue()});
					});
    store.loadPage(1 ,{params : {
        product :  Ext.getCmp('idproduct').getValue()
    }});

			var panel = new Ext.panel.Panel({
						title : '<span style="font-weight:normal">销售业绩(图表展示)</span>',
						contentEl : 'my2DcChart_div',
						region : 'center'
					});

			var viewport = new Ext.Viewport({
						layout : 'border',
						items : [grid, panel]
					});

			function updateChart() {
				Ext.Ajax.request({
							url : 'flashReportDemo.ered?reqCode=queryReportXmlDatas',
							success : function(response, opts) {
								var resultArray = Ext.JSON
										.decode(response.responseText);
								// Ext.Msg.alert('提示', resultArray.msg);
								var xmlstring = resultArray.xmlstring;
								updateChartXML('my2DcChart', xmlstring);
							},
							failure : function(response, opts) {
								Ext.MessageBox.alert('提示', '获取报表数据失败');
							},
							params : {
								product : Ext.getCmp('idproduct').getValue()
							}
						});
			}

		});