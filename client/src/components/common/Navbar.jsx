import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { AuthState } from 'module/Auth';
import { accountControl } from 'api/accountControl';

const Navbar = () => {
    const authInfo = useRecoilValue(AuthState);
    const isLogin = authInfo.authenticated;
    return (
        <NavbarLayout>
            <LinkElement to='/'>Main</LinkElement>
            {!isLogin ? (
                <>
                    <LinkElement to='/login'>Login</LinkElement>
                    <LinkElement to='/register'>Register</LinkElement>
                </>
            ) : (
                <>
                    <LinkElement to='/memo'>Memo</LinkElement>
                    <LinkElement to='/' onClick={accountControl.logout}>
                        Logout
                    </LinkElement>
                </>
            )}
        </NavbarLayout>
    );
};

const NavbarLayout = styled.ul`
    width: 50vw;
    height: 3vw;

    margin: 0vw auto;

    display: flex;
    align-items: center;
    justify-content: space-between;

    text-align: center;
`;

const LinkElement = styled(Link)`
    ${({ theme }) => {
        const { colors, fonts } = theme;
        return css`
            color: ${colors.blue.quinary};
            font-family: ${fonts.family.detail};
            font-size: ${fonts.size.sm};

            vertical-align: middle;
            transform: 0.5s all cubic-bezier(0.21, 0.76, 0.81, 0.31);

            &:hover {
                color: ${colors.blue.tertiary};

                &::after {
                    border-bottom: 2px solid ${colors.blue.tertiary};
                }
            }

            &::after {
                content: '';
                display: block;
                margin: auto;
                border-bottom: 2px solid ${colors.blue.quinary};
                width: ${fonts.size.sm};
            }
        `;
    }}
`;

export default Navbar;
