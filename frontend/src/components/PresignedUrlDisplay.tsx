import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy, ExternalLink, Clock } from 'lucide-react';

interface PresignedUrlDisplayProps {
  fileName?: string;
  onGenerateUrl?: () => void;
}

export const PresignedUrlDisplay: React.FC<PresignedUrlDisplayProps> = ({ 
  fileName = "test-document.pdf",
  onGenerateUrl 
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [urlGenerated, setUrlGenerated] = useState(false);

  // Dummy presigned URL data
  const dummyData = {
    uploadUrl: "https://file-sharing-uploads-q3w8r.s3.ap-southeast-1.amazonaws.com/uploads/1754164937319-test-document.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAIOSFODNN7EXAMPLE%2F20250803%2Fap-southeast-1%2Fs3%2Faws4_request&X-Amz-Date=20250803T153000Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=exampleSignature123456789",
    fileKey: `uploads/${Date.now()}-${fileName}`,
    expiresIn: 300,
    generatedAt: new Date().toISOString()
  };

  const handleGenerateUrl = async () => {
    setIsGenerating(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsGenerating(false);
    setUrlGenerated(true);
    
    if (onGenerateUrl) {
      onGenerateUrl();
    }
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(dummyData.uploadUrl);
    // You could add a toast notification here
    console.log('URL copied to clipboard');
  };

  const handleTestUrl = () => {
    // Open URL in new tab for testing
    window.open(dummyData.uploadUrl, '_blank');
  };

  const formatExpiryTime = () => {
    const expiryTime = new Date(Date.now() + dummyData.expiresIn * 1000);
    return expiryTime.toLocaleTimeString();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <span>Presigned URL Generator</span>
          <Clock className="h-4 w-4 text-gray-500" />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* File Info */}
        <div className="bg-gray-50 p-3 rounded-lg">
          <p className="text-sm text-gray-600">Target File:</p>
          <p className="font-medium">{fileName}</p>
        </div>

        {/* Generate Button */}
        <Button 
          onClick={handleGenerateUrl}
          disabled={isGenerating}
          className="w-full"
        >
          {isGenerating ? (
            <div className="flex items-center space-x-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              <span>Generating URL...</span>
            </div>
          ) : (
            'Generate Presigned URL'
          )}
        </Button>

        {/* URL Display */}
        {urlGenerated && (
          <div className="space-y-3">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-green-800">Upload URL Generated</span>
                <span className="text-xs text-green-600">Expires: {formatExpiryTime()}</span>
              </div>
              
              {/* URL Display */}
              <div className="bg-white border rounded p-2 mb-3">
                <p className="text-xs text-gray-600 break-all font-mono">
                  {dummyData.uploadUrl}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleCopyUrl}
                  className="flex items-center space-x-1"
                >
                  <Copy className="h-3 w-3" />
                  <span>Copy</span>
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleTestUrl}
                  className="flex items-center space-x-1"
                >
                  <ExternalLink className="h-3 w-3" />
                  <span>Test</span>
                </Button>
              </div>
            </div>

            {/* File Key Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p className="text-sm text-blue-800 font-medium">File Key:</p>
              <p className="text-sm text-blue-600 font-mono">{dummyData.fileKey}</p>
            </div>

            {/* Expiry Warning */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <p className="text-sm text-yellow-800">
                <strong>Note:</strong> This URL expires in {dummyData.expiresIn / 60} minutes. 
                Use it immediately for file upload.
              </p>
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="text-xs text-gray-500 space-y-1">
          <p><strong>How to use:</strong></p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Click "Generate Presigned URL" to create a temporary upload link</li>
            <li>Copy the URL and use it for direct S3 upload</li>
            <li>URL expires automatically for security</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};
