package org.nxstudio.service.socketserver.io;

import org.nxstudio.service.socketserver.util.Helper;

import java.io.IOException;
import java.nio.channels.SocketChannel;


/**
 * <p>
 * Title: 响应器
 * </p>
 * <p>
 * Description: 用于向客户端发送数据
 * </p>
 * <p>
 * Copyright: Copyright (c) 2008
 * </p>
 * <p>
 * Company: 力铭科技
 * </p>
 *
 * @author 夏兵
 * @version 1.0
 */

public class Response {
    private SocketChannel sc = null;

    public Response(SocketChannel sc) {
        this.sc = sc;
    }

    /**
     * 向客户端写数据
     *
     * @param data 待响应数据
     */
    public void send(byte[] data) throws IOException {
        Helper.send(sc, data);
    }
}