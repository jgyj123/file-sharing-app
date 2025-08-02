import React, { useState, useEffect } from 'react';
import { User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileUpload, FileList, type FileItem } from '@/components/file';
import { useAuth } from '@/hooks/useAuth';
import { ActivityTable } from '@/components/ActivityTable';

export const HomePage: React.FC = () => {
  const { user, loading, signOut } = useAuth();
  const [files, setFiles] = useState<FileItem[]>([]);

  // Mock data for demonstration
  useEffect(() => {
    if (user) {
      // This would typically come from an API call
      const mockFiles: FileItem[] = [
        {
          id: '1',
          name: 'sample-document.pdf',
          size: 1024 * 1024 * 2.5, // 2.5MB
          type: 'application/pdf',
          uploadedAt: new Date().toISOString(),
          uploadedBy: user.email,
        },
        {
          id: '2',
          name: 'image.jpg',
          size: 1024 * 1024 * 3.2, // 3.2MB
          type: 'image/jpeg',
          uploadedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
          uploadedBy: user.email,
        },
      ];
      setFiles(mockFiles);
    }
  }, [user]);

  const handleFileUpload = async (file: File) => {
    // TODO: Implement actual file upload to S3
    console.log('Uploading file:', file.name);
    
    // Mock upload - in reality, this would upload to S3
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Add file to list
    const newFile: FileItem = {
      id: Date.now().toString(),
      name: file.name,
      size: file.size,
      type: file.type,
      uploadedAt: new Date().toISOString(),
      uploadedBy: user?.email || 'unknown',
    };
    
    setFiles(prev => [newFile, ...prev]);
  };

  const handleFileDownload = (file: FileItem) => {
    // TODO: Implement actual file download from S3
    console.log('Downloading file:', file.name);
    // This would typically generate a presigned URL and initiate download
  };

  const handleFileDelete = (file: FileItem) => {
    // TODO: Implement actual file deletion from S3
    console.log('Deleting file:', file.name);
    setFiles(prev => prev.filter(f => f.id !== file.id));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg text-gray-600">Please sign in to continue</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900">File Sharing</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <User className="h-4 w-4" />
                <span>{user.email}</span>
              </div>
              <Button 
                variant="outline" 
                onClick={signOut}
                className="flex items-center space-x-2"
              >
                <LogOut className="h-4 w-4" />
                <span>Sign Out</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* File Upload Section */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Upload Files</CardTitle>
              </CardHeader>
              <CardContent>
                <FileUpload onFileUpload={handleFileUpload} />
              </CardContent>
            </Card>
          </div>

          {/* File List Section */}
          <div className="lg:col-span-2">
            <FileList
              files={files}
              onDownload={handleFileDownload}
              onDelete={handleFileDelete}
              currentUser={user.email}
            />
          </div>
        </div>

        {/* Activity Table Section */}
        <div className="mt-8">
          <ActivityTable userId="user123" />
        </div>
      </main>
    </div>
  );
};
