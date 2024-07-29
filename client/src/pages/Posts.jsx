import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  getPostsError,
  getPostsPending,
  getPostsSuccess,
} from "../toolkit/PostSlicer";

export const Posts = () => {
  const { posts, baseUrl } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const { data, isPending, isError } = posts;

  useEffect(() => {
    const getPosts = async () => {
      try {
        dispatch(getPostsPending());
        const { data } = await axios.get(baseUrl);
        dispatch(getPostsSuccess(data.data));
      } catch (error) {
        dispatch(getPostsError(data.message));
      } finally {
      }
    };
    getPosts();
  }, []);

  return (
    <section>
      <div className="container">
        <Link to={"/add-post"}>ADD NEW POST</Link>
        {isError && <h1 className="text-red-600">{isError}</h1>}
        {isPending ? (
          <h1>Loading...</h1>
        ) : data.length <= 0 ? (
          <h1>NO DATA</h1>
        ) : (
          data.map((post, index) => (
            <div key={index}>
              <h1>{post.title}</h1>
              <p>{post.description}</p>
              <h3>{post.createdAt.slice(0, 10)}</h3>
            </div>
          ))
        )}
      </div>
    </section>
  );
};
