variable "region" {
  description = "The region where resources should be created"
  default     = "europe-west6"
}

variable "gcr_region" {
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

variable "app_port" {
  description = "App Port"
  default     = 80
}

variable "email_mx_records" {
  description = "MX Records for Email"
  default     = ["1 ASPMX.L.GOOGLE.COM.", "5 ALT1.ASPMX.L.GOOGLE.COM.", "5 ALT2.ASPMX.L.GOOGLE.COM.", "10 ALT3.ASPMX.L.GOOGLE.COM.", "10 ALT4.ASPMX.L.GOOGLE.COM."]
}