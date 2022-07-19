import styled, { css } from "styled-components";
import { useContext, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faCancel,
	faFileCirclePlus,
	faRotateBack,
	faTrashCan,
} from "@fortawesome/free-solid-svg-icons";

import { MemoDispatch } from "pages/Container/MemoContainer";
import MemoElement from "components/main/memo/MemoElement";

const MemoCategory = ({ category, memo }) => {
	const dispatch = useContext(MemoDispatch);

	const [isAddingMemo, setAddingMemo] = useState(false);
	const [addMemo, setAddMemo] = useState({
		title: "",
		desc: "",
	});

	const { title, desc } = addMemo;

	const removeCategory = () => {
		dispatch({
			type: "REMOVE_CATEGORY",
			category,
		});
	};

	const createMemo = () => {
		if (title.length > 0 && desc.length > 0) {
			dispatch({
				type: "CREATE_MEMO",
				category,
				newMemo: {
					title,
					desc,
				},
			});
			resetAddMemoContent();
			setAddingMemo(false);
		}
	};

	const toggleAddMemoSection = () => {
		setAddingMemo((prev) => !prev);
		resetAddMemoContent();
	};

	const changeAddMemoContent = (event) => {
		const { name, value } = event.target;
		setAddMemo({ ...addMemo, [name]: value });
	};

	const resetAddMemoContent = () => {
		setAddMemo({
			title: "",
			desc: "",
		});
	};

	return (
		<Wrapper>
			<Title>
				<h5>{category}</h5>
			</Title>
			<MemoList>
				{memo.map((elm) => (
					<MemoElement key={elm.id} memo={elm} category={category} />
				))}
				<AddMemoElement>
					{isAddingMemo ? (
						<>
							<div className="add-memo">
								<input
									name="title"
									value={title}
									placeholder="추가할 메모 제목 입력"
									onChange={changeAddMemoContent}
								/>
								<input
									name="desc"
									value={desc}
									placeholder="추가할 메모 설명 입력"
									onChange={changeAddMemoContent}
								/>
							</div>
							<div className="sidebar">
								<FontAwesomeIcon icon={faFileCirclePlus} onClick={createMemo} />
								<FontAwesomeIcon
									icon={faRotateBack}
									onClick={resetAddMemoContent}
								/>
								<FontAwesomeIcon
									icon={faCancel}
									onClick={() => toggleAddMemoSection(false)}
								/>
							</div>
						</>
					) : (
						<div className="sidebar">
							<FontAwesomeIcon
								icon={faFileCirclePlus}
								onClick={() => toggleAddMemoSection(true)}
							/>
						</div>
					)}
				</AddMemoElement>
			</MemoList>
			<RemoveCategoryBtn onClick={removeCategory}>
				<FontAwesomeIcon icon={faTrashCan} />
			</RemoveCategoryBtn>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	${({ theme }) => {
		const { colors, margins } = theme;
		return css`
			width: 25vw;
			height: 105vh;

			background-color: ${colors.white};
			color: ${colors.blue.secondary};
		`;
	}}
`;

const Title = styled.div`
	${({ theme }) => {
		const { colors, fonts, paddings } = theme;
		return css`
			width: 100%;
			height: 10%;

			padding: ${paddings.base};

			background-color: ${colors.blue.tertiary};
			text-align: center;

			h5 {
				font-size: ${fonts.size.xl};

				color: ${colors.white};
			}
		`;
	}}
`;

const MemoList = styled.div`
	height: 80%;
	padding: 5% 0%;

	display: flex;
	flex-direction: column;
	align-items: flex-end;
`;

const AddMemoElement = styled.div`
	${({ theme }) => {
		const { colors, fonts, paddings } = theme;
		return css`
			width: 80%;
			margin: 0vw auto;

			.add-memo {
				padding: ${paddings.sm} 0vw;
				background-color: ${colors.blue.quinary};

				display: flex;
				flex-direction: column;
				justify-content: space-evenly;

				input {
					width: 100%;
					border: 0;

					background-color: ${colors.blue.quinary};
					color: ${colors.blue.secondary};
					text-align: center;

					&[name="title"] {
						font-size: ${fonts.size.sm};
						padding-bottom: 0.25rem;
					}

					&[name="desc"] {
						font-size: ${fonts.size.xsm};
						font-weight: 100;
					}

					&::placeholder {
						color: ${colors.blue.secondary};
					}
				}
			}

			.sidebar {
				width: 100%;
				padding: ${paddings.sm} 0vw;

				display: flex;
				justify-content: space-between;

				background-color: ${colors.blue.secondary};
				cursor: pointer;

				text-align: center;
				color: ${colors.white};

				svg {
					margin: auto;
				}
			}
		`;
	}}
`;

const RemoveCategoryBtn = styled.div`
	${({ theme }) => {
		const { colors, fonts } = theme;
		return css`
			width: 100%;
			height: 10%;

			display: flex;
			justify-content: center;
			align-items: center;

			background-color: ${colors.blue.tertiary};
			cursor: pointer;

			text-align: center;
			font-size: ${fonts.size.sm};
			color: ${colors.white};

			svg {
				height: 40%;
			}
		`;
	}}
`;

export default MemoCategory;
