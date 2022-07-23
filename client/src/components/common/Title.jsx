import styled, { css } from 'styled-components';

const Title = styled.div`
    ${({ theme }) => {
        const { margins, fonts, colors } = theme;
        return css`
            margin: ${margins.xl} auto;
            color: ${colors.blue.secondary};

            h5 {
                margin: 0;
                text-align: center;
                font-weight: ${fonts.weight.bold};
                font-size: ${fonts.size.xl};

                &::after {
                    content: '';
                    display: block;

                    width: ${fonts.size.xl};
                    margin: 0.25vw auto 0.5vw auto;
                    border-bottom: 3px solid #141414;
                }
            }

            p {
                margin: 0;
                text-align: center;
                font-size: ${fonts.size.sm};
            }
        `;
    }}
`;

export default Title;
