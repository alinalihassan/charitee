output "charitee_image_url" {
  value = data.google_container_registry_image.charitee_image.image_url
}

output "charitee_service_url" {
  value = google_cloud_run_service.charitee_service.status.0.url
}

output "charitee_load_balancer_ip" {
  value = google_compute_global_address.default.address
}