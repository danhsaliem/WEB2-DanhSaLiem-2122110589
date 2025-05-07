// package com.example.DanhSaLiem.repository;

// import com.example.DanhSaLiem.domain.Cart;
// import org.springframework.data.jpa.repository.JpaRepository;
// import org.springframework.stereotype.Repository;

// import java.util.List;

// @Repository
// public interface CartRepository extends JpaRepository<Cart, Long> {
//     List<Cart> findByUserId(Long userId);
// }
package com.example.DanhSaLiem.repository;

import com.example.DanhSaLiem.domain.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {
    List<Cart> findByUserId(Long userId);
}
