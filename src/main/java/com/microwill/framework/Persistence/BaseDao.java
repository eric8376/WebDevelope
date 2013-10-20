package com.microwill.framework.Persistence;

import java.io.Serializable;
import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.math.BigInteger;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.hibernate.Criteria;
import org.hibernate.LockMode;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Projections;
import org.hibernate.transform.Transformers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate3.HibernateTemplate;
import org.springframework.orm.hibernate3.SessionFactoryUtils;
import org.springframework.util.Assert;

import com.microwill.framework.vo.Page;

/**
 * DAO基类，其它DAO可以直接继承这个DAO，复用共用的方法
 */
public class BaseDao<T>{
	protected Log log = LogFactory.getLog(this.getClass());
	private Class<T> entityClass;
	@Autowired
	private HibernateTemplate hibernateTemplate;
	/**
	 * 通过反射获取子类确定的泛型类
	 */
	@SuppressWarnings("unchecked")
	public BaseDao() {
		Type genType = getClass().getGenericSuperclass();
		Type[] params = ((ParameterizedType) genType).getActualTypeArguments();
		entityClass = (Class<T>) params[0];
	}

	/**
	 * 根据ID加载PO实例
	 * 
	 * @param id
	 * @return 返回相应的持久化PO实例
	 */
	public T load(Serializable id) {
		return (T) getHibernateTemplate().load(entityClass, id);
	}

	public T loadWithLock(Serializable id)throws Exception{
		T t = getHibernateTemplate().load(entityClass, id, LockMode.PESSIMISTIC_WRITE);
		if(t != null) {
			flush();
		}
		return t;
	}
	
	
	public void flush()
	{
		getHibernateTemplate().flush();
	}
	
	public void lock(T entity)
    {
        getHibernateTemplate().lock(entity, LockMode.PESSIMISTIC_WRITE);
    }

	/**
	 * 根据ID获取PO实例
	 * 
	 * @param id
	 * @return 返回相应的持久化PO实例
	 */
	public T get(Serializable id) {
		return (T) getHibernateTemplate().get(entityClass, id);
	}
	
	public T getWithLock(Serializable id)
	{
		T t = getHibernateTemplate().get(entityClass, id, LockMode.PESSIMISTIC_WRITE);
		if(t != null)
			flush();
		return t;
	}

	/**
	 * 获取PO的所有对象
	 * 
	 * @return
	 */
	public List<T> loadAll() {
		return getHibernateTemplate().loadAll(entityClass);
	}

	/**
	 * 保存PO
	 * 
	 * @param entity
	 */
	public Serializable insert(T entity) {
		return getHibernateTemplate().save(entity);
	}
	
	/**
	 * 批量新增
	 * <pre>
	 * @功能说明:
	 * ...................
	 * @版本更新列表
	 * 修改版本: 1.0.0
	 * 修改日期: 2013年8月23日
	 * 修  改  人: zhangwei
	 * 修改说明: 形成初始版本
	 * 复  审  人:
	 * </pre>
	 * @date 2013年8月23日
	 * @param entitys
	 */
	public void batchSaveOrUpdate(List<T> entitys) {
		getHibernateTemplate().saveOrUpdateAll(entitys);
	}
	
	/**
	 * 批量删除
	 * <pre>
	 * @功能说明:
	 * ...................
	 * @版本更新列表
	 * 修改版本: 1.0.0
	 * 修改日期: 2013年8月23日
	 * 修  改  人: zhangwei
	 * 修改说明: 形成初始版本
	 * 复  审  人:
	 * </pre>
	 * @date 2013年8月23日
	 * @param entitys
	 */
	public void batchDelete(List<T> entitys) {
		getHibernateTemplate().deleteAll(entitys);
	}

	/**
	 * 删除PO
	 * 
	 * @param entity
	 */
	public void remove(T entity) {
		getHibernateTemplate().delete(entity);
	}

	/**
	 * 更改PO
	 * 
	 * @param entity
	 */
	public void update(T entity) {
		getHibernateTemplate().merge(entity);//由于Hibernate Session与线程不绑定，有可能会遇到org.springframework.orm.hibernate3.HibernateSystemException: Illegal attempt to associate a collection with two open sessions
	}

	/**
	 * 按条件更新实体类(多查询条件暂时只支持and)
	 */
	public int update(Map<String,String> updateValue,Map<String,String> conditionValue){		
		StringBuffer hqlBuf = new StringBuffer();
		hqlBuf.append("update "+this.entityClass.getSimpleName() +" set ");
		String updateSql = ""; 
		Set<String> keys = updateValue.keySet();
		for (Iterator<String> it = keys.iterator(); it.hasNext();) {
			String key = (String) it.next();
			String value = (String) updateValue.get(key);   
			updateSql+= key +"='"+value+"',";
		}
		updateSql = updateSql.substring(0, updateSql.length()-1);
		hqlBuf.append(updateSql);
		String conditionSql ="";
		keys = conditionValue.keySet();
		for (Iterator<String> it = keys.iterator(); it.hasNext();) {
			String key = (String) it.next();
			String value = (String) conditionValue.get(key);   
			conditionSql+= key +"='"+value+"' and ";
		}
		conditionSql = conditionSql.substring(0, conditionSql.length()-5);      
		if(null!=conditionSql && conditionSql.length()>0){
			hqlBuf.append(" where ");
			hqlBuf.append(conditionSql);
		}
		return getSession().createQuery(hqlBuf.toString()).executeUpdate();		
	}

	/**
	 * 执行hql(支持参数使用占位符?)
	 * <pre>
	 * @功能说明:
	 *  
	 * @版本更新列表
	 * 修改版本: 1.0.0
	 * 修改日期: 2013年9月25日
	 * 修  改  人: zcguo
	 * 修改说明: 形成初始版本
	 * 复  审  人:
	 * </pre>
	 * @date 2013年9月25日
	 * @param hql
	 * @param params	参数值数组
	 * @return
	 */
	public int execute(String hql, Object... params) {
		Query query = this.createQuery(hql, params);
		return query.executeUpdate();
	}

	/**
	 * 按条件删除实体类(多查询条件暂时只支持and)
	 * @param conditionValue
	 * @return
	 */
	public int delete(Map<String, String> conditionValue){
		StringBuffer hqlBuf = new StringBuffer();
		hqlBuf.append("delete "+this.entityClass.getSimpleName() +" ");	       
		String conditionSql ="";
		Set<String> keys = conditionValue.keySet();
		for (Iterator<String> it = keys.iterator(); it.hasNext();) {
			String key = (String) it.next();
			String value = (String) conditionValue.get(key);   
			conditionSql+= key +"='"+value+"' and ";
		}
		conditionSql = conditionSql.substring(0, conditionSql.length()-5);      
		if(null!=conditionSql && conditionSql.length()>0){
			hqlBuf.append(" where ");
			hqlBuf.append(conditionSql);
		}
		return getSession().createQuery(hqlBuf.toString()).executeUpdate();	
	}

	/**
	 * 执行HQL查询
	 * @param sql
	 * @return 查询结果
	 */
	@SuppressWarnings("unchecked")
	public List<T> find(String hql) {
		return this.getHibernateTemplate().find(hql);
	}

	/**
	 * 执行带参的HQL查询
	 * 
	 * @param sql
	 * @param params
	 * @return 查询结果
	 */
	@SuppressWarnings("unchecked")
	public List<T> find(String hql, Object... params) {
		return this.getHibernateTemplate().find(hql,params);
	}
	
	/**
	 * 执行带命名参数的HQL查询
	 * 
	 * @param sql
	 * @param params
	 * @return 查询结果
	 */
	@SuppressWarnings("unchecked")
	public List<T> findByNamedParam(String hql,String[] paramNames,Object... params) {
		return this.getHibernateTemplate().findByNamedParam(hql, paramNames, params);
	}
	
	/**
	 * 执行带参数的SQL查询
	 * @param sql
	 * @param params
	 * @return
	 */
	public List<Map<String,Object>> findMapListBySql(String sql, Object... params){
		Session session = this.getSession();
		SQLQuery query  = session.createSQLQuery(sql);		
		query.setResultTransformer(Transformers.ALIAS_TO_ENTITY_MAP);
		if(params!=null){
			for(int i = 0; i < params.length; i++) {
				query.setParameter(i, params[i]);
			}
		}
		return query.list();
	}
	
	/**
	 * 执行hql查询，返回Map的集合
	 * <pre>
	 * @功能说明:
	 * 执行hql查询，返回Map的集合
	 * @版本更新列表
	 * 修改版本: 1.0.0
	 * 修改日期: 2013年8月21日
	 * 修  改  人: zcguo
	 * 修改说明: 形成初始版本
	 * 复  审  人:
	 * </pre>
	 * @date 2013年8月21日
	 * @param hql
	 * @param params
	 * @return Map的集合
	 */
	@SuppressWarnings("unchecked")
	public List<Map<String,Object>> findMapList(String hql, Object... params){
		Query query  = this.createQuery(hql, params);
		query.setResultTransformer(Transformers.ALIAS_TO_ENTITY_MAP);
		return query.list();
	}

	/**
	 * 执行带参数HQL查询一个对象
	 * @param hql
	 * @param params
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public T findEntity(String hql, Object... params){
		List<T> list =this.getHibernateTemplate().find(hql,params);
		if(list!=null && list.size()>0){
			return list.get(0);
		}
		return null;
	}
	
	/**
	 * 执行带参数SQL查询一个对象
	 * @param sql
	 * @param params
	 * @return
	 */
	public Map<String,Object> findMapBySql(String sql, Object... params){
		Session session = this.getSession();
		SQLQuery query  = session.createSQLQuery(sql);		
		query.setResultTransformer(Transformers.ALIAS_TO_ENTITY_MAP);
		if(params!=null){
			for(int i = 0; i < params.length; i++) {
				query.setParameter(i, params[i]);
			}
		}
		List<Map<String,Object>> list = query.list();
		if(list!=null && list.size()>0){
			return list.get(0);
		}
		return null;
	}
	
	/**
	 * 执行hql查询，返回Map
	 * <pre>
	 * @功能说明:
	 * 执行hql查询，返回Map
	 * @版本更新列表
	 * 修改版本: 1.0.0
	 * 修改日期: 2013年8月21日
	 * 修  改  人: zcguo
	 * 修改说明: 形成初始版本
	 * 复  审  人:
	 * </pre>
	 * @date 2013年8月21日
	 * @param hql
	 * @param params
	 * @return Map对象
	 */
	@SuppressWarnings("unchecked")
	public Map<String,Object> findMap(String hql, Object... params){
		Query query  = this.createQuery(hql, params);
		query.setResultTransformer(Transformers.ALIAS_TO_ENTITY_MAP);
		List<Map<String,Object>> list = query.list();
		if(list!=null && list.size()>0){
			return list.get(0);
		}
		return null;
	}

	/**
	 * 对延迟加载的实体PO执行初始化
	 * @param entity
	 */
	public void initialize(Object entity) {
		this.getHibernateTemplate().initialize(entity);
	}


	/**
	 * 查询更多
	 * 用于类似微博那种滚动查询更多功能
	 * @param hql
	 * @param params
	 * @param start
	 * @param size
	 * @return
	 */
	public List<?> searchMore(String hql, Object[] params, int start, int size) {
		Session session = this.getSession();
		Query query = session.createQuery(hql);
		for(int i = 0; i < params.length; i++) {
			query.setParameter(i, params[i]);
		}
		query.setFirstResult(start);
		query.setMaxResults(size);
		return query.list();
	}

	/**
	 * 查询更多
	 * 使用原生sql方式查询，返回List<Map>格式
	 * hibernate用SQL方式查询存在主键读取问题
	 * @param sql
	 * @param params
	 * @param start
	 * @param size
	 * @return
	 */
	@Deprecated
	public List<?> searchMoreBySql(String sql, Object[] params, int start, int size) {		
		Session session = this.getSession();
		SQLQuery query  = session.createSQLQuery(sql);		
		query.setResultTransformer(Transformers.ALIAS_TO_ENTITY_MAP);
		for(int i = 0; i < params.length; i++) {
			query.setParameter(i, params[i]);
		}
		query.setFirstResult(start);
		query.setMaxResults(size);
		return query.list();
	}

	/**
	 * 分页查询函数，使用hql.
	 *
	 * @param pageNo 页号,从1开始.
	 */
	@SuppressWarnings("unchecked")
	public Page<T> pagedQuery(String hql, int pageNo, int pageSize, Object... values) {
		Assert.hasText(hql);
		Assert.isTrue(pageNo >= 1, "pageNo should start from 1");
		// Count查询
		String countQueryString = " select count (*) " + removeSelect(removeOrders(hql));
		List<T> countlist = getHibernateTemplate().find(countQueryString, values);
		long totalCount = (Long) countlist.get(0);

		if (totalCount < 1)
			return new Page<T>();
		// 实际查询返回分页对象
		int startIndex = Page.getStartOfPage(pageNo, pageSize);
		Query query = createQuery(hql, values);
		List<T> list = query.setFirstResult(startIndex).setMaxResults(pageSize).list();

		Page<T> result = new Page<T>(startIndex, totalCount, pageSize, list);
		return result;
	}
	
	/**
	 * 分页查询函数，使用hql.
	 *
	 * @param pageNo 页号,从1开始.
	 */
	@SuppressWarnings("unchecked")
	public Page<T> pagedQuery(String hql,String countQueryString, int pageNo, int pageSize, Object... values) {
		Assert.hasText(hql);
		Assert.isTrue(pageNo >= 1, "pageNo should start from 1");
		// Count查询
		if(StringUtils.isEmpty(countQueryString)){
			countQueryString = " select count (*) " + removeSelect(removeOrders(hql));
		}
		List<T> countlist = getHibernateTemplate().find(countQueryString, values);
		long totalCount = (Long) countlist.get(0);

		if (totalCount < 1)
			return new Page<T>();
		// 实际查询返回分页对象
		int startIndex = Page.getStartOfPage(pageNo, pageSize);
		Query query = createQuery(hql, values);
		List<T> list = query.setFirstResult(startIndex).setMaxResults(pageSize).list();

		Page<T> result = new Page<T>(startIndex, totalCount, pageSize, list);
		return result;
	}
	
	/**
	 * 分页查询函数，使用SQL
	 * @param sql
	 * @param countSql null=使用默认解析获取总数，不支持union情况
	 * @param pageNo
	 * @param pageSize
	 * @param params
	 * @return
	 */
	public Page<Map<String,Object>> pagedQueryWithMapBySql(String sql,String countSql,int pageNo, int pageSize, Object... params){
		Assert.hasText(sql);
		Assert.isTrue(pageNo >= 1, "pageNo should start from 1");
		// Count查询
		if(StringUtils.isEmpty(countSql)){
			countSql = " select count (*) " + removeSelect(removeOrders(sql));
		}
		Session session = this.getSession();
		SQLQuery query  = session.createSQLQuery(countSql);	
		if(params!=null){
			for(int i = 0; i < params.length; i++) {
				query.setParameter(i, params[i]);
			}
		}
		long totalCount = ((BigInteger)query.list().get(0)).longValue();
		if (totalCount < 1)
			return new Page<Map<String,Object>>();
		// 实际查询返回分页对象
		query  = session.createSQLQuery(sql);		
		query.setResultTransformer(Transformers.ALIAS_TO_ENTITY_MAP);
		if(params!=null){
			for(int i = 0; i < params.length; i++) {
				query.setParameter(i, params[i]);
			}
		}
		int startIndex = Page.getStartOfPage(pageNo, pageSize);
		List<Map<String,Object>> list = query.setFirstResult(startIndex).setMaxResults(pageSize).list();
		Page<Map<String,Object>> result = new Page<Map<String,Object>>(startIndex, totalCount, pageSize, list);
		return result;		
	}

	/**
	 * 分页查询函数，使用hql.返回map<String,Object>形式
	 *
	 * @param pageNo 页号,从1开始.
	 */
	@SuppressWarnings("unchecked")
	public Page<Map<String,Object>> pagedQueryWithMap(String hql,Object[] params,int pageNo, int pageSize ) {
		Assert.hasText(hql);
		Assert.isTrue(pageNo >= 1, "pageNo should start from 1");
		// Count查询
		String countQueryString = " select count (*) " + removeSelect(removeOrders(hql));
		List<Long> countlist = getHibernateTemplate().find(countQueryString, params);
		long totalCount = countlist.get(0);

		if (totalCount < 1)
			return new Page<Map<String,Object>>();
		// 实际查询返回分页对象
		int startIndex = Page.getStartOfPage(pageNo, pageSize);
		Query query = createQuery(hql, params);
		query.setResultTransformer(Transformers.ALIAS_TO_ENTITY_MAP);
		List<Map<String,Object>> list = query.setFirstResult(startIndex).setMaxResults(pageSize).list();

		Page<Map<String,Object>> result = new Page<Map<String,Object>>(startIndex, totalCount, pageSize, list);
		return result;
	}

	@SuppressWarnings("unchecked")
	public long count(String hql, Object... values)
	{
		String countQueryString = " select count (*) " + removeSelect(removeOrders(hql));
		List<T> countlist = getHibernateTemplate().find(countQueryString, values);
		long totalCount = (Long) countlist.get(0);
		return totalCount;
	}

	/**
	 * 分页查询
	 * @param cri 查询条件 
	 * @param pageNo 当前页码（从1开始）
	 * @param pageSize 每页记录条数
	 * @param orders 排序条件（可变参，可传可不传）
	 * @return 分页对象
	 * @throws Exception
	 */
	@SuppressWarnings("unchecked")
	protected Page<T> pagedQuery(Criteria cri,int pageNo, int pageSize, Order... orders) throws Exception{
		final int start = Page.getStartOfPage(pageNo, pageSize);
		Long total=(Long)cri.setProjection(Projections.rowCount()).uniqueResult(); 
		cri.setProjection(null); 
		cri.setFirstResult(start);
		cri.setMaxResults(pageSize);
		if(orders != null) {
			for (Order order : orders) {
				cri.addOrder(order);
			}
		}
		return new Page<T>(start, total.intValue(), pageSize, cri.list());
	}	

	/**
	 * 创建Query对象. 对于需要first,max,fetchsize,cache,cacheRegion等诸多设置的函数,可以在返回Query后自行设置.
	 * 留意可以连续设置,如下：
	 * <pre>
	 * dao.getQuery(hql).setMaxResult(100).setCacheable(true).list();
	 * </pre>
	 * 调用方式如下：
	 * <pre>
	 *        dao.createQuery(hql)
	 *        dao.createQuery(hql,arg0);
	 *        dao.createQuery(hql,arg0,arg1);
	 *        dao.createQuery(hql,new Object[arg0,arg1,arg2])
	 * </pre>
	 *
	 * @param values 可变参数.
	 */
	public Query createQuery(String hql, Object... values) {
		Assert.hasText(hql);
		Query query = getSession().createQuery(hql);
		if(values != null) {
			for (int i = 0; i < values.length; i++) {
				query.setParameter(i, values[i]);
			}
		}
		return query;
	}
	/**
	 * 去除hql的select 子句，未考虑union的情况,用于pagedQuery.
	 *
	 * @see #pagedQuery(String,int,int,Object[])
	 */
	private static String removeSelect(String hql) {
		Assert.hasText(hql);
		int beginPos = hql.toLowerCase().indexOf("from");
		Assert.isTrue(beginPos != -1, " hql : " + hql + " must has a keyword 'from'");
		return hql.substring(beginPos);
	}

	/**
	 * 去除hql的orderby 子句，用于pagedQuery.
	 *
	 * @see #pagedQuery(String,int,int,Object[])
	 */
	private static String removeOrders(String hql) {
		Assert.hasText(hql);
		Pattern p = Pattern.compile("order\\s*by[\\w|\\W|\\s|\\S]*", Pattern.CASE_INSENSITIVE);
		Matcher m = p.matcher(hql);
		StringBuffer sb = new StringBuffer();
		while (m.find()) {
			m.appendReplacement(sb, "");
		}
		m.appendTail(sb);
		return sb.toString();
	}

	public HibernateTemplate getHibernateTemplate() {
		return hibernateTemplate;
	}

	public void setHibernateTemplate(HibernateTemplate hibernateTemplate) {
		this.hibernateTemplate = hibernateTemplate;
	}
	public  Session getSession() {
		return SessionFactoryUtils.getSession(hibernateTemplate.getSessionFactory(),true);
	}

	/**
	 * 获得带Session的查询
	 * @return 查询的接口
	 */
	protected Criteria createCriteria() {
		return createDetachedCriteria().getExecutableCriteria(getSession());
	}

	/**
	 * 获得一个不带Session的查询
	 * @return 不带连接的查询接口
	 */
	protected DetachedCriteria createDetachedCriteria() {
		return DetachedCriteria.forClass(entityClass);
	}
	
	/**
	 * 依照集合过滤条件，生成or过滤hql
	 * <pre>
	 * @功能说明:
	 * 依照集合过滤条件，生成or过滤hql
	 * @版本更新列表
	 * 修改版本: 1.0.0
	 * 修改日期: 2013年8月21日
	 * 修  改  人: zcguo
	 * 修改说明: 形成初始版本
	 * 复  审  人:
	 * </pre>
	 * @date 2013年8月21日
	 * @param paramList	过滤值集合
	 * @param column	过滤字段
	 * @param argList	hql参数值集合
	 * @return 过滤sql
	 */
	protected String doBuildOrHql(List<String> paramList, String column, List<Object> argList) {
		StringBuffer sb = new StringBuffer(100);
		if (CollectionUtils.isNotEmpty(paramList)) {
			StringBuffer tempSb = new StringBuffer(100);
			for (String param : paramList) {
				tempSb.append(" ").append(column).append("=? or");
				argList.add(param);
			}
			String temp = tempSb.toString();
			if (StringUtils.isNotBlank(temp)) {
				sb.append(" and (");
				sb.append(StringUtils.substring(temp, 0, temp.length()-2));
				sb.append(")");
			}
			
		}
		return sb.toString();
	}
	
	public long getSequence(String sequcenceName) {
		SQLQuery query = this.getSession().createSQLQuery("select nextval('"+sequcenceName+"')");
		BigInteger seq = (BigInteger)query.list().get(0);
		return seq.longValue();
	}
	
}