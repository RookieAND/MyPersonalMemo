import styled, { css } from 'styled-components';

const InfoElement = ({ title, desc, sequence }) => {
    const textDirection = sequence % 2 === 0 ? 'left' : 'right';
    const itemDirection = sequence % 2 === 0 ? 'row' : 'row-reverse';
    return (
        <Wrapper textDirection={textDirection} itemDirection={itemDirection}>
            <Text>
                <h1>{title}</h1>
                <pre>{desc}</pre>
            </Text>
            <Image className='img' />
        </Wrapper>
    );
};

const Wrapper = styled.div`
    ${({ theme, textDirection, itemDirection }) => {
        const { colors } = theme;
        return css`
            min-height: 30vh;
            margin: 5vw auto;

            display: flex;
            flex-direction: ${itemDirection};
            justify-content: space-between;
            align-items: center;

            text-align: ${textDirection};
            color: ${colors.blue.primary};
        `;
    }}
`;

const Text = styled.div`
    ${({ theme }) => {
        const { colors, fonts, margins } = theme;
        return css`
            width: 50%;
            margin: 0vw ${margins.sm};

            h1 {
                margin-bottom: ${margins.xl};
                font-size: ${fonts.size.xxl};
                font-family: ${fonts.family.title};
                line-height: ${fonts.size.xxl};
            }

            pre {
                color: ${colors.blue.secondary};
                font-size: ${fonts.size.xsm};
                font-weight: ${fonts.weight.light};
                line-height: 1.2rem;
            }
        `;
    }}
`;

const Image = styled.div`
    ${({ theme }) => {
        const { colors } = theme;
        return css`
            width: 45%;
            min-height: 30vh;

            border-radius: 20px;
            background-color: ${colors.blue.secondary};
            background-size: cover;
        `;
    }}
`;

export default InfoElement;
