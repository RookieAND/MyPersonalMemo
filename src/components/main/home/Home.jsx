import styled from 'styled-components';
import Information from './Information';

const Home = () => {
    return (
        <HomeLayout>
            <Information />
        </HomeLayout>
    );
};

const HomeLayout = styled.div`
    width: 100vw;
    min-height: 90vh;

    background-color: #f2faff;
`;

export default Home;
