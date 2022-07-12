import styled, { css } from 'styled-components';

import MemoElement from 'components/main/memo/MemoElement';

const MemoCategory = ({ category, memoList }) => {
    return (
        <MemoCategoryLayout>
            <h5>{category}</h5>
            <div className='list'>
                {memoList.map((elm) => (
                    <MemoElement key={elm.title} memo={elm} />
                ))}
            </div>
        </MemoCategoryLayout>
    );
};

const MemoCategoryLayout = styled.div`
    ${({ theme }) => {
        const { colors, fonts, paddings, margins } = theme;
        return css`
            width: 25%;
            min-height: 70vh;
            padding: ${paddings.base};
            margin: 0vw ${margins.base};

            background-color: ${colors.white};

            display: flex;
            flex-direction: column;
            align-items: center;

            color: ${colors.blue.secondary};

            & > h5 {
                font-size: ${fonts.size.xl};
                margin: ${margins.base} auto ${margins.xl} auto;

                &::after {
                    content: '';
                    width: ${fonts.size.xl};
                }
            }

            .list {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                align-items: flex-end;
            }
        `;
    }}
`;

export default MemoCategory;
