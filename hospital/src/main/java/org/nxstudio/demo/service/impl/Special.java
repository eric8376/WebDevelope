package org.nxstudio.demo.service.impl;

import org.nxstudio.core.model.Dto;
import org.nxstudio.core.model.impl.BaseDto;

public class Special {
    public String designId;            //设计件ID
    public String designNo;            //设计件编号
    public Dto specialCondition;    //特例的先提条件
    public Dto specialValue;        //特例的值

    public Special() {
        specialCondition = new BaseDto();
        specialValue = new BaseDto();
    }
}
