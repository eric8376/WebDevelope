<!-- 由<eRedG4:arm.SelectMenuTreeTag/>标签生成的代码开始 -->
<div id="selectMenuTreeDiv"></div>
<script type="text/javascript">
Ext.onReady(function() {
var selectMenuRootNode;
#foreach($menu in $menuList)
	var node_${menu.menuid} = {
		text:'${menu.menuname}',
		children:new Array(),
#if(${menu.checked} == "false")
	checked:false,
#else
    checked:true,
#end
        menuid:'${menu.menuid}',
		id:'id_node_${menu.menuid}'
	};
		#if(${menu.isRoot}=="true")
                                    selectMenuRootNode=node_${menu.menuid};
                                    #end
#end

#foreach($menu in $menuList)
#if(${menu.isRoot}!="true")
node_${menu.parentid}.children.push(node_${menu.menuid});
#end
#end
     var selectMenuTreeStore=    Ext.create('Ext.data.TreeStore', {
              root:selectMenuRootNode
          });
var selectMenuTree = new Ext.tree.Panel({
			autoHeight : false,
			autoWidth : false,
			autoScroll : true,
			animate : false,
			rootVisible : true,
			border : false,
			containerScroll : true,
			renderTo : 'selectMenuTreeDiv',
			tbar : [{
				text : '保存',
				iconCls : 'acceptIcon',
				handler : function() {
				         if (runMode == '0') {
							Ext.Msg.alert('提示', '系统正处于演示模式下运行,您的操作被取消!该模式下只能进行查询操作!');
							return;
						  }
                                     var checkedNodes = selectMenuTree.getChecked();
                                  					     var menuid = "";
                                  						 for(var i = 0; i < checkedNodes.length; i++) {
                                  						   var checkNode = checkedNodes[i];
                                  					       menuid = menuid + checkNode.data.id.replace('id_node_','') + "," ;
                                  						 }

						 saveSelectedMenu(menuid);
				 }
		    }, '-', {
				text : '展开',
				iconCls : 'expand-allIcon',
				handler : function() {
					selectMenuTree.expandAll();
				}
		    }, '-', {
				text : '收缩',
				iconCls : 'collapse-allIcon',
				handler : function() {
					selectMenuTree.collapseAll();
				}
		    }],
			store : selectMenuTreeStore    ,
                           			listeners:{'checkchange':function( node, checked, eOpts ){
                           			           	cascadeParent(node);
                                                  	cascadeChildren(node);

                           			}}
  });
//以下两句为避免不能选中较深子节点的特殊处理
  selectMenuTree.expandAll();
  selectMenuTree.collapseAll();
#foreach($menu in $menuList)
#if(${menu.expanded}=="true")
var selectMenuTempnode= selectMenuTreeStore.getNodeById('id_node_${menu.menuid}')   ;
selectMenuTree.expandNode(selectMenuTempnode)    ;
#end
#end

//保存授权数据
function saveSelectedMenu(pMenuid){
		showWaitMsg();
		Ext.Ajax.request({
					url : './user.ered?reqCode=saveSelectedMenu',
					success : function(response) {
						var resultArray = Ext.JSON.decode(response.responseText);
						Ext.Msg.alert('提示', resultArray.msg);
					},
					failure : function(response) {
						var resultArray = Ext.JSON.decode(response.responseText);
						Ext.Msg.alert('提示', resultArray.msg);
					},
					params : {
						menuid : pMenuid		
						}
				});
}



})
</script>
<!-- 由<eRedG4:arm.SelectMenuTreeTag/>标签生成的代码结束 -->