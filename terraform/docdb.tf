resource "aws_docdb_cluster" "docdb" {
  cluster_identifier      = "charitee-docdb-cluster"
  master_username         = var.db_username
  master_password         = var.db_password
  apply_immediately       = true
  enabled_cloudwatch_logs_exports = [ "audit", "profiler" ]
}