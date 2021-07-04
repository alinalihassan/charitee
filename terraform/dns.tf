resource "google_dns_managed_zone" "charitee-zone" {
  project     = google_project.web-project.project_id
  name        = "charitee-zone"
  dns_name    = "charit.ee."
  description = "Charitee DNS zone"
}

resource "google_dns_record_set" "mx-records" {
  project      = google_project.web-project.project_id
  managed_zone = google_dns_managed_zone.charitee-zone.name
  name         = google_dns_managed_zone.charitee-zone.dns_name
  type         = "MX"
  rrdatas      = var.email_mx_records
  ttl          = 600
}


resource "google_dns_record_set" "www" {
  project      = google_project.web-project.project_id
  managed_zone = google_dns_managed_zone.charitee-zone.name
  name         = "www.${google_dns_managed_zone.charitee-zone.dns_name}"
  type         = "A"
  ttl          = 600
  rrdatas      = [google_compute_global_address.default.address]
}


resource "google_dns_record_set" "matching" {
  project      = google_project.web-project.project_id
  managed_zone = google_dns_managed_zone.charitee-zone.name
  name         = google_dns_managed_zone.charitee-zone.dns_name
  type         = "A"
  ttl          = 600
  rrdatas      = [google_compute_global_address.default.address]
}