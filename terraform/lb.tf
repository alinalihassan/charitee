# lb.tf

resource "aws_lb" "main" {
  name_prefix     = "lb"
  subnets         = aws_subnet.public.*.id
  security_groups = [aws_security_group.lb.id]
}

resource "aws_lb_target_group" "app" {
  name_prefix = "tg"
  port        = "80"
  protocol    = "HTTP"
  vpc_id      = aws_vpc.main.id
  target_type = "ip"

  health_check {
    healthy_threshold   = "3"
    interval            = "300"
    protocol            = "HTTP"
    matcher             = "200"
    timeout             = "3"
    path                = var.health_check_path
    unhealthy_threshold = "2"
  }

  lifecycle {
    create_before_destroy = true
  }
}

# Redirect all traffic from the LB to the target group
resource "aws_lb_listener" "front_end" {
  load_balancer_arn = aws_lb.main.arn
  port              = "80"
  protocol          = "HTTP"

  default_action {
    type = "redirect"

    redirect {
      port        = var.app_port
      protocol    = "HTTPS"
      status_code = "HTTP_301"
    }
  }
}

# Redirect all traffic from the LB to the target group
resource "aws_lb_listener" "https_front_end" {
  load_balancer_arn = aws_lb.main.arn
  port              = var.app_port
  protocol          = "HTTPS"
  ssl_policy        = "ELBSecurityPolicy-2016-08"
  certificate_arn   = module.acm_request_certificate.arn

  default_action {
    target_group_arn = aws_lb_target_group.app.arn
    type             = "forward"
  }
}
