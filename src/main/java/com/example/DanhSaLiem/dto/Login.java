// package com.example.DanhSaLiem.dto;

// import lombok.Getter;
// import lombok.Setter;

// @Getter
// @Setter
// public class Login{
//     private String email;
//     private String password;
// }
package com.example.DanhSaLiem.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Login {
    private String email;
    private String password;
}
