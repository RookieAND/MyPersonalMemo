import BaseTemplate from "../components/template/BaseTemplate";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Home from "../components/main/home/Home";
import { MemoContainer } from "./Container/MemoContainer";

const MainPage = () => {
	return (
		<BrowserRouter>
			<BaseTemplate>
				<Switch>
					<Route exact path="/" component={HomeContainer}></Route>
					<Route path="/memo" component={MemoContainer}></Route>
				</Switch>
			</BaseTemplate>
		</BrowserRouter>
	);
};

const HomeContainer = () => {
	return <Home />;
};

export default MainPage;
