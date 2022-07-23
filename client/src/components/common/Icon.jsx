import styled, { css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Icon = styled(FontAwesomeIcon)`
    ${({ theme }) => {
        const { colors, fonts, margins } = theme;
        return css`
            color: ${colors.white};
        `;
    }}
`;
