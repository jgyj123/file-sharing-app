/**
 * Test script for S3 presigned URL upload functionality
 * 
 * Instructions:
 * 1. Generate a presigned URL from your Lambda function
 * 2. Replace "UPLOAD_URL_HERE" with the actual presigned URL
 * 3. Run: node testUpload.js
 * 
 * Expected result: HTTP 200 response and file appears in S3 bucket
 */

const testUpload = async () => {
    const uploadUrl = "UPLOAD_URL_HERE";
    
    // Create test file content matching Lambda test event parameters
    const testContent = "This is a test PDF content. ".repeat(100);
    const blob = new Blob([testContent], { 
        type: 'application/pdf'  
    });
    
    try {
        const response = await fetch(uploadUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/pdf'  // Must match presigned URL content type
            },
            body: blob
        });
        
        if (response.ok) {
            console.log('Upload successful. Status:', response.status);
            console.log('ETag:', response.headers.get('ETag'));
        } else {
            console.log('Upload failed. Status:', response.status, response.statusText);
            const errorText = await response.text();
            console.log('Error details:', errorText);
        }
    } catch (error) {
        console.log('Upload error:', error.message);
    }
};

testUpload();