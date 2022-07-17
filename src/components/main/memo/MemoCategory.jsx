import styled, { css } from "styled-components";
import { useContext, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faFileCirclePlus,
	faTrashCan,
} from "@fortawesome/free-solid-svg-icons";

import { MemoDispatch } from "pages/Container/MemoContainer";
import MemoElement from "components/main/memo/MemoElement";

const MemoCategory = ({ category, memo }) => {
	const dispatch = useContext(MemoDispatch);

	const [addMemo, setAddMemo] = useState({
		isActive: false,
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
					id: 100,
				},
			});
			resetAddMemoInput();
		}
	};

	const toggleAddMemoSection = () => {
		setAddMemo({ ...addMemo, isActive: true });
	};

	const changeAddMemoInput = (event) => {
		const { name, value } = event.target;
		setAddMemo({ ...addMemo, [name]: value });
	};

	const resetAddMemoInput = () => {
		setAddMemo({
			isActive: false,
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
				<AddMemoSection>
					{addMemo.isActive ? (
						<div className="add-memo">
							<input
								name="title"
								placeholder="제목"
								value={title}
								onChange={changeAddMemoInput}
							/>
							<input
								name="desc"
								placeholder="설명"
								value={desc}
								onChange={changeAddMemoInput}
							/>
							<FontAwesomeIcon icon={faFileCirclePlus} onClick={createMemo} />
						</div>
					) : (
						<FontAwesomeIcon
							icon={faFileCirclePlus}
							onClick={toggleAddMemoSection}
						/>
					)}
				</AddMemoSection>
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
			width: 25%;
			height: 100vh;
			margin: 0vw ${margins.base};

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

const AddMemoSection = styled.div`
	${({ theme }) => {
		const { colors, fonts, paddings } = theme;
		return css`
			width: 70%;
			padding: ${paddings.sm} 0vw;
			margin: 0vw auto;

			background-color: ${colors.blue.secondary};

			font-size: ${fonts.size.base};
			color: ${colors.white};
			text-align: center;

			.add-memo {
				input {
					width: 100%;
					text-align: center;
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
