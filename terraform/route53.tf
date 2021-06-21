resource "aws_route53_zone" "main" {
  name = var.domain_name
}

resource "aws_route53_record" "www" {
  zone_id = aws_route53_zone.main.zone_id
  name    = "www.${var.domain_name}"
  type    = "A"

  alias {
    name                   = aws_lb.main.dns_name
    zone_id                = aws_lb.main.zone_id
    evaluate_target_health = true
  }
}

# SES Configuration
resource "aws_route53_record" "spf_mail_from" {
  zone_id = aws_route53_zone.main.zone_id
  name    = aws_ses_domain_mail_from.main.mail_from_domain
  type    = "TXT"
  ttl     = "600"
  records = var.spf_records
}

resource "aws_route53_record" "dkim" {
  count   = 3
  zone_id = aws_route53_zone.main.zone_id
  name    = format("%s._domainkey.%s", element(aws_ses_domain_dkim.main.dkim_tokens, count.index), var.domain_name)
  type    = "CNAME"
  ttl     = "600"
  records = ["${element(aws_ses_domain_dkim.main.dkim_tokens, count.index)}.dkim.amazonses.com"]
}

resource "aws_route53_record" "mx_send_mail_from" {
  zone_id = aws_route53_zone.main.zone_id
  name    = aws_ses_domain_mail_from.main.mail_from_domain
  type    = "MX"
  ttl     = "600"
  records = ["10 feedback-smtp.${var.aws_region}.amazonses.com"]
}

//resource "aws_route53_record" "spf_domain" {
//  zone_id = aws_route53_zone.main.zone_id
//  name    = var.domain_name
//  type    = "TXT"
//  ttl     = "600"
//  records = var.spf_records
//}

//resource "aws_route53_record" "mx_receive" {
//  zone_id = aws_route53_zone.main.zone_id
//  name    = aws_ses_domain_mail_from.main.mail_from_domain
//  type    = "MX"
//  ttl     = "600"
//  records = var.mx_receive_records
//}

resource "aws_route53_record" "txt_dmarc" {
  zone_id = aws_route53_zone.main.zone_id
  name    = "_dmarc.${var.domain_name}"
  type    = "TXT"
  ttl     = "600"
  records = ["v=DMARC1; p=none; rua=mailto:${var.dmarc_rua};"]
}

resource "aws_route53_record" "ses_verification" {
  zone_id = aws_route53_zone.main.zone_id
  name    = "_amazonses.${aws_ses_domain_identity.main.id}"
  type    = "TXT"
  ttl     = "600"
  records = [aws_ses_domain_identity.main.verification_token]
}

# Google Workspace Email Integration

resource "aws_route53_record" "google_mx" {
  zone_id = aws_route53_zone.main.zone_id
  name    = ""
  type    = "MX"
  ttl     = "600"
  records = var.email_mx_records
}

# Zoho Email Integration

# resource "aws_route53_record" "zoho_mail" {
#   zone_id = aws_route53_zone.main.zone_id
#   name    = "zb32191524"
#   type    = "CNAME"
#   ttl     = "600"
#   records = ["zmverify.zoho.eu"]
# }

# resource "aws_route53_record" "zoho_mx" {
#   zone_id = aws_route53_zone.main.zone_id
#   name    = ""
#   type    = "MX"
#   ttl     = "600"
#   records = var.zoho_mx_records
# }

# resource "aws_route53_record" "zoho_spf" {
#   zone_id = aws_route53_zone.main.zone_id
#   name    = ""
#   type    = "TXT"
#   ttl     = "600"
#   records = var.zoho_spf_records
# }

# resource "aws_route53_record" "zoho_dkim" {
#   zone_id = aws_route53_zone.main.zone_id
#   name    = format("%s._domainkey.%s", var.zoho_dkim_key, var.domain_name)
#   type    = "TXT"
#   ttl     = "600"
#   records = var.zoho_dkim_value
# }