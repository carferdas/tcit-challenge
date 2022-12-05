import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { postSlice } from '../../features/posts/postSlice';
import { fetchPosts } from '../../features/posts/postsThunks';
import { useState } from 'react';

function PostTableLength() {
  const dispatch = useAppDispatch()
  const [length, setLength] = useState<string>('')

  const handleLength = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLength(event.target.value ?? '10')
    if (!event.target.value) return;

    dispatch(postSlice.actions.updateStateSlice({ limit: +event.target.value }))
    dispatch(fetchPosts())
  }

  return (
    <select
      onChange={handleLength}
      value={length}
      className="bg-white border border-gray-300 text-gray-900 text-sm focus:ring-gray-100 focus:border-gray-100 block p-2.5 mb-6"
    >
      <option value="10">10</option>
      <option value="25">25</option>
      <option value="50">50</option>
      <option value="100">100</option>
    </select>
  )
}

export default PostTableLength