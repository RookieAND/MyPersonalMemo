import styled, { css } from 'styled-components';
import { InformationContent } from 'constants/InformationContent';
import InfoElement from './InfoElement';

const Information = () => {
    return (
        <InformationLayout>
            {InformationContent.map((elm, idx) => (
                <InfoElement key={elm.title} title={elm.title} desc={elm.desc.join('\n')} sequence={idx} />
            ))}
        </InformationLayout>
    );
};

const InformationLayout = styled.div`
    width: 50vw;
    margin: 5vw auto;
`;

export default Information;
