import styled, { css } from 'styled-components';
import { useState, useRef } from 'react';

import { sendLoginInfo } from 'api/sendLoginInfo.js';
import { regFailFeedbackMsg } from 'constants/RegFailFeedback';

const RegisterForm = () => {
    const feedbackMsg = useRef();
    const [registerInput, setRegisterInput] = useState({
        id: '',
        pw: '',
    });

    const submitRegister = async (event) => {
        event.preventDefault();
        const { id, pw } = registerInput;

        // ID 혹은 PW 둘 중 하나라도 입력하지 않았다면, 에러 메세지 출력
        if (id.length * pw.length === 0) {
            feedbackMsg.current.innerText = regFailFeedbackMsg['002'];
            return;
        }
        const response = await sendLoginInfo(id, pw);

        // 만약 입력한 계정 정보가 존재하지 않는다면, 에러 메세지 출력
        if (response.status === 'fail') {
            feedbackMsg.current.innerText = regFailFeedbackMsg['001'];
            return;
        }
    };

    const insertInput = (event) => {
        const { name, value } = event.target;
        setRegisterInput({ ...registerInput, [name]: value });
    };

    return (
        <Wrapper>
            <RegisterInput name='login-id'>
                <label htmlFor='id'>Username</label>
                <input id='id' name='id' placeholder='ID를 입력해주세요.' onChange={insertInput} />
            </RegisterInput>
            <RegisterInput name='login-id'>
                <label htmlFor='pw'>Password</label>
                <input id='pw' name='pw' placeholder='PW를 입력해주세요.' onChange={insertInput} />
            </RegisterInput>
            <RegisterFeedBack ref={feedbackMsg}>ID / PW 를 입력해주세요.</RegisterFeedBack>
            <RegisterBtn onClick={submitRegister}>Login</RegisterBtn>
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

const RegisterInput = styled.div`
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
const RegisterFeedBack = styled.p`
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

const RegisterBtn = styled.button`
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

export default RegisterForm;
