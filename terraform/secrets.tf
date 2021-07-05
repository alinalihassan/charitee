resource "google_secret_manager_secret" "charitee-service-secrets" {
  project = google_project.web-project.id
  secret_id = "charitee-service"

  replication {
    automatic = true
  }
}

data "google_secret_manager_secret_version" "basic" {
  project = google_project.web-project.id
  secret = "charitee-service"
}