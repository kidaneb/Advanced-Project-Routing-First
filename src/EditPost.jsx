import {
  Form,
  Link,
  redirect,
  useActionData,
  useLoaderData,
  useNavigation,
} from "react-router-dom";
import { FormGroup } from "./Components/FormGroup";
import { getPost, updatePost } from "./api/posts";
import { getUsers } from "./api/users";
import { Forms } from "./Components/Forms";

function EditPost() {
  const { users, post } = useLoaderData();
  const {state} = useNavigation();
  const errorMessage = useActionData();
  
  const isSubmmiting = state === "submitting";

  return (
    <>
      <div className="container">
        <h1 className="page-title">Edit Post</h1>
        <Forms users={users} errorMessage={errorMessage} isSubmmiting={isSubmmiting}  defaultValues={post}></Forms>
      </div>
    </>
  );
}

async function loader({ request: { signal }, params: { postId } }) {
  const post = getPost(postId, { signal });
  const users = getUsers({ signal });
  return { users: await users, post: await post };
}

async function action({ request, params: { postId } }) {
  const formData = await request.formData();
  const title = formData.get("title");
  const userId = formData.get("userId");
  const body = formData.get("body");

  if (title === "") {
    return "Required";
  }

  if (body === "") {
    return "Required";
  }

  await updatePost(postId, { userId, title, body }, { signal: request.signal });

  // Alternative way
  // await fetch(`http://127.0.0.1:3000/posts/${postId}`, {
  //   method: "PUT",
  //   signal: request.signal,
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({ userId, title, body }),
  // });

  return redirect(`/posts/${postId}`);
}

export const EditPostRoute = {
  action,
  loader,
  element: <EditPost />,
};
