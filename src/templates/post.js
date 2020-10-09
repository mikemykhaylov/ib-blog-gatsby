/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import { fromUnixTime, formatDistance } from 'date-fns';
import Time from '../components/icons/Time';
import { Heading2, Heading5, Text } from '../components/general/Headings';
import { grayColor, primaryColor } from '../constants/websiteColors';
import Layout from '../components/Layout';

const PostInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  margin-bottom: 1rem;
  flex-direction: column;
  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
  }
`;

const PostTitle = styled(Heading2)`
  margin-bottom: 1rem;
  @media (min-width: 768px) {
    margin-bottom: 0px;
  }
`;

const PostMeta = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  & > *:first-child {
    margin-bottom: 0.5rem;
  }
  @media (min-width: 768px) {
    align-items: flex-end;
  }
`;

const PostTopData = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
  & > *:last-child {
    margin-right: 0.5rem;
  }
  @media (min-width: 768px) {
    flex-direction: row;
    & > *:first-child {
      margin-right: 0.5rem;
    }
    & > *:last-child {
      margin-right: 0px;
    }
  }
`;

const PostBottomData = styled.div`
  display: flex;
  align-items: center;
  & > *:not(:last-child) {
    margin-right: 0.5rem;
  }
`;

const PostImage = styled.div`
  margin-bottom: 2rem;
  /* object-fit: cover; */
  & div {
    max-height: 50vh;
    border-radius: 4px;
  }
`;

const SinglePost = ({ data }) => {
  const { ibBlog, imageSharp } = data;
  const { post: fetchedPost } = ibBlog;
  const postDateFormatted =
    !!fetchedPost.postedOn &&
    `${formatDistance(new Date(), fromUnixTime(fetchedPost.postedOn / 1000))} ago`;
  return (
    <Layout>
      <PostInfo>
        <PostTitle>{fetchedPost.title}</PostTitle>
        <PostMeta>
          <PostTopData>
            <Text>{fetchedPost.author}</Text>
            <Heading5 color={primaryColor}>{`#${fetchedPost.tag}`}</Heading5>
          </PostTopData>
          <PostBottomData>
            <Time color={grayColor} height={16} />
            <Text color={grayColor}>{`${fetchedPost.readingTime} min read`}</Text>
            <Text color={grayColor}>|</Text>
            <Text color={grayColor}>{postDateFormatted}</Text>
          </PostBottomData>
        </PostMeta>
      </PostInfo>
      <PostImage>
        <Img fluid={imageSharp.fluid} />
      </PostImage>
      {!!fetchedPost.content &&
        fetchedPost.content.split('\n').map((paragraph, i) => {
          return (
            <React.Fragment key={i}>
              <Text>{paragraph}</Text>
              <br />
            </React.Fragment>
          );
        })}
    </Layout>
  );
};

SinglePost.propTypes = {
  data: PropTypes.shape({
    ibBlog: PropTypes.shape({
      post: PropTypes.shape({
        author: PropTypes.string,
        description: PropTypes.string,
        postedOn: PropTypes.string,
        tag: PropTypes.string,
        title: PropTypes.string,
        indexName: PropTypes.string,
        readingTime: PropTypes.number,
        content: PropTypes.string,
      }),
    }),
  }).isRequired,
};

export default SinglePost;

export const query = graphql`
  query GetPost($indexName: ID!, $image: String!) {
    ibBlog {
      post(id: $indexName) {
        _id
        author
        content
        indexName
        postedOn
        readingTime
        tag
        title
      }
    }
    imageSharp(original: { src: { regex: $image } }) {
      fluid(maxWidth: 1200) {
        ...GatsbyImageSharpFluid
      }
    }
  }
`;
