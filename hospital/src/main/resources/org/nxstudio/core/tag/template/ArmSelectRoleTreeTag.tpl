<!-- 由<eRedG4:arm.SelectRoleTree/>标签生成的代码开始 -->
<div id="selectRoleTreeDiv"></div>
<script type="text/javascript">
Ext.onReady(function() {
#foreach($dept in $deptList)
	var node_${dept.deptid} = {
		text:'${dept.deptname}',
		children:new Array(),
		id:'id_node_${dept.deptid}'
	};
#end
#foreach($role in $roleList)
	var node_${role.roleid} = {
		text:'${role.rolename}',
		children:new Array(),
#if(${role.checked} == "true")
	 checked:true,
#else
    checked:false,	
#end
		roleid:'${role.roleid}',
#if(${role.roletype} == "1")
	iconCls:'medal_silver_3Icon',
#else
    iconCls:'medal_gold_1Icon',
#end
		id:'id_node_${role.roleid}'
	};
#end

#foreach($dept in $deptList)
#if(${dept.isroot}!="true")

node_${dept.parentid}.children.push(node_${dept.deptid});
#end
#end
#foreach($role in $roleList)

node_${role.deptid}.children.push(node_${role.roleid});
#end

var selectRoleTree = new Ext.tree.Panel({
			autoHeight : false,
			autoWidth : false,
			autoScroll : true,
			animate : false,
			rootVisible : true,
			border : false,
			containerScroll : true,
			renderTo : 'selectRoleTreeDiv',
			tbar : [{
				text : '保存',
				iconCls : 'acceptIcon',
				handler : function() {
				         if (runMode == '0') {
							Ext.Msg.alert('提示', '系统正处于演示模式下运行,您的操作被取消!该模式下只能进行查询操作!');
							return;
						  }
						  var checkedNodes =  selectRoleTree.getChecked();
                                                            					     var roleid = "";
                                                            						 for(var i = 0; i < checkedNodes.length; i++) {
                                                            						   var checkNode = checkedNodes[i];
                                                            					       roleid = roleid + checkNode.data.id.replace('id_node_','') + "," ;
                                                            						 }

						 saveSelectedRole(roleid);
				 }
		    }, '-', {
				text : '展开',
				iconCls : 'expand-allIcon',
				handler : function() {
					selectRoleTree.expandAll();
				}
		    }, '-', {
				text : '收缩',
				iconCls : 'collapse-allIcon',
				handler : function() {
					selectRoleTree.collapseAll();
				}
		    }],
			root : node_${deptid}
  });
  //node_${deptid}.expand();
  selectRoleTree.expandAll();

//保存授权数据
function saveSelectedRole(pRoleid){
		showWaitMsg();
		Ext.Ajax.request({
					url : './user.ered?reqCode=saveSelectedRole',
					success : function(response) {
						var resultArray = Ext.JSON.decode(response.responseText);
						Ext.Msg.alert('提示', resultArray.msg);
					},
					failure : function(response) {
						var resultArray = Ext.JSON.decode(response.responseText);
						Ext.Msg.alert('提示', resultArray.msg);
					},
					params : {
						roleid : pRoleid
					}
				});
}
	
})
</script>
<!-- 由<eRedG4:arm.SelectRoleTree/>标签生成的代码结束 -->