resource "google_cloud_run_service" "charitee-service" {
  name     = "charitee-service"
  location = var.region
  project  = google_project.web-project.project_id

  template {
    spec {
      containers {
        image = data.google_container_registry_image.charitee-image.image_url
        ports {
          container_port = var.app_port
        }
        env {
          name  = "SERVER_HOST"
          value = "https://${var.domain_name}"
        }
        env {
          name  = "SERVER_HOST"
          value = var.app_name
        }
        env {
          name  = "DB_USER"
          value = var.db_username
        }
        env {
          name  = "DB_PASSWORD"
          value = var.db_password
        }
        env {
          name  = "DB_NAME"
          value = var.db_name
        }
        env {
          name  = "DB_HOST"
          value = var.db_host
        }
        env {
          name  = "DB_OPTIONS"
          value = var.db_options
        }
        env {
          name  = "SMTP_HOST"
          value = var.smtp_host
        }
        env {
          name  = "SMTP_PORT"
          value = var.smtp_port
        }
        env {
          name  = "SMTP_CLIENT_ID"
          value = var.smtp_client_id
        }
        env {
          name  = "SMTP_CLIENT_SECRET"
          value = var.smtp_client_secret
        }
        env {
          name  = "SMTP_REFRESH_TOKEN"
          value = var.smtp_refresh_token
        }
        env {
          name  = "SMTP_FROM_EMAIL"
          value = var.smtp_from_email
        }
        env {
          name  = "JWT_SECRET"
          value = var.jwt_secret
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
  service  = google_cloud_run_service.charitee-service.name
  location = google_cloud_run_service.charitee-service.location
  project  = google_cloud_run_service.charitee-service.project
  role     = "roles/run.invoker"
  member   = "allUsers"
}