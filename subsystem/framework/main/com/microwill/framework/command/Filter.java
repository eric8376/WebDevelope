package  com.microwill.framework.command;

import com.microwill.framework.context.Context;


public interface Filter extends Command {
	boolean postprocess(Context context, Exception exception);
}
