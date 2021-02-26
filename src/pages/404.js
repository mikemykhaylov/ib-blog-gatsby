import React from 'react';
import styled from 'styled-components/macro';
import { PrimaryButton, DestyledLink } from '../components/general/Buttons';
import { Heading1 } from '../components/general/Headings';
import Layout from '../components/Layout';

const NotFoundContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 25vh;
  & > :first-child {
    margin-bottom: 32px;
  }
`;

const NotFound = () => (
  <Layout>
    <NotFoundContainer>
      <Heading1>Looks like you are lost</Heading1>
      <PrimaryButton>
        <DestyledLink to="/page/1">Return back</DestyledLink>
      </PrimaryButton>
    </NotFoundContainer>
  </Layout>
);

export default NotFound;
