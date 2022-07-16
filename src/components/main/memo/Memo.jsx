import styled, { css } from "styled-components";
import { useState, useContext, useRef } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";

import { MemoDispatch } from "pages/Container/MemoContainer";
import MemoCategory from "components/main/memo/MemoCategory";

const Memo = ({ mainMemo }) => {
	const [isActive, setActive] = useState(false);
	const [input, setInput] = useState("");

	const dispatch = useContext(MemoDispatch);
	const feedbackMsg = useRef();

	const createCategory = () => {
		if (input.length >= 3) {
			dispatch({
				type: "CREATE_CATEGORY",
				content: {
					category: input,
					memo: [],
				},
			});
			resetInput();
		}
		feedbackMsg.current.innerText = "이름은 3자 이상 입력해주세요.";
	};

	const changeInput = (event) => {
		setInput(event.target.value);
	};

	const resetInput = () => {
		setInput("");
	};

	const toggleBtn = () => {
		setActive((active) => !active);
	};

	return (
		<Wrapper>
			<Title>
				<h5>My Memo List</h5>
				<p>나의 메모 목록</p>
			</Title>
			<MemoLayout>
				{mainMemo.map(({ category, memo }) => (
					<MemoCategory key={category} category={category} memo={memo} />
				))}
				<AddCategory>
					{isActive ? (
						<div className="form">
							<h5>카테고리 추가</h5>
							<input
								placeholder="카테고리 이름 입력"
								onChange={changeInput}
								value={input}
							/>
							<p ref={feedbackMsg}>추가할 카테고리 이름을 입력해주세요.</p>
							<div className="button">
								<button onClick={createCategory}>등록</button>
								<button onClick={resetInput}>초기화</button>
								<button onClick={toggleBtn} className="cancel">
									취소
								</button>
							</div>
						</div>
					) : (
						<div className="text">
							<h5>카테고리 추가</h5>
							<FontAwesomeIcon icon={faCirclePlus} onClick={toggleBtn} />
						</div>
					)}
				</AddCategory>
			</MemoLayout>
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
					content: "";
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

const AddCategory = styled.div`
	${({ theme }) => {
		const { paddings, margins, fonts, colors } = theme;
		return css`
			width: 25%;
			height: 100vh;

			background-color: rgba(255, 255, 255, 0.25);
			border: 4px dotted ${colors.blue.secondary};

			display: flex;
			justify-content: center;
			aligh-item: center;

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

const MemoLayout = styled.div`
	${({ theme }) => {
		const { paddings } = theme;
		return css`
			width: 100vw;
			min-height: 90vh;
			padding: ${paddings.xl};

			display: flex;
			align-items: center;
		`;
	}}
`;

export default Memo;
