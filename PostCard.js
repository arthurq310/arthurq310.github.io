import React from "react";

export default function PostCard({ post, onClick }) {
  return (
    <div
      className="p-4 bg-white rounded-xl shadow hover:shadow-lg cursor-pointer"
      onClick={() => onClick(post)}
    >
      <h3 className="text-lg font-semibold">{post.title}</h3>
      <p className="text-sm text-slate-600">{post.body}</p>
    </div>
  );
}
