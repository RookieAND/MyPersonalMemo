import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { RecoilRoot } from 'recoil';

import { ThemeProvider } from 'styled-components';
import { ModalProvider } from 'module/Modal';
import { defalutTheme as theme } from './styles/Theme';
import GlobalStyle from './styles/GlobalStyle';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ThemeProvider theme={theme}>
        <ModalProvider>
            <RecoilRoot>
                <GlobalStyle />
                <App />
            </RecoilRoot>
        </ModalProvider>
    </ThemeProvider>
);
