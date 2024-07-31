import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

export const UpdatePost = () => {
  const { id } = useParams();
  const { baseUrl } = useSelector((state) => state.posts);
  const navigate = useNavigate();

  const [postData, setPostData] = useState({});

  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    const getPosts = async () => {
      try {
        setIsPending(true);
        const { data } = (await axios.get(`${baseUrl}/${id}`)).data;
        setPostData({
          ...postData,
          title: data.title,
          description: data.description,
        });
      } catch (error) {
        console.log(error);
      } finally {
        setIsPending(false);
      }
    };
    getPosts();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPostData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${baseUrl}/${id}`, postData);
      console.log(response);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      {isPending ? (
        "loading"
      ) : (
        <form
          onSubmit={handleFormSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 my-4"
        >
          <h2 className="text-2xl mb-4 text-center text-gray-700">Edit Post</h2>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="title"
            >
              Title
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="title"
              type="text"
              placeholder="Enter post title"
              name="title"
              value={postData.title}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="content"
            >
              Content
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="content"
              placeholder="Enter post content"
              name="description"
              value={postData.description}
              onChange={handleInputChange}
              rows="5"
            ></textarea>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
