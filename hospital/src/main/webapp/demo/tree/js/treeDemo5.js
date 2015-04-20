/**
 * 树形UI综合示例(下拉树)
 * 
 * @author XiongChun
 * @since 2010-10-28
 */
Ext.onReady(function() {
    var addRoot =  {
        text: '功能菜单',
        expanded: true,
        id: '01'
    };
    var treestore= new Ext.data.TreeStore({
        preloadChildren: true,
        root: addRoot,
        proxy: {
            extraParams:{
            },
            type: 'ajax', url: './treeDemo.ered?reqCode=queryMenuItems'}
    });
			var addDeptTree =   Ext.create('Ext.tree.Panel', {
                store:treestore,
                rootVisible: true,
                autoScroll: false,
                animate: false,
                useArrows: false,
                border: false,
                applyTo: 'treeDiv',
                width: 400,
                height: 500
            });
			// 监听下拉树的节点单击事件
			addDeptTree.on("cellclick", function (treeview, htmltext, index, node) {
						comboxWithTree.setValue(node.data.text);
						Ext.getCmp("firstForm").getForm().findField('parentid').setValue(node.data.id);
						comboxWithTree.collapse();
					});
			var comboxWithTree =  Ext.create('Ext.ux.TreePicker', {
                id: 'parentdeptname',
                anchor: '99%',
                displayField: 'text',//这个地方也需要注意一下，这个是告诉源码tree用json数据里面的什么字段来显示，我测试出来是只能写'text'才有效果
                fieldLabel: '上级部门',
                forceSelection: true,// 只能选择下拉框里面的内容
                editable: false,// 不能编辑
                maxHeight: 390,
                allowBlank: false,
                store: treestore,
                listeners: {
                    'select': function (picker, record, eOpts) {
                        Ext.getCmp("firstForm").getForm().findField('parentid')
                            .setValue(record.data.id);
                    }
                }
            })

			var firstForm = new Ext.form.Panel({
						id : 'firstForm',
						name : 'firstForm',
						labelWidth : 60, // 标签宽度
						// frame : true, // 是否渲染表单面板背景色
						defaultType : 'textfield', // 表单元素默认类型
						labelAlign : 'right', // 标签对齐方式
						bodyStyle : 'padding:5 5 5 5', // 表单元素和表单面板的边距
						items : [{
									id : 'parentid',
									name : 'parentid',
									fieldLabel : '部门编号',
									readOnly : true,
									anchor : '100%'
								}, comboxWithTree]
					});

			var firstWindow = new Ext.window.Window({
						title : '<span class="commoncss">标准范例五(下拉树)</span>', // 窗口标题
						layout : 'fit', // 设置窗口布局模式
						width : 350, // 窗口宽度
						height : 160, // 窗口高度
						closable : false, // 是否可关闭
						collapsible : true, // 是否可收缩
						maximizable : true, // 设置是否可以最大化
						border : false, // 边框线设置
						constrain : true, // 设置窗口是否可以溢出父容器
						pageY : 20, // 页面定位X坐标
						pageX : document.body.clientWidth / 2 - 350 / 2, // 页面定位Y坐标
						items : [firstForm]
					});
			firstWindow.show(); // 显示窗口
		});