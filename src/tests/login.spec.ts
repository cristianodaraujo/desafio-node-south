import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

describe('do login', () => {
    it('it should be ok', async () => {
        const data = {
            email: 'admin@user.com',
            password: '123'
        };
        const res = await axios.post(`${process.env.APP_URL}/users/login`, data);

        expect(res.status).toEqual(200);
        expect(res.data).toHaveProperty('token');
    })
})