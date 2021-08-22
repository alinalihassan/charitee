resource "google_cloud_run_service" "charitee_service" {
  name                       = "charitee-service"
  location                   = var.region
  project                    = google_project.web_project.project_id
  autogenerate_revision_name = true

  template {
    spec {
      containers {
        image = data.google_container_registry_image.charitee_image.image_url

        ports {
          container_port = var.app_port
        }

        dynamic "env" {
          for_each = jsondecode(nonsensitive(data.google_secret_manager_secret_version.charitee_secrets.secret_data)).env

          content {
            name  = env.value["name"]
            value = env.value["value"]
          }
        }
      }
    }
  }

  traffic {
    percent         = 100
    latest_revision = true
  }
}

resource "google_cloud_run_service_iam_member" "public_access" {
  service  = google_cloud_run_service.charitee_service.name
  location = google_cloud_run_service.charitee_service.location
  project  = google_cloud_run_service.charitee_service.project
  role     = "roles/run.invoker"
  member   = "allUsers"
}