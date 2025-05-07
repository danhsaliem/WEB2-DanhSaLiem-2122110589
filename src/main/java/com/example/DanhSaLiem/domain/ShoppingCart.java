package com.example.DanhSaLiem.domain;


import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "shopping_cart") // Tên bảng trong CSDL
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ShoppingCart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // ID tự động tăng
    private int id;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(nullable = true)
    private String image;

    @Column(nullable = false)
    private int quantity;

    @Column(nullable = false)
    private float price;

    @Column(name = "product_id", nullable = false)
    private int productId;

    // Phương thức tính tổng giá sản phẩm trong giỏ hàng
    public float getTotalPrice() {
        return this.quantity * this.price;
    }
}
