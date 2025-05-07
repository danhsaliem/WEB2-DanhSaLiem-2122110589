package com.example.DanhSaLiem.service;

import com.example.DanhSaLiem.domain.Order;

import java.util.List;


public interface OrderService {
    List<Order> getAllOrders();
    Order getOrderById(int id);
    Order saveOrder(Order order);
    void deleteOrder(int id);
}