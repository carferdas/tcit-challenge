import axios from 'axios'
import { Post } from '../interfaces/post.interface';

const baseUrl = import.meta.env.VITE_BACKEND_URL + '/posts';

export type CreatePost = {
  name: string;
  description: string;
}

export const getAll = async (limit: number, offset: number) => {
  const res = await axios.get(baseUrl, {
    params: {
      limit,
      offset
    }
  })
  return res.data as Promise<Post[]>;
}

export const savePost = (createPost: CreatePost) => {
  const res = axios.post(baseUrl, createPost);
  return res;
}

export const deleteOne = async (id: string) => {
  const res = await axios.delete(baseUrl + `/${id}`);
  return res;
}