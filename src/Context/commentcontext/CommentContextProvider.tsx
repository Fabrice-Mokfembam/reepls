import { useState } from "react";
import { CommentContext } from "./CommentContext";

export const CommentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [openReplyId, setOpenReplyId] = useState<string | null>(null);

  return (
    <CommentContext.Provider value={{ openReplyId, setOpenReplyId }}>
      {children}
    </CommentContext.Provider>
  );
};