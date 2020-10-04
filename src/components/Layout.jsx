import React from 'react';
import { createGlobalStyle } from 'styled-components';
import { Container, InnerContainer } from './general/Containers';
import Navbar from './general/Navbar';

import fontFaces from '../fonts/fontSetup';

const GlobalStyle = createGlobalStyle`
${fontFaces}
  body {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  background-color: #ffffff;
  font-family: 'Heebo', sans-serif;
  margin: 0;
  font-size: 20px;
}
`;

const Layout = ({ children }) => (
  <>
    <GlobalStyle />
    <Container>
      <InnerContainer>
        <Navbar />
        {children}
      </InnerContainer>
    </Container>
  </>
);

export default Layout;
