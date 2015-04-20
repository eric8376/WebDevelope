/**
 * @(#)MsgResult.java 2012-6-13
 * <p/>
 * Copyright 2000-2012 by RenWoYou Corporation.
 * <p/>
 * All rights reserved.
 * <p/>
 * This software is the confidential and proprietary information of
 * RenWoYou Corporation ("Confidential Information").  You
 * shall not disclose such Confidential Information and shall use
 * it only in accordance with the terms of the license agreement
 * you entered into with RenWoYou.
 */

package org.nxstudio.modules.systemassist.common;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

/**
 * 发送信息响应。
 *
 * @author Zhiwei HUANG
 * @date 2012-6-13
 * @version $Revision$
 */
@XmlRootElement(name = "Result")
public class MsgResult {

    private String State;
    private String Message;
    private String Detail;

    public MsgResult() {

    }

    public MsgResult(String state, String message) {
        this.State = state;
        this.Message = message;
    }

    @XmlElement(name = "State")
    public String getState() {
        return State;
    }

    public void setState(String state) {
        State = state;
    }

    @XmlElement(name = "Message")
    public String getMessage() {
        return Message;
    }

    public void setMessage(String message) {
        Message = message;
    }

    @XmlElement(name = "Detail")
    public String getDetail() {
        return Detail;
    }

    public void setDetail(String detail) {
        Detail = detail;
    }

}
