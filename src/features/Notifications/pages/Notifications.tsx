import { MainContent } from "../../../components/MainContent";
import { RightBar } from "../../../components/RightBar";
import Topbar from "../../../components/Topbar";
import ProfileConfigurations from "../../Profile/components/ProfileConfigurations";
import { MessageSquare, ThumbsUp, UserPlus, FileText, Bell } from "lucide-react";
import { NotificationItem } from "../components/NotificationItem";


// Notification data array
const notifications = [
  {
    id: 1,
    type: "comment",
    user: "fabricemokfembam@gmail.com",
    content: "commented on your post",
    time: "5 mon ago",
    read: false,
    icon: MessageSquare
  },
  {
    id: 2,
    type: "post",
    user: "Wisdom Period 💬",
    content: "published a new post",
    time: "5 days ago",
    read: true,
    icon: FileText
  },
  {
    id: 3,
    type: "post",
    user: "Wisdom Period 💬",
    content: "published a new post",
    time: "4 days ago",
    read: true,
    icon: FileText
  },
  {
    id: 4,
    type: "like",
    user: "Sarah Johnson",
    content: "liked your post",
    time: "2 days ago",
    read: false,
    icon: ThumbsUp
  },
  {
    id: 5,
    type: "follow",
    user: "Michael Chen",
    content: "started following you",
    time: "1 day ago",
    read: false,
    icon: UserPlus
  }
];

export const Notifications = () => {
  return (
    <div className="flex flex-col min-h-screen lg:grid lg:grid-cols-[3fr_1fr] xl:grid-cols-[4fr_1.65fr]">
      <MainContent>
        <Topbar>
          <div className="flex items-center gap-2">
            <div className="text-neutral-100 text-base sm:text-lg">Notifications</div>
          </div>
        </Topbar>
        <div className="w-full max-w-full sm:max-w-3xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col gap-3 sm:gap-4 mt-6 sm:mt-10 will-change-transform">
            {notifications.length > 0 ? (
              notifications.map(notification => (
                <NotificationItem
                  key={notification.id} 
                  notification={notification} 
                />
              ))
            ) : (
              <div className="p-6 sm:p-8 text-center text-neutral-500">
                <Bell size={36} className="sm:size-48 mx-auto mb-4 text-neutral-600" />
                <p className="text-sm sm:text-base">No notifications yet</p>
              </div>
            )}
          </div>
        </div>
      </MainContent>

      <RightBar >
        <ProfileConfigurations />
      </RightBar>
    </div>
  );
};

export default Notifications;