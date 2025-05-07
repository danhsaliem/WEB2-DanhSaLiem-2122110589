package com.example.DanhSaLiem.repository;

import com.example.DanhSaLiem.domain.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {
}
