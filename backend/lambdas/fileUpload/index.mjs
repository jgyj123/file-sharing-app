import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const s3Client = new S3Client({ region: 'ap-southeast-1' });

// Lambda handler to generate presigned URL for file upload
// Expects event body to contain JSON with fileName, contentType, and optional fileSize
export const handler = async (event) => {
    try {
        console.log('Event received:', JSON.stringify(event, null, 2));
        
        // Parse request body
        const body = JSON.parse(event.body);
        const { fileName, contentType, fileSize } = body;
        
        // Validate inputs
        if (!fileName) {
            return {
                statusCode: 400,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify({
                    success: false,
                    error: 'fileName is required'
                })
            };
        }
        
        // Validate file size (100MB limit)
        if (fileSize && fileSize > 100 * 1024 * 1024) {
            return {
                statusCode: 400,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify({
                    success: false,
                    error: 'File size exceeds 100MB limit'
                })
            };
        }
        
        // Generate unique file key
        const timestamp = Date.now();
        const fileKey = `uploads/${timestamp}-${fileName}`;
        
        // Create S3 PutObject command
        const command = new PutObjectCommand({
            Bucket: process.env.BUCKET_NAME,
            Key: fileKey,
            ContentType: contentType || 'application/octet-stream',
            Metadata: {
                'uploaded-at': new Date().toISOString(),
                'original-name': fileName,
                'file-size': fileSize?.toString() || '0'
            }
        });
        
        // Generate presigned URL (valid for 5 minutes)
        const presignedUrl = await getSignedUrl(s3Client, command, {
            expiresIn: 300 // 5 minutes
        });
        
        console.log('Presigned URL generated successfully for:', fileKey);
        console.log('Presigned URL:', presignedUrl)
        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'POST, OPTIONS'
            },
            body: JSON.stringify({
                success: true,
                uploadUrl: presignedUrl,
                fileKey: fileKey,
                expiresIn: 300,
                message: 'Presigned URL generated successfully'
            })
        };
        
    } catch (error) {
        console.error('Error generating presigned URL:', error);
        
        return {
            statusCode: 500,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                success: false,
                error: 'Failed to generate upload URL',
                details: error.message
            })
        };
    }
};