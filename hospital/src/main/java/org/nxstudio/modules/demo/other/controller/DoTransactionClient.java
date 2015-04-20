package org.nxstudio.modules.demo.other.controller;

import org.nxstudio.util.spring.SpringContextHolder;
import org.nxstudio.core.model.Dto;
import org.nxstudio.modules.demo.other.service.DemoService;
import org.nxstudio.core.controller.BaseAction;

public class DoTransactionClient {

    /**
     * 演示事务控制
     *
     * @author XiongChun
     * @see BaseAction
     * @since 2011-2-30
     */
    public static void main(String[] args) {
        DemoService demoService = SpringContextHolder.getBean("demoService");
        Dto outDto = demoService.doTransactionTest();
        System.out.println("返回值:\n" + outDto);
    }

}
