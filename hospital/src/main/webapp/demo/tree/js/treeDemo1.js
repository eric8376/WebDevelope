/**
 * 树形UI综合示例(普通树)
 * 
 * @author XiongChun
 * @since 2010-10-27
 */
Ext.onReady(function() {


			var node2 = {
						id : '2',
                leaf:true,
						iconCls : 'medal_gold_1Icon', // 节点图标
						text : '大理白族自治州'
					};
			var node3 = {
						id : '3',
						text : '香港特区',
                leaf:true,
						customProperty:'我爱香港'
					};
			var node4 ={
						id : '4',
                leaf:true,
						iconCls : 'expand-allIcon',
						text : '西藏自治区'
					};

			var node6 ={
						id : '6',
                leaf:true,
						text : '台北市'
					};
    var node1 = {
        id : '1',
        text : '云南省',
        children:[node2]
        // href : 'url', // 链接地址
        // hrefTarget : 'mainFrame' // 连接地址打开目标对象
    };
    var node5 = {
        id : '5',
        expanded : true, // 是否展开节点
        text : '台湾地区',
        children:[node6]
    };
    var root = {
        id : '0',
        text : '中国' ,
        children:[node1,node3,node4,node5]
    };

    var store = Ext.create('Ext.data.TreeStore', {
        root:  root
    });


			// 定义一个树面板
			var tree =  Ext.create('Ext.tree.Panel', {
                title : '',
                width : 400,
                height: 150,
                store: store,
                useArrows : true, // 箭头节点图标
                rootVisible: false,
                renderTo : 'treeDiv'
            });
    tree.expand(root); // true为递归展开,false为只展开本节点

			// 绑定节点单击事件
			tree.on("click", function(node, e) {
				       if(node.id=='3'){
				         Ext.MessageBox.alert('提示', 'ID:' + node.id +  ' text:' + node.text + " 附加属性值:" + node.attributes.customProperty);
				       }else{
				       	  Ext.MessageBox.alert('提示', 'ID:' + node.id +  ' text:' + node.text );
				       }
					});

			// 定义一个右键菜单
			var contextmenu = new Ext.menu.Menu({
						id : 'theContextMenu',
						items : [{
									iconCls : 'userIcon',
									text : '是男人就点我',
									handler : function() {
										var selectModel = tree.getSelectionModel(); // 获取树选择模型
										var selectNode = selectModel.getSelection()[0]; // 获取当前树选中节点对象
										Ext.Msg.alert('提示', 'ID:' + selectNode.data.id + " text:" + selectNode.data.text);
									}
								}, {
									iconCls : 'user_femaleIcon',
									text : '再点一次',
									handler : function() {
										Ext.Msg.alert('提示', '点我呢点!');
									}
								}]
					});
			// 绑定右键菜单
			tree.on("contextmenu", function(node, e) {
						e.preventDefault();
						node.select();
						contextmenu.showAt(e.getXY());
					});

			var firstWindow = new Ext.window.Window({
				title : '<span class="commoncss">树范例一(普通树)</span>', // 窗口标题
				layout : 'fit', // 设置窗口布局模式
				width : 250, // 窗口宽度
				height : 300, // 窗口高度
				closable : false, // 是否可关闭
				collapsible : true, // 是否可收缩
				maximizable : true, // 设置是否可以最大化
				border : false, // 边框线设置
				constrain : true, // 设置窗口是否可以溢出父容器
				pageY : 20, // 页面定位Y坐标
				pageX : document.body.clientWidth / 2 - 300 / 2, // 页面定位X坐标
				items : [tree]
					// 嵌入的表单面板
				});
			firstWindow.show(); // 显示窗口

		});