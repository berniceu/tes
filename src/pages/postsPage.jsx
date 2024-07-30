import React, {useState, useEffect} from "react";
import axios from "axios";
import { NavBar, Footer } from "./homePage";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../config";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PostCard = ({ post }) => {
  const navigate = useNavigate();

  return (
    <div className="p-4 rounded-lg hover:shadow hover:cursor-pointer" onClick={() => navigate(`/posts/${post.id}`)}>
      <h3 className="font-bold mb-2">{post.title}</h3>
      <p className="text-sm text-gray-600 mb-4">{post.content.substring(0, 100)}...</p>
      <div className="flex justify-between text-sm text-gray-500">
        <div className="flex items-center">
          <svg className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"/>
            <path d="M13 7h-2v5.414l3.293 3.293 1.414-1.414L13 11.586z"/>
          </svg>
          {new Date(post.createdAt).toLocaleDateString()}
        </div>
        <div className="flex items-center">
          <svg className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"/>
            <path d="M12 6c-3.309 0-6 2.691-6 6s2.691 6 6 6 6-2.691 6-6-2.691-6-6-6zm0 10c-2.206 0-4-1.794-4-4s1.794-4 4-4 4 1.794 4 4-1.794 4-4 4z"/>
          </svg>
          {post.comments.length} comments
        </div>
      </div>
    </div>
  )
}

const PostModal = ({ isOpen, onClose, onSubmit, newPost, setNewPost }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Add New Post</h2>
        <form onSubmit={onSubmit}>
          <input
            className="w-full mb-2 p-2 border rounded"
            type="text"
            placeholder="Post Title"
            value={newPost.title}
            onChange={(e) => setNewPost({...newPost, title: e.target.value})}
          />
          <textarea
            className="w-full mb-2 p-2 border rounded"
            placeholder="Post Content"
            value={newPost.content}
            onChange={(e) => setNewPost({...newPost, content: e.target.value})}
          />
          <div className="flex justify-end">
            <button type="button" onClick={onClose} className="mr-2 px-4 py-2 bg-gray-200 rounded">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-primary text-white rounded">Add Post</button>
          </div>
        </form>
      </div>
    </div>
  );
}

const PostsGrid = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newPost, setNewPost] = useState({ name: '', content: '' });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const userRole = localStorage.getItem('role')

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/dashboard/posts/`);
        setPosts(Array.isArray(res.data) ? res.data : []);
        setLoading(false);
        
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    }

    fetchPosts()
  }, [])

  const handleAddPost = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/dashboard/posts/new_post/`, newPost);
      setPosts(prevPosts => Array.isArray(prevPosts) ? [...prevPosts, res.data] : [res.data]);
      setNewPost({ title: '', content: '' });
      setIsModalOpen(false);
      toast.success('Post added successfully!')
    } catch (error) {
      setError(error.message);
      toast.error('Failed to add post!')
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto p-10 font-outfit min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Posts</h2>
        {userRole === 'staff' && (
          <div>
            <button className="bg-primary text-white px-4 py-2 rounded-lg mr-2" onClick={() => setIsModalOpen(true)}>Add New Post</button>
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
      <PostModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleAddPost} newPost={newPost} setNewPost={setNewPost}/>
    </div>
  )
}

const PostsPage = () => {
  return (
    <>
      <NavBar/>
      <PostsGrid/>
      <Footer/>
    </>
  );
}

export default PostsPage;