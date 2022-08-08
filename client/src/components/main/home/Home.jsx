import styled, { css } from 'styled-components';

import bgImg from 'assets/img/background.jpg';
import Information from './Information';

const Home = () => {
    return (
        <Wrapper>
            <Background>
                <div className='title'>
                    <h5>My Personal Memo</h5>
                    <p>
                        나만의 가상 메모 공간, <strong>My Memo.</strong>
                    </p>
                </div>
            </Background>
            <Information />
        </Wrapper>
    );
};

const Wrapper = styled.div`
    width: 100vw;
`;

const Background = styled.div`
    ${({ theme }) => {
        const { colors, fonts, margins } = theme;
        return css`
            width: 100%;
            height: 100vh;
            max-height: 100vh;

            position: relative;
            top: -3vw;

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

export default Home;
