import styled, { css } from 'styled-components';
import { useState, useRef } from 'react';

import { sendLoginInfo } from 'api/sendLoginInfo.js';

const LoginForm = () => {
    const feedbackMsg = useRef();
    const [loginInput, setLoginInput] = useState({
        id: '',
        pw: '',
    });

    const submitLogin = (event) => {
        event.preventDefault();
        const { id, pw } = loginInput;

        // ID 혹은 PW 둘 중 하나라도 입력하지 않았다면
        console.log(id.length, pw.length);
        if (id.length * pw.length === 0) {
            feedbackMsg.current.innerText = 'ID 혹은 PW를 입력하지 않았습니다.';
            return;
        }
        sendLoginInfo(id, pw);
    };

    const insertInput = (event) => {
        const { name, value } = event.target;
        setLoginInput({ ...loginInput, [name]: value });
    };

    return (
        <Wrapper>
            <LoginInput name='login-id'>
                <label htmlFor='id'>Username</label>
                <input id='id' name='id' placeholder='ID를 입력해주세요.' onChange={insertInput} />
            </LoginInput>
            <LoginInput name='login-id'>
                <label htmlFor='pw'>Password</label>
                <input id='pw' name='pw' placeholder='PW를 입력해주세요.' onChange={insertInput} />
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

                &::placeholder {
                    color: ${colors.blue.tertiary};
                    text-align: center;
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
