import styled, { css } from 'styled-components';
import { useState, useContext, useRef, useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleChevronLeft, faCircleChevronRight, faCirclePlus } from '@fortawesome/free-solid-svg-icons';

import { MemoDispatch } from 'pages/Container/MemoContainer';
import MemoCategory from 'components/main/memo/MemoCategory';

const Memo = ({ mainMemo }) => {
    // Carousel 영역과 피드백 메세지 DOM 을 가리키는 Ref 선언.
    const memoCarousel = useRef(null);
    const feedbackMsg = useRef(null);

    // 새로운 카테고리 추가와 관련된 state 선언.
    const [isActive, setActive] = useState(false);
    const [input, setInput] = useState('');

    // Memo Carousel 과 관련된 state 선언.
    const totalCategoryAmount = mainMemo.length;
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        memoCarousel.current.style.transition = 'all 0.5s ease-in-out';
        memoCarousel.current.style.transform = `translateX(-${26.25 * currentSlide}vw)`;
    }, [currentSlide]);

    const dispatch = useContext(MemoDispatch);

    // 카테고리를 새롭게 생성하기 위한 함수.
    const createCategory = () => {
        // 입력 값의 길이가 3글자 이하일 경우를 체크하는 파트.
        if (input.length < 3) {
            feedbackMsg.current.innerText = '이름은 3자 이상 입력해주세요.';
            return;
        }

        // mainMemo의 input 이름의 카테고리가 존재하는지를 체크하는 파트.
        if (mainMemo.input ?? false) {
            feedbackMsg.current.innerText = '이미 존재하는 카테고리 입니다.';
            return;
        }

        dispatch({
            type: 'CREATE_CATEGORY',
            content: {
                category: input,
                memo: [],
            },
        });
        resetInput();
        setActive(false);
    };

    const changeInput = (event) => {
        setInput(event.target.value);
    };

    const resetInput = () => {
        setInput('');
    };

    // carousel 버튼 클릭 시 슬라이드가 넘어가게 하는 함수
    const slideCarousel = (direction) => {
        switch (direction) {
            case 'left':
                if (currentSlide > 0) {
                    setCurrentSlide(currentSlide - 1);
                }
                break;
            case 'right':
                if (currentSlide < totalCategoryAmount - 1) {
                    setCurrentSlide(currentSlide + 1);
                }
                break;
            default:
                return;
        }
    };

    return (
        <Wrapper>
            <Title>
                <h5>My Memo List</h5>
                <p>나의 메모 목록</p>
            </Title>
            <MemoList>
                <MemoCarouselBtn>
                    {currentSlide > 0 && (
                        <FontAwesomeIcon icon={faCircleChevronLeft} onClick={() => slideCarousel('left')} />
                    )}
                </MemoCarouselBtn>
                <div className='carousel'>
                    <MemoCategoryList totalCategoryAmount={totalCategoryAmount} ref={memoCarousel}>
                        {mainMemo.map(({ category, memo }) => (
                            <MemoCategory key={category} category={category} memo={memo} />
                        ))}
                        <AddCategory>
                            {isActive ? (
                                <div className='form'>
                                    <h5>카테고리 추가</h5>
                                    <input placeholder='카테고리 이름 입력' onChange={changeInput} value={input} />
                                    <p ref={feedbackMsg}>추가할 카테고리 이름을 입력해주세요.</p>
                                    <div className='button'>
                                        <button onClick={createCategory}>등록</button>
                                        <button onClick={resetInput}>초기화</button>
                                        <button onClick={() => setActive(false)} className='cancel'>
                                            취소
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className='text'>
                                    <h5>카테고리 추가</h5>
                                    <FontAwesomeIcon icon={faCirclePlus} onClick={() => setActive(true)} />
                                </div>
                            )}
                        </AddCategory>
                    </MemoCategoryList>
                </div>
                <MemoCarouselBtn>
                    {currentSlide < totalCategoryAmount - 1 && (
                        <FontAwesomeIcon icon={faCircleChevronRight} onClick={() => slideCarousel('right')} />
                    )}
                </MemoCarouselBtn>
            </MemoList>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    width: 100%;
    min-height: 90vh;

    background-color: #f2faff;
`;

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

const MemoList = styled.div`
    width: 100%;

    display: flex;

    .carousel {
        width: 80%;
        overflow: hidden;
    }
`;

const MemoCategoryList = styled.div`
    ${({ theme, totalCategoryAmount }) => {
        const { paddings } = theme;
        return css`
            width: ${`${25 * (totalCategoryAmount + 1) + 1.25 * totalCategoryAmount}vw`};
            min-height: 100vh;
            padding-bottom: ${paddings.xl};

            display: flex;
            justify-content: space-between;
            align-items: center;
        `;
    }}
`;

const MemoCarouselBtn = styled.button`
    ${({ theme }) => {
        const { fonts, colors } = theme;
        return css`
            width: 11.25vw;
            background-color: transparent;

            position: relative;
            top: 0;

            color: ${colors.blue.secondary};
            font-size: ${fonts.size.xl};
        `;
    }}
`;

const AddCategory = styled.div`
    ${({ theme }) => {
        const { paddings, margins, fonts, colors } = theme;
        return css`
            width: 25vw;
            height: 100vh;

            background-color: rgba(255, 255, 255, 0.25);
            border: 4px dotted ${colors.blue.secondary};

            display: flex;
            justify-content: center;
            align-items: center;

            text-align: center;
            color: ${colors.blue.secondary};

            .text {
                margin: auto;
                max-height: 30vh;
            }

            .form {
                margin: auto;
                min-height: 25vh;

                display: flex;
                flex-direction: column;
                justify-content: space-evenly;
                align-items: center;

                p {
                    font-size: ${fonts.size.xsm};
                }

                button {
                    margin: 0 ${margins.base};
                    padding: ${paddings.sm};

                    background: ${colors.blue.secondary};
                    border-radius: 10px;
                    cursor: pointer;

                    color: ${colors.white};

                    &.cancel {
                        background: ${colors.red};
                    }
                }

                input {
                    width: 100%;
                    padding: ${paddings.sm} 0vw;
                    margin: 0vw auto;

                    border: 1px solid ${colors.blue.secondary};
                    text-align: center;

                    &::placeholder {
                        color: ${colors.blue.quinary};
                    }
                }

                &.button {
                    margin: ${margins.base} 0;
                    width: 100%;
                }
            }

            h5 {
                font-size: ${fonts.size.lg};
            }

            svg {
                margin: ${margins.base} 0;
                font-size: ${fonts.size.title};
                cursor: pointer;
            }
        `;
    }}
`;

export default Memo;
