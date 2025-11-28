import React, { useState, useEffect } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  Shield, 
  CheckCircle2, 
  XCircle,
  Edit2,
  Save,
  X,
  Loader2
} from 'lucide-react';
import { decryptLoginData } from '../../auth/utils/Encryption';
import type { LoginData } from '../../auth/utils/Encryption';

export const ProfilePage: React.FC = () => {
  const [loginData, setLoginData] = useState<LoginData | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editedBio, setEditedBio] = useState('');

  useEffect(() => {
    const data = decryptLoginData();
    setLoginData(data);
    if (data?.admin?.bio) {
      setEditedBio(data.admin.bio);
    }
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    if (loginData?.admin?.bio) {
      setEditedBio(loginData.admin.bio);
    } else {
      setEditedBio('');
    }
    setIsEditing(false);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // TODO: Implement API call to update admin bio
      // For now, just update local state
      if (loginData) {
        const updatedData = {
          ...loginData,
          admin: {
            ...loginData.admin,
            bio: editedBio,
          },
        };
        // Note: In a real implementation, you'd call an API to update the bio
        // and then update the stored login data
        setLoginData(updatedData);
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Failed to update bio:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return 'Invalid date';
    }
  };

  if (!loginData || !loginData.admin) {
    return (
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-foreground">Profile</h2>
        <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-6">
          <p className="text-red-400">Unable to load profile information</p>
        </div>
      </div>
    );
  }

  const admin = loginData.admin;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-foreground">My Profile</h2>
          <p className="text-neutral-300 mt-1">View and manage your admin account information</p>
        </div>
      </div>

      {/* Profile Header Card */}
      <div className="bg-neutral-800 rounded-lg border border-neutral-700 p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          {/* Avatar */}
          <div className="relative">
            {admin.avatar ? (
              <img
                src={admin.avatar}
                alt={admin.name}
                className="w-24 h-24 rounded-full object-cover border-4 border-neutral-700"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  if (target.nextElementSibling) {
                    (target.nextElementSibling as HTMLElement).style.display = 'flex';
                  }
                }}
              />
            ) : null}
            <div 
              className="w-24 h-24 rounded-full bg-neutral-600 flex items-center justify-center border-4 border-neutral-700" 
              style={{ display: admin.avatar ? 'none' : 'flex' }}
            >
              <User className="w-12 h-12 text-neutral-300" />
            </div>
            {admin.isAdmin && (
              <div className="absolute -bottom-2 -right-2 bg-primary-400 rounded-full p-1.5 border-2 border-neutral-800">
                <Shield className="w-5 h-5 text-neutral-800" />
              </div>
            )}
          </div>

          {/* User Info */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2 flex-wrap">
              <h3 className="text-3xl font-bold text-foreground">{admin.name}</h3>
              {admin.isAdmin && (
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary-400/20 text-primary-400 flex items-center gap-1">
                  <Shield className="w-3 h-3" />
                  Admin
                </span>
              )}
            </div>
            <p className="text-neutral-300 mb-4">{admin.email}</p>
            {admin.bio && !isEditing && (
              <p className="text-foreground mb-4">{admin.bio}</p>
            )}
            {isEditing && (
              <div className="mb-4">
                <textarea
                  value={editedBio}
                  onChange={(e) => setEditedBio(e.target.value)}
                  placeholder="Add a bio..."
                  className="w-full px-4 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-foreground placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent resize-none"
                  rows={3}
                />
                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="px-4 py-2 bg-primary-400 hover:bg-primary-500 text-neutral-800 font-medium rounded-lg transition-colors disabled:opacity-50 flex items-center gap-2"
                  >
                    {isSaving ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        Save
                      </>
                    )}
                  </button>
                  <button
                    onClick={handleCancel}
                    disabled={isSaving}
                    className="px-4 py-2 bg-neutral-700 hover:bg-neutral-600 text-foreground font-medium rounded-lg transition-colors disabled:opacity-50 flex items-center gap-2"
                  >
                    <X className="w-4 h-4" />
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Account Information */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Personal Information */}
        <div className="bg-neutral-800 rounded-lg border border-neutral-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Personal Information</h3>
            {!isEditing && (
              <button
                onClick={handleEdit}
                className="p-2 hover:bg-neutral-700 rounded-lg transition-colors text-neutral-300 hover:text-foreground"
                title="Edit bio"
              >
                <Edit2 className="w-4 h-4" />
              </button>
            )}
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-neutral-300 mb-1">Full Name</p>
              <p className="text-foreground font-medium">{admin.name}</p>
            </div>
            <div>
              <p className="text-sm text-neutral-300 mb-1">Email Address</p>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-neutral-400" />
                <span className="text-foreground">{admin.email}</span>
                {admin.is_email_verified ? (
                  <CheckCircle2 className="w-4 h-4 text-primary-400" />
                ) : (
                  <XCircle className="w-4 h-4 text-neutral-400" />
                )}
              </div>
            </div>
            {admin.phone && (
              <div>
                <p className="text-sm text-neutral-300 mb-1">Phone Number</p>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-neutral-400" />
                  <span className="text-foreground">{admin.phone}</span>
                  {admin.is_phone_verified ? (
                    <CheckCircle2 className="w-4 h-4 text-primary-400" />
                  ) : (
                    <XCircle className="w-4 h-4 text-neutral-400" />
                  )}
                </div>
              </div>
            )}
            <div>
              <p className="text-sm text-neutral-300 mb-1">Role</p>
              <p className="text-foreground font-medium capitalize">{admin.role}</p>
            </div>
          </div>
        </div>

        {/* Account Details */}
        <div className="bg-neutral-800 rounded-lg border border-neutral-700 p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Account Details</h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-neutral-300 mb-1">Account ID</p>
              <p className="text-foreground font-mono text-sm break-all">{admin._id}</p>
            </div>
            <div>
              <p className="text-sm text-neutral-300 mb-1">Account Created</p>
              <div className="flex items-center gap-2 text-foreground">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(admin.createdAt)}</span>
              </div>
            </div>
            <div>
              <p className="text-sm text-neutral-300 mb-1">Last Updated</p>
              <div className="flex items-center gap-2 text-foreground">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(admin.updatedAt)}</span>
              </div>
            </div>
            <div>
              <p className="text-sm text-neutral-300 mb-1">Email Verification</p>
              <div className="flex items-center gap-2">
                {admin.is_email_verified ? (
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary-400/20 text-primary-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    Verified
                  </span>
                ) : (
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-neutral-600 text-neutral-300 flex items-center gap-1">
                    <XCircle className="w-3 h-3" />
                    Not Verified
                  </span>
                )}
              </div>
            </div>
            {admin.phone && (
              <div>
                <p className="text-sm text-neutral-300 mb-1">Phone Verification</p>
                <div className="flex items-center gap-2">
                  {admin.is_phone_verified ? (
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary-400/20 text-primary-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      Verified
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-neutral-600 text-neutral-300 flex items-center gap-1">
                      <XCircle className="w-3 h-3" />
                      Not Verified
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Token Information (for debugging/admin purposes) */}
      <div className="bg-neutral-800 rounded-lg border border-neutral-700 p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Session Information</h3>
        <div className="space-y-3">
          <div>
            <p className="text-sm text-neutral-300 mb-1">Access Token Expires</p>
            <div className="flex items-center gap-2 text-foreground">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(loginData.tokens.access.expires)}</span>
            </div>
          </div>
          <div>
            <p className="text-sm text-neutral-300 mb-1">Refresh Token Expires</p>
            <div className="flex items-center gap-2 text-foreground">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(loginData.tokens.refresh.expires)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

