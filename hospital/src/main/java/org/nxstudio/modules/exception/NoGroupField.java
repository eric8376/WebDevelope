package org.nxstudio.modules.exception;

/**
 * 编程环境 IDEA.
 * 编写者: 王少伟
 * 主题:【超过三个任务抛出的异常】
 * 时间: 2013-07-01 下午8:41
 */

public class NoGroupField extends Exception {
    public NoGroupField() {
        super("没有指定分组字段，无法分组导出excel");
    }

    public NoGroupField(String msg) {
        super(msg);
    }
}
