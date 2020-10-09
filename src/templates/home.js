import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { graphql, navigate } from 'gatsby';
import { useLazyQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { fromUnixTime } from 'date-fns';
import queryString from 'query-string';
import Layout from '../components/Layout';
import { Heading2, Text } from '../components/general/Headings';
import Post from '../components/general/Post';
import { DestyledLink, PrimaryButton } from '../components/general/Buttons';
import { lightPrimaryColor, primaryColor } from '../constants/websiteColors';
import Loading from '../components/general/Loading';

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

const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 2.5rem;
  & > *:not(:last-child) {
    margin-right: 32px;
  }
`;

const TagFilter = styled.button`
  font-family: 'Raleway';
  font-variation-settings: 'wght' 700;
  font-size: 1rem;
  color: ${(props) => (props.active ? '#ffffff' : primaryColor)};
  background-color: ${(props) => (props.active ? primaryColor : lightPrimaryColor)};
  border: none;
  border-radius: 5px;
  padding: 8px 16px;
  transition-duration: 200ms;
  cursor: pointer;
  &:hover {
    color: #ffffff;
    background-color: ${primaryColor};
  }
`;

const PostsRow = styled.section`
  width: 100%;
  display: grid;
  gap: 60px;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  grid-auto-rows: min-content;
  @media (min-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }
  margin-bottom: 60px;
`;

const LoadMoreContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 60px;
  & > *:first-child {
    margin-right: 32px;
  }
`;

export const APOLLO_QUERY = gql`
  query GetPage($pageNumber: Int, $pageSize: Int, $tag: String) {
    posts(pageNumber: $pageNumber, pageSize: $pageSize, tag: $tag) {
      hasMore
      posts {
        author
        description
        indexName
        image
        postedOn
        tag
        title
        readingTime
        _id
      }
    }
  }
`;

const Home = ({ data, location, pageContext }) => {
  const { posts: gatsbyPosts } = data.ibBlog.posts;

  const tags = ['All', ...new Set([...gatsbyPosts.map((post) => post.tag)])];
  const [currentTagFilter, setCurrentTagFilter] = useState(
    queryString.parse(location.search).tag || 'All',
  );

  const [loadWithTags, { data: apolloData }] = useLazyQuery(APOLLO_QUERY, {
    skip: currentTagFilter === 'All',
    variables: {
      pageNumber: pageContext.pageNumber,
      pageSize: 28,
      tag: currentTagFilter !== 'All' ? currentTagFilter : null,
    },
  });

  useEffect(() => {
    loadWithTags();
    return () => {};
  }, [currentTagFilter]);

  const handleTagFilterChange = (tag) => {
    navigate(`/page/1${tag !== 'All' ? `?tag=${tag}` : ''}`);
    setCurrentTagFilter(tag);
  };

  let pageContent;

  if (currentTagFilter === 'All') {
    pageContent = (
      <PostsRow>
        {gatsbyPosts.map((post, i) => (
          <Post
            key={post._id}
            isHuge={i % 7 === 0}
            author={post.author}
            description={post.description}
            image={post.image}
            postedOn={fromUnixTime(post.postedOn / 1000)}
            tag={post.tag}
            title={post.title}
            indexName={post.indexName}
            readingTime={post.readingTime}
          />
        ))}
      </PostsRow>
    );
  } else if (apolloData) {
    pageContent = (
      <PostsRow>
        {apolloData.posts.posts.map((post, i) => (
          <Post
            key={post._id}
            isHuge={i % 7 === 0}
            author={post.author}
            description={post.description}
            image={post.image}
            postedOn={fromUnixTime(post.postedOn / 1000)}
            tag={post.tag}
            title={post.title}
            indexName={post.indexName}
            readingTime={post.readingTime}
          />
        ))}
      </PostsRow>
    );
  } else {
    pageContent = <Loading height="100px" width="100%" />;
  }
  return (
    <Layout>
      <MainHeading>Let&apos;s talk science</MainHeading>
      <MainText>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facilis voluptate exercitationem
        earum, possimus deleniti sed? Dolorum quae velit pariatur provident ducimus, beatae rerum
        dolorem ut deleniti nam facere, molestiae illum!
      </MainText>
      <MainText>{location.search}</MainText>
      <TagContainer>
        {tags.map((tag) => (
          <TagFilter
            key={tag}
            active={tag === currentTagFilter}
            onClick={() => handleTagFilterChange(tag)}
          >
            {tag}
          </TagFilter>
        ))}
      </TagContainer>
      {pageContent}
      <LoadMoreContainer>
        {pageContext.pageNumber > 1 && (
          <PrimaryButton type="button">
            <DestyledLink
              to={`/page/${pageContext.pageNumber - 1}${
                currentTagFilter !== 'All' ? `?tag=${currentTagFilter}` : ''
              }`}
            >
              Previous Page
            </DestyledLink>
          </PrimaryButton>
        )}
        {data.ibBlog.posts.hasMore && (
          <PrimaryButton type="button">
            <DestyledLink
              to={`/page/${pageContext.pageNumber + 1}${
                currentTagFilter !== 'All' ? `?tag=${currentTagFilter}` : ''
              }`}
            >
              Next Page
            </DestyledLink>
          </PrimaryButton>
        )}
      </LoadMoreContainer>
    </Layout>
  );
};

Home.propTypes = {
  data: PropTypes.shape({
    ibBlog: PropTypes.shape({
      posts: PropTypes.shape({
        hasMore: PropTypes.bool,
        posts: PropTypes.arrayOf(
          PropTypes.shape({
            author: PropTypes.string,
            description: PropTypes.string,
            image: PropTypes.string,
            postedOn: PropTypes.string,
            tag: PropTypes.string,
            title: PropTypes.string,
            indexName: PropTypes.string,
            readingTime: PropTypes.number,
          }),
        ),
      }),
    }),
  }).isRequired,
  location: PropTypes.shape({
    search: PropTypes.string,
  }).isRequired,
  pageContext: PropTypes.shape({
    pageNumber: PropTypes.number,
  }).isRequired,
};

export default Home;

export const query = graphql`
  query GetPage($pageNumber: Int, $pageSize: Int) {
    ibBlog {
      posts(pageNumber: $pageNumber, pageSize: $pageSize) {
        hasMore
        posts {
          _id
          author
          description
          image
          indexName
          postedOn
          readingTime
          tag
          title
        }
      }
    }
  }
`;
