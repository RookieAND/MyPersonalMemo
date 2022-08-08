import { useContext, useState } from 'react';
import styled, { css } from 'styled-components';

import { MemoDispatch } from 'pages/Container/MemoContainer';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCancel, faPenToSquare, faRefresh, faTrashCan } from '@fortawesome/free-solid-svg-icons';

const MemoElement = ({ memo, category }) => {
    const [isSidebarActive, setSidebarActive] = useState(false);
    const [isModifyMemo, setModifyMemo] = useState(false);
    const [modifiedMemo, setModifiedMemo] = useState({
        title: '',
        desc: '',
    });

    const memoDispatch = useContext(MemoDispatch);

    const removeMemo = () => {
        console.log(memo);
        memoDispatch({
            type: 'REMOVE_MEMO',
            category,
            id: memo.id,
        });
    };

    const modifyMemo = () => {
        // 먼저, 입력된 수정 사항이 존재하는지를 문자열의 길이를 통해서 파악해야 함.
        if (modifiedMemo.title.length > 0 && modifiedMemo.desc.length > 0) {
            memoDispatch({
                type: 'MODIFY_MEMO',
                category,
                id: memo.id,
                modifiedMemo: {
                    title: modifiedMemo.title,
                    desc: modifiedMemo.desc,
                },
            });

            setModifyMemo(false);
            setModifiedMemo({
                title: '',
                desc: '',
            });
        }
    };

    // 메모 수정 중일때는 Sidebar가 꺼지지 않도록 수정.
    const toggleSideBar = (value) => {
        if (!isModifyMemo) {
            setSidebarActive(value);
        }
    };

    // 수정 작업을 새로 시작하거나 취소할 경우, ModifiedMemo state 초기화 동시 진행.
    const toggleModifySection = (value) => {
        setModifyMemo(value);
        resetModifiedMemo();
    };

    // input 에 값이 추가되었을 경우 이를 state 에 업데이트하는 함수,
    const changeModifiedMemo = (event) => {
        const { name, value } = event.target;
        setModifiedMemo({ ...modifiedMemo, [name]: value });
    };

    // 수정 내용을 담은 ModifiedMemo state 값을 초기화 하는 변수.
    const resetModifiedMemo = () => {
        setModifiedMemo({ title: '', desc: '' });
    };

    return (
        <Wrapper onMouseOver={() => toggleSideBar(true)} onMouseOut={() => toggleSideBar(false)}>
            <MemoContent>
                {isModifyMemo ? (
                    <div className='modify-section'>
                        <input
                            name='title'
                            value={modifiedMemo.title}
                            placeholder='수정할 메모 제목 입력'
                            onChange={changeModifiedMemo}
                        />
                        <input
                            name='desc'
                            value={modifiedMemo.desc}
                            placeholder='수정할 메모 설명 입력'
                            onChange={changeModifiedMemo}
                        />
                    </div>
                ) : (
                    <div className='show-content'>
                        <h5>{memo.title}</h5>
                        <p>{memo.desc}</p>
                    </div>
                )}
            </MemoContent>
            <MemoSidebar isSidebarActive={isSidebarActive}>
                {isModifyMemo ? (
                    <>
                        <FontAwesomeIcon icon={faPenToSquare} onClick={modifyMemo} />
                        <FontAwesomeIcon icon={faRefresh} onClick={resetModifiedMemo} />
                        <FontAwesomeIcon icon={faCancel} onClick={() => toggleModifySection(false)} />
                    </>
                ) : (
                    <>
                        <FontAwesomeIcon icon={faTrashCan} onClick={removeMemo} />
                        <FontAwesomeIcon icon={faPenToSquare} onClick={() => toggleModifySection(true)} />
                    </>
                )}
            </MemoSidebar>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    ${({ theme }) => {
        const { margins } = theme;
        return css`
            width: 80%;
            margin: ${margins.base} auto;
        `;
    }}
`;

const MemoContent = styled.div`
    ${({ theme }) => {
        const { colors, fonts, paddings } = theme;
        return css`
            color: ${colors.blue.tertiary};

            .modify-section {
                padding: ${paddings.sm} 0vw;
                background-color: ${colors.blue.quinary};

                display: flex;
                flex-direction: column;
                justify-content: space-evenly;

                input {
                    border: 0;
                    background-color: ${colors.blue.quinary};

                    color: ${colors.blue.secondary};
                    text-align: center;

                    &[name='title'] {
                        font-size: ${fonts.size.sm};
                        padding-bottom: 0.25rem;
                    }

                    &[name='desc'] {
                        font-size: ${fonts.size.xsm};
                        font-weight: 100;
                    }

                    &::placeholder {
                        color: ${colors.blue.secondary};
                    }
                }
            }

            .show-content {
                border-bottom: solid 1px ${colors.blue.tertiary};
                text-align: center;

                h5 {
                    font-size: ${fonts.size.sm};
                    padding-bottom: 0.25rem;
                }

                p {
                    padding-bottom: ${paddings.sm};
                    font-size: ${fonts.size.xsm};
                    font-weight: 100;
                }
            }
        `;
    }}
`;

const MemoSidebar = styled.div`
    ${({ theme, isSidebarActive }) => {
        const { colors, paddings } = theme;
        return css`
            width: 100%;
            padding: ${paddings.sm} 0vw;

            display: ${isSidebarActive ? 'flex' : 'none'};
            justify-content: space-between;

            background-color: ${colors.blue.tertiary};
            cursor: pointer;

            text-align: center;
            color: ${colors.white};

            svg {
                margin: auto;
            }
        `;
    }}
`;

export default MemoElement;
