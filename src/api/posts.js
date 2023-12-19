import axios from "axios";
import { baseApi } from "./base";

export function getPosts(options) {
  const {signal, params:{filterParams}} = options;
  return baseApi.get("posts", {signal, params:filterParams}).then((res) => res.data);
}
export function getPost(postId, options) {
  return baseApi.get(`posts/${postId}`, options).then((res) => res.data);
}

export function getUserPost(userId, options) {
  return baseApi.get(`/users/${userId}/posts`, options).then((res) => res.data);
}

export function createPost(data, options) {
  return baseApi.post("/posts", data, options).then((res) => res.data);
}

export function updatePost(postId, data, options) {
  return baseApi.put(`/posts/${postId}`, data, options).then((res) => res.data);
}
