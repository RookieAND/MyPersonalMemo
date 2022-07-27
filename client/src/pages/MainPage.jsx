import React, { useReducer } from 'react';

import BaseTemplate from '../components/template/BaseTemplate';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';

import { HomeContainer } from './Container/HomeContainer';
import { MemoContainer } from './Container/MemoContainer';
import { LoginContainer } from './Container/LoginContainer';
import { RegisterContainer } from './Container/RegisterContainer';

// JWT 토큰 인증을 통한 로그인 여부를 파악하는 reducer / state 선언.
export const AuthDispatch = React.createContext(null);

const initialState = { token: null, authenticated: false };
const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_TOKEN':
            return { ...state, token: action.token, authenticated: action.result };
        case 'DELETE_TOKEN':
            return { ...state, token: null, authenticated: false };
        default:
            return state;
    }
};

// 로그인을 한 경우에만 접근을 허용하도록 하는 Route
const PrivateRoute = ({ isLogin }) => {
    return isLogin ? <Outlet /> : <Navigate to={'/'} replace />;
};

// 로그인을 하지 않았을 경우에만 접근을 허용하도록 하는 Route
const RestrictedRoute = ({ isLogin }) => {
    return isLogin ? <Navigate to={'/'} replace /> : <Outlet />;
};

const MainPage = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const isLogin = state.authenticated;

    return (
        <AuthDispatch.Provider value={dispatch}>
            <BrowserRouter>
                <BaseTemplate>
                    <Routes>
                        <Route path='/' element={<HomeContainer />} />
                        <Route element={<RestrictedRoute />} isLogin={isLogin}>
                            <Route path='/login' element={<LoginContainer />} />
                            <Route path='/register' element={<RegisterContainer />} />
                        </Route>
                        <Route element={<PrivateRoute />} isLogin={isLogin}>
                            <Route path='/memo/*' element={<MemoContainer />} />
                        </Route>
                    </Routes>
                </BaseTemplate>
            </BrowserRouter>
        </AuthDispatch.Provider>
    );
};

export default MainPage;
