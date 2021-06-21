# variables.tf

variable "aws_region" {
  description = "The AWS region things are created in"
  default     = "eu-west-2"
}

variable "domain_name" {
  description = "Domain Name"
  default     = "charit.ee"
}

# SES and Emails

variable "mail_from" {
  description = "Mail From for SES (SMTP)"
  default     = "email.charit.ee"
}

variable "smtp_port" {
  description = "SMTP Port"
  default     = "25"
}

variable "smtp_email_from_name" {
  description = "Email sender name"
  default     = "Alin"
}

variable "mx_receive_records" {
  description = "Route53 MX record which defines vaild mail servers. Defaults to `10 inbound-smtp.us-east-1.amazonaws.com`."
  default     = ["10 inbound-smtp.us-east-1.amazonaws.com"]
}

variable "email_mx_records" {
  description = "Google Workspace MX records"
  default     = ["1 ASPMX.L.GOOGLE.COM.", "5 ALT1.ASPMX.L.GOOGLE.COM.", "5 ALT2.ASPMX.L.GOOGLE.COM.", "10 ALT3.ASPMX.L.GOOGLE.COM.", "10 ALT4.ASPMX.L.GOOGLE.COM."]
}

variable "spf_records" {
  description = "Route53 MX record which defines vaild mail servers. Defaults to `v=spf1 include:amazonses.com -all`"
  default     = ["v=spf1 include:amazonses.com -all"]
}

variable "dmarc_rua" {
  description = "DMARC Reporting URI of aggregate reports, expects an email address."
  default     = "dmarc_reports@charit.ee"
}

# ECS related config

variable "ecs_task_execution_role_name" {
  description = "ECS task execution role name"
  default     = "myEcsTaskExecutionRole"
}

variable "az_count" {
  description = "Number of AZs to cover in a given region"
  default     = "2"
}

# App related config

variable "app_port" {
  description = "Port exposed by the docker image to redirect traffic to"
  default     = 443
}

variable "app_name" {
  description = "App name"
  default     = "Charitee"
}

variable "app_count" {
  description = "Number of docker containers to run"
  default     = 1
}

variable "health_check_path" {
  default = "/ping"
}

variable "jwt_secret" {
  description = "JWT secret"
  default     = "E33F6C379DB55425B7861727A256CE33F6C379DB55425B7861727A256CE33F6C379DB55425B7861727A256C"
}

# Fargate

variable "fargate_cpu" {
  description = "Fargate instance CPU units to provision (1 vCPU = 1024 CPU units)"
  default     = "1024"
}

variable "fargate_memory" {
  description = "Fargate instance memory to provision (in MiB)"
  default     = "2048"
}

# Database

variable "db_port" {
  description = "Database port"
  default     = 27017
}

variable "db_name" {
  description = "Database name"
  default     = "test"
}

variable "db_username" {
  description = "Database username"
  default     = "root"
  sensitive   = true
}

variable "db_password" {
  description = "Database password"
  default     = "admin"
  sensitive   = true
}

variable "db_endpoint" {
  description = "Database endpoint"
  default     = "cluster0-shard-00-00.yxoom.mongodb.net:27017,cluster0-shard-00-01.yxoom.mongodb.net:27017,cluster0-shard-00-02.yxoom.mongodb.net"
}

variable "db_options" {
  description = "Database options"
  default     = "ssl=true&replicaSet=atlas-qo8t4i-shard-0&authSource=admin&retryWrites=true&w=majority"
}