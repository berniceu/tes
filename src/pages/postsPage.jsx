import React, {useState} from "react";
import { NavBar, Footer } from "./homePage";

const CommentForm = ({ postId, onSubmitComment }) => {
    const [comment, setComment] = useState('');
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (comment.trim()) {
        onSubmitComment(postId, comment);
        setComment('');
      }
    };
  
    return (
      <form onSubmit={handleSubmit} className="mt-4">
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Add a comment..."
        />
        <button type="submit" className="mt-2 px-4 py-1 bg-gray-200 rounded hover:bg-gray-300">
          Comment
        </button>
      </form>
    );
  };

const PostsPage = () => {
    const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');

  const handleSubmitPost = (e) => {
    e.preventDefault();
    if (newPost.trim()) {
      setPosts([...posts, { id: Date.now(), content: newPost, comments: [] }]);
      setNewPost('');
    }
  };

  const handleSubmitComment = (postId, comment) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, comments: [...post.comments, comment] }
        : post
    ));
  };
    return(
        <>
            <NavBar/>
            <div className="container mx-auto p-4 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Posts</h1>
      
      <form onSubmit={handleSubmitPost} className="mb-8">
        <textarea
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          className="w-full h-[50vh] p-2 border rounded resize-none"
          placeholder="What's on your mind?"
        />
        <button type="submit" className="mt-2 px-16 py-2 bg-primary text-white rounded-lg hover:bg-primary hover:bg-opacity-70 ">
          Post
        </button>
      </form>

      <div className="space-y-6">
        {posts.map(post => (
          <div key={post.id} className="bg-white p-4 rounded shadow">
            <p className="mb-4">{post.content}</p>
            
            <div className="ml-4 mt-2">
              <h3 className="text-lg font-semibold mb-2">Comments</h3>
              {post.comments.map((comment, index) => (
                <p key={index} className="mb-1">{comment}</p>
              ))}
            </div>
            
            {/* New Comment Form */}
            <CommentForm postId={post.id} onSubmitComment={handleSubmitComment} />
          </div>
        ))}
      </div>
    </div>
  
            <Footer/>
        </>
    )
}

export default PostsPage;