import styled, { css } from 'styled-components';

import Title from 'components/common/Title';
import LoginForm from 'components/main/login/LoginForm';

const Login = () => {
    return (
        <Wrapper>
            <Title>
                <h5>Login Account</h5>
                <p>나의 메모 계정 로그인</p>
            </Title>
            <LoginSection>
                <LoginInformation>
                    <h5>Welcome To My Memo!</h5>
                    <p>나만의 메모에 오신 것을 환영합니다!</p>
                </LoginInformation>
                <LoginForm />
            </LoginSection>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    width: 100vw;
    min-height: 100vh;

    background-color: #f2faff;
`;

const LoginSection = styled.div`
    ${({ theme }) => {
        const { colors } = theme;
        return css`
            width: 75%;
            height: 75%;

            margin: auto;
            background-color: ${colors.white};
            border-radius: 25px;

            display: flex;
        `;
    }}
`;

const LoginInformation = styled.div`
    ${({ theme }) => {
        const { colors, fonts } = theme;
        return css`
            width: 50%;
            height: 100%;

            background-color: ${colors.blue.secondary};
            border-radius: 25px 0px 0px 25px;

            text-align: center;

            h5 {
                color: ${colors.white};
                font-family: ${fonts.family.detail};
                font-size: ${fonts.size.xxl};
            }

            p {
                color: ${colors.white};
                font-size: ${fonts.size.sm};
                font-weight: 100;
            }
        `;
    }}
`;

export default Login;
