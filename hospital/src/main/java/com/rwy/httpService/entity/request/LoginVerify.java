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
 * app登录校验
 */
@XmlAccessorType(XmlAccessType.FIELD)
public class LoginVerify extends RequestMessageVO {
    @NotEmpty(message = "帐号不能为空")
    private String account;
    @NotEmpty(message = "密码不能为空")
    private String password;
    @Override
    public void verifyParams( Dto result) {
        {
            ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
            Validator validator = factory.getValidator();
            Set<ConstraintViolation<LoginVerify>> violations = validator.validate(this);
            if (violations.size() != 0) {
                StringBuilder volidationFailureSB = new StringBuilder();
                for (ConstraintViolation<LoginVerify> violation : violations) {
                    volidationFailureSB.append(violation.getPropertyPath().toString());
                    volidationFailureSB.append(violation.getMessage() );
                    result.put("code", -1);
                    result.put("msg",volidationFailureSB.toString());
                    break;
                }
            }
        };
    }

    public String getAccount() {
        return account;
    }

    public void setAccount(String account) {
        this.account = account;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
