import { useCallback } from "react";

import { t } from "i18next";
import { useCurrentUser } from "../../Auth/hooks/useCurrentUser";
import { useKnowUserFollowings } from "./useKnowUserFollowings";
import { useUnfollowUser } from ".";
import { useSendFollowNotification } from "../../Notifications/hooks/useNotification";
import { toast } from "react-toastify";


interface UseFollowUserProps {
  targetUserId: string | undefined;
}

export function useFollowUser({ targetUserId }: UseFollowUserProps) {
  const { isAuthenticated:isLoggedIn } = useCurrentUser();
  const { isFollowing } = useKnowUserFollowings();
  const { mutate: unfollowUser, isPending: isUnfollowPending } = useUnfollowUser();
  const { mutate: followUser, isPending: isFollowPending } = useSendFollowNotification();

  const following = targetUserId ? isFollowing(targetUserId) : false;

  const follow = useCallback(() => {
    if (!isLoggedIn) {
      toast.error(t("please SignIn"));
      return;
    }
    if (!targetUserId) return;

    followUser(
      { receiver_id: targetUserId },
      {
        onSuccess: () => toast.success(t("User Followed successfully")),
        onError: () => toast.error(t("User Follow Failed")),
      }
    );
  }, [isLoggedIn, targetUserId, followUser]);

  const unfollow = useCallback(() => {
    if (!isLoggedIn) {
      toast.error(t("please SignIn"));
      return;
    }
    if (!targetUserId) return;

    unfollowUser(targetUserId, {
      onSuccess: () => toast.success(t("User Unfollowed")),
      onError: () => toast.error(t("User Unfollow Failed")),
    });
  }, [isLoggedIn, targetUserId, unfollowUser]);

  const toggleFollow = useCallback(() => {
    if (following) {
      unfollow();
    } else {
      follow();
    }
  }, [following, follow, unfollow]);

  return {
    isFollowing: following,
    follow,
    unfollow,
    toggleFollow,
    isFollowPending,
    isUnfollowPending,
  };
}
