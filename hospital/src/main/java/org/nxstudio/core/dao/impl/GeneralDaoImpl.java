package org.nxstudio.core.dao.impl;

import com.ibatis.sqlmap.client.SqlMapClient;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.hibernate.*;
import org.hibernate.criterion.Projections;
import org.hibernate.transform.Transformers;
import org.nxstudio.core.constant.Constants;
import org.nxstudio.core.dao.base.GeneralDao;
import org.nxstudio.core.model.AbstractModel;
import org.nxstudio.core.model.Dto;
import org.nxstudio.core.model.impl.BaseDto;
import org.nxstudio.modules.exception.G4Exception;
import org.nxstudio.modules.exception.PrcException;
import org.nxstudio.plugin.pagination.Page;
import org.nxstudio.plugin.pagination.PageUtil;
import org.nxstudio.util.ConvertDtoToEntity;
import org.nxstudio.util.dao.ConditionQuery;
import org.nxstudio.util.dao.OrderBy;
import org.nxstudio.util.g4.G4Constants;
import org.nxstudio.util.g4.G4Utils;
import org.nxstudio.util.idgenerator.annotation.CommonIDGenerator;
import org.nxstudio.util.properties.PropertiesFactory;
import org.nxstudio.util.properties.PropertiesFile;
import org.nxstudio.util.properties.PropertiesHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.orm.ibatis.SqlMapClientTemplate;
import org.springframework.orm.ibatis.support.SqlMapClientDaoSupport;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.io.Serializable;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

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
@Component("generalDao")
public class GeneralDaoImpl extends SqlMapClientDaoSupport implements GeneralDao {


    protected final Log log = LogFactory.getLog(GeneralDaoImpl.class);
    //是否是开放式session
    private boolean isOpenSession = false;
    //当前打开的session
    private Session session = null;
    //线程绑定
    private final ThreadLocal thread = new ThreadLocal();

    @Autowired
    @Qualifier("sessionFactory")
    private SessionFactory sessionFactory;

    //    @Autowired
//    @Qualifier("sqlMapClientG4")
//    private SqlMapClient sqlMapClient1;
//    @PostConstruct
//    public void initSqlMapClient(){
//        super.setSqlMapClient(sqlMapClient1);
//    }
    @Autowired
    @Qualifier("sqlMapClientG4")
    public void setSqlMapClientForAutowired(SqlMapClient sqlMapClient) {
        super.setSqlMapClient(sqlMapClient);
    }

    //@Override
    public <T extends AbstractModel> T save(T model) {
        Field[] fields = model.getClass().getDeclaredFields();
        //获取字段中包含fieldMeta的注解
        for (Field f : fields) {
            CommonIDGenerator meta = f.getAnnotation(CommonIDGenerator.class);
            if (meta != null) {
                Long id = Long.parseLong((String) getSqlMapClientTemplate().queryForObject("IdGenerator.getIdSequenceByKey", new BaseDto("key", meta.name())));
                try {
                    model.getClass().getMethod(meta.setIDMethoName(), meta.fieldClass()).invoke(model, id);
                } catch (IllegalAccessException e) {
                    e.printStackTrace();
                } catch (InvocationTargetException e) {
                    e.printStackTrace();
                } catch (NoSuchMethodException e) {
                    e.printStackTrace();
                }
            }
        }

        getSession().save(model);
        closeSession();
        return model;
    }

    //@Override
    public <T extends AbstractModel> void saveOrUpdate(T model) {
        getSession().saveOrUpdate(model);
        closeSession();
    }

    //@Override
    public <T extends AbstractModel> void update(T model) {
        getSession().update(model);
        closeSession();
    }

    //@Override
    public <T extends AbstractModel> void merge(T model) {
        getSession().merge(model);
        closeSession();
    }

    //@Override
    public <T extends AbstractModel, PK extends Serializable> void delete(Class<T> entityClass, PK id) {
        getSession().delete(get(entityClass, id));
        closeSession();
    }

    //@Override
    public <T extends AbstractModel> void deleteObject(T model) {
        getSession().delete(model);
        closeSession();
    }

    //@Override
    public <T extends AbstractModel, PK extends Serializable> T get(Class<T> entityClass, PK id) {
        T entity = (T) getSession().get(entityClass, id);
        closeSession();
        return entity;

    }

    //@Override
    public <T extends AbstractModel> int countAll(Class<T> entityClass) {
        Criteria criteria = getSession().createCriteria(entityClass);
        criteria.setProjection(Projections.rowCount());
        int count = ((Long) criteria.uniqueResult()).intValue();
        closeSession();
        return count;
    }

    //@Override
    public <T extends AbstractModel> int countAll(Class<T> entityClass, ConditionQuery conditions) {
        Criteria criteria = getSession().createCriteria(entityClass);
        criteria.setProjection(Projections.rowCount());
        conditions.build(criteria);
        int count = ((Long) criteria.uniqueResult()).intValue();
        closeSession();
        return count;
    }

    //@Override
    //    @SuppressWarnings("unchecked")
    public <T extends AbstractModel> List<T> listAll(Class<T> entityClass) {
        Criteria criteria = getSession().createCriteria(entityClass);
        List<T> list = criteria.list();
        closeSession();
        return list;
    }

    //@Override
    public <T extends AbstractModel> List<T> listAll(Class<T> entityClass, int pn) {
        List<T> list = listAll(entityClass, pn, Constants.DEFAULT_PAGE_SIZE);
        closeSession();
        return list;
    }

    //@Override
    //    @SuppressWarnings("unchecked")
    public <T extends AbstractModel> List<T> listAll(Class<T> entityClass, int pn, int pageSize) {
        Criteria criteria = getSession().createCriteria(entityClass);
        criteria.setFirstResult(PageUtil.getPageStart(pn, pageSize));
        List<T> list = criteria.list();
        closeSession();
        return list;

    }

    /**
     * 适合Ext Grid分页处理的方法
     */
//@Override
    public <T extends AbstractModel> List<T> listAll(Class<T> entityClass, Dto dto, ConditionQuery conditions, OrderBy orders) {
        Criteria criteria = getSession().createCriteria(entityClass);

        //分页设置
        if (dto != null) {
            try {
                criteria.setFirstResult(dto.getAsInteger("start"));
                criteria.setMaxResults(dto.getAsInteger("limit"));
            } catch (NumberFormatException e) {
                System.err.println("-----分页查询时Dto里面start或者limit转换成int类型出错啦-----");
                e.printStackTrace();
                System.err.println("-----分页查询时Dto里面start或者limit转换成int类型出错啦-----");
            }
        }

        //添加排序
        if (orders != null) {
            orders.build(criteria);
        }

        //条件查询
        if (conditions != null) {
            conditions.build(criteria);
        }

        List<T> list = criteria.list();
        closeSession();
        return list;
    }

    /**
     * 根据sql查询字段总数
     */
//@Override
    public int countBySql(String afterSql) {
        SQLQuery sqlQuery = getSession().createSQLQuery("select count(*) " + afterSql);
        int count = Integer.parseInt(sqlQuery.list().get(0).toString());
        closeSession();
        return count;
    }

    /**
     * 根据sql查询
     */
//@Override
    public List listAllBySql(String columns, String afterSql, Dto pDto) {
        String beforeSql = "select ";
        //去除返回大写列名
        String[] temsStrings = columns.split(",");
        Pattern pattern = Pattern.compile(" as ");
        for (String str : temsStrings) {
            Matcher matcher = pattern.matcher(str);
            if (!matcher.find()) {
                beforeSql += str + " as \"" + str + "\",";
            } else {
                beforeSql += str + ",";
            }
        }
        if (temsStrings.length > 0) {
            beforeSql = beforeSql.substring(0, beforeSql.length() - 1);
        }

        //重组sql
        SQLQuery sqlQuery = getSession().createSQLQuery(beforeSql + " " + afterSql);
        sqlQuery.setResultTransformer(Transformers.ALIAS_TO_ENTITY_MAP);

        //分页
        if (pDto != null) {
            sqlQuery.setFirstResult(pDto.getAsInteger("start"));
            sqlQuery.setMaxResults(pDto.getAsInteger("limit"));
        }

        List list = sqlQuery.list();
        closeSession();
        return list;
    }

    //@Override
    public <T extends AbstractModel> List<T> listAllByHql(String Hql) {
        Query query = getSession().createQuery(Hql);
        List<T> list = query.list();
        closeSession();
        return list;
    }

    //@Override
    public <T extends AbstractModel> List<T> listAllByHql(String Hql, Map<String, Object> queryParams) {
        Query query = getSession().createQuery(Hql);
        for (String param : queryParams.keySet()) {
            query.setParameter(param, queryParams.get(param));
        }
        List<T> list = query.list();
        closeSession();
        return list;
    }

    //@Override
    public void updateByHql(String Hql) {
        Query query = getSession().createQuery(Hql);
        query.executeUpdate();
        closeSession();
    }

    //@Override
    public void updateBySql(String Sql) {
        SQLQuery query = getSession().createSQLQuery(Sql);
        query.executeUpdate();
        closeSession();
    }

    //@Override
    public void updateByHql(String Hql, Map<String, Object> params) {
        Query query = getSession().createQuery(Hql);
        for (String param : params.keySet()) {
            query.setParameter(param, params.get(param));
        }
        query.executeUpdate();
        closeSession();
    }


    //@Override
    public void createBySql(String sql) {
        Query query = getSession().createSQLQuery(sql);
        query.executeUpdate();
        closeSession();
    }

    //@Override
    public List<Dto> queryByRealSql(String Hql, Dto pDto) {
        SQLQuery sqlQuery = getSession().createSQLQuery(Hql);
        sqlQuery.setResultTransformer(Transformers.ALIAS_TO_ENTITY_MAP);
        //分页
        if (pDto != null) {
            sqlQuery.setFirstResult(pDto.getAsInteger("start"));
            sqlQuery.setMaxResults(pDto.getAsInteger("limit"));
        }
        List<Dto> list = sqlQuery.list();
        closeSession();
        return list;
    }

    //@Override
    public Page listPageBySql(String columns, String afterSql, Dto pDto) {
        if (pDto != null) {
            int total = countBySql(afterSql);
            List items = listAllBySql(columns, afterSql, pDto);
            return PageUtil.getPage(total, items);
        } else {
            List items = listAllBySql(columns, afterSql, pDto);
            return PageUtil.getPage(items.size(), items);
        }

    }

    /**
     * 根据sql查询一条记录，多条和0条返回null
     */
//@Override
    public <PK extends Serializable> Dto getBySql(String colums, String afterSql) throws Exception {
        Page page = listPageBySql(colums, afterSql, null);
        //唯一一条时返回数据
        if (page.getContext().getTotal() == 1) {
            Dto tmpDto = new BaseDto();
            Map map = (Map) (page.getItems().get(0));
            tmpDto.putAll(map);
            return tmpDto;
        } else {
            return null;
        }
    }

    /**
     * 适合Ext Grid分页处理的方法
     */
//@Override
    public <T extends AbstractModel> Page<T> listPage(Class<T> entityClass, Dto dto, ConditionQuery conditions, OrderBy orders) {
        int total = countAll(entityClass, conditions);
        List<T> items = listAll(entityClass, dto, conditions, orders);
        return PageUtil.getPage(total, items);
    }

    /**
     * 保存一条记录，自动将Dto转换成VO
     */
//@Override
    public <T extends AbstractModel> T save(Class<T> entityClass, Dto pDto) throws Exception {
        T obj = (T) ConvertDtoToEntity.Convert(entityClass, pDto);
        return save(obj);
    }

    /**
     * 保存或更新一条记录，自动将Dto转换成VO
     */
//@Override
    public <T extends AbstractModel> void saveOrUpdate(Class<T> entityClass, Dto pDto) throws Exception {
        T obj = (T) ConvertDtoToEntity.Convert(entityClass, pDto);
        saveOrUpdate(obj);
    }

    /**
     * 更新一条记录，自动将Dto转换成VO
     */
//@Override
    public <T extends AbstractModel> void update(Class<T> entityClass, Dto pDto) throws Exception {
        T obj = (T) ConvertDtoToEntity.Convert(entityClass, pDto);
        update(obj);
    }

    /**
     * 删除一条记录，自动将Dto转换成VO
     */
//@Override
    public <T extends AbstractModel> void deleteObject(Class<T> entityClass, Dto pDto) throws Exception {
        T obj = (T) ConvertDtoToEntity.Convert(entityClass, pDto);
        deleteObject(obj);
    }

    /**
     * 插入一条记录
     *
     * @param statementName
     * @param parameterObject 要插入的对象(map javaBean)
     */
    public void insert(String statementName, Object parameterObject) {
        getSqlMapClientTemplate().insert(statementName, parameterObject);
    }

    /**
     * 插入一条记录
     *
     * @param statementName
     */
//@Override
    public void insert(String statementName) {
        getSqlMapClientTemplate().insert(statementName, new BaseDto());
    }

    /**
     * 查询一条记录
     *
     * @param statementName
     * @param parameterObject 查询条件对象(map javaBean)
     */
//@Override
    public Object queryForObject(String statementName, Object parameterObject) {
        return getSqlMapClientTemplate().queryForObject(statementName, parameterObject);
    }

    /**
     * 查询一条记录
     *
     * @param statementName
     */
//@Override
    public Object queryForObject(String statementName) {
        return getSqlMapClientTemplate().queryForObject(statementName, new BaseDto());
    }

    /**
     * 查询记录集合
     *
     * @param statementName
     * @param parameterObject 查询条件对象(map javaBean)
     */
//@Override
    public List queryForList(String statementName, Object parameterObject) {
        return getSqlMapClientTemplate().queryForList(statementName, parameterObject);
    }

    /**
     * 查询记录集合
     *
     * @param statementName
     */
//@Override
    public List queryForList(String statementName) {
        return getSqlMapClientTemplate().queryForList(statementName, new BaseDto());
    }

    /**
     * 按分页查询
     *
     * @param statementName
     * @param qDto          查询条件对象(map javaBean)
     * @throws java.sql.SQLException
     */
//@Override
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
     * 更新记录
     *
     * @param statementName
     * @param parameterObject 更新对象(map javaBean)
     */
//@Override
    public int update(String statementName, Object parameterObject) {
        return getSqlMapClientTemplate().update(statementName, parameterObject);
    }

    /**
     * 更新记录
     *
     * @param statementName
     */
//@Override
    public int update(String statementName) {
        return getSqlMapClientTemplate().update(statementName, new BaseDto());
    }

    /**
     * 删除记录
     *
     * @param statementName
     * @param parameterObject 更新对象(map javaBean)
     */
//@Override
    public int delete(String statementName, Object parameterObject) {
        return getSqlMapClientTemplate().delete(statementName, parameterObject);
    }

    /**
     * 删除记录
     *
     * @param statementName
     */
//@Override
    public int delete(String statementName) {
        return getSqlMapClientTemplate().delete(statementName, new BaseDto());
    }

    /**
     * 调用存储过程<br>
     * 存储过程成功返回标志缺省：appCode=1
     *
     * @param prcName 存储过程ID号
     * @param prcDto  参数对象(入参、出参)
     * @throws org.nxstudio.modules.exception.PrcException 存储过程调用异常
     */
//@Override
    public void callPrc(String prcName, Dto prcDto) throws PrcException {
        PropertiesHelper pHelper = PropertiesFactory.getPropertiesHelper(PropertiesFile.G4);
        String callPrcSuccessFlag = pHelper.getValue("callPrcSuccessFlag", "1");
        //getSqlMapClientTemplate().queryForObject(prcName, prcDto);
        getSqlMapClientTemplate().insert(prcName, prcDto);
        if (G4Utils.isEmpty(prcDto.getAsString("appCode"))) {
            throw new PrcException(prcName, "存储过程没有返回状态码appCode");
        } else {
            if (!prcDto.getAsString("appCode").equals(callPrcSuccessFlag)) {
                throw new PrcException(prcName, prcDto.getAsString("appCode"), prcDto.getAsString("errorMsg"));
            }
        }
    }

    /**
     * 调用存储过程<br>
     * 存储过程成功返回标志自定义：appCode=successFlag(自定义的传入变量)
     *
     * @param prcName 存储过程ID号
     * @param prcName 存储过程调用成功返回的成功代码值
     * @throws PrcException 存储过程调用异常
     */
//@Override
    public void callPrc(String prcName, Dto prcDto, String successFlag) throws PrcException {
        //getSqlMapClientTemplate().queryForObject(prcName, prcDto);
        getSqlMapClientTemplate().insert(prcName, prcDto);
        if (G4Utils.isEmpty(prcDto.getAsString("appCode"))) {
            throw new PrcException(prcName, "存储过程没有返回状态码appCode");
        } else {
            if (!prcDto.getAsString("appCode").equals(successFlag)) {
                throw new PrcException(prcName, prcDto.getAsString("appCode"), prcDto.getAsString("errorMsg"));
            }
        }
    }

    /**
     * 获取Connection对象<br>
     * 说明：虽然向Dao消费端暴露了获取Connection对象的方法但不建议直接获取Connection对象进行JDBC操作
     *
     * @return 返回Connection对象
     * @throws java.sql.SQLException
     */
//@Override
    public Connection getConnection() throws SQLException {
        return getSqlMapClientTemplate().getDataSource().getConnection();
    }

    /**
     * 获取DataSource对象<br>
     * 说明：虽然向Dao消费端暴露了获取DataSource对象的方法但不建议直接获取DataSource对象进行JDBC操作
     *
     * @return 返回DataSource对象
     */
//@Override
    public DataSource getDataSourceFromSqlMap() throws SQLException {
        return getSqlMapClientTemplate().getDataSource();
    }

    /**
     * 获取SqlMapClientTemplate对象<br>
     *
     * @return 返回SqlMapClientTemplate对象
     */

    //获取session
    public Session getSession() {
        try {
            //主线程使用
            isOpenSession = false;
            session = sessionFactory.getCurrentSession();
        } catch (HibernateException e) {
            //多线程使用
            isOpenSession = true;
            session = (Session) thread.get();
            if (session == null) {
                session = sessionFactory.openSession();
                thread.set(session);
            }
        }

        return session;
    }

    public boolean getIsOpenSession() {
        return this.isOpenSession;
    }

    //同步关闭session(针对多线程)
    private synchronized void closeSession() {
        if (isOpenSession && session != null) {
            session.flush();
            session = null;
        }
    }


    //@Override
    public <T extends AbstractModel> List<T> listBySqlToBean(String sql, Object bean) {
        Query query = getSession().createSQLQuery(sql).addEntity(bean.getClass());
        List<T> list = query.list();
        closeSession();
        return list;
    }

    //@Override
    public <T extends AbstractModel> List<T> listBySqlToBean(String sql, Map<String, Object> queryParams, Object bean) {
        Query query = getSession().createSQLQuery(sql).addEntity(bean.getClass());
        for (String param : queryParams.keySet()) {
            query.setParameter(param, queryParams.get(param));
        }
        List<T> list = query.list();
        closeSession();
        return list;
    }

}
