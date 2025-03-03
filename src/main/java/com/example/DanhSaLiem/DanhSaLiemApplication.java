package com.example.DanhSaLiem;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController 	
public class DanhSaLiemApplication {

	// @RequestMapping("/")
	// String home() {
	// 	System.out.println("Hello");
	// 	return "Hello World!";
	// }
	public static void main(String[] args) {
		SpringApplication.run(DanhSaLiemApplication.class, args);
	}

}
