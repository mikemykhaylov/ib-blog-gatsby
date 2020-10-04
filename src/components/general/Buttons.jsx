import styled from 'styled-components/macro';
import { Link } from 'gatsby';
import { primaryColor } from '../../constants/websiteColors';

export const PrimaryButton = styled.button`
  background-color: ${primaryColor};
  border-radius: 10px;
  border: none;
  box-sizing: border-box;
  margin: 0;
  padding: 15px 30px;
  text-align: center;
  cursor: pointer;
  transition-duration: 200ms;

  font-family: 'Raleway';
  font-style: normal;
  font-variation-settings: 'wght' 600;
  font-size: 1.5rem;
  line-height: 1.5em;
  color: #ffffff;
`;

export const DestyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  cursor: pointer;
`;
