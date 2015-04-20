package org.nxstudio.plugin.jep.extend;

import org.nfunk.jep.ParseException;
import org.nfunk.jep.function.PostfixMathCommand;

import java.util.Stack;

/**
 * 编程环境 IDEA.
 * 编写者: 王少伟
 * 主题:【三目运算 =同于>xx?1:2】
 * 时间: 2013-07-20 下午7:21
 */

public class Choose extends PostfixMathCommand {
    @Override
    public void run(Stack inStack) throws ParseException {
        Double val2 = (Double) inStack.pop();
        Double val1 = (Double) inStack.pop();
        Double choose = (Double) inStack.pop();

        Double res = choose == 1 ? val1 : val2;
        inStack.push(res);
    }

    @Override
    public int getNumberOfParameters() {
        return 3;
    }

}
