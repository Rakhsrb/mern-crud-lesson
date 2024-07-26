import React from "react";
import { AddPost } from "./pages/AddPost";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RootLayout } from "./layout/RootLayout";
import { Posts } from "./pages/Posts";
import { UpdatePost } from "./pages/UpdatePost";
import { PostDetail } from "./pages/PostDetail";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          index: true,
          element: <Posts />,
        },
        {
          path: "add-post",
          element: <AddPost />,
        },
        {
          path: "edit-post/:id",
          element: <UpdatePost />,
        },
        {
          path: "/:id",
          element: <PostDetail />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
