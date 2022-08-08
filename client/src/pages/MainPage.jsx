import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';

import BaseTemplate from 'components/template/BaseTemplate';
import { HomeContainer } from 'pages/Container/HomeContainer';
import { MemoContainer } from 'pages/Container/MemoContainer';
import { LoginContainer } from 'pages/Container/LoginContainer';
import { RegisterContainer } from 'pages/Container/RegisterContainer';
import { AuthState } from 'module/Auth';

// 로그인을 한 경우에만 접근을 허용하도록 하는 Route
const PrivateRoute = () => {
    const authInfo = useRecoilValue(AuthState);
    const isLogin = authInfo.authenticated;
    return isLogin ? <Outlet /> : <Navigate to={'/'} replace />;
};

// 로그인을 하지 않았을 경우에만 접근을 허용하도록 하는 Route
const RestrictedRoute = () => {
    const authInfo = useRecoilValue(AuthState);
    const isLogin = authInfo.authenticated;
    return isLogin ? <Navigate to={'/'} replace /> : <Outlet />;
};

const MainPage = () => {
    const setAuthInfo = useSetRecoilState(AuthState);

    useEffect(() => {
        const accessToken = localStorage.getItem('access_token');
        if (accessToken) {
            setAuthInfo({ token: accessToken, authenticated: true });
        }
    });

    return (
        <BrowserRouter>
            <BaseTemplate>
                <Routes>
                    <Route path='/' element={<HomeContainer />} />
                    <Route element={<RestrictedRoute />}>
                        <Route path='/login' element={<LoginContainer />} />
                        <Route path='/register' element={<RegisterContainer />} />
                    </Route>
                    <Route element={<PrivateRoute />}>
                        <Route path='/memo/*' element={<MemoContainer />} />
                    </Route>
                </Routes>
            </BaseTemplate>
        </BrowserRouter>
    );
};

export default MainPage;
