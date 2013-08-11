package com.microwill.framework.util;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.json.JSONArray;

public class DataUtils {

	public static String parsetoJsonGrid(List list,String id)
	{
		return parsetoJson(parsetoGrid( list, id));
	}
	/**
	 * 将查询结果转换成DhtmlxGrid数据
	 * @param list
	 * @param id
	 * @return
	 */
	public static List parsetoGrid(List list,String id)
	{
		Iterator iterator=list.iterator();
		List resultList=new ArrayList();
		while(iterator.hasNext())
		{
			Map row=new LinkedHashMap();
			Map colum=(Map)iterator.next();
			Iterator iterator2=colum.keySet().iterator();
			List l=new ArrayList();
			row.put("id", (String)colum.get(id));
			while(iterator2.hasNext())
			{
				String key=(String)iterator2.next();
				if(!key.equalsIgnoreCase(id))
				{
					
					l.add(colum.get(key));
				}
				
			}
			row.put("data", l);
			resultList.add(row);
			
		}
		return resultList;
	}

	/**
	 * 将列表转化成JSON字符串
	 * @param list
	 * @return
	 */
	public static String parsetoJson(List list) {
		JSONArray jSONArray=new JSONArray();
		jSONArray.put(list);
		String str=jSONArray.toString();
		//return "{\"list\":"+str.substring(1, str.length()-1)+"}";
		return str.substring(1, str.length()-1);
	}
	/**
	 * return paging list
	 * @param list
	 * @param ps
	 * @return
	 */
	public static String parsetoJson(PaginationSupport ps) {
		JSONArray jSONArray=new JSONArray();
		jSONArray.put(ps.getItems());
		String str=jSONArray.toString();
		return "{" +
				"\"list\":"+str.substring(1, str.length()-1)+
				",\"pageIndex\":"+ps.getPageNumber()+
				",\"pageSize\":"+ps.getPageSize()+
				",\"totalCount\":"+ps.getTotalCount()+
				",\"lastPage\":"+ps.getLastPageNumber()
				+"}";
	}
	/**
	 * @param ids
	 * @return
	 */
	public static String toSqlStr(String ids)
	{
		String[] id=ids.split(",");
		String returnStr="";
		for(int i=0;i<id.length;i++)
		{
			returnStr+="'"+id[i]+"',";
		}
		return returnStr.substring(0, returnStr.length()-1);
		
	}
	public static String toSqlStr(List l)
	{
		String returnStr="";
		for(int i=0;i<l.size();i++)
		{
			returnStr+="'"+(String)l.get(i)+"',";
		}
		return returnStr.substring(0, returnStr.length()-1);
	}
	 /**
	  * 通过value查询key
	 * @param hm
	 * @param value
	 * @return
	 */
	public static Object getKeyFromValue(Map hm, Object value) {
		 Iterator keyIterator=hm.keySet().iterator();
		   while(keyIterator.hasNext())
		    {
			   Object o=keyIterator.next();
		      if (hm.get(o).equals(value)) {
		        return o;
		      }
		    }
		    return null;
		  }

}
