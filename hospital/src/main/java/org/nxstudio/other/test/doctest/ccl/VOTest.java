package org.nxstudio.other.test.doctest.ccl;

public class VOTest {

    /**
     * 测试VO对象
     *
     * @author XiongChun
     * @since 2011-03-29
     */
    public static void main(String[] args) {
        RegCourceVO vo = new RegCourceVO();
        vo.setCourceId("001");
        //省略其它属性赋值
        //转换为Dto对象
        vo.toDto();

    }

}
