import styled, { css } from 'styled-components';
import bgImg from 'assets/img/background.jpg';
import Navbar from './Navbar';

const Header = () => {
    return (
        <HeaderLayout>
            <HeaderBackground>
                <Navbar />
                <div className='title'>
                    <h5>My Personal Memo</h5>
                    <p>
                        나만의 가상 메모 공간, <strong>My Memo.</strong>
                    </p>
                </div>
            </HeaderBackground>
        </HeaderLayout>
    );
};

const HeaderLayout = styled.header`
    width: 100vw;

    margin: auto;
    position: relative;

    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const HeaderBackground = styled.div`
    ${({ theme }) => {
        const { colors, fonts, margins } = theme;
        return css`
            width: 100vw;
            height: 20vw;
            min-height: 50vh;

            background-image: url(${bgImg});
            background-size: cover;

            & > .title {
                color: ${colors.blue.tertiary};
                position: relative;
                top: 27.5%;
                left: 5%;

                h5 {
                    margin-bottom: ${margins.base};
                    font-family: ${fonts.family.title};
                    font-size: ${fonts.size.title};
                }

                p {
                    font-size: ${fonts.size.lg};
                    font-weight: 100;
                }

                strong {
                    font-weight: 700;
                }
            }
        `;
    }}
`;

export default Header;
