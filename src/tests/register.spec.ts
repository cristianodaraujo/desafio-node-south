import * as dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

describe('do register', () => {
    it('it should be ok', async () => {
        const string = Math.random().toString(36).substring(4);
        const data = {
            email: `${string}@user.com`,
            password: '123',
            role: 'client'
        };
        const res = await axios.post(`${process.env.URL_PROD}/users/register`, data);

        expect(res.status).toEqual(200);
        expect(res.data).toHaveProperty('_id');
    })
})