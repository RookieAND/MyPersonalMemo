import styled, { css } from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSadCry } from '@fortawesome/free-solid-svg-icons';

import { ExampleMemo } from 'constants/ExampleMemo';
import MemoCategory from 'components/main/memo/MemoCategory';

const Memo = () => {
    return (
        <MemoLayout>
            {Object.entries(ExampleMemo).map(([category, memoList]) => (
                <MemoCategory key={category} category={category} memoList={memoList} />
            ))}
            <div className='add-category'>
                <h5>카테고리 추가하기</h5>
                <FontAwesomeIcon icon={faSadCry} />
            </div>
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
                width: 25%;
                min-height: 70vh;

                margin: 0vw ${margins.base};

                border: 1px solid #005b94;
        `;
    }}
`;

export default Memo;
