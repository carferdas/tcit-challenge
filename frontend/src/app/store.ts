import { configureStore } from "@reduxjs/toolkit";
import { reducer as postReducer } from '../features/posts/postSlice';

export const store = configureStore({
  reducer: {
    posts: postReducer,
  }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch