resource "google_secret_manager_secret" "charitee_secrets" {
  project = google_project.web_project.number
  secret_id = "charitee-secrets"

  replication {
    automatic = true
  }
}

data "google_secret_manager_secret_version" "charitee_secrets" {
  project = google_project.web_project.number
  secret = google_secret_manager_secret.charitee_secrets.id
}