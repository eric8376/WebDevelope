package org.nxstudio.service.mail;

import javax.mail.Authenticator;
import javax.mail.PasswordAuthentication;

/**
 * 编程环境 IDEA.
 * 编写者: 王少伟
 * 主题:【邮箱服务 验证】
 * 时间: 2013-06-10 下午4:36
 */
public class MailAuthenticator extends Authenticator {
    /**
     * 账号
     */
    private String username;
    /**
     * 密码
     */
    private String password;

    /**
     * 初始化
     *
     * @param userName 账号
     * @param passWord 密码
     */
    public MailAuthenticator(String username, String password) {
        this.username = username;
        this.password = password;
    }

    @Override
    protected PasswordAuthentication getPasswordAuthentication() {
        return new PasswordAuthentication(username, password);
    }


    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }


}
