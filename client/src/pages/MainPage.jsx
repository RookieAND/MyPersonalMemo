import BaseTemplate from '../components/template/BaseTemplate';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { HomeContainer } from './Container/HomeContainer';
import { MemoContainer } from './Container/MemoContainer';
import { LoginContainer } from './Container/LoginContainer';
import { RegisterContainer } from './Container/RegisterContainer';

const MainPage = () => {
    return (
        <BrowserRouter>
            <BaseTemplate>
                <Routes>
                    <Route path='/' element={<HomeContainer />} />
                    <Route path='/memo/*' element={<MemoContainer />} />
                    <Route path='/login' element={<LoginContainer />} />
                    <Route path='/register' element={<RegisterContainer />} />
                </Routes>
            </BaseTemplate>
        </BrowserRouter>
    );
};

export default MainPage;
