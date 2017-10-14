package com.eno.web.fshare.tool;

import java.net.InetAddress;
import java.net.UnknownHostException;

import org.springframework.stereotype.Component;

/**
 * get Internet information
 * 
 * @author eno
 *
 */
@Component
public class InetAddressTool {
	private static InetAddress ip;
	private static String localHostAddress;
	static {
		init();
	}

	private static void init() {
		if (null != ip) {
			return;
		}
		
		try {
			ip = InetAddress.getLocalHost();
			localHostAddress = ip.getHostAddress();
		} catch (UnknownHostException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	public static String getLocalHostAddress() {
		if (null == ip) {
			init();
		}
		return localHostAddress;
	}

}
