package com.microwill.framework.Persistence.help;

import java.text.ParseException;
import java.util.Calendar;
import java.util.Date;

import org.apache.commons.beanutils.ConversionException;
import org.apache.commons.beanutils.Converter;
import org.apache.commons.lang.CharSetUtils;

public class CalendarConverter implements Converter {

    private Object defaultValue = null;

    private boolean useDefault = true;
    
    public CalendarConverter() {

        this.defaultValue = null;
        this.useDefault = false;

    }

    public CalendarConverter(Object defaultValue) {
        this.defaultValue = defaultValue;
        this.useDefault = true;
    }
    
    public Object convert(Class type, Object value) {
    	if (value == null) {
            if (useDefault) {
                return (defaultValue);
            } else {
                throw new ConversionException("No value specified");
            }
        }

        if (value instanceof Calendar) {
            return (value);
        }

        try {
        	Date dataTime=parse(value.toString());
        	Calendar cal=Calendar.getInstance();
    		cal.setTime(dataTime);
        	return cal;
        } catch (Exception e) {
            if (useDefault) {
                return (defaultValue);
            } else {
                throw new ConversionException(e);
            }
        }

    }
    
    private Date parse(String strDate) throws ParseException {
    	
    	if(strDate.length() > 19) strDate = strDate.substring(0,19); //huang.liangwen for xin-jiang-yi-dong
    																 //if strDate = 2007-01-04 10:57:48.0,					
		if (strDate == null)										 //strDate can not be parse, return null
			return null;
		if (CharSetUtils.count(strDate, "-") != 2)
			return null;
		if (CharSetUtils.count(strDate, ":") > 2)
			return null;
		strDate = strDate.trim();
		
		String[] parsePatterns = { "yyyy-MM-dd", "yyyy-MM-dd HH:mm", "yyyy-MM-dd HH:mm:ss" };
		
		return org.apache.commons.lang.time.DateUtils.parseDate(strDate,
				parsePatterns);
	}

}

