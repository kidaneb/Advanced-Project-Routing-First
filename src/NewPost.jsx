import axios from "axios";
import {
  Form,
  Link,
  redirect,
  useActionData,
  useLoaderData,
  useNavigation,
} from "react-router-dom";
import { getUsers } from "./api/users";
import { createPost } from "./api/posts";
import { FormGroup } from "./Components/FormGroup";
import { Forms } from "./Components/Forms";

function NewPost() {
  const users = useLoaderData();
  const errorMessage = useActionData();
  const { state } = useNavigation();

  const isSubmmiting = state === "submitting";

  return (
    <>
      <div className="container">
        <h1 className="page-title">New Post</h1>

        <Forms
          errorMessage={errorMessage}
          users={users}
          isSubmmiting={isSubmmiting}
        />
      </div>
    </>
  );
}

function loader({ request: { signal } }) {
  return getUsers({ signal });
}

async function action({ request }) {
  console.log("action is called");
  const formData = await request.formData();
  const title = formData.get("title");

  const body = formData.get("body");

  const userId = formData.get("userId");
  const errorMessage = {};

  if (title === "" || body === "") {
    if (title === "") {
      errorMessage.title = "Title Required";
    }
    if (body === "") {
      errorMessage.body = "Body Required";
    }

    return errorMessage;
  }
  // if (body === "") {
  //   return {body:"Body is Required"};
  // }

  //Alternative way
  // const post = await fetch("http://127.0.0.1:3000/posts",{
  //   method:"POST",
  //   signal:request.signal,
  //   headers:{
  //     "Content-Type":"application/json"
  //   },
  //   body:JSON.stringify({userId,title,body})
  // }).then(res=>res.json())

  const post = await createPost(
    { userId, title, body },
    { signal: request.signal }
  );

  return redirect(`/posts/${post.id}`);
}

export const NewPostRoute = {
  loader,
  action,
  element: <NewPost />,
};
