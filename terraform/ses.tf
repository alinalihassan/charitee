resource "aws_ses_domain_identity" "main" {
  domain = var.domain_name
}

resource "aws_ses_domain_identity_verification" "main" {
  domain     = aws_ses_domain_identity.main.id
  depends_on = [aws_route53_record.ses_verification]
}

resource "aws_ses_domain_dkim" "main" {
  domain = aws_ses_domain_identity.main.domain
}

resource "aws_ses_domain_mail_from" "main" {
  domain           = aws_ses_domain_identity.main.domain
  mail_from_domain = var.mail_from
}

resource "aws_ses_email_identity" "alin_email" {
  email = "alin@${var.domain_name}"
}

resource "aws_ses_email_identity" "support_email" {
  email = "support@${var.domain_name}"
}