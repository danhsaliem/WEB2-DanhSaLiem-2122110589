import axios from 'axios';

const getUserData = () => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    return userData;
};

const CartService = {
    addToCart: async (productId, quantity = 1) => {
        const userData = getUserData();
        const token = userData?.token;
        if (!token) {
            throw new Error('User is not authenticated');
        }
        try {
            return await axios.post(
                'http://localhost:8081/api/carts',
                { product_id: productId, quantity },
                { headers: { Authorization: `Bearer ${token}` } }
            );
        } catch (error) {
            console.error(error);
            throw new Error('Failed to add item to cart');
        }
    },

    fetchCartItems: async () => {
        const userData = getUserData();
        const token = userData?.token;
        if (!token) {
            throw new Error('User is not authenticated');
        }
        try {
            const response = await axios.get('http://localhost:8081/api/carts', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data.data;
        } catch (error) {
            console.error(error);
            throw new Error('Failed to fetch cart items');
        }
    },

    removeCart: async (cartId) => {
        const userData = getUserData();
        const token = userData?.token;
        if (!token) {
            throw new Error('User is not authenticated');
        }
        try {
            await axios.delete(`http://localhost:8081/api/carts/${cartId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        } catch (error) {
            console.error(error);
            throw new Error('Failed to remove item from cart');
        }
    },
};

export default CartService;
