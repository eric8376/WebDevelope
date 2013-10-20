/**
 * 
 */
package com.microwill.framework.vo;

import java.util.ArrayList;
import java.util.List;

/**
 * @author Administrator
 *
 */
public class TreeItem {
private List<TreeItem> item;
private String id;
private String text;
private int open;
private String im0;
private String href;
public List<TreeItem> getItem() {
	return item;
}
public void setItem(List<TreeItem> item) {
	this.item = item;
}
public String getId() {
	return id;
}
public void setId(String id) {
	this.id = id;
}
public String getText() {
	return text;
}
public void setText(String text) {
	this.text = text;
}
public int getOpen() {
	return open;
}
public void setOpen(int open) {
	this.open = open;
}
public String getIm0() {
	return im0;
}
public void setIm0(String im0) {
	this.im0 = im0;
}
public String getHref() {
	return href;
}
public void setHref(String href) {
	this.href = href;
}
public static TreeItem getRootItem(){
	TreeItem root=new TreeItem();
	root.setId("0");
	return root;
}
}
