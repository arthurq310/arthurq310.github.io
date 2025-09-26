import React from "react";

export default function UserCard({ user, onClick }) {
  return (
    <div
      className="p-4 bg-white rounded-xl shadow hover:shadow-lg cursor-pointer"
      onClick={() => onClick(user)}
    >
      <h3 className="text-lg font-semibold">{user.name}</h3>
      <p className="text-sm text-slate-600">{user.company.catchPhrase}</p>
    </div>
  );
}
