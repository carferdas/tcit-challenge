import { Key, ReactElement, JSXElementConstructor, ReactFragment, ReactPortal } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { deletePost } from "../../features/posts/postsThunks";
import { Post } from "../../interfaces/post.interface";

function PostTable() {
  const dispatch = useAppDispatch();
  const { status, entities } = useAppSelector((state) => {
    return {
      ...state.posts,
      entities: state.posts.entities.filter((post: { name: string; description: string; }) =>
        post.name.toLowerCase().includes(state.posts.searchTerm.toLocaleLowerCase())
        || post.description.toLowerCase().includes(state.posts.searchTerm.toLocaleLowerCase())
      )
    }
  })

  const removePost = (id: string) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    dispatch(deletePost(id))
  }

  if (status === 'loading') {
    return (
      <div className="rounded-md bg-blue-100 p-4 text-blue-700 border border-blue-400">
        Loading...
      </div>
    )
  }

  return (
    <div className="overflow-x-auto relative bg-white">
      {entities.length === 0 ? (
        <div className="rounded-md bg-red-100 p-4 text-red-700 border border-red-400">
          No posts found
        </div>
      ) : (
        <table className="w-full border-collapse text-sm text-left text-gray-500 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
            <tr>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Description</th>
              <th className="border px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {entities.map((post: Post) => (
              <tr className="" key={post.id}>
                <td className="border py-2 px-4">{post.name}</td>
                <td className="border py-2 px-4">{post.description}</td>
                <td className="border py-2 px-4"><a href="#" className="text-red-700" onClick={() => removePost(post.id)}>Delete</a></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default PostTable