package com.rwy.httpService.entity.request;

import org.hibernate.validator.constraints.NotEmpty;
import org.nxstudio.core.model.Dto;
import org.nxstudio.service.httpService.entity.RequestMessageVO;

import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import javax.validation.ValidatorFactory;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import java.util.Set;

/**
 * Created by Administrator on 2015/4/12.
 * 查询字典记录
 */
@XmlAccessorType(XmlAccessType.FIELD)
public class QueryEacodeInfo extends RequestMessageVO {
    @NotEmpty(message = "登录用户id不能为空")
    private String loginuserid;
    /**
     * 字段
     */
    private String field;
    /**
     * 字段名称
     */
    private String fieldname;
    /**
     * 字典值
     */
    private String code;
    /**
     * 值描述
     */
    private String codedesc;

    @Override
    public void verifyParams(  Dto result) {
        {
            ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
            Validator validator = factory.getValidator();
            Set<ConstraintViolation<QueryEacodeInfo>> violations = validator.validate(this);
            if (violations.size() != 0) {
                StringBuilder volidationFailureSB = new StringBuilder();
                for (ConstraintViolation<QueryEacodeInfo> violation : violations) {
                    volidationFailureSB.append(violation.getPropertyPath().toString());
                    volidationFailureSB.append(violation.getMessage() );
                    result.put("code", -1);
                    result.put("msg",volidationFailureSB.toString());
                    break;
                }
            }
        };
    }

    public String getLoginuserid() {
        return loginuserid;
    }

    public void setLoginuserid(String loginuserid) {
        this.loginuserid = loginuserid;
    }

    public String getField() {
        return field;
    }

    public void setField(String field) {
        this.field = field;
    }

    public String getFieldname() {
        return fieldname;
    }

    public void setFieldname(String fieldname) {
        this.fieldname = fieldname;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getCodedesc() {
        return codedesc;
    }

    public void setCodedesc(String codedesc) {
        this.codedesc = codedesc;
    }
}
