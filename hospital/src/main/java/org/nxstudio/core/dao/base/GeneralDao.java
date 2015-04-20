package org.nxstudio.core.dao.base;

import org.nxstudio.core.model.AbstractModel;
import org.nxstudio.core.model.Dto;
import org.nxstudio.modules.exception.PrcException;
import org.nxstudio.plugin.pagination.Page;
import org.nxstudio.util.dao.ConditionQuery;
import org.nxstudio.util.dao.OrderBy;
import org.springframework.orm.ibatis.SqlMapClientTemplate;

import javax.sql.DataSource;
import java.io.Serializable;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

/**
 * Copyright 2000-2014 by RenWoYou Corporation.
 * <p/>
 * All rights reserved.
 * <p/>
 * This software is the confidential and proprietary information of
 * RenWoYou Corporation ("Confidential Information").  You
 * shall not disclose such Confidential Information and shall use
 * it only in accordance with the terms of the license agreement
 * you entered into with RenWoYou.
 * <p/>
 * <p/>
 * Created by Chunji.Luo on 2014/7/28.
 */
public interface GeneralDao {

    /**
     * ---------------------------Hibernate--------------------------
     */

    public <T extends AbstractModel> T save(T model);

    public <T extends AbstractModel> void saveOrUpdate(T model);

    public <T extends AbstractModel> void update(T model);

    public <T extends AbstractModel> void merge(T model);

    public <T extends AbstractModel, PK extends Serializable> void delete(Class<T> entityClass, PK id);

    public <T extends AbstractModel> void deleteObject(T model);

    public <T extends AbstractModel, PK extends Serializable> T get(Class<T> entityClass, PK id);

    public <T extends AbstractModel> int countAll(Class<T> entityClass);

    public <T extends AbstractModel> int countAll(Class<T> entityClass, ConditionQuery conditions);

    public <T extends AbstractModel> List<T> listAll(Class<T> entityClass);

    public <T extends AbstractModel> List<T> listAll(Class<T> entityClass, int pn);

    public <T extends AbstractModel> List<T> listAll(Class<T> entityClass, int pn, int pageSize);

    /**
     * * 适合Ext Grid分页处理的方法
     *
     * @param entityClass (VO类)
     * @param dto         (需要start 和 limit) (不需要可为null)
     * @param conditions  分页（不需要可为null)
     * @param orders      排序（不需要可为null)
     * @param <T>
     * @return
     */
    public <T extends AbstractModel> List<T> listAll(Class<T> entityClass, Dto dto, ConditionQuery conditions, OrderBy orders);

    public <T extends AbstractModel> Page<T> listPage(Class<T> entityClass, Dto dto, ConditionQuery conditions, OrderBy orders);

    /**
     * 根据sql查询字段总数
     *
     * @param afterSql (从from后面开始算的的sql语句)
     * @return
     */
    public int countBySql(String afterSql);

    /**
     * 根据sql查询字段总数
     *
     * @param columns  查询的字段,用","号隔开(主要是解决返回大写字段的问题)
     * @param afterSql (从from后面开始算的的sql语句)
     * @param pDto     分页查询(为null时不分页)
     * @return
     */
    public List listAllBySql(String columns, String afterSql, Dto pDto);

    /**
     * 根据hql查询数据
     *
     * @param <T>
     * @return
     */
    public <T extends AbstractModel> List<T> listAllByHql(String Hql);

    /**
     * 根据hql和参数查询数据
     *
     * @param Hql         传入的hql使用参数占位符:param的方式
     * @param queryParams 参数MAP,参数占位符为Key,参数值为value
     * @param <T>
     * @return
     * @author 罗春吉
     */
    public <T extends AbstractModel> List<T> listAllByHql(String Hql, Map<String, Object> queryParams);

    /**
     * 根据hql更新数据
     *
     * @param Hql
     * @return
     */
    public void updateByHql(String Hql);

    /**
     * 根据sql更新数据
     *
     * @param Sql
     * @return
     */
    public void updateBySql(String Sql);

    /**
     * 根据hql更新数据
     *
     * @param Hql    传入的hql使用参数占位符:param的方式
     * @param params 参数MAP,参数占位符为Key,参数值为value
     * @author 罗春吉
     */
    public void updateByHql(String Hql, Map<String, Object> params);

    public void createBySql(String sql);


    public List queryByRealSql(String Hql, Dto pDto);


    public Page listPageBySql(String columns, String afterSql, Dto pDto);

    public <PK extends Serializable> Dto getBySql(String colums, String afterSql) throws Exception;

    /**
     * 保存一条记录，自动将Dto转换成VO
     */
    public <T extends AbstractModel> T save(Class<T> entityClass, Dto pDto) throws Exception;

    /**
     * 保存或更新一条记录，自动将Dto转换成VO
     */
    public <T extends AbstractModel> void saveOrUpdate(Class<T> entityClass, Dto pDto) throws Exception;

    /**
     * 更新一条记录，自动将Dto转换成VO
     */
    public <T extends AbstractModel> void update(Class<T> entityClass, Dto pDto) throws Exception;

    /**
     * 删除一条记录，自动将Dto转换成VO
     */
    public <T extends AbstractModel> void deleteObject(Class<T> entityClass, Dto pDto) throws Exception;


    /**---------------------------Ibatis--------------------------*/


    /**
     * 插入一条记录
     *
     * @param parameterObject 要插入的对象(map javaBean)
     */
    public void insert(String statementName, Object parameterObject);

    /**
     * 插入一条记录
     */
    public void insert(String statementName);

    /**
     * 查询一条记录
     *
     * @param parameterObject 查询条件对象(map javaBean)
     */
    public Object queryForObject(String statementName, Object parameterObject);

    /**
     * 查询一条记录
     */
    public Object queryForObject(String statementName);

    /**
     * 查询记录集合
     *
     * @param parameterObject 查询条件对象(map javaBean)
     */
    public List queryForList(String statementName, Object parameterObject);

    /**
     * 查询记录集合
     */
    public List queryForList(String statementName);

    /**
     * 按分页查询
     * <p/>
     * 查询条件对象(map javaBean)
     */
    public List queryForPage(String statementName, Dto qDto) throws SQLException;

    /**
     * 更新记录
     *
     * @param parameterObject 更新对象(map javaBean)
     */
    public int update(String statementName, Object parameterObject);

    /**
     * 更新记录
     */
    public int update(String statementName);

    /**
     * 删除记录
     *
     * @param parameterObject 更新对象(map javaBean)
     */
    public int delete(String statementName, Object parameterObject);

    /**
     * 删除记录
     */
    public int delete(String statementName);

    /**
     * 调用存储过程<br>
     * 存储过程成功返回标志缺省：appCode=1
     *
     * @param prcName 存储过程ID号
     * @throws org.nxstudio.modules.exception.PrcException 存储过程调用异常
     */
    public void callPrc(String prcName, Dto prcDto) throws PrcException;

    /**
     * 调用存储过程<br>
     * 存储过程成功返回标志自定义：appCode=successFlag(自定义的传入变量)
     *
     * @param prcName 存储过程ID号
     * @param prcName 存储过程调用成功返回的成功代码值
     * @throws PrcException 存储过程调用异常
     */
    public void callPrc(String prcName, Dto prcDto, String successFlag) throws PrcException;

    /**
     * 获取Connection对象<br>
     * 说明：虽然向Dao消费端暴露了获取Connection对象的方法但不建议直接获取Connection对象进行JDBC操作
     *
     * @return 返回Connection对象
     * @throws java.sql.SQLException
     */
    public Connection getConnection() throws SQLException;

    /**
     * 获取DataSource对象<br>
     * 说明：虽然向Dao消费端暴露了获取DataSource对象的方法但不建议直接获取DataSource对象进行JDBC操作
     *
     * @return 返回DataSource对象
     * @throws java.sql.SQLException
     */
    public DataSource getDataSourceFromSqlMap() throws SQLException;


    public <T extends AbstractModel> List<T> listBySqlToBean(String sql, Object bean);

    /**
     * 查询结果转成bean
     *
     * @param sql
     * @param queryParams
     * @param bean
     * @param <T>
     * @return
     * @author 罗春吉
     */
    public <T extends AbstractModel> List<T> listBySqlToBean(String sql, Map<String, Object> queryParams, Object bean);


}
