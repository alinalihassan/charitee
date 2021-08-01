resource "google_dns_managed_zone" "charitee_zone" {
  project     = google_project.web_project.project_id
  name        = "charitee-zone"
  dns_name    = "charit.ee."
  description = "Charitee DNS zone"
}

resource "google_dns_record_set" "mx_records" {
  project      = google_project.web_project.project_id
  managed_zone = google_dns_managed_zone.charitee_zone.name
  name         = google_dns_managed_zone.charitee_zone.dns_name
  type         = "MX"
  rrdatas      = var.email_mx_records
  ttl          = 600
}


resource "google_dns_record_set" "www" {
  project      = google_project.web_project.project_id
  managed_zone = google_dns_managed_zone.charitee_zone.name
  name         = "www.${google_dns_managed_zone.charitee_zone.dns_name}"
  type         = "A"
  ttl          = 600
  rrdatas      = [google_compute_global_address.default.address]
}


resource "google_dns_record_set" "matching" {
  project      = google_project.web_project.project_id
  managed_zone = google_dns_managed_zone.charitee_zone.name
  name         = google_dns_managed_zone.charitee_zone.dns_name
  type         = "A"
  ttl          = 600
  rrdatas      = [google_compute_global_address.default.address]
}

# SendGrid

resource "google_dns_record_set" "sendgrid_1" {
  project      = google_project.web_project.project_id
  managed_zone = google_dns_managed_zone.charitee_zone.name
  name         = "em4505.${google_dns_managed_zone.charitee_zone.dns_name}"
  type         = "CNAME"
  ttl          = 600
  rrdatas      = ["u22866514.wl015.sendgrid.net."]
}

resource "google_dns_record_set" "sendgrid_2" {
  project      = google_project.web_project.project_id
  managed_zone = google_dns_managed_zone.charitee_zone.name
  name         = "s1._domainkey.${google_dns_managed_zone.charitee_zone.dns_name}"
  type         = "CNAME"
  ttl          = 600
  rrdatas      = ["s1.domainkey.u22866514.wl015.sendgrid.net."]
}

resource "google_dns_record_set" "sendgrid_3" {
  project      = google_project.web_project.project_id
  managed_zone = google_dns_managed_zone.charitee_zone.name
  name         = "s2._domainkey.${google_dns_managed_zone.charitee_zone.dns_name}"
  type         = "CNAME"
  ttl          = 600
  rrdatas      = ["s2.domainkey.u22866514.wl015.sendgrid.net."]
}

resource "google_dns_record_set" "sendgrid_4" {
  project      = google_project.web_project.project_id
  managed_zone = google_dns_managed_zone.charitee_zone.name
  name         = "url6833.${google_dns_managed_zone.charitee_zone.dns_name}"
  type         = "CNAME"
  ttl          = 600
  rrdatas      = ["sendgrid.net."]
}

resource "google_dns_record_set" "sendgrid_5" {
  project      = google_project.web_project.project_id
  managed_zone = google_dns_managed_zone.charitee_zone.name
  name         = "22866514.${google_dns_managed_zone.charitee_zone.dns_name}"
  type         = "CNAME"
  ttl          = 600
  rrdatas      = ["sendgrid.net."]
}