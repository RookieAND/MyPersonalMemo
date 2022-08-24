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
            const res = await accountControl.login(id, pw);
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
            <div className='input-wrap'>
                <LoginInput name='id' placeholder='Enter your ID' onChange={insertInput} value={id} />
                <LoginInput
                    name='pw'
                    placeholder='Enter your Password'
                    onChange={insertInput}
                    value={pw}
                    type='Password'
                />
                <LoginFeedBack ref={feedbackMsg}>ID / PW 를 입력해주세요.</LoginFeedBack>
            </div>
            <LoginBtn onClick={submitLogin}>로그인</LoginBtn>
        </Wrapper>
    );
};

const Wrapper = styled.form`
    width: 100%;
    text-align: center;

    .input-wrap {
        padding: 3vw 0vw;
    }
`;

const LoginInput = styled.input`
    ${({ theme }) => {
        const { colors, paddings, margins } = theme;
        return css`
            width: 60%;
            padding: ${paddings.sm};
            margin: ${margins.base} auto;

            border: 0px;
            border-bottom: 1px solid ${colors.blue.secondary};

            text-align: center;

            &::placeholder {
                color: ${colors.blue.tertiary};
                font-weight: 100;
            }
        `;
    }}
`;
const LoginFeedBack = styled.p`
    ${({ theme }) => {
        const { colors, fonts, margins } = theme;
        return css`
            margin: ${margins.sm};
            text-align: center;

            color: ${colors.blue.secondary};
            font-size: ${fonts.size.xsm};
            font-weight: 100;
        `;
    }}
`;

const LoginBtn = styled.button`
    ${({ theme }) => {
        const { colors, fonts, paddings } = theme;
        return css`
            width: 100%;
            margin: 0;
            padding: ${paddings.sm} 0vw;

            background-color: ${colors.blue.tertiary};

            text-align: center;
            color: ${colors.white};
            font-size: ${fonts.size.sm};
        `;
    }}
`;

export default LoginForm;
