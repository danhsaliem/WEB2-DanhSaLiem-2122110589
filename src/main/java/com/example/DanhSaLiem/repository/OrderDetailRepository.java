package com.example.DanhSaLiem.repository;

import com.example.DanhSaLiem.domain.OrderDetail;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderDetailRepository extends JpaRepository<OrderDetail, Integer> {
}
