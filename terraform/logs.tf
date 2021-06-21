# logs.tf

# Set up CloudWatch group and log stream and retain logs for 30 days
resource "aws_cloudwatch_log_group" "charitee_log_group" {
  name              = "/ecs/charitee-app"
  retention_in_days = 30

  tags = {
    Name = "charitee-log-group"
  }
}

resource "aws_cloudwatch_log_stream" "charitee_log_stream" {
  name           = "charitee-log-stream"
  log_group_name = aws_cloudwatch_log_group.charitee_log_group.name
}

