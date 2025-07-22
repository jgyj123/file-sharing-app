# Secure File Sharing - A Security Learning Project

A personal project to explore and practice cloud security concepts through building a serverless file sharing application. This project serves as a hands-on learning experience for implementing security best practices, AWS services, and compliance considerations in a real-world scenario.

**Note:** This isn't production-ready software. It's a learning sandbox where I can experiment with security concepts and AWS services while building something functional.

## Project Motivation

As a fresh graduate looking to deepen my understanding of cloud security, I wanted to build something that would challenge me to implement:
- **Authentication & Authorization** patterns in the cloud
- **Data encryption** both in transit and at rest
- **Secure file handling** with proper access controls
- **Audit logging** for security monitoring
- **Infrastructure as Code** for reproducible deployments
- **Basic compliance considerations** under Singapore's context

## Architecture

**Serverless & Cloud-Native Design:**
- **Frontend**: React SPA with TypeScript, hosted on CloudFront CDN
- **Backend**: Node.js Lambda functions with API Gateway
- **Database**: DynamoDB with streams for real-time audit logging
- **Storage**: S3 with KMS encryption and lifecycle policies
- **Authentication**: AWS Cognito User Pools and Identity Pools
- **Notifications**: SES for email sharing, SNS for download alerts
- **Compliance**: AWS Config rules for automated compliance scoring
- **Infrastructure**: 100% Terraform-managed infrastructure as code

## Learning Goals & Development Methodology

### My Development Approach
1. **Spec-Driven Development**: Using Kiro AI to generate detailed requirements and design documents
2. **Console-First Implementation**: Building and testing features manually in AWS Console before automating to learn
3. **Infrastructure as Code**: Writing Terraform to codify and automate the manual configurations after getting comfortable in the console
4. **Iterative Security Hardening**: Starting with basic functionality, then layering in security controls

### Security Concepts I'm Exploring
- **Authentication & Authorization**: AWS Cognito integration with JWT tokens
- **Data Encryption**: Learning KMS for encryption at rest and TLS for transit
- **Access Controls**: Implementing least-privilege IAM policies and presigned URLs
- **Audit Logging**: Building comprehensive logging for security monitoring
- **Secure File Handling**: Understanding secure upload/download patterns

### Compliance Learning (Singapore Focus)
- **PDPA Basics**: Understanding Personal Data Protection Act requirements
- **Data Residency**: Keeping data within Singapore region (ap-southeast-1)
- **Audit Trails**: Learning what needs to be logged for compliance
- **User Rights**: Implementing basic data access and deletion capabilities

## What I'm Building

### Core Features (Learning Focus)
- **File Upload/Download**: Practicing secure file handling with S3 presigned URLs
- **User Authentication**: Implementing AWS Cognito for login/signup flows
- **Access Controls**: Learning to implement proper file permissions
- **Audit Logging**: Building comprehensive activity tracking

## Tech Stack (What I'm Learning With)

### Frontend
- **React 18** with TypeScript (getting comfortable with modern React)
- **Tailwind CSS** for styling (learning utility-first CSS)
- **AWS Cognito SDK** for authentication (no Amplify - doing it manually to learn)
- **Vite** for build tooling

### Backend (Planned)
- **Node.js 18** Lambda functions (first time with serverless)
- **API Gateway** REST API (learning API design)
- **DynamoDB** with streams (NoSQL database practice)
- **S3** with presigned URLs (secure file handling)

### Infrastructure
- **Terraform** for infrastructure as code (learning IaC principles)
- **AWS Provider** with Singapore region
- **Modular approach** (trying to write reusable code)

### Learning Tools
- **Kiro AI** for requirements and design generation
- **AWS Console** for manual testing before automation
- **Jest** for unit testing (when I get to testing)
- **GitHub** for version control and documentation


## What I Want to Learn About Monitoring

Future learning goals for observability:
- **CloudWatch Basics**: Understanding logs and basic metrics
- **Simple Dashboards**: Creating basic monitoring views
- **Alerting**: Setting up notifications for errors
- **Cost Monitoring**: Keeping track of AWS spending
- **Security Monitoring**: Learning what security events to watch for
