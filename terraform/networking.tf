resource "google_compute_region_network_endpoint_group" "charitee_neg" {
  project               = google_project.web_project.project_id
  name                  = "charitee-neg"
  network_endpoint_type = "SERVERLESS"
  region                = var.region
  cloud_run {
    service = google_cloud_run_service.charitee_service.name
  }
}

resource "google_compute_backend_service" "charitee_backend_service" {
  project    = google_project.web_project.project_id
  name       = "charitee-backend-service"
  enable_cdn = true
  log_config {
    enable      = true
    sample_rate = 1
  }
  backend {
    group = google_compute_region_network_endpoint_group.charitee_neg.id
  }
}

resource "google_compute_global_address" "default" {
  project      = google_project.web_project.project_id
  name         = "charitee-address"
  ip_version   = "IPV4"
  address_type = "EXTERNAL"
}

resource "google_compute_url_map" "default" {
  project         = google_project.web_project.project_id
  name            = "charitee-url-map"
  default_service = google_compute_backend_service.charitee_backend_service.id
}

resource "google_compute_target_http_proxy" "http" {
  project = google_project.web_project.project_id
  name    = "charitee-http-proxy"
  url_map = google_compute_url_map.default.id
}

resource "google_compute_global_forwarding_rule" "http" {
  project    = google_project.web_project.project_id
  name       = "charitee-http-rule"
  target     = google_compute_target_http_proxy.http.self_link
  ip_address = google_compute_global_address.default.address
  port_range = "80"

  depends_on = [google_compute_global_address.default]
}


resource "google_compute_global_forwarding_rule" "https" {
  project    = google_project.web_project.project_id
  name       = "charitee-https-rule"
  target     = google_compute_target_https_proxy.default.self_link
  ip_address = google_compute_global_address.default.address
  port_range = "443"
  depends_on = [google_compute_global_address.default]
}

resource "google_compute_target_https_proxy" "default" {
  project = google_project.web_project.project_id
  name    = "charitee-https-proxy"
  url_map = google_compute_url_map.default.id

  ssl_certificates = [google_compute_managed_ssl_certificate.default.id]
}

resource "google_compute_managed_ssl_certificate" "default" {
  project = google_project.web_project.project_id
  name    = "charitee-ssl-cert"

  managed {
    domains = ["${var.domain_name}.", "www.${var.domain_name}."]
  }
}
