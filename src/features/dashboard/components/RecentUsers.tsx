import React, { useMemo } from 'react';
import { User, Loader2 } from 'lucide-react';
import { useUsers } from '../../user-management/hooks/useUsers';

export const RecentUsers: React.FC = () => {
  // Fetch recent users
  const { data: usersData, isLoading } = useUsers({ 
    page: 1, 
    limit: 10
  });

  const recentUsers = useMemo(() => {
    if (!usersData?.results) return [];
    // Sort by createdAt descending (most recent first) and take first 10
    return [...usersData.results]
      .sort((a, b) => {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return dateB - dateA; // Descending order
      })
      .slice(0, 10);
  }, [usersData]);

  return (
    <div className="bg-neutral-800 rounded-lg p-6 border border-neutral-700">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground mb-1">Recent Users</h3>
        <p className="text-sm text-neutral-300">
          {isLoading ? 'Loading users...' : `${recentUsers.length} most recently joined users`}
        </p>
      </div>
      
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-6 h-6 text-primary-400 animate-spin" />
          <span className="ml-2 text-neutral-300">Loading users...</span>
        </div>
      ) : recentUsers.length === 0 ? (
        <div className="text-center py-12 text-neutral-400">
          <p>No users found</p>
        </div>
      ) : (
        <div className="space-y-3 max-h-80 overflow-y-auto">
          {recentUsers.map((user) => (
            <div key={user._id || user.id} className="flex items-center justify-between p-3 bg-neutral-700 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-neutral-600 rounded-full flex items-center justify-center">
                  {user.profile_picture ? (
                    <img 
                      src={user.profile_picture} 
                      alt={user.name || user.username}
                      className="w-10 h-10 rounded-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                  ) : (
                    <User className="w-5 h-5 text-neutral-300" />
                  )}
                </div>
                <div>
                  <p className="text-foreground font-medium">{user.name || user.username || 'Unknown'}</p>
                  <p className="text-sm text-neutral-300">{user.email || user.username || 'No email'}</p>
                </div>
              </div>
              <button
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  user.is_email_verified
                    ? 'bg-primary-400/20 text-primary-400'
                    : 'bg-neutral-600 text-neutral-300'
                }`}
              >
                {user.is_email_verified ? 'Verified' : 'Unverified'}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
