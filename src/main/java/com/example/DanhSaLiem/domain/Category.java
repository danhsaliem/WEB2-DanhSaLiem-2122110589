package com.example.DanhSaLiem.domain;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "category")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;  // Chắc chắn là Long, không phải int

    @Column(nullable = false, length = 255)
    private String name;

    @Column(length = 500)
    private String description;
}
