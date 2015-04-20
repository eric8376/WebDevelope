package org.nxstudio.demo.net.httpinvoker.client;

import org.nxstudio.util.spring.SpringContextHolder;
import org.nxstudio.core.model.Dto;

/**
 * 测试调用HttpInvoker服务
 *
 * @author XiongChun
 */
public class RunClient {

    public static void main(String[] args) {
        sayHello();
        queryBalanceInfo();
    }

    private static void sayHello() {
        HelloWorldClient client = SpringContextHolder.getBean("client_httpinvoker");
        String outString = client.sayHello("Lily!");
        System.out.println(outString);
    }

    private static void queryBalanceInfo() {
        HelloWorldClient client = SpringContextHolder.getBean("client_httpinvoker");
        Dto outDto = client.queryBalanceInfo("BJLK1000000003900");
        System.out.println(outDto);
    }

}
