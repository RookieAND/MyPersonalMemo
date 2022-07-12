import styled from 'styled-components';

import Footer from '../common/Footer';
import Header from '../common/Header';

const BaseTemplate = ({ children }) => {
    return (
        <BaseTemplateLayout>
            <Header />
            <div className='content'>{children}</div>
            <Footer />
        </BaseTemplateLayout>
    );
};

const BaseTemplateLayout = styled.div`
    display: flex;
    flex-direction: column;

    & > .content {
        min-height: 90vh;
        display: flex;
        justify-content: center;
    }
`;

export default BaseTemplate;
