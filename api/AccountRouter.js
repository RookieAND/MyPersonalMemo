import dotenv from 'dotenv';
import express from 'express';

import { ControlAccount } from '../post/ControlAccount.js';

dotenv.config({ encoding: 'utf8' });

// 환경변수로 허가되지 않은 인증 TLS 통신을 거부하지 않겠다고 설정
// 현재는 .env 파일에 자체적으로 값을 0으로 설정해두었음.
//process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const AccountRouter = express.Router();

// 특정 User에 대한 정보를 가져오고 싶을 경우 사용.
AccountRouter.post('/login', ControlAccount.login);
AccountRouter.post('/register', ControlAccount.register);
AccountRouter.get('/logout', ControlAccount.logout);

export default AccountRouter;
