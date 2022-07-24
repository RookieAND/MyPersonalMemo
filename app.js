import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import DBRouter from './api/DBRouter.js';
import AccountRouter from './api/AccountRouter.js';

// import covidStatusRouter from './api/covidStatus.js';
// import traigeRouter from './api/traigeRoom.js';

dotenv.config({ encoding: 'utf8' });

const app = express();
const port = process.env.PORT || 5000;

// ES Module 에는 __dirname 변수가 없기에 이를 만들어야 함.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 기본 port를 app Express 객체에 설정하는 과정
app.listen(port, () => {
    console.log(`Express 서버 정상 가동 중, 포트 ${port} 번`);
});

// CORS Header를 추가하여 CORS 통신을 가능하게 한다.
// Web Application 간의 송신을 가능하게끔 열어주는 목적.
app.use(cors());
// Express JSON 모듈을 사용하여 Body parse 진행.
app.use(express.json());

// Router를 통해 DB API를 분리시켜 관리함.
app.use('/memo', DBRouter);
app.use('/account', AccountRouter);

// 리액트로 build 된 static files 제공
app.use(express.static(path.join(__dirname, 'client/build')));

// 라우트 설정
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

// MongoDB Connection 관련 파트. (Cluster URL의 경우 환경변수 파일에 저장)
// 6.0.0 부터는 자동으로 useNewUrlParser, useCreateIndex, useUnifiedTopology 옵션이 적용됨.
mongoose.connect(`${process.env.ATLAS_URL}`);

const DBconnection = mongoose.connection;
DBconnection.once('open', () => {
    console.log('MongoDB 클러스터와의 연결이 성공적으로 완료되었습니다.');
});
