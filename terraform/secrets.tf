# resource "google_secret_manager_secret" "charitee_service_secrets" {
#   project = google_project.web_project.id
#   secret_id = "charitee-service"

#   replication {
#     automatic = true
#   }
# }

# data "google_secret_manager_secret_version" "charitee_secrets" {
#   project = google_project.web_project.id
#   secret = google_secret_manager_secret.charitee_service_secrets.id
# }