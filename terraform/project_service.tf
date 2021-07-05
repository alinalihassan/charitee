# Service Usage API
resource "google_project_service" "service_usage" {
  project = google_project.web_project.id
  service = "serviceusage.googleapis.com"
}

# # CloudRun API
resource "google_project_service" "cloud_run" {
  project = google_project.web_project.id
  service = "run.googleapis.com"
}

# Container API
resource "google_project_service" "container_registry" {
  project = google_project.web_project.id
  service = "containerregistry.googleapis.com"
}

# Gmail API
resource "google_project_service" "gmail" {
  project = google_project.web_project.id
  service = "gmail.googleapis.com"
}

# DNS API
resource "google_project_service" "dns" {
  project = google_project.web_project.id
  service = "dns.googleapis.com"
}

# Billing API
resource "google_project_service" "billing" {
  project = google_project.web_project.id
  service = "cloudbilling.googleapis.com"
}

# Resource Manager API
resource "google_project_service" "resource_manager" {
  project = google_project.web_project.id
  service = "cloudresourcemanager.googleapis.com"
}

# Secrets Manager API
resource "google_project_service" "secrets_manager" {
  project = google_project.web_project.id
  service = "secretmanager.googleapis.com"
}

# Compute API
resource "google_project_service" "compute" {
  project = google_project.web_project.id
  service = "compute.googleapis.com"
}