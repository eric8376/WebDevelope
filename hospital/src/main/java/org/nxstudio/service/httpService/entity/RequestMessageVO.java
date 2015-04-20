package org.nxstudio.service.httpService.entity;

import org.hibernate.validator.constraints.NotEmpty;
import org.nxstudio.core.model.Dto;

/**
 * Created by Administrator on 2015/4/13.
 */
public abstract class RequestMessageVO {
    @NotEmpty(message = "业务代码不能为空")
    public String business_code;
    public abstract void verifyParams(Dto result) ;

    public String getBusiness_code() {
        return business_code;
    }

    public void setBusiness_code(String business_code) {
        this.business_code = business_code;
    }
}
