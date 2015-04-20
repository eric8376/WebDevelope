/**
 * MessageUtil.java
 * 版权声明 力铭科技版权所有
 * 项目组：广州农村商业银行电子商业汇票系统
 * 修订记录：
 * 1)创建者：林邵诚
 * 时 间：Aug 11, 2010
 * 描 述：创建
 */
package org.nxstudio.service.socketserver.integration.util;

import java.text.SimpleDateFormat;
import java.util.Date;

import org.nxstudio.service.socketserver.integration.send.vo.CommonHeader;
import org.nxstudio.service.socketserver.restools.SourceTemplate;
import org.apache.commons.lang.StringUtils;
import org.springframework.jdbc.core.JdbcTemplate;


/**
 * <pre>功能描述: </pre>
 * <br>JDK版本：1.5+
 * @author 林邵诚
 * @version 1.0.1 创建于 Aug 11, 2010
 * @since 1.0
 * 修改日期：Aug 11, 2010 林邵诚
 */
public class MessageUtil {

    /**
     * 标准日期格式化工具
     */
    public static SimpleDateFormat ISODATEFORMATTER = new SimpleDateFormat("yyyyMMdd");

    /**
     * 标准时间格式化工具
     */
    public static SimpleDateFormat ISOTIMEFORMATTER = new SimpleDateFormat("HHmmss");

    /**
     * 功能说明：设置公共报文头的信息
     * @param header 所需赋值的报文头
     * @author: 林邵诚
     * @version: 1.0.1
     * 创建于Aug 11, 2010
     */
    public static void setMessageHeader(CommonHeader header) {
        Date today = new Date();
        if (StringUtils.isBlank(header.getChnl_seq())) {
            header.setChnl_seq(generateCoreMessageSeqNo());
        }
        //TODO 设置发送渠道号
        header.setSnd_chnl_no(null);

        header.setRcv_chnl_no("23");
        header.setChnl_dt(ISODATEFORMATTER.format(today));
        header.setChnl_tm(ISOTIMEFORMATTER.format(today));

    }

    /**
     * 功能说明：生成报文流水号，流水号长度12位并且要保证当日唯一，因此系统新增了一个循环序列最大值为999,999,999,999，实际应用中在相当长一段时间内序列值都不至于重置
     * @return 返回报文流水号
     * @author: 林邵诚
     * @version: 1.0.1
     * 创建于Aug 11, 2010
     */
    public static String generateCoreMessageSeqNo() {
        JdbcTemplate template = (JdbcTemplate) SourceTemplate.getSpringContextInstance().getBean("jdbcTemplate");
        Long counter = template.queryForLong("select counter_sequence.nextval from dual ");
        String seqNo = StringUtils.leftPad(String.valueOf(counter), 12, '0');
        return seqNo;
    }
}
