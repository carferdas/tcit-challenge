import { createSlice, current } from "@reduxjs/toolkit";
import { Post } from '../../interfaces/post.interface';
import { fetchPosts, addPosts, deletePost } from './postsThunks';

export type PostsState = {
  status: "loading" | "finished";
  error: string | null;
  entities: Post[];
  searchTerm: string;
  limit: number,
  offset: number,
};

const initialState: PostsState = {
  entities: [],
  error: null,
  status: "loading",
  searchTerm: '',
  limit: 10,
  offset: 0,
}

export const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    filter: (state, { payload }) => {
      state.searchTerm = payload;
    },
    clearError: (state) => {
      return {
        ...state,
        error: null
      }
    },
    updateStateSlice: (state, { payload }) => {
      return {
        ...state,
        ...payload
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state: PostsState, { payload }) => {
      state.status = "loading";
      state.error = null;
    })
    builder.addCase(fetchPosts.fulfilled, (state: PostsState, { payload }) => {
      state.entities = [];
      state.entities.push(...payload);
      state.status = "finished";
    })
    builder.addCase(fetchPosts.rejected, (state: PostsState, { error }) => {
      state.error = error.message ?? '';
      state.status = "finished";
    })
    builder.addCase(addPosts.fulfilled, (state: PostsState, { payload }) => {
      state.entities.push(payload);
    })
    builder.addCase(addPosts.rejected, (state: PostsState, { payload }) => {
      state.error = payload as string ?? '';
    })
    builder.addCase(deletePost.rejected, (state: PostsState, { payload }) => {
      state.error = payload as string ?? '';
    })
    builder.addCase(deletePost.fulfilled, (state: PostsState, { payload }) => {
      state.entities = state.entities.filter(post => post.id != payload.id)
    })
  }
})

export const { reducer } = postSlice;
