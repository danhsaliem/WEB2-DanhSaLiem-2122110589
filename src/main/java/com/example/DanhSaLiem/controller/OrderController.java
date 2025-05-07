package com.example.DanhSaLiem.controller;

import com.example.DanhSaLiem.domain.Order;
import com.example.DanhSaLiem.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @GetMapping
    public List<Order> getAllOrders() {
        return orderService.getAllOrders();
    }

    @GetMapping("/{id}")
    public Order getOrderById(@PathVariable int id) {
        return orderService.getOrderById(id);
    }

    @PostMapping
    public Order createOrder(@RequestBody Order order) {
        return orderService.saveOrder(order);
    }
    @PutMapping("/{id}")
public Order updateOrder(@PathVariable int id, @RequestBody Order updatedOrder) {
    Order existingOrder = orderService.getOrderById(id);
    if (existingOrder != null) {
        existingOrder.setProductId(updatedOrder.getProductId());
        existingOrder.setName(updatedOrder.getName());
        existingOrder.setUserId(updatedOrder.getUserId());
        existingOrder.setTotalPrice(updatedOrder.getTotalPrice());
        return orderService.saveOrder(existingOrder);
    } else {
        return null; // hoặc throw exception nếu muốn
    }
}


    @DeleteMapping("/{id}")
    public void deleteOrder(@PathVariable int id) {
        orderService.deleteOrder(id);
    }
}