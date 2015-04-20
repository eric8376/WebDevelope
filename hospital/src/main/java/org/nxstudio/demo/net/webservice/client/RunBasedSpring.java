package org.nxstudio.demo.net.webservice.client;

import org.nxstudio.util.spring.SpringContextHolder;
import org.nxstudio.demo.net.webservice.HelloWorldService;

public class RunBasedSpring {

    public static void main(String[] args) {
        sayHello();
        queryBalanceInfo();
    }

    private static void sayHello() {
        HelloWorldService helloWorldService = (HelloWorldService) SpringContextHolder.getBean("helloWorldService");
        String outString = helloWorldService.sayHello("Afghan!");
        System.out.println(outString);
    }

    private static void queryBalanceInfo() {
        HelloWorldService helloWorldService = SpringContextHolder.getBean("helloWorldService");
        String outString = helloWorldService.queryBalanceInfo("BJLK1000000003900");
        System.out.println(outString);
    }
}
