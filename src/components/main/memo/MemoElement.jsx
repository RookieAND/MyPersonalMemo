import styled, { css } from "styled-components";

const MemoElement = ({ memo }) => {
	return (
		<MemoElementLayout>
			<h5>{memo.title}</h5>
			<p>{memo.desc}</p>
		</MemoElementLayout>
	);
};

const MemoElementLayout = styled.div`
	${({ theme }) => {
		const { colors, fonts, margins, paddings } = theme;
		return css`
			width: 70%;
			margin: ${margins.base} auto;

			border-bottom: solid 2px ${colors.blue.quaternary};

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

export default MemoElement;
