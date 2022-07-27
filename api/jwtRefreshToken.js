// refreshToken이 쿠키에 존재한다면, 토큰을 해석하는 Express 미들웨어 제작
export const jwtRefreshToken = (res, req, next) => {
    // 만약 refreshToken 이 존재하지 않을 경우, 다음 작업 수행
    const refreshToken = req.cookies?.access_token;
    if (!refreshToken) {
        // next Callback 인수의 경우 다음 미들웨어 함수에 제어를 전달하는 역할.
        return next();
    }

    const decoded = decodeToken(accessToken);
    // 만약 토큰 만료 기간까지 3시간도 남지 않았다면, 이를 재발급 하도록 수정.
    if (decoded.iat - Date.now() / 1000 < 60 * 60 * 3) {
        const { id, registed } = decoded;
        const freshToken = generateToken({ id, registed });

        // res.cookie(name, content, option) 으로 JWT 토큰이 담긴 쿠키를 설정함.
        res.cookie('refresh_token', freshToken, {
            maxAge: 1000 * 60 * 60 * 24,
            httpOnly: true,
        });
    }

    // 최종적으로 작업이 끝났다면, 다음 미들웨어 함수에게 제어권을 전달해야 함.
    return next();
};
