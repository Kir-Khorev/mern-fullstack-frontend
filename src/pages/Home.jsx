import React, { useEffect, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import { CommentsBlock } from '../components/CommentsBlock';
import { fetchPosts, fetchTags } from '../redux/slices/posts';
import { useDispatch, useSelector } from 'react-redux';
import { fetchComments } from '../redux/slices/comments';

export const Home = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.data);
  const { posts, tags } = useSelector((state) => state.posts);
  const { comments } = useSelector((state) => state.comments);
  const [sortBy, setSortBy] = useState('createdAt');

  console.log({ comments });

  const isPostsLoading = posts.status === 'loading';
  const isTagsLoading = tags.status === 'loading';
  const isCommentsLoading = comments.status === 'loading';

  const handleTabChange = (event, newValue) => {
    event.preventDefault();
    setSortBy(newValue);
  };

  useEffect(() => {
    dispatch(fetchPosts({ sortBy }));
    dispatch(fetchTags());
    dispatch(fetchComments({ sortBy }));
  }, [dispatch, sortBy]);

  return (
    <>
      <Tabs
        style={{ marginBottom: 15 }}
        aria-label="basic tabs example"
        value={sortBy}
        onChange={handleTabChange}
      >
        <Tab label="New" value="createdAt" />
        <Tab label="Popular" value="viewsCount" />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {(isPostsLoading ? [...Array(5)] : posts.items).map((obj, index) =>
            isPostsLoading ? (
              <Post isLoading={isPostsLoading} key={index} />
            ) : (
              <Post
                key={index}
                id={obj._id}
                title={obj.title}
                imageUrl={
                  obj.imageUrl ? `http://localhost:4444${obj.imageUrl}` : ''
                }
                user={obj.user}
                createdAt={obj.createdAt}
                viewsCount={obj.viewsCount}
                commentsCount={3}
                tags={obj.tags}
                isEditable={userData?._id === obj.user._id}
              />
            )
          )}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock items={tags.items} isLoading={isTagsLoading} />
          <CommentsBlock items={comments.items} isLoading={isCommentsLoading} />
        </Grid>
      </Grid>
    </>
  );
};
