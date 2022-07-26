import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config({ encoding: 'utf8' });

// 암호화를 위한 salt 값인 SECRET_KEY를 환경변수에서 가져옴
const SECRET_KEY = process.env.SECRET_KEY;

// JWT 토큰을 발급해주는 함수
export const generateToken = (payload) => {
    return jwt.sign(payload, SECRET_KEY, { expiresIn: '1d' });
};

// JWT 토큰의 유효성 검사를 진행하는 함수
export const decodeToken = (token) => {
    return jwt.verify(token, SECRET_KEY);
};

// 쿠키가 존재한다면, 토큰을 해석하는 Express 미들웨어 제작
export const jwtRefreshToken = (res, req, next) => {
    const accessToken = req.cookies?.access_token;
    // 만약 Access_token 이 존재하지 않을 경우, 다음 작업 수행
    if (!accessToken) {
        // next Callback 인수의 경우 다음 미들웨어 함수에 제어를 전달하는 역할.
        return next();
    }

    const decoded = decodeToken(accessToken);
    // 만약 토큰 만료 기간까지 3시간도 남지 않았다면, 이를 재발급 하도록 수정.
    if (decoded.iat - Date.now() / 1000 < 60 * 60 * 3) {
        const { id, registed } = decoded;
        const freshToken = generateToken({ id, registed });

        // res.cookie(name, content, option) 으로 JWT 토큰이 담긴 쿠키를 설정함.
        res.cookie('access_token', freshToken, {
            maxAge: 1000 * 60 * 60 * 24,
            httpOnly: true,
        });
    }
};
