/**
 * 表单：下拉选择框(远程数据源)
 * 
 * @author XiongChun
 * @since 2010-08-20
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
			var areaStore =  Ext.create('Ext.data.Store',{
                model: 'ValueText_Model',
                proxy: {
                    extraParams:{ areacode : '53'},
                    type: 'ajax',
                    url: 'formDemo.ered?reqCode=queryAreaDatas',
                    reader: {
                        type: 'json'/*,
                         totalProperty : 'TOTALCOUNT', // 记录总数
                         root : 'ROOT' // Json中的列表数据根节点*/
                    }
                },
                listeners : {
                    // 设置远程数据源下拉选择框的初始值
                    'load' : function(obj) {
                        areaCombo.setValue('530101');
                    }
                }
            }) ;

			areaStore.load(); // 如果mode : 'local',时候才需要手动load();

			var areaCombo = Ext.create('Ext.form.field.ComboBox', {
                hiddenName: 'area',
                fieldLabel: '云南行政区域',
                emptyText: '请选择...',

                triggerAction: 'all',
                queryMode: 'remote',
                store: areaStore,
                loadingText: '请选择...',
                forceSelection: true,
                displayField: 'text', valueField: 'value',
                editable: false, resizable: false,
                allowBlank: false, anchor: '100%'
            });

			var chinaStore = Ext.create('Ext.data.Store',{
                model: 'ValueText_Model',
                proxy: {
                    extraParams:{ 	areacode : ''},
                    type: 'ajax',
                    url: 'formDemo.ered?reqCode=queryAreaDatas4Paging',
                    reader: {
                        type: 'json',
                         totalProperty : 'TOTALCOUNT', // 记录总数
                         root : 'ROOT' // Json中的列表数据根节点
                    }
                }
            }) ;

			var chinaCombo = Ext.create('Ext.form.field.ComboBox', {
                hiddenName: 'area',
                fieldLabel: '中国行政区域',
                emptyText: '请选择...',

                triggerAction: 'all',
                queryMode: 'remote',
                store: chinaStore,
                loadingText: '请选择...',
                forceSelection: true,
                displayField: 'text', valueField: 'value',
                editable: false, resizable: false,
                pageSize : 10,
                minListWidth : 270,
                allowBlank: false, anchor: '100%'
            });

			var firstForm = new Ext.form.Panel({
						id : 'firstForm',
						name : 'firstForm',
						labelWidth : 80, // 标签宽度
						// frame : true, //是否渲染表单面板背景色
						defaultType : 'textfield', // 表单元素默认类型
						labelAlign : 'right', // 标签对齐方式
						bodyStyle : 'padding:5 5 5 5', // 表单元素和表单面板的边距
						items : [areaCombo, chinaCombo]
					});

			var firstWindow = new Ext.window.Window({
						title : '<span class="commoncss">下拉选择框(远程数据源)</span>', // 窗口标题
						layout : 'fit', // 设置窗口布局模式
						width : 300, // 窗口宽度
						height : 250, // 窗口高度
						closable : false, // 是否可关闭
						collapsible : true, // 是否可收缩
						maximizable : true, // 设置是否可以最大化
						border : false, // 边框线设置
						constrain : true, // 设置窗口是否可以溢出父容器
						pageY : 20, // 页面定位Y坐标
						pageX : document.body.clientWidth / 2 - 300 / 2, // 页面定位X坐标
						items : [firstForm], // 嵌入的表单面板
						buttons : [{ // 窗口底部按钮配置
							text : '重置', // 按钮文本
							iconCls : 'tbar_synchronizeIcon', // 按钮图标
							handler : function() { // 按钮响应函数
								firstForm.getForm().reset();
							}
						}]
					});
			firstWindow.show(); // 显示窗口

		});