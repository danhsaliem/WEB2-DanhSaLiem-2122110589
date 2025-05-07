package com.example.DanhSaLiem.service.impl;

import com.example.DanhSaLiem.domain.Contact;
import com.example.DanhSaLiem.repository.ContactRepository;
import com.example.DanhSaLiem.service.ContactService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ContactServiceImpl implements ContactService {

    @Autowired
    private ContactRepository contactRepository;

    @Override
    public List<Contact> getAllContacts() {
        return contactRepository.findAll();
    }

    @Override
    public Contact getContactById(Long id) {
        return contactRepository.findById(id).orElse(null);
    }

    @Override
    public Contact saveContact(Contact contact) {
        if (contact.getEmail() == null || contact.getEmail().isEmpty()) {
            throw new IllegalArgumentException("Email không được để trống");
        }
        if (contact.getPhone() == null || contact.getPhone().isEmpty()) {
            throw new IllegalArgumentException("Số điện thoại không được để trống");
        }
        if (contact.getAddress() == null || contact.getAddress().isEmpty()) {
            throw new IllegalArgumentException("Địa chỉ không được để trống");
        }
        return contactRepository.save(contact);
    }

    @Override
    public Contact updateContact(Long id, Contact updatedContact) {
        if (id == null || updatedContact == null) {
            throw new IllegalArgumentException("ID hoặc thông tin contact không hợp lệ.");
        }

        return contactRepository.findById(id).map(existing -> {
            existing.setName(updatedContact.getName());
            existing.setEmail(updatedContact.getEmail());
            existing.setPhone(updatedContact.getPhone());
            existing.setAddress(updatedContact.getAddress());
            return contactRepository.save(existing);
        }).orElseThrow(() -> new RuntimeException("Contact không tìm thấy"));
    }

    @Override
    public void deleteContact(Long id) {
        if (id == null) {
            throw new IllegalArgumentException("ID không hợp lệ.");
        }
        contactRepository.deleteById(id);
    }

    @Override
    public Contact replyContact(Long id, String reply) {
        return contactRepository.findById(id).map(contact -> {
            contact.setReply(reply);
            return contactRepository.save(contact);
        }).orElseThrow(() -> new RuntimeException("Không tìm thấy liên hệ với id = " + id));
    }
}
