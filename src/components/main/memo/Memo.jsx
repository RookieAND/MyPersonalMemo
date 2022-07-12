import styled, { css } from 'styled-components';

import { ExampleMemo } from 'constants/ExampleMemo';
import MemoCategory from 'components/main/memo/MemoCategory';

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

export default Memo;
