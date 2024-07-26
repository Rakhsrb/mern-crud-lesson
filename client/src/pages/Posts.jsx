import React from "react";
import { useDispatch, useSelector } from "react-redux";

export const Posts = () => {
  const { posts } = useSelector((state) => state.posts);
  const { data, isPending, isError } = posts;
  return <div></div>;
};
