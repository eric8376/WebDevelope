Ext.onReady(function() {
	var firstForm = new Ext.form.FormPanel({
				id : 'firstForm',
				name : 'firstForm',
				labelWidth : 50, // 标签宽度
				// frame : true, // 是否渲染表单面板背景色
				defaultType : 'textfield', // 表单元素默认类型
				labelAlign : 'right', // 标签对齐方式
				bodyStyle : 'padding:5 5 5 5', // 表单元素和表单面板的边距
				items : [{
							fieldLabel : '文本1', // 标签
							name : 'text1', // name:后台根据此name属性取值
							allowBlank : false,
							anchor : '100%' // 宽度百分比
						}, {
							fieldLabel : '文本2', // 标签
							id : 'text2',
							name : 'text2', // name:后台根据此name属性取值
							value : '熊春',
							anchor : '100%' // 宽度百分比
						}, {
							fieldLabel : '文本3', // 标签
							name : 'text3', // name:后台根据此name属性取值
							anchor : '100%' // 宽度百分比
						}]
			});

	var firstWindow = new Ext.Window({
				title : '<span class="commoncss">表单交互(提交、数据填充)</span>', // 窗口标题
				layout : 'fit', // 设置窗口布局模式
				width : 400, // 窗口宽度
				height : 200, // 窗口高度
				closable : false, // 是否可关闭
				collapsible : true, // 是否可收缩
				maximizable : true, // 设置是否可以最大化
				border : false, // 边框线设置
				constrain : true, // 设置窗口是否可以溢出父容器
				pageY : 20, // 页面定位X坐标
				pageX : document.body.clientWidth / 2 - 400 / 2, // 页面定位Y坐标
				items : [firstForm], // 嵌入的表单面板
				buttons : [{ // 窗口底部按钮配置
					text : '提交1(表单自带Ajax)', // 按钮文本
					iconCls : 'acceptIcon', // 按钮图标
					handler : function() { // 按钮响应函数
						submitTheForm();
					}
				}, {	// 窗口底部按钮配置
							text : '提交2(Ext原生Ajax)', // 按钮文本
							iconCls : 'acceptIcon', // 按钮图标
							handler : function() { // 按钮响应函数
								submitTheFormBasedAjaxRequest();
							}
						}, { // 窗口底部按钮配置
							text : '读取', // 按钮文本
							iconCls : 'tbar_synchronizeIcon', // 按钮图标
							handler : function() { // 按钮响应函数
								loadCallBack();
							}
						}]
			});
	firstWindow.show(); // 显示窗口

	function submitTheForm() {
		if (!firstForm.form.isValid())
			return;
		firstForm.form.submit({
					url : 'test.ered?reqCode=saveTheSubmitInfo111',
					waitTitle : '提示',
					method : 'POST',
					waitMsg : '正在处理数据,请稍候...',
					success : function(form, action) {
						Ext.MessageBox.alert('提示1', action.result.msg);
					},
					params : {
						text4 : '文本4附加参数'
					}
				});
	}

	function showException1(strMsg) {
		var shortMsg = parent.EXCEPTION_CLIENT_MSG;
		var shortWindow = new Ext.Window({
			title : '<span class="commoncss">系统发生错误</span>', // 窗口标题
			layout : 'fit', // 设置窗口布局模式
			iconCls : 'exclamationIcon',
			width : 400, // 窗口宽度
			height : 200, // 窗口高度
			animateTarget : Ext.getBody(),
			closable : true, // 是否可关闭
			closeAction : 'close', // 关闭策略
			collapsible : false, // 是否可收缩
			modal : true,
			maximizable : true, // 设置是否可以最大化
			border : false, // 边框线设置
			constrain : true, // 设置窗口是否可以溢出父容器
			pageY : 40, // 页面定位Y坐标
			pageX : document.body.clientWidth / 2 - 400 / 2,
			items : [new Ext.Panel({
						html : shortMsg,
						style : "font-size: 13px;",
						autoScroll : true
					})],
			buttons : [{
				text : '详细信息',
				iconCls : 'previewIcon',
				handler : function() {
					var detailWindow = new Ext.Window({
								title : '<span class="commoncss">系统异常堆栈信息</span>', // 窗口标题
								layout : 'fit', // 设置窗口布局模式
								iconCls : 'previewIcon',
								width : document.body.clientWidth - 150, // 窗口宽度
								height : document.body.clientHeight - 50, // 窗口高度
								animateTarget : Ext.getBody(),
								closable : true, // 是否可关闭
								closeAction : 'close', // 关闭策略
								collapsible : false, // 是否可收缩
								modal : true,
								maximizable : true, // 设置是否可以最大化
								border : false, // 边框线设置
								constrain : true, // 设置窗口是否可以溢出父容器
								items : [new Ext.Panel({
											html : strMsg,
											style : "font-size: 13px;",
											autoScroll : true
										})]
							}).show();
				}
			}]
		}).show();
	}

	function submitTheFormBasedAjaxRequest() {
		if (!firstForm.form.isValid())
			return;
		var params = firstForm.getForm().getValues();
		params.text4 = '文本4附加参数';
		Ext.Ajax.request({
					url : 'test.ered?reqCode=saveTheSubmitInfo',
					success : function(response, opts) {
						var resultArray = Ext.JSON
								.decode(response.responseText);
						Ext.Msg.alert('提示', resultArray.msg);
					},
					params : params
				});
	}

	// 表单加载数据的回调函数
	function loadCallBack() {
		firstForm.form.load({
					waitMsg : '正在读取信息',// 提示信息
					waitTitle : '提示',// 标题
					url : 'test.ered?reqCode=saveTheSubmitInfo',// 请求的url地址
					// method : 'GET',// 请求方式
					success : function(form, action) {// 加载成功的处理函数
						Ext.Msg.alert('提示', '数据读取成功');
					}
				});
	}

});