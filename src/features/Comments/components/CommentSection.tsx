import React, { useEffect } from "react";
import CommentInput from "./CommentInput";
import { LucideX } from "lucide-react";
import CommentMessage from "./CommentMessage";
import type { Article } from "../../../models/datamodels";
import { useComments } from "../hooks/useComments";
import CommentMessageShadow from "./CommentMessageShadow";

interface CommentProbs {
  article: Article;
  oncloseCommentsection: () => void;
}
const CommentSection: React.FC<CommentProbs> = ({
  article,
  oncloseCommentsection,
}) => {
  const { Comments, totalComments, articleComments, isLoading } =
    useComments(article);
  useEffect(() => {
    console.log("comments", Comments, "article comments", articleComments);
  }, [Comments, totalComments, articleComments]);

  return (
    <div className="flex flex-col gap-2 py-3 ">
      <div
        className="self-end mr-4 cursor-pointer my-3"
        onClick={() => oncloseCommentsection()}
      >
        <LucideX className="text-neutral-50" />
      </div>

      <CommentInput article={article} />
      {isLoading ? (
        <CommentMessageShadow />
      ) : (
        <>
          {Comments.map((comment) => (
            <CommentMessage key={comment.comment_id} comment={comment} />
          ))}
        </>
      )}
    </div>
  );
};

export default CommentSection;
