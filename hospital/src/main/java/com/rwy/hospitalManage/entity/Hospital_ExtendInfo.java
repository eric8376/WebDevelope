package com.rwy.hospitalManage.entity;


import org.nxstudio.core.model.AbstractModel;
import org.nxstudio.util.idgenerator.annotation.CommonIDGenerator;
import org.springframework.stereotype.Component;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * <pre></pre>
 * <br>
 * <pre>所属模块：</pre>
 *
 * @author 黄琦鸿
 *         创建于  2014/12/28 19:26.
 */
@Component
@Entity
@Table(name = "hospital_extendinfo")
public class Hospital_ExtendInfo extends AbstractModel {
    @Id
    @CommonIDGenerator(name = "CODEIDSEQUENCES", setIDMethoName = "setExtend_id", fieldClass = Long.class)
    private Long extend_id;
    private String address;
    private String hospital_id;
    private String province;
    private String city;
    private String area;

    public Long getExtend_id() {
        return extend_id;
    }

    public void setExtend_id(Long extend_id) {
        this.extend_id = extend_id;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getHospital_id() {
        return hospital_id;
    }

    public void setHospital_id(String hospital_id) {
        this.hospital_id = hospital_id;
    }

    public String getProvince() {
        return province;
    }

    public void setProvince(String province) {
        this.province = province;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getArea() {
        return area;
    }

    public void setArea(String area) {
        this.area = area;
    }
}
