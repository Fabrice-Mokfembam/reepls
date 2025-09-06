export const NotificationItem = ({ notification }: { notification: { 
  id: number;
  type: string;
  user: string;
  content: string;
  time: string;
  read: boolean;
  icon: React.ElementType;
}}) => {
  const IconComponent = notification.icon;
  
  return (
    <div className={`w-full p-3 sm:p-4 border-b border-gray-200 hover:bg-neutral-800 transition-colors ${!notification.read ? 'bg-primary-700' : ''}`}>
      <div className="flex items-start gap-2 sm:gap-3 w-full">
        <div className="p-1.5 sm:p-2 rounded-full bg-[var(--color-primary-700)]/20">
          <IconComponent size={18} className=" text-[var(--color-primary-400)]" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start">
            <div className="flex flex-wrap items-baseline gap-x-1">
              <span className="font-medium text-neutral-50 truncate">{notification.user}</span>
              <span className="text-neutral-200 text-sm sm:text-base truncate">{notification.content}</span>
            </div>
            {!notification.read && (
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-primary-500 mt-1"></div>
            )}
          </div>
          <p className="text-neutral-100 text-xs sm:text-sm mt-1">{notification.time}</p>
        </div>
      </div>
    </div>
  );
};