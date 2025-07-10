variable "aws_region" {
  description = "The AWS region to deploy resources"
  type        = string
  default     = "ap-southeast-1"
}

variable "environment" {
  description = "Environment name (e.g., dev, staging, prod)"
  type        = string
  default     = "dev"
}

variable "project_name" {
  description = "Name of the project"
  type        = string
  default     = "file-sharing-app"
}
