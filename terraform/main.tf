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
          name  = "APP_NAME"
          value = jsondecode(data.google_secret_manager_secret_version.charitee_secrets.secret_data).APP_NAME
        }
        env {
          name  = "SERVER_HOST"
          value = jsondecode(data.google_secret_manager_secret_version.charitee_secrets.secret_data).SERVER_HOST
        }
        env {
          name  = "DB_USER"
          value = jsondecode(data.google_secret_manager_secret_version.charitee_secrets.secret_data).DB_USER
        }
        env {
          name  = "DB_PASSWORD"
          value = jsondecode(data.google_secret_manager_secret_version.charitee_secrets.secret_data).DB_PASSWORD
        }
        env {
          name  = "DB_NAME"
          value = jsondecode(data.google_secret_manager_secret_version.charitee_secrets.secret_data).DB_NAME
        }
        env {
          name  = "DB_HOST"
          value = jsondecode(data.google_secret_manager_secret_version.charitee_secrets.secret_data).DB_HOST
        }
        env {
          name  = "DB_OPTIONS"
          value = jsondecode(data.google_secret_manager_secret_version.charitee_secrets.secret_data).DB_OPTIONS
        }
        env {
          name  = "SMTP_FROM_EMAIL"
          value = jsondecode(data.google_secret_manager_secret_version.charitee_secrets.secret_data).SMTP_FROM_EMAIL
        }
        env {
          name  = "SMTP_FROM_NAME"
          value = jsondecode(data.google_secret_manager_secret_version.charitee_secrets.secret_data).SMTP_FROM_NAME
        }
        env {
          name  = "GLOBALGIVING_KEY"
          value = jsondecode(data.google_secret_manager_secret_version.charitee_secrets.secret_data).GLOBALGIVING_KEY
        }
        env {
          name  = "SENDGRID_KEY"
          value = jsondecode(data.google_secret_manager_secret_version.charitee_secrets.secret_data).SENDGRID_KEY
        }
        env {
          name  = "JWT_SECRET"
          value = jsondecode(data.google_secret_manager_secret_version.charitee_secrets.secret_data).JWT_SECRET
        }
        env {
          name  = "IMAGE_INLINE_SIZE_LIMIT"
          value = jsondecode(data.google_secret_manager_secret_version.charitee_secrets.secret_data).IMAGE_INLINE_SIZE_LIMIT
        }
        env {
          name  = "INLINE_RUNTIME_CHUNK"
          value = jsondecode(data.google_secret_manager_secret_version.charitee_secrets.secret_data).INLINE_RUNTIME_CHUNK
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