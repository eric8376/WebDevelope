package org.nxstudio.demo.net.httpinvoker;

import org.nxstudio.util.spring.SpringContextHolder;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.nxstudio.core.dao.Reader;
import org.nxstudio.core.model.Dto;
import org.nxstudio.core.model.impl.BaseDto;

//import bsh.This;

/**
 * Httpinvoker实现类
 *
 * @author XiongChun
 * @see org.nxstudio.core.model.impl.BaseDomain
 * @since 2010-10-13
 */
public class HelloWorldServiceImpl implements HelloWorldService {

    Log log = LogFactory.getLog(HelloWorldServiceImpl.class);

    /**
     * sayHello
     */
    public String sayHello(String text) {
        return "Hello," + text;
    }

    /**
     * 查询一条结算明细测试数据
     *
     * @param jsbh
     * @return Dto
     */
    public Dto queryBalanceInfo(String jsbh) {
        Reader reader = (Reader) SpringContextHolder.getBean("g4Reader");
        Dto inDto = new BaseDto("sxh", jsbh);
        Dto outDto = (BaseDto) reader.queryForObject("Demo.queryBalanceInfo", inDto);
        return outDto;
    }

}
