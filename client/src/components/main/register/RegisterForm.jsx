import styled, { css } from 'styled-components';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { registerAccount } from 'api/registerAccount';
import { RegisterFeedbackMsg } from 'constants/FeedbackMsg';

const RegisterForm = () => {
    const feedbackMsg = useRef();
    const [registerInput, setRegisterInput] = useState({
        id: '',
        pw: '',
    });
    const { id, pw } = registerInput;
    const navigate = useNavigate();

    const submitRegister = async (event) => {
        event.preventDefault();

        // ID 혹은 PW 둘 중 하나라도 입력하지 않았다면, 에러 메세지 출력
        if (id.length * pw.length === 0) {
            feedbackMsg.current.innerText = RegisterFeedbackMsg['002'];
            resetInput();
            return;
        }

        // 만약 입력한 계정 정보가 존재하지 않는다면, 에러 메세지 출력
        let res;
        try {
            res = await registerAccount(id, pw);
        } catch (err) {
            throw new Error(err);
        }

        if (res.result === 'failure') {
            feedbackMsg.current.innerText = RegisterFeedbackMsg[res.errcode];
            resetInput();
            return;
        }

        // 최종적으로 로그인에 성공했다면, 로그인 페이지로 유저를 이동시켜야 함.
        feedbackMsg.current.innerText = '정상적으로 가입 처리가 완료되었습니다.';
        resetInput();
        setTimeout(() => navigate('/'), 750);
    };

    const insertInput = (event) => {
        const { name, value } = event.target;
        setRegisterInput({ ...registerInput, [name]: value });
    };

    const resetInput = () => {
        setRegisterInput({ id: '', pw: '' });
    };

    return (
        <Wrapper>
            <RegisterInput>
                <label htmlFor='id'>Username</label>
                <input id='id' name='id' placeholder='등록할 ID를 입력해주세요.' onChange={insertInput} value={id} />
            </RegisterInput>
            <RegisterInput>
                <label htmlFor='pw'>Password</label>
                <input
                    id='pw'
                    name='pw'
                    placeholder='등록할 PW를 입력해주세요.'
                    onChange={insertInput}
                    value={pw}
                    type='Password'
                />
            </RegisterInput>
            <RegisterFeedBack ref={feedbackMsg}>{RegisterFeedbackMsg['000']}</RegisterFeedBack>
            <RegisterBtn onClick={submitRegister}>Sign up</RegisterBtn>
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

                text-align: center;

                &::placeholder {
                    color: ${colors.blue.tertiary};
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
