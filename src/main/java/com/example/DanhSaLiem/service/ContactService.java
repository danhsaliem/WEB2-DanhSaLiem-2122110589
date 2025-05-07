package com.example.DanhSaLiem.service;

import com.example.DanhSaLiem.domain.Contact;

import java.util.List;

public interface ContactService {
    List<Contact> getAllContacts();
    Contact getContactById(Long id);
    Contact saveContact(Contact contact);
    Contact updateContact(Long id, Contact updatedContact);
    void deleteContact(Long id);
    Contact replyContact(Long id, String reply);
}
