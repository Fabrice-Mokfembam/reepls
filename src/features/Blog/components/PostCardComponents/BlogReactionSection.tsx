import React, {  useState} from 'react';
import { ThumbsUp,  Radio, MessageCircle } from 'lucide-react';
import type { Article } from '../../../../models/datamodels';
import Reactionmodal from '../../../Reactions/components/Reactionmodal';
import { useReactions } from '../../../Reactions/hooks/useReaction';
import CommentSection from '../../../Comments/components/CommentSection';


interface Articleprobs {
  article: Article;
}

const BlogReactionSection: React.FC<Articleprobs & {
  openComments: () => void;
  closeComments: () => void;
  toggleComments: () => void;
  isCommentSectionOpen: boolean;
}> = ({ article, closeComments, toggleComments, isCommentSectionOpen }) => {    
  const [isReactionOpen, setIsReactionOpen] = useState(false);
  const isRepost = article?.type === "Repost" && !!article?.repost?.repost_id;
  const repostId = article?.repost?.repost_id;

  const { hasUserReacted
  } = useReactions(`${isRepost ? 'Repost' : 'Article'}`, `${isRepost ? repostId : article?._id}`);





  const onThumbMouseEnter = () => {
    setIsReactionOpen(true);
  };

  const onThumbMouseLeave = () => {
    setIsReactionOpen(false);
  };



  return (<>
      <div className="flex items-center text-neutral-50 justify-between py-5 border-t border-gray-200 relative">
      {/* React Button */}
     
      <button
   
        onMouseEnter={onThumbMouseEnter}
       
        className="flex cursor-pointer items-center space-x-2 hover:text-primary-500 transition-colors relative"
      >
        <ThumbsUp className={`w-5 h-5 ${hasUserReacted? 'fill-primary-400 text-primary-400':''}`} />
        <span className="text-sm font-medium">React</span>
           {isReactionOpen && (
        <div
          onMouseEnter={() => setIsReactionOpen(true)} 
          className="absolute -top-14 z-[9000px] left-8"
        >
          <Reactionmodal article={article} onmouseleave={onThumbMouseLeave}/>
        </div>
      )}
      </button>

      {/* Comment Button */}
      <button onClick={()=>toggleComments()} className="flex cursor-pointer items-center space-x-2 hover:text-primary-500 transition-colors">
        <MessageCircle className="w-5 h-5" />
        <span className="text-sm font-medium">Comment</span>
      </button>

      {/* Repost Button */}
      <button className="flex items-center space-x-2 hover:text-primary-500 transition-colors">
        <Radio className="w-5 h-5" />
        <span className="text-sm font-medium">Repost</span>
      </button>
    </div>
   { isCommentSectionOpen && <CommentSection oncloseCommentsection={closeComments} article={article} />}
  </>

  );
};

export default BlogReactionSection;
