import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchComments = createAsyncThunk(
  '/comments/fetchComments',
  async (params) => {
    const { sortBy, postId } = params;
    const url = postId ? `/comments/${postId}` : '/comments';
    const { data } = await axios.get(url, { params: { sortBy } });
    return data;
  }
);

export const fetchTags = createAsyncThunk('/posts/fetchTags', async () => {
  const { data } = await axios.get('posts/tags');
  return data;
});

export const fetchRemoveComment = createAsyncThunk(
  '/comments/fetchRemoveComment',
  async (id) => {
    return await axios.delete(`comments/${id}`);
  }
);

const initialState = {
  comments: {
    items: [],
    status: 'loading',
    commentCount: 0,
  },
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: {
    // Получение comments
    [fetchComments.pending]: (state) => {
      state.comments.items = [];
      state.comments.status = 'loading';
    },
    [fetchComments.fulfilled]: (state, action) => {
      state.comments.items = action.payload;
      state.comments.commentCount = action.payload.length;
      state.comments.status = 'loaded';
    },
    [fetchComments.rejected]: (state) => {
      state.comments.items = [];
      state.comments.status = 'error';
    },

    // Удаление comment
    [fetchRemoveComment.pending]: (state, action) => {
      console.log('!!!!!!!!!!', { state });
      state.comments.items = state.comments.items.filter(
        (obj) => obj._id !== action.meta.arg
      );
    },
  },
});

export const commentsReducer = commentsSlice.reducer;
