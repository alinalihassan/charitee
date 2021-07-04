output "charitee-image-url" {
  value = data.google_container_registry_image.charitee-image.image_url
}

output "charitee-service-url" {
  value = google_cloud_run_service.charitee-service.status.0.url
}

output "charitee-load-balancer-ip" {
  value = google_compute_global_address.default.address
}