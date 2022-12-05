import { useAppSelector } from '../../app/hooks';

function PostError() {
  const error = useAppSelector(state => state.posts.error);

  if (!error) return (<></>)

  return (
    <div className="rounded-md bg-red-100 p-4 text-red-700 border border-red-400 mt-6">
      {error}
    </div>
  )
}

export default PostError