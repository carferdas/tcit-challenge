import { useAppDispatch } from '../../app/hooks';
import React, { useState } from 'react';
import { postSlice } from '../../features/posts/postSlice';
import { addPosts } from '../../features/posts/postsThunks';

function CreatePostForm() {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const dispatch = useAppDispatch();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(postSlice.actions.clearError())
    dispatch(addPosts({ name, description }))
      .then(res => {
        if (res.meta.requestStatus === 'rejected') return;
        setName('')
        setDescription('')
      })
  }

  return (
    <div className='mt-6'>
      <hr className='mb-4' />
      <h1 className='mb-2'>Create Post</h1>

      <form className="flex items-center" onSubmit={handleSubmit}>
        <input
          type="text"
          className="bg-white border border-gray-300 text-gray-900 text-sm focus:ring-gray-100 focus:border-gray-100 block w-full p-2.5 mr-6"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />

        <input
          type="text"
          className="bg-white border border-gray-300 text-gray-900 text-sm focus:ring-gray-100 focus:border-gray-100 block w-full p-2.5 mr-6"
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          required
        />
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white">Create</button>
      </form>
    </div>
  )
}

export default CreatePostForm