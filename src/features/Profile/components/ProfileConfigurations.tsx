import React, { useState } from 'react'
import ConfigurationWrapper from './ConfigurationWrapper'
import { useTheme } from '../../../Context/ThemeContext/themeContext';
import { t } from 'i18next';
import i18n from '../../../i18n';

const ProfileConfigurations:React.FC = () => {
  const {theme, toggleTheme} = useTheme()
  const [isVideoAutoPlay, setIsVideoAutoPlay] = useState<boolean>(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState<boolean>(false);

  const handleProfileSettingsClick = () => {
    console.log('Profile Settings clicked');
  };

  const handleViewAnalyticsClick = () => {
    console.log('View Analytics clicked');
  };

  const handleDefaultLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(e.target.value);
    console.log('Default Language changed to:', e.target.value);
  };

  const handleNotificationsToggle = () => {
    setNotificationsEnabled(!notificationsEnabled);
    console.log('Notifications toggled');
  };

  const handleToggleAutoPlay = () => {
    setIsVideoAutoPlay(!isVideoAutoPlay);
  };

  const handleThemeToggle = () => {
    toggleTheme()
  };

  const handleTermsClick = () => {
    console.log('Terms and Policies clicked');
  };

  const handleLogoutClick = () => {
    console.log('Logout clicked');
  };

  return (
    <div className="p-4 flex flex-col">
      <h2 className="text-xl text-neutral-100 font-semibold mb-4">Settings</h2>
      <div className='flex-1 flex flex-col gap-6 mt-4'>
        <ConfigurationWrapper>
          <div className="cursor-pointer w-full" onClick={handleProfileSettingsClick}>
            Profile Settings
          </div>
        </ConfigurationWrapper>

        <ConfigurationWrapper>
          <div className="cursor-pointer w-full" onClick={handleViewAnalyticsClick}>
            View Analytics
          </div>
        </ConfigurationWrapper>
        <ConfigurationWrapper>
          <div className="cursor-pointer w-full" onClick={handleViewAnalyticsClick}>
            Manage Streams
          </div>
        </ConfigurationWrapper>
        <ConfigurationWrapper>
          <div className="cursor-pointer w-full" onClick={handleViewAnalyticsClick}>
            Drafts
          </div>
        </ConfigurationWrapper>

        <ConfigurationWrapper>
          <div className="flex justify-between items-center w-full">
            <span>Default Language</span>
            <select className="bg-transparent border-none focus:outline-none" onChange={handleDefaultLanguageChange}>
              <option value="en">English</option>
              <option value="fr">French</option>
            </select>
          </div>
        </ConfigurationWrapper>

        <ConfigurationWrapper>
          <div className="flex justify-between items-center w-full">
            <span>Notifications</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={notificationsEnabled}
                onChange={handleNotificationsToggle} 
              />
              <div className={`w-11 h-6 rounded-full peer ${notificationsEnabled ? 'bg-primary-400' : 'bg-gray-400'} peer-checked:bg-primary-400`}></div>
              <div className={`absolute top-0.5 left-0.5 bg-white border rounded-full h-5 w-5 transition-all ${notificationsEnabled ? 'transform translate-x-5' : ''}`}></div>
            </label>
          </div>
        </ConfigurationWrapper>

        <ConfigurationWrapper>
          <div className="flex justify-between items-center w-full">
            <span>{t(`profile.videoAutoPlay`)}</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={isVideoAutoPlay}
                onChange={handleToggleAutoPlay} 
              />
              <div className={`w-11 h-6 rounded-full peer ${isVideoAutoPlay ? 'bg-primary-400' : 'bg-gray-400'} peer-checked:bg-primary-400`}></div>
              <div className={`absolute top-0.5 left-0.5 bg-white border rounded-full h-5 w-5 transition-all ${isVideoAutoPlay ? 'transform translate-x-5' : ''}`}></div>
            </label>
          </div>
        </ConfigurationWrapper>

        <ConfigurationWrapper>
          <div className="flex justify-between items-center w-full">
            <span>{t('Theme')}</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={theme === "dark"}
                onChange={handleThemeToggle} 
              />
              <div className={`w-11 h-6 rounded-full peer ${theme === "dark" ? 'bg-primary-400' : 'bg-gray-400'} peer-checked:bg-primary-400`}></div>
              <div className={`absolute top-0.5 left-0.5 bg-white border rounded-full h-5 w-5 transition-all ${theme === "dark" ? 'transform translate-x-5' : ''}`}></div>
            </label>
          </div>
        </ConfigurationWrapper>

        <ConfigurationWrapper>
          <div className="cursor-pointer w-full" onClick={handleTermsClick}>
            Terms and Policies
          </div>
        </ConfigurationWrapper>
  <ConfigurationWrapper>
          <div className="cursor-pointer w-full" onClick={handleLogoutClick}>
            Logout
          </div>
        </ConfigurationWrapper>
        <ConfigurationWrapper>
          <div className="cursor-pointer w-full" onClick={handleLogoutClick}>
            Delete Account
          </div>
        </ConfigurationWrapper>
      </div>
      
    </div>
  );
};

export default ProfileConfigurations;