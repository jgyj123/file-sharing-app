# Singapore-Compliant File Sharing Application

A secure, serverless file sharing application built with AWS cloud-native services, designed to meet Singapore's regulatory requirements including PDPA compliance. The application features comprehensive audit trails, automated compliance monitoring, and enterprise-grade security while leveraging AWS free tier services for cost optimization.

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

## 🔐 Security Features

- **End-to-End Encryption**: TLS 1.3 in transit, AES-256 at rest with AWS KMS
- **Zero-Trust Architecture**: JWT-based authentication with fine-grained IAM policies
- **Secure File Sharing**: Time-limited presigned URLs with access controls
- **Comprehensive Audit Trail**: Every action logged with CloudTrail integration
- **Web Application Firewall**: AWS WAF protection against common attacks
- **Security Headers**: CSP, HSTS, and other security headers via CloudFront

## 🇸🇬 Singapore Compliance

- **PDPA Compliance**: Personal Data Protection Act requirements
- **Data Residency**: Singapore region deployment (ap-southeast-1)
- **Audit Requirements**: Comprehensive logging and monitoring
- **Right to Access**: User data export functionality
- **Right to Deletion**: Secure data deletion with audit trails
- **Automated Compliance**: AWS Config rules for continuous monitoring

## ✨ Key Features

### File Management
- Drag-and-drop file uploads with progress tracking
- Secure file sharing via email with expiration controls
- File versioning and lifecycle management
- Real-time download notifications

### User Experience
- Single Sign-On with AWS Cognito
- Responsive React interface for all devices
- Real-time progress feedback and error handling
- Intuitive file management dashboard

### Compliance & Monitoring
- Real-time compliance status monitoring
- Searchable audit log interface
- Automated security alerts and notifications
- Performance and health monitoring dashboards

## 🚀 Technology Stack

### Frontend
- **React 18** with TypeScript
- **AWS Amplify** for authentication
- **Material-UI** or **Tailwind CSS** for styling
- **React Query** for state management
- **Vite** for build tooling

### Backend
- **Node.js 18** Lambda functions
- **API Gateway** REST API
- **DynamoDB** with streams
- **S3** with presigned URLs
- **AWS SDK v3** for service integration

### Infrastructure
- **Terraform** for infrastructure as code
- **AWS Provider** with Singapore region
- **Modular architecture** for reusability
- **Environment-specific configurations**

### DevOps
- **GitHub Actions** CI/CD pipeline
- **Automated testing** with Jest and Cypress
- **Security scanning** with OWASP ZAP
- **Infrastructure validation** with Terraform

## 💰 Cost Optimization

Designed to maximize AWS Free Tier benefits:
- **Lambda**: 1M requests/month free
- **API Gateway**: 1M API calls/month free
- **DynamoDB**: 25GB storage + 25 RCU/WCU free
- **S3**: 5GB storage + 20,000 GET requests free
- **CloudFront**: 1TB data transfer free
- **Cognito**: 50,000 monthly active users free
- **SES**: 62,000 emails/month free

## 📋 Prerequisites

- AWS Account with appropriate permissions
- Terraform >= 1.0
- Node.js >= 18
- npm or yarn package manager
- AWS CLI configured

## 🛠️ Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd singapore-file-sharing
   ```

2. **Set up infrastructure**
   ```bash
   cd terraform
   terraform init
   terraform plan
   terraform apply
   ```

3. **Deploy backend functions**
   ```bash
   cd ../backend
   npm install
   npm run deploy
   ```

4. **Start frontend development**
   ```bash
   cd ../frontend
   npm install
   npm run dev
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

## 🧪 Testing

- **Unit Tests**: Jest for Lambda functions and React components
- **Integration Tests**: API testing with real AWS services
- **E2E Tests**: Cypress for full user journey testing
- **Security Tests**: OWASP ZAP for vulnerability scanning
- **Compliance Tests**: Automated PDPA compliance validation

## 📊 Monitoring & Observability

- **CloudWatch Dashboards**: Application and infrastructure metrics
- **Custom Metrics**: Business logic and performance indicators
- **Log Aggregation**: Centralized logging with CloudWatch Logs
- **Alerting**: SNS notifications for critical events
- **Health Checks**: Automated endpoint monitoring

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙋‍♂️ Support

For questions or support, please open an issue in the GitHub repository or contact the development team.

---

**Built with ❤️ for Singapore's digital transformation**
