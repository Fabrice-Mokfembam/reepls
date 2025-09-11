import{ createContext } from 'react';

interface CommentContextType {
  openReplyId: string | null;
  setOpenReplyId: (id: string | null) => void;
}

export const CommentContext = createContext<CommentContextType | undefined>(undefined);

