import { createSlice } from "@reduxjs/toolkit";

const PostSlicer = createSlice({
  name: "Posts",
  initialState: {
    posts: {
      isPending: false,
      isError: "",
      data: [],
    },
  },
  reducers: {
    getPostsPending(state, _) {
      state.posts.isPending = true;
    },
    getPostsSuccess(state, { payload }) {
      state.posts.isPending = false;
      state.posts.data = payload;
    },
    getPostsError(state, { payload }) {
      state.posts.isError = payload;
    },
  },
});

export const { getPostsError, getPostsPending, getPostsSuccess } =
  PostSlicer.actions;

export default PostSlicer.reducer;
