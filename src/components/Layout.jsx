import React from 'react';
import { createGlobalStyle } from 'styled-components';
import { graphql, useStaticQuery } from 'gatsby';
import { Helmet } from 'react-helmet';
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

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query GetSiteMetadata {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);
  return (
    <>
      <Helmet>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edges" />
        <title>{data.site.siteMetadata.title}</title>
      </Helmet>
      <GlobalStyle />
      <Container>
        <InnerContainer>
          <Navbar />
          {children}
        </InnerContainer>
      </Container>
    </>
  );
};

export default Layout;
