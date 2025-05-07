package com.example.DanhSaLiem.service;

import com.example.DanhSaLiem.domain.Brand;
import com.example.DanhSaLiem.repository.BrandRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BrandService {

    private final BrandRepository brandRepository;

    public BrandService(BrandRepository brandRepository) {
        this.brandRepository = brandRepository;
    }

    // Lấy tất cả các brand
    public List<Brand> getAllBrands() {
        return brandRepository.findAll();
    }

    // Lấy brand theo ID
    public Optional<Brand> getBrandById(Long id) {
        return brandRepository.findById(id);
    }
    

    // Tạo brand mới
    public Brand createBrand(Brand brand) {
        return brandRepository.save(brand);
    }

    // Sửa thông tin brand
    public Brand updateBrand(Long id, Brand brand) {
        if (brandRepository.existsById(id)) {
            brand.setId(id);
            return brandRepository.save(brand);
        }
        return null;
    }

    // Xóa brand theo ID
    public void deleteBrand(Long id) {
        brandRepository.deleteById(id);
    }
}
