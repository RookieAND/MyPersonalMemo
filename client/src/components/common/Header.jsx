import styled, { css } from 'styled-components';
import bgImg from 'assets/img/background.jpg';
import Navbar from './Navbar';

const Header = () => {
    return (
        <Wrapper>
            <Navbar />
        </Wrapper>
    );
};

const Wrapper = styled.header`
    width: 100%;

    margin: auto;
    position: relative;
    z-index: 1000;

    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export default Header;
