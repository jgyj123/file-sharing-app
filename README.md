# Secure File Sharing - A Security Learning Project

A personal project to explore and practice cloud security concepts through building a serverless file sharing application. This project serves as a hands-on learning experience for implementing security best practices, AWS services, and compliance considerations in a real-world scenario.

## 🎯 Project Motivation

As a fresh graduate looking to deepen my understanding of cloud security, I wanted to build something that would challenge me to implement:
- **Authentication & Authorization** patterns in the cloud
- **Data encryption** both in transit and at rest
- **Secure file handling** with proper access controls
- **Audit logging** for security monitoring
- **Infrastructure as Code** for reproducible deployments
- **Basic compliance considerations** (learning about Singapore's PDPA requirements)

This isn't production-ready software - it's a learning sandbox where I can experiment with security concepts and AWS services while building something functional.

## 🏗️ Architecture

**Serverless & Cloud-Native Design:**
- **Frontend**: React SPA with TypeScript, hosted on CloudFront CDN
- **Backend**: Node.js Lambda functions with API Gateway
- **Database**: DynamoDB with streams for real-time audit logging
- **Storage**: S3 with KMS encryption and lifecycle policies
- **Authentication**: AWS Cognito User Pools and Identity Pools
- **Notifications**: SES for email sharing, SNS for download alerts
- **Compliance**: AWS Config rules with automated remediation
- **Infrastructure**: 100% Terraform-managed infrastructure as code

## 🎓 Learning Goals & Development Methodology

### My Development Approach
1. **Spec-Driven Development**: Using Kiro AI to generate detailed requirements and design documents
2. **Console-First Implementation**: Building and testing features manually in AWS Console before automating
3. **Infrastructure as Code**: Writing Terraform to codify and automate the manual configurations
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

*Note: This is a learning project - the compliance implementation is educational and not production-ready.*

## ✨ What I'm Building

### Core Features (Learning Focus)
- **File Upload/Download**: Practicing secure file handling with S3 presigned URLs
- **User Authentication**: Implementing AWS Cognito for login/signup flows
- **Access Controls**: Learning to implement proper file permissions
- **Audit Logging**: Building comprehensive activity tracking

### Current Status
- ✅ **Frontend**: React app with authentication forms and file management UI
- 🚧 **Infrastructure**: Working on Terraform modules for AWS resources
- ⏳ **Backend**: Lambda functions and API Gateway coming next
- ⏳ **Security**: Will add encryption, proper IAM policies, and monitoring

### Planned Learning Experiments
- Time-limited file sharing links
- Basic compliance reporting dashboard
- Email notifications for file activities
- Simple user management interface

## 🛠️ Tech Stack (What I'm Learning With)

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

## 💰 Staying Within Budget (Free Tier Focus)

As a student/fresh grad, I'm designing this to stay within AWS Free Tier limits:
- **Lambda**: 1M requests/month free (plenty for learning)
- **API Gateway**: 1M API calls/month free
- **DynamoDB**: 25GB storage + 25 RCU/WCU free
- **S3**: 5GB storage + 20,000 GET requests free
- **CloudFront**: 1TB data transfer free
- **Cognito**: 50,000 monthly active users free
- **SES**: 62,000 emails/month free

Perfect for experimenting without breaking the bank! 💸

## 📋 Prerequisites

- AWS Account with appropriate permissions
- Terraform >= 1.0
- Node.js >= 18
- npm or yarn package manager
- AWS CLI configured

## 🚀 Getting Started (Current State)

Right now, only the frontend is functional. Here's how to run what's available:

1. **Clone and explore**
   ```bash
   git clone <repository-url>
   cd singapore-file-sharing
   ```

2. **Run the frontend (what works now)**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   *Note: You'll need to set up AWS Cognito and add environment variables for full functionality*

3. **Infrastructure (work in progress)**
   ```bash
   cd terraform
   # Coming soon - modules are empty shells right now
   ```

4. **Backend (not implemented yet)**
   ```bash
   cd backend
   # This directory doesn't exist yet - Lambda functions coming next!
   ```

## 📁 Project Structure

```
singapore-file-sharing/
├── terraform/                 # Infrastructure as Code
│   ├── modules/              # Reusable Terraform modules
│   ├── environments/         # Environment-specific configs
│   └── main.tf              # Main infrastructure definition
├── backend/                  # Lambda functions
│   ├── src/functions/       # Individual Lambda functions
│   ├── src/shared/          # Shared utilities and models
│   └── tests/               # Backend tests
├── frontend/                 # React application
│   ├── src/components/      # React components
│   ├── src/services/        # API and AWS service clients
│   └── src/tests/           # Frontend tests
└── .kiro/specs/             # Feature specifications
    └── singapore-file-sharing/
        ├── requirements.md   # Detailed requirements
        ├── design.md        # Architecture design
        └── tasks.md         # Implementation tasks
```

## 🧪 Testing (Learning Goals)

My plan for testing as I build:
- **Unit Tests**: Jest for Lambda functions (when I write them)
- **Frontend Tests**: Basic React component testing
- **Manual Testing**: Lots of clicking around in the AWS Console
- **Security Learning**: Maybe try some basic vulnerability scanning tools
- **Integration Testing**: Testing the full flow from frontend to backend

*Reality check: This is a learning project, so testing will be basic but educational!*

## 📊 What I Want to Learn About Monitoring

Future learning goals for observability:
- **CloudWatch Basics**: Understanding logs and basic metrics
- **Simple Dashboards**: Creating basic monitoring views
- **Alerting**: Setting up notifications for errors
- **Cost Monitoring**: Keeping track of AWS spending
- **Security Monitoring**: Learning what security events to watch for

*These are aspirational - I'll start simple and build up my monitoring knowledge.*

## 🤝 Learning Together

This is primarily a personal learning project, but if you're also learning cloud security and want to:
- Share feedback on my approach
- Suggest security improvements
- Point out better practices
- Share your own learning experiences

Feel free to open an issue or reach out! Always happy to learn from others.

## 📄 License

This project is licensed under the MIT License - feel free to use it for your own learning!

## 🙋‍♂️ Questions?

If you have questions about my approach or want to discuss cloud security learning, feel free to open an issue. I'm documenting my learning journey, so questions help me think through concepts better.

---

**Learning cloud security one Lambda function at a time** 🚀
