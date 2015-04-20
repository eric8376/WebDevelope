package org.nxstudio.util.json;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.nxstudio.core.model.Dto;
import org.nxstudio.core.model.impl.BaseDto;

import java.util.ArrayList;
import java.util.List;

/**
 * 根据vo字段名加载值
 * Created with IntelliJ IDEA.
 * User: 黄琦鸿
 * Date: 13-6-6
 * Time: 下午5:19
 * To change this template use File | Settings | File Templates.
 */
public class ListJson2List {
    public List<Dto> Listjson2List(String listjson) {
        if (listjson == null) {
            return null;
        }
        if (!listjson.isEmpty() && !listjson.equals("") && listjson.length() > 0) {
            List<Dto> resultList = new ArrayList<Dto>();
            JSONArray jsonArray = JSONArray.fromObject(listjson);
            for (int i = 0; i < jsonArray.size(); i++) {
                JSONObject jsonObject = jsonArray.getJSONObject(i);
                Dto tempdto = (BaseDto) JSONObject.toBean(jsonObject, BaseDto.class);
                resultList.add(tempdto);
            }
            return resultList;
        } else {
            return null;
        }

    }

}

