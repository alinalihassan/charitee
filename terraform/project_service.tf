# Service Usage API
resource "google_project_service" "service_usage" {
  project = google_project.web_project.id
  service = "serviceusage.googleapis.com"
  disable_dependent_services = true
  disable_on_destroy = true
}

# CloudRun API
resource "google_project_service" "cloud_run" {
  project = google_project.web_project.id
  service = "run.googleapis.com"
  disable_dependent_services = true
  disable_on_destroy = true
}

# Container API
resource "google_project_service" "container_registry" {
  project = google_project.web_project.id
  service = "containerregistry.googleapis.com"
  disable_dependent_services = true
  disable_on_destroy = true
}

# Gmail API
resource "google_project_service" "gmail" {
  project = google_project.web_project.id
  service = "gmail.googleapis.com"
  disable_dependent_services = true
  disable_on_destroy = true
}

# DNS API
resource "google_project_service" "dns" {
  project = google_project.web_project.id
  service = "dns.googleapis.com"
  disable_dependent_services = true
  disable_on_destroy = true
}

# Billing API
resource "google_project_service" "billing" {
  project = google_project.web_project.id
  service = "cloudbilling.googleapis.com"
  disable_dependent_services = true
  disable_on_destroy = true
}

# Resource Manager API
resource "google_project_service" "resource_manager" {
  project = google_project.web_project.id
  service = "cloudresourcemanager.googleapis.com"
  disable_dependent_services = true
  disable_on_destroy = true
}

# Secrets Manager API
resource "google_project_service" "secrets_manager" {
  project = google_project.web_project.id
  service = "secretmanager.googleapis.com"
  disable_dependent_services = true
  disable_on_destroy = true
}

# Compute API
resource "google_project_service" "compute" {
  project = google_project.web_project.id
  service = "compute.googleapis.com"
  disable_dependent_services = true
  disable_on_destroy = true
}