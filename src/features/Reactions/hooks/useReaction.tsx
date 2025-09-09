import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  useCreateReactionRepost,
  useDeleteReaction,
  useGetAllReactionsForTarget,
  useGetReactionsGroupedByType,
  useUpdateReactionRepost,
} from "../../Repost/hooks/useRepost";
import { type TargetType } from "../../Repost/API";
import { useUser } from "../../../hooks/useUser";
import type { ReactionReceived } from "../../../models/datamodels";

export function useReactions(target_type: TargetType, target_id: string) {
  const { authUser, isLoggedIn } = useUser();

  const [isPending, setIsPending] = useState(false);
  const [pendingReaction, setPendingReaction] = useState<string | null>(null);
  const [successReaction, setSuccessReaction] = useState<string | null>(null);
  const [hasUserReacted,setHasUserReacted]= useState<boolean>(false);

  const {
    data: allReactions,
    isLoading: isLoadingAllReactions,
    isError: isErrorAllReactions,
  } = useGetAllReactionsForTarget(target_type, target_id);

  const totalReactions = allReactions?.data?.totalReactions;


  const {
    data: reactionsPerType,
    isLoading: isLoadingReactionsPerType,
    isError: isErrorReactionsPerType,
  } = useGetReactionsGroupedByType(target_type, target_id);

  const { mutate: createReaction, isPending: isCreating,isSuccess:creatingSuccess } = useCreateReactionRepost();
  const { mutate: updateReaction, isPending: isUpdating,isSuccess:isupdatingsuccess } = useUpdateReactionRepost();
  const { mutate: deleteReaction, isPending: isDeleting } = useDeleteReaction();



  useEffect(() => {
    if (isLoggedIn && authUser?.id && allReactions?.data?.reactions) {
      const userReact = allReactions.data.reactions.find(
        (r: ReactionReceived) => r.user_id === authUser.id
      );

      if (userReact) {
        setHasUserReacted(true);
      } else {
        setHasUserReacted(false);
      }
    }
  }, [isLoggedIn, authUser, allReactions]);

  const handleReaction = (reaction: string) => {
    if (!isLoggedIn || !authUser?.id) {
      toast.error("Please log in to React");
      return;
    }

    const userReaction = allReactions?.reactions?.find(
      (r:ReactionReceived) => r.user_id?.id === authUser.id
    );

    // Do nothing if same reaction already exists
    if (userReaction && userReaction.type === reaction) return;

    setIsPending(true);
    setPendingReaction(reaction);

    if (userReaction) {
      updateReaction(
        {
          reactionId: userReaction._id,
          type: reaction,
        },
        {
          onSuccess: () => {
            toast.success("Reaction updated successfully");
            setIsPending(false);
            setPendingReaction(null);
            setSuccessReaction(reaction);
          },
          onError: () => {
            toast.error("Failed to update reaction");
            setIsPending(false);
            setPendingReaction(null);
          },
        }
      );
    } else {
      createReaction(
        {
          target_id,
          target_type,
          type: reaction,
        },
        {
          onSuccess: () => {
            toast.success("Reaction created successfully");
            setIsPending(false);
            setPendingReaction(null);
            setSuccessReaction(reaction);
          },
          onError: () => {
            toast.error("Failed to create reaction");
            setIsPending(false);
            setPendingReaction(null);
          },
        }
      );
    }
  };

  return {
    allReactions,
    reactionsPerType,
    isLoadingAllReactions,
    isErrorAllReactions,
    isLoadingReactionsPerType,
    isErrorReactionsPerType,
    createReaction,
    updateReaction,
    deleteReaction,
    handleReaction,
    isCreating,
    isUpdating,
    isDeleting,
    isPending,
    pendingReaction,
    successReaction,
    totalReactions,
    creatingSuccess,
    isupdatingsuccess,
  hasUserReacted
  };
}
