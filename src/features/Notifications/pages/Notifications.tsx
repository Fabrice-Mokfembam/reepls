export const Notifications = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Notifications</h1>
      <div className="space-y-4">
        <div className="p-4 border border-neutral-700 rounded-lg">
          <p className="text-neutral-400">
            You're all caught up! No new notifications.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
