variable "region" {
  description = "The region where resources should be created"
  default     = "europe-west6"
}

variable "gcr-region" {
  description = "The super-region where the Container Registry is located"
  default     = "eu"
}

variable "environment" {
  description = "The environment, either prod or dev"
  default     = "dev"
}

variable "domain_name" {
  description = "Domain Name"
  default     = "charit.ee"
}

# App related config

variable "app_port" {
  description = "Port exposed by the docker image to redirect traffic to"
  default     = 80
}

variable "app_name" {
  description = "App name"
  default     = "charitee"
}

variable "jwt_secret" {
  description = "JWT secret"
  default     = "E33F6C379DB55425B7861727A256CE33F6C379DB55425B7861727A256CE33F6C379DB55425B7861727A256C"
}

# Database

variable "db_name" {
  description = "Database name"
  default     = "test"
}

variable "db_username" {
  description = "Database username"
  default     = "admin"
  sensitive   = true
}

variable "db_password" {
  description = "Database password"
  default     = "admin"
  sensitive   = true
}

variable "db_host" {
  description = "Database host"
  default     = "cluster0.yxoom.mongodb.net"
}

variable "db_options" {
  description = "Database options"
  default     = "retryWrites=true&w=majority"
}

# Email
variable "smtp_host" {
  description = "SMTP Host"
  default     = "smtp-relay.gmail.com"
}

variable "smtp_port" {
  description = "SMTP Port"
  default     = 587
}

variable "smtp_client_id" {
  description = "SMTP Client ID"
  default     = "759130817747-fuqfmeci4amu8gjqcg7hf87450t1o0sj.apps.googleusercontent.com"
}

variable "smtp_client_secret" {
  description = "SMTP Client SECRET"
  default     = "DBJLo1Qt4nloCKz73jgFtVZm"
}

variable "smtp_refresh_token" {
  description = "SMTP Refresh Token"
  default     = "1//04YO8D7kvWe0LCgYIARAAGAQSNwF-L9Irqp2wakHj0jGCCqFsvsjVjEPqTfYiZJq4N6C4OTwvBacCpQ6I8ijnlwIX7bALHwnkvXw"
}

variable "smtp_from_email" {
  description = "SMTP Sender Email"
  default     = "alin@charit.ee"
}

variable "email_mx_records" {
  description = "MX Records for Email"
  default     = ["1 ASPMX.L.GOOGLE.COM.", "5 ALT1.ASPMX.L.GOOGLE.COM.", "5 ALT2.ASPMX.L.GOOGLE.COM.", "10 ALT3.ASPMX.L.GOOGLE.COM.", "10 ALT4.ASPMX.L.GOOGLE.COM."]
}