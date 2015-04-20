package org.nxstudio.service.socketserver.io;

import java.net.InetAddress;
import java.net.SocketException;
import java.nio.channels.SocketChannel;

/**
 * <p>
 * Title: 客户端请求信息类
 * </p>
 * <p>
 * Description: 客户端请求信息类
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

public class Request {
    private SocketChannel sc = null;

    private byte[] dataInput = null;

    private Object obj = null;

    private InetAddress address = null;

    private int port = 0;

    public Request(SocketChannel sc) {
        this.sc = sc;
        this.address = sc.socket().getInetAddress();
        this.port = sc.socket().getPort();
    }

    public InetAddress getAddress() {
        return address;
    }

    public int getPort() {
        return port;
    }

    public boolean isConnected() {
        return sc.isConnected();
    }

    public boolean isBlocking() {
        return sc.isBlocking();
    }

    public boolean isConnectionPending() {
        return sc.isConnectionPending();
    }

    public boolean getKeepAlive() throws SocketException {
        return sc.socket().getKeepAlive();
    }

    public int getSoTimeout() throws SocketException {
        return sc.socket().getSoTimeout();
    }

    public boolean getTcpNoDelay() throws SocketException {
        return sc.socket().getTcpNoDelay();
    }

    public boolean isClosed() {
        return sc.socket().isClosed();
    }

    public void attach(Object obj) {
        this.obj = obj;
    }

    public Object attachment() {
        return obj;
    }

    public byte[] getDataInput() {
        return dataInput;
    }

    public void setDataInput(byte[] dataInput) {
        this.dataInput = dataInput;
    }

    public String toString() {
        StringBuffer sb = new StringBuffer(256);
        sb.append("客户请求地址：");
        sb.append(address);

        if (dataInput == null) {
            sb.append("；请求内容为空");
        } else {
            sb.append("；请求内容为：");
            for (int i = 0; i < dataInput.length && i < 10; i++) {
                sb.append(Byte.toString(dataInput[i]));
                sb.append(" ");
            }
            sb.append("...");
        }
        return sb.toString();
    }
}