package org.nxstudio.modules.exception;

/**
 * 编程环境 IDEA.
 * 编写者: 黄琦鸿
 * 主题:【导入excel异常】
 * 时间: 2013-07-01 下午8:41
 */

public class ImportExcelException extends Exception {
    public ImportExcelException() {
        super("导入excel异常");
    }

    public ImportExcelException(String msg) {
        super(msg);
    }
}
