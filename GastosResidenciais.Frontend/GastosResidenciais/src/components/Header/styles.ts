import { Link } from "react-router-dom"
import styled from "styled-components";

export const HeaderContainer = styled.header`
  background: ${props => props.theme["gray-900"]};
  padding: 2rem 0 2rem;
`;

export const HeaderContent = styled.div`
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;    
  flex-direction: column;
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  font-size: 2rem;
  color: ${(props) => props.theme['gray-100']};
  font-weight: bold;

  &:hover {
    color: ${(props) => props.theme['green-500']};
  }
`
export const HeaderLinks = styled.div`
  width: 100%;
  margin: 0 ;
  padding: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;