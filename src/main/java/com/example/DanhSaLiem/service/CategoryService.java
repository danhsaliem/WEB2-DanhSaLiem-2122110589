package com.example.DanhSaLiem.service;

import com.example.DanhSaLiem.domain.Category;
import com.example.DanhSaLiem.repository.CategoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    // Lấy tất cả các category
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    // Lấy category theo ID
    public Optional<Category> getCategoryById(Long id) {
        return categoryRepository.findById(id);
    }

    // Tạo category mới
    public Category createCategory(Category category) {
        return categoryRepository.save(category);
    }

    // Sửa thông tin category
    public Category updateCategory(Long id, Category category) {
        if (categoryRepository.existsById(id)) {
            category.setId(id);
            return categoryRepository.save(category);
        }
        return null;
    }

    // Xóa category theo ID
    public void deleteCategory(Long id) {
        categoryRepository.deleteById(id);
    }
}
