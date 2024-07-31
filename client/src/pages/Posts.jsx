import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import {
  getPostsError,
  getPostsPending,
  getPostsSuccess,
} from "../toolkit/PostSlicer";

const Modal = ({ show, onClose, onConfirm, post }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Confirm Deletion</h2>
        <p className="mb-6">
          Are you sure you want to delete the post titled "{post.title}"?
        </p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export const Posts = () => {
  const { posts, baseUrl } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const { data, isPending, isError } = posts;
  const location = useLocation();

  const [showModal, setShowModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    const getPosts = async () => {
      try {
        dispatch(getPostsPending());
        const { data } = await axios.get(baseUrl);
        dispatch(getPostsSuccess(data.data));
      } catch (error) {
        dispatch(getPostsError(error.message));
      }
    };
    getPosts();
  }, [dispatch, baseUrl, location]);

  const handleDeleteClick = (post) => {
    setSelectedPost(post);
    setShowModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`${baseUrl}/${selectedPost._id}`);
      const updatedData = data.filter((post) => post._id !== selectedPost._id);
      dispatch(getPostsSuccess(updatedData));
      setShowModal(false);
      setSelectedPost(null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-end mb-4">
          <Link
            to="/add-post"
            className="bg-blue-500 p-2 rounded-lg text-white font-bold"
          >
            ADD NEW POST
          </Link>
        </div>
        {isError && <h1 className="text-red-600 text-center">{isError}</h1>}
        {isPending ? (
          <h1 className="text-center text-lg">Loading...</h1>
        ) : data.length <= 0 ? (
          <h1 className="text-center text-lg">NO DATA</h1>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {data.map((post, index) => (
              <div
                key={index}
                className="border p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow bg-white"
              >
                <div className="aspect-w-1 aspect-h-1 mb-4">
                  <img
                    src={
                      post.imageUrl
                        ? post.imageUrl
                        : "https://images.drive.ru/i/0/603c9330e321260b125b3ae8.jpg"
                    }
                    alt={post.title}
                    className="object-cover rounded-t-lg w-full"
                  />
                </div>
                <h1 className="text-xl font-bold mb-2">{post.title}</h1>
                <p className="text-gray-700 mb-2">{post.description}</p>
                <h3 className="text-gray-500 text-sm">
                  {post.createdAt.slice(0, 10).split("-").reverse().join("-")}
                </h3>
                <div className="flex justify-between items-center mt-4">
                  <button
                    onClick={() => handleDeleteClick(post)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>
                  <Link
                    to={`/edit-post/${post._id}`}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Edit
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleConfirmDelete}
        post={selectedPost}
      />
    </section>
  );
};
