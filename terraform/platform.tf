data "google_organization" "org" {
  domain = "charit.ee"
}

resource "google_folder" "main" {
  display_name = var.environment == "prod" ? "Production" : "Development"
  parent       = data.google_organization.org.name
}

resource "google_project" "web_project" {
  name            = "Charitee Web App"
  project_id      = "charitee-project-${var.environment}-1"
  folder_id       = google_folder.main.name
  billing_account = data.google_billing_account.billing_account.id
}