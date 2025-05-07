package com.example.DanhSaLiem.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "brand") // Đặt tên bảng trong CSDL
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Brand {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // ID tự động tăng
    private Long id;  // Thay từ 'int' thành 'Long'

    @Column(name = "name", nullable = false, unique = true)
    private String name;

    @OneToMany(mappedBy = "brand", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore  // Ẩn field 'products' khi serialize thành JSON
    private List<Product> products;
}
