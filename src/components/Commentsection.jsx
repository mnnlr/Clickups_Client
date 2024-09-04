import React, { useState } from 'react';

const CommentsSection = () => {
  const [comments, setComments] = useState([
    {
      id: 1,
      text: 'This is a comment.',
      userName: 'John Doe',
      userImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqGK3diR3Zi-mnOXEaj-3ewmFyRYVxGzVzZw&s',
    },
    {
      id: 2,
      text: 'This is another comment.',
      userName: 'Alice Johnson',
      userImage: 'https://static.vecteezy.com/system/resources/thumbnails/036/053/722/small/ai-generated-cat-wearing-heart-shaped-sunglasses-lying-on-a-pillow-free-photo.jpeg',
    },
    {
      id: 3,
      text: 'This is yet another comment.',
      userName: 'Bob Brown',
      userImage: 'https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp',
    }
  ]);

  const [newComment, setNewComment] = useState('');
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editText, setEditText] = useState('');

  const handleChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      setComments([...comments, { id: Date.now(), text: newComment, userName: 'me', userImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxU342Py34H-_nuRuVqOeQgZFm8ZFSEuatldLqtzk93XoOUtrM5kfS7CuXsC8KS9ECye8&usqp=CAU' }]);
      setNewComment('');
    }
  };

  const handleEditChange = (e) => {
    setEditText(e.target.value);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (editText.trim()) {
      const updatedComments = comments.map(comment =>
        comment.id === editingCommentId
          ? { ...comment, text: editText }
          : comment
      );
      setComments(updatedComments);
      setEditingCommentId(null);
      setEditText('');
    }
  };

  const handleEditClick = (commentId, currentText) => {
    setEditingCommentId(commentId);
    setEditText(currentText);
  };

  const handleDeleteClick = (commentId) => {
    const updatedComments = comments.filter(comment => comment.id !== commentId);
    setComments(updatedComments);
  };

  return (
    <div className="max-w-sm mx-auto p-4 overflow-y-auto max-h-80">
      <div className="mt-4">
        {comments.length === 0 ? (
          <p className="text-gray-500 text-sm">No comments yet.</p>
        ) : (
          <ul className="space-y-2">
            {comments.map((comment) => (
              <li key={comment.id} className="bg-white border border-gray-200 rounded p-3 shadow-sm text-sm">
                <div className="flex items-start space-x-3">
                  <img
                    src={comment.userImage}
                    alt={`${comment.userName}'s profile`}
                    className="w-8 h-8 rounded-full"
                  />
                  <div>
                    <p className="font-semibold text-gray-700">{comment.userName}</p>
                    {editingCommentId === comment.id ? (
                      <form onSubmit={handleEditSubmit} className="mt-2 space-y-2">
                        <textarea
                          value={editText}
                          onChange={handleEditChange}
                          placeholder="Edit your comment..."
                          className="block w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 sm:text-sm"
                        ></textarea>
                        <div className="flex space-x-2">
                          <button type="submit" className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
                            Save
                          </button>
                          <button
                            type="button"
                            onClick={() => setEditingCommentId(null)}
                            className="px-3 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    ) : (
                      <div>
                        <p className="text-gray-700">{comment.text}</p>
                        <button
                          className="mt-2 text-blue-600 hover:text-blue-800 mr-2"
                          onClick={() => handleEditClick(comment.id, comment.text)}
                        >
                          Edit
                        </button>
                        <button
                          className="mt-2 text-red-600 hover:text-red-800"
                          onClick={() => handleDeleteClick(comment.id)}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="mt-3">
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            placeholder="Add a comment..."
            value={newComment}
            onChange={handleChange}
            className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 sm:text-sm"
          ></textarea>
          <button
            type="submit"
            className="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Comment
          </button>
        </form>
      </div>
    </div>
  );
};

export default CommentsSection;
