import { FC } from 'react';

import { useSettings } from './useSettings';

export interface SettingsDrawerProps extends ReturnType<typeof useSettings> {}

export const SettingsDrawer: FC<SettingsDrawerProps> = ({ language, setLanguage }) => {
  return (
    <div className="drawer-side">
      <label htmlFor="settings-drawer" className="drawer-overlay"></label>
      <ul className="menu p-4 w-80 h-full bg-white text-base-content">
        {/* Sidebar content here */}
        <div className="prose flex flex-col gap-4">
          <h1>Settings</h1>

          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Language</span>
            </label>
            <select
              className="select select-bordered"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="en">English</option>
              <option value="zh-CN">Chinese</option>
            </select>
          </div>
        </div>
      </ul>
    </div>
  );
};
