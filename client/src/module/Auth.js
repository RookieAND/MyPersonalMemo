import { atom, selector } from 'recoil';

// JWT 토큰 인증을 통한 로그인 여부를 파악하는 atom 선언.
export const AuthState = atom({
    key: 'authState',
    default: {
        token: null,
        authenticated: false,
    },
});
