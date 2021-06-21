terraform {
  required_version = ">= 0.14"
  required_providers {
    aws = {
      version = ">= 3.34.0"
      source  = "hashicorp/aws"
    }
  }

  backend "remote" {
    organization = "charitee"

    workspaces {
      name = "Charitee"
    }
  }
}
