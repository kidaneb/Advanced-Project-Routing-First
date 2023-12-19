import axios from "axios";
import { Link, useLoaderData } from "react-router-dom";
import { Form } from "react-router-dom";
import { getPosts } from "../api/posts";
import { PostCard } from "../Components/PostCard";
import { getUsers } from "../api/users";
import { useEffect, useRef } from "react";

function Posts() {
  const {
    searchParams: { query, userId },
    posts,
    users,
  } = useLoaderData();

  const queryRef = useRef();
  const userIdRef = useRef();

  useEffect(() => {
    queryRef.current.value = query;
  }, [query]);

  useEffect(()=>{
    userIdRef.current.value = userId;
  },[userId])

  return (
    <>
      <div className="container">
        <h1 className="page-title">
          Posts
          <div className="title-btns">
            <Link className="btn btn-outline" to="new">
              New
            </Link>
          </div>
        </h1>

        <Form className="form mb-4">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="query">Query</label>
              <input type="search" name="query" id="query" ref={queryRef} />
            </div>

            <div className="form-group">
              <label htmlFor="userId">Author</label>
              <select type="search" name="userId" id="userId" ref={userIdRef}>
                <option value="">Any</option>
                {users.map((user) => {
                  return (
                    <option key={user.id} value={user.id}>
                      {user.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <button className="btn">Filter</button>
          </div>
        </Form>

        <div className="card-grid">
          {posts.map((post) => {
            return <PostCard key={post.id} {...post} />;
          })}
        </div>
      </div>
    </>
  );
}

async function loader({ request: { signal, url } }) {
  const searchParams = new URL(url).searchParams;
  const query = searchParams.get("query") || "";
  const userId = searchParams.get("userId") || "";
 
  const filterParams = { q: query };
  if(userId !== "") filterParams.userId = userId;
  const posts = getPosts({ signal, params: { filterParams } });
  const users = getUsers({ signal });

  return { users: await users, searchParams: { query, userId }, posts: await posts };
}

export const PostsRoute = {
  loader,
  element: <Posts />,
};
