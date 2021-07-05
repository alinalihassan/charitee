resource "google_cloud_run_service" "charitee_service" {
  name     = "charitee-service"
  location = var.region
  project  = google_project.web_project.project_id

  template {
    spec {
      containers {
        image = data.google_container_registry_image.charitee_image.image_url
        ports {
          container_port = var.app_port
        }
        env {
          name  = "SERVER_HOST"
          value = ""
          # value = jsondecode(data.google_secret_manager_secret_version.charitee_secrets.secret_data).SERVER_HOST
        }
        env {
          name  = "DB_USER"
          value = ""
          # value = jsondecode(data.google_secret_manager_secret_version.charitee_secrets.secret_data).DB_USER
        }
        env {
          name  = "DB_PASSWORD"
          value = ""
          # value = jsondecode(data.google_secret_manager_secret_version.charitee_secrets.secret_data).DB_PASSWORD
        }
        env {
          name  = "DB_NAME"
          value = ""
          # value = jsondecode(data.google_secret_manager_secret_version.charitee_secrets.secret_data).DB_NAME
        }
        env {
          name  = "DB_HOST"
          value = ""
          # value = jsondecode(data.google_secret_manager_secret_version.charitee_secrets.secret_data).DB_HOST
        }
        env {
          name  = "DB_OPTIONS"
          value = ""
          # value = jsondecode(data.google_secret_manager_secret_version.charitee_secrets.secret_data).DB_OPTIONS
        }
        env {
          name  = "SMTP_HOST"
          value = ""
          # value = jsondecode(data.google_secret_manager_secret_version.charitee_secrets.secret_data).SMTP_HOST
        }
        env {
          name  = "SMTP_PORT"
          value = ""
          # value = jsondecode(data.google_secret_manager_secret_version.charitee_secrets.secret_data).SMTP_PORT
        }
        env {
          name  = "SMTP_CLIENT_ID"
          value = ""
          # value = jsondecode(data.google_secret_manager_secret_version.charitee_secrets.secret_data).SMTP_CLIENT_ID
        }
        env {
          name  = "SMTP_CLIENT_SECRET"
          value = ""
          # value = jsondecode(data.google_secret_manager_secret_version.charitee_secrets.secret_data).SMTP_CLIENT_SECRET
        }
        env {
          name  = "SMTP_REFRESH_TOKEN"
          value = ""
          # value = jsondecode(data.google_secret_manager_secret_version.charitee_secrets.secret_data).SMTP_REFRESH_TOKEN
        }
        env {
          name  = "SMTP_FROM_EMAIL"
          value = ""
          # value = jsondecode(data.google_secret_manager_secret_version.charitee_secrets.secret_data).SMTP_FROM_EMAIL
        }
        env {
          name  = "JWT_SECRET"
          value = ""
          # value = jsondecode(data.google_secret_manager_secret_version.charitee_secrets.secret_data).JWT_SECRET
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