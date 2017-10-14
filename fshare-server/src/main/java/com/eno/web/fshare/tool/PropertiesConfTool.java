package com.eno.web.fshare.tool;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.Properties;

import org.springframework.stereotype.Component;

import com.eno.web.fshare.util.Constants;

@Component
public class PropertiesConfTool {
	
	
	private static Properties prop;
	
	
	static {
		init();
	}

	//
	private static void init() {
		if (null != prop) {
			return;
		}
		try {
			prop = new Properties();
			prop.load(new FileInputStream(Constants.PROP_FILENAME));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/**
	 * 
	 * @param key
	 * @return
	 */
	public static String getKey(String key) {
		return prop.getProperty(key);
	}

}
