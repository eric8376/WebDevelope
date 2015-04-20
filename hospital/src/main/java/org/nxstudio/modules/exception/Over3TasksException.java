package org.nxstudio.modules.exception;

/**
 * 编程环境 IDEA.
 * 编写者: 王少伟
 * 主题:【超过三个任务抛出的异常】
 * 时间: 2013-07-01 下午8:41
 */

public class Over3TasksException extends Exception {
    public Over3TasksException() {
        super("当前业务规则规定：当添加一般或者加急任务的时候，用户任务数不允许超过三个！");
    }

    public Over3TasksException(String msg) {
        super(msg);
    }
}
