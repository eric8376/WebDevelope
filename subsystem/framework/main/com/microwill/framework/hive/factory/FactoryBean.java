package com.microwill.framework.hive.factory;

public interface FactoryBean {

	/**
	 * Return an instance (possibly shared or independent) of the object
	 * managed by this factory. As with a BeanFactory, this allows
	 * support for both the Singleton and Prototype design pattern.
	 * <p>If this method returns <code>null</code>, the factory will consider
	 * the FactoryBean as not fully initialized and throw a corresponding
	 * FactoryBeanNotInitializedException.
	 * @return an instance of the bean (should not be <code>null</code>;
	 * a <code>null</code> value will be considered as an indication of
	 * incomplete initialization)
	 * @throws Exception in case of creation errors
	 * @see FactoryBeanNotInitializedException
	 */
	Object getObject() throws Exception;

	/**
	 * Return the type of object that this FactoryBean creates, or <code>null</code>
	 * if not known in advance. This allows to check for specific types
	 * of beans without instantiating objects, for example on autowiring.
	 * <p>For a singleton, this should try to avoid singleton creation
	 * as far as possible; it should rather estimate the type in advance.
	 * For prototypes, returning a meaningful type here is advisable too.
	 * <p>This method can be called <i>before</i> this FactoryBean has
	 * been fully initialized. It must not rely on state created during
	 * initialization; of course, it can still use such state if available.
	 * <p><b>NOTE:</b> Autowiring will simply ignore FactoryBeans that return
	 * <code>null</code> here. Therefore it is highly recommended to implement
	 * this method properly, using the current state of the FactoryBean.
	 * @return the type of object that this FactoryBean creates,
	 * or <code>null</code> if not known at the time of the call
	 * @see ListableBeanFactory#getBeansOfType
	 */
	Class getObjectType();

	/**
	 * Is the bean managed by this factory a singleton or a prototype?
	 * That is, will getObject() always return the same object?
	 * <p>The singleton status of the FactoryBean itself will generally
	 * be provided by the owning BeanFactory; usually, it has to be
	 * defined as singleton there.
	 * @return if this bean is a singleton
	 */
	boolean isSingleton();

}
