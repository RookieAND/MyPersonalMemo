import styled, { css } from 'styled-components';

const MemoElement = ({ memo }) => {
    return (
        <MemoElementLayout>
            <h5>{memo.title}</h5>
            <p>{memo.desc}</p>
        </MemoElementLayout>
    );
};

const MemoElementLayout = styled.div`
    ${({ theme }) => {
        const { colors, fonts, margins, paddings } = theme;
        return css`
            margin: ${margins.sm} auto;
            padding: ${paddings.sm};

            background-color: ${colors.blue.quinary};
            box-shadow: 0px 2px 1px ${colors.blue.tertiary};

            color: ${colors.blue.tertiary};
            text-align: center;

            h5 {
                font-size: ${fonts.size.sm};
            }

            p {
                font-size: ${fonts.size.xsm};
                font-weight: 100;
            }
        `;
    }}
`;

export default MemoElement;
