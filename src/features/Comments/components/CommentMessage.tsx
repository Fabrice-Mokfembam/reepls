import React, { useState, useRef, useEffect } from 'react';
import { Ellipsis, MessageCircle, ThumbsUp, Edit, Trash2 } from 'lucide-react';
import type { Comment } from '../../../models/datamodels';
import { timeAgo } from '../../../utils/dateFormater';
import { useRoute } from '../../../hooks/useRoute';

import CommentSectionLevel2 from './CommentSectionLevel2';

interface commentprobs{
    comment:Comment;
}

const CommentMessage: React.FC<commentprobs> = ({comment}) => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const {routeToUseProfile} =useRoute()
  const [isLevel2Open,setIsLevelTwoopen] = useState(false);

  // Close the popup if clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    }

    if (showMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showMenu]);

  const closeLevel2 = () => {
    setIsLevelTwoopen(false);
  }

  const toggleComments = () => {
    setIsLevelTwoopen(!isLevel2Open);
  }

  return (
<>
    <div className="text-neutral-100 font-sans">
      <div className="bg-background">
        <div className="bg-neutral-700 p-4 rounded-md relative">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
                {comment.author?.profile_picture ? (
            <img
              src={comment.author?.profile_picture}
              alt={comment.author?.username}
              className="size-6 rounded-full object-cover"
              onClick={()=>routeToUseProfile(comment.author?.username || '')}
            />
          ) : (
            <div
              className="size-6 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold text-[13px]"
              onClick={()=>routeToUseProfile(comment.author?.username || '')}
            >
              {comment.author?.name?.charAt(0)}
            </div>
          )}
              <span onClick={()=>routeToUseProfile(comment.author?.username || '')} className="font-semibold text-[15px] hover:underline cursor-pointer">{comment.author?.name}</span>
            </div>
            <div className="flex items-center gap-1 relative">
              <span className="text-xs text-neutral-300">{timeAgo(comment?.createdAt?.toString() || '')}</span>
              <Ellipsis
                className="w-4 h-4 cursor-pointer"
                onClick={() => setShowMenu(!showMenu)}
              />
              {showMenu && (
                <div
                  ref={menuRef}
                  className="absolute top-full right-0 mt-2 w-28 bg-neutral-800 rounded-md shadow-lg z-50 text-neutral-50"
                >
                  <button
                    className="flex items-center gap-2 px-4 py-2 hover:bg-neutral-700 w-full text-left rounded-t-md"
                    onClick={() => {
                      // handle Edit action
                      alert('Edit clicked');
                      setShowMenu(false);
                    }}
                  >
                    <Edit className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    className="flex items-center gap-2 px-4 py-2 hover:bg-neutral-700 w-full text-left rounded-b-md text-red-500"
                    onClick={() => {
                      // handle Delete action
                      alert('Delete clicked');
                      setShowMenu(false);
                    }}
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
          <p className="text-sm py-1">{comment?.content}</p>
        </div>

        <div className="flex gap-6 text-xs text-neutral-50 p-2">
          <button className="flex items-center gap-1 hover:text-primary-400 transition-colors cursor-pointer">
            <ThumbsUp className="w-4 h-4" />
            <span>React • 0 </span>
          </button>
          <button className="flex items-center gap-1 hover:text-primary-400 transition-colors cursor-pointer">
            <MessageCircle className="w-4 h-4" />
            <span onClick={()=>toggleComments()}>Reply • </span>
            <span className="text-primary-400">{comment.replies?.length || 0} replies</span>
          </button>
        </div>
      </div>
    </div>

    {
        isLevel2Open && (
            <CommentSectionLevel2 articleid={comment.targetId!} commentid={comment._id!} comments={comment.replies || []} oncloseCommentsection={closeLevel2} />
        )
    }
</>
  );
};

export default CommentMessage;
