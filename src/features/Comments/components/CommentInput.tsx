import { Loader2, LucideSend, LucideUserCircle } from "lucide-react";
import React, { useState, useRef } from "react";
import type { Article } from "../../../models/datamodels";
import { useComments } from "../hooks/useComments";
import { useUser } from "../../../hooks/useUser";
import { useNavigate } from "react-router-dom";


interface CommentInputProps {
  article:Article
}

const CommentInput: React.FC<CommentInputProps> = ({


  article
}) => {
  const [comment, setComment] = useState<string>("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const {createComment,isSendingComment} = useComments(article)
  const {isLoggedIn} = useUser()
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (comment.trim()) {
      createComment(comment);
      setComment("");
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="px-2">
      <div className="flex items-center w-full p-3 border border-neutral-300 rounded-full bg-background transition-colors mb-5">
        <input
          type="text"
          placeholder={isLoggedIn ? "What are your thoughts...": "Sign in to comment"}
          className="flex-grow bg-transparent outline-none text-sm text-neutral-100 placeholder-neutral-300 px-2 disabled:opacity-50 disabled:cursor-not-allowed"
          value={comment}
          onChange={(e) => isLoggedIn && setComment(e.target.value)}
          onKeyDown={handleKeyDown}
          ref={inputRef}
          disabled={!isLoggedIn}
        />
        {isLoggedIn ? (
          <button
            onClick={handleSubmit}
            className="ml-2 p-1 text-neutral-100 hover:text-primary-400 transition-colors"
            disabled={comment.trim() === ""}
          >
           { isSendingComment ? <Loader2 className="animate-spin"/> :  <LucideSend size={20} />}
          </button>
        ) : (
          <button
            className="ml-2 flex items-center w-40 justify-center gap-2 py-1 text-neutral-50 rounded-md shadow-sm hover:bg-primary-700 transition-colors"
           onClick={()=>navigate('/auth')}
          >
            <LucideUserCircle size={16} className="text-main-green" />
            Sign In
          </button>
        )}
      </div>
    </div>
  );
};

export default CommentInput;