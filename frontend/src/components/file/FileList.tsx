import React, { useState } from 'react';
import { Download, Trash2, FileText, Image, Video, File, Calendar, User, Link, Copy, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export interface FileItem {
  id: string;
  name: string;
  size: number;
  type: string;
  uploadedAt: string;
  uploadedBy: string;
  url?: string;
}

interface FileListProps {
  files: FileItem[];
  onDownload: (file: FileItem) => void;
  onDelete: (file: FileItem) => void;
  onGenerateLink?: (file: FileItem, expiryHours: number) => void;
  currentUser?: string;
}

export const FileList: React.FC<FileListProps> = ({
  files,
  onDownload,
  onDelete,
  onGenerateLink,
  currentUser
}) => {
  const [expandedFile, setExpandedFile] = useState<string | null>(null);
  const [generatedLinks, setGeneratedLinks] = useState<Record<string, { url: string; expiry: number }>>({});
  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith('image/')) return <Image className="h-5 w-5 text-blue-500" />;
    if (fileType.startsWith('video/')) return <Video className="h-5 w-5 text-purple-500" />;
    if (fileType === 'application/pdf') return <FileText className="h-5 w-5 text-red-500" />;
    return <File className="h-5 w-5 text-gray-500" />;
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const canDelete = (file: FileItem): boolean => {
    return currentUser === file.uploadedBy;
  };

  const handleGenerateLink = async (file: FileItem, expiryHours: number) => {
    // Generate dummy presigned URL
    const dummyUrl = `https://file-sharing-uploads-q3w8r.s3.ap-southeast-1.amazonaws.com/${file.name}?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Expires=${expiryHours * 3600}&X-Amz-SignedHeaders=host&X-Amz-Signature=dummySignature123`;
    
    setGeneratedLinks(prev => ({
      ...prev,
      [file.id]: {
        url: dummyUrl,
        expiry: expiryHours
      }
    }));

    if (onGenerateLink) {
      onGenerateLink(file, expiryHours);
    }

    setExpandedFile(null);
  };

  const handleCopyLink = (url: string) => {
    navigator.clipboard.writeText(url);
    // Could add toast notification here
    console.log('Link copied to clipboard');
  };

  const toggleExpanded = (fileId: string) => {
    setExpandedFile(expandedFile === fileId ? null : fileId);
  };

  if (files.length === 0) {
    return (
      <Card>
        <CardContent className="p-8">
          <div className="text-center">
            <File className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-700 mb-2">No files yet</h3>
            <p className="text-sm text-gray-500">
              Upload your first file to get started
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <File className="h-5 w-5" />
          <span>Your Files ({files.length})</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {files.map((file) => (
            <div key={file.id} className="bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex items-center justify-between p-3">
                <div className="flex items-center space-x-3 flex-1 min-w-0">
                  {getFileIcon(file.type)}
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-900 truncate">
                      {file.name}
                    </h4>
                    <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
                      <span className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3" />
                        <span>{formatDate(file.uploadedAt)}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <User className="h-3 w-3" />
                        <span>{file.uploadedBy}</span>
                      </span>
                      <span>{formatFileSize(file.size)}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDownload(file)}
                    className="h-8 w-8 p-0"
                    title="Download file"
                  >
                    <Download className="h-4 w-4" />
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleExpanded(file.id)}
                    className="h-8 w-8 p-0"
                    title="Generate share link"
                  >
                    <Link className="h-4 w-4" />
                  </Button>
                  
                  {canDelete(file) && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDelete(file)}
                      className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                      title="Delete file"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleExpanded(file.id)}
                    className="h-8 w-8 p-0"
                  >
                    <ChevronDown className={`h-4 w-4 transition-transform ${
                      expandedFile === file.id ? 'rotate-180' : ''
                    }`} />
                  </Button>
                </div>
              </div>

              {/* Expanded Options */}
              {expandedFile === file.id && (
                <div className="px-3 pb-3 border-t border-gray-200 bg-white rounded-b-lg">
                  <div className="pt-3">
                    <p className="text-sm font-medium text-gray-700 mb-2">Generate Share Link</p>
                    <div className="grid grid-cols-2 gap-2 mb-3">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleGenerateLink(file, 1)}
                        className="text-xs"
                      >
                        1 Hour
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleGenerateLink(file, 24)}
                        className="text-xs"
                      >
                        24 Hours
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleGenerateLink(file, 168)}
                        className="text-xs"
                      >
                        7 Days
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleGenerateLink(file, 720)}
                        className="text-xs"
                      >
                        30 Days
                      </Button>
                    </div>

                    {/* Generated Link Display */}
                    {generatedLinks[file.id] && (
                      <div className="bg-green-50 border border-green-200 rounded p-3">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-green-800">Share Link Generated</span>
                          <span className="text-xs text-green-600">
                            Expires in {generatedLinks[file.id].expiry}h
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input
                            type="text"
                            value={generatedLinks[file.id].url}
                            readOnly
                            className="flex-1 px-2 py-1 text-xs bg-white border rounded font-mono"
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleCopyLink(generatedLinks[file.id].url)}
                            className="flex items-center space-x-1"
                          >
                            <Copy className="h-3 w-3" />
                            <span className="text-xs">Copy</span>
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
