import React, { useState, useEffect } from 'react';
import { axiosPrivate } from '../CustomAxios/customAxios';
import Cookies from 'js-cookie'; // Ensure Cookies is imported

const CommentsSection = ({ taskId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editText, setEditText] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = Cookies.get("User");

  useEffect(() => {
    const fetchComments = async () => {
      try {
        if (taskId) {
          const response = await axiosPrivate.get(`/api/comments/${taskId}`, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          if (response.data.success) {
            const fetchedComments = response.data.data;
            setComments(fetchedComments.length === 0 ? getFakeComments() : fetchedComments);
          } else {
            setError('Failed to fetch comments: ' + response.data.message);
          }
        } else {
          setError('Task ID is required');
        }
      } catch (err) {
        console.error('Error fetching comments:', err);
        setError('Error fetching comments: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [taskId, token]);

  const getFakeComments = () => [
    // Example fake comments for testing
  ];

  const handleChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      try {
        const response = await axiosPrivate.post('/api/comments', { comment: newComment, taskId }, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (response.data.success) {
          setComments([...comments, response.data.data]);
          setNewComment('');
        } else {
          setError('Failed to submit comment: ' + response.data.message);
        }
      } catch (err) {
        console.error('Error submitting new comment:', err);
        setError('Error submitting new comment: ' + err.message);
      }
    }
  };

  const handleEditChange = (e) => {
    setEditText(e.target.value);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (editText.trim()) {
      try {
        const response = await axiosPrivate.patch(`/api/comments/${editingCommentId}`, { comment: editText }, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (response.data.success) {
          const updatedComment = response.data.data;
          const updatedComments = comments.map(comment =>
            comment._id === editingCommentId
              ? { ...comment, comment: updatedComment.comment }
              : comment
          );
          setComments(updatedComments);
          setEditingCommentId(null);
          setEditText('');
        } else {
          setError('Failed to update comment: ' + response.data.message);
        }
      } catch (err) {
        console.error('Error editing comment:', err);
        setError('Error editing comment: ' + err.message);
      }
    }
  };

  const handleEditClick = (commentId, currentText) => {
    setEditingCommentId(commentId);
    setEditText(currentText);
  };

  const handleDeleteClick = async (commentId) => {
    try {
      const response = await axiosPrivate.delete(`/api/comments/${commentId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.data.success) {
        const updatedComments = comments.filter(comment => comment._id !== commentId);
        setComments(updatedComments);
      } else {
        setError('Failed to delete comment: ' + response.data.message);
      }
    } catch (err) {
      console.error('Error deleting comment:', err);
      setError('Error deleting comment: ' + err.message);
    }
  };

  if (loading) return <p>Loading comments...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="max-w-sm mx-auto p-4 overflow-y-auto max-h-80">
      <div className="mt-4">
        {comments.length === 0 ? (
          <p className="text-gray-500 text-sm">No comments yet.</p>
        ) : (
          <ul className="space-y-2">
            {comments.map((comment) => (
              <li key={comment?._id} className="relative bg-white border border-gray-200 rounded p-3 shadow-sm text-sm rounded-xl">
                <div className="flex items-start space-x-3">
                  <div className="flex-1">
                    <p className="font-semibold text-gray-700">
                      {comment?.creatorId?.name ?? 'Unknown User'}
                    </p> 
                    {editingCommentId === comment?._id ? (
                      <form onSubmit={handleEditSubmit} className="mt-2 space-y-2">
                        <textarea
                          value={editText}
                          onChange={handleEditChange}
                          placeholder="Edit your comment..."
                          className="block w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 sm:text-sm "
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
                      <div className="mt-3">
                        <p className="text-gray-700 break-all">
                          {comment?.comment ?? 'No comment available'}
                        </p> {/* Ensure text wraps and fallback to a default message */}
                        <div className="space-x-3 mt-3">
                          <button
                            className="text-blue-600 hover:text-blue-800 mr-2"
                            onClick={() => handleEditClick(comment?._id, comment?.comment)}
                          >
                            Edit
                          </button>
                          <button
                            className="text-red-600 hover:text-red-800"
                            onClick={() => handleDeleteClick(comment?._id)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="absolute bottom-2 right-3 text-xs text-gray-500">
                  <p>Created At: {comment?.timeStamp ? new Date(comment.timeStamp).toLocaleString() : 'Unknown'}</p> {/* Display timestamp or fallback */}
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
