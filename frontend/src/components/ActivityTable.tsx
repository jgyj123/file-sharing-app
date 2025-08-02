import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, FileText, Download, Upload, Share, Eye, LogIn, LogOut, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockActivityService } from '@/services/mockActivityService';
import type { UserActivity } from '@/types/activity.types';

interface ActivityTableProps {
  userId?: string;
}

const ITEMS_PER_PAGE = 10;

const formatActivityType = (activityType: string): string => {
  return activityType
    .toLowerCase()
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

const getActivityIcon = (activityType: string) => {
  switch (activityType) {
    case 'FILE_UPLOADED':
      return <Upload className="h-4 w-4 text-green-600" />;
    case 'FILE_DOWNLOADED':
      return <Download className="h-4 w-4 text-blue-600" />;
    case 'FILE_DELETED':
      return <Trash2 className="h-4 w-4 text-red-600" />;
    case 'LINK_GENERATED':
      return <FileText className="h-4 w-4 text-purple-600" />;
    case 'LINK_SHARED':
      return <Share className="h-4 w-4 text-orange-600" />;
    case 'LINK_ACCESSED':
      return <Eye className="h-4 w-4 text-indigo-600" />;
    case 'LOGIN':
      return <LogIn className="h-4 w-4 text-gray-600" />;
    case 'LOGOUT':
      return <LogOut className="h-4 w-4 text-gray-600" />;
    default:
      return <FileText className="h-4 w-4 text-gray-400" />;
  }
};

const formatFileSize = (bytes?: number): string => {
  if (!bytes) return '-';
  const kb = bytes / 1024;
  const mb = kb / 1024;
  if (mb >= 1) return `${mb.toFixed(2)} MB`;
  return `${kb.toFixed(2)} KB`;
};

const formatTimestamp = (timestamp: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  }).format(timestamp);
};

const formatDetails = (activity: Omit<UserActivity, 'ipAddress'>): string => {
  const { details, activityType } = activity;
  
  switch (activityType) {
    case 'FILE_UPLOADED':
      if (details.fileSize) {
        return `File uploaded (${formatFileSize(details.fileSize)})`;
      }
      return 'File uploaded successfully';
    case 'LINK_SHARED':
      return details.recipientEmail ? `Sent link to ${details.recipientEmail}` : 'Shared download link';
    case 'LINK_GENERATED':
      return details.shareExpiry 
        ? `Generated shareable link (expires ${new Date(details.shareExpiry).toLocaleDateString()})`
        : 'Generated shareable link';
    case 'LINK_ACCESSED':
      const downloads = details.downloadCount || 1;
      return `User clicked download link (${downloads} ${downloads === 1 ? 'time' : 'times'})`;
    case 'FILE_DOWNLOADED':
      return 'File download completed';
    case 'FILE_DELETED':
      return 'File permanently deleted';
    case 'LOGIN':
      return 'User signed in';
    case 'LOGOUT':
      return 'User signed out';
    default:
      return details.errorMessage || 'Activity completed';
  }
};

export const ActivityTable: React.FC<ActivityTableProps> = ({ userId = 'user123' }) => {
  const [activities, setActivities] = useState<Omit<UserActivity, 'ipAddress'>[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        setLoading(true);
        const data = await mockActivityService.getUserActivitiesSanitized(userId);
        setActivities(data);
      } catch (error) {
        console.error('Failed to fetch activities:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, [userId]);

  const totalPages = Math.ceil(activities.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentActivities = activities.slice(startIndex, endIndex);

  const handlePrevPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Activity History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="text-gray-500">Loading activities...</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Activity History</CardTitle>
        <p className="text-sm text-gray-600">
          Showing {startIndex + 1}-{Math.min(endIndex, activities.length)} of {activities.length} activities
        </p>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-2 font-medium text-gray-700">File</th>
                <th className="text-left py-3 px-2 font-medium text-gray-700">Activity</th>
                <th className="text-left py-3 px-2 font-medium text-gray-700">Timestamp</th>
                <th className="text-left py-3 px-2 font-medium text-gray-700">Details</th>
                <th className="text-left py-3 px-2 font-medium text-gray-700">Location</th>
              </tr>
            </thead>
            <tbody>
              {currentActivities.map((activity) => (
                <tr key={activity.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-2">
                    <div className="text-sm">
                      <div className="font-medium text-gray-900">{activity.fileName || '-'}</div>
                    </div>
                  </td>
                  <td className="py-3 px-2">
                    <div className="flex items-center space-x-2">
                      {getActivityIcon(activity.activityType)}
                      <span className="text-sm font-medium">{formatActivityType(activity.activityType)}</span>
                    </div>
                  </td>
                  <td className="py-3 px-2">
                    <div className="text-sm text-gray-600">
                      {formatTimestamp(activity.timestamp)}
                    </div>
                  </td>
                  <td className="py-3 px-2">
                    <div className="text-sm text-gray-600">
                      {formatDetails(activity)}
                    </div>
                  </td>
                  <td className="py-3 px-2">
                    <div className="text-sm text-gray-600">
                      {activity.location || 'Singapore, SG'}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
            <div className="text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePrevPage}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
