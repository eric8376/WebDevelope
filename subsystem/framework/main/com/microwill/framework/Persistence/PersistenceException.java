package com.microwill.framework.Persistence;

public class PersistenceException extends RuntimeException {

	private static final long serialVersionUID = 4820504875435293441L;

	public PersistenceException() {

	}

	public PersistenceException(String arg0) {
		super(arg0);

	}

	public PersistenceException(String arg0, Throwable arg1) {
		super(arg0, arg1);

	}

	public PersistenceException(Throwable arg0) {
		super(arg0);

	}
}
