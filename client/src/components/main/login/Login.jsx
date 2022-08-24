import styled, { css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

import LoginForm from 'components/main/login/LoginForm';
import useModal from 'hooks/useModal';

const Login = () => {
    const { closeModal } = useModal();
    return (
        <Wrapper>
            <ModalHeader>
                <h5>Login Account</h5>
                <ModalCloseBtn icon={faXmark} onClick={closeModal} />
            </ModalHeader>
            <LoginForm />
            <RegisterBtn>회원가입</RegisterBtn>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    width: 25vw;

    margin: auto;
    background-color: #ffffff;
`;

const ModalHeader = styled.header`
    ${({ theme }) => {
        const { colors, fonts, paddings } = theme;
        return css`
            width: 100%;
            padding: ${paddings.base} ${paddings.base};

            background-color: ${colors.blue.secondary};
            border-radius: 10px 10px 0px 0px;
            color: ${colors.white};

            display: flex;
            justify-content: space-between;

            h5 {
                font-size: ${fonts.size.sm};
            }
        `;
    }}
`;

const ModalCloseBtn = styled(FontAwesomeIcon)`
    ${({ theme }) => {
        const { colors, fonts } = theme;
        return css`
            color: ${colors.white};
            font-size: ${fonts.size.base};
        `;
    }}
`;

const RegisterBtn = styled.button`
    ${({ theme }) => {
        const { colors, fonts, paddings } = theme;
        return css`
            width: 100%;
            margin: 0vw;
            padding: ${paddings.sm} 0vw;

            background-color: ${colors.blue.secondary};

            text-align: center;
            color: ${colors.white};
            font-size: ${fonts.size.sm};
        `;
    }}
`;

export default Login;
