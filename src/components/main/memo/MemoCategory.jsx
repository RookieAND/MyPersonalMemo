import styled, { css } from "styled-components";
import { useContext } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

import { MemoDispatch } from "pages/Container/MemoContainer";
import MemoElement from "components/main/memo/MemoElement";

const MemoCategory = ({ category, memo }) => {
	const dispatch = useContext(MemoDispatch);

	const removeCategory = () => {
		dispatch({
			type: "REMOVE_CATEGORY",
			category,
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
			</MemoList>
			<RemoveBtn onClick={removeCategory}>
				<FontAwesomeIcon icon={faTrashCan} />
			</RemoveBtn>
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

const RemoveBtn = styled.div`
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
