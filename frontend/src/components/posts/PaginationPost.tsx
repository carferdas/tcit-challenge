import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { postSlice } from '../../features/posts/postSlice';
import { fetchPosts } from '../../features/posts/postsThunks';

const PaginationPost = () => {
  const dispatch = useAppDispatch()
  const { offset, limit, entities } = useAppSelector((state) => state.posts)

  const handleOffset = (offset: number) => {
    if (offset < 0) offset = 0;
    dispatch(postSlice.actions.updateStateSlice({ offset }))
    dispatch(fetchPosts())
  }

  return (
    <div className="mt-6 flex justify-end">
      <button
        onClick={() => handleOffset(offset - limit)}
        disabled={offset === 0}
        className="px-4 py-2 bg-gray-200 text-gray-600 disabled:bg-gray-300 mr-1">
        Previus
      </button>

      <button
        onClick={() => handleOffset(offset + limit)}
        disabled={entities.length < limit}
        className="px-4 py-2 bg-gray-200 text-gray-600 disabled:bg-gray-300">
        Next
      </button>
    </div>
  );
}

export default PaginationPost;