/**
 * 表单：下拉选择框(字典数据源)
 * 
 * @author XiongChun
 * @since 2010-08-20
 */
Ext.onReady(function() {
			var enabledCombo =new Ext.form.field.ComboBox({
                name: 'enabled',
                hiddenName: 'enabled',
                store: ENABLEDStore,
                queryMode: 'local',
                triggerAction: 'all',
                valueField: 'value',
                displayField: 'text',
                value: '1',
                fieldLabel: '启用状态',
                emptyText: '请选择...',
                allowBlank: false,
                labelStyle : 'color:blue;',
                forceSelection: true,
                editable: false,
                anchor: "99%"
            });

			var userTypeCombo =Ext.create('Ext.form.field.ComboBox', {
                hiddenName : 'userType',
                fieldLabel : '人员类型',
                emptyText : '请选择',
                triggerAction: 'all',
                queryMode: 'local',
                store: USERTYPEStore,
                displayField : 'text',
                valueField : 'value',
                editable: false,
                labelStyle : 'color:blue;',
                allowBlank : false,
                anchor : '100%'
            });

			var editmodeCombo = Ext.create('Ext.form.field.ComboBox', {
                hiddenName : 'editmode',
                fieldLabel : '编辑模式',
                emptyText : '请选择',
                triggerAction: 'all',
                queryMode: 'local',
                store: EDITMODEStore,
                displayField : 'text',
                valueField : 'value',
                editable: false,
                labelStyle : 'color:blue;',
                allowBlank : false,
                anchor : '100%'
            });

			var firstForm = new Ext.form.Panel({
						id : 'firstForm',
						name : 'firstForm',
						labelWidth : 60, // 标签宽度
						// frame : true, //是否渲染表单面板背景色
						defaultType : 'textfield', // 表单元素默认类型
						labelAlign : 'right', // 标签对齐方式
						bodyStyle : 'padding:5 5 5 5', // 表单元素和表单面板的边距
						items : [enabledCombo, userTypeCombo,editmodeCombo],
											tbar : [{
									text : '获取选中值',
									handler : function() {
										Ext.MessageBox.alert('提示', '启用状态的值为：' + enabledCombo.getValue());
									}
								}]
					});

			var firstWindow = new Ext.window.Window({
						title : '<span class="commoncss">下拉选择框(字典数据源)</span>', // 窗口标题
						layout : 'fit', // 设置窗口布局模式
						width : 300, // 窗口宽度
						height : 200, // 窗口高度
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