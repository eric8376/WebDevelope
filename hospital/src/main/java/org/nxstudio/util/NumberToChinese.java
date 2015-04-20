package org.nxstudio.util;


/**
 * 实现将数字转化为繁体汉字表示
 */

import java.util.HashMap;

public class NumberToChinese {

    public String getNumberToChinese(String number) {
        StringBuffer numberToCn = new StringBuffer();

        //number = "-2813040410.0787003560";

        HashMap cnHash = getCNHash();

        HashMap unitHash = getUnitHash();

        String[] partOfNumber = null;

        if (number.substring(0, 1).equals("-")) //判断数字是否为负数，并将数划分为小数、整数两部分
        {
            numberToCn.append("負");
            partOfNumber = number.substring(1).split("//.");
        } else
            partOfNumber = number.substring(0).split("//.");


        if (partOfNumber.length == 1) //如果输入的数没有小数则只进行整数部分转化
        {
            String str = PositiveChangeToCN(partOfNumber[0], cnHash, unitHash);
            numberToCn.append(str);
        } else //如输入的数有小数，则先转化整数部分，再转换小数部分
        {
            String str = PositiveChangeToCN(partOfNumber[0], cnHash, unitHash); //处理整数部分
            numberToCn.append(str);

            numberToCn.append("點");

            str = DecimalChangeToCN(partOfNumber[1], cnHash); //处理小数部分
            numberToCn.append(str);
        }

//	  System.out.println("Number = " + number);
//	  System.out.println("Chinese = " + numberToCn.toString());
        return numberToCn.toString();
    }

    /**
     * 设置汉字中的数字表示名称
     *
     * @return
     */
    public HashMap getCNHash() {
        HashMap cnHash = new HashMap();
        int count = 10;
        String[] cnArray = {"零", "壹", "貳", "叁", "肆", "伍", "陸", "柒", "捌", "玖", "拾"};

        for (int i = 0; i < count; i++) {
            cnHash.put(String.valueOf(i), cnArray[i]);
        }
        return cnHash;
    }

    /**
     * 设置汉字中的数字单位名称
     *
     * @return
     */
    public HashMap getUnitHash() {
        HashMap unitHash = new HashMap();
        int count = 5;
        String[] unitArray = {"拾", "佰", "仟", "萬", "億", "兆"};

        for (int i = 2; i < count + 2; i++) {
            unitHash.put(String.valueOf(i), unitArray[i - 2]);
        }
        return unitHash;
    }

    /**
     * 转化数字小数部分
     *
     * @param numberStr
     * @param cnHash
     * @return
     */
    public String DecimalChangeToCN(String numberStr, HashMap cnHash) {
        StringBuffer cnStrBuffer = new StringBuffer();

        int zeroNumberAtLast = scanZeroAtLast(numberStr); //转化时除去输入时小数部分末尾存在的0

        //遍历数字，转换表示方式及单位
        for (int i = 0; i < numberStr.length() - zeroNumberAtLast; i++) {
            String aCnCode = (String) cnHash.get(numberStr.substring(i, i + 1));  //转换数字表示名称
            cnStrBuffer.append(aCnCode);
        }
        return cnStrBuffer.toString();
    }

    /**
     * 转化数字正数部分，按照每四位数作为一个单元进行转化
     *
     * @param numberStr
     * @param cnHash
     * @param unitHash
     * @return
     */
    private String PositiveChangeToCN(String numberStr, HashMap cnHash, HashMap unitHash) {
        StringBuffer cnStrBuffer = new StringBuffer();

        int changeUnit = 4; //每次转换的位数范围
        int strLength = numberStr.length();
        int tempLoopCount = strLength / changeUnit;

        if (strLength % changeUnit > 0)
            tempLoopCount++;

        for (int loop = 1; loop <= tempLoopCount; loop++) //每四位数字为一个单位转换数字
        {

            int beginIndex = strLength - (changeUnit * loop);
            int endIndex = beginIndex + changeUnit;

            if (beginIndex < 0) {
                beginIndex = 0;
                endIndex = strLength % changeUnit;
            }

            String tempStr = numberStr.substring(beginIndex, endIndex);
            int zeroNumberAtLast = scanZeroAtLast(tempStr); //转化时除去输入时整数部分末尾存在的0

            String aCnCode = new String();

            //遍历数字，转换表示方式及单位
            for (int i = 0; i < tempStr.length() - zeroNumberAtLast; i++) {
                String number = tempStr.substring(i, i + 1);
                aCnCode += (String) cnHash.get(number);  //转换数字表示名称

                //根据数字所在数中的位置设置对应的单位
                if (!number.equals("0")) {
                    int position = tempStr.length() - i;
                    if (position > 1)
                        aCnCode += (String) unitHash.get(String.valueOf(position)); //获取数字单位名称(拾、佰、仟)
                }
            }

            if (loop > 1) {
                aCnCode += (String) unitHash.get(String.valueOf(loop + 3)); //获取数字单位名称(萬、億、兆)
            }

            cnStrBuffer.insert(0, aCnCode); //合成转换结果
        }

        return cnStrBuffer.toString();
    }

    /**
     * 返回正数部分末尾为0的个数
     *
     * @param numberStr
     * @return
     */
    public int scanZeroAtLast(String numberStr) {
        int zeroNumberAtLast = 0;
        int i = numberStr.length();


        for (; i > 0; i--) //从数字字符串末尾开始遍历，获取由末尾开始连续的数字为0的个数
        {
            if (numberStr.substring(i - 1, i).equals("0"))
                zeroNumberAtLast++;
            else
                break;
        }
        return zeroNumberAtLast;
    }
}


