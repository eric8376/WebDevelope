#foreach($menu in $menuList)
	var node_${menu.menuid}  ={
                                                          text:'${menu.menuname}',
                                                          children:new Array(),
                                                       #if(${menu.request})
                                                        menu_request:'${menu.request}',
                                                        #end
                                                            #if(${menu.leaf}=='0')
                                                                                                                      leaf:false,
                                                                                                                    #else
                                                                                                                       leaf:true,
                                                                                                                    #end
                                                          menu_menuname:'${menu.menuname}',
                                                          menu_menuid:'${menu.menuid}',
                                                          menu_menupath:'${menu.menupath}',
                                                          menu_icon:'${menu.icon}' ,
                                                           #if(${menu.expanded})
                                                           expanded:${menu.expanded},
                                                           #end
                                                           #if(${menu.iconcls})
                                                           iconCls:'${menu.iconcls}',
                                                           #end
                                                           id:'id_node_${menu.menuid}'
                                                           };
#end
#foreach($menu in $menuList)
#if(${menu.isRoot}=="false")
	node_${menu.parentid}.children.push(node_${menu.menuid});
#end
#end
			var memustore_${menuid}=Ext.create('MemuTreeStore', {
            				model :'memuModel'  ,
            				root : node_${menuid}
            				});
	var treePanel_${menuid} = Ext.create('Ext.tree.Panel', {
       autoScroll:true,
       animate:false,
       rootVisible:false,
       useArrows:true,
       title:'',
       border: false,
       renderTo:'div.card.${menuid}',
listeners: {
     'itemclick': function(treeview,record, item, index, e, eOpts ){
     var rec=record.raw;
    if(rec.menu_request)
    {    addTab(rec.menu_request,rec.menu_menuname,rec.menu_menuid,rec.menu_menupath,rec.menu_icon);}
    }},
	store:memustore_${menuid}
	});