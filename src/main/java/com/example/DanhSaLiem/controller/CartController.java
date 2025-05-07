// package com.example.DanhSaLiem.controller;

// import com.example.DanhSaLiem.domain.Cart;
// import com.example.DanhSaLiem.service.CartService;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.*;

// import java.util.List;

// @RestController
// @RequestMapping("/api/carts")
// public class CartController {

//     @Autowired
//     private CartService cartService;

//     //  Lấy tất cả cart (nếu cần debug hoặc admin)
//     @GetMapping
//     public ResponseEntity<List<Cart>> getAllCarts() {
//         return ResponseEntity.ok(cartService.findAll());
//     }

//     //  Lấy giỏ hàng theo userId
//     @GetMapping("/user/{userId}")
//     public ResponseEntity<List<Cart>> getCartByUserId(@PathVariable Long userId) {
//         return ResponseEntity.ok(cartService.findByUserId(userId));
//     }

//     //  Lấy chi tiết cart theo cartId
//     @GetMapping("/{id}")
//     public ResponseEntity<Cart> getCartById(@PathVariable Long id) {
//         return ResponseEntity.ok(cartService.getCartById(id));
//     }

//     //  Thêm vào giỏ hàng
//     @PostMapping
//     public ResponseEntity<Cart> addToCart(@RequestBody Cart cart) {
//         return ResponseEntity.ok(cartService.addToCart(cart));
//     }

//     //  Cập nhật số lượng
//     @PutMapping("/{id}")
//     public ResponseEntity<Cart> updateCart(@PathVariable Long id, @RequestBody Cart cartRequest) {
//         return ResponseEntity.ok(cartService.updateQuantity(id, cartRequest.getQuantity()));
//     }

//     //  Xóa khỏi giỏ hàng
//     @DeleteMapping("/{id}")
//     public ResponseEntity<Void> removeFromCart(@PathVariable Long id) {
//         cartService.removeFromCart(id);
//         return ResponseEntity.noContent().build();
//     }
// }
package com.example.DanhSaLiem.controller;

import com.example.DanhSaLiem.domain.Cart;
import com.example.DanhSaLiem.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/carts")
public class CartController {

    @Autowired
    private CartService cartService;

    // Get all carts (debug or admin purposes)
    @GetMapping
    public ResponseEntity<List<Cart>> getAllCarts() {
        return ResponseEntity.ok(cartService.findAll());
    }

    // Get cart by userId
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Cart>> getCartByUserId(@PathVariable Long userId) {
        return ResponseEntity.ok(cartService.findByUserId(userId));
    }

    // Get cart details by cartId
    @GetMapping("/{id}")
    public ResponseEntity<Cart> getCartById(@PathVariable Long id) {
        return ResponseEntity.ok(cartService.getCartById(id));
    }

    // Add to cart
    @PostMapping
    public ResponseEntity<Cart> addToCart(@RequestBody Cart cart) {
        return ResponseEntity.ok(cartService.addToCart(cart));
    }

    // Update cart quantity
    @PutMapping("/{id}")
    public ResponseEntity<Cart> updateCart(@PathVariable Long id, @RequestBody Cart cartRequest) {
        return ResponseEntity.ok(cartService.updateQuantity(id, cartRequest.getQuantity()));
    }

    // Remove from cart
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> removeFromCart(@PathVariable Long id) {
        cartService.removeFromCart(id);
        return ResponseEntity.noContent().build();
    }
}
