if (document.getElementById) {

	var tree = new WebFXTree('Root');
	//tree.setBehavior('classic');		
	
	document.getElementById("treeDiv").innerHTML = tree.toHTML().toString();
	//document.write(tree);
	var a = new WebFXTreeItem('1');
	tree.add(a);
	var b = new WebFXTreeItem('1.1');
	a.add(b);
	b.add(new WebFXTreeItem('1.1.1'));
	b.add(new WebFXTreeItem('1.1.2'));
	b.add(new WebFXTreeItem('1.1.3'));
	var f = new WebFXTreeItem('1.1.4');
	b.add(f);
	f.add(new WebFXTreeItem('1.1.4.1'));
	f.add(new WebFXTreeItem('1.1.4.2'));
	f.add(new WebFXTreeItem('1.1.4.3'));
	var c = new WebFXTreeItem('1.2');
	a.add(c);
	c.add(new WebFXTreeItem('1.5.1'));
	c.add(new WebFXTreeItem('1.5.2'));
	c.add(new WebFXTreeItem('1.5.3'));
	a.add(new WebFXTreeItem('1.3'));
	a.add(new WebFXTreeItem('1.4'));
	a.add(new WebFXTreeItem('1.5'));
	var d = new WebFXTreeItem('2');
	tree.add(d);
	var e = new WebFXTreeItem('2.1');
	d.add(e);
	e.add(new WebFXTreeItem('2.1.1'));
	e.add(new WebFXTreeItem('2.1.2'));
	e.add(new WebFXTreeItem('2.1.3'));
	d.add(new WebFXTreeItem('2.2'));
	d.add(new WebFXTreeItem('2.3'));
	d.add(new WebFXTreeItem('2.4'));
	
}
