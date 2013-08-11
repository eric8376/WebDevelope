package com.microwill.framework.command;


public interface CompositeCommand extends Command {
	void addCommand(Command command);
}
