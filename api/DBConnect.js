import dotenv from 'dotenv';
import express from 'express';

import axiosInstance from './core/axiosInstance.js';
import ControlDB from './ControlDB.js';

dotenv.config({ encoding: 'utf8' });

// 환경변수로 허가되지 않은 인증 TLS 통신을 거부하지 않겠다고 설정
// 현재는 .env 파일에 자체적으로 값을 0으로 설정해두었음.
//process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const BASE_URL = 'https://apis.data.go.kr';
const DBConnectRouter = express.Router();

const getDatabase = async (request) => {
    let response;
    try {
        response = await ControlDB.getUser(request.username);
    } catch (err) {
        console.log(err);
    }
    return response.data.response.result[0];
};

DBConnectRouter.get('/api/status', async (req, res) => {
    const response = await getDatabase(req);
    return res.json(response);
});

export default DBConnectRouter;
