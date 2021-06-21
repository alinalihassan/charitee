# outputs.tf

output "lb_hostname" {
  value = aws_lb.main.dns_name
}

output "postgres_hostname" {
  value = aws_db_instance.rds_instance.endpoint
}

output "route53_nameservers" {
  value = aws_route53_zone.main.name_servers
}

output "smtp_server" {
  description = "SMTP Server Host."
  value       = "email-smtp.${var.aws_region}.amazonaws.com"
}

output "smtp_port" {
  description = "SMTP Server Port."
  value       = var.smtp_port
}

output "smtp_user_name" {
  description = "Access key for SMTP user."
  value       = aws_iam_access_key.ses_access_key.id
}

output "smtp_user_secret" {
  description = "Password for SMTP user."
  value       = aws_iam_access_key.ses_access_key.ses_smtp_password_v4
}

output "smtp_email_from" {
  description = "Email address of sender."
  value       = aws_ses_email_identity.alin_email.email
}

output "smtp_email_from_name" {
  description = "Name of the email sender"
  value       = var.smtp_email_from_name
}