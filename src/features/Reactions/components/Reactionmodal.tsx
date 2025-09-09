import React, { useState, useEffect } from 'react';
import { heart, sadface, smile, thumb, clap } from "../../../assets/icons";
import type { Article } from '../../../models/datamodels';
import { useReactions } from '../hooks/useReaction';
import { motion } from 'framer-motion';

interface reactionprobs {
  article: Article;
  onmouseleave: () => void;
}

const reactions = [
  { icon: heart, name: "love" },
  { icon: thumb, name: "like" },
  { icon: smile, name: "smile" },
  { icon: sadface, name: "cry" },
  { icon: clap, name: "clap" },
];



const Reactionmodal: React.FC<reactionprobs> = ({ article, onmouseleave }) => {
  const isRepost = article?.type === "Repost" && !!article?.repost?.repost_id;
  const repostId = article?.repost?.repost_id;

  const {
    handleReaction,
    creatingSuccess,
    isupdatingsuccess,
  } = useReactions(`${isRepost ? 'Repost' : 'Article'}`, `${isRepost ? repostId : article?._id}`);

  // State to track which reaction is pending and success (optional, if you want to animate specific icons)
  const [pendingReaction, setPendingReaction] = useState<string | null>(null);
  const [successReaction, setSuccessReaction] = useState<string | null>(null);

  // Wrap your existing handleReaction to also set animation state
  const handleReact = (name: string) => {
    setPendingReaction(name);
    handleReaction(name); // call your hook mutation or handler
  };

  // Effects to watch for creating/updating success and reset states
  useEffect(() => {
    if (creatingSuccess || isupdatingsuccess) {
      setSuccessReaction(pendingReaction);
      setPendingReaction(null);
      // Reset success animation after a moment
      const timer = setTimeout(() => setSuccessReaction(null), 1000);
      return () => clearTimeout(timer);
    }
  }, [creatingSuccess, isupdatingsuccess, pendingReaction]);

  return (
    <div className="bg-background rounded-full flex gap-3 p-2 shadow-md items-center z-[1000] relative">
      <div onClick={onmouseleave} className='fixed bg-black/0 inset-0 z-20'></div>
      {reactions.map(({ icon, name }) => (
        <button
          key={name}
          type="button"
          aria-label={name}
          onClick={() => handleReact(name)}
          className="w-9 h-9 rounded-full flex items-center justify-center cursor-pointer transition z-50"
          disabled={Boolean(pendingReaction && pendingReaction !== name)} // Disable other buttons while pending
        >
          <motion.img
            src={icon}
            alt={name}
            className="w-6 h-6"
            variants={{
              bounce: {
                y: [0, -10, 0],
                transition: { duration: 0.6, ease: "easeOut" }
              },
              glow: {
                scale: [1, 1.2, 1],
                opacity: [1, 0.7, 1],
                transition: { duration: 1, repeat: Infinity, ease: "easeInOut" }
              }
            }}
            animate={
              successReaction === name
                ? "bounce"
                : pendingReaction === name
                ? "glow"
                : ""
            }
          />
        </button>
      ))}
    </div>
  );
};

export default Reactionmodal;
