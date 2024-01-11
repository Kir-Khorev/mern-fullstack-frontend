import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchComments = createAsyncThunk(
  '/posts/fetchComments',
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

export const fetchRemovePost = createAsyncThunk(
  '/posts/fetchRemovePost',
  async (id) => {
    return await axios.delete(`posts/${id}`);
  }
);

const initialState = {
  comments: {
    items: [],
    status: 'loading',
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
      state.comments.status = 'loaded';
    },
    [fetchComments.rejected]: (state) => {
      state.comments.items = [];
      state.comments.status = 'error';
    },
  },
});

export const commentsReducer = commentsSlice.reducer;
