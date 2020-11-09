import * as dotenv from 'dotenv';
import axios from 'axios';
import gettoken from './token.helper';

dotenv.config();

describe('do list products', () => {
    it('listing only available products with a defined limit', async () => {
        const token = await gettoken('admin@user.com', '123');

        const res = await axios.get(`${process.env.URL_PROD}/products`, {
            headers: { Authorization: `Bearer ${token}` },
            params: { limit: 5, available: 1 }
        });

        expect(res.status).toBe(200);
        expect.arrayContaining(res.data);
    })
})

describe('do add product', () => {
    it('adding product to store with admin profile', async () => {
        const token = await gettoken('admin@user.com', '123');
        const data = { name: "Produto Teste Admin", price: 17.70, quantity: 1 };
        const res = await axios.post(`${process.env.URL_PROD}/products`, data, {
            headers: { Authorization: `Bearer ${token}` }
        });

        expect(res.status).toBe(200);
        expect.objectContaining(res.data);
        expect(res.data).toHaveProperty('_id');
    })
})

describe('do add product', () => {
    it('error when trying to add product as a customer', async () => {
        const token = await gettoken('client@user.com', '123');
        const data = { name: "Produto Teste Client", price: 17.70, quantity: 1 };
        
        await axios.post(`${process.env.URL_PROD}/products`, data, {
            headers: { Authorization: `Bearer ${token}` }
        }).catch((err) => {
            expect(err.response.status).toBe(401);
            expect(err.response.statusText).toEqual('Unauthorized');
        });
    })
})