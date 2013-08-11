package com.microwill.framework.command;

import com.microwill.framework.context.Context;

public interface Command { 
	public static boolean COMMAND_BREAK = true;

	public static boolean COMMAND_CONTINUE = false;

	boolean execute(Context context) throws Exception;
}
