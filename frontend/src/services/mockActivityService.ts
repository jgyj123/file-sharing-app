import type { UserActivity } from '../types/activity.types';

const getLocationFromIP = (ipAddress: string): string => {
  // Mock location mapping - in real app, you'd use a geolocation service
  const locationMap: Record<string, string> = {
    '192.168.1.100': 'Singapore, SG',
    '203.128.45.67': 'Singapore, SG',
    '10.0.0.1': 'Singapore, SG',
    '172.16.0.1': 'Kuala Lumpur, MY',
    '203.0.113.1': 'Jakarta, ID'
  };
  
  return locationMap[ipAddress] || 'Singapore, SG';
};

const generateSampleActivities = (): UserActivity[] => {
  const now = new Date();
  const activities: UserActivity[] = [
    {
      id: '1',
      userId: 'user123',
      timestamp: new Date(now.getTime() - 5 * 60 * 1000), // 5 minutes ago
      activityType: 'FILE_UPLOADED',
      fileId: 'file_001',
      fileName: 'project-proposal.pdf',
      details: {
        fileSize: 2048000, // 2MB
        metadata: { uploadMethod: 'drag-drop' }
      },
      ipAddress: '192.168.1.100',
      location: getLocationFromIP('192.168.1.100')
    },
    {
      id: '2',
      userId: 'user123',
      timestamp: new Date(now.getTime() - 10 * 60 * 1000), // 10 minutes ago
      activityType: 'LINK_GENERATED',
      fileId: 'file_001',
      fileName: 'project-proposal.pdf',
      details: {
        shareExpiry: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)
      },
      ipAddress: '192.168.1.100',
      location: getLocationFromIP('192.168.1.100')
    },
    {
      id: '3',
      userId: 'user123',
      timestamp: new Date(now.getTime() - 30 * 60 * 1000), // 30 minutes ago
      activityType: 'LINK_SHARED',
      fileId: 'file_001',
      fileName: 'project-proposal.pdf',
      details: {
        recipientEmail: 'colleague@company.com'
      },
      ipAddress: '192.168.1.100',
      location: getLocationFromIP('192.168.1.100')
    },
    {
      id: '4',
      userId: 'user123',
      timestamp: new Date(now.getTime() - 2 * 60 * 60 * 1000), // 2 hours ago
      activityType: 'FILE_UPLOADED',
      fileId: 'file_002',
      fileName: 'budget-spreadsheet.xlsx',
      details: {
        fileSize: 512000 // 512KB
      },
      ipAddress: '192.168.1.100',
      location: getLocationFromIP('192.168.1.100')
    },
    {
      id: '5',
      userId: 'user123',
      timestamp: new Date(now.getTime() - 4 * 60 * 60 * 1000), // 4 hours ago
      activityType: 'LINK_ACCESSED',
      fileId: 'file_001',
      fileName: 'project-proposal.pdf',
      details: {
        downloadCount: 1
      },
      ipAddress: '203.128.45.67',
      location: getLocationFromIP('203.128.45.67')
    }
  ];

  return activities.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
};

export const mockActivityService = {
  // Full data for backend/admin use
  getUserActivities: async (userId: string): Promise<UserActivity[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return generateSampleActivities().filter(activity => activity.userId === userId);
  },

  // Sanitized data for frontend/user display (removes IP addresses)
  getUserActivitiesSanitized: async (userId: string): Promise<Omit<UserActivity, 'ipAddress'>[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const activities = generateSampleActivities().filter(activity => activity.userId === userId);
    
    // Remove IP addresses for frontend display
    return activities.map(({ ipAddress, ...activity }) => activity);
  },

  getActivityStats: async (userId: string) => {
    const activities = await mockActivityService.getUserActivities(userId);
    
    return {
      totalFiles: new Set(activities.map(a => a.fileId).filter(Boolean)).size,
      totalUploads: activities.filter(a => a.activityType === 'FILE_UPLOADED').length,
      totalDownloads: activities.filter(a => a.activityType === 'FILE_DOWNLOADED').length,
      totalShares: activities.filter(a => a.activityType === 'LINK_SHARED').length,
      totalActivities: activities.length
    };
  }
};