package org.nxstudio.modules.exception;

/**
 * Created with IntelliJ IDEA.
 * User: zhangwei
 * Date: 13-7-16
 * Time: 下午3:28
 * =================================
 * 用于表示流程已被提交的异常
 */
public class TaskFlowAwayException extends Exception {
    public TaskFlowAwayException() {
        super("该流程已被他人提交，您无法继续提交。");
    }

    public TaskFlowAwayException(Exception ex) {
        super("该流程已被他人提交，您无法继续提交。", ex);
    }

    public TaskFlowAwayException(String msg) {
        super(msg);
    }

    public TaskFlowAwayException(String msg, Exception ex) {
        super(msg, ex);
    }
}
