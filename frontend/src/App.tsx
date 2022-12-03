import { useEffect, useState, useTransition } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { Post } from './interfaces/post.interface';
import { useSelector } from 'react-redux';
import { useAppSelector } from './app/hooks';

function App() {
  // const [posts, setPosts] = useState<Post[]>([])
  // const [loading, setLoading] = useState(true)

  // useEffect(() => {
  //   fetch('http://localhost:4000/api/posts')
  //     .then(response => {
  //       if (response.ok) {
  //         return response.json();
  //       }

  //       throw response;
  //     })
  //     .then(data => setPosts(data))
  //     .catch(error => {
  //       console.log(`Error fetching data: ${error}`);
  //     })
  //     .finally(() => setLoading(false))
  // }, [])

  // if (loading) return 'Loading...';

  const postsState = useAppSelector(state => state.posts);
  console.log(postsState)

  return (
    <div className="App">
      <h1>Posts</h1>
      <div className="card">

      </div>
    </div >
  )
}

export default App
