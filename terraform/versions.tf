terraform {
  required_version = ">= 0.15"
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "3.74.0"
    }
  }

  backend "remote" {
    organization = "charitee"

    workspaces {
      name = "charitee-dev"
    }
  }
}
