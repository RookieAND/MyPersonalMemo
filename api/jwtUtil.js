import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config({ encoding: 'utf8' });

// 암호화를 위한 salt 값인 SECRET_KEY를 환경변수에서 가져옴
const SECRET_KEY = process.env.SECRET_KEY;

// JWT 토큰 관련 유틸 함수를 객체로 묶어서 관리.
export const jwtUtil = {
    generateToken: (payload) => {
        return jwt.sign(payload, SECRET_KEY, { expiresIn: '3h' });
    },
    generateRefreshToken: (payload) => {
        return jwt.sign(payload, SECRET_KEY, { expiresIn: '7d' });
    },
    verifyToken: (token) => {
        try {
            const decoded = jwt.verify(token, SECRET_KEY);
            return decoded;
        } catch (err) {
            return null;
        }
    },
};
