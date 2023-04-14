resource "aws_s3_bucket" "demos3" {
    # bucket = "${var.bucket_name}" 
    acl = "${var.acl_value}"   
    bucket_prefix = "${var.bucket_name}"
}

resource "aws_s3_bucket_public_access_block" "accessPolicy" {
  bucket = aws_s3_bucket.demos3.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_s3_bucket_cors_configuration" "cors_policy" {
  bucket = aws_s3_bucket.demos3.id

  cors_rule {
    allowed_headers = ["*"]
    allowed_methods = ["GET"]
    allowed_origins = ["*"]
    expose_headers  = []
  }
}