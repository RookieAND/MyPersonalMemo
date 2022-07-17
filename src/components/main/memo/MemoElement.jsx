import { useContext, useState } from "react";
import styled, { css } from "styled-components";

import { MemoDispatch } from "pages/Container/MemoContainer";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";

const MemoElement = ({ memo, category }) => {
	const [isActive, setActive] = useState(false);
	const dispatch = useContext(MemoDispatch);

	const toggleMemoOption = () => {
		setActive((prev) => !prev);
	};

	const removeMemo = () => {
		dispatch({
			type: "REMOVE_MEMO",
			category,
			id: memo.id,
		});
	};

	return (
		<Wrapper
			onMouseOver={() => toggleMemoOption(true)}
			onMouseOut={() => toggleMemoOption(false)}
		>
			<MemoContent>
				<h5>{memo.title}</h5>
				<p>{memo.desc}</p>
			</MemoContent>
			<MemoModify isActive={isActive} onClick={removeMemo}>
				<FontAwesomeIcon icon={faTrashCan} />
			</MemoModify>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	${({ theme }) => {
		const { margins } = theme;
		return css`
			width: 70%;
			margin: ${margins.base} auto;
		`;
	}}
`;

const MemoContent = styled.div`
	${({ theme }) => {
		const { colors, fonts, margins, paddings } = theme;
		return css`
			border-bottom: solid 1px ${colors.blue.tertiary};

			color: ${colors.blue.tertiary};
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
		`;
	}}
`;

const MemoModify = styled.button`
	${({ theme, isActive }) => {
		const { colors, fonts, margins, paddings } = theme;
		return css`
			width: 100%;
			padding: ${paddings.sm} 0vw;

			display: ${isActive ? "block" : "none"};

			background-color: ${colors.blue.tertiary};
			cursor: pointer;
			color: ${colors.white};
		`;
	}}
`;

export default MemoElement;
