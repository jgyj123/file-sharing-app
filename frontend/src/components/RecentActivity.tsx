import React, { useState, useEffect } from 'react';
import type { UserActivity } from '../types/activity.types';
import { mockActivityService } from '../services/mockActivityService';

interface RecentActivityProps {
  limit?: number;
}

export const RecentActivity: React.FC<RecentActivityProps> = ({ limit = 5 }) => {
  const [activities, setActivities] = useState<UserActivity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRecentActivities();
  }, []);

  const loadRecentActivities = async () => {
    try {
      const data = await mockActivityService.getUserActivities('user123');
      setActivities(data.slice(0, limit));
    } catch (error) {
      console.error('Failed to load activities:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - timestamp.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return timestamp.toLocaleDateString();
  };

  const getActivityIcon = (activityType: string) => {
    const iconClass = "w-4 h-4";
    
    switch (activityType) {
      case 'FILE_UPLOADED':
        return (
          <div className="bg-green-100 rounded-full p-1">
            <svg className={`${iconClass} text-green-600`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          </div>
        );
      case 'LINK_GENERATED':
        return (
          <div className="bg-purple-100 rounded-full p-1">
            <svg className={`${iconClass} text-purple-600`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
          </div>
        );
      case 'LINK_SHARED':
        return (
          <div className="bg-orange-100 rounded-full p-1">
            <svg className={`${iconClass} text-orange-600`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
            </svg>
          </div>
        );
      case 'LINK_ACCESSED':
        return (
          <div className="bg-blue-100 rounded-full p-1">
            <svg className={`${iconClass} text-blue-600`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
        );
      default:
        return (
          <div className="bg-gray-100 rounded-full p-1">
            <svg className={`${iconClass} text-gray-600`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6" />
            </svg>
          </div>
        );
    }
  };

  const getActivityDescription = (activity: UserActivity) => {
    switch (activity.activityType) {
      case 'FILE_UPLOADED':
        return `Uploaded "${activity.fileName}"`;
      case 'LINK_GENERATED':
        return `Generated link for "${activity.fileName}"`;
      case 'LINK_SHARED':
        return `Shared "${activity.fileName}"`;
      case 'LINK_ACCESSED':
        return `"${activity.fileName}" was accessed`;
      case 'FILE_DOWNLOADED':
        return `Downloaded "${activity.fileName}"`;
      default:
        return `Activity on "${activity.fileName}"`;
    }
  };

  if (loading) {
    return (
      <div className="space-y-3">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="animate-pulse flex items-center space-x-3">
            <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
            <div className="flex-1 space-y-1">
              <div className="h-3 bg-gray-200 rounded w-3/4"></div>
              <div className="h-2 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {activities.length === 0 ? (
        <div className="text-center py-6 text-gray-500">
          <p className="text-sm">No recent activity</p>
        </div>
      ) : (
        activities.map((activity) => (
          <div key={activity.id} className="flex items-center space-x-3 py-2">
            <div className="flex-shrink-0">
              {getActivityIcon(activity.activityType)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-900 truncate">
                {getActivityDescription(activity)}
              </p>
              <p className="text-xs text-gray-500">
                {formatTimestamp(activity.timestamp)}
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};
