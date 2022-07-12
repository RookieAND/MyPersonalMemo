import styled, { css } from 'styled-components';
import { InformationContent } from 'constants/InformationContent';

const Information = () => {
    return (
        <InformationLayout>
            {InformationContent.map((elm, idx) => (
                <InfoElement
                    key={elm.title}
                    title={elm.title}
                    subtitle={elm.subtitle}
                    desc={elm.desc.join('\n')}
                    sequence={idx}
                />
            ))}
        </InformationLayout>
    );
};

const InfoElement = ({ title, subtitle, desc, sequence }) => {
    const direction = sequence % 2 === 0 ? 'left' : 'right';
    return (
        <>
            {sequence % 2 === 0 ? (
                <InformationElement direction={direction}>
                    <div className='text'>
                        <h1>{title}</h1>
                        <pre>{desc}</pre>
                    </div>
                    <div className='img'></div>
                </InformationElement>
            ) : (
                <InformationElement direction={direction}>
                    <div className='img'></div>
                    <div className='text'>
                        <h1>{title}</h1>
                        <p>{subtitle}</p>

                        <div className='desc'>
                            <pre>{desc}</pre>
                        </div>
                    </div>
                </InformationElement>
            )}
        </>
    );
};

// styled-component Section
const InformationLayout = styled.div`
    width: 50vw;
    margin: 5vw auto;
`;

const InformationElement = styled.div`
    ${({ theme, direction }) => {
        const { colors, fonts, margins } = theme;
        return css`
            min-height: 30vh;
            margin: 5vw auto;

            display: flex;
            justify-content: space-between;
            align-items: center;

            text-align: ${direction};
            color: ${colors.blue.primary};

            .text {
                width: 50%;
                margin: 0vw ${margins.sm};

                h1 {
                    margin-bottom: ${margins.xl};
                    font-size: ${fonts.size.xxl};
                    font-family: ${fonts.family.title};
                    line-height: ${fonts.size.xxl};
                }

                pre {
                    color: ${colors.blue.secondary};
                    font-size: ${fonts.size.xsm};
                    font-weight: ${fonts.weight.light};
                    line-height: 1.2rem;
                }
            }

            .img {
                width: 45%;
                min-height: 30vh;

                border-radius: 20px;
                background-color: ${colors.blue.secondary};
                background-size: cover;
            }
        `;
    }}
`;

export default Information;
