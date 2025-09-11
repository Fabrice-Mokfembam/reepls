import { useContext } from "react";
import { CommentContext } from "../Context/commentcontext/CommentContext";

export const useCommentContext = () => {
  const context = useContext(CommentContext);
  if (context === undefined) {
    throw new Error('useCommentContext must be used within a CommentContextProvider');
  }
  return context;
};