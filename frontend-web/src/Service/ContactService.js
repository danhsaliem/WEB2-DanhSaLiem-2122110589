import Api from "./Api";

const ContactService = {
    // Lấy danh sách liên hệ
    getList: async () => {
        const token = localStorage.getItem("token");
        const response = await Api.get("Contact", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    },
    getContactById: async (id) => {
        const token = localStorage.getItem("token");
        const response = await Api.get(`contacts/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    },
    updateContact: async (id, contactData) => {
        const token = localStorage.getItem("token");
        const response = await Api.put(`contacts/${id}`, contactData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',  // Send data as JSON
            },
        });
        console.log(response);
        return response;
    },
    addContact: async (contactData) => {
        const token = localStorage.getItem("token");
        const response = await Api.post("contacts", contactData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    },
    deleteContact: async (id) => {
        const token = localStorage.getItem("token");
        const response = await Api.delete(`contacts/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    }
    
};

export default ContactService;
