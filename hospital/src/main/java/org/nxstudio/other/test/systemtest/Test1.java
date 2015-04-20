package org.nxstudio.other.test.systemtest;

import java.util.List;

import org.nxstudio.util.spring.SpringContextHolder;
import org.nxstudio.core.dao.Reader;
import org.nxstudio.core.model.Dto;
import org.nxstudio.core.model.impl.BaseDto;
import org.nxstudio.util.json.JsonHelper;
import org.nxstudio.util.g4.G4Constants;

public class Test1 {

    /**
     * @param args
     */
    public static void main(String[] args) {
        Reader g4Reader = SpringContextHolder.getBean("g4Reader");
        Dto qDto = new BaseDto();
        qDto.put("ksrq", "20120815000000");
        List list = g4Reader.queryForList("Monitor.queryExceptionRecordsByDto", qDto);
        Integer totalCount = (Integer) g4Reader.queryForObject("Monitor.queryExceptionRecordsByDtoForPageCount", qDto);
        for (int i = 0; i < list.size(); i++) {
            Dto dto = (BaseDto) list.get(i);
            System.out.println(dto);
        }
        System.out.println("****************************************");
        String jsonString = JsonHelper.encodeList2PageJson(list, totalCount, G4Constants.FORMAT_DateTime);
        System.out.println(jsonString);
    }
}
