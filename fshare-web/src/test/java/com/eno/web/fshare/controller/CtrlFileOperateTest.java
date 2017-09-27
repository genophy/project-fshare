package com.eno.web.fshare.controller;

import java.util.List;
import java.util.Map;

import org.junit.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class CtrlFileOperateTest {
	CtrlFilleOperate co = new CtrlFilleOperate();

	@Test
	public void getChildren() {
		List<Map<String, String>> list = co.getChildren(".");
		System.out.println(list);
	}
}
