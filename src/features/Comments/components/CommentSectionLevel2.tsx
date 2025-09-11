import React, { useEffect } from "react";
import { LucideX } from "lucide-react";
import CommentMessageLevel2 from "./CommentMessageLevel2";
import type { Comment } from "../../../models/datamodels";
import CommentInputLevel2 from "./CommentInputLevel2";

interface CommentProbs {
  comments: Comment[];
  commentid:string;
  articleid:string;
  oncloseCommentsection: () => void;
}
const CommentSectionLevel2: React.FC<CommentProbs> = ({
  comments,
  commentid,
  articleid,
  oncloseCommentsection,
}) => {
 
  useEffect(() => {
    console.log("comments", comments);
  }, [comments]);

  return (
    <div className="flex flex-col gap-2 border-l border-neutral-500 pl-16">
      <div
        className="self-end mr-4 cursor-pointer my-3"
        onClick={() => oncloseCommentsection()}
      >
        <LucideX className="text-neutral-50" />
      </div>

     
      {comments.map((comment:Comment) => (
            <CommentMessageLevel2 key={comment._id} comment={comment} />
          ))}
          {commentid && <CommentInputLevel2 commentParentid={commentid} commentArticleid={articleid} />}
    </div>
  );
};

export default CommentSectionLevel2;
