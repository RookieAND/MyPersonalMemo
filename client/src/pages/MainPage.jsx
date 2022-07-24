import BaseTemplate from '../components/template/BaseTemplate';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { HomeContainer } from './Container/HomeContainer';
import { MemoContainer } from './Container/MemoContainer';
import { LoginContainer } from './Container/LoginContainer';
import { RegisterContainer } from './Container/RegisterContainer';

const MainPage = () => {
    return (
        <BrowserRouter>
            <BaseTemplate>
                <Switch>
                    <Route exact path='/' component={HomeContainer} />
                    <Route path='/memo' component={MemoContainer} />
                    <Route path='/login' component={LoginContainer} />
                    <Route path='/register' component={RegisterContainer} />
                </Switch>
            </BaseTemplate>
        </BrowserRouter>
    );
};

export default MainPage;
