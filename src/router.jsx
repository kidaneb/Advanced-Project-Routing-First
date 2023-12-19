import {
  Navigate,
  Outlet,
  ScrollRestoration,
  createBrowserRouter,
  useRouteError,
} from "react-router-dom";
import { NavBar } from "./NavBar";
// import { Post } from "./post";
// import { User } from "./User";
import { RootLayout } from "./RootLayout";
import { PostsRoute } from "./Posts/Posts";
import { TodosRoute } from "./Todos/Todos";
import { UsersRoute } from "./Users/Users";
import { PostRoute } from "./Post";
import { UserRoute } from "./User";
import { NewPostRoute } from "./NewPost";
import { EditPostRoute } from "./EditPost";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,

    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <Navigate to="posts" /> },
          {
            path: "posts",
            children: [
              { index: true, ...PostsRoute },
              {
                path: ":postId",
                children: [
                  { index: true, ...PostRoute },
                  { path: "edit", ...EditPostRoute },
                ],
              },
              { path: "new", ...NewPostRoute },
            ],
          },
          {
            path: "users",
            children: [
              { index: true, ...UsersRoute },
              { path: ":userId", ...UserRoute },
            ],
          },
          { path: "todos", ...TodosRoute },
        ],
      },
    ],
  },
]);

function ErrorPage() {
  const error = useRouteError();
  console.log(error.message);
  console.log(error.stack);
  return (
    <>
      <h1> 404 Error kidu</h1>
      {import.meta.env.MODE !== "production" && (
        <>
          <pre>{error.message}</pre>
          <pre>{error.stack}</pre>
        </>
      )}
    </>
  );
}
