package org.nxstudio.modules.systemassist.common;

import org.nxstudio.util.properties.PropertiesFactory;
import org.nxstudio.util.properties.PropertiesFile;
import org.nxstudio.util.properties.PropertiesHelper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.MailSender;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSenderImpl;

import java.util.Properties;

/**
 * <pre>spring Mail 配置文件</pre>
 * <pre>系统基础模块</pre>
 *
 * @author 吴为超
 * @version 1.0.0 创建于 2014/8/12
 */
@Configuration
public class springMailConfig {

    private PropertiesHelper propertiesHelper = PropertiesFactory.getPropertiesHelper(PropertiesFile.APP);

    private String emailHost = propertiesHelper.getValue("emailHost");

    private String userName = propertiesHelper.getValue("emailUserName");

    private String password = propertiesHelper.getValue("emailPassword");

    private String from = propertiesHelper.getValue("emailUserName");

    private String to;

    private String mailAuth = "false";


    public
    @Bean
    MailSender mailSender() {
        JavaMailSenderImpl javaMailSender = new JavaMailSenderImpl();
        javaMailSender.setHost(this.emailHost);
        javaMailSender.setUsername(this.userName);
        javaMailSender.setPassword(this.password);
        Properties pp = new Properties();
        pp.setProperty("mail.smtp.auth", this.mailAuth);
        javaMailSender.setJavaMailProperties(pp);
        return javaMailSender;
    }

    /**
     * @return
     */
    public
    @Bean
    SimpleMailMessage mailMessage() {
        SimpleMailMessage sm = new SimpleMailMessage();
        sm.setFrom(this.from);
        return sm;
    }


}
