package org.nxstudio.service.socketserver.integration.send.vo.CommonVo;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;


@XmlRootElement(name = "main_data")
@XmlAccessorType(XmlAccessType.FIELD)
public abstract class BaseMain_Data {

    private String request_type;

    public String getRequest_type() {
        return request_type;
    }

    public void setRequest_type(String request_type) {
        this.request_type = request_type;
    }
}
