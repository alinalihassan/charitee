resource "google_container_registry" "registry" {
  project  = google_project.web_project.project_id
  location = var.gcr_region
  depends_on = [
    google_project_service.container_registry
  ]
}

data "google_container_registry_image" "charitee_image" {
  name    = "charitee"
  project = google_project.web_project.project_id
  region  = var.gcr_region
  tag     = "latest"
}