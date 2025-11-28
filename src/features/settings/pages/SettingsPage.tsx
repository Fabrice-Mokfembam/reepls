import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UserPlus, Settings as SettingsIcon, Shield } from 'lucide-react';
import { ROUTES } from '../../../shared/constants';

export const SettingsPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Settings</h2>
          <p className="text-neutral-300 mt-1">Manage admin settings and configurations</p>
        </div>
      </div>

      {/* Settings Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Create Admin Card */}
        <div
          onClick={() => navigate(`${ROUTES.SETTINGS}/create-admin`)}
          className="bg-neutral-800 rounded-lg border border-neutral-700 p-6 hover:border-primary-400/50 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-primary-400/20 rounded-lg">
              <UserPlus className="w-6 h-6 text-primary-400" />
            </div>
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary-400 transition-colors">
            Create Admin
          </h3>
          <p className="text-sm text-neutral-300">
            Register a new admin user to the system
          </p>
        </div>

        {/* Settings Options (Placeholder for future settings) */}
        <div className="bg-neutral-800 rounded-lg border border-neutral-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-secondary-400/20 rounded-lg">
              <SettingsIcon className="w-6 h-6 text-secondary-400" />
            </div>
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            General Settings
          </h3>
          <p className="text-sm text-neutral-300">
            Configure general platform settings
          </p>
        </div>

        {/* Admin Management (Placeholder) */}
        <div className="bg-neutral-800 rounded-lg border border-neutral-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-primary-400/20 rounded-lg">
              <Shield className="w-6 h-6 text-primary-400" />
            </div>
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Admin Management
          </h3>
          <p className="text-sm text-neutral-300">
            Manage existing admin accounts
          </p>
        </div>
      </div>
    </div>
  );
};

