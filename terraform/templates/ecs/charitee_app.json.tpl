[
  {
    "name": "charitee-app",
    "image": "${app_image}",
    "cpu": ${fargate_cpu},
    "memory": ${fargate_memory},
    "networkMode": "awsvpc",
    "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "/ecs/charitee-app",
          "awslogs-region": "${aws_region}",
          "awslogs-stream-prefix": "ecs"
        }
    },
    "portMappings": [
      {
        "containerPort": ${app_port},
        "hostPort": ${app_port}
      }
    ],
    "environment":[
      {
        "name": "SERVER_HOST",
        "value": "${server_host}"
      },
      {
        "name": "PORT",
        "value": "${app_port}"
      },
      {
        "name": "APP_NAME",
        "value": "${app_name}"
      },
      {
        "name": "JWT_SECRET",
        "value": "${jwt_secret}"
      },
      {
        "name":"DB_USER",
        "value":"${db_username}"
      },
      {
        "name":"DB_PASSWORD",
        "value":"${db_password}"
      },
      {
        "name":"DB_HOST",
        "value":"${db_endpoint}"
      },
      {
        "name":"DB_NAME",
        "value":"${db_name}"
      },
      {
        "name":"DB_OPTIONS",
        "value":"${db_options}"
      },
      {
        "name":"SMTP_HOSTNAME",
        "value":"${smtp_hostname}"
      },
      {
        "name":"SMTP_PORT",
        "value":"${smtp_port}"
      },
      {
        "name":"SMTP_USER",
        "value":"${smtp_user}"
      },
      {
        "name":"SMTP_PASSWORD",
        "value":"${smtp_password}"
      },
      {
        "name":"SMTP_FROM_EMAIL",
        "value":"${smtp_from_email}"
      },
      {
        "name":"SMTP_FROM_EMAIL_NAME",
        "value":"${smtp_email_name}"
      }
    ]
  }
]
