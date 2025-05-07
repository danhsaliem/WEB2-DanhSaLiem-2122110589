package com.example.DanhSaLiem.service.impl;

import com.example.DanhSaLiem.domain.Brand;
import com.example.DanhSaLiem.domain.Category;
import com.example.DanhSaLiem.domain.Product;
import com.example.DanhSaLiem.repository.BrandRepository;
import com.example.DanhSaLiem.repository.CategoryRepository;
import com.example.DanhSaLiem.repository.ProductRepository;
import com.example.DanhSaLiem.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private BrandRepository brandRepository;

    @Override
    public Optional<Product> findById(Long id) {
        return productRepository.findById(id);
    }

    @Override
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @Override
    public Optional<Product> getProductById(Long id) {
        return productRepository.findById(id);
    }

    @Override
    public List<Product> getProductsByCategory(Long categoryId) {
        return productRepository.findByCategoryId(categoryId);
    }

    @Override
    public List<Product> getProductsByBrand(Long brandId) {
        return productRepository.findByBrandId(brandId);
    }

    @Override
    public List<Product> getProductsByCategoryAndBrand(Long categoryId, Long brandId) {
        return productRepository.findByCategoryIdAndBrandId(categoryId, brandId);
    }

    @Override
    public Product createProduct(Product product, Category category, Brand brand, MultipartFile image) {
        // Kiểm tra category và brand không null
        if (category == null || brand == null) {
            throw new IllegalArgumentException("Category và Brand không được null");
        }

        product.setCategory(category);
        product.setBrand(brand);
        if (image != null && !image.isEmpty()) {
            product.setImage(saveImage(image));
        }
        return productRepository.save(product);
    }

    @Override
    public Product updateProduct(Long id, Product productDetails, Category category, Brand brand, MultipartFile image) {
        Optional<Product> productOptional = productRepository.findById(id);
        if (productOptional.isPresent()) {
            Product product = productOptional.get();
            product.setName(productDetails.getName());
            product.setDescription(productDetails.getDescription());
            product.setPrice(productDetails.getPrice());
            // product.setQuantity(productDetails.getQuantity());
            product.setCategory(category);
            product.setBrand(brand);
            if (image != null && !image.isEmpty()) {
                product.setImage(saveImage(image));
            }
            return productRepository.save(product);
        }
        throw new RuntimeException("Product not found");
    }

    @Override
    public void deleteProduct(Long id) {
        if (productRepository.existsById(id)) {
            productRepository.deleteById(id);
        } else {
            throw new RuntimeException("Product not found");
        }
    }

    private String saveImage(MultipartFile image) {
        try {
            String uploadDir = "uploads";
            String fileName = image.getOriginalFilename();
    
            Path uploadPath = Paths.get(uploadDir);
            Files.createDirectories(uploadPath); // Tạo thư mục nếu chưa có
    
            Path filePath = uploadPath.resolve(fileName);
            Files.write(filePath, image.getBytes());
    
            return fileName; // 🔥 Trả về chỉ tên ảnh
        } catch (IOException e) {
            throw new RuntimeException("Lỗi khi lưu ảnh: " + e.getMessage());
        }
    }
    
}