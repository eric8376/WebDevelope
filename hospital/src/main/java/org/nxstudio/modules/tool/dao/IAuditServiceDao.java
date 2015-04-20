package org.nxstudio.modules.tool.dao;

/**
 * Created by 吴为超 on 2014/8/6.
 */
public interface IAuditServiceDao {

    //   public void insertSql(sql)
    public void insert(String statementName, Object parameterObject);


    public int update(String statementName, Object parameterObject);
}
