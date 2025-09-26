import React from "react";
import { formatName, formatEmail, formatBody } from "../utils/format";
import { Trash2 } from "lucide-react";

export default function CommentCard({ comment, onDelete }) {
  return (
    <div className="p-4 bg-white rounded-xl shadow flex justify-between items-start">
      <div>
        <h4 className="font-semibold">{formatName(comment.name)}</h4>
        <p className="text-sm text-blue-600">{formatEmail(comment.email)}</p>
        <p className="text-sm text-slate-700">{formatBody(comment.body)}</p>
      </div>

      <button
        className="text-red-600 hover:text-red-800"
        onClick={() => onDelete(comment)}
      >
        <Trash2 size={20} />
      </button>
    </div>
  );
}
