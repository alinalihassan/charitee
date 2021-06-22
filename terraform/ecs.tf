# ecs.tf

resource "aws_ecs_cluster" "main" {
  name = "charitee-cluster"
}

data "template_file" "charitee_app" {
  template = file("./templates/ecs/charitee_app.json.tpl")

  vars = {
    app_image      = "${aws_ecr_repository.charity-repository.repository_url}:latest"
    app_port       = var.app_port
    app_name       = var.app_name
    jwt_secret     = var.jwt_secret
    fargate_cpu    = var.fargate_cpu
    fargate_memory = var.fargate_memory
    aws_region     = var.aws_region

    server_host = "https://${var.domain_name}"

    db_username = var.db_username
    db_password = var.db_password
    db_endpoint = var.db_endpoint
    db_name     = var.db_name
    db_options  = var.db_options

    smtp_hostname   = "email-smtp.${var.aws_region}.amazonaws.com"
    smtp_port       = var.smtp_port
    smtp_user       = aws_iam_access_key.ses_access_key.id
    smtp_password   = aws_iam_access_key.ses_access_key.ses_smtp_password_v4
    smtp_from_email = aws_ses_email_identity.alin_email.email
    smtp_email_name = var.smtp_email_from_name
  }
}

resource "aws_ecs_task_definition" "app" {
  family                   = "charitee-app-task"
  execution_role_arn       = aws_iam_role.ecs_task_execution_role.arn
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = var.fargate_cpu
  memory                   = var.fargate_memory
  container_definitions    = data.template_file.charitee_app.rendered
}

resource "aws_ecs_service" "main" {
  name            = "charitee-service"
  cluster         = aws_ecs_cluster.main.id
  task_definition = aws_ecs_task_definition.app.arn
  desired_count   = var.app_count
  launch_type     = "FARGATE"
  force_new_deployment = true

  network_configuration {
    security_groups  = [aws_security_group.ecs_tasks.id]
    subnets          = aws_subnet.private.*.id
    assign_public_ip = true
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.app.arn
    container_name   = "charitee-app"
    container_port   = var.app_port
  }

  depends_on = [aws_lb_listener.front_end, aws_lb_listener.https_front_end, aws_iam_role_policy_attachment.ecs_task_execution_role]
}

