import styled, { css } from 'styled-components';

const Footer = () => {
    return (
        <FooterLayout>
            <div className='text'>
                <p>Copyright © 2022 dev_rookiand.co.,Ltd. All rights reserved.</p>
                <p>
                    Contact author for more information. <strong>gwangin1999@naver.com</strong>
                </p>
            </div>
        </FooterLayout>
    );
};

const FooterLayout = styled.footer`
    ${({ theme }) => {
        const { colors, fonts } = theme;
        return css`
            min-height: 8vh;

            background-color: ${colors.blue.quaternary};

            text-align: center;
            color: ${colors.blue.secondary};
            font-size: ${fonts.size.xsm};

            .text {
                height: 4vh;
                padding: 2vh 0vw;
            }

            strong {
                font-weight: ${fonts.weight.bold};
            }
        `;
    }}
`;

export default Footer;
