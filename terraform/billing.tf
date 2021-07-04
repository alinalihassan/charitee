data "google_billing_account" "billing-account" {
  display_name = "Billing Account"
  open         = true
  depends_on = [
    google_project_service.billing
  ]
}