package org.nxstudio.core.dao.impl;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;

import javax.sql.DataSource;

import org.nxstudio.core.dao.Reader;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.nxstudio.core.model.Dto;
import org.nxstudio.core.model.impl.BaseDto;
import org.nxstudio.modules.exception.G4Exception;
import org.nxstudio.util.g4.G4Utils;
import org.nxstudio.util.g4.G4Constants;
import org.springframework.orm.ibatis.support.SqlMapClientDaoSupport;

/**
 * 数据读取器<br>
 * 基于iBatis实现,只有query权限,提供在Action中使用
 *
 * @author XiongChun
 * @see org.springframework.orm.ibatis.support.SqlMapClientDaoSupport
 * @since 2009-07-23
 */
public class ReaderImpl extends SqlMapClientDaoSupport implements Reader {

    private static Log log = LogFactory.getLog(ReaderImpl.class);

    /**
     * 查询一条记录
     *
     * @param parameterObject 查询条件对象(map javaBean)
     */
    public Object queryForObject(String statementName, Object parameterObject) {
        return super.getSqlMapClientTemplate().queryForObject(statementName,
                parameterObject);
    }

    /**
     * 查询一条记录
     */
    public Object queryForObject(String statementName) {
        return super.getSqlMapClientTemplate().queryForObject(statementName,
                new BaseDto());
    }

    /**
     * 查询记录集合
     *
     * @param parameterObject 查询条件对象(map javaBean)
     */
    public List queryForList(String statementName, Object parameterObject) {
        return super.getSqlMapClientTemplate().queryForList(statementName,
                parameterObject);
    }

    /**
     * 按分页查询
     * <p/>
     * 查询条件对象(map javaBean)
     *
     * @throws java.sql.SQLException
     */
    public List queryForPage(String statementName, Dto qDto) throws SQLException {
        Connection connection = getConnection();
        String dbNameString = connection.getMetaData().getDatabaseProductName().toLowerCase();
        try {
            connection.close();
        } catch (Exception e) {
            log.error(G4Constants.Exception_Head + "未正常关闭数据库连接");
            e.printStackTrace();
        }
        String start = qDto.getAsString("start");
        String limit = qDto.getAsString("limit");
        int startInt = 0;
        if (G4Utils.isNotEmpty(start)) {
            startInt = Integer.parseInt(start);
            if (dbNameString.indexOf("ora") > -1) {
                qDto.put("start", startInt + 1);
            } else if (dbNameString.indexOf("mysql") > -1) {
                qDto.put("start", startInt);
            } else {
                qDto.put("start", startInt);
            }
        }
        if (G4Utils.isNotEmpty(limit)) {
            int limitInt = Integer.parseInt(limit);
            if (dbNameString.indexOf("ora") > -1) {
                qDto.put("end", limitInt + startInt);
            } else if (dbNameString.indexOf("mysql") > -1) {
                qDto.put("end", limitInt);
            } else {
                qDto.put("end", limitInt);
            }
        }

        Integer intStart = qDto.getAsInteger("start");
        Integer end = qDto.getAsInteger("end");
        if (G4Utils.isEmpty(start) || G4Utils.isEmpty(end)) {
            try {
                throw new G4Exception(
                        G4Constants.ERR_MSG_QUERYFORPAGE_STRING);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        return getSqlMapClientTemplate().queryForList(statementName, qDto,
                intStart.intValue(), end.intValue());
    }

    /**
     * 查询记录集合
     */
    public List queryForList(String statementName) {
        return super.getSqlMapClientTemplate().queryForList(statementName,
                new BaseDto());
    }

    /**
     * 获取Connection对象<br>
     * 说明：虽然向Dao消费端暴露了获取Connection对象的方法但不建议直接获取Connection对象进行JDBC操作
     *
     * @return 返回Connection对象
     * @throws java.sql.SQLException
     */
    public Connection getConnection() throws SQLException {
        return getSqlMapClientTemplate().getDataSource().getConnection();
    }

    /**
     * 获取DataSource对象<br>
     * 说明：虽然向Dao消费端暴露了获取DataSource对象的方法但不建议直接获取DataSource对象进行JDBC操作
     *
     * @return 返回DataSource对象
     */
    public DataSource getDataSourceFromSqlMap() throws SQLException {
        return getSqlMapClientTemplate().getDataSource();
    }
}
