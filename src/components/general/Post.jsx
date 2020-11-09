import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { Link } from 'gatsby';
import Img from 'gatsby-image';
import { formatDistance } from 'date-fns';
import { grayColor, primaryColor } from '../../constants/websiteColors';
import Time from '../icons/Time';
import { Heading4, Heading5, Text } from './Headings';

const Container = styled.article`
  text-decoration: none;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  min-height: 400px;
  @media (min-width: 992px) {
    grid-column-start: ${(props) => (props.isHuge ? '1' : '')};
    grid-column-end: ${(props) => (props.isHuge ? 'span 3' : '')};
    flex-direction: ${(props) => (props.isHuge ? 'row' : 'column')};
  }
`;

const ImageBlock = styled.div`
  height: 200px;
  border-radius: 4px;
  margin-bottom: 20px;
  width: 100%;
  overflow: hidden;
  @media (min-width: 992px) {
    margin-bottom: ${(props) => (props.isHuge ? '0px' : '')};
    margin-right: ${(props) => (props.isHuge ? '60px' : '')};
    height: ${(props) => (props.isHuge ? 'initial' : '')};
    max-height: ${(props) => (props.isHuge ? '420px' : '')};
    width: ${(props) =>
      props.isHuge
        ? 'calc(min(100vw - 10vw, 1200px) - ((min(100vw - 10vw, 1200px) - 2*60px) / 3) - 60px)'
        : '100%'};
  }
`;

const PostInfo = styled.div`
  width: 100%;
  @media (min-width: 992px) {
    width: ${(props) => (props.isHuge ? 'calc((min(100vw - 10vw, 1200px) - 2*60px) / 3)' : '100%')};
  }
`;

const PostLink = styled(Link)`
  text-decoration: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  color: inherit;
  cursor: pointer;
`;

const PostOverview = styled.div`
  width: 100%;
`;

const PostTag = styled(Heading5)`
  margin-bottom: 0.25rem;
`;

const PostTitle = styled(Heading4)`
  margin-bottom: 1rem;
`;

const PostDescription = styled(Text)`
  margin-bottom: 1rem !important;
`;

const PostMeta = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  & > *:first-child {
    margin-bottom: 0.5rem;
  }
`;

const PostTimeData = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  & > *:not(:last-child) {
    margin-right: 0.5rem;
  }
`;

const Post = ({
  isHuge,
  author,
  readingTime,
  description,
  postedOn,
  tag,
  title,
  indexName,
  fluidImage,
}) => {
  const postDataFormatted = `${formatDistance(new Date(), postedOn)} ago`;
  return (
    <Container isHuge={isHuge}>
      <ImageBlock isHuge={isHuge}>
        <Img fluid={fluidImage} />
      </ImageBlock>
      <PostInfo isHuge={isHuge}>
        <PostLink to={`/post/${indexName}`}>
          <PostOverview>
            <PostTag color={primaryColor}>{`#${tag}`}</PostTag>
            <PostTitle>{title}</PostTitle>
            <PostDescription color={grayColor}>{description}</PostDescription>
          </PostOverview>
          <PostMeta>
            <Text>{author}</Text>
            <PostTimeData>
              <Time color={grayColor} height={16} />
              <Text color={grayColor}>{`${readingTime} min read`}</Text>
              <Text color={grayColor}>|</Text>
              <Text color={grayColor}>{postDataFormatted}</Text>
            </PostTimeData>
          </PostMeta>
        </PostLink>
      </PostInfo>
    </Container>
  );
};

Post.propTypes = {
  isHuge: PropTypes.bool,
  author: PropTypes.string.isRequired,
  readingTime: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  postedOn: PropTypes.instanceOf(Date).isRequired,
  tag: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  indexName: PropTypes.string.isRequired,
  fluidImage: PropTypes.shape({
    aspectRatio: PropTypes.number,
    base64: PropTypes.string,
    sizes: PropTypes.string,
    src: PropTypes.string,
    srcSet: PropTypes.string,
  }).isRequired,
};

Post.defaultProps = {
  isHuge: false,
};

export default Post;
