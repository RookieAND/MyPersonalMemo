import { jwtUtil } from './jwtCreateToken.js';

// refreshToken이 쿠키에 존재한다면, 토큰을 해석하는 Express 미들웨어 제작
export const jwtRefreshToken = (res, req, next) => {
    const refreshToken = req.cookies?.access_token;
    // 만약 refreshToken 이 존재하지 않을 경우, 다음 작업 수행
    if (!refreshToken) {
        return next();
    }

    const decoded = jwtUtil.decodeToken(accessToken);
    // 만약 토큰 만료 기간까지 1시간도 남지 않았다면, 토큰을 재발급 해야 함.
    if (decoded.iat - Date.now() / 1000 < 60 * 60 * 1) {
        const { id, registed } = decoded;
        const freshToken = jwtUtil.generateToken({ id, registed });

        // res.cookie(name, content, option) 으로 JWT 토큰이 담긴 쿠키를 설정함.
        res.cookie('refresh_token', freshToken, {
            maxAge: 1000 * 60 * 60 * 24,
            httpOnly: true,
        });
    }

    // 최종적으로 작업이 끝났다면, 다음 미들웨어 함수에게 제어권을 전달해야 함.
    return next();
};
