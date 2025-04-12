// src/components/Comment.js
import { formatDistanceToNow } from 'date-fns';

function Comment({ comment }) {
  const { author, content, createdAt } = comment;

  return (
    <div className="bg-zinc-800 px-4 py-3 rounded-xl text-sm text-text-color shadow-sm">
      <div className="flex items-center gap-2 mb-1">
        <img
            alt="avatar"
            className="w-6 h-6 rounded-full"
        />
        <span className="font-medium">{author?.username || 'Anonymous'}</span>
        <span className="text-xs text-gray-400">
          • {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
        </span>
      </div>
      <p className="text-gray-200">{content}</p>
    </div>
  );
}

export default Comment;
