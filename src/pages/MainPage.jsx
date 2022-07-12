import BaseTemplate from '../components/template/BaseTemplate';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from '../components/main/home/Home';
import Memo from 'components/main/memo/Memo';

const MainPage = () => {
    return (
        <BrowserRouter>
            <BaseTemplate>
                <Switch>
                    <Route exact path='/' component={HomeContainer}></Route>
                    <Route path='/memo' component={MemoContainer}></Route>
                </Switch>
            </BaseTemplate>
        </BrowserRouter>
    );
};

const HomeContainer = () => {
    return <Home />;
};

const MemoContainer = () => {
    return <Memo />;
};

export default MainPage;
