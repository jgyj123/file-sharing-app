export interface UserActivity {
  id: string;
  userId: string;
  timestamp: Date;
  activityType: ActivityType;
  fileId?: string;
  fileName?: string;
  details: ActivityDetails;
  ipAddress?: string; // Keep for backend storage
  location?: string;  // Add for frontend display
  userAgent?: string;
}

export type ActivityType =
  | 'FILE_UPLOADED'
  | 'FILE_DOWNLOADED'
  | 'FILE_DELETED'
  | 'LINK_GENERATED'
  | 'LINK_SHARED'
  | 'LINK_ACCESSED'
  | 'LOGIN'
  | 'LOGOUT';

export interface ActivityDetails {
  fileSize?: number;
  shareExpiry?: Date;
  recipientEmail?: string;
  downloadCount?: number;
  errorMessage?: string;
  metadata?: Record<string, any>;
}