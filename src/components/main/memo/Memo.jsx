import styled, { css } from 'styled-components';

import { ExampleMemo } from 'constants/ExampleMemo';

const Memo = () => {
    return (
        <MemoLayout>
            {Object.entries(ExampleMemo).map(([category, memoList]) => (
                <MemoCategory key={category} category={category} memoList={memoList} />
            ))}
            <div className='add-category'></div>
        </MemoLayout>
    );
};

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

const MemoElement = ({ memo }) => {
    return (
        <MemoElementLayout>
            <h5>{memo.title}</h5>
            <p>{memo.desc}</p>
        </MemoElementLayout>
    );
};

const MemoLayout = styled.div`
    ${({ theme }) => {
        const { margins } = theme;
        return css`
            width: 100vw;
            min-height: 90vh;
            padding: 0vw 5vw;

            background-color: #f2faff;

            display: flex;
            align-items: center;

            .add-category {
                width: 30%;
                min-height: 70vh;

                margin: 0vw ${margins.base};

                border: 1px solid #005b94;
        `;
    }}
`;

const MemoCategoryLayout = styled.div`
    ${({ theme }) => {
        const { colors, fonts, paddings, margins } = theme;
        return css`
            width: 30%;
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

const MemoElementLayout = styled.div`
    ${({ theme }) => {
        const { colors, fonts, margins, paddings } = theme;
        return css`
            margin: ${margins.sm} 0vw;
            padding: ${paddings.base} ${paddings.xl};

            background-color: ${colors.blue.quinary};
            box-shadow: 0px 2px 1px ${colors.blue.tertiary};

            color: ${colors.blue.tertiary};

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

export default Memo;
