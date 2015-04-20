package org.nxstudio.service.socketserver.exceptions;

import org.nxstudio.service.socketserver.constants.CodeConst;
import org.nxstudio.service.socketserver.restools.ErrorCodeDefine;
import org.apache.commons.lang.StringUtils;


public class DAOException extends RuntimeException {
    private String errorCode;
    private String message;

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getErrorCode() {
        return errorCode;
    }

    public DAOException(String message) {
        super(new Exception(message));
        this.message = message;
    }

    public DAOException(String errorCode, String msg) {
        super();
        this.errorCode = errorCode;
        this.message = msg;
    }

    public DAOException(Throwable t) {
        super(t);
        this.errorCode = CodeConst.DAO_ERR_CODE_DEFAULT;
        message = ErrorCodeDefine.getMessage(errorCode, null);
        if (StringUtils.isEmpty(message)) {
            message = t.getMessage();
        }
    }

    public DAOException(Throwable t, String errorCode) {
        super(t);
        this.errorCode = errorCode;
        message = ErrorCodeDefine.getMessage(errorCode, null);
        if (StringUtils.isEmpty(message)) {
            message = t.getMessage();
        }
    }

    public DAOException(Throwable t, String errorCode, String[] fixMsgs) {
        super(t);
        this.errorCode = errorCode;
        message = ErrorCodeDefine.getMessage(errorCode, fixMsgs);
    }

    public void setFixMsgs(String[] fixMsgs) {
        message = ErrorCodeDefine.getMessage(errorCode, fixMsgs);
    }


}
