import { getAll, savePost, CreatePost, deleteOne } from '../../services/posts';
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Post } from "../../interfaces/post.interface";
import { AxiosError } from 'axios';

type AxiosErrorMessage = {
  message?: string[]
}

function handleErrorAxios(error: any) {
  const err = error as AxiosError
  const { message }: AxiosErrorMessage = err.response?.data ?? '';
  const errorMessage: string = Array.isArray(message) ? (message.shift() ?? '') : (message ?? '');

  return (errorMessage.charAt(0).toUpperCase() + errorMessage.slice(1))
}

export const fetchPosts = createAsyncThunk(
  'posts/fetch',
  async (args, { getState }) => {
    const state: any = getState()
    return getAll(state.posts.limit, state.posts.offset)
  }
)

export const addPosts = createAsyncThunk(
  'posts/add',
  async (data: CreatePost, { rejectWithValue }) => {
    try {
      const res = await savePost(data)
      return res.data as Post;
    } catch (error) {
      return rejectWithValue(handleErrorAxios(error));
    }
  }
)

export const deletePost = createAsyncThunk(
  'posts/delete',
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await deleteOne(id)
      return res.data as Post;
    } catch (error) {
      return rejectWithValue(handleErrorAxios(error));
    }
  }
)