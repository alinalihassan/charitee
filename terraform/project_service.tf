# Service Usage API
resource "google_project_service" "service-usage" {
  project = google_project.web-project.id
  service = "serviceusage.googleapis.com"
}

# # CloudRun API
resource "google_project_service" "cloud-run" {
  project = google_project.web-project.id
  service = "run.googleapis.com"
}

# Container API
resource "google_project_service" "container-registry" {
  project = google_project.web-project.id
  service = "containerregistry.googleapis.com"
}

# Gmail API
resource "google_project_service" "gmail" {
  project = google_project.web-project.id
  service = "gmail.googleapis.com"
}

# DNS API
resource "google_project_service" "dns" {
  project = google_project.web-project.id
  service = "dns.googleapis.com"
}