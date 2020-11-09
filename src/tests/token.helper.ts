import * as dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const token = async (email: string, password: string) => {
    const url = `${process.env.URI_LOCAL}/users/login`;
    const data = { email, password };
    const request = await axios.post(url, data);
    
    return request.data.token;
}

export default token;