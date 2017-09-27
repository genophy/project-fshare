package com.eno.web.fshare.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.eno.web.fshare.tool.InetAddressTool;

@RestController
@RequestMapping(value = "/rest/address")
public class CtrlInetAddress {

	@RequestMapping(value = "getlocal", method = { RequestMethod.GET })
	public String getLocalAddress() {
		return InetAddressTool.getLocalHostAddress();
	}
}
