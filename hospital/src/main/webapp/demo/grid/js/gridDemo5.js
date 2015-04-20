/**
 * 表格综合示例(缓冲表格)
 * 
 * @author XiongChun
 * @since 2010-10-20
 */
Ext.onReady(function() {
    Ext.define('ValueText_Model', {
        extend: 'Ext.data.Model',
        fields: [
            {
                name: 'value'
            },
            {
                name: 'text'
            }
        ]
    });
    var rownum = {
        xtype: 'rownumberer',
        text: '序号',
        width: 40
    };
    var cm=[rownum,{
        text : '地区名称', // 列标题
        dataIndex : 'text', // 数据索引:和Store模型对应
        sortable : true
        // 是否可排序
    },{
        text : '地区编号', // 列标题
        dataIndex : 'value', // 数据索引:和Store模型对应
        sortable : true
        // 是否可排序
    }]

			/**
			 * 数据存储
			 */

            var store = Ext.create('Ext.data.Store',{
                pageSize:'20',
                autoLoad:true,
                    proxy: {
                    extraParams: {

                    }  ,
                    type: 'ajax',
                    url: 'formDemo.ered?reqCode=queryAreaDatas',
                    reader: {
                        type: 'json',
                        totalProperty : 'TOTALCOUNT', // 记录总数
                        root : 'ROOT' // Json中的列表数据根节点
                    }
                },
                model: 'ValueText_Model'
            }) ;

			/**
			 * 翻页排序时候的参数传递
			 */
			// 翻页排序时带上查询条件
			store.on('beforeload', function() {
                Ext.apply(this.proxy.extraParams, {
                    xmmc: Ext.getCmp('xmmc').getValue()
                })
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
						title : '<span class="commoncss">表格综合演示五</span>',
						height : 500,
						autoScroll : true,
						frame : true,
						region : 'center', // 和VIEWPORT布局模型对应，充当center区域布局
						store : store, // 数据存储
						stripeRows : true, // 斑马线
						autoExpandColumn : 'jx',
						columns : cm, // 列模型
						tbar : tbar, // 表格工具栏

                plugins: {
                    ptype: 'bufferedrenderer',
                    trailingBufferZone: 50,  // Keep 20 rows rendered in the table behind scroll
                    leadingBufferZone: 50   // Keep 50 rows rendered in the table ahead of scroll
                },

                viewConfig : {
							// 不产横向生滚动条, 各列自动扩展自动压缩, 适用于列数比较少的情况
							forceFit : true
						},
						loadMask : {
							msg : '正在加载表格数据,请稍等...'
						}
					});




			// 布局模型
			var viewport = new Ext.Viewport({
						layout : 'border',
						items : [grid]
					});

			// 查询表格数据
			function queryCatalogItem() {
                store.loadPage(1,{
                    params: {
                        xmmc: Ext.getCmp('xmmc').getValue()
                    }
                });
			}

		});