import { jwtUtil } from './jwtUtil.js';

// refreshToken이 쿠키에 존재한다면, 토큰을 해석하는 Express 미들웨어 제작
export const jwtRefreshToken = (res, req, next) => {
    // 먼저, Request와 Cookie에 토큰이 없다면, 비로그인 상태이므로 패스.
    if (!req.headers?.authorization || !req.cookies?.refresh_token) {
        return next();
    }

    // Request Header와 Cookie에 담긴 access / refresh token을 추출
    const accessToken = req.headers.authorization.split('Bearer ')[1];
    const refreshToken = req.cookies?.refresh_token;

    // access token 이 만료되지 않았을 경우, 로그인 상태 유지.
    const decodedAccessToken = jwtUtil.verifyToken(accessToken);
    if (decodedAccessToken) {
        const { id, registed } = decodedAccessToken;
        res.status(400).json({ result: true, id, registed });
        return next();
    }

    // access token이 만료되었을 경우, refresh_token을 마저 체크해야 함.
    const decodedRefreshToken = jwtUtil.verifyToken(accessToken);
    if (decodedRefreshToken) {
        const { id, registed } = decodedRefreshToken;
        const newAccessToken = jwtUtil.generateToken({ id, registed });
        res.status(400).json({ result: true, data: { accessToken: newAccessToken, refreshToken } });
        return next();
    }

    // refresh token 마저 만료되었을 경우, 로그인을 해제해야 함.
    res.cookie('refresh_token', '', { maxAge: 0 });
    res.status(401).json({ result: false, message: 'your authorization is expired.' });
    return next();
};
