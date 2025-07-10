# Configure the AWS Provider
provider "aws" {
  region = var.aws_region

  # Add default tags to all resources
  default_tags {
    tags = {
      Project     = "file-sharing-app"
      Environment = var.environment
      ManagedBy   = "Terraform"
    }
  }
}

# Data source to get current AWS account ID and region
data "aws_caller_identity" "current" {}
data "aws_region" "current" {}
