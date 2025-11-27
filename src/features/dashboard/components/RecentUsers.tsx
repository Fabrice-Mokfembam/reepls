import React from 'react';
import { User } from 'lucide-react';

const users = [
  { name: 'John Doe Tyre', email: 'johndoedontyre@gmail.com', status: 'Active' },
  { name: 'Jane Smith', email: 'jane.smith@example.com', status: 'Inactive' },
  { name: 'Mike Johnson', email: 'mike.j@example.com', status: 'Active' },
  { name: 'Sarah Wilson', email: 'sarah.w@example.com', status: 'Inactive' },
  { name: 'David Brown', email: 'david.b@example.com', status: 'Active' },
  { name: 'Lisa Davis', email: 'lisa.d@example.com', status: 'Active' },
  { name: 'Tom Miller', email: 'tom.m@example.com', status: 'Active' },
];

export const RecentUsers: React.FC = () => {
  return (
    <div className="bg-neutral-800 rounded-lg p-6 border border-neutral-700">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground mb-1">Recent Users</h3>
        <p className="text-sm text-neutral-300">10 users recently joined the platform</p>
      </div>
      
      <div className="space-y-3 max-h-80 overflow-y-auto">
        {users.map((user, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-neutral-700 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-neutral-600 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-neutral-300" />
              </div>
              <div>
                <p className="text-foreground font-medium">{user.name}</p>
                <p className="text-sm text-neutral-300">{user.email}</p>
              </div>
            </div>
            <button
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                user.status === 'Active'
                  ? 'bg-primary-400/20 text-primary-400'
                  : 'bg-neutral-600 text-neutral-300'
              }`}
            >
              {user.status}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
