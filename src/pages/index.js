import React from 'react';
import styled from 'styled-components';
import Layout from '../components/Layout';
import { Heading2, Text } from '../components/general/Headings';

const MainHeading = styled(Heading2)`
  margin-bottom: 2rem;
`;

const MainText = styled(Text)`
  width: 100%;
  margin-bottom: 2.5rem !important;
  @media (min-width: 576px) {
    width: 60%;
  }
`;

export default function Home() {
  return (
    <Layout>
      <MainHeading>Let&apos;s talk science</MainHeading>
      <MainText>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facilis voluptate exercitationem
        earum, possimus deleniti sed? Dolorum quae velit pariatur provident ducimus, beatae rerum
        dolorem ut deleniti nam facere, molestiae illum!
      </MainText>
    </Layout>
  );
}
