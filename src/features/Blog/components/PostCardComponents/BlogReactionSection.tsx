import React, {  useRef, useState} from 'react';
import { ThumbsUp,  Radio, MessageCircle, LucideLoader2 } from 'lucide-react';
import type { Article } from '../../../../models/datamodels';
import Reactionmodal from '../../../Reactions/components/Reactionmodal';
import { useReactions } from '../../../Reactions/hooks/useReaction';
import CommentSection from '../../../Comments/components/CommentSection';
import { useRepostArticle } from '../../../Repost/hooks/useRepost';
import { useUser } from '../../../../hooks/useUser';
import BlogRepostModal from '../../../Repost/components/BlogRepostModal';


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

    const { mutate: repost, isPending: isReposting } = useRepostArticle();
    const {isLoggedIn}=useUser()

  const { hasUserReacted
  } = useReactions(`${isRepost ? 'Repost' : 'Article'}`, `${isRepost ? repostId : article?._id}`);


  const [showRepostModal, setShowRepostModal] = useState(false);
    const [isRepostModalOpen, setIsRepostModalOpen] = useState(false);
      const repostRef = useRef<HTMLDivElement>(null);


  const onThumbMouseEnter = () => {
    setIsReactionOpen(true);
  };

  const onThumbMouseLeave = () => {
    setIsReactionOpen(false);
  };


   const handleRepostOnly = () => {
    repost(
      { articleId: article._id!, comment: "" },
      {
        onSuccess: () => {
          setShowRepostModal(false);
        
        },
        onError: () => {
          setShowRepostModal(false);
          
        },
      }
    );
  };

   const handleRepostClick = () => {
    if (!isLoggedIn) {
      alert('Please login to repost');
      return;
    };
    setShowRepostModal(!showRepostModal);
  };

    const handleRepostWithThought = () => {
    setIsRepostModalOpen(true);
    setShowRepostModal(false);
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
         <div
            className="relative flex items-center gap-1 text-neutral-50 cursor-pointer"
            ref={repostRef}
          >
            <button
              onClick={handleRepostClick}
              className="flex hover:text-primary-500 text-sm items-center gap-1 cursor-pointer"
              disabled={isReposting}
            >
              {isReposting ? (
                <>
                  <LucideLoader2 className="animate-spin inline-block mr-1" />{" "}
                  Reposting...
                </>
              ) : (
                <>
                  <Radio className="size-4 mr-1" /> Repost
                </>
              )}
            </button>

            {showRepostModal && (
              <div className="absolute bg-background bottom-full right-0 mt- border border-neutral-700 rounded-md shadow-lg z-50 min-w-[190px] p-2">
                <div className="py-1">
                  <button
                    onClick={handleRepostOnly}
                    className="py-2 text-s hover:text-primary-400 transition-colors w-full text-left"
                    disabled={isReposting}
                  >
                    {isReposting ? (
                      <>
                        <LucideLoader2 className="animate-spin inline-block mr-1" />{" "}
                        Reposting...
                      </>
                    ) : (
                      "Repost only"
                    )}
                  </button>
                  <div className="w-full h-[.5px] bg-neutral-500"></div>
                  <button
                    onClick={handleRepostWithThought}
                    className="py-2 text-s hover:text-primary-400 transition-colors w-full text-left"
                  >
                    Repost with your thought
                  </button>
                </div>
              </div>
            )}
          </div>

         <BlogRepostModal
            isOpen={isRepostModalOpen}
            onClose={() => setIsRepostModalOpen(false)}
            article_id={article._id!}
            author_of_post={article?.author_id || {}}
            article={article}
          />
    </div>
   { isCommentSectionOpen && <CommentSection oncloseCommentsection={closeComments} article={article} />}
  </>

  );
};

export default BlogReactionSection;
