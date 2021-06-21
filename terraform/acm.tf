module "acm_request_certificate" {
  source                            = "cloudposse/acm-request-certificate/aws"
  domain_name                       = var.domain_name
  process_domain_validation_options = true
  ttl                               = "300"
  subject_alternative_names         = ["*.${var.domain_name}"]
  depends_on                        = [aws_route53_zone.main]
}
