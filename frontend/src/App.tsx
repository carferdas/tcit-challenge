import PostSearch from './components/posts/SearchPost';
import PostTable from './components/posts/PostTable';
import CreatePostForm from './components/posts/CreatePostForm';
import { fetchPosts } from './features/posts/postsThunks';
import { useAppDispatch } from './app/hooks';
import PaginationPost from './components/posts/PaginationPost';
import PostError from './components/posts/PostError';
import PostTableLength from './components/posts/PostTableLength';

function App() {
  const dispatch = useAppDispatch();
  dispatch(fetchPosts())

  return (
    <div className="container mx-auto max-w-6xl px-4 mt-8">
      <h1 className='text-3xl font-bold'>TCIT Challenge</h1>
      <hr className='my-6' />
      <div className="card">
        <div className='flex justify-between'>
          <PostSearch />
          <PostTableLength />
        </div>
        <PostTable />
        <PaginationPost />
        <PostError />
        <CreatePostForm />
      </div>
    </div >
  )
}

export default App
