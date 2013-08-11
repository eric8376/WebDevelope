package com.microwill.framework.context;

import java.util.Map;

public interface Context {
	public Object put(Object key, Object value);
	public Object get(Object key); 
}
