package com.microwill.framework.weix.svc.msg;

import java.io.Writer;
import java.util.HashSet;
import java.util.Set;

import com.thoughtworks.xstream.core.util.QuickWriter;
import com.thoughtworks.xstream.io.HierarchicalStreamWriter;
import com.thoughtworks.xstream.io.xml.PrettyPrintWriter;
import com.thoughtworks.xstream.io.xml.XppDriver;

/**
 * 用于给XML加上CDATA标签
 *
 */
public class CDataDriver extends XppDriver
{
	//不需要加上CDATA的字段
	private Set<String> excluded = new HashSet<String>();
	
	public void addExcluded(String name)
	{
		excluded.add(name);
	}

	@Override
	public HierarchicalStreamWriter createWriter(Writer out)
	{	
		return new PrettyPrintWriter(out)
		{
			private boolean writeCData = true;

			@Override
			protected void writeText(QuickWriter writer, String text)
			{
				if(writeCData)
				{
					writer.write("<![CDATA[");  
					writer.write(text);  
					writer.write("]]>");
				}
				else
				{
					writer.write(text);
				}
			}

			@SuppressWarnings("rawtypes")
			@Override
			public void startNode(String name, Class clazz)
			{
				super.startNode(name, clazz);
				
				writeCData = excluded.contains(name) ? false : true;
			}
		};
	}

}
