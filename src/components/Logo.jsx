import styled from 'styled-components';

const Logo = () => {
    return (
        <Wrapper>            
            <span>Visionary</span>Vibe           
        </Wrapper>
    );
};

const Wrapper = styled.h3`
  margin-bottom: 0;
  color: var(--clr-grey-1);
  span {
    color: var(--clr-red-dark);
  }
`;

export default Logo;