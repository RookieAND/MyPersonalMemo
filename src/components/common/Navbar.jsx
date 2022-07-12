import styled, { css } from 'styled-components';

const Navbar = () => {
    return (
        <NavbarLayout>
            <li>Main</li>
            <li>Guide</li>
            <li>Login</li>
        </NavbarLayout>
    );
};

const NavbarLayout = styled.ul`
    ${({ theme }) => {
        const { colors, fonts } = theme;
        return css`
            width: 50vw;
            height: 3vw;

            margin: 0vw auto;

            display: flex;
            align-items: center;
            justify-content: space-between;

            text-align: center;

            & > li {
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
            }
        `;
    }}
`;

export default Navbar;
