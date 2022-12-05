import { useState, useEffect, useReducer } from 'react';
import { useAppDispatch } from '../../app/hooks';

import { postSlice } from '../../features/posts/postSlice';

function SearchPost() {
  const dispatch = useAppDispatch();
  const { filter } = postSlice.actions;
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(filter(searchTerm))
  }, [searchTerm])

  return (
    <input
      type="text"
      placeholder="Buscar..."
      onChange={(e) => setSearchTerm(e.target.value)} value={searchTerm}
      className="bg-white border border-gray-300 text-gray-900 text-sm focus:ring-gray-100 focus:border-gray-100 block p-2.5 w-1/3 mb-6"
    />
  )
}

export default SearchPost