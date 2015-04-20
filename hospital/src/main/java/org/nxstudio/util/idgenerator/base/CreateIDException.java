package org.nxstudio.util.idgenerator.base;

/**
 * CreateIDException
 * 此代码源于开源项目E3,原作者：黄云辉
 *
 * @author XiongChun
 * @see IDException
 * @since 2010-03-17
 */
public class CreateIDException extends IDException {

    private static final long serialVersionUID = 1L;

    public CreateIDException() {
        super();
    }

    public CreateIDException(String message, Throwable cause) {
        super(message, cause);
    }

    public CreateIDException(String message) {
        super(message);
    }

    public CreateIDException(Throwable cause) {
        super(cause);
    }

}
