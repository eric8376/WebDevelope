DemoUtil = {
    createButton : function(toolbar, name, icon, click, buttonGroup){
        var button = document.createElement('button');
        button.setAttribute('title', name);
        if(icon){
            name = '<IMG SRC="' + icon + '" ALIGN="absmiddle">';
        }
        button.innerHTML = name;
        if(click instanceof Function){
            button.onclick = click;
        }
        if(toolbar instanceof Toolbar){
            toolbar.addButton(button, buttonGroup);
        }else if(toolbar){
            toolbar.appendChild(button);
        }
        return button;
    },
    createSelectedBox :function (toolbar,lists,callback,id)
    {
    	
    	var select=document.createElement("select");
    	select.setAttribute("id", id);
    	for(var i=0;i<lists.length;i++){
    	var key=lists[i].key;
    	var value=lists[i].value;
    	select.add(new Option(key,value));
    	}
    	toolbar.appendChild(select);
    	
    	var button = document.createElement('button');
        button.setAttribute('title', "确定");
        button.setAttribute('value', "确定");
        button.setAttribute('text', "确定");
        button.innerHTML="确定";
        button.onclick=callback;
       
        toolbar.appendChild(button);


    	
    },
    _createRadioOrCheckBox : function(toolbar, type, text, checked, click, value, buttonGroup){
        var button;
        if(isIE){
            if(buttonGroup){
                button = document.createElement("<input name='" + buttonGroup + (checked ? "' checked='"+ checked +"'/>" : "' />"));
            }else{
                button = document.createElement("<input " + (checked ? "' checked='"+ checked +"'/>" : "' />"));
            }
            button.type = type;
            button.value = value;
        }else{
            button = document.createElement('input');
            button.setAttribute('title', text);
            button.setAttribute('type', type);
            if(checked){
                button.setAttribute('checked', checked);
            }
            if(!TWaver.Utils.isNull(value)){
                button.setAttribute('value', value);
            }
            if(buttonGroup){
	            button.setAttribute('name', buttonGroup);
	        }
        }
        if(click instanceof Function){
            button.onclick = click;
        }
        
        var label = document.createTextNode(text);
        var div = document.createElement('span');
        div.appendChild(button);
        div.appendChild(label);
        if(toolbar instanceof Toolbar){
            toolbar.addButton(div);
        }else if(toolbar){
            toolbar.appendChild(div);
        }
        return button;
    },
    createCheckBox : function(toolbar, text, checked, click, value, buttonGroup){
        return DemoUtil._createRadioOrCheckBox(toolbar, 'checkbox', text, checked, click, value, null);
    },
    createRadioButton : function(toolbar, text, checked, click, value, buttonGroup){
        return DemoUtil._createRadioOrCheckBox(toolbar, 'radio', text, checked, click, value, buttonGroup);
    },
    createToolbar : function(id, network, imagePrefix, editMode){
	    var toolbar = new Toolbar(id);
        editMode ? DemoUtil.createButton(toolbar, 'Edit', imagePrefix + 'images/toolbar/select.png', function(){network.setEditInteraction();}, 'interaction.group') : 
        DemoUtil.createButton(toolbar, 'Default', imagePrefix + 'images/toolbar/select.png', function(){network.setDefaultInteraction();}, 'interaction.group');
	    toolbar.addSeparator();
	   // var undoButton = DemoUtil.createButton(toolbar, 'Undo', imagePrefix + 'images/toolbar/undo.png', function(){network.dataBox.undo();});
	  //  var redoButton = DemoUtil.createButton(toolbar, 'Redo', imagePrefix + 'images/toolbar/redo.png', function(){network.dataBox.redo();});
      //  network.on('svgroot.change', function(){
       //     undoButton.disabled = !network.canUndo;
        //    redoButton.disabled = !network.canRedo;
       // });
        
	    toolbar.addSeparator();
	//    DemoUtil.createButton(toolbar, 'Pan', imagePrefix + 'images/toolbar/pan.png', function(){network.setPanInteraction();}, 'interaction.group');$, _.canvas
	    DemoUtil.createButton(toolbar, 'Zoom In', imagePrefix + 'images/toolbar/zoomIn.png', function(evt){network.zoomIn(TWaver.Utils.getMouseLayerLocation(evt, network.canvas));}, 'interaction.group');
	    DemoUtil.createButton(toolbar, 'Zoom Out', imagePrefix + 'images/toolbar/zoomOut.png', function(evt){network.zoomOut(TWaver.Utils.getMouseLayerLocation(evt, network.canvas));}, 'interaction.group');
	    DemoUtil.createButton(toolbar, 'Zoom to overview', imagePrefix + 'images/toolbar/zoomToOverview.png', function(){network.zoomToOverview();});
	    
	    toolbar.addSeparator();
        
        if(editMode){
		    DemoUtil.createButton(toolbar, 'Link', imagePrefix + 'images/toolbar/link_icon.png', function(){network.setCreateLinkInteraction();}, 'interaction.group');
		    DemoUtil.createButton(toolbar, 'ShapeNode', imagePrefix + 'images/toolbar/shapeNode_icon.png', function(){network.setCreateShapeNodeInteraction();}, 'interaction.group');
		    toolbar.addSeparator();
		    DNDUtil.createElementDNDButton(toolbar, network, 'Create Node', imagePrefix + 'images/toolbar/node_icon.png', 'twaver.Node', 'node');
		    DNDUtil.createElementDNDButton(toolbar, network, 'Create Text', imagePrefix + 'images/toolbar/text_icon.png', 'twaver.Text', 'text');
		    DNDUtil.createElementDNDButton(toolbar, network, 'Create Group', imagePrefix + 'images/toolbar/group_icon.png', 'twaver.Group', 'group');
		    DNDUtil.createElementDNDButton(toolbar, network, 'Create SubNetwork', imagePrefix + 'images/toolbar/subNetwork_icon.png', 'twaver.SubNetwork', 'sub network');
		    DNDUtil.createElementDNDButton(toolbar, network, 'Create Card', imagePrefix + 'images/toolbar/card_icon.png', 'twaver.Card', 'card');
		    DNDUtil.createElementDNDButton(toolbar, network, 'Create Port', imagePrefix + 'images/toolbar/port_icon.png', 'twaver.Port', 'port');
		    DNDUtil.createElementDNDButton(toolbar, network, 'Create Grid', imagePrefix + 'images/toolbar/grid_icon.png', 'twaver.Grid', 'grid');
		    toolbar.addSeparator();
        }
       // DemoUtil.createButton(toolbar, 'Export SVG', imagePrefix + 'images/toolbar/exportToSVG.png', function(){network.getDataBox().exportSVG();});
	   // DemoUtil.createButton(toolbar, 'Export PNG', imagePrefix + 'images/toolbar/exportToImage.png', function(){network.exportImage();});
       // DemoUtil.createButton(toolbar, 'Export XML', imagePrefix + 'images/toolbar/exportXML.png', function(){network.getDataBox().exportXML();});
	    
	    DNDUtil.enableDrag();
	    var lists=[
	               {"key":"星形","value":"4"},
	               {"key":"圆形","value":"1"},
	               {"key":"阶层","value":"7"},
	               {"key":"树形","value":"2"}
	               ];
	    DemoUtil.createSelectedBox( toolbar,lists,function(){
	    	var select=document.getElementById("layoutSelect");
	    	var selectValue=select.options(select.selectedIndex).value;
	    	//alert(selectValue);
	    	network.refresh({layoutType:selectValue});

	    	
	    },"layoutSelect");
        return toolbar;
    },
    defaultExtjsNetworkPopupMenuGenerater : function(evt, network){
        var menuItems = DemoUtil.getNetworkMenuItems(evt, network);
        if(menuItems){
            return new Ext.menu.Menu(menuItems);
        }
    },
    /**
     * @param {MouseEvent} evt
     * @param {TWaver.SVGNetwork} network
     */
    defaultNetworkPopupMenuGenerater : function(evt, network){
        var menuItems = DemoUtil.getNetworkMenuItems(evt, network);
        if(menuItems){
            return new TWaver.PopupMenu(menuItems);
        }
    },
    
    getNetworkMenuItems : function(evt, network){
        var defaultMenuItems = [];
        var onlyOne = network.selectionModel.isOneSelected() ? network.selectionModel.lastSelection : null;
        
        if(!network.isTopSubNetwork()){
            defaultMenuItems.push({text: 'Up', handler: function(){network.backgroundDoubleClick()}});
        }
        if(onlyOne){
            var element = onlyOne.id ? onlyOne : network.getElementById(onlyOne);
            if(element){
                var elementClass = element.getAttribute('elementClass');
                if(elementClass && elementClass == 'SubNetwork'){
                    defaultMenuItems.push({text: 'Drop In', handler: function(){network.elementDoubleClick(element)}});
                }
            }
        }
        defaultMenuItems = defaultMenuItems.concat([
             {text: 'Select All', handler: function(){network.selectAll();}},
             {text: 'Select Inverse', handler: function(){network.selectInverse();}},
             TWaver.PopupMenu.Separator,
             {text: 'Zoom Reset', handler: function(){network.setScale(1)}},
             {text: 'Zoom In', handler: function(){network.zoomIn()}},
             {text: 'Zoom Out', handler: function(){network.zoomOut()}},
             TWaver.PopupMenu.Separator,
             {text: 'About...', handler: function(){
                alert('TWaver Web SVG '+TWaver.version+'\n© 2002-2010 ServaSoftware');
             }}
        ]);
        var isEditMode = network.isEditing;
        if(!isEditMode){
            return defaultMenuItems;
        }
        var menuItems = [];
        if(onlyOne){
            var element = onlyOne.id ? onlyOne : network.getElementById(onlyOne);
            if(element){
                var elementClass = element.getAttribute('elementClass');
                if(elementClass == 'Grid'){
                    menuItems.push({text: 'Sets Row Count', handler: function(){
                            var row = prompt("Input Row Count", '');
                            if(row !== null){
                                network.dataBox.setElementProperty(element.id, 'rowCount', row, 'int');
                            }
                        }});
                    menuItems.push({text: 'Sets Column Count', handler: function(){
                            var column = prompt("Input Column Count", '');
                            if(column !== null){
                                network.dataBox.setElementProperty(element.id, 'columnCount', column, 'int');
                            }
                        }});
                    menuItems.push(TWaver.PopupMenu.Separator);
                }
            }
        
            menuItems.push({text: 'Edit Label', handler : function(){
                    var name = prompt("Input name", '');
                    if(name !== null){
                        network.dataBox.setElementProperty(onlyOne.id || onlyOne, 'name', name);
                    }
                }
            });
        }
        if(network.hasSelection()){
            menuItems.push({text : 'Copy', handler : function(){
                network.copy();
            }});
        }
        if(network.copyElementIds){
            menuItems.push({text : 'Paste', handler : function(){
                network.paste(5, 5);
            }});
        }
        if(network.hasSelection()){
            menuItems.push({text: 'Delete Selection', handler: function(){
                if(confirm('Sure to delete elements ?')){
	                network.removeSelection();
	            }
            }});
        }
        menuItems.push({text: 'Clear All Elements', handler: function(){network.dataBox.update('handleClearBox');}});
        menuItems.push(TWaver.PopupMenu.Separator);
        if(network.hasSelection() && !onlyOne){
            var elements = network.getSelection();
            menuItems.push({text:'Align', menu:[
	            {text:'Align Left', handler : function(){
	                network.dataBox.align(elements, 'left');
	            }},{text:'Align Right', handler : function(){
                    network.dataBox.align(elements, 'right');
                }},{text:'Align Top', handler : function(){
                    network.dataBox.align(elements, 'top');
                }},{text:'Align Bottom', handler : function(){
                    network.dataBox.align(elements, 'bottom');
                }},{text:'Align Horizontal Center', handler : function(){
                    network.dataBox.align(elements, 'horizontalCenter');
                }},{text:'Align Vertical Center', handler : function(){
                    network.dataBox.align(elements, 'verticalCenter');
                }}
            ]});
        }
        menuItems = menuItems.concat(defaultMenuItems);
        return menuItems;
    }
}

Toolbar = function(dom){
    this.init(dom);
}

Toolbar.prototype = {
    /**
     * @type Element
     */
    dom : null,
    buttons : null,
    init : function(dom){
        this.buttons = {};
        if(dom && dom.nodeType == 1){
            this.dom = dom;
            return;
        }
	    if(TWaver.Utils.isString(dom)){
	        var id = dom;
	        this.dom = document.getElementById(id);
	        if(!this.dom){
	            this.dom = TWaver.Utils.createHTMLElement('div');
	            TWaver.Utils.setClassAttribute(this.dom, 'twaver.toolbar');
	            this.dom.id = id;
	        }
	    }else{
            this.dom = TWaver.Utils.createHTMLElement('div');
            TWaver.Utils.setClassAttribute(this.dom, 'twaver.toolbar');
        }
    },
    addSeparator : function(size, h){
        if(!size){
            size = 8;
        }
        var separator;
        if(h === true){
            separator = TWaver.Utils.createHTMLElement('hr');
        }else{
            separator = TWaver.Utils.createHTMLElement('span');
            separator.height = '100%';
            separator.style.marginLeft = size/2 + 'px';
            separator.style.marginRight = size/2 + 'px';
            separator.style.width = '1px';
            separator.style.height = '100%';
        }
        this.dom.appendChild(separator);
        return separator;
    },
    addButton : function(button, buttonGroup){
        this.dom.appendChild(button);
        if(buttonGroup){
            var group = this.getButtons(buttonGroup, true);
            group.push(button);
            button.setAttribute('buttonGroup', buttonGroup);
            var superOnclick = button.onclick;
            var _this = this;
            button.onclick = function(evt){
                superOnclick(evt);
                _this.buttonClick(button);
            }
        }
    },
    appendChild : function(element){
        this.dom.appendChild(element);
    },
    buttonClick : function(button){
        var buttonGroup = button.getAttribute('buttonGroup');
        if(!buttonGroup){
            return;
        }
        var buttons = this.getButtons(buttonGroup);
        if(!buttons || buttons.length == 0){
            return;
        }
        if(this.isButtonSelected(button)){
            return;
        }
        this.selectButton(button);
        for(var i = 0; i < buttons.length; i++){
            var b = buttons[i];
            if(b != button){
                this.selectButton(b, false);
            }
        }
    },
    getButtons : function(buttonGroup, create){
        var group = this.buttons[buttonGroup];
        if(!create || group){
            return group;
        }
        group = [];
        this.buttons[buttonGroup] = group;
        return group;
    },
    isButtonSelected : function(button){
        return button.getAttribute('select') != null;
    },
    selectButton : function(button, select){
        if(select !== false){
            button.setAttribute('select', true);
            
        }else{
            button.removeAttribute('select');
        }
    }
}

DNDUtil = {
    DRAG_INFO : {},
	createElementDNDButton : function(toolbar, network, buttonName, icon, elementClass, elementName, params, callback){
	    DNDUtil.createDNDButton(toolbar, buttonName, icon, function(evt){
	        evt = TWaver.Utils.getEvent(evt);
	        var point = TWaver.Utils.getMousePageLocation(evt);
	        var viewport = TWaver.Utils.getClientRect(network.canvas);
	        if(TWaver.Utils.containPoint(viewport, point)){
	            point.x -= viewport.x - network.canvas.scrollLeft;
	            point.y -= viewport.y - network.canvas.scrollTop;
	            network.dataBox.addElement(elementClass, elementName, point.x/network.scale, point.y/network.scale, params, callback);
	        }
	    });
	},
	enableDrag : function(){
	    var body = TWaver.Utils.getBody();
	    body.onmousemove = function(evt){
	        if(!DNDUtil.DRAG_INFO.target){
	            return;
	        }
	        evt = TWaver.Utils.getEvent(evt);
            TWaver.Utils.eventPreventDefault(evt);
	        var point = TWaver.Utils.getMousePageLocation(evt);
	        if(!DNDUtil.DRAG_INFO.dragElement){
	            var target = DNDUtil.DRAG_INFO.target;
	            if(Math.abs(point.x - DNDUtil.DRAG_INFO.dragPoint.x) > 5 || Math.abs(point.y - DNDUtil.DRAG_INFO.dragPoint.y) > 5){
	                var div = document.createElement('div');
                    body.appendChild(div);
	                div.style.position = 'absolute';
	                var dragButton = target.cloneNode(true);
	                dragButton.id = null;
	                div.appendChild(dragButton);
	                body.appendChild(div);
	                DNDUtil.DRAG_INFO.dragElement = div;
	            }else{
	                return;
	            }
	        }
	        DNDUtil.DRAG_INFO.dragElement.style.left = (point.x - DNDUtil.DRAG_INFO.dragElement.clientWidth/2) + 'px';
	        DNDUtil.DRAG_INFO.dragElement.style.top = (point.y - DNDUtil.DRAG_INFO.dragElement.clientHeight/2) + 'px';
	    }
	    body.onmouseup = function(evt){
	        evt = TWaver.Utils.getEvent(evt);
	        if(!DNDUtil.DRAG_INFO.target){
	            return;
	        }
	        delete DNDUtil.DRAG_INFO.dragPoint;
	        if(DNDUtil.DRAG_INFO.target.dropHandler){
	            DNDUtil.DRAG_INFO.target.dropHandler(evt);
	        }
	        delete DNDUtil.DRAG_INFO.target;
	        if(DNDUtil.DRAG_INFO.dragElement){
	            body.removeChild(DNDUtil.DRAG_INFO.dragElement);
	            delete DNDUtil.DRAG_INFO.dragElement;
	        }
	    }
	},
	createDNDButton : function(toolbar, name, icon, dropHandler){
        if(toolbar instanceof Toolbar){
            toolbar = toolbar.dom;
        }
	    var button = document.createElement('button');
	    button.setAttribute('title', name);
	    if(icon){
	        name = '<IMG SRC="' + icon + '" ALIGN="absmiddle">';
	    }
	    button.innerHTML = name;
	    button.dropHandler = dropHandler;
	    button.onmousedown = function(evt){
	        evt = TWaver.Utils.getEvent(evt);
	        DNDUtil.DRAG_INFO.dragPoint = TWaver.Utils.getMousePageLocation(evt);
	        DNDUtil.DRAG_INFO.target = button;
	        TWaver.Utils.eventPreventDefault(evt);
	    }
	    toolbar.appendChild(button);
	    return button;
	}
}

