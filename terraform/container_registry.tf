resource "google_container_registry" "registry" {
  project  = google_project.web-project.project_id
  location = var.gcr-region
  depends_on = [
    google_project_service.container-registry
  ]
}

data "google_container_registry_image" "charitee-image" {
  name    = "charitee"
  project = google_project.web-project.project_id
  region  = var.gcr-region
  tag     = "latest"
}