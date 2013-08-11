package com.microwill.framework.command.impl;

import java.util.Collection;
import java.util.Iterator;

import com.microwill.framework.command.Command;
import com.microwill.framework.command.CompositeCommand;
import com.microwill.framework.command.Filter;
import com.microwill.framework.context.Context;


public class DefaultCompositeCommandImpl implements CompositeCommand {
	protected Command[] commands = new Command[0];

	protected boolean frozen = false;

	public DefaultCompositeCommandImpl() {

	}

	public DefaultCompositeCommandImpl(Command command) {
		addCommand(command);
	}

	public DefaultCompositeCommandImpl(Collection commands) {
		if (commands == null) {
			throw new IllegalArgumentException();
		}
		Iterator elements = commands.iterator();
		while (elements.hasNext()) {
			addCommand((Command) elements.next());
		}
	}

	public void setCommands(Collection commands) {
		if (commands == null) {
			throw new IllegalArgumentException();
		}
		Iterator elements = commands.iterator();
		while (elements.hasNext()) {
			addCommand((Command) elements.next());
		}
	}

	public void addCommand(Command command) {

		if (command == null) {
			throw new IllegalArgumentException();
		}
		if (frozen) {
			throw new IllegalStateException();
		}
		Command[] results = new Command[commands.length + 1];
		System.arraycopy(commands, 0, results, 0, commands.length);
		results[commands.length] = command;
		commands = results;

	}

	public boolean execute(Context context) throws Exception {

		if (context == null) {
			throw new IllegalArgumentException();
		}

		frozen = true;

		boolean saveResult = false;
		Exception saveException = null;
		int i = 0;
		int n = commands.length;

		for (i = 0; i < n; i++) {
			try {
				saveResult = commands[i].execute(context);
				if (saveResult) {
					break;
				}
			} catch (Exception e) {
				saveException = e;
				break;
			}
		}

		if (i >= n) {
			i--;
		}
		boolean handled = false;
		boolean result = false;
		for (int j = i; j >= 0; j--) {
			if (commands[j] instanceof Filter) {
				try {
					result = ((Filter) commands[j]).postprocess(context,
							saveException);
					if (result) {
						handled = true;
					}
				} catch (Exception e) {
					
				}
			}
		}

		if ((saveException != null) && !handled) {
			throw saveException;
		} else {
			return (saveResult);
		}
	}

	Command[] getCommands() {
		return (commands);
	}

}
