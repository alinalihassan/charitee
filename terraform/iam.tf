# SES config

resource "aws_iam_user" "ses_user" {
  name = "outbound-mail-for-${var.domain_name}"
  path = "/"
}

resource "aws_iam_access_key" "ses_access_key" {
  user = aws_iam_user.ses_user.name
}

data "template_file" "iam_config" {
  template = file("./templates/ses/iam_config.json.tpl")
}

resource "aws_iam_user_policy" "SMTP_ro" {
  name = "AmazonSesSendingAccess"
  user = aws_iam_user.ses_user.name

  policy = data.template_file.iam_config.rendered
}