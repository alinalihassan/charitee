resource "aws_ecr_repository" "charity-repository" {
  name = "charitee"

  image_scanning_configuration {
    scan_on_push = true
  }
}

data "template_file" "repository_lifecycle" {
  template = file("./templates/ecr/repository_lifecycle.json.tpl")
}

resource "aws_ecr_lifecycle_policy" "charitee-repo-lifecycle-policy" {
  repository = aws_ecr_repository.charity-repository.name

  policy = data.template_file.repository_lifecycle.rendered
}