package org.nxstudio.util.idgenerator;

import org.nxstudio.core.model.Dto;
import org.nxstudio.core.model.impl.BaseDto;
import org.nxstudio.util.idgenerator.base.generator.DefaultIDGenerator;

/**
 * ID生成器 静态类解决多线程并发访问生成ID的问题
 * 此类第一次实例化会执行所有的static代码块，如果想按需加载这些ID生成器，则应该一个ID写一个静态类就可以
 *
 * @author XiongChun
 * @since 2010-09-16
 */
public class IDHelper {
    public IDHelper() {
        super();    //To change body of overridden methods use File | Settings | File Templates.
    }


    /**
     * 返回事件跟踪ID
     *
     * @return
     */
    public static String getEventID() {
        return getIdSequenceByKey("EVENTSEQUENCES");
    }


    /**
     * 返回项目ID
     *
     * @return
     */
    public static String getXmID() {
        return getIdSequenceByKey("XMSEQUENCES");
    }

    /**
     * 返回CODEID
     *
     * @return
     */
    public static String getCodeID() {
        return IdGenerator.getCodeIdSequence();
    }

    public static String getIdSequenceByKey(Dto dto) {
        return IdGenerator.getIdSequenceByKey(dto);
    }

    public static String getIdSequenceByKey(String SequenceKey) {
        Dto dto = new BaseDto();
        dto.put("key", SequenceKey);
        return IdGenerator.getIdSequenceByKey(dto);
    }


    /**
     * 返回ExceptionID
     *
     * @return
     */
    public static String getExceptionID() {
        return getIdSequenceByKey("EXCEPTIONSEQUENCES");
    }

    /**
     * 返回AUTHORIZEID_ROLE
     *
     * @return
     */
    public static String getAuthorizeid4Role() {
        return getIdSequenceByKey("AUTHROLESEQUENCES");
    }

    /**
     * 返回PARAMID
     *
     * @return
     */
    public static String getParamID() {
        return getIdSequenceByKey("PARAMSEQUENCES");
    }

    /**
     * 返回ROLEID
     *
     * @return
     */
    public static String getRoleID() {
        return getIdSequenceByKey("ROLESEQUENCES");
    }

    /**
     * 返回AUTHORIZEID_USERMENUMAP
     *
     * @return
     */
    public static String getAuthorizeid4Usermenumap() {
        return getIdSequenceByKey("AUTHUSERMAPSEQUENCES");
    }

    /**
     * 返回AUTHORIZEID_USER
     *
     * @return
     */
    public static String getAuthorizeid4User() {
        return getIdSequenceByKey("AUTHUSERSEQUENCES");
    }

    /**
     * 返回USERID
     *
     * @return
     */
    public static String getUserID() {
        return getIdSequenceByKey("USERSEQUENCES");
    }

    /**
     * 返回FILEID
     *
     * @return
     */
    public static String getFileID() {
        return getIdSequenceByKey("FILESEQUENCES");
    }

    /**
     * 返回PARTID
     *
     * @return
     */
    public static String getPartID() {
        return getIdSequenceByKey("PARTSEQUENCES");
    }

    /**
     * 返回Authorizeid
     *
     * @return
     */
    public static String getAuthorizeid4Earoleauthorize() {
        return getIdSequenceByKey("AUTHUIROLESEQUENCES");
    }

    /**
     * 返回Authorizeid
     *
     * @return
     */
    public static String getAuthorizeid4Eauserauthorize() {
        return getIdSequenceByKey("AUTHUIUSERSEQUENCES");
    }
}
