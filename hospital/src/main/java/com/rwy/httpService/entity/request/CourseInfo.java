package com.rwy.httpService.entity.request;

import org.hibernate.validator.constraints.NotEmpty;
import org.nxstudio.core.model.Dto;
import org.nxstudio.service.httpService.entity.RequestMessageVO;
import org.nxstudio.util.g4.G4Utils;

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
public class CourseInfo extends RequestMessageVO {
    @NotEmpty(message = "登录用户id不能为空")
    private String loginuserid;

    @Override
    public void verifyParams(  Dto result) {
        {
            ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
            Validator validator = factory.getValidator();
            Set<ConstraintViolation<CourseInfo>> violations = validator.validate(this);
            if (violations.size() != 0) {
                StringBuilder volidationFailureSB = new StringBuilder();
                for (ConstraintViolation<CourseInfo> violation : violations) {
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
}
