import styled, { css } from 'styled-components';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

import { accountControl } from 'api/accountControl.js';
import { LoginFeedbackMsg } from 'constants/FeedbackMsg';
import { AuthState } from 'module/Auth';

const LoginForm = () => {
    const feedbackMsg = useRef();
    const [loginInput, setLoginInput] = useState({
        id: '',
        pw: '',
    });
    const { id, pw } = loginInput;
    const navigate = useNavigate();
    const setAuthInfo = useSetRecoilState(AuthState);

    const submitLogin = async (event) => {
        event.preventDefault();
        resetInput();

        // ID 혹은 PW 둘 중 하나라도 입력하지 않았다면, 에러 메세지 출력
        if (id.length * pw.length === 0) {
            feedbackMsg.current.innerText = LoginFeedbackMsg['002'];
            return;
        }

        try {
            // 로그인에 성공했다면, 성공 메세지를 띄우고 0.75초 후 메인 화면으로 이동.
            const res = await accountControl.loginAccount(id, pw);
            setAuthInfo({ token: res.token, authenticated: true });
            feedbackMsg.current.innerText = LoginFeedbackMsg['000'];
            setTimeout(() => navigate('/'), 750);
        } catch (err) {
            feedbackMsg.current.innerText = LoginFeedbackMsg[err.message];
        }
    };

    const insertInput = (event) => {
        const { name, value } = event.target;
        setLoginInput({ ...loginInput, [name]: value });
    };

    const resetInput = () => {
        setLoginInput({ id: '', pw: '' });
    };

    return (
        <Wrapper>
            <LoginInput>
                <label htmlFor='id'>Username</label>
                <input id='id' name='id' placeholder='ID를 입력해주세요.' onChange={insertInput} value={id} />
            </LoginInput>
            <LoginInput>
                <label htmlFor='pw'>Password</label>
                <input
                    id='pw'
                    name='pw'
                    placeholder='PW를 입력해주세요.'
                    onChange={insertInput}
                    value={pw}
                    type='Password'
                />
            </LoginInput>
            <LoginFeedBack ref={feedbackMsg}>ID / PW 를 입력해주세요.</LoginFeedBack>
            <LoginBtn onClick={submitLogin}>Login</LoginBtn>
        </Wrapper>
    );
};

const Wrapper = styled.form`
    ${({ theme }) => {
        const { colors } = theme;
        return css`
            width: 50%;
            height: 100%;

            background-color: ${colors.white};
            border-radius: 0px 25px 25px 0px;

            text-align: center;
        `;
    }}
`;

const LoginInput = styled.div`
    ${({ theme }) => {
        const { colors, fonts, margins } = theme;
        return css`
            margin: ${margins.base} auto;

            label {
                width: 100%;
                margin: auto;
                display: block;

                color: ${colors.blue.secondary};
                font-family: ${fonts.family.detail};
                font-size: ${fonts.size.sm};
            }

            input {
                width: 70%;
                margin: ${margins.sm} auto;

                border: 0px;
                border-bottom: 1px solid ${colors.blue.secondary};

                text-align: center;

                &::placeholder {
                    color: ${colors.blue.tertiary};
                }
            }
        `;
    }}
`;
const LoginFeedBack = styled.p`
    ${({ theme }) => {
        const { colors, fonts } = theme;
        return css`
            text-align: center;

            color: ${colors.blue.secondary};
            font-size: ${fonts.size.xsm};
            font-weight: 100;
        `;
    }}
`;

const LoginBtn = styled.button`
    ${({ theme }) => {
        const { colors, fonts, margins, paddings } = theme;
        return css`
            width: 30%;
            margin: ${margins.base} 0vw;
            padding: ${paddings.sm} 0vw;

            background-color: ${colors.blue.tertiary};
            border-radius: 10px;

            text-align: center;
            color: ${colors.white};
            font-size: ${fonts.size.base};
        `;
    }}
`;

export default LoginForm;
