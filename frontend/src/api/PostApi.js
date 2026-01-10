import API from "./axios.js"

export const votePost = (postId, type) => {
  return API.post(`/posts/${postId}/vote`, { type });
};